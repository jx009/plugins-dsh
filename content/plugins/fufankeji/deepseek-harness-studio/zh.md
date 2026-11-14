---
title: "deepseek-harness-studio：DSH 插件管理"
description: "deepseek-harness-studio 是一个支持发现、安装与管理扩展的 DSH 插件管理桌面端。了解安装方法、本地模型连接、Preset 使用和常见报错排查。"
summary: "在桌面工作区中管理项目、会话和扩展，通过自然语言寻找插件，并将 Preset 用于新会话。支持连接本地模型服务，以及图片附件和视觉增强。"
highlights:
  - "插件发现与智能推荐"
  - "安装校验与事务恢复"
  - "Preset 广场工作流"
  - "本地模型服务连接"
  - "会话目录与原文跳转"
faq:
  - q: "deepseek-harness-studio 怎么安装？"
    a: "从该仓库的 GitHub Releases 获取桌面预览包，目前提供 macOS arm64 ZIP 和 Windows x64 安装程序。它以桌面应用形式交付，所给 README 没有提供将其作为插件安装的 DSH 命令。"
  - q: "deepseek-harness-studio 不知道包名怎么找插件？"
    a: "在“插件发现”中直接描述目标，当前 Agent 会收到 `/find-plugins` 请求并查询公开目录。推荐会给出包信息与匹配理由，选定后仍需在插件中心完成校验和安装确认。"
  - q: "deepseek-harness-studio 支持 Ollama 和 vLLM 吗？"
    a: "支持，本地模型入口还可连接 SGLang 和自定义 OpenAI-compatible 服务。也可以配置 DeepSeek 与其他兼容提供方。"
  - q: "deepseek-harness-studio 能直接安装 GitHub 插件源码吗？"
    a: "不能，GitHub 仓库只用于映射已经发布到 npm 公共 Registry 的包。确定版本仍需通过 Bundle、完整性和运行兼容性检查。"
  - q: "deepseek-harness-studio 浏览器开发模式为什么不能安装 Preset？"
    a: "安装、删除和用于新会话涉及本机文件与 Host，因此只在 Desktop 中执行。浏览器开发模式用于查看和验收界面，不会修改本机 Preset。"
---

## deepseek-harness-studio 是做什么的？

deepseek-harness-studio 是一个提供扩展发现、安装与生命周期管理的 DSH 插件管理桌面端，面向希望通过图形界面操作本地项目的开发者。它使用 Electron 承载工作区，由桌面主进程启动和管理本地 `dsh web` 服务，把会话、模型与扩展入口集中到同一界面。

对于寻找 DeepSeek Harness 插件的用户，Studio 提供从需求描述、候选筛选到安装确认的操作路径。所给文档对应 Studio `0.1.0-rc.19`，整合 Harness `0.1.1-rc.2`；两者独立管理版本号，桌面预览包支持 macOS arm64 和 Windows x64。

## deepseek-harness-studio 核心功能

- **插件发现与 Agent 推荐**：浏览精选、最近更新和热门条目，按名称、能力或作者搜索。也可描述需求，由 `/find-plugins` 查询公开目录，返回版本、作者及匹配理由。
- **安装校验与恢复**：插件中心检查确定版本、权限、兼容性、完整性和 Bundle 声明，安装后支持启停、更新与卸载。未完成事务自动回滚；清单仍不一致时进入可停用或卸载的安全模式。
- **Preset 广场**：先查看角色、Skills、工具与环境要求，再安装并用于新会话。内置七套工作流由 Studio 团队维护，用户 Preset 可以删除和重装。
- **本地模型与视觉增强**：连接 Ollama、vLLM、SGLang 或自定义 OpenAI-compatible 服务。图片处理支持 DeepSeek 原生视觉模型、已验证的替代路线和持久保存的附件。
- **工作区与历史定位**：原生选择项目目录，按 Workspace 管理和搜索会话，支持重命名、归档与 Fork。右侧目录可自动加载旧消息，跳转并高亮完整原文。

## 怎么安装和使用 deepseek-harness-studio？

所给资料未确认 Studio 的 npm 包名，也没有 DSH 安装命令；请使用该仓库 GitHub Releases 发布的桌面预览包。

1. 根据设备选择 macOS arm64 ZIP 或 Windows x64 安装程序。README 指定桌面包通过仓库 Releases 发布。
2. 启动桌面应用，通过原生目录选择器打开本地项目，再按工作区组织会话。
3. 配置 DeepSeek 或兼容提供方；使用本地推理时，从本地模型入口连接对应服务。当前截取内容未列出各服务的详细地址配置示例。
4. 从左侧打开“插件发现”，搜索功能或直接描述需求，查看 Agent 给出的候选及推荐依据。
5. 进入“插件中心”，核对版本、权限和兼容性后确认安装。完成后会重启 Harness Host 并验证运行状态；三点菜单提供启停、更新和卸载。
6. 需要固定工作方式时，进入“Preset 广场”检查依赖并安装，再从“已安装”选择“用于新会话”。安装 Preset 无需重启 Host。

## deepseek-harness-studio 报错怎么排查？

通过 GitHub 仓库找不到可安装插件时，先确认它是否对应已发布的 npm 包。`dsh-plugin` 标签只是发现信号，客户端不会直接安装仓库源码。

安装中断后可检查自动回滚结果；若运行清单仍不一致，可在插件安全模式中停用或卸载相关扩展。历史锁文件不兼容时，桌面端会进入不改写锁文件的兼容恢复流程。

Preset 操作不可用时，确认当前运行的是 Desktop。浏览器开发模式只用于界面查看与验收，不执行本机安装、删除或新会话操作。

其他插件未显示问题，可依次确认 profile 名、启用状态，重启 DSH 并查看版本与日志。Jobs 仅展示当前进程中的后台任务，重启后旧任务不会继续被视为存活任务。
