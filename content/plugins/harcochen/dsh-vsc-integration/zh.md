---
title: "dsh-vsc-integration：VS Code 接入 DSH"
description: "dsh-vsc-integration 是将 DeepSeek Harness 接入 VS Code 的扩展，支持原生 Diff、工具审批和持久会话。本文介绍扩展安装、模型配置和运行时连接报错的排查方法。"
summary: "在编辑器里选中代码就能交给助手分析，批准文件修改前可以先看差异。长任务可用 Trace 回看执行过程，也能在同一运行时的网页界面继续会话。"
highlights:
  - "原生 Diff 并排审阅"
  - "修改前审批工具调用"
  - "附加编辑器上下文"
  - "持久会话搜索与导出"
  - "Trace 与用量追踪"
faq:
  - q: "dsh-vsc-integration 怎么在 VS Code 安装？"
    a: "在 VS Code 扩展市场或 Open VSX 搜索 `dsh-vsc-integration`，也可以从项目发布页下载 VSIX 后手动安装。扩展要求 VS Code 1.106.0 或更高版本，README 标注的运行时兼容目标是 `dsh 0.2.2-rc.1`。"
  - q: "dsh-vsc-integration 怎么把选中的代码发给助手？"
    a: "在编辑器里选中代码，再用聊天输入框里的 `@` 附加选区。如果要助手结合报错定位，还可以附上诊断信息，不必把相关内容全部粘贴到聊天框里。"
  - q: "dsh-vsc-integration 能看不在 Git 里的文件 Diff 吗？"
    a: "可以，原生 Diff 支持查看 Git 之外的文件改动。遇到需要审批的文件修改时，可以先打开工具差异，核对内容后再决定是否批准。"
  - q: "dsh-vsc-integration 的会话能在网页上继续吗？"
    a: "可以，前提是网页界面连接的是同一个 DSH 运行时。工作区用于归组会话，也可以关联项目路径；仅打开同一个项目目录不代表连接到了同一运行时。"
  - q: "dsh-vsc-integration 怎么看 Trace 和模型用量？"
    a: "要了解任务执行过程，可以查看 Trace 和 Activity，或结合子智能体与待办事项追踪进度。要了解消耗，则查看令牌用量和模型费用估算。"
  - q: "dsh-vsc-integration 连接报错怎么收集日志？"
    a: "先从命令面板运行 `DSH: Diagnose Environment`，再用 `DSH: Show dsh Runtime Logs` 查看运行时日志。提交问题时附上扩展版本、操作系统和脱敏后的报错信息，不要贴出连接令牌。"
---

## dsh-vsc-integration 是做什么的？

 dsh-vsc-integration 是一个把 DeepSeek Harness 的 AI 编程能力接入 VS Code 的 DSH 插件。它以编辑器扩展的形式提供聊天、工具审批和文件差异审阅：你可以把正在看的代码交给助手，再在编辑器里核对它打算做的改动。选型时要区分两部分：这个 DeepSeek Harness 插件提供编辑器界面，任务由它连接的运行时执行。

## dsh-vsc-integration 核心功能

- **原生 Diff 与工具审批**：并排对照文件修改前后的内容，在批准工具调用前先查看拟议改动。不在 Git 管理范围内的文件也能参与差异审阅。
- **编辑器上下文**：用 `@` 附加文件、选区、代码符号、诊断信息或 Git 差异。调试器暂停时，也能将当前调试状态作为任务上下文。
- **持久会话**：在独立的编辑器标签页打开对话，通过对话大纲或搜索找回讨论内容。用完的会话可以归档，也可以导出为 Markdown、JSON 或 ZIP。
- **Trace 与用量**：通过 Trace、Activity、子智能体和待办事项了解任务进度；需要核对消耗时，可以查看令牌用量和模型费用估算。

## 怎么安装和使用 dsh-vsc-integration？

1. 在 VS Code 扩展市场或 Open VSX 搜索扩展名称并安装。若已从项目发布页下载 `.vsix`，在命令面板执行 `Extensions: Install from VSIX...` 并选中该文件。编辑器需为 1.106.0 或更高版本，运行时兼容目标为 `dsh 0.2.2-rc.1`。
2. 安装并启动 DeepSeek Desktop，让它注册 `dsh` 命令。在 VS Code 中打开并信任你的项目文件夹，然后用 `DSH: Open Chat` 打开聊天。
3. 使用 DeepSeek 模型时，运行 `DSH: Configure API Key` 填写凭据；使用其他供应商时，通过 `DSH: Open dsh Web UI in Browser` 打开网页界面进行配置。接着选择或注册 DSH 工作区，再选定模型。工作区用于归组会话，可与项目路径关联。
4. 发送任务时用 `@` 加入相关上下文。例如，先附上有诊断提示的代码，请助手说明问题；如果随后出现工具审批卡片，打开差异确认修改范围，再决定是否批准。

如果已有运行时，在 VS Code 设置里搜索 `dsh`，将 `dsh.serverUrl` 设为运行时启动地址。令牌可以随地址提供，也可单独填入 `dsh.serverToken`；连接远程主机必须使用 HTTPS。只想连接现有进程时，将 `dsh.connectionMode` 设为 `attach-only`。如果 Desktop 的 `dsh-vscode-connect` 插件已提供连接地址，也可通过 `DSH: Connect to Desktop` 使用该地址。

## dsh-vsc-integration 报错怎么排查？

先核对 VS Code 版本和运行时兼容目标，再确认当前连接的是预期的运行时。连接已有进程时，检查地址和令牌是否对应；远程连接则确认地址使用 HTTPS。随后在命令面板运行 `DSH: Diagnose Environment` 检查环境，再运行 `DSH: Show dsh Runtime Logs` 查看日志。需要反馈问题时，附上扩展版本、操作系统和脱敏后的错误详情。

如果需要恢复本地运行时配置，运行 `DSH: Open Configuration Backups` 找到备份文件，再手动恢复。扩展会在本地运行时启动及配置文件变更时备份，按 DSH 主目录和配置档案分别保留最近 10 份快照。
