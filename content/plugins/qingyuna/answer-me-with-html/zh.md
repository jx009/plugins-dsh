---
title: "answer-me-with-html：DSH 用一页 HTML 回答"
description: "answer-me-with-html 是一个用带图表的单页 HTML 回答复杂问题、而且更省 token 的 DSH 插件。了解安装方法、常用设置和问题排查。"
summary: "Agent 只写一份简短的 Markdown 草稿，由内置命令行渲染成带图表、表格和代码的 HTML 页面。它是通用的 Agent 技能，也能作为 DSH 插件安装。"
highlights:
  - "一页 HTML 回答复杂问题"
  - "token 消耗约为手写 HTML 的 1/8"
  - "时序图、调用图和对比表"
  - "带旁白的讲解视频"
  - "可选的常开模式"
faq:
  - q: "answer-me-with-html 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add github:QingYunA/answer-me-with-html`，profile 换成你实际在用的。需要 Node.js 20 以上；命令行已经打包在技能里，不用再执行 `npm install`。"
  - q: "为什么用 answer-me-with-html，而不是直接让模型写 HTML？"
    a: "模型只写简短的 Markdown 草稿，SVG、CSS 和页面结构由内置命令行生成。作者的测试里，平均输出约 612 个 token，手写 HTML 要 4893 个；耗时 12 秒对 31 秒。"
  - q: "answer-me-with-html 会把每个回答都做成网页吗？"
    a: "不会。Agent 自己判断什么时候值得出页面，比如多步骤流程或多方对比，一句话能说清的还是一句话回答。默认关闭的常开模式会给每个结论附一张小页面。"
  - q: "怎么让 answer-me-with-html 不自动打开浏览器？"
    a: "在 Agent 里运行 `/answer-me-with-html config open off`，或在终端运行 `am config set open off`，也可以直接对 Agent 说“别再打开浏览器了”。"
  - q: "answer-me-with-html 生成的页面存在哪里？"
    a: "页面保存在 `~/.answer-me-with-html/pages/`。对 Agent 说“清理页面”，它会先确认再删除。"
  - q: "answer-me-with-html 只能在 DSH 里用吗？"
    a: "不是。它是通用的 Agent 技能，Claude Code、Codex、Cursor、OpenCode 等能执行命令行的 Agent 都能用。"
---

## answer-me-with-html 是做什么的？

answer-me-with-html 是一个让 Agent 用一页清晰的 HTML 回答复杂问题、而不是甩出一大段文字的 DSH 插件。页面里可以有文字、表格、代码和图表，架构问题、多步骤流程、方案对比都能一眼看明白。

关键在分工。Agent 只写一份简短的 Markdown 草稿，交给技能内置的命令行，由它生成 SVG 图、样式和页面结构。模型不用再手写坐标和 CSS，输出的 token 少得多：作者的测试显示，草稿的 token 大约只有手写 HTML 的八分之一，出页面的时间也不到一半。

什么时候出页面由 Agent 判断。问模块之间怎么配合，会得到目录树和调用图；问“Redis 还是 Memcached”，会得到一张对比表；一句话能答的问题，还是一句话回答。同一个技能也能用在 Claude Code、Codex、Cursor 和 OpenCode 里。

## answer-me-with-html 核心功能

- **生成页面**：把 Markdown 草稿渲染成一页 HTML，保存在 `~/.answer-me-with-html/pages/`。
- **多种图表**：时序图、状态图、调用图、目录树、时间线和对比表，按问题挑最合适的。
- **页面操作**：切换主题和深浅色，直接在页面上回复 Agent，或者复制生成页面的 Markdown 源稿。
- **讲解视频**：需要时，`am video` 会生成一个带旁白的播放页，图表一步步展开。
- **常开模式**：默认关闭；在规则文件里打开后，每个结论都附一张两到四格的小页面。
- **英文写作检查**：可选的写作检查，基于简化技术英语，让页面文字简短清楚。

## 怎么安装和使用 answer-me-with-html？

1. 确认装了 Node.js 20 以上。
2. 把插件装进你在用的 DSH profile（默认是 `web`）：

   ```bash
   dsh plugin --profile web add github:QingYunA/answer-me-with-html
   ```

3. 重启 DSH，然后问一个需要结构化回答的问题，比如“讲讲 TCP 三次握手”或“会话存储用 Redis 还是 Memcached”。
4. 页面会在浏览器里打开，可以用上面的按钮切换主题、回复 Agent 或复制源稿。
5. 用斜杠命令或在终端运行 `am config set <设置项> <值>`，调整 `open`、`theme`、`mode`、`scale` 等设置。

在其他 Agent 里，把“Install Answer me with HTML: read https://raw.githubusercontent.com/QingYunA/answer-me-with-html/main/INSTALL.md and follow it.”贴给它，Agent 会自己完成安装。

## answer-me-with-html 报错怎么排查？

- **Agent 从不出页面**：确认插件装在你正在用的 profile 里，并且重启过 DSH。简单问题本来就只给文字回答，换一个有步骤或对比的问题来测试。
- **命令行跑不起来**：内置命令行需要 Node.js 20 以上，运行 `node -v` 检查版本，不够就升级。
- **浏览器标签页越开越多**：用 `am config set open off` 关掉自动打开，或者打开 `close_after_reply`，回复后自动关闭标签页。
- **页面文件越积越多**：对 Agent 说“清理页面”，它会列出文件并在删除前确认。
- **版本太旧**：更新需要手动触发。命令行每天最多检查一次 GitHub，最多每三天提醒一次 Agent；对 Agent 说“更新 answer-me-with-html”即可升级。

反馈问题时，请附上插件版本、DSH 版本，以及生成出错页面的那个问题。
