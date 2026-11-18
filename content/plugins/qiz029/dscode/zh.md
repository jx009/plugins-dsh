---
title: "dscode：用 DSH 在终端编码与协作"
description: "dscode 是一个整合持久 Shell 与 DSH 插件的终端编码工具，支持跨会话协作和独立审查。了解安装前检查、远程运行时配置、脚本用法与常见报错排查。"
summary: "让终端、命令行和脚本共享编码会话，通过持久 Shell、Ultra 子智能体和独立代码审查完成开发任务，也可连接服务器运行时。"
highlights:
  - "持久 Shell 与版本校验"
  - "Ultra 子智能体"
  - "跨会话任务交接"
  - "独立代码与权限审查"
  - "远程运行与脚本执行"
faq:
  - q: "dscode 怎么安装到 DeepSeek Harness？"
    a: "README 将它描述为统一固定并验证依赖、终端界面和插件版本的完整运行环境，而不是单独的插件包。当前摘录没有安装命令，npm 包名也未确认，应查阅项目完整安装说明，不要猜测插件安装命令。"
  - q: "dscode 支持 Windows 和 Linux 吗？"
    a: "README 列出的平台是 macOS 14+，以及使用 glibc 的 x64、arm64 Linux。文档未列出 Windows 支持，发行环境包含 Node.js。"
  - q: "dscode 怎么连接远程服务器？"
    a: "服务器运行 `dscode server --port 8080`，客户端用 `dscode config --runtime host:8080 --token … --alias devbox --set-default` 配置连接。连接有令牌认证但不加密，应放在 VPN、局域网或 SSH 隧道中使用。"
  - q: "dscode 可以在 CI 或脚本里运行吗？"
    a: "可以，`dscode exec \"prompt\"` 能执行非交互任务，也能接收管道输入。回答输出到 stdout，工具活动与会话 ID 输出到 stderr，并支持 `--json` 和 `--resume`。"
  - q: "dscode 的 Ultra 模式会自动放开权限吗？"
    a: "不会，Ultra 调整推理与任务委派行为，不增加权限。默认防护包括 `workspace-write` 沙箱和独立模型权限审查，也可以切换为人工批准。"
---

## dscode 是做什么的？

dscode 是一个整合持久 Shell 与 DSH 插件的终端编码工具，基于 DeepSeek Harness 构建。它面向需要编辑代码、执行测试并协调多个智能体的开发者，让终端界面、命令行和脚本进入同一个会话运行时，减少上下文割裂。

它不是一个已确认可单独安装的 npm 插件，而是将依赖、终端界面和 DeepSeek Harness 插件一起固定版本并验证的完整环境。README 列出 macOS 14+ 和使用 glibc 的 x64、arm64 Linux，且包含 Node.js。

本地后台 Host 持有会话，终端只负责连接。因此关闭终端后任务仍可继续，多个终端也能共享会话，适合在交互开发和脚本调用之间切换。

## dscode 核心功能

- **持久 Shell 与文件校验**：Bash 保留运行状态，大段输出可保存后再读取。文件工具支持有限范围读取、批量编辑与原子写入，并检查文件版本，防止基于过期内容覆盖修改。
- **Ultra 子智能体**：使用模型的 `max` 推理能力，按任务决定调查、委派和验证程度。需要编辑的子任务可使用从干净 `HEAD` 创建的独立 Git worktree，但不会因此获得额外权限。
- **跨会话协作**：智能体可以发现、读取和联系其他会话。命令行也能列出会话、发送要求、读取结果和订阅进度，共享同一运行时与上下文。
- **独立审查**：相关检查通过后，由独立只读模型审查代码变更。权限审查则单独决定操作是否可批准，两者用途不同。
- **远程与脚本执行**：终端可连接服务器运行时，工具、文件和凭据留在服务器。非交互模式支持 CI、管道输入、结构化输出与恢复会话。

## 怎么安装和使用 dscode？

当前 README 摘录没有安装命令，npm 包名也未确认，因此这里不提供推测的 `dsh plugin` 命令。请先按项目完整安装说明完成部署，再执行以下步骤。

1. 运行 `dscode` 打开终端界面，默认会启动后台 Host；用 `dscode host status` 检查状态。
2. 在会话中处理编码任务。临时旁支问题可用 `/btw` 提问，它会进入独立只读子会话，不写入主对话。
3. 用 `dscode sessions` 找到目标会话，再通过 `dscode send <session-id> --steer "review the change in parser.ts and reply"` 交接审查任务。
4. 用 `/review` 主动审查代码；用 `/permission auto-review` 选择自动权限审查，再用 `/review-usage` 查看决定与用量。
5. 在脚本中运行 `dscode exec "review the current changes"`，也可使用 `git diff | dscode exec "review this"` 传入变更。

远程部署时，服务器运行 `dscode server --port 8080`。客户端执行 `dscode config --runtime host:8080 --token … --alias devbox --set-default`，替换地址和令牌后运行 `dscode runtime devbox`。连接不加密，应使用 VPN、局域网或 SSH 隧道。

## dscode 报错怎么排查？

先区分本地 Host 与远程运行时：本地用 `dscode host status`，远程用 `dscode runtime status devbox` 或 `dscode runtime doctor devbox`；后两项支持 `--json`。

网络中断会自动重连，但令牌或协议版本失败需要修正。可用 `dscode config --alias devbox` 更新连接字段；托管服务器通过 `dscode server status` 和 `dscode server logs` 查看状态与日志。

若带提示词钩子的项目无法提交消息，或健康 Host 在 IPv6 就绪检查约 90 秒后退出，先核对版本。README 标明 0.7.54 修复了这些问题；仍能复现时，保留版本信息和相关日志。
