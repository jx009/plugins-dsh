---
title: "wesight：面向 DSH 用户的智能体工作台"
description: "wesight 是管理本地 AI 智能体与模型路由的桌面工作台，支持复用 CLI 配置。了解安装方法、引擎与模型配置、运行排查及 DSH 插件支持边界。"
summary: "在桌面界面中管理本地编程智能体、模型服务、工具执行和文件变更，复用已有终端配置。结合 SkillHub、飞书入口和运行指标，组织日常智能体任务。"
highlights:
  - "本地编程智能体配置"
  - "自定义模型服务路由"
  - "飞书智能体消息入口"
  - "SkillHub 技能管理"
  - "令牌用量与延迟监控"
faq:
  - q: "wesight 怎么安装，支持 Windows 吗？"
    a: "从仓库最新发布版本中选择对应平台的桌面安装包。README 列出了 Windows x64 安装程序，以及已签名并公证的 macOS Apple Silicon 和 Intel 构建。"
  - q: "wesight 能复用 Claude Code 和 Codex 配置吗？"
    a: "可以，项目支持使用已有本地 CLI 的账号和配置。macOS 上还可以通过界面检测已安装的 CLI，或安装受支持的引擎。"
  - q: "wesight 支持 Ollama 和自定义模型接口吗？"
    a: "支持，统一模型服务配置包含 Ollama 和自定义 OpenAI 兼容端点。文档也列出了 OpenAI、Anthropic Claude、Google Gemini、DeepSeek 和 OpenRouter 等服务。"
  - q: "wesight 怎么把飞书消息接给智能体？"
    a: "使用 IM Agent Hub，可将飞书消息路由到 OpenClaw、Hermes Agent、Claude Code 或 Codex。机器人配置按引擎分别管理。"
  - q: "wesight 能查看哪些运行指标？"
    a: "运行面板提供令牌用量、首令牌延迟、输出阶段 TPS、估算模型 TPS 和工具延迟。还可以查看引擎、模型、状态、完成时间和智能体步骤。"
---

## wesight 是做什么的？

wesight 是一个管理本地 AI 智能体与模型服务的开源桌面工作台。它面向使用终端编程助手的开发者，将引擎配置、聊天、工具执行、文件变更和运行指标集中到图形界面。仓库带有 DSH 生态标签，但当前提供的 README 描述的是独立桌面应用，尚未给出作为 DeepSeek Harness 插件安装的方式。

对于希望减少多个工具之间切换的用户，wesight 桌面智能体工作台提供了统一操作入口。支持的引擎包括 Claude Code、Codex、Kimi Code、OpenClaw、Hermes Agent、OpenCode、Qwen Code、DeepSeek-TUI，以及内置运行时。已有终端环境可以复用相应账号与配置，项目采用 MIT 许可证。

## wesight 核心功能

- **引擎安装与复用**：macOS 界面可安装受支持的本地 CLI，或检测机器上已有的工具。通过引擎设置管理不同助手，按各自支持的路径完成准备工作。
- **统一模型服务**：可配置 OpenAI、Anthropic Claude、Google Gemini、DeepSeek、Ollama、OpenRouter 等服务，也支持自定义 OpenAI 兼容端点，方便集中管理模型来源。
- **工具与文件可视化**：聊天中展示命令、权限提示、斜杠命令、输出和工具结果。右侧 Live Workspace 可查看代码写入、差异、任务待办及生成产物。
- **飞书消息入口**：IM Agent Hub 将消息接入 OpenClaw、Hermes Agent、Claude Code 或 Codex，各引擎分别配置机器人资料。
- **技能与运行观察**：SkillHub 支持发现、安装、启停、更新和移除本地技能。运行面板展示令牌、首令牌延迟、TPS、工具延迟与任务状态，另有定时任务和跨会话偏好记忆功能。

## 怎么安装和使用 wesight？

提供的 README 没有 DSH 安装命令，也没有确认 npm 包名，因此这里采用项目说明的桌面安装路径，不生成插件安装指令。

1. 在 GitHub 打开 `freestylefly/wesight` 的最新发布版本，选择 macOS Apple Silicon、macOS Intel 或 Windows x64 安装包。公开发布的 macOS 构建已签名并公证。
2. 安装并启动应用，进入 Agent Engines，选择需要的智能体；也可以先使用内置运行时。
3. 已有可用终端环境时，复用对应 CLI 的账号和配置。macOS 用户可为受支持的引擎使用安装或检测功能；需要官方安装器的引擎按其设置路径处理。
4. 在模型服务设置中配置需要的提供商或自定义兼容端点。文档列出了可选服务，但当前截断内容没有提供逐字段填写示例。
5. 在 Cowork Chat 中选择引擎和模型并发起任务，查看权限请求与工具输出，再到 Live Workspace 检查文件变化和产物。
6. 按需要通过 SkillHub 管理技能，或在 IM Agent Hub 配置对应引擎的飞书机器人。任务运行后，到指标面板查看状态与耗时。

## wesight 报错怎么排查？

当前 README 没有列出专门的错误码或修复命令。可先做通用检查：确认应用版本、所选引擎、模型配置及复用的 CLI 环境，再查看可用日志，避免把不同引擎的问题混在一起判断。

任务异常时，先从运行面板确认相关引擎、模型和状态，再结合聊天中的工具结果及权限提示定位上下文。这些界面提供排查线索，但文档没有承诺某项指标能直接解释所有失败原因。

若问题发生在另外使用的 DSH 环境中，可确认 profile 名、相关插件是否启用，重启后查看版本与日志。这属于通用环境检查，不能据此认定桌面应用已经注册为 DSH 插件。
