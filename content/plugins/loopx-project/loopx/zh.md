---
title: "loopx DSH 插件：长任务目标不丢失"
description: "loopx 是一个让目标、待办和审批跨 Agent 会话保留下来的 DSH 插件和控制平面。了解在 DeepSeek Harness 里的安装方法和初始化问题排查。"
summary: "LoopX 给长时间运行的 Agent 任务提供持久的目标、待办清单、人工审批关口和证据记录。模型和工具仍然由你用的 Agent 运行时提供。"
highlights:
  - "目标和待办跨会话保留"
  - "人工审批关口"
  - "按额度决定是否继续"
  - "DSH 内的 GoalBar 和 LoopX 面板"
  - "本地看板与证据记录"
faq:
  - q: "loopx 怎么安装到 DeepSeek Harness？"
    a: "用 `dsh plugin --profile web add` 加上仓库发布页里 `dsh-loopx-plugin` 的 `.tgz` 地址安装。第一次启动时，插件会自动安装 LoopX 命令行和工作流技能。"
  - q: "安装 loopx 的 DSH 插件需要什么环境？"
    a: "稳定版 Node.js 22.22.3 以上（不支持 Node.js 23）、pnpm、带 pip 的 Python 3.11 以上；如果本机还没有兼容的 LoopX 命令行，第一次启动需要联网。"
  - q: "loopx 是 Agent 框架吗？"
    a: "不是。README 把它定位成控制平面：模型和工具由 DeepSeek Harness、Codex 或 Claude Code 提供，LoopX 负责保存目标、待办、关口和证据。"
  - q: "DSH 里为什么看不到 loopx 的 GoalBar？"
    a: "当前会话必须恰好有一个 LoopX 绑定，GoalBar 才会显示。先在这个会话里调用 `loopx` 技能；只装插件不会自动建立绑定。"
  - q: "loopx 会把哪些决定留给人？"
    a: "需要人来决定的工作会停在用户关口等你确认。README 写明，危险权限、发布和生产环境写入都由人来决定。"
  - q: "loopx 会收集使用数据吗？"
    a: "首次使用提示后，默认开启基础统计：每天一次随机 ID 心跳，加上不带 ID 的命令计数，不收集任何内容。用 `loopx usage-ping disable` 或设置 `LOOPX_USAGE_PING=0` 关闭。"
---

## loopx 是做什么的？

loopx 是一个本地优先的控制平面，也是一个 DSH 插件，用来保证长时间运行的 Agent 任务在会话结束、宿主重启或换了运行时之后还能接着做。它把目标、待办清单、等待中的审批、负责人和证据都存在你的电脑上，下一个会话从记录的状态继续，而不是从一句新提示词重新开始。

LoopX 自己不跑模型，也不调用工具，这些由 DeepSeek Harness 完成。LoopX 决定下一轮应该看到什么：当前目标、下一项待办，以及哪些决定在等你拍板。所以它适合跨很多会话的工作，比如性能排查、反复修 bug、多个 Agent 一起做研究，这类工作的进度很容易在对话之间丢掉。

项目同时支持 Codex 和 Claude Code。针对 DSH，它提供了原生包 `dsh-loopx-plugin`：自动安装命令行和技能，在对话区加一条 GoalBar，在侧栏加一个 LoopX 面板。

## loopx 核心功能

- **目标与待办**：目标连同它的待办、认领和关口，在会话结束和重启之后都还在。
- **用户关口**：需要人决定的步骤会停下来，等你确认后 Agent 才继续。
- **按额度续跑**：`loopx quota should-run` 告诉 Agent 现在该做、该等还是该停，DSH 的驱动器只在 LoopX 允许时才排队下一轮。
- **DSH 里的 GoalBar**：队列上方的一条小栏，显示绑定的目标，带开始和暂停按钮。
- **LoopX 面板**：侧栏入口，在 DSH 里嵌入本地 `loopx dashboard` 的工作区。
- **证据与历史**：`loopx status` 和 `loopx review-packet` 列出目标、等待的决定、下一项待办和已完成的工作。

## 怎么安装和使用 loopx？

1. 确认环境：Node.js 22.22.3 以上（不能是 23）、pnpm、带 pip 的 Python 3.11 以上。
2. 把预构建的插件装进你的 DSH profile：

   ```bash
   dsh plugin --profile web add "https://github.com/loopx-project/loopx/releases/download/dsh-loopx-plugin-v0.1.1-beta.6/dsh-loopx-plugin-0.1.1-beta.6.tgz"
   ```

3. 启动 DSH。第一次启动时，插件会把 LoopX 命令行安装或升级到独立目录 `~/.agents/runtime/dsh-loopx-plugin`，并把工作流技能复制到 `~/.agents/skills`。
4. 选择 `loopx` 技能，描述你的目标，例如：

   ```text
   /loopx 把这个项目最慢的流程提速，对比几种方案并验证效果
   ```

5. 用 `loopx status` 查看进度，按提示审批需要确认的步骤，或者打开侧栏的 LoopX 面板看看板。

beta.6 版本针对 DSH 0.2.0-rc.2 的接口，同时保留对 0.1.5 和 0.1.7-rc.2 的兼容。

## loopx 报错怎么排查？

- **第一次启动时自动初始化失败**：在 DSH 日志里找到它点名的 Python 或包管理器问题，修好后运行一次 `/loopx-init` 重试。
- **Windows 上找不到 Python**：插件依次尝试 `PYTHON_BIN`、`python3`、带版本号的 `python3.x`，最后是 `python`。微软商店的 `python3` 别名其实启动不了 Python，请从 python.org 安装，或者直接设置 `PYTHON_BIN`。
- **看不到 GoalBar**：只有当前会话调用过 `loopx` 技能、并且恰好有一个绑定时才会显示。在这个会话里运行带 `--host-surface deepseek-harness-native` 的 `loopx resolve-agent-thread`，确认状态是 `bound`。
- **LoopX 面板显示恢复提示**：面板只负责显示已经在运行的看板。先运行 `loopx dashboard`，再点重试。
- **插件拒绝当前的 LoopX 版本**：需要 LoopX 1.2.4 以上。全局安装的旧版会自动升级，但自己指定的 `LOOPX_BIN` 要你自己升级。

反馈问题时，请附上插件版本、DSH 版本、LoopX 命令行版本和相关的 DSH 日志。
