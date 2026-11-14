---
title: "learn-harness-engineering：DSH Harness 教程"
description: "learn-harness-engineering 是一套讲如何构建 Agent Harness 的免费教程和 DSH 技能包，附 DeepSeek Harness 设计拆解。了解学习路径和技能用法。"
summary: "围绕 AI 编程 Agent 外围系统的项目制课程，包含 DeepSeek Harness 设计分析，以及自动化循环和图编排的练习。"
highlights:
  - "14 讲课程和 8 个实战项目"
  - "DeepSeek Harness 设计拆解"
  - "harness-creator 技能"
  - "audit-harness.sh 仓库检查"
  - "15 种语言版本"
faq:
  - q: "learn-harness-engineering 怎么配合 DeepSeek Harness 使用？"
    a: "课程在浏览器里阅读即可；再把仓库 `skills/` 下的 `harness-creator` 技能复制到 DSH 的技能目录 `~/.dsh/skills/`，重启 DSH。这个技能能帮你给自己的项目搭建 Harness。"
  - q: "learn-harness-engineering 是可以安装的 DSH 插件吗？"
    a: "不是 npm 意义上的插件。它是一套课程，附带可复用的 Agent 技能和一个 Shell 检查脚本，没有 `dsh plugin add` 命令。"
  - q: "learn-harness-engineering 对 DeepSeek Harness 讲了什么？"
    a: "有一篇专门拆解 DeepSeek 怎么构建 Harness：万物皆插件、能力接缝和事件管线。同类的拆解还有 Pi、Claude Code 和 Codex。"
  - q: "怎么用 learn-harness-engineering 检查自己的仓库？"
    a: "对你的仓库运行 `tools/audit-harness.sh`，它会检查 Harness 的五个子系统，所有关键项通过时返回 0，不需要 Node.js。"
  - q: "做 learn-harness-engineering 的项目需要什么？"
    a: "一个能编辑文件、执行命令、处理多步任务的编程 Agent，比如 Claude Code、Codex 或 DeepSeek Harness。没有的话可以读课程，但完成不了项目。"
  - q: "learn-harness-engineering 有中文版吗？"
    a: "有。课程翻译成了 15 种语言，包括简体中文，另外还有 PDF 版课程书。"
---

## learn-harness-engineering 是做什么的？

learn-harness-engineering 是一套免费的项目制课程，讲的是 Harness 工程：让编程 Agent 稳定可靠的那套指令、工具、环境、状态和反馈系统。它附带一个可以在 DSH 里用的 Agent 技能和一个检查脚本，还完整拆解了 DeepSeek Harness 本身是怎么设计的。

课程的出发点很直接：再强的模型，周围没有合适的环境，也会在真实的工程任务上失败。14 讲课程解释这个环境需要什么，8 个项目让你用真正的编程 Agent 把每个思路落到同一个 Electron 应用上，从指令和验证，一直做到自动化循环和图编排。

对 DSH 用户和插件作者来说，最直接的价值是 DeepSeek 的设计拆解，讲了“万物皆插件”的架构、能力接缝和事件管线；还有 `harness-creator` 技能，可以给你自己的仓库搭出一套 Harness。

## learn-harness-engineering 核心功能

- **课程**：14 讲，每一讲回答一个关于 Agent 可靠性的核心问题。
- **项目**：8 个实战项目，包括目标循环、定时循环、制作-检查循环，以及带并行分支、条件回滚和人工审批节点的图。
- **五子系统框架**：指令、工具、环境、状态、反馈，可以当作检查任何 Harness 的清单。
- **Harness 设计拆解**：DeepSeek、Pi、Claude Code 和 Codex 各自怎么组织 Harness。
- **harness-creator 技能**：帮你给项目搭建生产级 Harness 的 Agent 技能。
- **audit-harness.sh**：零依赖的 Shell 脚本，按五个子系统检查一个仓库。
- **15 种语言**：完整翻译，包括简体中文，并提供 PDF 课程书。

## 怎么安装和使用 learn-harness-engineering？

1. 在仓库 README 里选择语言开始阅读，也可以在本地预览：

   ```bash
   npm install
   npm run docs:dev
   ```

2. 想研究 DSH，读 `docs/en/harness-designs/deepseek/index.md`（中文目录里有对应译文）。
3. 在 DeepSeek Harness 里使用技能：把 `skills/harness-creator` 复制到 `~/.dsh/skills/`，重启 DSH，然后让 Agent 给你的项目搭建 Harness。
4. 不装任何东西，直接检查一个已有的仓库：

   ```bash
   curl -fsSL https://raw.githubusercontent.com/walkinglabs/learn-harness-engineering/main/tools/audit-harness.sh | bash -s -- /path/to/your/repo
   ```

5. 用你的编程 Agent 完成各个项目，允许它编辑文件和执行命令。

## learn-harness-engineering 报错怎么排查？

- **DSH 识别不到 harness-creator 技能**：确认技能目录直接放在 `~/.dsh/skills/` 下，`SKILL.md` 在这一层，然后重启 DSH。
- **检查脚本报告失败**：缺少关键项时脚本返回非零。每一项都对应 L03 到 L12 中的某一讲，读对应的课程就知道该补什么。
- **本地文档站起不来**：文档用 VitePress 搭建，先运行 `npm install`，并使用较新的 Node.js 版本。
- **项目做不下去**：项目假定 Agent 能编辑文件、执行命令，给它这些权限，或者换一个支持多步任务的工具。

课程内容或翻译有错误，请到项目的 GitHub 仓库反馈。
