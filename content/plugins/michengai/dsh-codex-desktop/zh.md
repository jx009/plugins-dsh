---
title: "dsh-codex-desktop：DSH 桌面工作台"
description: "dsh-codex-desktop 是一个内置运行环境、支持 DSH 插件管理的桌面客户端。了解跨平台安装方法、技能与消息渠道配置，以及启动和插件异常的检查步骤。"
summary: "无需预装 Node.js 或从终端启动服务，即可打开本地 DSH 工作台。在桌面窗口中管理项目会话、Agent 技能、插件、消息渠道和定时任务。"
highlights:
  - "内置本地运行环境"
  - "DSH 插件市场"
  - "专家预设与技能管理"
  - "多渠道消息助手"
  - "定时任务与会话归档"
faq:
  - q: "dsh-codex-desktop 怎么安装？"
    a: "从仓库的 GitHub Releases 下载适合系统和处理器架构的安装包或压缩包，然后安装并打开应用。等待本地 DSH 服务启动完成后，即可创建任务。"
  - q: "dsh-codex-desktop 需要先安装 Node.js 吗？"
    a: "不需要单独准备 Node.js，安装包已包含它和本地 DSH 运行时。日常使用直接打开桌面应用即可，无需在终端手动启动服务。"
  - q: "dsh-codex-desktop 支持 Windows 和 Linux 吗？"
    a: "支持 Windows x64，以及 Linux x64 和 ARM64，也提供 macOS Apple Silicon 与 Intel 版本。对应格式包括 Windows 安装包和压缩包、macOS 的 dmg，以及 Linux 的 AppImage 和 deb。"
  - q: "dsh-codex-desktop 升级后会保留会话吗？"
    a: "应用沿用已有的 DSH 用户配置目录，因此升级后仍可访问会话和设置。README 给出的 Windows 数据路径为 `%USERPROFILE%\\.dsh`。"
  - q: "dsh-codex-desktop 是 DeepSeek 官方客户端吗？"
    a: "它是社区维护的 DeepSeek Harness 桌面发行版。README 明确说明它不是 DeepSeek AI 官方产品。"
---

## dsh-codex-desktop 是做什么的？

dsh-codex-desktop 是一个内置本地运行环境、支持 DSH 插件管理的社区桌面客户端。它面向希望直接打开应用处理项目任务的开发者，把会话、模型选择、权限设置和日志集中在桌面窗口中。安装包包含 Node.js 与本地服务运行时，无需预先搭建环境，也不用从终端手动启动服务。

项目属于 DeepSeek Harness 的桌面发行版，可用于发现和管理 DeepSeek Harness 插件，自身并非通过插件命令添加的普通扩展包。它由社区维护，不是 DeepSeek AI 官方产品，提供 Windows、macOS 和 Linux 安装包。

## dsh-codex-desktop 核心功能

- **桌面会话工作台**：在同一窗口切换项目、创建任务、管理会话，选择模型与权限模式，并查看会话日志。本地服务使用经过校验的回环地址，浏览器界面保留在桌面外壳内。
- **专家预设与 Agent 技能**：可启用代码审查、架构、前端、后端和运维等专业角色。在设置中查看、上传、启用或禁用本地及共享技能。
- **插件市场**：支持发现、安装、更新、启用和诊断社区扩展。首次启动会在 Web profile 中准备面向桌面的社区插件，已列出的能力包含 Codex 风格工作区界面。
- **IM 消息助手**：集中配置钉钉、飞书、Lark、微信、企业微信、QQ 和 Telegram 等可用渠道，并提供账号及接收消息的管理入口。
- **定时自动化与归档**：利用内置调度能力管理重复任务，并访问运行历史。历史会话支持搜索、恢复，也可永久删除归档记录。

## 怎么安装和使用 dsh-codex-desktop？

所给 README 未提供此桌面客户端的 DSH 安装命令，也未确认其 npm 包名。请从仓库发布页获取桌面安装包：`https://github.com/MichengAI/dsh-codex-desktop/releases`。

1. 选择系统和架构。Windows x64 可下载 `.exe` 或 `.zip`；macOS 的 Apple Silicon、Intel 版本使用 `.dmg`；Linux x64、ARM64 提供 `.AppImage` 或适用于 Debian、Ubuntu 的 `.deb`。
2. 安装并启动。Windows 使用安装程序后可从开始菜单打开；macOS 打开磁盘映像，将应用移入 Applications；Linux 运行匹配架构的 AppImage，或安装 deb 包后启动。
3. 等待本地服务就绪。首次启动还会在 Web profile 中准备桌面相关社区插件，完成后再进入任务流程。
4. 创建任务，选择模型和权限模式，然后在项目中开展工作。技能在设置中管理；需要接入消息渠道、安装扩展或安排重复任务时，进入对应功能页面配置。

应用沿用现有 DSH 用户配置目录，Windows 路径为 `%USERPROFILE%\.dsh`。会话和设置存放于该目录，应用升级后仍可继续访问。

## dsh-codex-desktop 报错怎么排查？

所给 README 片段没有列出特定错误码或专项修复方案，可先按以下通用步骤缩小范围：

- 检查安装包是否匹配操作系统及 CPU 架构，尤其注意 Intel、Apple Silicon、x64 和 ARM64 的区别。
- 工作区尚未就绪时，先确认本地服务是否启动完成；必要时重启应用，再观察启动情况。
- 插件没有显示时，确认检查的是 Web profile，并在插件市场查看安装状态及是否已启用。
- 查看应用与插件版本，结合可用日志及插件诊断信息定位问题。提交问题时附上平台、版本和相关日志，便于维护者判断。
