// 每种语言一个上下文对象：模板只通过它取文案、拼地址、拿数据。
const { fmt, formatDate } = require("./html");

const deepFmt = (v, vars) =>
  typeof v === "string"
    ? fmt(v, vars)
    : Array.isArray(v)
      ? v.map((x) => deepFmt(x, vars))
      : v && typeof v === "object"
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepFmt(x, vars)]))
        : v;

function makeCtx(site, lang, assetVersion) {
  const cfg = site.config;
  const L = cfg.langs[lang];
  const copy = site.copy[lang];

  /** 取文案（支持 a.b.c 路径和 {占位符}）。缺失的 key 记到 site.warnings，页面上显示 key 本身。 */
  const t = (key, vars = {}) => {
    const v = key.split(".").reduce((o, k) => (o == null ? o : o[k]), copy);
    if (v == null) {
      site.warnings.push(`copy/${lang}.yml: 缺少 ${key}`);
      return key;
    }
    return deepFmt(v, { brand: cfg.brand, ...vars });
  };

  const url = (route, l = lang) => {
    const prefix = cfg.langs[l].prefix;
    return route === "/" ? prefix || "/" : prefix + route;
  };
  const abs = (route, l = lang) => cfg.siteUrl + url(route, l);

  const cats = site.categories.map((c) => ({ slug: c.slug, color: c.color, route: `/${c.slug}`, ...c[lang] }));
  const tcats = site.tutorialCategories.map((c) => ({ slug: c.slug, route: `/tutorials/${c.slug}`, ...c[lang] }));
  const catBySlug = Object.fromEntries(cats.map((c) => [c.slug, c]));
  const tcatBySlug = Object.fromEntries(tcats.map((c) => [c.slug, c]));

  const localized = (items, extra) => items.filter((x) => x.langs[lang]).map((x) => ({ ...x, doc: x.langs[lang], ...extra(x) }));
  const plugins = localized(site.plugins, (p) => ({
    cat: catBySlug[p.category],
    articles: localized(p.articles, () => ({})),
  }));
  const tutorials = localized(site.tutorials, (x) => ({ cat: tcatBySlug[x.category] }));
  const pages = localized(site.pages, () => ({}));

  return {
    site,
    cfg,
    lang,
    L,
    otherLangs: site.langs.filter((l) => l !== lang),
    assetVersion,
    t,
    url,
    abs,
    date: (iso) => formatDate(iso, L.htmlLang),
    cats,
    tcats,
    catBySlug,
    tcatBySlug,
    plugins,
    pluginBySlug: Object.fromEntries(plugins.map((p) => [p.slug, p])),
    tutorials,
    pages,
  };
}

module.exports = { makeCtx };
