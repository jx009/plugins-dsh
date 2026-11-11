// 固定页（关于、提交、联系、隐私、条款）和 404。
const { esc } = require("../../scripts/lib/html");
const seo = require("../../scripts/lib/seo");
const { breadcrumb } = require("./parts");

function staticPage(ctx, p) {
  const crumbs = [
    { name: ctx.t("ui.home"), route: "/" },
    { name: ctx.t(`ui.pageNames.${p.slug}`), route: p.route },
  ];
  const page = {
    route: p.route,
    title: p.doc.title,
    description: p.doc.description,
    alternates: Object.keys(p.langs),
    section: p.slug,
  };
  const type = { about: "AboutPage", contact: "ContactPage" }[p.slug] || "WebPage";
  page.jsonld = [seo.webPage(ctx, page, type), seo.breadcrumbList(ctx, crumbs)];
  const submit = p.slug === "submit" && ctx.cfg.submitUrl ? `<p><a class="btn btn-ink" href="${esc(ctx.cfg.submitUrl)}" rel="noopener" target="_blank">${esc(ctx.t("ui.submit"))}</a></p>` : "";
  page.body = `<div class="wrap narrow">
${breadcrumb(ctx, crumbs)}
<article><header class="phead"><h1>${esc(p.doc.title)}</h1></header>
<div class="prose">${p.doc.html}</div>
${submit}
</article>
</div>`;
  return page;
}

/** 404 只生成一份（/404.html），放在默认语言下，不进 sitemap。 */
function notFound(ctx) {
  const page = {
    route: "/404",
    title: ctx.t("notFound.title"),
    description: ctx.t("notFound.description"),
    alternates: [],
    noindex: true,
    sitemap: false,
  };
  const links = [
    ["/", ctx.t("ui.home")],
    ["/plugins", ctx.t("ui.allPlugins")],
    ["/tutorials", ctx.t("ui.tutorials")],
  ];
  page.body = `<div class="wrap narrow nf">
<h1>${esc(ctx.t("notFound.h1"))}</h1>
<p class="lede">${esc(ctx.t("notFound.body"))}</p>
<ul class="chips">${links.map(([r, name]) => `<li><a href="${ctx.url(r)}">${esc(name)}</a></li>`).join("")}</ul>
</div>`;
  return page;
}

module.exports = function pages(ctx) {
  const out = ctx.pages.map((p) => staticPage(ctx, p));
  if (ctx.lang === ctx.cfg.defaultLang) out.push(notFound(ctx));
  return out;
};
