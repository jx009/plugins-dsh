---
title: "huashu-design：HTML 原生设计技能"
description: "huashu-design 是通用的 Agent 设计技能，一句话生成 HTML 原型、可编辑 PPTX 幻灯片、动画和信息图，自带 92 种附样张风格。"
summary: "适用于 Claude Code、Cursor、Codex 和 DSH 的设计技能：先出六个方向的缩略图，把其中三个做成成品，交付 HTML、MP4、GIF、可编辑 PPTX 或 PDF。"
highlights:
  - "92 种风格样张"
  - "可编辑 PPTX"
  - "设计方向顾问"
  - "六维度设计评审"
  - "本地审美记录"
faq:
  - q: "huashu-design 只能在 DeepSeek Harness 里用吗？"
    a: "不是。它是通用的 Markdown 技能，README 说可以放进 Claude Code、Cursor、Trae、Hermes、OpenClaw 等 Agent 里使用，同一个仓库也能作为 DSH 插件安装。"
  - q: "学到的审美偏好存在哪里？"
    a: "经验记录和外观账本只写在本机的 ~/.huashu-design/ 目录里，不随技能分发，删掉这个目录就全部清空。"
  - q: "哪些事情它不做？"
    a: "不支持把 PPTX 按图层往返到 Figma，3D、物理模拟和粒子系统这类动画也不在范围内。README 还提到，从零开始做品牌设计时质量会下降。"
---

## huashu-design 是做什么的？

huashu-design 是一个让编程 Agent 承担设计工作的技能。你用一句话说明需求，Agent 先用 HTML 把成品做出来，需要时再导出成其他格式。

它能做可点击的 App 和网页原型、幻灯片、动画、信息图，以及小红书图文。因为成品是用 HTML 搭出来的，整个过程没有画布和面板要操作：你和 Agent 对话，看它给出的结果，再提修改意见。README 给出的参考耗时在 3 到 30 分钟之间，视任务类型而定。

这个技能并不依附于 DeepSeek Harness。它是通用的 Agent 技能，DSH 只是可以安装它的宿主之一。

## 核心功能

- **交互原型**：单文件 HTML，带 iPhone 外框，页面可以点击，交付前用 Playwright 检查一遍。
- **幻灯片**：一份在浏览器里演示的 HTML 版，加一份保留真实文本框的可编辑 PPTX。
- **动画**：导出 MP4 和 GIF，支持 60fps 插帧和背景音乐。
- **设计方向顾问**：需求比较模糊时，按三种思路各出两个候选，共六张缩略图，从中把三个做成完整设计，其余三个留作备选。
- **风格库**：92 种 HTML 原生风格，分为网页、幻灯片、信息图、App、中式与东亚、小红书几个区，每种都附样张。
- **品牌资产流程**：涉及具体品牌时，按询问、搜索、下载、核对的顺序收集 Logo、产品图和色值，最后写入 `brand-spec.md`。

## 怎么使用 huashu-design

1. 在 DeepSeek Harness 里，把仓库作为插件添加并重启 DSH。网页版把 `desktop` 换成 `web`：

   ```bash
   dsh plugin --profile desktop add github:alchaincyf/huashu-design
   ```

2. 在其他 Agent 里，用 skills 命令行安装：

   ```bash
   npx skills add alchaincyf/huashu-design
   ```

3. 检查安装目录里是否有 `references/`、`assets/`、`scripts/`、`demos/` 这几个子目录。如果只有 SKILL.md，README 的说法是命令行版本太旧，升级后重新安装：

   ```bash
   npm i -g skills@latest
   ```

4. 用自然语言提需求，例如：

   ```
   Make a keynote for AI psychology. Give me 3 style directions to pick from.
   ```

技能的提示词是用中文写的，不过 README 说明它同样能处理英文任务。
