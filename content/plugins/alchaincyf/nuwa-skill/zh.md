---
title: "nuwa-skill DSH 插件：蒸馏名人的思维方式"
description: "nuwa-skill 是一个调研公众人物、把他的心智模型和决策方式做成可复用技能的 DSH 插件。了解安装方法、人物 Skill 的用法和常见问题。"
summary: "给出一个人名，女娲完成调研、提炼和验证，产出一份人物 Skill。它基于开放的 Agent Skills 标准，并不只适用于 DSH。"
highlights:
  - "五步蒸馏流程"
  - "每份 Skill 独立盲测"
  - "提炼心智模型与决策启发式"
  - "写明能力边界"
  - "跨运行时通用"
faq:
  - q: "nuwa-skill 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add github:alchaincyf/nuwa-skill`，把 `web` 换成你的 profile，然后重启 DSH。以后卸载用 `dsh plugin --profile web remove huashu-nuwa`。"
  - q: "nuwa-skill 在 DSH 里蒸馏出的人物 Skill 存在哪里？"
    a: "在 DeepSeek Harness 里蒸馏出的人物 Skill 会写进当前项目的 `.dsh/skills/` 目录，DSH 会从这里自动加载。"
  - q: "nuwa-skill 生成的人物 Skill 包含哪些文件？"
    a: "一份不超过 350 行的 `SKILL.md`，案例集 `references/casebook.md`，语录库 `references/voice.md`，以及记录盲测结果的 `FIDELITY.md`，输掉的题目也会如实写进去。"
  - q: "nuwa-skill 只能在 DeepSeek Harness 里用吗？"
    a: "不是。它基于开放的 Agent Skills 标准，可以在 Claude Code、Codex、Cursor、OpenClaw、Hermes Agent 等兼容的运行时里使用，DSH 只是其中之一。"
  - q: "nuwa-skill 蒸馏出的人物 Skill 有什么局限？"
    a: "README 列了三条：提炼不了直觉；只是截至调研时间点的快照；只依据公开言论，而公开言论未必等于本人的真实想法。"
  - q: "不支持 Skill 的工具里能用 nuwa-skill 吗？"
    a: "可以。`SKILL.md` 本质就是带 YAML 头的 Markdown，把内容直接粘贴进对话，就能当作参考资料使用。"
---

## nuwa-skill 是做什么的？

nuwa-skill（女娲.skill）是一个用来造 Skill 的 DSH 插件。你告诉 Agent 一位公众人物的名字，女娲会去调研这个人，提炼他思考问题的方式，再打包成一份“人物 Skill”，之后想借用这个视角时，Agent 随时可以加载。

它想留下的是思考方式，不是语录背诵。一份完成的人物 Skill 会写明这个人的心智模型、做判断时依赖的经验法则、说话的风格、不会去做的事，以及这份 Skill 自己的认知边界。之后你可以问“芒格会怎么看这笔交易”，得到的回答建立在有出处的思考方式之上。

女娲遵循开放的 Agent Skills 标准，所以也能在 Claude Code、Codex、Cursor 等兼容的 Agent 里运行。DeepSeek Harness 是支持的宿主之一，可以像普通插件一样安装。

## nuwa-skill 核心功能

- **先拍先验快照**：调研前，女娲先记下模型对这个人已有的认识，之后只找能推翻、深化或补全这份认识的材料。
- **收集与封存**：收集著作、访谈、社交发言、批评者的观点、决策记录和人生时间线，并把一部分真实决策封存起来，留作最后的考题。
- **提炼**：每份 Skill 包含 5–8 个标志性做法、3–7 个心智模型、决策启发式、带出处的案例卡，以及至少两条常见误读。
- **盲测验证**：独立的 Agent 分别在加载和不加载这份 Skill 的情况下回答封存的考题，再由不知情的评审打分，结果连同输掉的题目一起写进 `FIDELITY.md`。
- **现成的人物**：作者已经公开了 14 个人物 Skill 和 1 个主题 Skill，可以单独安装，包括保罗·格雷厄姆、芒格和费曼。
- **升级旧版**：用 v1.x 做的 Skill，对 Agent 说“升级 X 的 Skill”就能更新到新结构。

## 怎么安装和使用 nuwa-skill？

1. 把插件装进你的 DSH profile，`web` 换成你实际使用的名字：

   ```bash
   dsh plugin --profile web add github:alchaincyf/nuwa-skill
   ```

2. 重启 DSH，让插件生效。
3. 让 Agent 蒸馏一个人：

   ```text
   蒸馏一个保罗·格雷厄姆
   ```

4. 人物 Skill 做好后，直接按名字调用：

   ```text
   用芒格的视角帮我分析这个投资决策
   ```

在 DSH 里做出的人物 Skill 保存在当前项目的 `.dsh/skills/`，下次打开会自动加载。在其他 Agent 里，可以用 `npx skills add alchaincyf/nuwa-skill` 安装，它会自动识别运行时；也可以把仓库克隆到对应的 skills 目录，DSH 对应的目录是 `~/.dsh/skills/nuwa-skill/`。

## nuwa-skill 报错怎么排查？

- **说“蒸馏 X”没反应**：确认插件装在你正在使用的 profile 里，并且装完后重启过 DSH。手动安装的话，检查目录是否为 `~/.dsh/skills/nuwa-skill/`，而且 `SKILL.md` 就在这一层。
- **新做的人物 Skill 下次找不到**：在 DSH 里，人物 Skill 写在当前项目的 `.dsh/skills/`。重新打开同一个项目即可；想在所有项目里用，把这个目录复制到个人 skills 目录。
- **卸载时提示找不到插件**：插件注册的名字是 `huashu-nuwa`，不是 `nuwa-skill`，要用 `dsh plugin --profile web remove huashu-nuwa`。
- **旧的人物 Skill 效果不好**：v1.x 做出的 Skill 缺少新版结构，对 Agent 说“升级 X 的 Skill”重新生成。
- **结果太泛**：人物 Skill 的质量取决于公开材料的多少。访谈和著作少的人物，提炼出的内容会比较单薄，可以看 `FIDELITY.md` 里的盲测成绩判断可信度。

反馈问题时，请附上 DSH 版本、插件安装路径，以及你尝试蒸馏的人物。
