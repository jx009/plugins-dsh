---
title: "archify：让 Agent 画可交互的架构图"
description: "archify 是通用的 Agent 技能，把一段描述、一份方案或一个代码仓库变成单文件的可交互 HTML 图，支持十种图表类型，交付前自动校验。"
summary: "描述一个系统，或者让 Agent 读一个仓库，archify 会生成一个独立的 HTML 图表，可以点选浏览、在对话里继续修改，也能导出成图片。"
highlights:
  - "十种图表类型"
  - "单文件 HTML"
  - "交付前自动校验"
  - "源码证据链接"
  - "导出多种图片"
faq:
  - q: "archify 是 DSH 专属插件吗？"
    a: "不是。它是面向 Cursor、Claude Code、Codex CLI 和 OpenCode 的 Agent 技能。DeepSeek Harness 的支持来自一个单独的社区集成包，README 说明它不是 DeepSeek 官方产品。"
  - q: "能把已有的 Mermaid 图转成 archify 图吗？"
    a: "不能。README 写明自动解析 Mermaid、通用自动布局、托管分享和所见即所得编辑，目前都不在范围内。"
  - q: "图生成之后怎么修改？"
    a: "继续在对话里提具体要求，比如加上 Redis、把鉴权挪到左边、高亮回滚路径。archify 保留了带类型的源数据，Agent 会在同一张图上改。"
---

## archify 是做什么的？

archify 是一个让编程 Agent 画技术图的技能。你给它一段描述、一份方案或者一个代码仓库，它交回一个 HTML 文件，里面是一张可以交互的图。

Agent 并不是随手写出这个页面。它先生成一份带类型的 JSON 来描述图的内容，随技能附带的校验器会检查 schema、布局和连线，通过之后才交付文件。文件里自带的查看器可以聚焦某个节点、沿上下游追踪、查看一条完整路径，也可以切换主题。

archify 是通用的 Agent 技能，不是只为 DSH 写的插件。它主要面向 Cursor、Claude Code、Codex CLI 和 OpenCode，DeepSeek Harness 通过一个需要主动选用的社区集成来支持。

## 核心功能

- **十种图表**：架构图、工作流、时序图、数据流、生命周期、ERD、类图、树状图、时间线和瀑布图。
- **交付前校验**：schema、布局、HTML/SVG 和连线检查全部通过后，新文件才会替换上一份可用的结果。
- **交互式查看器**：节点聚焦、上下游可达范围、路径追踪和角色对比，依据的都是 Agent 写下的节点和关系。
- **源码证据**：需要时，架构图的节点可以链接到经过 Git 核对的文件和行号，并固定在某一次提交上。
- **便于传递**：成品只有一个 HTML 文件，可以导出图片，也可以生成指向某个视图的链接。
- **界面多语言**：内置英文、简体中文、繁体中文、西班牙文、韩文和阿拉伯文。

## 怎么使用 archify

1. 在 Cursor、Claude Code、Codex 或 OpenCode 里，把下面这句话发给 Agent，由它完成安装：

   ```text
   Install Archify for me by reading https://raw.githubusercontent.com/tt-a1i/archify/main/llms.txt
   ```

2. 在 DeepSeek Harness 里，改为添加 README 给出的社区集成包：

   ```bash
   dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0
   ```

3. 用一段描述直接出图：

   ```text
   Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.
   ```

4. 或者打开一个仓库，让技能梳理它的结构：

   ```text
   Use the archify skill to map this repository's runtime architecture.
   ```

5. 在对话里继续调整，直到图表达清楚为止。

按 README 的说明，DSH 集成针对的是开发者预览版 `@deepseek-ai/dsh@0.2.1-rc.2`，Node 版本要求 `^22.19.0` 或 `>=24.0.0`。
