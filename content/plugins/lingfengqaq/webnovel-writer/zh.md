---
title: "webnovel-writer：用 DSH 写长篇网文"
description: "webnovel-writer 是一个面向长篇网文连载的 DSH 插件，重点是让章节与已有大纲、角色设定和伏笔保持一致。了解 v8 安装入口、写作入门步骤和插件未显示时的排查方法。"
summary: "面向长篇连载作者的 v8 写作工作台。项目关注的不只是起草一章，还包括在续写时核对大纲、角色设定和未回收的伏笔。"
highlights:
  - "DSH v8 连载写作台"
  - "v6 卷纲与章纲规划"
  - "v6 章节一致性审查"
  - "v6 伏笔与角色状态查询"
faq:
  - q: "webnovel-writer 怎么安装到 DeepSeek Harness？"
    a: "按 v8 安装指南操作：https://lingfengqaq.github.io/webnovel-writer/docs/install.html。默认分支 README 里的插件市场命令用于 Claude Code，不能用来安装 DSH 版。"
  - q: "webnovel-writer 的 DSH 版在哪个分支？"
    a: "DeepSeek Harness 版在 `v8` 分支。`master` 保留 Claude Code v6，`v7` 是已冻结且未发布的 CLI 开发版本。"
  - q: "webnovel-writer v6 的旧书仓能直接迁移到 v8 吗？"
    a: "仓库没有提供经过验证的直接迁移方案。建议先保留原书仓，用独立项目体验 v8，再决定如何处理已有稿件。"
  - q: "webnovel-writer v6 怎么查已经登记的伏笔？"
    a: "在 Claude Code 版中，可以用 `/webnovel-query 伏笔` 查询项目记录。这个命令来自 v6 文档，不代表 v8 使用同一个入口。"
  - q: "webnovel-writer v6 不填 Embedding API Key 能用吗？"
    a: "可以，v6 会退回 BM25 关键词检索。如果相关段落换了一种说法，没有使用同样的关键词，就可能更难被召回。"
---

## webnovel-writer 是做什么的？

webnovel-writer 是一个面向长篇网文连载的 DSH 插件，重点是让续写与已有大纲、角色设定和伏笔保持一致。它适合需要反复核对人物动机、世界规则和故事时间线的作者。比如后面的章节要接回前文的一条伏笔，动笔前需要弄清它在哪里埋下、已经推进到哪一步，而不是让模型仅凭当前对话推断。

这个 DeepSeek Harness 插件对应仓库的 `v8` 分支。默认的 `master` 分支保留的是 Claude Code v6，README 中详细展示的命令和配置大多属于旧版。下面按版本区分已记录的能力：可以用 v6 的例子理解项目如何处理长篇一致性，但在 DSH 里实际操作时，要以 v8 的指南和教程为准。

## webnovel-writer 核心功能

- **连载写作工作台（v8）。** 这是面向 DSH 的正式版本，公开了产品源码和运行技能，也提供了新手教程。第一次使用时，可从教程确认工作台的入口和写作流程。
- **卷纲与章纲规划（v6）。** 从全书总纲拆出各卷和章节的安排，同时补充时间线。规划中新增的设定可以写回项目，供后续写章时核对。
- **章节创作与一致性审查（v6）。** 起草前准备上下文，写完后核对章节衔接、人物行为和阅读节奏，再把新增事实记录下来。这样后续续写时，有记录可查，不必只靠当前会话回忆前文。
- **伏笔查询与项目记忆（v6）。** 状态查询可查角色、伏笔和实体关系；项目记忆可保存适用于本书的写法。只读面板用于查看项目状态和章节内容，不是修改故事设定的入口。

## 怎么安装和使用 webnovel-writer？

默认分支的 README 没有给出 DSH 安装命令，也没有可确认的 npm 包名。请直接打开 v8 安装指南：https://lingfengqaq.github.io/webnovel-writer/docs/install.html。不要把 Claude Code 插件市场里的安装命令改写成 DSH 命令。

1. 确认安装指南对应的是 v8，再按页面步骤在 DeepSeek Harness 中完成安装。仓库首页同时介绍两个版本，看到 `master` 下的快速开始时，不要把它当作 DSH 安装说明。
2. 安装后打开 v8 新手教程：https://lingfengqaq.github.io/webnovel-writer/docs/beginner.html。按教程创建第一个书项目，找到工作台提供的技能入口，再尝试规划或试写，不要直接套用旧版的斜杠命令。
3. 需要调整配置时，在 v8 指南中核对配置位置。默认 README 中的 `.env`、Embedding 和 Rerank 示例属于 v6，不能据此判断 v8 要填写哪些字段。
4. 如果手头已有 v6 书仓，先保留原项目，再用独立项目熟悉工作台。仓库尚未给出经过验证的旧书仓直迁方案，安装成功不代表旧项目可以直接打开。

## webnovel-writer 报错怎么排查？

- **安装后看不到工作台。** 先确认用的是 v8 指南，再核对当前运行的 DSH profile 名和插件启用状态。确认无误后重启 DSH，再检查工作台是否出现。
- **命令找不到，或配置项对不上。** 先看示例来自哪个分支。`/webnovel-write` 和 RAG 配置示例都来自 Claude Code v6 文档；在 DSH 中找不到同名入口时，应先回到 v8 教程核对，而不是反复运行旧命令。
- **仍然无法完成安装或启动。** 查看已安装版本和 DSH 日志，记下使用的 profile、卡住的步骤和实际提示。这样反馈问题时，可以先区分是装错版本、插件未启用，还是安装流程本身没有完成。
