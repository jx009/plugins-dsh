---
title: "Blue-Whale-Harness：查找 DSH 插件"
description: "Blue-Whale-Harness 是一个支持中英文搜索与分类筛选的 DSH 插件目录。了解如何查找安装说明、按 STAR 排序、导出 CSV 和提交收录。"
summary: "集中查找 DeepSeek Harness 插件、Skills、MCP Server 与周边工具，按分类和 STAR 缩小选择范围。支持 CSV 导出，并将插件与相关生态项目分别标记。"
highlights:
  - "中英文关键词搜索"
  - "分类筛选与星标排序"
  - "CSV 数据导出"
  - "插件与生态分别标记"
  - "提交仓库收录"
faq:
  - q: "Blue-Whale-Harness 怎么安装到 DSH？"
    a: "README 将它作为在线目录提供，没有给出目录本身的 DSH 安装命令。直接打开 leenkcool.github.io 查找项目，再按目标仓库的说明安装。"
  - q: "Blue-Whale-Harness 怎么判断真 DSH 插件？"
    a: "目录以仓库是否包含 cordis.patch.yml 作为判定标准。不包含该文件的相关项目会单独标记为生态项目，两类分别统计。"
  - q: "Blue-Whale-Harness 支持中文搜索吗？"
    a: "支持，在线总表提供中英文搜索和对应语言页面。还可以结合分类筛选与 STAR 排序查找项目。"
  - q: "Blue-Whale-Harness 怎么导出插件清单？"
    a: "在线总表支持 CSV 导出，README 也提供 plugins.csv 的直接下载地址。下载后可以自行筛选数据，也可以直接阅读 README 中按分类排列的清单。"
  - q: "怎么向 Blue-Whale-Harness 提交插件收录？"
    a: "使用 catalog-intake 模板创建 issue，填写仓库地址和分类。也可以参照 repos.txt 的格式提交 PR。"
---

## Blue-Whale-Harness 是做什么的？

Blue-Whale-Harness 是一个帮助开发者查找扩展与周边工具的 DSH 插件目录。它汇集分散在 GitHub 上的 Skills、MCP Server、工具、界面和编排项目，适合已经明确所需能力、但还没有选定具体仓库的用户。

这个 DeepSeek Harness 插件目录提供在线总表、README 分类清单和 CSV 数据三种入口。用户可以先搜索和比较项目，再进入原仓库查看安装与配置说明。所提供的资料没有说明目录本身是可安装的扩展，也没有确认对应的 npm 包名。

目录同时保留插件和相关生态项目，并分别标记、分别统计。因此，找到一个条目之后，还需要查看它的类型与原项目文档，不能仅凭收录状态判断安装方式。

## Blue-Whale-Harness 核心功能

- **中英文搜索**：在线总表支持两种语言的关键词检索，并提供中文和英文页面。可以从插件名称或需要解决的问题开始查找。
- **分类筛选**：通过 tools、session、skills、ui、memory、orchestration 等分类缩小范围，集中查看同类能力的仓库。
- **STAR 排序**：在线目录可以按 GitHub 星标排序；README 清单则按分类分组，组内按星标从高到低排列，方便浏览。
- **CSV 导出**：提供 `plugins.csv` 数据，供用户下载后自行筛选。需要在网页之外整理候选项目时，可以使用这个入口。
- **收录类型标记**：仓库包含 `cordis.patch.yml` 时，目录将其判为真 DSH 插件；其余相关仓库按生态项目单独标记，避免混合计数。

## 怎么安装和使用 Blue-Whale-Harness？

README 没有提供这个目录的 DSH 安装命令，仓库信息也没有确认 npm 包名。使用入口是网站，无需先为目录编写安装命令。

1. 在浏览器打开 `https://leenkcool.github.io`。中文页面地址为 `https://leenkcool.github.io/plugins.zh.html`，英文页面地址为 `https://leenkcool.github.io/plugins.en.html`。
2. 输入项目名称或功能关键词，再结合分类筛选结果。需要按关注度浏览时，使用 STAR 排序。
3. 阅读候选条目的中英文用途说明与插件标记，点击仓库名称进入原项目。具体安装步骤、配置位置和使用方法以该项目的文档为准。
4. 若希望自行处理清单，下载 `https://leenkcool.github.io/plugins.csv`；不想打开在线总表时，也可以阅读 README 的分类列表。
5. 提交新仓库时，在 `leenkcool/Blue-Whale-Harness` 使用 `catalog-intake` 模板创建 issue，写明仓库地址与分类；也可以按 `repos.txt` 格式提交 PR。

## Blue-Whale-Harness 报错怎么排查？

所提供的 README 没有列出目录专属错误码或故障修复方法。需要换一种方式查看条目时，可以使用文档中提供的 README 清单或 CSV 数据入口。

如果问题发生在某个已安装的扩展上，先阅读该扩展仓库的说明。通用检查顺序是确认当前 profile 名称、核对插件是否启用、重启 DSH，再检查版本与日志。这些步骤用于一般诊断，并非目录承诺的专用修复方案。

如果疑问是某个条目为什么不算真插件，则检查目录采用的文件判定标准。相关生态项目仍可能有使用价值，但它们的接入方式需要单独查看，不能直接套用其他插件的安装命令。
