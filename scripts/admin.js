#!/usr/bin/env node
// 采集审批台：本机管理服务，扫描 GitHub → 改写 → 审批 → 批量推送。
// 用法：npm run admin [-- --port 4500]
// 默认只监听 127.0.0.1，不对外暴露。配置、队列、日志都在 .admin/（已忽略提交）。
// 在 Docker 里运行时用 ADMIN_HOST=0.0.0.0 让端口映射生效，宿主机那一侧仍然只映射到 127.0.0.1，见 docker-compose.yml。
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { ADMIN, loadConfig, saveConfig, loadState, categories, siteConfig, log } = require("./admin/config");
const store = require("./admin/store");
const { makeClient } = require("./admin/github");
const { scan, addOne, regenerate, startScheduler } = require("./admin/scan");
const { publish, validate } = require("./admin/publish");
const { sanitizeMarkdown } = require("./admin/rewrite");
const { page } = require("./admin/ui");
const { parseArgs } = require("./lib/paths");

const args = parseArgs(process.argv.slice(2));
const PORT = Number(args.port || process.env.ADMIN_PORT || 4500);
const HOST = process.env.ADMIN_HOST || "127.0.0.1";

// 每个页面加载时内嵌的请求令牌，POST 必须带上它，防止本机其它网页借用户的浏览器发请求（CSRF）。
// 启动时生成一次，刷新页面也不会失效。
const NONCE = crypto.randomBytes(18).toString("hex");

// 扫描任务：同一时间只允许一个，手动和定时共用
const job = { running: false, step: "", added: 0, want: 0, cancel: false, startedAt: "", error: "" };

function mask(secret) {
  if (!secret) return "";
  const s = String(secret);
  return s.length <= 8 ? "已设置" : `${s.slice(0, 4)}…${s.slice(-4)}`;
}

/** 给页面的状态：令牌只给"有没有设置"和掩码，绝不回传明文 */
function state() {
  const cfg = loadConfig();
  let logText = "";
  try {
    logText = fs.readFileSync(path.join(ADMIN, "admin.log"), "utf8").split("\n").slice(-120).join("\n");
  } catch {
    logText = "";
  }
  return {
    config: {
      repo: cfg.repo,
      branch: cfg.branch,
      queries: cfg.queries,
      perScan: cfg.perScan,
      minStars: cfg.minStars,
      schedule: cfg.schedule,
      model: { baseUrl: cfg.model.baseUrl, model: cfg.model.model },
      tokenSet: !!cfg.token,
      modelKeySet: !!cfg.model.apiKey,
      tokenMask: mask(cfg.token),
      modelKeyMask: mask(cfg.model.apiKey),
    },
    categories: categories(),
    installCommand: siteConfig().installCommand,
    queue: store.readQueue().sort((a, b) => String(b.foundAt).localeCompare(String(a.foundAt))),
    rejected: store.readRejected(),
    job: { running: job.running, step: job.step, added: job.added, want: job.want, startedAt: job.startedAt, error: job.error },
    lastScan: loadState().lastScan,
    log: logText,
  };
}

function send(res, code, body, type = "application/json; charset=utf-8") {
  const data = typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > 2 * 1024 * 1024) {
        reject(new Error("请求体太大"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("请求体不是合法 JSON"));
      }
    });
    req.on("error", reject);
  });
}

/** 只接受来自本机地址的请求；POST 再校验内容类型、页面令牌和来源 */
function guard(req, isPost) {
  const host = req.headers.host || "";
  if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) return "Host 不匹配";
  if (!isPost) return "";
  if (!/^application\/json\b/.test(req.headers["content-type"] || "")) return "需要 Content-Type: application/json";
  if (req.headers["x-admin-token"] !== NONCE) return "请求令牌不匹配，刷新页面重试";
  const origin = req.headers.origin;
  if (origin && !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin)) return "Origin 不匹配";
  return "";
}

/** 合并页面提交的设置：只认白名单里的字段；密钥留空表示不修改 */
function mergeConfig(body) {
  const cur = loadConfig();
  const b = body && typeof body === "object" ? body : {};
  const m = b.model || {};
  const s = b.schedule || {};
  const repo = String(b.repo == null ? cur.repo : b.repo).trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/\/+$/, "");
  if (repo && !/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(repo)) throw new Error("目标仓库要写成 owner/repo，例如 jx009/plugins-dsh。");
  const time = String(s.time || cur.schedule.time);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("定时扫描的时间要写成 HH:MM，例如 03:00。");
  const baseUrl = String(m.baseUrl || cur.model.baseUrl).trim();
  if (!/^https?:\/\//i.test(baseUrl)) throw new Error("模型接口地址要以 http:// 或 https:// 开头。");
  return {
    repo,
    branch: String(b.branch || cur.branch).trim() || "main",
    token: String(b.token || "").trim() || cur.token,
    queries: Array.isArray(b.queries) ? b.queries.map((q) => String(q).trim()).filter(Boolean).slice(0, 20) : cur.queries,
    perScan: Math.max(1, Math.min(50, Math.floor(Number(b.perScan)) || cur.perScan)),
    minStars: Math.max(0, Math.floor(Number(b.minStars)) || 0),
    schedule: { enabled: !!s.enabled, time },
    model: { baseUrl, model: String(m.model || cur.model.model).trim(), apiKey: String(m.apiKey || "").trim() || cur.model.apiKey },
  };
}

const text = (v, max) => String(v == null ? "" : v).replace(/\r\n/g, "\n").trim().slice(0, max);

/** 把页面提交的修改并进草稿：只认可编辑的字段，类型不对的直接丢掉 */
function applyPatch(draft, patch) {
  const next = { ...draft };
  if ("name" in patch) next.name = text(patch.name, 60);
  if ("install" in patch) next.install = text(patch.install, 200);
  if ("category" in patch) next.category = text(patch.category, 40);
  for (const lang of ["en", "zh"]) {
    const p = patch[lang];
    if (!p || typeof p !== "object") continue;
    const doc = { ...(next[lang] || {}) };
    for (const k of ["title", "description", "summary"]) if (k in p) doc[k] = text(p[k], 400).replace(/\s+/g, " ");
    if ("body" in p) doc.body = sanitizeMarkdown(text(p.body, 20000));
    // 亮点和问答的答案在站点上按行内 Markdown 渲染，和正文一样要清理
    if (Array.isArray(p.highlights)) doc.highlights = p.highlights.map((x) => sanitizeMarkdown(text(x, 160))).filter(Boolean).slice(0, 8);
    if (Array.isArray(p.faq)) {
      doc.faq = p.faq
        .filter((f) => f && typeof f === "object")
        .map((f) => ({ q: text(f.q, 200), a: sanitizeMarkdown(text(f.a, 800)) }))
        .filter((f) => f.q && f.a)
        .slice(0, 8);
    }
    next[lang] = doc;
  }
  return next;
}

/** 启动一次后台扫描；已有任务在跑时返回 false */
function startScan(trigger, opts = {}) {
  if (job.running) return false;
  Object.assign(job, { running: true, step: "准备中", added: 0, want: 0, cancel: false, startedAt: new Date().toISOString(), error: "" });
  log(`${trigger}扫描开始`);
  scan({ ...opts, job })
    .catch((e) => {
      job.error = e.message;
      log(`${trigger}扫描失败：${e.message}`);
    })
    .finally(() => {
      job.running = false;
      job.step = "";
    });
  return true;
}

async function handleApi(req, res, url) {
  const p = url.pathname;

  // 读状态也要过 Host 校验：防止别的网页用 DNS 重绑定读走队列和配置
  const bad = guard(req, req.method === "POST");
  if (bad) return send(res, 403, { error: bad });

  if (req.method === "GET" && p === "/api/state") return send(res, 200, state());

  if (req.method !== "POST") return send(res, 405, { error: "只支持 GET 和 POST" });

  if (p === "/api/config") {
    const body = await readBody(req);
    let next;
    try {
      next = mergeConfig(body.config || body);
    } catch (e) {
      // 填错了格式：是输入问题，不记进错误日志
      return send(res, 400, { error: e.message });
    }
    saveConfig(next);
    log("配置已更新");
    return send(res, 200, { ok: true, state: state() });
  }

  if (p === "/api/scan") {
    if (job.running) return send(res, 409, { error: `已经有扫描在跑：${job.step}` });
    const body = await readBody(req);
    startScan("手动", { count: body.count, queries: body.queries });
    return send(res, 202, { ok: true, job: state().job });
  }

  if (p === "/api/scan/stop") {
    if (!job.running) return send(res, 409, { error: "现在没有扫描在跑" });
    job.cancel = true;
    job.step = "正在停止…";
    log("已请求停止扫描");
    return send(res, 200, { ok: true });
  }

  if (p === "/api/add") {
    const body = await readBody(req);
    const rec = await addOne(body.target || body.repo || "");
    return send(res, 200, { ok: true, item: rec });
  }

  if (p === "/api/regenerate") {
    const body = await readBody(req);
    const rec = await regenerate(body.id);
    return send(res, 200, { ok: true, item: rec });
  }

  if (p === "/api/test") {
    const cfg = loadConfig();
    const lines = [];
    if (!cfg.token) lines.push("GitHub 令牌：未填写");
    else {
      try {
        const gh = makeClient(cfg.token);
        const me = await gh.json("/user");
        lines.push(`GitHub 令牌：有效（${me.login}）`);
        if (cfg.repo) {
          const r = await gh.repo(...cfg.repo.split("/"));
          if (!r) lines.push(`目标仓库 ${cfg.repo}：看不到，检查仓库名和令牌权限`);
          else lines.push(`目标仓库 ${cfg.repo}：${r.private ? "私有" : "公开"}，${r.permissions && r.permissions.push ? "有写权限" : "没有写权限"}`);
          try {
            lines.push(`分支 ${cfg.branch}：已有 ${(await gh.remotePlugins(cfg.repo, cfg.branch)).size} 个插件`);
          } catch (e) {
            lines.push(`读取分支 ${cfg.branch} 失败：${e.message}`);
          }
        }
      } catch (e) {
        lines.push(`GitHub：${e.message}`);
      }
    }
    if (!cfg.model.apiKey) lines.push("模型密钥：未填写，扫描时只生成占位骨架");
    else lines.push(`模型接口：${cfg.model.baseUrl}（${cfg.model.model}），扫描时才真正调用`);
    return send(res, 200, { ok: true, lines });
  }

  if (p === "/api/approve-all") {
    const n = store.readQueue().filter((x) => x.status === "pending");
    const problems = [];
    for (const rec of n) problems.push(...validate(rec));
    if (problems.length) return send(res, 400, { error: `有内容没写完，没有全部通过：\n${problems.slice(0, 20).join("\n")}` });
    for (const rec of n) store.updateItem(rec.id, { status: "approved" });
    log(`批量通过了 ${n.length} 个候选`);
    return send(res, 200, { ok: true, count: n.length });
  }

  if (p === "/api/publish") {
    const body = await readBody(req);
    const result = await publish(body.ids || [], { push: body.push !== false });
    return send(res, 200, result);
  }

  if (p.startsWith("/api/item/")) {
    const id = decodeURIComponent(p.slice("/api/item/".length));
    const body = await readBody(req);
    const cur = store.readQueue().find((x) => x.id === id);
    if (!cur) return send(res, 404, { error: "候选不存在" });
    if (cur.status === "published") return send(res, 409, { error: "已经发布的不能修改" });
    if (body.status && !["pending", "approved"].includes(body.status)) return send(res, 400, { error: "状态只能是 pending 或 approved" });
    // 先合并修改，再（如果要通过）校验，校验不过时修改照样保存，只是状态不变
    const draft = body.patch && typeof body.patch === "object" ? applyPatch(cur.draft || {}, body.patch) : cur.draft || {};
    const problems = body.status === "approved" ? validate({ ...cur, draft }) : [];
    const status = body.status && !problems.length ? { status: body.status, error: "" } : {};
    store.updateItem(id, { draft, ...status });
    if (problems.length) return send(res, 400, { error: `修改已保存，但还不能通过：\n${problems.join("\n")}` });
    return send(res, 200, { ok: true, item: store.readQueue().find((x) => x.id === id) });
  }

  if (p.startsWith("/api/reject/")) {
    const id = decodeURIComponent(p.slice("/api/reject/".length));
    const item = store.rejectItem(id);
    if (!item) return send(res, 404, { error: "候选不存在或已发布" });
    return send(res, 200, { ok: true });
  }

  if (p === "/api/rejected/restore") {
    const body = await readBody(req);
    store.restoreRejected(body.owner, body.repo);
    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: "没有这个接口" });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}`);

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    if (guard(req, false)) return send(res, 403, "只允许从本机访问", "text/plain; charset=utf-8");
    return send(res, 200, page(NONCE), "text/html; charset=utf-8");
  }

  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url).catch((e) => {
      log(`接口出错 ${url.pathname}：${e.message}`);
      send(res, 500, { error: e.message });
    });
    return;
  }

  send(res, 404, "Not found", "text/plain; charset=utf-8");
});

fs.mkdirSync(ADMIN, { recursive: true });
server.listen(PORT, HOST, () => {
  const cfg = loadConfig();
  console.log(`采集审批台已启动：http://${HOST === "0.0.0.0" ? "127.0.0.1" : HOST}:${PORT}${HOST === "127.0.0.1" ? "" : `（监听 ${HOST}）`}`);
  console.log(`  目标仓库：${cfg.repo || "（未设置）"}@${cfg.branch}${cfg.token ? "" : "（还没有 GitHub 令牌）"}`);
  console.log(`  定时扫描：${cfg.schedule.enabled ? `每天 ${cfg.schedule.time}` : "关闭"}`);
  startScheduler(() => {
    if (job.running) return false; // 手动扫描还在跑，不占用今天的定时名额
    return startScan("定时");
  });
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(`端口 ${PORT} 已被占用，换一个：npm run admin -- --port 4501`);
    process.exit(1);
  }
  throw e;
});

// docker stop 发的是 SIGTERM；Node 作为容器里的 1 号进程默认不处理它，要等 10 秒被强杀。
// 文件都是同步写入的，收到信号直接关掉服务退出即可。
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    console.log(`收到 ${sig}，正在退出`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
  });
}
