---
title: "open-design：接入 DSH 的 AI 设计工作台"
description: "open-design 是一个以 DeepSeek Harness 作为原生 Agent、生成原型、幻灯片和动效的 AI 设计工作台。了解接入 DSH 的方法和常见问题排查。"
summary: "本地优先的设计工作台，原生支持 DeepSeek Harness 运行时。可以制作原型和视觉素材，收集团队反馈，并在同一个项目里迭代。"
highlights:
  - "原生 DeepSeek Harness 运行时"
  - "可交互原型与实时预览"
  - "幻灯片、图片和 MP4 动效"
  - "151 套设计系统、100 多个技能"
  - "团队在同一工作区反馈"
faq:
  - q: "open-design 怎么接入 DeepSeek Harness？"
    a: "先安装官方的 `dsh` 命令行，然后在 OpenDesign 里选择 DeepSeek Harness，或者运行 `od agent setup deepseek-harness` 安装或修复 OpenDesign 的连接组件。"
  - q: "open-design 对 DSH 的支持包括哪些能力？"
    a: "DeepSeek Harness 是一等原生运行时。README 列出的能力有：通过官方 `dsh` 命令行实现结构化流式输出、模型发现、取消和会话恢复。"
  - q: "open-design 能做出哪些东西？"
    a: "网页、桌面和移动端的可交互原型，实时数据看板，幻灯片，AI 生成的图片，以及用 HyperFrames 制作并导出 MP4 的动效。"
  - q: "open-design 支持 Linux 吗？"
    a: "目前官方没有发布 Linux 安装包。macOS 和 Windows 有桌面版下载，Linux 可以从源码运行或用 Docker 部署。"
  - q: "Mac 上 `od` 命令为什么不对？"
    a: "macOS 自带一个八进制转储工具 `/usr/bin/od`，会盖过 OpenDesign 的命令。桌面版用户可以在「设置 → MCP server」里复制客户端配置，那里用的是绝对路径。"
  - q: "不装编程 Agent 能用 open-design 吗？"
    a: "能。它提供自带 Key 的代理，支持 Anthropic、OpenAI、Azure、Google 和 Ollama，填入地址、Key 和模型就能跑同样的设计流程。"
---

## open-design 是做什么的？

open-design（OpenDesign）是一个本地优先的 AI 设计工作台，可以把 DeepSeek Harness 当作内置 Agent 来运行。你和团队从一份需求开始，Agent 把它做成原型、幻灯片、图片或动效，大家在同一个项目里提意见、继续改。

它和编程 Agent 的连接方式有两种。Claude Code、Codex、Cursor 等 Agent 以技能、命令行或 MCP 服务的方式调用 OpenDesign；DeepSeek Harness 更进一步，OpenDesign 通过官方 `dsh` 命令行直接把它作为原生运行时启动，支持流式输出、模型发现、取消和会话恢复。

桌面版内置 100 多个功能技能、一套独立的渲染模板库和 151 套设计系统，Agent 是在真实的设计约束下工作，而不是从一张白纸开始。项目以 Apache-2.0 协议开源。

## open-design 核心功能

- **原生 DSH 运行时**：OpenDesign 通过官方 `dsh` 命令行驱动 DeepSeek Harness，支持结构化流式输出和恢复之前的会话。
- **原型**：网页、桌面和移动端的可交互原型，旁边就是和 Agent 的对话，实时预览。
- **实时作品和看板**：会随数据更新的视图，而不是静态的设计稿。
- **幻灯片**：杂志风格、周报、融资路演等幻灯片，带演讲者备注，可以导出。
- **图片和视频**：通过 `gpt-image-2`、ImageRouter 或自定义接口生成图片；用 HyperFrames 做动效并导出 MP4。
- **设计系统和插件**：151 套设计系统，以及可以查看和改造的技能、模板和插件。

## 怎么安装和使用 open-design？

1. 从 `open-design.ai` 或项目的 GitHub Release 下载 macOS 或 Windows 桌面版。Linux 从源码运行或用 Docker。
2. 安装 DeepSeek Harness 官方的 `dsh` 命令行，并确保它在 `PATH` 里。桌面版启动时会自动检测已安装的 Agent 命令行。
3. 在 OpenDesign 里选择 DeepSeek Harness 作为 Agent，或者在终端里配置：

   ```bash
   od agent setup deepseek-harness
   ```

4. 在首页输入一份需求，比如“做一个笔记应用的落地页”，或者从示例开始。
5. 在 Studio 里查看结果，收集同事的评论，再让 Agent 做下一版。

想在其他 Agent 里使用 OpenDesign，运行 `od mcp install <agent>`，例如 `od mcp install claude`，加 `--print` 可以先预览不实际写入。

## open-design 报错怎么排查？

- **Agent 列表里没有 DeepSeek Harness**：确认 `dsh` 命令行已安装并在 `PATH` 中，重启 OpenDesign 让它重新检测。运行 `od agent setup deepseek-harness` 修复连接组件。
- **macOS 或 WSL2 上 `od` 输出一堆八进制数字**：系统自带的 `/usr/bin/od` 盖过了 OpenDesign 的命令。改用桌面版「设置 → MCP server」里的配置片段，WSL2 用户先看仓库里的 WSL2 设置指南。
- **找不到 Linux 安装包**：官方发布里还没有 Linux 版本。从源码运行，或者启动 Docker 镜像后打开 `http://127.0.0.1:7456`。
- **电脑上没装任何 Agent 命令行**：使用自带 Key 的代理，填入支持的服务商地址、API Key 和模型。
- **MCP 装到了错误的客户端**：用 `od mcp install <agent> --uninstall` 移除，用 `od mcp install --help` 查看支持的客户端列表。

反馈问题时，请附上 OpenDesign 版本、操作系统、所用的 Agent 运行时，以及出问题的那份需求。
