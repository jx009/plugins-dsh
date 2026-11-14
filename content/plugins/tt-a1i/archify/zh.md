---
title: "archify DSH 插件：让 Agent 画可交互架构图"
description: "archify 是一个把描述、方案或代码仓库变成可交互 HTML 架构图的 DSH 插件。了解安装方法、对话里改图的技巧和加载异常的排查。"
summary: "描述一个系统，或者让 Agent 读一个仓库，archify 会生成一个独立的 HTML 图表，可以点选浏览、在对话里继续修改，也能导出成图片。"
highlights:
  - "十种图表类型"
  - "单文件可交互 HTML"
  - "交付前自动校验"
  - "节点链接到源码行号"
  - "导出 PNG、WebP、JPG"
faq:
  - q: "archify 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0`，把 `web` 换成你自己的 profile 名。这是社区维护的集成包，内置 Archify 技能 3.2.0，不是 DeepSeek 官方产品。"
  - q: "archify 插件支持哪个版本的 DSH？"
    a: "集成包 1.1.0 针对开发者预览版 `@deepseek-ai/dsh@0.2.1-rc.2`，Node.js 需要 `^22.19.0` 或 `>=24.0.0`。README 写明不保证兼容其他 DSH 版本。"
  - q: "升级 archify 之后，DSH 为什么还在用旧版本？"
    a: "个人和项目目录里的技能优先级高于插件自带的版本。如果你以前手动装过 `archify`，那份旧副本会盖过插件。先查清当前加载的技能来自哪个路径，再自己决定更新还是删除旧副本。"
  - q: "archify 能把已有的 Mermaid 图转过来吗？"
    a: "不能。README 写明自动解析 Mermaid、通用自动布局、托管分享和所见即所得编辑目前都不在范围内。"
  - q: "archify 生成的图怎么修改？"
    a: "在同一个对话里继续提具体要求，比如“加上 Redis”“把鉴权挪到左边”“高亮回滚路径”。archify 保留了带类型的源数据，Agent 会在原图上改，不会从头再画。"
  - q: "archify 插件会把代码或提示词发到外部吗？"
    a: "DSH 集成本身不发任何网络请求，也没有遥测。内置技能有一个可选的更新提醒，只会读取一个固定的版本清单，设置 `ARCHIFY_UPDATE_CHECK_DISABLED=1` 可以关掉。"
---

## archify 是做什么的？

archify 是一个让编程 Agent 画技术图的 DSH 插件。你给它一段描述、一份设计方案或者整个代码仓库，它交回一个 HTML 文件，里面是一张可以交互的图，任何浏览器都能直接打开。

Agent 并不是随手写出这个页面。它先生成一份带类型的 JSON 来描述图的内容，随技能附带的校验器会检查 schema、布局和连线。所有检查都通过后，新文件才会替换上一份可用的结果，所以一次失败的渲染不会把已经能用的图覆盖掉。

archify 最早是面向 Cursor、Claude Code、Codex CLI 和 OpenCode 的通用 Agent 技能。DeepSeek Harness 的支持来自一个需要主动安装的社区集成包 `@tt-a1i/archify-dsh`，它把同一个技能打包给 DSH 的 profile 使用。

## archify 核心功能

- **十种图表**：架构图、工作流、时序图、数据流、生命周期、ERD、类图、树状图、时间线和瀑布图。系统设计、数据库结构、发版时间线都能用同一个工具画。
- **交付前校验**：schema、布局、HTML/SVG 和连线检查全部通过，Agent 才会交出文件。
- **交互式查看器**：可以聚焦某个节点，查看它的上下游，追踪一条完整路径，或者对比不同角色。这些都依据 Agent 写下的节点和关系，不靠猜。
- **源码证据**：需要时，架构图的节点可以链接到经过 Git 核对的文件和行号，并固定在某一次提交上，代码评审时很有用。
- **便于传递**：成品只有一个 HTML 文件，可以导出成 PNG、WebP 或 JPG，也能生成直接打开某个视图的链接。
- **界面多语言**：查看器内置英文、简体中文、繁体中文、西班牙文、韩文和阿拉伯文。

## 怎么安装和使用 archify？

1. 把社区集成包装进你的 DSH profile，`web` 换成你实际使用的 profile 名：

   ```bash
   dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0
   ```

2. 重启这个 profile，DSH 会加载名为 `archify-plugin` 的技能来源。
3. 直接用一段描述出图，不需要代码仓库：

   ```text
   Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.
   ```

4. 也可以打开一个项目，让 archify 梳理它的结构：

   ```text
   Use the archify skill to map this repository's runtime architecture.
   ```

5. 在同一个对话里继续调整，比如“加上鉴权”“高亮缓存未命中的路径”“换成浅色主题”。

以后要卸载，运行 `dsh plugin --profile web remove @tt-a1i/archify-dsh`。不用 DSH 的话，在 Cursor、Claude Code、Codex 或 OpenCode 里让 Agent 读取 `https://raw.githubusercontent.com/tt-a1i/archify/main/llms.txt` 就能装上这个技能。

## archify 报错怎么排查？

- **Agent 找不到这个技能**：确认安装时指定的 profile 就是你正在用的那个，然后重启它。这个集成只提供技能，不会新增按钮或面板，需要在对话里明确要求用 archify 画图。
- **一直加载旧版本**：个人和项目目录里的技能优先于插件自带的版本。如果你以前手动装过 `archify`，即使插件已经升级，那份旧副本也会盖过它。先查当前加载的技能来自哪个路径，再自己决定更新还是删除。
- **装完之后其他技能不见了**：这是集成包 1.0.0 的问题，它关掉了 DSH 默认的技能目录。1.1.0 已经修复，升级到 `@tt-a1i/archify-dsh@1.1.0` 即可。
- **安装失败或插件起不来**：1.1.0 针对 DSH 开发者预览版 `0.2.1-rc.2`，Node.js 需要 `^22.19.0` 或 `>=24.0.0`，先核对这两个版本。
- **希望完全不联网**：集成本身不发请求，再设置 `ARCHIFY_UPDATE_CHECK_DISABLED=1`，连技能的更新提醒也一起关掉。

提交问题时，请附上插件版本、DSH 版本，以及当前加载的技能所在路径。
