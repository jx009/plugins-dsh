---
title: "next-ai-draw-io：DSH 里对话画 draw.io 图"
description: "next-ai-draw-io 是一个用对话生成和修改 draw.io 图表、可作为 MCP 接入 DSH 的工具。了解接入方法、模型选择和常见报错排查。"
summary: "从文字、图片或文档生成可编辑的 draw.io 图表，结合对话修改、画布编辑和版本记录。提供网页版、桌面应用及面向智能体的 MCP 服务。"
highlights:
  - "架构图、流程图、时序图"
  - "内置云服务和 Kubernetes 图标"
  - "选中形状后对话局部修改"
  - "版本对比、恢复和撤销"
  - "面向智能体的 MCP 服务"
faq:
  - q: "next-ai-draw-io 怎么在 DeepSeek Harness 里用？"
    a: "项目把绘图能力做成了 MCP 服务。README 没有给出 DSH 专用命令，按添加普通 MCP 服务的方式接入 DSH 即可：命令填 `npx`，参数填 `@next-ai-drawio/mcp-server@latest`。"
  - q: "next-ai-draw-io 用什么模型效果最好？"
    a: "README 建议用能力强的模型，因为它要输出又长、格式又严格的 draw.io XML，小模型容易画出损坏的图。DeepSeek 在支持的 25 个提供商之内。"
  - q: "next-ai-draw-io 生成的图能手动改吗？"
    a: "能。成品就是普通的 draw.io 图，可以移动形状、调整样式、加页面，也可以选中几个形状，让 AI 只改这几个。"
  - q: "next-ai-draw-io 的 MCP 服务把图存在哪里？"
    a: "自动保存在 `~/.next-ai-drawio/`。draw.io 编辑器已经打包在里面，浏览器预览不联网也能用。"
  - q: "next-ai-draw-io 能自己部署、用自己的 Key 吗？"
    a: "能。可以本地运行或用 Docker 部署，通过环境变量配置模型提供商；设置 `ADMIN_PASSWORD` 后，还能在 `/admin` 页面管理模型、访问码和配额。"
  - q: "next-ai-draw-io 能导出哪些格式？"
    a: "支持导出 `.drawio`、`.png`、`.svg` 和 `.drawio.svg`，一个文件可以有多个页面。"
---

## next-ai-draw-io 是做什么的？

next-ai-draw-io 是一个在真正的 draw.io 画布上作图的 AI 绘图工具，DSH 里的 Agent 可以通过它的 MCP 服务调用。你用一句话描述想要的图，或者上传截图、草图、文档，AI 会画出一张可以编辑的 draw.io 图：架构图、流程图、时序图等都可以。

画出来的不是一张死图。你可以像编辑普通 draw.io 文件一样手动修改，也可以选中几个形状，告诉 AI 要怎么改。AI 的每一次修改都会存成一个版本，可以对比、恢复或撤销，放心尝试。

项目有三种形态：在线演示网页、Windows/macOS/Linux 桌面应用，以及让编程 Agent 在对话里直接画图的 MCP 服务。接入 DeepSeek Harness 和其他 Agent 工具靠的就是这个 MCP 服务。

## next-ai-draw-io 核心功能

- **多种图表**：架构图、流程图、时序图等，内置 AWS、Azure、GCP 和 Kubernetes 图标库。
- **多种输入**：纯文字、截图、手绘草图、PDF、Markdown 和源代码都能转成图。
- **局部修改**：在画布上选中形状，让 AI 只改这几个。AI 的改动会实时画到画布上，并把改过的形状标出来。
- **版本记录**：每次 AI 修改都带缩略图保存，按一次 Ctrl+Z 就能撤回。
- **MCP 服务**：和网页版相同的绘图规则、图标库和画布，还带截图工具，AI 能看到渲染结果再自己修正。
- **模型可选**：支持 DeepSeek、OpenAI、Anthropic、通义千问、Ollama 等 25 个提供商，另有 OpenAI 兼容预设可以接任意地址。
- **导出**：`.drawio`、`.png`、`.svg`、`.drawio.svg`，一个文件可以有多个页面。

## 怎么安装和使用 next-ai-draw-io？

1. 在 Agent 里使用时，注册它的 MCP 服务，标准配置如下：

   ```json
   {
     "mcpServers": {
       "drawio": {
         "command": "npx",
         "args": ["@next-ai-drawio/mcp-server@latest"]
       }
     }
   }
   ```

   在 DSH 里按同样的命令和参数添加一个 MCP 服务，然后重启 profile。

2. 让 Agent 画图，比如“画一个包含登录、多因素认证和会话管理的用户认证流程图”。图会在浏览器里一边画一边显示。
3. 在对话里继续调整，或者直接在画布上改，最后导出需要的格式。

不用 Agent 的话，打开在线演示，或者从项目的 GitHub Release 下载桌面版。Claude Code 用户也可以运行 `claude mcp add --scope user drawio -- npx @next-ai-drawio/mcp-server@latest`。

## next-ai-draw-io 报错怎么排查？

- **Agent 看不到绘图工具**：检查 MCP 配置里命令是 `npx`、参数是 `@next-ai-drawio/mcp-server@latest`，确认电脑装了 Node.js、`npx` 能运行，添加后重启 DSH 的 profile。
- **画出来的图残缺或损坏**：AI 要写又长又严格的 draw.io XML，换一个更强的模型。README 提到小模型经常在这一步失败。
- **在线演示用几次就没反应了**：演示站有用量限制。在对话设置里填上你自己的模型提供商和 API Key 即可，README 说明 Key 只保存在浏览器里，不存到服务器。
- **自己部署后连不上模型**：提供商配置放在环境变量里，对照仓库 `docs/en/ai-providers.md` 里的说明检查；要配多个模型，用 `AI_MODELS_CONFIG` 或 `ai-models.json`。
- **图丢了**：MCP 服务会自动保存到 `~/.next-ai-drawio/`，编辑器里的版本记录也能找回之前的 AI 修改。

反馈问题时，请说明用的是网页版、桌面版还是 MCP，附上模型提供商和画坏的那句提示词。
