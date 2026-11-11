---
title: "loopx：让长周期 Agent 任务不断线"
description: "LoopX 是本地优先的控制面，把目标、待办、人工审批和证据保存在会话之外，重启或换运行时后可接着做，支持 Codex、Claude Code 和 DSH。"
summary: "LoopX 为耗时很长的 Agent 任务保存目标、待办清单、人工审批关卡和证据记录；模型和工具仍然由你用的 Agent 运行时提供。"
highlights:
  - "持久化目标状态"
  - "人工审批关卡"
  - "按配额续跑"
  - "证据与运行历史"
  - "本地仪表盘"
faq:
  - q: "LoopX 是一个 Agent 框架吗？"
    a: "不是。README 把它定位为控制面，而不是 Agent 框架或运行时。模型和工具由 Codex、Claude Code、DeepSeek Harness 等宿主提供，LoopX 负责保存目标状态。"
  - q: "哪些决定会留给人来做？"
    a: "需要人拍板的工作会停在用户关卡上等待。按 README 的说法，危险权限、发布和生产环境写入这几类操作始终由人决定。"
  - q: "LoopX 会收集使用数据吗？"
    a: "基础使用统计在首次使用告知后默认开启，包括每天一次的随机 ID 心跳和不带 ID 的命令计数，不收集内容。可以用 loopx usage-ping disable 命令或设置 LOOPX_USAGE_PING=0 关闭。"
---

## loopx 是做什么的？

LoopX 解决的是长任务“断线”的问题：会话结束、宿主重启，或者工作换到另一个运行时之后，Agent 往往要从头再来。LoopX 把目标、待办清单、等待中的审批、任务归属和证据都保存在本机，下一次会话从已记录的状态接着做，而不是从一句新的提示词开始。

它自己不运行模型，也不调用工具，这些仍然由 Agent 宿主完成。LoopX 决定的是下一轮应该看到什么：当前目标、下一条待办，以及哪些决定在等你处理。它适合要跨很多次会话才能完成的工作，比如性能排查、循环修 Bug，或者由多个 Agent 协作的调研，这类工作的进度很容易在会话之间丢失。

## 核心功能

- **目标与待办**：目标连同它的待办、认领和关卡，跨会话、跨重启保留。
- **用户关卡**：需要人决定的步骤会停下来等待，得到答复后 Agent 才继续。
- **按配额续跑**：`loopx quota should-run` 告诉已注册的 Agent 现在该动手、该等待，还是保持安静。
- **证据与历史**：`loopx status` 和 `loopx review-packet` 显示目标、待处理的决定、下一条待办和已经完成的内容。
- **仪表盘**：`loopx dashboard` 在本地打开浏览器或 PWA 形式的工作区视图。
- **多宿主入口**：为 Codex App、Codex CLI、Claude Code、DeepSeek Harness 等宿主分别提供了启动方式。

## 怎么使用 loopx

1. 安装 LoopX，只需一次。要求 Python 3.11 以上和 Node.js 22.22.3 以上（推荐 24 LTS）：

   ```bash
   python3 -m pip install --upgrade loopx && loopx workflow-skills --install
   ```

2. 重启 Agent 宿主，打开你的项目。
3. 在 Codex 里，用自然语言发出一个目标：

   ```text
   $loopx speed up this project's slowest workflow; compare approaches and verify the gains
   ```

   Claude Code 里改用 `/loopx <complex task>`。
4. 在 DeepSeek Harness 里，按仓库中 `packages/dsh-loopx-plugin/README.md` 的说明安装原生 DSH 插件，选择 `loopx` 技能，再描述任务。
5. 用 `loopx status` 查看进度。安装有问题时运行诊断：

   ```bash
   loopx doctor
   ```

如果是从 1.x 升级，README 要求先读 2.0 迁移指南，再继续已有的目标。
