// 构建入口：读取 content/，渲染所有语言的所有页面，输出到 dist/。
// 用法：node scripts/build.js [--drafts]
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { SRC, DIST, writeFile, parseArgs, today } = require("./lib/paths");
const { loadSite } = require("./lib/content");
const { makeCtx } = require("./lib/context");
const { checkPage } = require("./lib/seo");
const extras = require("./lib/sitemap");
const { layout } = require("../src/templates/layout");

const TEMPLATES = ["home", "pluginsHub", "pluginDetail", "tutorials", "pages"].map((n) => require(`../src/templates/${n}`));

const started = Date.now();
const args = parseArgs(process.argv.slice(2));
const site = loadSite({ drafts: Boolean(args.drafts) });

function fail() {
  console.error(`\n构建失败，${site.errors.length} 个错误：`);
  for (const e of site.errors) console.error("  ✗ " + e);
  process.exit(1);
}
if (site.errors.length) fail();

/** 把一个目录下的同类文件按文件名顺序拼成一个。 */
function concat(dir, ext) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .sort()
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8"))
    .join("\n");
}

fs.rmSync(DIST, { recursive: true, force: true });

// ---------- 静态资源 ----------
const css = concat(path.join(SRC, "assets/css"), ".css");
const js = concat(path.join(SRC, "assets/js"), ".js");
const assetVersion = crypto.createHash("md5").update(css).update(js).digest("hex").slice(0, 8);
writeFile(path.join(DIST, "assets/site.css"), css);
writeFile(path.join(DIST, "assets/site.js"), js);
for (const dir of ["fonts", "img"]) {
  const from = path.join(SRC, "assets", dir);
  if (fs.existsSync(from)) fs.cpSync(from, path.join(DIST, "assets", dir), { recursive: true });
}
if (fs.existsSync(path.join(SRC, "static"))) fs.cpSync(path.join(SRC, "static"), DIST, { recursive: true });

// ---------- 页面 ----------
const siteLastmod =
  [...site.plugins.flatMap((p) => [p.listedAt, p.updatedAt]), ...site.tutorials.map((t) => t.updated)].filter(Boolean).sort().pop() || today();
const rendered = [];
const seen = new Map();
const ctxs = site.langs.map((lang) => makeCtx(site, lang, assetVersion));

for (const ctx of ctxs) {
  for (const page of TEMPLATES.flatMap((tpl) => tpl(ctx))) {
    const url = ctx.url(page.route);
    const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
    if (seen.has(file)) site.errors.push(`输出路径冲突：${file}`);
    seen.set(file, true);
    if (!page.noindex && !page.paged) site.warnings.push(...checkPage(ctx, page));
    writeFile(path.join(DIST, file), layout(ctx, page));
    rendered.push({ ctx, page });
  }

  // 搜索索引：紧凑数组，字段顺序与 site.js 里的读取一致。
  writeFile(
    path.join(DIST, `data/search.${ctx.lang}.json`),
    JSON.stringify({
      p: ctx.plugins.map((p) => [p.name, p.slug, p.doc.summary, p.category, p.github.stars, p.github.pushedAt, p.listedAt, p.install, p.owner]),
      t: ctx.tutorials.map((t) => [t.doc.title, t.slug, t.category, t.doc.description]),
    })
  );
  extras.writeFeed(ctx);
}

const shards = extras.writeSitemaps(site, rendered, siteLastmod);
extras.writeRobots(site);
extras.writeLlms(ctxs.find((c) => c.lang === site.config.defaultLang));
extras.writeHeaders();

if (site.errors.length) fail();

const warnings = [...new Set(site.warnings)];
if (warnings.length) {
  console.warn(`${warnings.length} 条提醒：`);
  for (const w of warnings) console.warn("  ! " + w);
}
if (site.config.siteUrl.includes("example.com")) console.warn("  ! site.config.json 里的 siteUrl 还是占位值，上线前要改成真实域名");
console.log(
  `完成：${rendered.length} 个页面（${site.langs.join(" + ")}），${site.plugins.length} 个插件，${site.tutorials.length} 篇教程，${shards} 个 sitemap 分片，用时 ${Date.now() - started}ms → dist/`
);
