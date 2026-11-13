// 把 GitHub 仓库的裸数据改写成站点用的中英文文案。走 OpenAI 兼容接口，没配密钥时只留骨架等你手动补。
const { loadConfig, categories, siteConfig } = require("./config");
const { SYSTEM, fill } = require("./prompt");

// 关键词 → 分类，只用于模型没给分类（或没配模型）时的兜底
const HINTS = [
  ["interface", /theme|ui|tui|render|display|layout|desktop|terminal|主题|界面|终端|渲染/i],
  ["session", /session|history|resume|context|compact|会话|历史|上下文|压缩/i],
  ["memory", /memory|remember|note|knowledge base|记忆|笔记|知识库/i],
  ["tools", /tool|search|browser|shell|file|mcp|工具|搜索|浏览器|文件/i],
  ["agent", /agent|subagent|skill|prompt|智能体|技能|提示词/i],
  ["workflow", /workflow|pipeline|task|orchestrat|工作流|流水线|任务/i],
  ["integration", /slack|discord|telegram|wechat|feishu|github|gateway|integration|集成|网关|机器人/i],
  ["model", /model|provider|llm|inference|openai|deepseek|模型|推理/i],
  ["dev", /cli|sdk|plugin|dev|build|test|开发|调试/i],
  ["knowledge", /doc|wiki|tutorial|learn|文档|教程|学习/i],
  ["fun", /game|joke|play|fun|游戏|娱乐/i],
];

function guessCategory(topics, text) {
  const hay = `${topics.join(" ")} ${text}`;
  for (const [slug, re] of HINTS) if (re.test(hay)) return slug;
  return "tools";
}

const clamp = (s, n) => String(s || "").replace(/\s+/g, " ").trim().slice(0, n);
const asArray = (v, n) => (Array.isArray(v) ? v : []).filter((x) => typeof x === "string" && x.trim()).slice(0, n).map((x) => x.trim());

/**
 * 清理模型给出的正文：站点的 markdown 渲染器不过滤原始 HTML，所以这里必须自己把关。
 * 规则：代码块和行内代码原样保留；其余地方的 < 一律转义；链接只允许 http(s)、mailto 和站内相对路径，
 * 其余的（javascript:、用实体或反斜杠伪装的协议等）去掉链接、只留文字。
 */
function sanitizeMarkdown(src) {
  const text = String(src || "")
    .replace(/\r\n/g, "\n")
    .trim();
  // 白名单而不是黑名单：渲染器不解码也不过滤链接地址，认不出来的一律不放
  const safe = (url) => /^(https?:\/\/|mailto:|\/(?!\/)|#|\.{1,2}\/)/i.test(url);
  const DEST = "\\s*<?((?:[^()\\s]|\\([^()\\s]*\\))*)";
  const clean = (seg) =>
    seg
      // 完整的 [文字](地址)：地址不安全就只留文字
      .replace(new RegExp(`!?\\[([^\\]\\n]*)\\]\\(${DEST}[^)\\n]*\\)`, "g"), (m, label, url) => (safe(url) ? m : label))
      // 上面没匹配到的残缺写法，直接把地址清空
      .replace(new RegExp(`\\]\\(${DEST}`, "g"), (m, url) => (!url || safe(url) ? m : "]("))
      // 引用式链接定义 [ref]: 地址
      .replace(/^[ \t]*\[[^\]\n]+\]:[ \t]*<?(\S*).*$/gm, (m, url) => (safe(url) ? m : ""))
      // 自动链接 <https://…> 改成普通链接，剩下的 < 全部转义，原始 HTML 一个都不放行
      .replace(/<((?:https?:\/\/|mailto:)[^>\s]*)>/gi, (m, url) => `[${url}](${url})`)
      .replace(/</g, "&lt;");
  // 按 ``` 切分，奇数段是代码块；代码块外再按 ` 切分，行内代码也原样保留
  return text
    .split(/(```[\s\S]*?```)/)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .split(/(`[^`\n]*`)/)
        .map((seg, j) => (j % 2 === 1 ? seg : clean(seg)))
        .join("");
    })
    .join("");
}

/** 调一次 chat/completions，返回文本。超时 90 秒；接口不接受 JSON 模式时自动退回普通模式。 */
async function chat(model, messages, maxTokens = 8000) {
  const url = model.baseUrl.replace(/\/+$/, "") + "/chat/completions";
  const call = async (jsonMode) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 90000);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${model.apiKey}` },
        body: JSON.stringify({
          model: model.model,
          messages,
          temperature: 0.4,
          max_tokens: maxTokens,
          ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
        }),
        signal: ctrl.signal,
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        const err = new Error(`模型接口 ${res.status}：${body.slice(0, 200)}`);
        err.status = res.status;
        throw err;
      }
      const data = await res.json();
      return (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
    } catch (e) {
      if (e.name === "AbortError") throw new Error("模型接口超时（90 秒），可以稍后重试或换一个更快的模型。");
      throw e;
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    return await call(true);
  } catch (e) {
    // 有些兼容接口不认 response_format，400 时去掉再试一次
    if (e.status === 400) return call(false);
    throw e;
  }
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("模型没有返回 JSON");
  return JSON.parse(raw.slice(start, end + 1));
}

function prompt(meta, readme, cats) {
  const catList = cats.map((c) => `- ${c.slug}（${c.name} / ${c.nameEn}）：${c.tagline}`).join("\n");
  const install = siteConfig().installCommand;
  return [
    {
      role: "system",
      content: fill(SYSTEM, { name: meta.repo, install, catList }),
    },
    {
      role: "user",
      content: `仓库：${meta.owner}/${meta.repo}
描述：${meta.github.description || "（无）"}
Topics：${(meta.github.topics || []).join(", ") || "（无）"}
语言：${meta.github.language || "未知"}；星标：${meta.github.stars}；许可证：${meta.github.license || "未知"}
npm 包名：${meta.package || "（未在 package.json 中找到）"}
README（截断）：
${readme.slice(0, 9000)}`,
    },
  ];
}

/** 没配模型时的骨架：标题留空，正文只有标题和待填提示，审批时一眼能看出没改写 */
function skeletonDoc(meta, zh) {
  const name = meta.repo;
  if (zh) {
    return {
      keyword: `${name} DSH 插件`,
      title: "",
      description: clamp(meta.github.description || "", 100),
      summary: "",
      highlights: [],
      faq: [],
      body: `## ${name} 是做什么的？\n\n（待补：第一句写成「${name} 是一个……的 DSH 插件」）\n\n## ${name} 核心功能\n\n- （待补）\n\n## 怎么安装和使用 ${name}？\n\n1. （待补）\n\n## ${name} 报错怎么排查？\n\n（待补）\n`,
    };
  }
  return {
    title: "",
    description: clamp(meta.github.description || "", 200),
    keyword: `${name} DSH plugin`,
    summary: "",
    highlights: [],
    faq: [],
    body: `## What does ${name} do?\n\n(TODO: start with "${name} is a DSH plugin that ...")\n\n## ${name} core features\n\n- (TODO)\n\n## How to install and use ${name}\n\n1. (TODO)\n\n## How to troubleshoot ${name}\n\n(TODO)\n`,
  };
}

function fallback(meta, readme, cats) {
  const category = guessCategory(meta.github.topics || [], `${meta.github.description || ""} ${readme.slice(0, 2000)}`);
  return {
    name: meta.repo,
    category: cats.some((c) => c.slug === category) ? category : "tools",
    install: "",
    en: skeletonDoc(meta, false),
    zh: skeletonDoc(meta, true),
  };
}

/** 校验并收紧模型输出；分类不认识时按关键词兜底 */
function normalize(raw, meta, cats) {
  const slugs = cats.map((c) => c.slug);
  const lang = (v, isZh) => {
    const o = v && typeof v === "object" ? v : {};
    // 亮点和问答的答案在站点上按行内 Markdown 渲染，同样要清理
    const faq = (Array.isArray(o.faq) ? o.faq : [])
      .filter((f) => f && f.q && f.a)
      .slice(0, 6)
      .map((f) => ({ q: clamp(f.q, 160), a: sanitizeMarkdown(clamp(f.a, 600)) }));
    return {
      keyword: clamp(o.keyword, 80),
      title: clamp(o.title, 140),
      description: clamp(o.description, isZh ? 160 : 300),
      summary: clamp(o.summary, isZh ? 200 : 400),
      highlights: asArray(o.highlights, 5).map((x) => sanitizeMarkdown(clamp(x, 120))),
      faq,
      body: sanitizeMarkdown(o.body),
    };
  };
  const install = String(raw.install || "").trim();
  return {
    name: clamp(raw.name, 60) || meta.repo,
    category: slugs.includes(raw.category) ? raw.category : guessCategory(meta.github.topics || [], meta.github.description || ""),
    install: /^dsh\s+/.test(install) ? clamp(install, 200) : "",
    en: lang(raw.en, false),
    zh: lang(raw.zh, true),
  };
}

/**
 * 改写一个候选。
 * @returns {Promise<{relevant: boolean, reason?: string, data?: object, note?: string}>}
 */
async function rewrite(meta, readme) {
  const cfg = loadConfig();
  const cats = categories();
  if (!cfg.model.apiKey) return { relevant: true, data: fallback(meta, readme, cats), note: "未配置模型密钥：文案是占位骨架，通过之前要手动补完" };

  const text = await chat(cfg.model, prompt(meta, readme, cats));
  const raw = extractJson(text);
  if (raw.relevant === false) return { relevant: false, reason: clamp(raw.reason || "模型判断与 DSH 无关", 200) };
  return { relevant: true, data: normalize(raw, meta, cats) };
}

module.exports = { rewrite, guessCategory, sanitizeMarkdown };
