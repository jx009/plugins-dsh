// 插件详情页，以及挂在插件下面的文章索引和文章页。
const { esc, fmt, compact } = require("../../scripts/lib/html");
const { renderInline } = require("../../scripts/lib/markdown");
const seo = require("../../scripts/lib/seo");
const { breadcrumb, pluginList, tutorialList, installBox, prepFaqs, faqBlock, jack, icon } = require("./parts");

const licenseOf = (p) => (p.github.license && p.github.license !== "NOASSERTION" ? p.github.license : "");

/** 每个插件页都有的四个问题，答案由仓库数据填充。 */
function autoFaqs(ctx, p) {
  const T = ctx.t("plugin.autoFaq");
  const license = licenseOf(p);
  const vars = {
    name: p.name,
    slug: `${p.owner}/${p.repo}`,
    repo: p.repoUrl,
    install: p.install,
    license,
    pushed: ctx.date(p.github.pushedAt),
    checked: ctx.date(p.updatedAt),
  };
  vars.versionPart = p.github.version ? fmt(T.versionPart, { version: p.github.version }) : "";
  const qa = (q, a) => ({ q: fmt(T[q], vars), a: fmt(T[a], vars) });
  return [
    qa("installQ", p.install ? "installA" : "installNoneA"),
    qa("licenseQ", license ? "licenseA" : "licenseNoneA"),
    qa("activeQ", "activeA"),
    qa("verifiedQ", p.verified ? "verifiedYesA" : "verifiedNoA"),
  ];
}

/** 右侧"铭牌"：仓库数据一览。 */
function nameplate(ctx, p) {
  const S = (k) => esc(ctx.t(`plugin.spec.${k}`));
  const g = p.github;
  const ext = (href, text) => `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(text)}</a>`;
  const rows = [
    [S("category"), `<a href="${ctx.url(p.cat.route)}">${esc(p.cat.name)}</a>`],
    [S("author"), ext(`https://github.com/${p.owner}`, p.owner)],
    [S("stars"), g.stars.toLocaleString("en-US")],
    [S("forks"), g.forks.toLocaleString("en-US")],
    [S("issues"), g.openIssues.toLocaleString("en-US")],
    g.language && [S("language"), esc(g.language)],
    [S("license"), licenseOf(p) ? esc(licenseOf(p)) : S("noLicense")],
    [S("version"), g.version ? esc(g.version) : S("noVersion")],
    [S("pushed"), `<time datetime="${g.pushedAt}">${ctx.date(g.pushedAt)}</time>`],
    [S("created"), `<time datetime="${g.createdAt}">${ctx.date(g.createdAt)}</time>`],
    [S("listed"), `<time datetime="${p.listedAt}">${ctx.date(p.listedAt)}</time>`],
    [S("checked"), `<time datetime="${p.updatedAt}">${ctx.date(p.updatedAt)}</time>`],
    p.package && [S("package"), ext(`https://www.npmjs.com/package/${p.package}`, p.package)],
  ].filter(Boolean);
  const vKey = p.verified ? "verified" : "unverified";
  return `<aside class="plate" style="--jack:${p.cat.color}" aria-label="${S("heading")}">
<h2>${S("heading")}</h2>
<dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
<p class="plate-check${p.verified ? " is-ok" : ""}"><strong>${esc(ctx.t(`plugin.${vKey}`))}</strong> ${esc(ctx.t(`plugin.${vKey}Note`))}</p>
<p class="plate-links"><a class="btn btn-ink" href="${p.repoUrl}" rel="noopener" target="_blank">${icon("external")}<span>${S("repo")}</span></a>${g.homepage ? ` <a class="btn" href="${esc(g.homepage)}" rel="noopener" target="_blank">${S("homepage")}</a>` : ""}</p>
</aside>`;
}

function related(ctx, p) {
  const same = ctx.plugins.filter((x) => x.category === p.category && x.slug !== p.slug);
  const rest = ctx.plugins.filter((x) => x.category !== p.category);
  return [...same, ...rest].slice(0, 6);
}

function pluginPage(ctx, p) {
  const doc = p.doc;
  const crumbs = [
    { name: ctx.t("ui.home"), route: "/" },
    { name: ctx.t("ui.plugins"), route: "/plugins" },
    { name: p.cat.name, route: p.cat.route },
    { name: p.name, route: p.route },
  ];
  const faqs = prepFaqs([...autoFaqs(ctx, p), ...(doc.faq || [])]);
  const tutorials = ctx.tutorials.filter((t) => (t.doc.plugins || []).some((s) => String(s).toLowerCase() === p.slug)).slice(0, 6);
  const page = {
    route: p.route,
    title: doc.title,
    description: doc.description,
    alternates: Object.keys(p.langs),
    section: "plugins",
    modified: p.updatedAt,
    lastmod: p.updatedAt,
  };
  page.jsonld = [seo.webPage(ctx, page, "WebPage", { mainEntity: { "@id": `${ctx.abs(p.route)}#software` } }), seo.softwareApplication(ctx, p), seo.breadcrumbList(ctx, crumbs), seo.faqPage(faqs)];

  page.body = `<div class="wrap">
${breadcrumb(ctx, crumbs)}
<div class="detail">
<article class="detail-main">
<header class="dhead" style="--jack:${p.cat.color}">
<p class="dhead-id">${jack()}<a href="${ctx.url(p.cat.route)}">${esc(p.cat.name)}</a><span>${esc(p.owner)}/${esc(p.repo)}</span><span>${icon("star", 13)}${compact(p.github.stars)}</span></p>
<h1>${esc(doc.title)}</h1>
<p class="lede">${esc(doc.summary)}</p>
</header>
${p.github.archived ? `<p class="warn">${esc(ctx.t("plugin.archived"))}</p>` : ""}
<section class="install" id="install"><h2>${esc(ctx.t("plugin.install"))}</h2>
${installBox(ctx, p)}
${p.install ? `<p class="install-note">${renderInline(ctx.t("plugin.installNote"))}</p>` : ""}
</section>
${(doc.highlights || []).length ? `<section class="hl"><h2>${esc(ctx.t("plugin.highlights"))}</h2><ul>${doc.highlights.map((h) => `<li>${renderInline(h)}</li>`).join("")}</ul></section>` : ""}
<div class="prose">${doc.html}</div>
${p.articles.length ? `<section class="more"><div class="sec-head"><h2>${esc(ctx.t("plugin.articles", { name: p.name }))}</h2><a href="${ctx.url(p.route + "/articles")}">${esc(ctx.t("plugin.articlesAll", { name: p.name }))}</a></div>${articleList(ctx, p.articles.slice(0, 5))}</section>` : ""}
${faqBlock(ctx.t("plugin.faqHeading", { name: p.name }), faqs)}
</article>
${nameplate(ctx, p)}
</div>
${tutorials.length ? `<section class="more"><h2>${esc(ctx.t("plugin.relatedTutorials"))}</h2>${tutorialList(ctx, tutorials)}</section>` : ""}
<section class="more"><h2>${esc(ctx.t("plugin.related", { cat: p.cat.name }))}</h2>${pluginList(ctx, related(ctx, p))}</section>
</div>`;
  return page;
}

const articleList = (ctx, articles) =>
  `<ul class="tlist">${articles.map((a) => `<li class="trow"><a href="${ctx.url(a.route)}"><span class="trow-title">${esc(a.doc.title)}</span><span class="trow-desc">${esc(a.doc.description)}</span><span class="trow-meta"><time datetime="${a.date}">${ctx.date(a.date)}</time></span></a></li>`).join("\n")}</ul>`;

function articlePages(ctx, p) {
  if (!p.articles.length) return [];
  const base = [
    { name: ctx.t("ui.home"), route: "/" },
    { name: ctx.t("ui.plugins"), route: "/plugins" },
    { name: p.name, route: p.route },
  ];
  const indexRoute = `${p.route}/articles`;
  const indexCrumbs = [...base, { name: ctx.t("plugin.articles", { name: p.name }), route: indexRoute }];
  const back = `<p class="back"><a href="${ctx.url(p.route)}">${esc(ctx.t("plugin.backToPlugin", { name: p.name }))}</a></p>`;
  const index = {
    route: indexRoute,
    title: ctx.t("plugin.articlesTitle", { name: p.name }),
    description: ctx.t("plugin.articlesDescription", { name: p.name }),
    alternates: ctx.site.langs.filter((l) => p.articles.some((a) => a.langs[l]) && p.langs[l]),
    section: "plugins",
    lastmod: p.articles[0].date,
  };
  index.jsonld = [seo.webPage(ctx, index, "CollectionPage", { mainEntity: seo.itemList(ctx, p.articles.map((a) => ({ name: a.doc.title, route: a.route }))) }), seo.breadcrumbList(ctx, indexCrumbs)];
  index.body = `<div class="wrap narrow">${breadcrumb(ctx, indexCrumbs)}<header class="phead"><h1>${esc(index.title)}</h1><p class="lede">${esc(index.description)}</p></header>${articleList(ctx, p.articles)}${back}</div>`;

  const posts = p.articles.map((a) => {
    const crumbs = [...base, { name: a.doc.title, route: a.route }];
    const page = {
      route: a.route,
      title: a.doc.title,
      description: a.doc.description,
      alternates: Object.keys(a.langs).filter((l) => p.langs[l]),
      section: "plugins",
      ogType: "article",
      published: a.date,
      modified: a.doc.updated || a.date,
      lastmod: a.doc.updated || a.date,
    };
    page.jsonld = [seo.webPage(ctx, page), seo.article(ctx, page, { published: a.date, modified: page.modified, section: p.name }), seo.breadcrumbList(ctx, crumbs)];
    page.body = `<div class="wrap narrow">${breadcrumb(ctx, crumbs)}<article><header class="phead"><h1>${esc(a.doc.title)}</h1><p class="meta"><time datetime="${a.date}">${ctx.date(a.date)}</time></p></header><div class="prose">${a.doc.html}</div></article>${back}</div>`;
    return page;
  });
  return [index, ...posts];
}

module.exports = function pluginDetail(ctx) {
  return ctx.plugins.flatMap((p) => [pluginPage(ctx, p), ...articlePages(ctx, p)]);
};
