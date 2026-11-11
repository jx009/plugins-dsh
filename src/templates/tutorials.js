// 教程：索引页、7 个分类页（都带分页）和教程正文页。
const { esc } = require("../../scripts/lib/html");
const { renderInline } = require("../../scripts/lib/markdown");
const seo = require("../../scripts/lib/seo");
const { breadcrumb, tutorialList, pluginList, pagination, prepFaqs, prepTerms, faqBlock, termsBlock } = require("./parts");

const catNav = (ctx, active) =>
  `<nav class="tabs" aria-label="${esc(ctx.t("ui.tutorials"))}"><ul>
<li><a href="${ctx.url("/tutorials")}"${active === "all" ? ' aria-current="page"' : ""}>${esc(ctx.t("tutorials.all"))}</a></li>
${ctx.tcats.map((c) => `<li><a href="${ctx.url(c.route)}"${active === c.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a></li>`).join("\n")}
</ul></nav>`;

/** view: {base, title, description, h1, ledeHtml, crumbs, active, tutorials, faqs, terms} */
function listPages(ctx, view) {
  const per = ctx.cfg.perPage.tutorials;
  const total = Math.max(1, Math.ceil(view.tutorials.length / per));
  const route = (n) => (n === 1 ? view.base : `${view.base}/page/${n}`);
  const pages = [];
  for (let n = 1; n <= total; n++) {
    const items = view.tutorials.slice((n - 1) * per, n * per);
    const label = ctx.t("ui.page", { n });
    const page = {
      route: route(n),
      title: n === 1 ? view.title : `${view.title} - ${label}`,
      description: n === 1 ? view.description : `${label}: ${view.description}`,
      alternates: ctx.site.langs,
      section: "tutorials",
      noindex: view.tutorials.length === 0,
      paged: n > 1,
      sitemap: n === 1,
      prev: n > 1 ? route(n - 1) : null,
      next: n < total ? route(n + 1) : null,
    };
    page.jsonld = [
      seo.webPage(ctx, page, "CollectionPage", {
        mainEntity: seo.itemList(ctx, items.map((t) => ({ name: t.doc.title, route: t.route })), (n - 1) * per),
      }),
      seo.breadcrumbList(ctx, view.crumbs),
      ...(n === 1 && view.faqs.length ? [seo.faqPage(view.faqs)] : []),
      ...(n === 1 && view.terms.length ? [seo.definedTermSet(ctx, page.route, view.h1, view.terms)] : []),
    ];
    page.body = `<div class="wrap">
${breadcrumb(ctx, view.crumbs)}
<header class="phead">
<h1>${esc(view.h1)}${n > 1 ? ` <span class="phead-page">${esc(label)}</span>` : ""}</h1>
${n === 1 ? view.ledeHtml : ""}
</header>
${catNav(ctx, view.active)}
${items.length ? tutorialList(ctx, items) : `<p class="empty">${esc(ctx.t("tutorials.empty"))}</p>`}
${pagination(ctx, view.base, n, total)}
${n === 1 ? `<div class="narrow list-extra">${termsBlock(ctx.t("ui.terms"), view.terms)}${faqBlock(ctx.t("ui.faq"), view.faqs)}</div>` : ""}
</div>`;
    pages.push(page);
  }
  return pages;
}

function tutorialPage(ctx, t, i) {
  const doc = t.doc;
  const crumbs = [
    { name: ctx.t("ui.home"), route: "/" },
    { name: ctx.t("ui.tutorials"), route: "/tutorials" },
    { name: t.cat.name, route: t.cat.route },
    { name: doc.title, route: t.route },
  ];
  const faqs = prepFaqs(doc.faq);
  const terms = prepTerms(doc.terms);
  const modified = doc.updated || t.date;
  const plugins = (doc.plugins || []).map((s) => ctx.pluginBySlug[String(s).toLowerCase()]).filter(Boolean);
  const sameCat = ctx.tutorials.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 5);
  const newer = ctx.tutorials[i - 1];
  const older = ctx.tutorials[i + 1];
  const page = {
    route: t.route,
    title: doc.title,
    description: doc.description,
    alternates: Object.keys(t.langs),
    section: "tutorials",
    ogType: "article",
    published: t.date,
    modified,
    lastmod: modified,
  };
  page.jsonld = [
    seo.webPage(ctx, page),
    seo.article(ctx, page, { published: t.date, modified, keywords: doc.tags, section: t.cat.name }),
    seo.breadcrumbList(ctx, crumbs),
    ...(faqs.length ? [seo.faqPage(faqs)] : []),
    ...(terms.length ? [seo.definedTermSet(ctx, t.route, doc.title, terms)] : []),
  ];
  const toc = doc.toc.length > 1 ? `<nav class="toc" aria-label="${esc(ctx.t("tutorial.onThisPage"))}" data-toc><h2>${esc(ctx.t("tutorial.onThisPage"))}</h2><ol>${doc.toc.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol></nav>` : "";
  const sources = (doc.sources || []).length
    ? `<section class="sources"><h2>${esc(ctx.t("tutorial.sources"))}</h2><ul>${doc.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a></li>`).join("")}</ul></section>`
    : "";
  const step = (x, key, rel) => (x ? `<a class="step-${rel}" href="${ctx.url(x.route)}" rel="${rel}"><span>${esc(ctx.t(`tutorial.${key}`))}</span>${esc(x.doc.title)}</a>` : "<span></span>");

  page.body = `<div class="wrap">
${breadcrumb(ctx, crumbs)}
<div class="read">
<article class="read-main">
<header class="phead">
<h1>${esc(doc.title)}</h1>
<p class="lede">${esc(doc.description)}</p>
<p class="meta"><a href="${ctx.url(t.cat.route)}">${esc(t.cat.name)}</a><span>${esc(ctx.t("tutorial.published"))} <time datetime="${t.date}">${ctx.date(t.date)}</time></span>${modified !== t.date ? `<span>${esc(ctx.t("tutorial.updated"))} <time datetime="${modified}">${ctx.date(modified)}</time></span>` : ""}</p>
</header>
<div class="prose">${doc.html}</div>
${termsBlock(ctx.t("ui.terms"), terms)}
${faqBlock(ctx.t("tutorial.faqHeading"), faqs)}
${sources}
<nav class="stepnav">${step(older, "older", "prev")}${step(newer, "newer", "next")}</nav>
</article>
<aside class="read-side">${toc}</aside>
</div>
${plugins.length ? `<section class="more"><h2>${esc(ctx.t("tutorial.plugins"))}</h2>${pluginList(ctx, plugins)}</section>` : ""}
${sameCat.length ? `<section class="more"><h2>${esc(ctx.t("tutorial.more", { name: t.cat.name }))}</h2>${tutorialList(ctx, sameCat)}</section>` : ""}
</div>`;
  return page;
}

module.exports = function tutorialsHub(ctx) {
  const homeCrumb = { name: ctx.t("ui.home"), route: "/" };
  const hubCrumb = { name: ctx.t("ui.tutorials"), route: "/tutorials" };
  const hub = listPages(ctx, {
    base: "/tutorials",
    title: ctx.t("tutorials.title"),
    description: ctx.t("tutorials.description"),
    h1: ctx.t("tutorials.h1"),
    ledeHtml: `<p class="lede">${esc(ctx.t("tutorials.lede"))}</p>`,
    crumbs: [homeCrumb, hubCrumb],
    active: "all",
    tutorials: ctx.tutorials,
    faqs: prepFaqs(ctx.t("tutorials.faq")),
    terms: prepTerms(ctx.t("tutorials.terms")),
  });
  const cats = ctx.tcats.flatMap((c) => {
    const title = ctx.t("tutorials.catTitle", { name: c.name });
    return listPages(ctx, {
      base: c.route,
      title,
      description: ctx.t("tutorials.catDescription", { name: c.name, tagline: c.tagline }),
      h1: title,
      ledeHtml: `<p class="lede">${esc(c.tagline)}</p><p class="phead-intro">${renderInline(c.intro || "")}</p>`,
      crumbs: [homeCrumb, hubCrumb, { name: c.name, route: c.route }],
      active: c.slug,
      tutorials: ctx.tutorials.filter((t) => t.category === c.slug),
      faqs: [],
      terms: [],
    });
  });
  return [...hub, ...cats, ...ctx.tutorials.map((t, i) => tutorialPage(ctx, t, i))];
};
