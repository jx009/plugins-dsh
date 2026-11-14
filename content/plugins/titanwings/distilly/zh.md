---
title: "Distilly：DSH 人物画像技能，原同事 Skill"
description: "Distilly 是一个把同事或公众人物的经验、判断和表达方式提炼成可复用 Agent 技能的 DSH 技能。了解安装方法、使用步骤和常见问题。"
summary: "Distilly 把关于一个人的资料整理成可复用的人物画像，打包成 Agent 技能，支持同事、亲密关系，以及公众人物或虚构角色三类场景。"
highlights:
  - "从聊天、文档和访谈生成人物画像"
  - "同事、关系、名人三类流程"
  - "飞书、钉钉、Slack 自动采集"
  - "打包成 Agent 技能"
  - "DeepSeek Harness 原生识别"
faq:
  - q: "Distilly 怎么安装到 DeepSeek Harness？"
    a: "把仓库克隆到 DSH 的技能目录 `~/.dsh/skills/distilly`（或 `$DSH_HOME/skills/distilly`），项目级安装放在项目里的 `.dsh/skills/distilly`。也可以让 Agent 从 GitHub 地址安装，并检查 DSH 能否识别。"
  - q: "Distilly 有 npm 包吗？"
    a: "没有。Distilly 以技能目录的形式安装，不是 npm 插件，所以没有 `dsh plugin add` 命令。"
  - q: "Distilly 会生成什么？"
    a: "一份基于你提供的资料的人物画像，打包成名为 `{character}-{slug}` 的 Agent 技能，DSH 和其他宿主都能加载。"
  - q: "Distilly 能刻画哪些人？"
    a: "三类：同事和导师、亲密关系，以及公众人物或虚构角色。每一类都有自己的采集策略、分析维度和画像结构。"
  - q: "Distilly 生成的人物画像怎么装进 DSH？"
    a: "运行 `python3 tools/install_generated_skill.py --skill-dir \"skills/{character}/{slug}\" --host deepseek-harness`。它只把独立的 `SKILL.md` 写进 `~/.dsh/skills`，不会复制你的原始资料。"
  - q: "同事 Skill 和 Distilly 是同一个项目吗？"
    a: "是。同事 Skill（Colleague Skill）是旧名字，现在的创建技能叫 `distilly`，安装目录也叫 `distilly`。"
---

## Distilly 是做什么的？

Distilly 是一个用在 DeepSeek Harness 里的 Agent 技能，把一个人思考和做事的方式提炼成可复用的人物画像。你给它聊天记录、文档、访谈、公开资料，或者只是你自己的描述，它会把关于这个人的经验、判断、表达和工作习惯整理成一个 Agent 能加载的技能。

项目原名同事 Skill，工作场景仍然是重点：把资深工程师怎么做代码评审、导师怎么权衡取舍记录下来，人走了经验还在。现在它也支持亲密关系和公众人物、虚构角色，每一类都有独立的流程。

Distilly 不是 npm 插件，而是 DSH 能直接识别的技能目录，Claude Code、Codex、OpenCode、Hermes 等宿主也同样支持。它生成的画像描述的是资料里能观察到的模式，项目并不声称能复刻一个人。

## Distilly 核心功能

- **同事画像**：技术标准、工作流程和职场行为，支持从飞书、钉钉、Slack 自动采集。
- **关系画像**：从聊天记录和书信里整理表达方式、情绪触发点、冲突和修复模式。
- **名人画像**：一套调研流程，包括字幕处理、转写清理、资料合并和质量检查。
- **自己的画像**：说一句“用 Distilly 建立我的画像”，经过简短访谈生成画像，保存在本地的 `~/.distilly/owner/profile.md`。
- **输出为 Agent 技能**：每个结果都打包成名为 `{character}-{slug}` 的技能。
- **安全安装成果**：安装器只复制生成的 `SKILL.md`，不会带上你的原始资料。

## 怎么安装和使用 Distilly？

1. 把 Distilly 克隆到 DSH 的技能目录：

   ```bash
   git clone https://github.com/titanwings/distilly ~/.dsh/skills/distilly
   ```

   项目级安装放到项目里的 `.dsh/skills/distilly`；也可以直接对 Agent 说：“从 https://github.com/titanwings/distilly 安装 Distilly，然后确认当前宿主能识别它。”

2. 重启 DSH，让它加载新技能。
3. 在对话里说：“用 Distilly 为某某创建一份人物画像”。
4. 选择 `colleague`、`relationship` 或 `celebrity`，补充描述或资料（每一项都可以不填），然后审阅草稿。
5. 把生成的画像装进 DSH：

   ```bash
   python3 tools/install_generated_skill.py --skill-dir "skills/{character}/{slug}" --host deepseek-harness
   ```

## Distilly 报错怎么排查？

- **DSH 找不到这个技能**：确认 `SKILL.md` 直接位于 `~/.dsh/skills/distilly`（或 `$DSH_HOME/skills/distilly`）里，没有多套一层目录，然后重启 DSH。
- **生成的画像用不了**：生成的画像是独立的技能，要用 `--host deepseek-harness` 运行安装器；覆盖旧版本加 `--force`，项目级目录用 `--skills-dir` 指定。
- **飞书采集不到内容**：自动采集需要把应用机器人拉进相关群聊。
- **画像太单薄**：质量取决于资料。同事类，本人写的长文档和决策回复比闲聊有用；名人类，第一人称的书和长访谈比第三方评论有用。
- **从同事 Skill 升级过来**：创建技能已经改名为 `distilly`，按安装指南里的迁移说明调整目录名。

项目自称仍是演示版本，遇到问题请在 GitHub 反馈，附上宿主、Distilly 版本和使用的流程。
