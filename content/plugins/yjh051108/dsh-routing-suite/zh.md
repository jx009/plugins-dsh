---
title: "dsh-routing-suite：按任务切换推理模式"
description: "dsh-routing-suite 把运行时注入器、按任务选择推理模式的路由预设和分级任务协议收在一个仓库里，适合想调整 DSH 推理行为、给长任务加上流程约束的用户。"
summary: "一个仓库装齐运行时注入器、Router Standard 与 Router Spec 两个路由预设，以及带打卡和红队门的分级任务协议。"
highlights:
  - "运行时注入器"
  - "任务感知路由预设"
  - "分级任务协议"
  - "按模型选人设"
  - "会话测量脚本"
faq:
  - q: "Router Standard 和 Router Spec 有什么区别？"
    a: "Router Standard 先给任务分类，再套用对应的 persona，并保留完整的提示词分节。Router Spec 偏向优先深度思考，标注为实验性。README 还提到 router-pro，但它仍在规划中，尚未发布。"
  - q: "只想用路由预设，也要装注入器吗？"
    a: "仓库把注入器列为安装链的第一步，预设排在它之后。用 GitHub 一键安装会把整个套装装好，不需要自己操心先后顺序。"
  - q: "dsh-routing-suite 面向哪些 DSH 版本？"
    a: "README 写明的目标版本是 `>=0.1.0-rc.6`，同时提醒 DSH 还处于 developer preview，会有破坏性变更；版本跟进记录在 `preset/CHANGELOG.md`。"
---

## dsh-routing-suite 是做什么的？

dsh-routing-suite 把三个 DSH 扩展放进同一个仓库：运行时注入器、按任务挑选推理模式的路由预设，以及把长任务拆成“先计划、再逐项核对”的分级协议。

注入器是底层。它提供一组 `dev_*` 工具，可以在不重启 DSH 的情况下注入、热重载和卸载插件代码。路由预设建立在它之上：每条用户消息会被归入某个行为带，比如先做计划的 spec、偏执行的 react，预设再据此替换提示词里的 persona 部分，Pro 和 Flash 两类模型用的措辞也不一样。作者把设计依据整理成编号 P1 到 P23 的一组实验，仓库里有链接。

分级模式是会话级的任务协议：先用选择题式的脑暴对齐目标，再写出规格化的计划，随后按计划推进，中间有打卡、分组收官，最后做一次终验。

## 核心功能

- **运行时注入器**：`dev_*` 工具覆盖注入、热重载、卸载、侧挂转正和路由自愈。
- **路由预设**：`router-standard` 按任务类别路由，并按模型选择 persona；`router-spec` 优先深度思考，标为实验性。
- **近距离引导**：固定引导语和用户消息放在同一次请求里发出；按更新记录的说法，这样每轮不会再多一次 API 调用。
- **保留 plan 模式**：只替换 persona 部分，plan 模式的边界不受影响。
- **分级协议**：围绕两级任务流程提供 6 个工具、三种模式、红队门和审计端点。
- **测量脚本**：`graded/scripts/measure.mjs` 可以拿你自己的会话文件复算仓库公布的指标，只输出数字。

## 怎么使用 dsh-routing-suite

1. 从 GitHub 一条命令装好整个套装：

```
dsh plugin --profile web add github:yjh051108/dsh-routing-suite
```

2. 也可以克隆仓库后运行自带的 PowerShell 脚本，它会装配注入器、复制预设并检查目录布局：

```
git clone https://github.com/yjh051108/dsh-routing-suite.git
cd dsh-routing-suite
.\install.ps1
```

3. 想手动安装的话，先用 `dsh plugin --profile web add .\injector` 装注入器，再把 `preset\router-standard` 和 `preset\router-spec` 分别复制到用户目录下的 `.dsh\.agent-presets`。两个预设目录要各自复制：DSH 只扫描一级子目录，把整个 `preset` 目录拷过去会导致预设找不到。
4. 重启 DSH，新建会话时选择 Router Standard 或 Router Spec (experimental)。
