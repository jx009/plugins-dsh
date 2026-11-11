// 读取 content/ 下的全部内容并做校验。构建、搜索索引、sitemap 都从这里拿数据。
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const yaml = require("js-yaml");
const { CONTENT, readJson, config } = require("./paths");
const { renderMarkdown } = require("./markdown");
const { fmt } = require("./html");

const loadYaml = (file) => yaml.load(fs.readFileSync(path.join(CONTENT, file), "utf8"));
const toDay = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v).slice(0, 10) : "");
const dirs = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : []);
const files = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name) : []);

/**
 * @param {{drafts?: boolean}} opts drafts 为 true 时连 draft: true 的稿件一起构建（本地预览用）
 */
function loadSite({ drafts = false } = {}) {
  const cfg = config();
  const langs = Object.keys(cfg.langs);
  const errors = [];
  const warnings = [];
  const vars = { brand: cfg.brand, email: cfg.contactEmail, siteUrl: cfg.siteUrl };

  const categories = loadYaml("categories.yml");
  const tutorialCategories = loadYaml("tutorial-categories.yml");
  const copy = Object.fromEntries(langs.map((l) => [l, loadYaml(`copy/${l}.yml`)]));

  /** 读一篇 Markdown；草稿或文件不存在时返回 null。substitute 为 true 时替换 {brand} {email} {siteUrl}。 */
  function readDoc(file, lang, required, substitute = false) {
    if (!fs.existsSync(file)) return null;
    const rel = path.relative(CONTENT, file).replace(/\\/g, "/");
    let parsed;
    try {
      const text = fs.readFileSync(file, "utf8");
      parsed = matter(substitute ? fmt(text, vars) : text);
    } catch (e) {
      errors.push(`${rel}: front matter 解析失败（${e.reason || e.message}）`);
      return null;
    }
    const data = parsed.data;
    if (data.draft && !drafts) return null;
    for (const key of required) if (!data[key]) errors.push(`${rel}: 缺少 ${key}`);
    const { html, toc } = renderMarkdown(parsed.content, cfg.langs[lang].prefix);
    return { ...data, date: toDay(data.date), updated: toDay(data.updated), html, toc, file: rel };
  }

  /** 把 `{slug}.{lang}.md` 形式的目录读成 [{slug, langs: {en, zh}}]。 */
  function readLocalized(dir, required, substitute = false) {
    const bySlug = new Map();
    for (const name of files(dir)) {
      const m = name.match(/^(.+)\.([a-z]{2})\.md$/);
      if (!m || !langs.includes(m[2])) continue;
      const doc = readDoc(path.join(dir, name), m[2], required, substitute);
      if (!doc) continue;
      if (!bySlug.has(m[1])) bySlug.set(m[1], { slug: m[1], langs: {} });
      bySlug.get(m[1]).langs[m[2]] = doc;
    }
    return [...bySlug.values()];
  }

  const warnMissing = (item, label) => {
    for (const l of langs) if (!item.langs[l]) warnings.push(`${label}: 缺少 ${l} 版本，该语言下不会生成这个页面`);
  };

  // ---------- 插件 ----------
  const catSlugs = new Set(categories.map((c) => c.slug));
  const plugins = [];
  const pluginsDir = path.join(CONTENT, "plugins");
  for (const owner of dirs(pluginsDir)) {
    for (const repo of dirs(path.join(pluginsDir, owner))) {
      const dir = path.join(pluginsDir, owner, repo);
      const jsonFile = path.join(dir, "plugin.json");
      if (!fs.existsSync(jsonFile)) continue;
      const meta = readJson(jsonFile);
      const slug = `${owner}/${repo}`.toLowerCase();
      if (!catSlugs.has(meta.category)) errors.push(`plugins/${slug}/plugin.json: 未知分类 "${meta.category}"`);

      const docs = {};
      for (const l of langs) {
        const doc = readDoc(path.join(dir, `${l}.md`), l, ["title", "description", "summary"]);
        if (doc) docs[l] = doc;
      }
      if (!Object.keys(docs).length) continue; // 文案还没写完，整个插件先不上线

      const articles = readLocalized(path.join(dir, "articles"), ["title", "description", "date"]).map((a) => {
        if (a.slug === "articles") errors.push(`plugins/${slug}/articles: slug 不能叫 "articles"`);
        return { ...a, route: `/plugins/${slug}/${a.slug}`, date: Object.values(a.langs)[0].date };
      });
      articles.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

      const plugin = {
        ...meta,
        slug,
        route: `/plugins/${slug}`,
        repoUrl: `https://github.com/${meta.owner}/${meta.repo}`,
        install: meta.install || (meta.package ? fmt(cfg.installCommand, { package: meta.package }) : ""),
        langs: docs,
        articles,
      };
      warnMissing(plugin, `plugins/${slug}`);
      plugins.push(plugin);
    }
  }
  plugins.sort((a, b) => b.github.stars - a.github.stars || a.slug.localeCompare(b.slug));

  // ---------- 教程 ----------
  const tcatSlugs = new Set(tutorialCategories.map((c) => c.slug));
  const tutorials = readLocalized(path.join(CONTENT, "tutorials"), ["title", "description", "category", "date"]).map((t) => {
    const first = Object.values(t.langs)[0];
    if (!tcatSlugs.has(first.category)) errors.push(`tutorials/${t.slug}: 未知分类 "${first.category}"`);
    if (tcatSlugs.has(t.slug) || t.slug === "page") errors.push(`tutorials/${t.slug}: slug 与分类或分页路径冲突`);
    warnMissing(t, `tutorials/${t.slug}`);
    const updated = Object.values(t.langs).map((d) => d.updated || d.date).sort().pop();
    return { ...t, route: `/tutorials/${t.slug}`, category: first.category, date: first.date, updated };
  });
  tutorials.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  // ---------- 固定页 ----------
  const pages = readLocalized(path.join(CONTENT, "pages"), ["title", "description"], true).map((p) => {
    if (catSlugs.has(p.slug) || ["plugins", "tutorials", "zh", "404"].includes(p.slug)) errors.push(`pages/${p.slug}: slug 与已有路径冲突`);
    warnMissing(p, `pages/${p.slug}`);
    return { ...p, route: `/${p.slug}` };
  });

  return { config: cfg, langs, categories, tutorialCategories, copy, plugins, tutorials, pages, errors, warnings };
}

module.exports = { loadSite };
