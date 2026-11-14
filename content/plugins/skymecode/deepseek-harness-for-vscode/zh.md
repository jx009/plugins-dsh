---
title: "deepseek-harness-for-vscode：DSH 编程"
description: "deepseek-harness-for-vscode 是一个在 VS Code 中提供编程智能体的 DSH 插件。了解 VSIX 安装方法、MCP 配置及会话报错排查。"
summary: "在 VS Code 原生工作台中使用 DeepSeek Harness，无需单独部署运行时。支持按项目管理共享会话、附加编辑器上下文，以及配置 MCP 服务器。"
highlights:
  - "原生编辑器工作台"
  - "按项目管理共享会话"
  - "MCP 服务器管理"
  - "代码选区与文件上下文"
  - "流式输出与斜杠命令"
faq:
  - q: "deepseek-harness-for-vscode 怎么安装？"
    a: "从仓库 v0.6.2 Release 下载与系统和架构匹配的 VSIX，在 VS Code 中安装后重新加载编辑器。扩展已内置 Node 和 Harness 运行时，无需另行准备 Node/npm 环境。"
  - q: "deepseek-harness-for-vscode 支持 Windows 和 Linux 吗？"
    a: "文档列出的构建平台包括 win32-x64、linux-x64、linux-arm64 和 darwin-arm64。下载时需要同时核对操作系统与处理器架构。"
  - q: "deepseek-harness-for-vscode 能和官方 DSH CLI 共用历史吗？"
    a: "可以，扩展与独立安装的官方 CLI 能读取同一份已保存会话。凭据和插件 profile 仍然分开，共享日志也不会同步不同 Host 的管理设置。"
  - q: "deepseek-harness-for-vscode 怎么添加 MCP 服务器？"
    a: "通过 More → MCP servers 或命令面板进入管理入口，支持 stdio 和 Streamable HTTP。配置通过验证后，会等待模型轮次空闲再重载 Host。"
  - q: "deepseek-harness-for-vscode 的文件改动卡片为什么消失？"
    a: "快照只在当前 Harness Host 的 Session 生命周期内保留，重启 Host 后旧卡片会消失。Git 项目中的快照覆盖 shell 修改，非 Git 目录则仅记录文件工具捕获的修改。"
---

## deepseek-harness-for-vscode 是做什么的？

deepseek-harness-for-vscode 是一个在 VS Code 中提供原生编程智能体工作台的 DSH 插件，以平台专用扩展形式交付。它让开发者围绕项目文件、代码选区和历史会话开展工作，无需单独部署运行时。交互位于侧边栏，也可打开到编辑器区域并移至其他窗口，不嵌入官方 WebUI。

这款 DeepSeek Harness 插件由社区维护，文档对应扩展稳定版 0.6.2，内置 `@deepseek-ai/dsh@0.2.2-rc.1` 和 Node `24.22.2`。安装无需克隆上游仓库或准备 Node/npm；内置运行时仍为候选版本，Harness 本身处于开发者预览阶段。

## deepseek-harness-for-vscode 核心功能

- **按项目管理会话**：支持创建、重命名、分叉、恢复、归档及导入导出。历史归属原始项目目录，预览后可用 `Continue here` 请求执行所有权。
- **流式 Markdown**：显示表格、代码块、复制控件与可点击的工作区文件引用。增量更新保留展开状态，向上阅读时暂停自动跟随，回到底部才恢复。
- **编辑器上下文**：代码选区作为可移除卡片附加到输入中；键入 `@` 可模糊搜索并附加工作区文件。
- **斜杠命令与智能体能力**：提供官方命令及 `/model`、`/reasoning`、`/preset`，并呈现审批、结构化问题、Todos、Skills、Goals、计划模式和后台任务。
- **MCP 与文件改动**：原生管理 stdio 和 Streamable HTTP 服务器。每轮快照与历史差异由官方工作区改动包提供，二进制、大文件和截断列表有对应标记。

## 怎么安装和使用 deepseek-harness-for-vscode？

README 提供的是 VSIX 安装流程，没有给出 DSH 插件安装命令，应使用对应平台的发布资产。

1. 从仓库 v0.6.2 Release 下载 VSIX，支持 `darwin-arm64`、`win32-x64`、`linux-x64` 和 `linux-arm64`。
2. 在 VS Code 中安装该文件，然后重新加载编辑器，使用扩展内置的运行环境。
3. 打开工作台。未配置密钥时，按首次使用提示进入连接设置完成配置。
4. 选择项目目录并新建会话，附加选区或文件后发送任务。模型与推理选项可继续调整；切换预设需要明确新建会话。
5. 恢复历史前，先预览原始项目和执行目录，再点击 `Continue here`。仅预览不会激活 Agent。
6. 需要外部工具时，进入 `More → MCP servers` 或命令面板管理服务器；变更经验证后等待模型轮次空闲，再重载 Host。

## deepseek-harness-for-vscode 报错怎么排查？

提示缺少密钥时，从首次使用引导进入连接设置。历史异常时，查看历史面板显示的实际路径与迁移详情，通常共享目录为 `~/.dsh/sessions`。共用历史不代表共用凭据或插件 profile，排查时应分别核对。

项目目录缺失会阻止执行；写入冲突时会话仍可阅读。继续之前确认显示的目录，避免把预览状态误认为已开始执行。

升级前备份 `~/.dsh` 与 `~/.dsh/vscode/harness-home`。支持的旧日志恢复时会迁移到 V4 并保留原文件，但旧运行时无法读取新一代日志，不要降级正在使用的 profile。依赖已移除 `ctx.agent` 或运行时 `Inbox` API 的第三方插件需要兼容更新。

其他问题可先确认扩展已启用，核对 profile、扩展和运行时版本，再重新加载编辑器并查看日志。旧文件改动卡片在 Host 重启后消失属于已说明的生命周期限制；非 Git 目录也仅记录文件工具捕获的改动。
