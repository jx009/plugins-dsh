// 插件列表页：/plugins 总览和 11 个分类落地页，都带真实分页。
const { esc, plural } = require("../../scripts/lib/html");
const { renderInline } = require("../../scripts/lib/markdown");
const seo = require("../../scripts/lib/seo");
const { icon, breadcrumb, pluginList, patchbay, pagination, prepFaqs, prepTerms, faqBlock, termsBlock } = require("./parts");

/** 搜索和排序控件。没有脚本时保持隐藏，列表本身仍然完整可读。 */
function toolbar(ctx, view) {
  const sorts = ctx.t("plugins.sort");
  const cat = view.active === "all" ? "" : view.active;
  return `<form class="tools" data-list-tools data-cat="${cat}" data-base="${ctx.url(view.base)}" data-per="${ctx.cfg.perPage.plugins}" hidden role="search">
<label class="tools-filter">${icon("search")}<span class="vh">${esc(ctx.t("plugins.filterLabel"))}</span><input type="search" name="q" placeholder="${esc(ctx.t("plugins.filterPlaceholder"))}" autocomplete="off" spellcheck="false"></label>
<label class="tools-sort"><span>${esc(ctx.t("plugins.sortLabel"))}</span><select name="sort">
${Object.entries(sorts).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}
</select></label>
</form>`;
}

/**
 * 把一组插件切成若干页。
 * view: {base, title, description, h1, ledeHtml, crumbs, active, plugins, faqs, terms, extraHtml}
 */
function listPages(ctx, view) {
  const per = ctx.cfg.perPage.plugins;
  const total = Math.max(1, Math.ceil(view.plugins.length / per));
  const route = (n) => (n === 1 ? view.base : `${view.base}/page/${n}`);
  const pages = [];
  for (let n = 1; n <= total; n++) {
    const items = view.plugins.slice((n - 1) * per, n * per);
    const label = ctx.t("ui.page", { n });
    const page = {
      route: route(n),
      title: n === 1 ? view.title : `${view.title} - ${label}`,
      description: n === 1 ? view.description : `${label}: ${view.description}`,
      alternates: ctx.site.langs,
      section: "plugins",
      noindex: view.plugins.length === 0,
      paged: n > 1,
      sitemap: n === 1,
      prev: n > 1 ? route(n - 1) : null,
      next: n < total ? route(n + 1) : null,
    };
    page.jsonld = [
      seo.webPage(ctx, page, "CollectionPage", {
        mainEntity: seo.itemList(ctx, items.map((p) => ({ name: p.name, route: p.route })), (n - 1) * per),
      }),
      seo.breadcrumbList(ctx, view.crumbs),
      ...(n === 1 && view.faqs.length ? [seo.faqPage(view.faqs)] : []),
      ...(n === 1 && view.terms.length ? [seo.definedTermSet(ctx, page.route, view.h1, view.terms)] : []),
    ];
    // 宽屏：分类栏占左边一整列，从页头一直到页脚；窄屏：按源码顺序排，分类栏夹在标题和列表之间
    page.body = `<div class="wrap browse">
<div class="browse-head">
${breadcrumb(ctx, view.crumbs)}
<header class="phead">
<h1>${esc(view.h1)}${n > 1 ? ` <span class="phead-page">${esc(label)}</span>` : ""}</h1>
${n === 1 ? view.ledeHtml : ""}
</header>
</div>
${patchbay(ctx, view.active, true)}
<div class="browse-main">
${toolbar(ctx, view)}
<p class="list-count" data-list-count aria-live="polite">${esc(plural(ctx.t("plugins.count"), view.plugins.length))}</p>
${items.length ? pluginList(ctx, items, "data-list") : `<p class="empty">${esc(ctx.t("plugins.empty"))} <a href="${ctx.url("/submit")}">${esc(ctx.t("ui.submit"))}</a></p>`}
<div data-list-pager>${pagination(ctx, view.base, n, total)}</div>
${n === 1 ? `<div class="narrow list-extra">${view.extraHtml || ""}${termsBlock(ctx.t("ui.terms"), view.terms)}${faqBlock(ctx.t("ui.faq"), view.faqs)}</div>` : ""}
</div>
</div>`;
    pages.push(page);
  }
  return pages;
}

module.exports = function pluginsHub(ctx) {
  const homeCrumb = { name: ctx.t("ui.home"), route: "/" };
  const hubCrumb = { name: ctx.t("ui.plugins"), route: "/plugins" };

  const hub = listPages(ctx, {
    base: "/plugins",
    title: ctx.t("plugins.title"),
    description: ctx.t("plugins.description"),
    h1: ctx.t("plugins.h1"),
    ledeHtml: `<p class="lede">${esc(ctx.t("plugins.lede", { count: ctx.plugins.length }))}</p>`,
    crumbs: [homeCrumb, hubCrumb],
    active: "all",
    plugins: ctx.plugins,
    faqs: prepFaqs(ctx.t("plugins.faq")),
    terms: prepTerms(ctx.t("plugins.terms")),
  });

  const cats = ctx.cats.flatMap((c) => {
    const catTitle = ctx.t(`category.catTitles.${c.slug}`);
    const h1 = ctx.t("category.h1", { catTitle });
    return listPages(ctx, {
      base: c.route,
      title: ctx.t("category.title", { catTitle }),
      description: ctx.t("category.description", { catTitle, tagline: c.tagline }),
      h1,
      ledeHtml: `<p class="lede">${esc(c.tagline)}</p><p class="phead-intro">${renderInline(c.intro || "")}</p>`,
      crumbs: [homeCrumb, hubCrumb, { name: c.name, route: c.route }],
      active: c.slug,
      plugins: ctx.plugins.filter((p) => p.category === c.slug),
      faqs: prepFaqs(c.faq),
      terms: prepTerms(c.terms),
      extraHtml: c.pick ? `<section class="pick"><h2>${esc(ctx.t("category.pickHeading"))}</h2><p>${renderInline(c.pick)}</p></section>` : "",
    });
  });

  return [...hub, ...cats];
};
