// 模板里用到的纯函数：转义、占位符替换、数字与日期格式化。

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** 替换 {key} 占位符；未提供的 key 原样保留。 */
const fmt = (s, vars = {}) => String(s ?? "").replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

/** "1 plugin|{n} plugins" 形式的复数选择；没有 | 时直接替换。 */
function plural(s, n, vars = {}) {
  const forms = String(s).split("|");
  return fmt(forms.length > 1 && n !== 1 ? forms[1] : forms[0], { n: n.toLocaleString("en-US"), ...vars });
}

/** 35744 → 35.7k */
function compact(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

const dateFormats = {};
function formatDate(iso, htmlLang) {
  if (!iso) return "";
  dateFormats[htmlLang] ||= new Intl.DateTimeFormat(htmlLang, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  return dateFormats[htmlLang].format(new Date(iso + "T00:00:00Z"));
}

/** 显示宽度：CJK 算 2。用来检查 title / description 是否会被搜索结果截断。 */
const width = (s) => [...String(s)].reduce((w, ch) => w + (ch.codePointAt(0) > 0x2e80 ? 2 : 1), 0);

/** 去标签取纯文本，给 JSON-LD 和搜索索引用。 */
const stripTags = (html) =>
  String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

module.exports = { esc, fmt, plural, compact, formatDate, width, stripTags };
