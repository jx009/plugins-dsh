// SEO 层：<head> 标签和 schema.org 结构化数据。所有页面类型共用。
const { esc, width, stripTags } = require("./html");

const TITLE_MAX = 60;
const DESC_MAX = 160;

/** 放得下就在标题后面加站名，放不下只用标题本身。 */
function fullTitle(ctx, title) {
  const withBrand = `${title} | ${ctx.cfg.brand}`;
  return title.includes(ctx.cfg.brand) || width(withBrand) > TITLE_MAX ? title : withBrand;
}

const ids = (ctx) => ({ org: `${ctx.cfg.siteUrl}/#organization`, website: `${ctx.abs("/")}#website` });

const organization = (ctx) => ({
  "@type": "Organization",
  "@id": ids(ctx).org,
  name: ctx.cfg.brand,
  url: `${ctx.cfg.siteUrl}/`,
  logo: { "@type": "ImageObject", url: `${ctx.cfg.siteUrl}/assets/img/logo-512.png`, width: 512, height: 512 },
  ...(ctx.cfg.contactEmail ? { email: ctx.cfg.contactEmail } : {}),
});

const website = (ctx) => ({
  "@type": "WebSite",
  "@id": ids(ctx).website,
  url: ctx.abs("/"),
  name: ctx.cfg.brand,
  description: ctx.t("home.description"),
  inLanguage: ctx.L.hreflang,
  publisher: { "@id": ids(ctx).org },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${ctx.abs("/plugins")}?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

const webPage = (ctx, page, type = "WebPage", extra = {}) => ({
  "@type": type,
  "@id": `${ctx.abs(page.route)}#webpage`,
  url: ctx.abs(page.route),
  name: page.title,
  description: page.description,
  inLanguage: ctx.L.hreflang,
  isPartOf: { "@id": ids(ctx).website },
  ...extra,
});

/** crumbs: [{name, route}]，最后一项是当前页。 */
const breadcrumbList = (ctx, crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: ctx.abs(c.route) })),
});

/** faqs: [{q, aHtml}] */
const faqPage = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripTags(f.aHtml) } })),
});

const itemList = (ctx, items, offset = 0) => ({
  "@type": "ItemList",
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: offset + i + 1, name: it.name, url: ctx.abs(it.route) })),
});

const definedTermSet = (ctx, route, name, terms) => ({
  "@type": "DefinedTermSet",
  "@id": `${ctx.abs(route)}#terms`,
  name,
  hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.name, description: stripTags(t.descHtml), inDefinedTermSet: `${ctx.abs(route)}#terms` })),
});

const softwareApplication = (ctx, p) => ({
  "@type": "SoftwareApplication",
  "@id": `${ctx.abs(p.route)}#software`,
  name: p.name,
  description: p.doc.description,
  url: ctx.abs(p.route),
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: p.cat.name,
  operatingSystem: "Windows, macOS, Linux",
  ...(p.github.version ? { softwareVersion: p.github.version.replace(/^v/, "") } : {}),
  ...(p.github.license && p.github.license !== "NOASSERTION" ? { license: `https://spdx.org/licenses/${p.github.license}.html` } : {}),
  codeRepository: p.repoUrl,
  sameAs: p.repoUrl,
  author: { "@type": "Person", name: p.owner, url: `https://github.com/${p.owner}` },
  // 收录并整理这一页的是本站，指向站点的 Organization 节点
  publisher: { "@id": ids(ctx).org },
  datePublished: p.github.createdAt,
  dateModified: p.github.pushedAt,
  inLanguage: ctx.L.hreflang,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

const article = (ctx, page, { published, modified, keywords, section }) => ({
  "@type": "Article",
  "@id": `${ctx.abs(page.route)}#article`,
  headline: page.title,
  description: page.description,
  url: ctx.abs(page.route),
  mainEntityOfPage: { "@id": `${ctx.abs(page.route)}#webpage` },
  datePublished: published,
  dateModified: modified || published,
  inLanguage: ctx.L.hreflang,
  image: `${ctx.cfg.siteUrl}/assets/img/og.png`,
  author: { "@id": ids(ctx).org },
  publisher: { "@id": ids(ctx).org },
  ...(section ? { articleSection: section } : {}),
  ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
});

/** 生成 <head> 里与 SEO 有关的全部标签。 */
function headTags(ctx, page) {
  const cfg = ctx.cfg;
  const title = fullTitle(ctx, page.title);
  const canonical = ctx.abs(page.route);
  const image = `${cfg.siteUrl}/assets/img/og.png`;
  const alternates = page.noindex ? [] : page.alternates;
  const graph = [organization(ctx), website(ctx), ...(page.jsonld || [])];
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}">`,
    page.noindex ? "" : `<link rel="canonical" href="${canonical}">`,
    ...alternates.map((l) => `<link rel="alternate" hreflang="${cfg.langs[l].hreflang}" href="${ctx.abs(page.route, l)}">`),
    alternates.includes(cfg.defaultLang) ? `<link rel="alternate" hreflang="x-default" href="${ctx.abs(page.route, cfg.defaultLang)}">` : "",
    page.prev ? `<link rel="prev" href="${ctx.abs(page.prev)}">` : "",
    page.next ? `<link rel="next" href="${ctx.abs(page.next)}">` : "",
    `<meta property="og:type" content="${page.ogType || "website"}">`,
    `<meta property="og:site_name" content="${esc(cfg.brand)}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(page.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${ctx.L.ogLocale}">`,
    ...alternates.filter((l) => l !== ctx.lang).map((l) => `<meta property="og:locale:alternate" content="${cfg.langs[l].ogLocale}">`),
    page.published ? `<meta property="article:published_time" content="${page.published}">` : "",
    page.modified ? `<meta property="article:modified_time" content="${page.modified}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n");
}

/** 构建时的长度检查，返回警告文字数组。 */
function checkPage(ctx, page) {
  const out = [];
  const where = ctx.url(page.route);
  if (width(fullTitle(ctx, page.title)) > TITLE_MAX) out.push(`${where}: title 过长（${width(page.title)}，上限 ${TITLE_MAX}）`);
  if (width(page.description) > DESC_MAX) out.push(`${where}: description 过长（${width(page.description)}，上限 ${DESC_MAX}）`);
  if (width(page.description) < 50) out.push(`${where}: description 过短（${width(page.description)}）`);
  return out;
}

module.exports = {
  fullTitle,
  headTags,
  checkPage,
  webPage,
  breadcrumbList,
  faqPage,
  itemList,
  definedTermSet,
  softwareApplication,
  article,
};
