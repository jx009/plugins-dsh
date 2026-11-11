---
title: "nuwa-skill：蒸馏公众人物的思维方式"
description: "nuwa-skill（女娲）是通用 Agent Skill：给出人名，自动调研、提炼并盲测其心智模型、决策启发式和表达方式，生成可复用的人物 Skill。"
summary: "给出一个人名，女娲完成调研、提炼和验证，产出一份人物 Skill。它基于开放的 Agent Skills 标准，并不只适用于 DSH。"
highlights:
  - "五步蒸馏流程"
  - "独立盲测验证"
  - "写明能力边界"
  - "跨运行时通用"
faq:
  - q: "nuwa-skill 只能在 DeepSeek Harness 里用吗？"
    a: "不是。它是基于开放 Agent Skills 标准的通用技能，可以在 Claude Code、Codex、Cursor、OpenClaw、Hermes Agent 等兼容的运行时里使用，同一个仓库也能作为 DSH 插件安装。"
  - q: "蒸馏出来的人物 Skill 包含哪些文件？"
    a: "一份不超过 350 行的 SKILL.md，案例集 references/casebook.md，语录库 references/voice.md，以及记录盲测结果的 FIDELITY.md。"
  - q: "人物 Skill 做不到什么？"
    a: "README 列了三条局限：提炼不了直觉；只是截至调研时间点的快照；只依据公开言论，而公开言论未必等于本人的真实想法。"
---

## nuwa-skill 是做什么的？

nuwa-skill（女娲.skill）是一个用来造 Skill 的 Skill。你告诉 Agent 一位公众人物的名字，女娲会去调研这个人，提炼他思考问题的方式，再把结果打包成一份“人物 Skill”，之后 Agent 可以随时加载。

它想留下的是思考方式，不是语录背诵。一份完成的人物 Skill 会写明这个人的心智模型、做判断时依赖的经验法则、说话的风格、不会去做的事，以及这份 Skill 自己的认知到哪里为止。

女娲不是 DeepSeek Harness 专属的插件。它遵循开放的 Agent Skills 标准，在 Claude Code、Codex、Cursor 等兼容的 Agent 里都能运行，DSH 只是其中一个受支持的宿主。

## 核心功能

- **先写先验快照**：调研之前，先把模型已经知道的内容写下来，之后只找三类材料：能推翻它的、比它更深的、它缺失的。
- **采集并封存**：收集著作、访谈、社交媒体、批评者的观点、决策记录和人生时间线，并封存一部分真实决策，留到最后当考题。
- **提炼**：产出 5–8 个典型招式、3–7 个心智模型、决策启发式、带出处的案例卡，以及至少 2 条常见误读。
- **盲测验证**：由独立的 Agent 分别在带 Skill 和不带 Skill 的情况下回答同一批问题，评审不知道哪份是哪份；结果连同失分一起写入 FIDELITY.md。
- **现成的人物 Skill**：作者已经发布 14 个人物 Skill 和 1 个主题 Skill，都可以单独安装，其中有 Paul Graham、芒格、费曼等。
- **版本升级**：用 v1.x 做出来的 Skill，可以直接让 Agent 升级到新格式。

## 怎么使用 nuwa-skill

1. 在 DeepSeek Harness 里，把仓库作为插件添加，然后重启 DSH：

   ```bash
   dsh plugin --profile web add github:alchaincyf/nuwa-skill
   ```

2. 在其他 Agent 里，用 skills 命令行安装，它会自动识别当前的运行时：

   ```bash
   npx skills add alchaincyf/nuwa-skill
   ```

3. 让 Agent 蒸馏一个人：

   ```
   Distill Paul Graham
   ```

4. 人物 Skill 生成之后，直接点名调用：

   ```
   Use Munger's perspective to analyze this investment decision
   ```

在 DSH 里蒸馏出来的人物 Skill 会写入项目的 `.dsh/skills/` 目录，DSH 会自动加载。
