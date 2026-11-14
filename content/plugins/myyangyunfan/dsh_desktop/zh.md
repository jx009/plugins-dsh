---
title: "dsh_desktop：DSH 桌面插件整合包"
description: "dsh_desktop 是一个集成桌面客户端、运行时与精选工具的 DSH 插件整合包。了解安装方法、内置插件配置、便携版选择和 Node.js 常见报错排查。"
summary: "将 33 个伴随插件与 DSH 运行时整合进桌面客户端，提供文件工作台、Bot 群聊和桌面通知。安装版与 Full 便携版自带 Node.js，可在设置中统一管理内置插件。"
highlights:
  - "33 个内置伴随插件"
  - "Full 版内置运行时"
  - "文件编辑与差异查看"
  - "Bot 团队与群聊"
  - "双源客户端更新"
faq:
  - q: "dsh_desktop 怎么安装到电脑上？"
    a: "从仓库 Releases 下载对应系统的桌面安装包，或解压 Windows 便携包后启动。README 提供的是客户端安装方式，没有给出该项目的 DSH 插件安装命令。"
  - q: "dsh_desktop 需要提前安装 Node.js 吗？"
    a: "安装版和 Full 便携版自带 Node.js，无需提前安装。Lite 便携版省去了运行时，要求本机已有 Node.js 22 或更高版本。"
  - q: "dsh_desktop 内置插件在哪里启用？"
    a: "进入「设置 → 插件 → 内置插件」，可以查看版本、搜索和筛选条目，并切换启用状态。启停操作在下次启动时生效。"
  - q: "dsh_desktop 支持 macOS 和 Linux 吗？"
    a: "README 列出了 macOS 12+ 的 Apple Silicon 版本以及 Linux x64 版本，也支持 Windows 10/11。Windows arm64 属于实验发布线。"
  - q: "dsh_desktop 便携版的会话数据也在 exe 旁边吗？"
    a: "便携版客户端设置和日志放在 exe 旁的 data 目录，但会话、附件和 API 凭据默认仍在 ~/.dsh。要让这些数据一起移动，需要把 DSH_HOME 指向 data 下的目录。"
---

## dsh_desktop 是做什么的？

dsh_desktop 是一个把运行时和精选工具打包成桌面客户端的 DSH 插件整合包，面向希望减少环境准备和插件选型工作的用户。它随包提供 33 个伴随插件，将文件操作、Bot 协作、搜索和会话管理接入同一工作台，属于 DeepSeek Harness 插件生态的桌面入口。

客户端采用 Tauri 2，安装版与 Full 便携版包含 Node.js，可直接启动内置内核。README 所说的离线可用指运行时能够断网启动，不能据此判断所有联网服务都能离线使用。

## dsh_desktop 核心功能

- **内置插件管理**：在设置中查看插件版本，通过搜索和状态筛选定位条目，并逐条启停。状态变更在下次启动时生效。
- **Better Sidebar 文件工作台**：右栏整合资源管理器、编辑器和 Diff 视图，并提供在本地打开文件的入口，方便围绕代码改动工作。
- **DeepSeek-Bot 团队协作**：在客户端中使用主 Bot、长期 Bot 和群聊，支持 @ 转交与群共享记忆，适合持续协作。
- **Free Search 与工具管理**：随包包含多引擎搜索能力，还可通过工具面板管理 MCP 服务器、技能和规则，具体能力由伴随插件提供。
- **桌面通知与更新**：回合完成、审批和出错时发送通知，点击可返回对应会话。客户端更新支持 GitHub、Gitee 双源及 SHA-256 校验。

## 怎么安装和使用 dsh_desktop？

README 未提供该桌面整合包的 DSH 安装命令，也没有确认其 npm 包名。请从仓库发布页下载安装文件：`https://github.com/myYangyunfan/dsh_desktop/releases/latest`。

1. 确认系统：Windows 10/11、macOS 12+ Apple Silicon 或 Linux x64；Windows arm64 是实验线。
2. Windows 常规安装选择 `DSH-Desktop-Setup-<版本>-win-x64.exe`；需要解压使用则选 Full 便携包。仅在本机已有 Node.js ≥ 22 时选择 Lite。
3. 启动客户端，等待修复、内置插件同步、补丁和内核预检完成。内核就绪后会载入窗口，随包插件被镜像进 profile。
4. 进入「设置 → 插件 → 内置插件」，查看版本并调整启用状态；修改后重启客户端。
5. 如需指定配置目录，设置环境变量 `DSH_HOME`。默认 `~/.dsh` 保存会话、附件、插件 profile 和 API 凭据。

Windows 安装版的客户端设置和日志位于 `%APPDATA%\dsh-desktop\`，便携版则放在 exe 旁的 `data\`。想让会话数据也随便携目录移动，需要将 `DSH_HOME` 指向 `data\` 下的位置。README 说明升级和覆盖安装保留 profile 与会话。

## dsh_desktop 报错怎么排查？

- **提示未找到可用的 Node.js**：先确认是否下载了 Lite 包。该版本需要本机 Node.js ≥ 22；需要自带运行时可选择 Full。
- **macOS 首次无法直接打开**：发布包采用 ad-hoc 签名且未公证，README 给出的首次打开方式是右键应用后选择「打开」。
- **插件不显示或启停未生效**：确认当前 profile、插件启用状态，再重启客户端。内置插件的启停需要下次启动才能生效。
- **旧便携包缺少运行时**：README 指出 v1.0.10 便携包漏装了 Node，v1.1.0 已修复 Full 与 Lite 的打包差异；下载时核对实际发布号。
- **启动仍异常**：检查客户端版本和上述目录中的日志，并确认 `DSH_HOME` 是否指向预期配置，再定位具体插件问题。
