// 首页：查找面板 + 跳线盘 + 最近收录 + 上手三步 + 教程 + FAQ。
const { esc } = require("../../scripts/lib/html");
const { renderInline } = require("../../scripts/lib/markdown");
const seo = require("../../scripts/lib/seo");
const { pluginList, tutorialList, patchbay, cmdBox, prepFaqs, faqBlock, icon } = require("./parts");

/** 查找面板。初始内容是星标最多的 6 个插件，脚本加载后接管输入和方向键。 */
function finder(ctx) {
  const top = ctx.plugins.slice(0, 6);
  const first = top[0];
  return `<div class="finder" data-finder>
<label class="finder-ask" for="finder-q">${esc(ctx.t("home.finderLabel"))}</label>
<div class="finder-field">${icon("search", 20)}<input id="finder-q" type="search" placeholder="${esc(ctx.t("home.finderPlaceholder"))}" autocomplete="off" spellcheck="false"></div>
<p class="finder-label" data-finder-label data-popular="${esc(ctx.t("home.finderPopular"))}" data-results="${esc(ctx.t("home.finderResults"))}">${esc(ctx.t("home.finderPopular"))}</p>
${pluginList(ctx, top, "data-finder-list")}
<div class="finder-out">
<code class="cmd-line" data-finder-cmd><span class="cmd-prompt" aria-hidden="true">$ </span><span data-finder-text>${esc(first && first.install ? first.install : ctx.t("js.noPackage"))}</span></code>
<button type="button" class="btn" data-finder-copy${first && first.install ? "" : " hidden"}>${icon("copy")}<span>${esc(ctx.t("ui.copy"))}</span></button>
</div>
</div>`;
}

function steps(ctx) {
  const items = ctx.t("home.steps");
  return `<ol class="steps">
${items.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p>${cmdBox(ctx, s.cmd)}</li>`).join("\n")}
</ol>`;
}

module.exports = function home(ctx) {
  const page = {
    route: "/",
    title: ctx.t("home.title"),
    description: ctx.t("home.description"),
    alternates: ctx.site.langs,
    section: "home",
    bodyClass: "home",
  };
  const faqs = prepFaqs(ctx.t("home.faq"));
  const latest = [...ctx.plugins].sort((a, b) => b.listedAt.localeCompare(a.listedAt) || b.github.stars - a.github.stars).slice(0, 8);
  const tutorials = ctx.tutorials.slice(0, 5);
  page.jsonld = [seo.webPage(ctx, page), seo.faqPage(faqs)];

  page.body = `<section class="hero"><div class="wrap">
<h1>${esc(ctx.t("home.h1"))}</h1>
<p class="lede">${renderInline(ctx.t("home.lede", { count: ctx.plugins.length }))}</p>
${finder(ctx)}
</div></section>

<section class="sec"><div class="wrap">
<h2>${esc(ctx.t("home.bayHeading"))}</h2>
${patchbay(ctx, "")}
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-head"><h2>${esc(ctx.t("home.latestHeading"))}</h2><a href="${ctx.url("/plugins")}">${esc(ctx.t("home.latestAll"))}</a></div>
${pluginList(ctx, latest)}
</div></section>

<section class="sec"><div class="wrap">
<h2>${esc(ctx.t("home.stepsHeading"))}</h2>
${steps(ctx)}
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-head"><h2>${esc(ctx.t("home.tutorialsHeading"))}</h2><a href="${ctx.url("/tutorials")}">${esc(ctx.t("home.tutorialsAll"))}</a></div>
<p class="sec-lede">${esc(ctx.t("home.tutorialsLede"))}</p>
${tutorials.length ? tutorialList(ctx, tutorials) : ""}
<ul class="chips">${ctx.tcats.map((c) => `<li><a href="${ctx.url(c.route)}">${esc(c.name)}</a></li>`).join("")}</ul>
</div></section>

<section class="sec"><div class="wrap narrow">
${faqBlock(ctx.t("home.faqHeading"), faqs)}
</div></section>`;
  return [page];
};
