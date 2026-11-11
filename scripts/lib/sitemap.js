// 页面以外的输出：sitemap 分片、robots.txt、RSS、llms.txt、Cloudflare _headers。
const path = require("path");
const { DIST, writeFile } = require("./paths");
const { esc } = require("./html");

const xml = (s) => esc(s).replace(/'/g, "&apos;");

const kindOf = (page) =>
  page.route.startsWith("/plugins/") ? "plugins" : page.section === "tutorials" && page.ogType === "article" ? "tutorials" : "pages";

function urlEntry(e) {
  const alts = e.alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xml(a.href)}"/>`).join("");
  return `<url><loc>${xml(e.loc)}</loc><lastmod>${e.lastmod}</lastmod>${alts}</url>`;
}

/** rendered: [{ctx, page}]。返回写出的分片数量。 */
function writeSitemaps(site, rendered, siteLastmod) {
  const cfg = site.config;
  const groups = { pages: [], tutorials: [], plugins: [] };
  for (const { ctx, page } of rendered) {
    if (page.noindex || page.sitemap === false) continue;
    const alternates = page.alternates.map((l) => ({ hreflang: cfg.langs[l].hreflang, href: ctx.abs(page.route, l) }));
    if (page.alternates.includes(cfg.defaultLang)) alternates.push({ hreflang: "x-default", href: ctx.abs(page.route, cfg.defaultLang) });
    groups[kindOf(page)].push({ loc: ctx.abs(page.route), lastmod: page.lastmod || siteLastmod, alternates });
  }

  const shards = [];
  for (const [kind, entries] of Object.entries(groups)) {
    if (!entries.length) continue;
    const count = Math.ceil(entries.length / cfg.sitemapShardSize);
    for (let i = 0; i < count; i++) {
      const part = entries.slice(i * cfg.sitemapShardSize, (i + 1) * cfg.sitemapShardSize);
      const name = count > 1 || kind === "plugins" ? `${kind}-${i + 1}.xml` : `${kind}.xml`;
      const lastmod = part.map((e) => e.lastmod).sort().pop();
      writeFile(
        path.join(DIST, "sitemaps", name),
        `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${part.map(urlEntry).join("\n")}\n</urlset>\n`
      );
      shards.push({ loc: `${cfg.siteUrl}/sitemaps/${name}`, lastmod });
    }
  }
  writeFile(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${shards.map((s) => `<sitemap><loc>${s.loc}</loc><lastmod>${s.lastmod}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`
  );
  return shards.length;
}

function writeRobots(site) {
  writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /data/\n\nSitemap: ${site.config.siteUrl}/sitemap.xml\n`);
}

/** 每种语言一份 RSS：最新教程和新收录的插件混排，取最近 30 条。 */
function writeFeed(ctx) {
  const items = [
    ...ctx.tutorials.map((t) => ({ title: t.doc.title, desc: t.doc.description, route: t.route, date: t.date })),
    ...ctx.plugins.map((p) => ({ title: p.doc.title, desc: p.doc.description, route: p.route, date: p.listedAt })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);
  const rfc = (d) => new Date(d + "T00:00:00Z").toUTCString();
  const self = ctx.abs("/feed.xml");
  writeFile(
    path.join(DIST, ctx.url("/feed.xml")),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xml(ctx.cfg.brand)}</title>
<link>${ctx.abs("/")}</link>
<description>${xml(ctx.t("home.description"))}</description>
<language>${ctx.L.hreflang}</language>
<atom:link href="${self}" rel="self" type="application/rss+xml"/>
${items.length ? `<lastBuildDate>${rfc(items[0].date)}</lastBuildDate>` : ""}
${items.map((i) => `<item><title>${xml(i.title)}</title><link>${ctx.abs(i.route)}</link><guid isPermaLink="true">${ctx.abs(i.route)}</guid><pubDate>${rfc(i.date)}</pubDate><description>${xml(i.desc)}</description></item>`).join("\n")}
</channel></rss>
`
  );
}

/** 给 LLM 爬虫看的站点摘要，用默认语言写。 */
function writeLlms(ctx) {
  const top = ctx.plugins.slice(0, 200);
  const lines = [
    `# ${ctx.cfg.brand}`,
    "",
    `> ${ctx.t("home.description")}`,
    "",
    ctx.t("ui.disclaimer"),
    "",
    `## ${ctx.t("ui.pluginCategories")}`,
    "",
    ...ctx.cats.map((c) => `- [${c.name}](${ctx.abs(c.route)}): ${c.tagline}`),
    "",
    `## ${ctx.t("ui.plugins")}`,
    "",
    ...top.map((p) => `- [${p.name}](${ctx.abs(p.route)}): ${p.doc.summary}`),
    "",
    `## ${ctx.t("ui.tutorials")}`,
    "",
    ...ctx.tcats.map((c) => `- [${c.name}](${ctx.abs(c.route)}): ${c.tagline}`),
    ...ctx.tutorials.slice(0, 200).map((t) => `- [${t.doc.title}](${ctx.abs(t.route)}): ${t.doc.description}`),
    "",
  ];
  writeFile(path.join(DIST, "llms.txt"), lines.join("\n"));
}

function writeHeaders() {
  writeFile(
    path.join(DIST, "_headers"),
    `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/site.css
  Cache-Control: public, max-age=31536000, immutable
/assets/site.js
  Cache-Control: public, max-age=31536000, immutable
/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/assets/img/*
  Cache-Control: public, max-age=86400
/data/*
  X-Robots-Tag: noindex
`
  );
}

module.exports = { writeSitemaps, writeRobots, writeFeed, writeLlms, writeHeaders };
