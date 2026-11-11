---
title: "answer-me-with-html：用网页回答问题"
description: "一个通用 agent skill，让 AI 用一页带图表和表格的 HTML 回答复杂问题，支持 DSH、Claude Code、Codex 等，适合不想读大段文字的用户。"
summary: "agent 只写一份简短的 Markdown 草稿，随 skill 附带的 CLI 把它渲染成带图表、表格和代码的 HTML 页面。它是通用 agent skill，也能作为 DSH 插件安装。"
highlights:
  - "单页网页作答"
  - "草稿转页面"
  - "图表与表格"
  - "讲解视频"
  - "常驻模式"
faq:
  - q: "直接让模型写 HTML 不行吗，为什么要用这个 skill？"
    a: "用了这个 skill，模型只写 Markdown 草稿，SVG、CSS 和标签都由附带的 CLI 生成。按作者的基准测试，同样的问题平均输出 612 个 token，手写 HTML 则是 4,893 个；耗时为 12 秒对 31 秒。"
  - q: "每个问题都会生成页面吗？"
    a: "不会。是否出页面由 agent 判断，比如概念之间有关联、流程有多个步骤、需要多方对比的时候才出；一句话能答的问题仍然一句话回答。另有可选的常驻模式，给每个结论都配一张小页面。"
  - q: "answer-me-with-html 只能在 DeepSeek Harness 里用吗？"
    a: "不是。它是通用的 agent skill，README 除了 DSH 插件的装法，还写了 Claude Code、Codex、Cursor、OpenCode 等 agent 的安装方式，并说明只要 agent 能执行 shell 命令就能用。"
---

## answer-me-with-html 是做什么的？

answer-me-with-html 是一个 agent skill：遇到复杂问题时，agent 不再回一大段聊天文字，而是给出一张 HTML 页面，里面可以有正文、表格、代码和图表。

它的核心思路是分工。agent 只写一份简短的 Markdown 草稿，然后交给随 skill 附带的 CLI，由 CLI 生成 SVG 图、样式和标签。模型不用再手写坐标和 CSS，输出的 token 就少了很多；按作者的基准测试，同样的问题，草稿的 token 数大约是手写 HTML 的八分之一。

它并不专属于 DSH。同一个 skill 可以装进 Claude Code、Codex、Cursor、OpenCode 等 agent，仓库里也写了作为 DSH 插件的装法。要不要出页面由 agent 决定：问模块之间怎么配合，会得到目录树和调用图；问“Redis 还是 Memcached”，会得到对比表；一句话的问题照旧一句话回答。

## 核心功能

- **页面生成**：把 Markdown 草稿渲染成一张 HTML 页面，保存在 `~/.answer-me-with-html/pages/`。
- **图表类型**：时序图、状态图、调用图、目录树、时间线、对比表等，按问题内容选用。
- **页面按钮**：可切换主题和明暗模式、收集你的回复、复制生成该页面的 Markdown。
- **讲解视频**：在你提出要求时，`am video` 会生成带旁白的播放页，图表随讲解逐步展开。
- **常驻模式**：默认关闭。在 agent 的规则文件里加一条规则后，每个结论都会附带一张 2 到 4 个面板的小页面。
- **命令式设置**：用 `am config` 或对应的斜杠命令修改 `open`、`theme`、`mode`、`scale` 等选项。

## 怎么使用 answer-me-with-html

1. 确认已安装 Node.js 20 或更高版本。CLI 已经包含在 skill 里，不需要另外执行 `npm install`。
2. 在 DeepSeek Harness 里使用，README 给出的命令如下，profile 换成你实际用的那个：

```bash
dsh plugin --profile web add github:QingYunA/answer-me-with-html
```

3. 其他 agent 可以用 skills 安装器，它会询问要装到哪些 agent：

```bash
npx skills add QingYunA/answer-me-with-html
```

4. 照常提问即可，例如“Explain the TCP three-way handshake”；也可以直接说“explain it in HTML”来要求出页面。
5. 需要时在终端里改设置，比如不让页面自动在浏览器里打开：

```bash
am config set open off
```
