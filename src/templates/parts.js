// 各页面共用的小部件。全部是 (ctx, 数据) → HTML 字符串 的纯函数。
const { esc, compact, plural } = require("../../scripts/lib/html");
const { renderInline } = require("../../scripts/lib/markdown");

const ICONS = {
  star: '<path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" fill="currentColor"/>',
  search: '<circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.6 10.6L14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  copy: '<rect x="5.5" y="5.5" width="8" height="8" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 3.2v-.1A1.6 1.6 0 008.9 1.5H3.1A1.6 1.6 0 001.5 3.1v5.8a1.6 1.6 0 001.6 1.6h.1" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  external: '<path d="M6.5 3.5h-3v9h9v-3M9.5 2.5h4v4M13.2 2.8L7.5 8.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  theme: '<circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2.5a5.5 5.5 0 010 11z" fill="currentColor"/>',
  menu: '<path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  check: '<path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
};

const icon = (name, size = 16) =>
  `<svg class="icon" viewBox="0 0 16 16" width="${size}" height="${size}" aria-hidden="true">${ICONS[name]}</svg>`;

/** 站点标志：两个插孔由一根线缆连起来。 */
const logo = (size = 28) =>
  `<svg class="logo" viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true"><path d="M8 19C8 5 24 5 24 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="8" cy="22" r="5" fill="currentColor"/><circle cx="24" cy="22" r="5" fill="currentColor"/><circle cx="8" cy="22" r="1.9" class="logo-hole"/><circle cx="24" cy="22" r="1.9" class="logo-hole"/></svg>`;

const jack = () => '<span class="jack" aria-hidden="true"></span>';

/** crumbs: [{name, route}]，最后一项是当前页，不加链接。 */
function breadcrumb(ctx, crumbs) {
  const items = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<li aria-current="page">${esc(c.name)}</li>`
        : `<li><a href="${ctx.url(c.route)}">${esc(c.name)}</a></li>`
    )
    .join("");
  return `<nav class="crumbs" aria-label="${esc(ctx.t("ui.breadcrumb"))}"><ol>${items}</ol></nav>`;
}

/** 插件目录行。整行是一个真链接，爬虫和键盘都能到达。 */
function pluginRow(ctx, p) {
  return `<li class="prow" style="--jack:${p.cat.color}" data-install="${esc(p.install)}"><a href="${ctx.url(p.route)}">
${jack()}<span class="prow-id"><span class="prow-name">${esc(p.name)}</span><span class="prow-owner">${esc(p.owner)}</span></span>
<span class="prow-sum">${esc(p.doc.summary)}</span>
<span class="prow-cat">${esc(p.cat.name)}</span>
<span class="prow-stars" title="${esc(ctx.t("ui.stars"))}">${icon("star", 13)}${compact(p.github.stars)}</span>
<time class="prow-date" datetime="${p.github.pushedAt}" title="${esc(ctx.t("ui.lastPush"))}">${ctx.date(p.github.pushedAt)}</time>
</a></li>`;
}

const pluginList = (ctx, plugins, attrs = "") => `<ul class="plist" ${attrs}>${plugins.map((p) => pluginRow(ctx, p)).join("\n")}</ul>`;

function tutorialRow(ctx, t) {
  return `<li class="trow"><a href="${ctx.url(t.route)}">
<span class="trow-title">${esc(t.doc.title)}</span>
<span class="trow-desc">${esc(t.doc.description)}</span>
<span class="trow-meta"><span class="trow-cat">${esc(t.cat.name)}</span><time datetime="${t.date}">${ctx.date(t.date)}</time></span>
</a></li>`;
}

const tutorialList = (ctx, tutorials) => `<ul class="tlist">${tutorials.map((t) => tutorialRow(ctx, t)).join("\n")}</ul>`;

/** 把 [{q, a}] 里的答案渲染成 HTML，供页面和 JSON-LD 共用。 */
const prepFaqs = (faqs) => (faqs || []).map((f) => ({ q: f.q, aHtml: renderInline(f.a) }));
const prepTerms = (terms) => (terms || []).map((t) => ({ name: t.name, descHtml: renderInline(t.desc) }));

function faqBlock(heading, faqs) {
  if (!faqs.length) return "";
  return `<section class="faq"><h2>${esc(heading)}</h2>
${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.aHtml}</p></details>`).join("\n")}
</section>`;
}

function termsBlock(heading, terms) {
  if (!terms.length) return "";
  return `<section class="terms"><h2>${esc(heading)}</h2>
<dl>${terms.map((t) => `<div><dt>${esc(t.name)}</dt><dd>${t.descHtml}</dd></div>`).join("")}</dl>
</section>`;
}

/** 分页导航。base 是第 1 页的路由，其余页是 base/page/N。 */
function pagination(ctx, base, current, total) {
  if (total <= 1) return "";
  const route = (n) => (n === 1 ? base : `${base}/page/${n}`);
  const nums = [];
  for (let n = 1; n <= total; n++) {
    if (n === 1 || n === total || Math.abs(n - current) <= 2) nums.push(n);
    else if (nums[nums.length - 1] !== 0) nums.push(0);
  }
  const link = (n, label, rel) => `<a href="${ctx.url(route(n))}"${rel ? ` rel="${rel}"` : ""}>${label}</a>`;
  return `<nav class="pager" aria-label="${esc(ctx.t("ui.pagination"))}">
${current > 1 ? link(current - 1, esc(ctx.t("ui.prev")), "prev") : `<span class="pager-off">${esc(ctx.t("ui.prev"))}</span>`}
<ol>${nums.map((n) => (n === 0 ? "<li>…</li>" : n === current ? `<li><span aria-current="page">${n}</span></li>` : `<li>${link(n, n)}</li>`)).join("")}</ol>
${current < total ? link(current + 1, esc(ctx.t("ui.next")), "next") : `<span class="pager-off">${esc(ctx.t("ui.next"))}</span>`}
</nav>`;
}

/**
 * 跳线盘：11 个分类插孔。active 是当前分类的 slug，"all" 表示全部。
 * rail 为 true 时是列表页的分类栏（宽屏竖排在列表左侧，窄屏是一条横向滚动条），
 * 每格带 data-cat，供列表脚本在搜索时改写数量和链接。
 */
function patchbay(ctx, active, rail = false) {
  const count = (slug) => ctx.plugins.filter((p) => p.category === slug).length;
  const cell = (slug, href, name, n, color, on) =>
    `<li><a class="bay-jack${on ? " is-on" : ""}" href="${href}"${rail ? ` data-cat="${slug}"` : ""}${color ? ` style="--jack:${color}"` : ""}${on ? ' aria-current="page"' : ""}>${jack()}<span class="bay-name">${esc(name)}</span><span class="bay-count">${n}</span></a></li>`;
  return `<nav class="bay${rail ? " bay-rail" : ""}" aria-label="${esc(ctx.t("ui.categories"))}"><ul>
${cell("", ctx.url("/plugins"), ctx.t("ui.allPlugins"), ctx.plugins.length, "", active === "all")}
${ctx.cats.map((c) => cell(c.slug, ctx.url(c.route), c.name, count(c.slug), c.color, active === c.slug)).join("\n")}
</ul></nav>`;
}

/** 一行命令加复制按钮。 */
const cmdBox = (ctx, cmd) =>
  `<div class="cmd"><code class="cmd-line"><span class="cmd-prompt" aria-hidden="true">$ </span>${esc(cmd)}</code><button type="button" class="btn" data-copy="${esc(cmd)}">${icon("copy")}<span>${esc(ctx.t("ui.copy"))}</span></button></div>`;

/** 安装命令框。没有可确认的 npm 包名时给出去 README 的指引。 */
function installBox(ctx, p) {
  if (!p.install) {
    return `<div class="cmd cmd-none"><p>${esc(ctx.t("plugin.noInstall"))} <a href="${p.repoUrl}#readme" rel="noopener" target="_blank">${esc(ctx.t("plugin.readInstall"))}</a></p></div>`;
  }
  return cmdBox(ctx, p.install);
}

const countLabel = (ctx, key, n) => plural(ctx.t(key), n);

module.exports = {
  icon,
  logo,
  jack,
  breadcrumb,
  pluginRow,
  pluginList,
  tutorialRow,
  tutorialList,
  prepFaqs,
  prepTerms,
  faqBlock,
  termsBlock,
  pagination,
  patchbay,
  cmdBox,
  installBox,
  countLabel,
};
