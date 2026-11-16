---
title: "xiaobai-kanban：DSH 入门与 Git 工作流"
description: "xiaobai-kanban 是面向 DSH 用户的中文 AI 编程入门教程，涵盖需求表达与 Git 工作流。了解 CLI 安装学习路径、插件选择和使用中遇到问题的排查入口。"
summary: "从认识 Agent、完成第一个网页，到表达需求、安装 CLI 和学习 Git 工作流，帮助新手逐步掌握 AI 编程，并提供 DSH 插件选用参考。"
highlights:
  - "Agent 基础入门"
  - "需求表达与验收"
  - "CLI 安装学习路径"
  - "Git 工作流"
  - "DSH 插件选用"
faq:
  - q: "xiaobai-kanban 怎么安装到 DSH？"
    a: "它是教程资料，所提供的 README 没有给出教程本身的 DSH 安装命令。直接阅读仓库学习路径即可，需要工具时再按对应项目的说明安装。"
  - q: "xiaobai-kanban 有英文版吗？"
    a: "仓库信息将它定位为中文入门教程，提供的学习路径和文章标题也以中文为主。当前材料没有说明存在英文版。"
  - q: "xiaobai-kanban 推荐哪些 DSH 插件？"
    a: "安装和发现方面推荐了 dsh-plugin-install、dsh-plugin-marketplace 与 dsh-find-plugin。工具箱还列出了上下文管理、聊天平台连接、Token 统计、截图和主题相关项目。"
  - q: "xiaobai-kanban 怎么教新手表达需求？"
    a: "需求课程用背景、目标、范围和验收四个部分组织任务描述。README 还指出该课提供填空模板与自检清单，方便检查是否说清楚了预期。"
  - q: "xiaobai-kanban 包含 Git 和 CLI 安装教程吗？"
    a: "学习路径包含环境自检、Git、GitLab CLI、GitHub CLI 安装以及登录配置。后续还有 Gitflow 工作流，帮助读者理解日常开发流程。"
---

## xiaobai-kanban 是做什么的？

xiaobai-kanban 是面向 DSH 用户的中文 AI 编程入门教程，覆盖 Agent 基础、需求表达、CLI 安装和 Git 工作流。它适合能说出想法，却不熟悉开发工具与交付流程的初学者。项目以文档提供帮助，并非可直接安装的 DSH 插件。

学习路线从认识当前使用的 Agent 开始，接着安排网页实战、工具准备和代码交付。已经能让 AI 改代码的读者，还可以学习如何缩小每轮任务、检查结果和维持人机分工。工具箱另有 DeepSeek Harness 插件选用参考，方便按实际需求寻找扩展能力。

## xiaobai-kanban 核心功能

- **Agent 基础入门**：介绍智能体能做什么，并提供术语词典。遇到 Git、Token、CLI 等概念时，可以回到对应文章查阅。
- **需求表达与验收**：围绕背景、目标、范围和验收组织任务，配有填空模板与自检清单，帮助读者明确预期结果。
- **CLI 与 Git 工作流**：学习路径串联环境检查、工具安装、登录配置和 Gitflow，涉及 GitLab CLI 与 GitHub CLI，帮助理解工具在日常开发中的作用。
- **插件发现与选用**：介绍对话安装、设置页市场和插件搜索入口，同时列出上下文管理、消息连接、用量统计、截图与主题等工具。
- **vibe coding 练习**：进阶文章讨论迭代粒度、成果验收及长期协作边界，供已经完成基础实战的读者继续学习。

## 怎么安装和使用 xiaobai-kanban？

提供的材料没有教程本身的 DSH 安装命令，也没有确认 npm 包名。使用时从仓库 README 进入学习路径；需要其中某个工具，再查看该工具的安装说明。

1. 先确认正在使用哪个 Agent，让它用日常语言说明名称和作用。回复难懂时，继续要求简化表达，避免带着术语疑问进入后续操作。
2. 阅读 `docs/what-is-agent.md`，再按 `docs/first-project.md` 完成网页练习，先体验描述任务与观察结果的过程。
3. 结合 `docs/how-to-speak-to-agent.md` 和 `docs/how-to-write-requirements.md` 准备需求，明确做什么、做到哪里、如何判断完成。
4. 进入环境自检、CLI 安装、登录和 Gitflow 章节。不了解各工具用途时，先读 `docs/about-cli.md`，再跟随对应文档配置。
5. 使用 DSH 时按场景挑选工具箱中的插件。`dsh-plugin-marketplace` 对应设置页市场，`dsh-find-plugin` 用于通过对话寻找插件；具体配置以各项目说明为准，教程本身没有运行时配置入口。
6. 基础操作熟悉后，从 `docs/vibe-coding-path.md` 继续学习。时间有限时，README 建议优先阅读 `docs/vibe-coding-review.md`，关注如何验收生成结果。

## xiaobai-kanban 报错怎么排查？

看不懂回答时，先要求 Agent 换成更简单的表达，并查阅术语词典。安装或登录受阻时，返回对应环境检查和登录章节；当前截断内容仅给出了入口，没有展示完整命令与具体修复步骤。

如果问题来自另行安装的插件，可按通用顺序确认当前 profile、检查插件是否启用、重启 DSH，再查看版本和日志。这些是基础检查，不是本教程记录的专属修复方案。README 还提醒定期检查插件版本，并在 `docs/about.md` 提供答疑入口。
