// 把审批通过的候选整理成站点文件，做内存校验，再用 GitHub API 一次性推送到目标仓库。
// 不写本地 content/ 目录，避免下次 git pull 时冲突；推完之后本地再 pull 就能拿到。
const matter = require("gray-matter");
const { makeClient } = require("./github");
const { loadConfig, categories, log } = require("./config");
const store = require("./store");
const { seoCheck } = require("./seo");

const today = () => new Date().toISOString().slice(0, 10);

/** 生成 markdown：front matter 的值统一用 JSON.stringify 加引号，中文标点和冒号都不会弄坏 YAML */
function markdown(data) {
  const fm = {
    title: data.title,
    description: data.description,
    summary: data.summary,
    highlights: data.highlights,
    faq: data.faq,
  };
  const lines = Object.entries(fm).map(([k, v]) => {
    if (Array.isArray(v) && v.length && typeof v[0] === "object") {
      return `${k}:\n${v.map((x) => `  - q: ${JSON.stringify(x.q)}\n    a: ${JSON.stringify(x.a)}`).join("\n")}`;
    }
    if (Array.isArray(v) && v.length) return `${k}:\n${v.map((x) => `  - ${JSON.stringify(x)}`).join("\n")}`;
    if (Array.isArray(v)) return "";
    return `${k}: ${JSON.stringify(v)}`;
  });
  return `---\n${lines.filter(Boolean).join("\n")}\n---\n\n${String(data.body || "").trim()}\n`;
}

/**
 * 把 github 字段补成站点模板要的完整形状。
 * 模板直接对这些字段做数字和日期格式化，缺一个或格式不对都会让整站构建失败，所以推送前在这里兜住。
 */
function githubShape(g) {
  const o = g && typeof g === "object" ? g : {};
  const num = (v) => Math.max(0, Math.floor(Number(v)) || 0);
  const str = (v) => (typeof v === "string" ? v : "");
  const day = (v) => (/^\d{4}-\d{2}-\d{2}/.test(str(v)) ? v.slice(0, 10) : "");
  return {
    description: str(o.description),
    stars: num(o.stars),
    forks: num(o.forks),
    watchers: num(o.watchers),
    openIssues: num(o.openIssues),
    language: str(o.language),
    license: str(o.license),
    version: str(o.version),
    homepage: str(o.homepage),
    topics: Array.isArray(o.topics) ? o.topics.filter((t) => typeof t === "string") : [],
    defaultBranch: str(o.defaultBranch) || "main",
    createdAt: day(o.createdAt),
    pushedAt: day(o.pushedAt),
    archived: !!o.archived,
  };
}

/** 候选 → 三个文件的路径与内容 */
function filesFor(rec, draft, date = today()) {
  const dir = `content/plugins/${rec.owner.toLowerCase()}/${rec.repo.toLowerCase()}`;
  const json = {
    owner: rec.owner,
    repo: rec.repo,
    name: draft.name,
    category: draft.category,
    package: draft.package || "",
    ...(draft.install ? { install: draft.install } : {}),
    verified: false,
    listedAt: draft.listedAt || date,
    updatedAt: date,
    github: githubShape(draft.github),
  };
  return [
    { path: `${dir}/plugin.json`, content: JSON.stringify(json, null, 2) + "\n" },
    { path: `${dir}/en.md`, content: markdown(draft.en) },
    { path: `${dir}/zh.md`, content: markdown(draft.zh) },
  ];
}

/**
 * 校验一份候选能否发布：只在这里拦，不在构建时才报错。
 * @returns {string[]} 问题列表，空数组表示可以发布
 */
function validate(rec) {
  const d = rec.draft || {};
  const who = `${rec.owner}/${rec.repo}`;
  const out = [];
  if (!String(d.name || "").trim()) out.push(`${who}：显示名是空的`);
  if (!d.category || !categories().some((c) => c.slug === d.category)) out.push(`${who}：分类无效`);
  if (!d.github || typeof d.github !== "object") out.push(`${who}：缺少仓库数据`);
  for (const lang of ["en", "zh"]) {
    const doc = d[lang] || {};
    const where = `${who} 的 ${lang}`;
    if (!String(doc.title || "").trim()) out.push(`${where}.title 是空的`);
    if (!String(doc.description || "").trim()) out.push(`${where}.description 是空的`);
    if (!String(doc.summary || "").trim()) out.push(`${where}.summary 是空的`);
    if (!String(doc.body || "").trim()) out.push(`${where}.body 是空的`);
    if (/TODO|待补/.test(doc.body)) out.push(`${where}.body 里还有占位文字（TODO / 待补）`);
    try {
      const parsed = matter(markdown(doc));
      if (parsed.data.title !== String(doc.title || "").trim()) out.push(`${where}.title 写入 front matter 后对不上`);
    } catch (e) {
      out.push(`${where} 的 front matter 解析失败：${e.message}`);
    }
  }
  // SEO 硬性问题（标题没插件名、超长、问答太少等）也挡住；只是提醒的不挡
  for (const p of seoCheck(rec)) if (p.level === "bad") out.push(`${who} SEO ${p.msg}`);
  return out;
}

/** 校验一批；有任何一条不过就整批不发 */
function validateAll(recs) {
  const all = [];
  for (const rec of recs) all.push(...validate(rec));
  return all;
}

/**
 * 发布审批通过的候选。
 * @param {string[]} ids 空数组表示全部已通过的
 * @param {{push?: boolean}} opts push 为 false 时只校验，不推送
 */
async function publish(ids, opts = {}) {
  const cfg = loadConfig();
  const queue = store.readQueue();
  // 指定了 id 也只认已通过的：没审批的不能靠传 id 绕过去
  const picked = queue.filter((x) => x.status === "approved" && (!ids || !ids.length || ids.includes(x.id)));
  if (!picked.length) throw new Error("没有已通过审批的候选。");
  if (opts.push !== false) {
    if (!cfg.token) throw new Error("还没有填 GitHub 令牌，无法推送。");
    if (!cfg.repo) throw new Error("还没有填目标仓库（owner/repo）。");
  }

  const problems = validateAll(picked);
  if (problems.length) throw new Error(`这批有内容没写完，一条都没推：\n${problems.join("\n")}`);

  if (opts.push === false) {
    return { ok: true, written: picked.map((r) => `${r.owner}/${r.repo}`), pushed: false, commit: "" };
  }

  const gh = makeClient(cfg.token);
  // 推送前再查一次远端：别人往仓库里加了同样的插件时跳过，不让整批失败
  let remote = new Set();
  try {
    remote = await gh.remotePlugins(cfg.repo, cfg.branch);
  } catch (e) {
    throw new Error(`读不到目标仓库 ${cfg.repo}@${cfg.branch} 的现有内容：${e.message}`);
  }
  const date = today();
  const fresh = [];
  const already = [];
  for (const rec of picked) (remote.has(store.key(rec.owner, rec.repo)) ? already : fresh).push(rec);
  const skipped = already.map((r) => `${r.owner}/${r.repo}`);
  // 仓库里已经有的不用再推，直接标成已发布，免得一直卡在"已通过"里
  for (const rec of already) store.updateItem(rec.id, { status: "published", error: "目标仓库里已经有这个插件", publishedAt: new Date().toISOString() });
  if (!fresh.length) throw new Error(`${skipped.join("、")} 已经在目标仓库里了，没有要推的。`);
  if (skipped.length) log(`推送时跳过仓库里已有的：${skipped.join("、")}`);

  const files = [];
  for (const rec of fresh) files.push(...filesFor(rec, rec.draft, date));
  const names = fresh.map((r) => `${r.owner}/${r.repo}`);
  const message = `新增 ${fresh.length} 个插件：${names.join("、")}`.slice(0, 300);
  const commit = await gh.commitFiles(cfg.repo, cfg.branch, files, message);

  // 推送成功后才改状态：中途失败时还留在"已通过"里，可以重来
  for (const rec of fresh) store.updateItem(rec.id, { status: "published", error: "", publishedAt: new Date().toISOString(), commit });
  log(`已推送 ${fresh.length} 个插件到 ${cfg.repo}@${cfg.branch}，提交 ${commit.slice(0, 7)}`);
  return { ok: true, written: names, pushed: true, commit, skipped };
}

module.exports = { publish, validate, validateAll, filesFor, markdown };
