// 扫描 GitHub，挑选新插件候选，改写文案后放进待审队列。
const { makeClient } = require("./github");
const { loadConfig, loadState, saveState, log } = require("./config");
const store = require("./store");
const { rewrite } = require("./rewrite");

// 官方仓库本身不是"插件"，收录进来会变成自指的条目
const OFFICIAL = new Set(["deepseek-ai/deepseek-harness", "deepseek-ai/dsh", "deepseek-ai/deepseek-harness-plugins"]);

const today = () => new Date().toISOString().slice(0, 10);

function skeleton(meta, data) {
  return {
    owner: meta.owner,
    repo: meta.repo,
    name: data.name,
    category: data.category,
    package: meta.package || "",
    install: data.install || "",
    verified: false,
    listedAt: today(),
    updatedAt: today(),
    github: meta.github,
    en: data.en,
    zh: data.zh,
  };
}

/** 拉一个仓库改写所需的全部数据：仓库信息、npm 包名、版本、README */
async function fetchMeta(gh, owner, repo) {
  const full = await gh.repo(owner, repo);
  if (!full) throw new Error(`读不到 ${owner}/${repo}：仓库不存在，或者是令牌看不到的私有仓库`);
  const meta = { owner: full.owner, repo: full.repo, private: full.private, package: "", github: full.github };
  const pkg = await gh.packageJson(meta.owner, meta.repo);
  if (pkg && typeof pkg.name === "string" && pkg.name && !pkg.private) meta.package = pkg.name;
  const readme = await gh.readme(meta.owner, meta.repo);
  const release = await gh.latestRelease(meta.owner, meta.repo).catch(() => "");
  meta.github.version = release || (pkg && pkg.version ? `v${pkg.version}` : "");
  return { meta, readme };
}

/**
 * 拉取一个仓库并改写后入队。
 * 扫描时模型判断无关的会自动进拒绝名单；手动添加（manual）时不进名单，直接把原因抛给你。
 * @param {object} job 当前任务，用来汇报进度和响应取消
 */
async function prepare(gh, item, query, stats, job, manual = false) {
  const { meta, readme } = await fetchMeta(gh, item.owner, item.repo);
  if (job && job.cancel) return null;
  if (meta.private) throw new Error("这是私有仓库，收录后访客打不开，不能上架");

  if (!readme && !meta.package) {
    if (manual) throw new Error("这个仓库没有 README，也找不到 npm 包名，没法写介绍");
    store.addRejected(meta.owner, meta.repo, "没有 README，也找不到 npm 包名，无法判断用途", true);
    stats.skipped.push(`${meta.owner}/${meta.repo}：没有 README，自动跳过`);
    return null;
  }

  if (job) job.step = `改写 ${meta.owner}/${meta.repo}`;
  const result = await rewrite(meta, readme, job ? (step) => (job.step = `${meta.owner}/${meta.repo} ${step}`) : undefined);
  if (!result.relevant) {
    if (manual) throw new Error(`模型判断它和 DSH 无关：${result.reason}`);
    store.addRejected(meta.owner, meta.repo, result.reason, true);
    stats.skipped.push(`${meta.owner}/${meta.repo}：${result.reason}`);
    return null;
  }
  const rec = store.addCandidate({ owner: meta.owner, repo: meta.repo, query, draft: skeleton(meta, result.data) });
  // addCandidate 返回 null 说明已经有了（仓库改过名、大小写不同等），不算新增
  if (!rec) {
    if (manual) throw new Error(store.whereTaken(meta.owner, meta.repo) || "已经有了");
    stats.skipped.push(`${meta.owner}/${meta.repo}：已经有了`);
    return null;
  }
  if (result.note) store.updateItem(rec.id, { error: result.note });
  stats.added.push(`${meta.owner}/${meta.repo}`);
  return rec;
}

/** 把 "owner/repo" 或 GitHub 链接解析成 {owner, repo}；格式不对返回 null */
function parseRepo(input) {
  const s = String(input || "").trim().replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/i, "").replace(/[#?].*$/, "");
  const m = s.match(/^([A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)\/([A-Za-z0-9._-]+)(?:\/.*)?$/);
  return m ? { owner: m[1], repo: m[2] } : null;
}

/** 手动添加一个仓库：同样要过去重（本地、队列、拒绝名单、远端分支），然后改写入队 */
async function addOne(input) {
  const cfg = loadConfig();
  if (!cfg.token) throw new Error("还没有填 GitHub 令牌。");
  const target = parseRepo(input);
  if (!target) throw new Error("写成 owner/repo，或者直接贴 GitHub 仓库链接。");
  const why = store.whereTaken(target.owner, target.repo);
  if (why) throw new Error(`${target.owner}/${target.repo} ${why}。`);
  const gh = makeClient(cfg.token);
  if (cfg.repo) {
    const remote = await gh.remotePlugins(cfg.repo, cfg.branch).catch(() => new Set());
    if (remote.has(store.key(target.owner, target.repo))) throw new Error(`${target.owner}/${target.repo} 已经在目标仓库 ${cfg.repo} 里了。`);
  }
  const stats = { added: [], skipped: [], errors: [] };
  const rec = await prepare(gh, target, "手动添加", stats, null, true);
  log(`手动添加 ${rec.owner}/${rec.repo}`);
  return rec;
}

/** 对队列里的一条重新拉数据、重新改写；你改过的文案会被覆盖 */
async function regenerate(id, onStep) {
  const cfg = loadConfig();
  if (!cfg.token) throw new Error("还没有填 GitHub 令牌。");
  const cur = store.readQueue().find((x) => x.id === id);
  if (!cur) throw new Error("候选不存在。");
  if (cur.status === "published") throw new Error("已经发布的不能重新改写。");
  const gh = makeClient(cfg.token);
  if (onStep) onStep("拉取仓库数据");
  const { meta, readme } = await fetchMeta(gh, cur.owner, cur.repo);
  const result = await rewrite(meta, readme, onStep);
  if (!result.relevant) throw new Error(`模型判断它和 DSH 无关：${result.reason}。原文案没有改动，不想要可以直接拒绝。`);
  const draft = { ...skeleton(meta, result.data), listedAt: (cur.draft && cur.draft.listedAt) || today() };
  return store.updateItem(id, { draft, status: "pending", error: result.note || "" });
}

/**
 * 执行一次扫描：搜索 → 过滤 → 去重（本地、队列、拒绝名单、远端仓库）→ 改写 → 入队。
 * 只进队列，不推送。
 * @param {{count?: number, queries?: string[], job?: object}} opts
 */
async function scan(opts = {}) {
  const cfg = loadConfig();
  const job = opts.job || { step: "", cancel: false };
  const stats = { startedAt: new Date().toISOString(), queries: [], added: [], skipped: [], errors: [] };
  if (!cfg.token) throw new Error("还没有填 GitHub 令牌，扫描和推送都需要它。");
  const gh = makeClient(cfg.token);
  const want = Math.max(1, Math.min(50, Number(opts.count || cfg.perScan) || 10));
  const queries = opts.queries && opts.queries.length ? opts.queries : cfg.queries;
  job.want = want;

  const taken = store.takenSet();
  // 远端分支里已有的也避开：防止和已发布、但本地还没 pull 的内容重复
  if (cfg.repo) {
    try {
      for (const k of await gh.remotePlugins(cfg.repo, cfg.branch)) taken.add(k);
    } catch (e) {
      stats.errors.push(`读取目标仓库 ${cfg.repo}@${cfg.branch} 失败：${e.message}`);
    }
  }

  // 同一个查询串只跑一次；每个查询最多翻 4 页（GitHub 单查询上限 1000 条，按星标排序取头部足够）
  const seenQuery = new Set();
  outer: for (const q of queries) {
    if (seenQuery.has(q)) continue;
    seenQuery.add(q);
    const qs = { q, total: 0, hits: 0, added: 0 };
    stats.queries.push(qs);
    try {
      for (let page = 1; page <= 4; page++) {
        if (job.cancel) break outer;
        if (stats.added.length >= want) break outer;
        job.step = `搜索「${q}」第 ${page} 页`;
        const { total, items } = await gh.search(q, page);
        qs.total = total;
        if (!items.length) break;
        qs.hits += items.length;
        for (const item of items) {
          if (job.cancel) break outer;
          if (stats.added.length >= want) break outer;
          const k = store.key(item.owner, item.repo);
          if (item.private || item.fork || item.github.archived) continue;
          if (OFFICIAL.has(k)) continue;
          if (item.github.stars < cfg.minStars) continue;
          if (taken.has(k)) continue;
          // 先占位，避免同一轮里多个查询重复拉同一个仓库
          taken.add(k);
          try {
            if (await prepare(gh, item, q, stats, job)) qs.added++;
            job.added = stats.added.length;
          } catch (e) {
            stats.errors.push(`${item.owner}/${item.repo}：${e.message}`);
          }
        }
      }
    } catch (e) {
      stats.errors.push(`搜索「${q}」失败：${e.message}`);
    }
  }

  stats.cancelled = !!job.cancel;
  stats.finishedAt = new Date().toISOString();
  saveState({ lastScan: stats });
  log(
    `扫描${stats.cancelled ? "已停止" : "完成"}：新增 ${stats.added.length} 个候选` +
      `${stats.skipped.length ? `，跳过 ${stats.skipped.length} 个` : ""}${stats.errors.length ? `，${stats.errors.length} 个错误` : ""}`
  );
  return stats;
}

/** 判断现在是否到了定时扫描的时刻；服务每 30 秒调用一次 */
function dueNow(cfg, state, now = new Date()) {
  if (!cfg.schedule || !cfg.schedule.enabled || !cfg.token) return false;
  const p = (n) => String(n).padStart(2, "0");
  const day = `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
  const hhmm = `${p(now.getHours())}:${p(now.getMinutes())}`;
  if (hhmm < cfg.schedule.time) return false;
  if (state.lastScheduledDay === day) return false;
  return true;
}

/**
 * 定时扫描的调度：返回一个停止函数。
 * 服务晚于设定时间启动时也会补跑一次（当天只跑一次）。
 */
function startScheduler(onRun) {
  if (startScheduler.timer) clearInterval(startScheduler.timer);
  startScheduler.timer = setInterval(() => {
    try {
      const cfg = loadConfig();
      const state = loadState();
      if (!dueNow(cfg, state)) return;
      // onRun 返回 false 表示已有扫描在跑，这一轮不占用今天的名额，30 秒后再试
      if (!onRun || onRun() === false) return;
      // 记下今天已经跑过：失败也不会每 30 秒重试一遍
      const now = new Date();
      const p = (n) => String(n).padStart(2, "0");
      saveState({ lastScheduledDay: `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}` });
    } catch (e) {
      log(`调度器出错：${e.message}`);
    }
  }, 30000);
  startScheduler.timer.unref();
  return () => clearInterval(startScheduler.timer);
}

module.exports = { scan, addOne, regenerate, parseRepo, dueNow, startScheduler };
