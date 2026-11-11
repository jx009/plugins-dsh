#!/usr/bin/env node
// 新增插件：从 GitHub 拉元数据，生成 plugin.json 和中英文文案骨架。
// 用法：npm run new:plugin -- owner/repo --category tools [--name "显示名"] [--package npm包名]

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { CONTENT, writeFile, writeJson, today, parseArgs } = require("./lib/paths");
const { fetchRepo } = require("./lib/github");

const skeleton = (name, lang) =>
  lang === "zh"
    ? `---
title: "${name}：一句话说清它解决什么问题"
description: "给搜索结果看的摘要，约 70-80 个汉字。写清它是什么、适合谁、装了之后能做什么。"
summary: "页面顶部和列表里显示的一两句简介。"
highlights:
  - 核心能力一
  - 核心能力二
  - 核心能力三
faq:
  - q: "${name} 适合什么场景？"
    a: "用自己的话回答。"
draft: true
---

## ${name} 是做什么的？

先用一两句话直接回答，再展开。不要照搬 README。

## 核心功能

- **功能名**：它具体做什么。

## 怎么使用 ${name}

1. 第一步
2. 第二步
`
    : `---
title: "${name}: one line on the problem it solves"
description: "Search snippet, about 150 characters. Say what it is, who it is for, and what you can do once it is installed."
summary: "One or two sentences shown at the top of the page and in listings."
highlights:
  - First capability
  - Second capability
  - Third capability
faq:
  - q: "When is ${name} the right choice?"
    a: "Answer in your own words."
draft: true
---

## What does ${name} do?

Answer directly in one or two sentences, then expand. Do not copy the README.

## Core features

- **Feature name**: what it actually does.

## How to use ${name}

1. First step
2. Second step
`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const input = (args._[0] || "").replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/$/, "");
  const [owner, repo] = input.split("/");
  const categories = yaml.load(fs.readFileSync(path.join(CONTENT, "categories.yml"), "utf8")).map((c) => c.slug);

  if (!owner || !repo || !categories.includes(args.category)) {
    console.error(`用法：npm run new:plugin -- owner/repo --category <分类>\n可选分类：${categories.join(", ")}`);
    process.exit(1);
  }

  const meta = await fetchRepo(owner, repo);
  const dir = path.join(CONTENT, "plugins", meta.owner.toLowerCase(), meta.repo.toLowerCase());
  const jsonFile = path.join(dir, "plugin.json");
  if (fs.existsSync(jsonFile)) {
    console.error(`已存在：${path.relative(process.cwd(), jsonFile)}。刷新数据请用 npm run sync。`);
    process.exit(1);
  }

  const name = typeof args.name === "string" ? args.name : meta.repo;
  writeJson(jsonFile, {
    owner: meta.owner,
    repo: meta.repo,
    name,
    category: args.category,
    package: typeof args.package === "string" ? args.package : meta.package,
    verified: false,
    listedAt: today(),
    updatedAt: today(),
    github: meta.github,
  });
  for (const lang of ["en", "zh"]) {
    const file = path.join(dir, `${lang}.md`);
    if (!fs.existsSync(file)) writeFile(file, skeleton(name, lang));
  }

  console.log(`已创建 ${path.relative(process.cwd(), dir)}`);
  console.log(`  README：https://github.com/${meta.owner}/${meta.repo}#readme`);
  if (!meta.package && typeof args.package !== "string") {
    console.log("  没在仓库里找到可发布的 npm 包名。若有安装命令，请在 plugin.json 里填 package 或 install。");
  }
  console.log("  写完 en.md / zh.md 后删掉 draft: true，再运行 npm run build。");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
