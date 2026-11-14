---
title: "awesome-gpt-image-2：DSH 可用的生图提示词库"
description: "awesome-gpt-image-2 是一个收录 530 多个案例、附带 DSH 可加载风格技能的 GPT Image 提示词库。了解技能安装方法和提示词用法。"
summary: "汇集图像生成提示词、模板和可复用的 Agent 技能。配套网站可以按风格浏览案例，另有 GPT Image 2.5 同提示词对比专区。"
highlights:
  - "530 多个带完整提示词的案例"
  - "20 多套工业级模板"
  - "GPT-Image2 风格库技能"
  - "GPT Image 2.5 并排对比"
  - "可筛选的网页图库"
faq:
  - q: "awesome-gpt-image-2 怎么在 DeepSeek Harness 里用？"
    a: "仓库里有一个叫 `gpt-image-2-style-library` 的 Agent 技能。README 没有给出 DSH 专用命令，把 `agents/skills/` 下的这个技能目录复制到 DSH 的技能目录 `~/.dsh/skills/`，再重启 DSH 即可。"
  - q: "awesome-gpt-image-2 的风格库技能能做什么？"
    a: "它让 Agent 从网站同一份数据里挑选 GPT-Image2 的风格、模板、分类和场景标签，再写出完整的提示词，比如按某个主题生成一份信息图提示词。"
  - q: "awesome-gpt-image-2 自己能生成图片吗？"
    a: "仓库主要是提示词、模板和案例。配套网站登录 Google 后可以测试生成；GPT Image 2.5 专区只展示对比，不提供 2.5 在线生成。"
  - q: "awesome-gpt-image-2 收录了多少提示词？"
    a: "超过 530 个带完整提示词的案例和 20 多套模板，案例分成两页图库，模板单独成文，并附常见踩坑说明。"
  - q: "awesome-gpt-image-2 的 2.5 对比可信吗？"
    a: "四组对比都是拿图库已有案例的完整提示词、不带参考图重新生成的。README 写明原图的生成条件和工具的具体模型 ID 未经核实。"
  - q: "awesome-gpt-image-2 的技能能用 npm 安装吗？"
    a: "能。运行 `npx gpt-image-2-style-library install all`，它会把技能写进 Codex 和 Claude Code 常用的本地目录，装完重启 Agent 会话。"
---

## awesome-gpt-image-2 是做什么的？

awesome-gpt-image-2 是一个 GPT Image 提示词库，附带一个 DSH 用户可以加载的 Agent 技能，用来写出更好的生图提示词。它收录了 530 多个图像生成案例，每个都有完整提示词和成图，另有 20 多套工业级模板，讲清楚哪些写法有效、哪些容易翻车。

项目的思路是“提示词即代码”：案例按风格和场景整理，模板可以复用，同一份数据既驱动网页图库，也驱动 Agent 技能。这个技能叫 `gpt-image-2-style-library`，Agent 会先挑出匹配的风格、模板和场景标签，再写提示词，而不是凭空发挥。

另有一个 GPT Image 2.5 专区，用新模型重跑了几个图库里的提示词，和原图并排展示，可以直观看到同一句提示词在不同版本上的差别。

## awesome-gpt-image-2 核心功能

- **案例图库**：530 多个案例，覆盖信息图、界面截图、插画、卡牌套图、产品拆解等，提示词可以一键复制。
- **提示词模板**：20 多套工业级模板，附常见踩坑说明。
- **风格库技能**：读取和网站相同的风格、分类、场景数据，把一句简短需求变成结构化的提示词。
- **2.5 对比**：四组复现案例，支持拖动分割线、并排查看，并列出生成参数。
- **网页图库**：按风格或场景筛选，查看大图，还能跳回 GitHub 上的原始案例。

## 怎么安装和使用 awesome-gpt-image-2？

1. 拿到技能文件，最简单的是用 npm 命令行：

   ```bash
   npx gpt-image-2-style-library install all
   ```

   它会把技能写进 `~/.codex/skills`、`~/.claude/skills` 和 `~/.agents/skills`。

2. 用 DeepSeek Harness 的话，把仓库 `agents/skills/` 下的 `gpt-image-2-style-library` 目录复制到 `~/.dsh/skills/`，然后重启 DSH。
3. 让 Agent 写提示词：

   ```text
   用 gpt-image-2-style-library 写一份关于 Codex 的信息图提示词
   ```

4. 把生成的提示词贴进你的生图工具；或者在图库里找一个接近的案例，改它的完整提示词。

Claude Code 用户也可以用 `/plugin marketplace add freestylefly/awesome-gpt-image-2` 从插件市场安装。

## awesome-gpt-image-2 报错怎么排查？

- **Agent 不调用这个技能**：确认技能目录直接放在 skills 目录下，`SKILL.md` 在这一层，然后开一个新的 Agent 会话。README 提到装完要重启会话。
- **`install all` 没装进 DSH**：这个命令只写 Codex 和 Claude Code 的目录，DSH 需要手动把技能复制到 `~/.dsh/skills/`。
- **生成效果和图库不一样**：案例是在不同条件、不同工具下生成的，README 也标明原图的模型 ID 未经核实。把提示词当作起点，按你用的模型调整风格词。
- **网站要求登录**：浏览不需要登录，在网站上测试生成需要用 Google 账号登录。
- **从 GitHub Packages 安装失败**：这个源要先运行 `npm login --scope=@freestylefly --registry=https://npm.pkg.github.com`；公共 npm 上的 `gpt-image-2-style-library` 不需要登录。

图库里的图片来源各异，商用前请先看仓库里的免责声明。
