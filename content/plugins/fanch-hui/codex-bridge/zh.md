---
title: "codex-bridge：用 ChatGPT 调用 DSH"
description: "codex-bridge 是一个通过 MCP 连接 ChatGPT 与本机智能体的 DSH 插件集成工具。了解桌面端安装、项目授权、双连接配置及常见报错排查。"
summary: "让 ChatGPT 读写已授权的本地项目，并把编码任务交给 DeepSeek Harness。通过桌面应用集中处理任务审批、实时输出和会话。"
highlights:
  - "ChatGPT MCP 接入"
  - "DSH 双连接"
  - "本地文件读写与命令执行"
  - "实时输出与任务审批"
  - "工作台四宫格分屏"
faq:
  - q: "codex-bridge 怎么安装到 DSH？"
    a: "先从仓库的 GitHub Releases 下载对应平台的桌面安装包，启动后在「连接」页启用所需智能体。提供的 README 没有 DSH 插件安装命令，也未确认 npm 包名，因此应按桌面应用方式安装。"
  - q: "codex-bridge 读写文件必须安装 Codex 吗？"
    a: "不需要，登记项目并完成聊天客户端的 MCP 接入后，Direct Workspace 就能处理文件读写和命令执行。具体操作遵循项目授权、执行规则与审批设置。"
  - q: "codex-bridge 的 DSH ACP 和桌面连接有什么区别？"
    a: "ACP 使用 API 配置，桌面连接复用官方桌面的登录、工具配置及原生会话；二者可同时启用，分别保存模型与权限。原生桌面连接支持 macOS、Windows x64 的完整权限文本任务。"
  - q: "codex-bridge 支持 Windows 和 Linux 吗？"
    a: "支持，README 列出了 Windows x64、ARM64 和 Ubuntu 24.04 LTS 对应两种架构的安装包。Windows 需要 WebView2 Runtime，便携包需要完整解压后再运行。"
  - q: "codex-bridge 更新后为什么要刷新 ChatGPT 插件？"
    a: "刷新可以清除旧版本缓存，这是 README 明确要求的更新后步骤。安装更新前应等待正在执行的任务结束，再安装并重启应用。"
---

## codex-bridge 是做什么的？

codex-bridge 是一个通过 MCP 将聊天客户端接入本地项目与智能体的 DSH 插件集成工具，以桌面应用和后台服务交付。它让开发者从 ChatGPT 委派编码任务，并集中查看输出、处理审批和管理会话。

寻找 DeepSeek Harness 插件接入方案时，可以用它连接本机引擎；只需文件读写和命令执行，也能直接使用 Direct Workspace，无需安装智能体。项目授权、任务记录与配置保存在本机，模型请求则发送给选定服务。

## codex-bridge 核心功能

- **ChatGPT MCP 接入**：通过 OpenAI Secure MCP Tunnel 连接本机服务。README 要求 Plus 及以上或团队订阅。
- **DSH 双连接**：ACP 使用 API 配置；原生桌面连接复用官方应用的登录、工具配置与会话。两者可同时连接，分别保存模型和权限。
- **Direct Workspace**：提供文件读写、Patch、命令执行及 Git 操作，按已登记目录、执行规则和审批设置处理。
- **任务与会话管理**：网页工作台显示实时输出、工具执行、审批及结构化提问，支持历史搜索、失败重试和跨智能体交接。
- **多窗格工作台**：最多同时展示四个独立对话与输入器，可查看 Codex、OpenCode、Antigravity 等不同引擎的任务。

## 怎么安装和使用 codex-bridge？

README 未提供 DSH 安装命令，也未确认 npm 包名。请从 `https://github.com/Fanch-hui/codex-bridge/releases/latest` 下载桌面安装包。

1. 选择平台与架构。支持 macOS 14+ 的 Apple Silicon、Intel，Windows x64、ARM64，以及 Ubuntu 24.04 LTS 对应两种架构；便携包需完整解压。
2. 启动应用，确认后台服务已连接。macOS 若提示批准后台项目，按系统设置提示允许。
3. 在「项目」页添加代码库目录，登记即授权完整访问。未指定项目的请求可使用默认工作区。
4. 连接聊天客户端。ChatGPT 需先配置 Secure MCP Tunnel，再在插件入口添加自定义 MCP 服务器；Qwen Studio 可从连接页复制 JSON 配置。
5. 如需委派任务，在「连接」页启用对应智能体。初始化会发现已有安装，缺少环境时可使用「一键配置」；引擎登录或 API 设置与客户端 MCP 接入分别完成。
6. 在智能体详情或「设置 → 账户与模型」设置模型、推理强度和权限。随后从网页工作台新建任务、由内置工作台委派，或由客户端调用 `submit_task`。

新任务应选择所需的 DSH 连接，已有任务保持原绑定。原生桌面连接支持 macOS、Windows x64 的完整权限文本任务，其模型和推理强度选择还会同步为桌面默认值，影响后续新会话。

## codex-bridge 报错怎么排查？

- **macOS 阻止打开**：应用使用 ad-hoc 签名且未经 Apple 公证，在系统设置「隐私与安全性」允许此次打开。
- **Windows 缺少运行环境**：检查 WebView2 Runtime，应用会在缺失时提示。
- **更新后 ChatGPT 异常**：刷新插件以清除旧缓存；安装更新前等待任务结束，再重启应用。
- **Gemini 无法调用工具**：在任务模式启用 Bridge。网页版必须使用 Cloud MCP，通过 Sites 或 ngrok 接入，并填写应用生成的完整专用链接。
- **任务持续排队**：检查「设置 → 执行与审批」的同项目并发上限，默认四个，可设为一至四个；DSH 还采用任务级写租约。

其他连接问题可先确认后台服务、智能体启用状态，再查看版本与诊断日志。分享配置或日志前移除凭据。
