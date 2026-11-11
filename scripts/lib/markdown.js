// Markdown → HTML，并做三件后处理：标题加锚点（顺便产出目录）、外链加 rel、表格包一层滚动容器。
const { marked } = require("marked");
const { stripTags } = require("./html");

function slugify(text) {
  return (
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/**
 * @param {string} src Markdown 正文
 * @param {string} prefix 语言前缀（"" 或 "/zh"），用来把正文里的站内链接补成当前语言的地址
 * @returns {{html: string, toc: {id: string, text: string}[]}}
 */
function renderMarkdown(src, prefix = "") {
  let html = marked.parse(src, { gfm: true });
  const toc = [];
  const used = new Set();

  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = stripTags(inner);
    let id = slugify(text);
    for (let i = 2; used.has(id); i++) id = `${slugify(text)}-${i}`;
    used.add(id);
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"');
  if (prefix) {
    html = html.replace(/<a href="\/(?!\/)([^"]*)"/g, (m, rest) =>
      rest === prefix.slice(1) || rest.startsWith(prefix.slice(1) + "/") ? m : `<a href="${prefix}${rest ? "/" + rest : ""}"`
    );
  }
  html = html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, "</table></div>");

  return { html, toc };
}

/** 行内 Markdown（FAQ 答案、术语定义里的 `code` 和链接）。 */
const renderInline = (src) => marked.parseInline(String(src ?? ""), { gfm: true }).replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"');

module.exports = { renderMarkdown, renderInline };
