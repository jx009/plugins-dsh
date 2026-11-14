---
title: "deepseek-harness-desktop：DSH 桌面工作台"
description: "deepseek-harness-desktop 是一个集成开发工作台的 DSH 插件宿主与桌面客户端。了解安装方法、模型和 Skills 配置，以及授权、升级与常见报错排查。"
summary: "通过桌面界面管理模型、Skills、插件、Git 和自动化任务，安装包自带 Node.js 与 DSH。支持 Windows，并提供 macOS 与 Linux 预览版。"
highlights:
  - "内置运行环境"
  - "统一技能与插件管理"
  - "Codex 项目导入"
  - "多模型协作"
  - "任务看板与定时调度"
faq:
  - q: "deepseek-harness-desktop 怎么安装？"
    a: "从仓库 GitHub Releases 下载对应系统和架构的桌面安装包，安装后启动。包内已包含 Node.js 与 DSH，Windows 还内置 Git；macOS 和 Linux 的 Git 操作需要系统安装 Git。"
  - q: "deepseek-harness-desktop 支持 Windows 和 Mac 吗？"
    a: "支持 Windows 10/11 x64，并提供 macOS 13+ Apple Silicon arm64 Preview 和 Linux x64 Preview。三端安装包均未签名，macOS 版本也未公证。"
  - q: "deepseek-harness-desktop 是 DeepSeek 官方客户端吗？"
    a: "不是，它是采用 BSD-3-Clause 许可证的社区桌面客户端。项目使用公开的官方运行时与 Web 界面，并保持独立的应用身份、数据目录和更新源。"
  - q: "deepseek-harness-desktop 的 Skills 放在哪？"
    a: "项目技能放在 `.dsh/skills`，客户端也会扫描用户 DSH Skills 与用户 Agents Skills。会话输入框的技能菜单和技能中心使用相同来源，并展示对应作用域。"
  - q: "deepseek-harness-desktop 能导入 Codex 和 Claude Code 历史吗？"
    a: "可以只读发现项目与历史会话，预览后导入 Harness 工作区。导入会对敏感信息脱敏，不会重新执行历史工具调用。"
---

## deepseek-harness-desktop 是做什么的？

 deepseek-harness-desktop 是一个提供开发工作台的 DSH 插件宿主与桌面客户端，帮助开发者在图形界面中管理对话、项目文件、模型和扩展。安装包自带 Node.js 与运行时，Windows 还内置 Git，减少首次准备环境的步骤。

它由社区维护，采用 BSD-3-Clause 许可证，不是官方桌面产品。应用身份、数据目录和更新源保持独立，可用于管理 DeepSeek Harness 插件。支持 Windows 10/11 x64，同时提供 macOS 13+ Apple Silicon arm64 与 Linux x64 预览版。

## deepseek-harness-desktop 核心功能

- **Skills 与插件管理**：在桌面工作台搜索、安装和使用扩展，通过插件详情配置能力。技能中心与会话菜单共用项目和用户技能来源。
- **Codex 与 Claude Code 导入**：只读发现已有项目与历史，预览后导入工作区；敏感信息会脱敏，过去的工具调用不会再次执行。
- **模型协作**：侧栏入口打开协作页。Agent Team 的多角色协作与主控、执行模型分工可分别开启，也可同时使用。
- **任务看板与定时调度**：跟踪待规划、待办、进行中及完成或失败状态，交给真实 Agent 会话执行，并保留 Task Run 与 Evidence 记录。
- **开发工作台与用量统计**：浏览编辑文件、执行 Git 操作，预览 Markdown、Diff、PDF 等格式；查看 Token、上下文、缓存、耗时与费用。

## 怎么安装和使用 deepseek-harness-desktop？

提供的 README 没有 DSH 安装命令，也未确认 npm 包名，应从仓库 GitHub Releases 选择对应系统与架构的桌面安装包。

1. 安装并启动客户端，无需另行准备 Node.js 或运行时。macOS 与 Linux 如需 Git 操作，应先安装系统 Git。
2. 在模型入口或模型设置中配置供应商。支持 bai 授权和独立接入第三方 API；安装完成不代表已获得模型授权。
3. 打开项目工作区，或先预览 Codex、Claude Code 项目导入结果，再确认导入。
4. 在会话输入框搜索并插入技能。项目技能使用 `.dsh/skills`，用户 DSH Skills 与 Agents Skills 也会被扫描；首次启用技能市场需要确认。
5. 在插件中心查找扩展并进入详情配置。需要多模型分工时打开侧栏“模型协作”，周期性工作可通过任务看板和定时调度安排。

## deepseek-harness-desktop 报错怎么排查？

插件未显示时，先确认当前 profile 和启用状态，再重启 DSH。项目技能缺失时，检查 `.dsh/skills`，并核对技能中心显示的来源与作用域；问题持续则记录桌面版本和相关日志。

bai 缺少授权或密钥失效时，按界面引导进入浏览器登录。该流程不会自动充值、付费或重发消息，恢复授权后应自行确认后续操作。

下载后使用同一 Release 的 SHA-256 信息核验安装包。三端均未签名，macOS 未公证；升级前备份重要数据。若使用的是同号 5.1.0 本地内测包，需要手动下载正式包覆盖，不能依赖同号自动更新。

macOS 或 Linux 的 Git 操作失败时，先检查系统是否安装 Git。智能操控方面，Browser Use 与 Computer Use 默认关闭；后者连续启动失败会进入安全模式，应结合版本和日志检查具体情况。
