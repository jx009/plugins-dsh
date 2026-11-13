// 发布前的 SEO 检查：对照搜索结果的显示规则和站点构建时的长度上限，逐条给出问题。
// bad 会挡住「通过」和推送；warn 只提醒，审批时自己判断。
// 长度按显示宽度算（中日韩字符算 2），和 scripts/lib/seo.js 的规则一致：整条 <title> 不超过 60，description 50–160。

const TITLE_MAX = 60; // 搜索结果里标题能完整显示的大致宽度
const BRAND_SUFFIX = 13; // " | Plugin DSH"：标题不超过 47 时，站名会自动接在后面
const DESC_MIN = 50;
const DESC_GOOD = 100; // 短于这个，搜索结果里的摘要位置用不满
const DESC_MAX = 160;

const width = (s) => [...String(s || "")].reduce((w, ch) => w + (ch.codePointAt(0) > 0x2e80 ? 2 : 1), 0);
// 比较时忽略大小写、连字符、下划线和空格："DeepSeek-Balance-Whale-Widget" 和 "DeepSeek Balance Whale Widget" 算同一个词
const fold = (s) => String(s || "").toLowerCase().replace(/[-_\s.]+/g, "");
const has = (text, word) => !!word && fold(text).includes(fold(word));
// 关键词按空格拆成几个词，每个词都出现就算覆盖（不要求原样连在一起，标题里很少能原样放下整句）
const covers = (text, keyword) => String(keyword || "").split(/\s+/).filter(Boolean).every((w) => has(text, w));
// DSH 生态的核心词：标题和描述里至少要出现一个，搜索「DSH 插件」「DeepSeek Harness plugin」才找得到
const ECOSYSTEM = /\bDSH\b|DeepSeek[ -]?Harness/i;

const LABEL = { en: "英文", zh: "中文" };

function checkLang(lang, doc, name) {
  const out = [];
  const L = LABEL[lang];
  const bad = (msg) => out.push({ level: "bad", lang, msg: `${L}：${msg}` });
  const warn = (msg) => out.push({ level: "warn", lang, msg: `${L}：${msg}` });

  const title = String(doc.title || "").trim();
  const desc = String(doc.description || "").trim();
  const body = String(doc.body || "");
  const keyword = String(doc.keyword || "").trim();
  const faq = Array.isArray(doc.faq) ? doc.faq : [];
  const highlights = Array.isArray(doc.highlights) ? doc.highlights : [];

  // 标题
  if (title) {
    const w = width(title);
    if (!has(title, name)) bad(`标题里没有插件名「${name}」，搜插件名的人找不到这一页`);
    if (w > TITLE_MAX) bad(`标题太长（宽度 ${w}，上限 ${TITLE_MAX}），搜索结果里会被截断`);
    else if (w > TITLE_MAX - BRAND_SUFFIX) warn(`标题宽度 ${w}，超过 ${TITLE_MAX - BRAND_SUFFIX} 后不会再自动加「| Plugin DSH」`);
    if (!ECOSYSTEM.test(title) && !ECOSYSTEM.test(desc)) bad("标题和描述里都没有「DSH」或「DeepSeek Harness」，搜这个生态的人找不到");
    else if (!ECOSYSTEM.test(title)) warn("标题里没有「DSH」或「DeepSeek Harness」，放进去排名更好");
    // 关键词按搜索结果里真正显示的标题算：放得下时站点会接上「| Plugin DSH」
    const shown = w <= TITLE_MAX - BRAND_SUFFIX ? `${title} | Plugin DSH` : title;
    if (keyword && !covers(shown, keyword)) warn(`标题里没有核心关键词「${keyword}」`);
  }

  // 描述
  if (desc) {
    const w = width(desc);
    if (w > DESC_MAX) bad(`描述太长（宽度 ${w}，上限 ${DESC_MAX}），搜索结果里会被截断`);
    else if (w < DESC_MIN) bad(`描述太短（宽度 ${w}，至少 ${DESC_MIN}）`);
    else if (w < DESC_GOOD) warn(`描述偏短（宽度 ${w}），写到 ${DESC_GOOD}–${DESC_MAX} 能占满搜索结果的摘要位置`);
    if (!has(desc, name)) warn(`描述里没有插件名「${name}」`);
    if (!ECOSYSTEM.test(desc)) warn("描述里没有「DSH」或「DeepSeek Harness」");
    if (keyword && !covers(desc, keyword)) warn(`描述里没有核心关键词「${keyword}」`);
  }

  // 正文
  if (body.trim()) {
    const heads = body.match(/^\s*##\s+.+$/gm) || [];
    if (heads.length < 3) bad(`正文只有 ${heads.length} 个二级标题，至少要 3 个（是做什么的 / 核心功能 / 怎么使用）`);
    if (!heads.some((h) => /排查|报错|故障|问题|不生效|troubleshoot|error|fix|not work/i.test(h))) warn("正文没有「报错怎么排查」这类小节，排错类长尾词搜不到这一页");
    if (heads.length && heads.filter((h) => has(h, name)).length === 0) warn(`二级标题里都没有插件名「${name}」，至少放进一两个`);
    const text = body.replace(/```[\s\S]*?```/g, "").replace(/[#*`>\-[\]()]/g, "");
    const size = lang === "zh" ? width(text) / 2 : text.length;
    const min = lang === "zh" ? 500 : 1500;
    if (size < min) warn(`正文偏短（约 ${Math.round(size)} ${lang === "zh" ? "字" : "字符"}），至少 ${min} 才有足够内容被收录`);
    // 第一段要把插件是什么说清楚，搜索引擎和 AI 摘要优先取这里
    const intro = body.replace(/^\s*##[^\n]*\n/, "").trim().split(/\n\s*\n/)[0] || "";
    if (!has(intro, name)) warn("正文第一段没有出现插件名，第一句最好直接说明「X 是一个……的 DSH 插件」");
  }

  // 常见问题
  if (faq.length < 3) bad(`常见问题只有 ${faq.length} 条，至少 3 条（建议 4–6 条）`);
  else if (faq.length < 4) warn(`常见问题只有 ${faq.length} 条，建议 4–6 条，每条覆盖一个用户会搜的问题`);
  const named = faq.filter((f) => has(f.q, name)).length;
  if (faq.length && named < Math.ceil(faq.length / 2)) warn(`常见问题里只有 ${named} 条问题带插件名，问题写成「${name} 怎么…」这种用户真会搜的句子`);

  // 亮点
  if (highlights.length < 3) warn(`亮点只有 ${highlights.length} 条，建议 3–5 条`);

  if (!keyword) warn("没有填核心关键词，检查不了标题和描述是否覆盖它");
  return out;
}

/** 检查一条候选的中英文 SEO，返回 [{level, lang, msg}] */
function seoCheck(rec) {
  const d = (rec && rec.draft) || {};
  const name = String(d.name || (rec && rec.repo) || "").trim();
  if (!name) return [];
  return [...checkLang("en", d.en || {}, name), ...checkLang("zh", d.zh || {}, name)];
}

module.exports = { seoCheck, width };
