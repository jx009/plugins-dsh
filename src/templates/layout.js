// 整页骨架：<head>、页眉、页脚、搜索对话框。page.body 是各页面模板产出的主体 HTML。
const { esc } = require("../../scripts/lib/html");
const { headTags } = require("../../scripts/lib/seo");
const { icon, logo, jack } = require("./parts");

// 在首屏绘制前确定主题，避免闪烁。没有 JS 时保持浅色。
// data-theme-pref 记用户的选择（system / light / dark），data-theme 是实际生效的 light / dark。
const THEME_INIT = `(function(){var d=document.documentElement,p;try{p=localStorage.getItem("theme")}catch(e){}if(p!=="light"&&p!=="dark")p="system";d.dataset.themePref=p;d.dataset.theme=p==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p})()`;

function analytics(cfg) {
  const out = [];
  const { ga4, baidu } = cfg.analytics || {};
  if (ga4) {
    out.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga4)}"></script>`);
    out.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${esc(ga4)}")</script>`);
  }
  if (baidu) out.push(`<script async src="https://hm.baidu.com/hm.js?${esc(baidu)}"></script>`);
  return out.join("\n");
}

function verification(cfg) {
  const v = cfg.verification || {};
  return [
    v.google && `<meta name="google-site-verification" content="${esc(v.google)}">`,
    v.bing && `<meta name="msvalidate.01" content="${esc(v.bing)}">`,
    v.baidu && `<meta name="baidu-site-verification" content="${esc(v.baidu)}">`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** 语言切换：对应语言有这一页就直达，没有就去那个语言的首页。 */
function langSwitch(ctx, page) {
  return ctx.otherLangs
    .map((l) => {
      const route = !page.noindex && page.alternates.includes(l) ? page.route : "/";
      return `<a class="hd-lang" href="${ctx.url(route, l)}" hreflang="${ctx.cfg.langs[l].hreflang}" lang="${ctx.cfg.langs[l].htmlLang}">${esc(ctx.cfg.langs[l].label)}</a>`;
    })
    .join("");
}

function header(ctx, page) {
  const nav = [
    ["/plugins", ctx.t("ui.plugins"), "plugins"],
    ["/tutorials", ctx.t("ui.tutorials"), "tutorials"],
    ["/submit", ctx.t("ui.submit"), "submit"],
  ];
  return `<header class="hd"><div class="wrap hd-in">
<a class="hd-brand" href="${ctx.url("/")}">${logo()}<span>${esc(ctx.cfg.brand)}</span></a>
<nav class="hd-nav" id="nav" aria-label="${esc(ctx.t("ui.mainNav"))}">
${nav.map(([r, label, key]) => `<a href="${ctx.url(r)}"${page.section === key ? ' aria-current="true"' : ""}>${esc(label)}</a>`).join("\n")}
</nav>
<div class="hd-tools">
<button type="button" class="hd-search" data-open-search>${icon("search")}<span>${esc(ctx.t("ui.search"))}</span><kbd>Ctrl K</kbd></button>
${langSwitch(ctx, page)}
<button type="button" class="hd-icon hd-theme" data-theme-toggle data-label-system="${esc(ctx.t("ui.themeSystem"))}" data-label-light="${esc(ctx.t("ui.themeLight"))}" data-label-dark="${esc(ctx.t("ui.themeDark"))}" aria-label="${esc(ctx.t("ui.toggleTheme"))}" title="${esc(ctx.t("ui.toggleTheme"))}"><span class="ti ti-system">${icon("theme", 18)}</span><span class="ti ti-light">${icon("sun", 18)}</span><span class="ti ti-dark">${icon("moon", 18)}</span></button>
<button type="button" class="hd-icon hd-menu" data-nav-toggle aria-controls="nav" aria-expanded="false" aria-label="${esc(ctx.t("ui.menu"))}">${icon("menu", 18)}</button>
</div>
</div></header>`;
}

function footer(ctx) {
  const cfg = ctx.cfg;
  const pageLink = (slug) => {
    const p = ctx.pages.find((x) => x.slug === slug);
    return p ? `<li><a href="${ctx.url(p.route)}">${esc(ctx.t(`ui.pageNames.${slug}`))}</a></li>` : "";
  };
  const feed = ctx.url("/feed.xml");
  return `<footer class="ft"><div class="wrap">
<div class="ft-cols">
<div><p class="ft-h">${esc(ctx.t("ui.pluginCategories"))}</p><ul class="ft-cats">
${ctx.cats.map((c) => `<li style="--jack:${c.color}"><a href="${ctx.url(c.route)}">${jack()}${esc(c.name)}</a></li>`).join("\n")}
</ul></div>
<div><p class="ft-h">${esc(ctx.t("ui.tutorials"))}</p><ul>
${ctx.tcats.map((c) => `<li><a href="${ctx.url(c.route)}">${esc(c.name)}</a></li>`).join("\n")}
</ul></div>
<div><p class="ft-h">${esc(ctx.t("ui.site"))}</p><ul>
${["about", "submit", "contact", "privacy", "terms"].map(pageLink).join("\n")}
<li><a href="${feed}">RSS</a></li>
<li><a href="/sitemap.xml">${esc(ctx.t("ui.sitemap"))}</a></li>
</ul></div>
<div><p class="ft-h">DeepSeek Harness</p><ul>
<li><a href="${cfg.official.repo}" rel="noopener" target="_blank">${esc(ctx.t("ui.officialRepo"))}</a></li>
<li><a href="${cfg.official.docs}" rel="noopener" target="_blank">${esc(ctx.t("ui.officialDocs"))}</a></li>
</ul></div>
</div>
<p class="ft-note">${esc(ctx.t("ui.disclaimer"))}</p>
<p class="ft-note">© ${new Date().getFullYear()} ${esc(cfg.brand)}</p>
</div></footer>`;
}

const searchDialog = (ctx) => `<dialog class="sd" id="search" aria-label="${esc(ctx.t("ui.search"))}">
<div class="sd-box">
<label class="sd-field">${icon("search", 18)}<input type="search" id="search-input" placeholder="${esc(ctx.t("ui.searchPlaceholder"))}" autocomplete="off" spellcheck="false"></label>
<ul class="sd-results" id="search-results"></ul>
<p class="sd-hint">${esc(ctx.t("ui.searchHint"))}</p>
</div>
</dialog>`;

/** 前端脚本需要的少量数据，随页面内嵌，省一次请求。 */
function siteData(ctx) {
  const data = {
    lang: ctx.lang,
    prefix: ctx.L.prefix,
    locale: ctx.L.htmlLang,
    index: `/data/search.${ctx.lang}.json?v=${ctx.assetVersion}`,
    cats: Object.fromEntries(ctx.cats.map((c) => [c.slug, [c.name, c.color]])),
    tcats: Object.fromEntries(ctx.tcats.map((c) => [c.slug, c.name])),
    t: { ...ctx.t("js"), prev: ctx.t("ui.prev"), next: ctx.t("ui.next"), pagination: ctx.t("ui.pagination") },
  };
  return `<script id="site-data" type="application/json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function layout(ctx, page) {
  const v = ctx.assetVersion;
  return `<!doctype html>
<html lang="${ctx.L.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${headTags(ctx, page)}
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#E9E9E4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1A1B1D" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="${esc(ctx.cfg.brand)}" href="${ctx.url("/feed.xml")}">
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${v}">
<script>${THEME_INIT}</script>
${verification(ctx.cfg)}
${analytics(ctx.cfg)}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ""}>
<a class="skip" href="#main">${esc(ctx.t("ui.skip"))}</a>
${header(ctx, page)}
<main id="main">
${page.body}
</main>
${footer(ctx)}
${searchDialog(ctx)}
${siteData(ctx)}
<script src="/assets/site.js?v=${v}" defer></script>
</body>
</html>
`;
}

module.exports = { layout };
