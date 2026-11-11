#!/usr/bin/env node
// 新增文章骨架（中英文各一份，默认 draft: true）。
// 教程：    npm run new:post -- install-first-plugin --category install
// 插件文章：npm run new:post -- v2-migration --plugin owner/repo

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { CONTENT, writeFile, today, parseArgs } = require("./lib/paths");

const TEXT = {
  en: {
    title: "Write the title as the question a reader would search for",
    description: "Search snippet, about 150 characters. Say what the reader can do after this page.",
    faqQ: "A question readers ask about this task?",
    faqA: "Answer in one or two sentences.",
    body: `## Short answer

Answer the title in two or three sentences before any background.

## Before you start

- What the reader needs installed or configured

## Steps

1. First step

   \`\`\`bash
   dsh --profile web --dump-config
   \`\`\`

2. Second step

## If it does not work

The most common failure and how to recognise it.
`,
  },
  zh: {
    title: "标题写成读者会搜索的那个问题",
    description: "给搜索结果看的摘要，约 70-80 个汉字。写清读完这页能做成什么。",
    faqQ: "读者做这件事时常问的一个问题？",
    faqA: "用一两句话回答。",
    body: `## 先说结论

先用两三句话直接回答标题，再讲背景。

## 开始之前

- 读者需要先装好或配好的东西

## 操作步骤

1. 第一步

   \`\`\`bash
   dsh --profile web --dump-config
   \`\`\`

2. 第二步

## 不生效怎么办

最常见的失败情况，以及怎么判断是不是它。
`,
  },
};

function skeleton(lang, { category, plugin }) {
  const t = TEXT[lang];
  const front = {
    title: t.title,
    description: t.description,
    ...(category ? { category } : {}),
    date: today(),
    ...(plugin && category ? { plugins: [plugin] } : {}),
    // 插件文章页只渲染正文，不输出问答块
    ...(category ? { faq: [{ q: t.faqQ, a: t.faqA }] } : {}),
    draft: true,
  };
  return `---\n${yaml.dump(front, { lineWidth: -1, quotingType: '"' })}---\n\n${t.body}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = String(args._[0] || "").toLowerCase();
  const plugin = typeof args.plugin === "string" ? args.plugin.toLowerCase() : "";
  const categories = yaml.load(fs.readFileSync(path.join(CONTENT, "tutorial-categories.yml"), "utf8")).map((c) => c.slug);
  const isArticle = plugin && !args.category;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || (!isArticle && !categories.includes(args.category))) {
    console.error(
      `用法：\n  教程：    npm run new:post -- <slug> --category <分类> [--plugin owner/repo]\n  插件文章：npm run new:post -- <slug> --plugin owner/repo\nslug 只用小写字母、数字和连字符。教程分类：${categories.join(", ")}`
    );
    process.exit(1);
  }

  let dir = path.join(CONTENT, "tutorials");
  if (plugin) {
    const pluginDir = path.join(CONTENT, "plugins", ...plugin.split("/"));
    if (!fs.existsSync(path.join(pluginDir, "plugin.json"))) {
      console.error(`没有这个插件：${plugin}。先运行 npm run new:plugin。`);
      process.exit(1);
    }
    if (isArticle) dir = path.join(pluginDir, "articles");
  }

  for (const lang of Object.keys(TEXT)) {
    const file = path.join(dir, `${slug}.${lang}.md`);
    if (fs.existsSync(file)) {
      console.log(`已存在，跳过：${path.relative(process.cwd(), file)}`);
      continue;
    }
    writeFile(file, skeleton(lang, { category: isArticle ? "" : args.category, plugin }));
    console.log(`已创建 ${path.relative(process.cwd(), file)}`);
  }
  console.log("写完后删掉 draft: true，再运行 npm run build。预览草稿用 npm run build -- --drafts。");
}

main();
