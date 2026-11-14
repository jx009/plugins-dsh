---
title: "Awesome-DeepSeek-Harness-Plugins：DSH目录"
description: "Awesome-DeepSeek-Harness-Plugins 是一个收录模型、工具与集成的 DSH 插件目录。了解如何查找插件安装方法、配置文档与常见报错排查入口。"
summary: "按能力分类查找 DeepSeek Harness 扩展，查看源码仓库、星标与参考资料，再进入具体项目完成安装。提供中英文索引，覆盖模型接入、技能、记忆、客户端与集成。"
highlights:
  - "八类能力导航"
  - "源码与参考资料入口"
  - "中英文双语索引"
  - "星标与引用数量排序"
  - "已归档项目标记"
faq:
  - q: "Awesome-DeepSeek-Harness-Plugins 怎么安装到 DSH？"
    a: "这是供浏览的项目目录，本身不是需要加载的扩展。所提供的 README 没有目录级安装命令，应进入选中项目的仓库查看安装说明。"
  - q: "Awesome-DeepSeek-Harness-Plugins 能找到 OpenCode 模型插件吗？"
    a: "模型分类收录了接入 OpenCode Zen 的 opencode2dsh，以及接入 OpenCode Go 的 dsh-opencode-go。两者是独立项目，具体配置条件应查看各自仓库。"
  - q: "Awesome-DeepSeek-Harness-Plugins 有中文版吗？"
    a: "仓库提供英文与简体中文索引入口。英文文件为 README.md，中文文件为 README.zh-CN.md。"
  - q: "Awesome-DeepSeek-Harness-Plugins 的插件按什么排序？"
    a: "每个分类内先按 GitHub 星标排序，再按已核验参考资料数量排序。部分条目暂无已核验引用，已归档项目则保留并标记状态。"
---

## Awesome-DeepSeek-Harness-Plugins 是做什么的？

Awesome-DeepSeek-Harness-Plugins 是一个帮助开发者发现扩展的 DSH 插件目录。它汇集模型提供商、工具、技能、记忆、自动化、运行时、桌面客户端和浏览器集成，适合已经明确需求、但还没有选定具体项目的用户。目录本身不执行所收录插件的功能。

这是一个提供中英文版本的 DeepSeek Harness 插件导航，README 将其描述为每日维护的精选索引。收录标准强调项目公开、可检查且明确面向该生态；每个条目提供原始仓库入口、星标与参考资料信息，方便继续了解实现和使用条件。

## Awesome-DeepSeek-Harness-Plugins 核心功能

- **按能力查找项目**：目录分为模型与提供商、工具与技能、会话与存储、循环与调度、运行时与沙箱、界面与客户端、集成、开发与运维八类。可以从任务出发选择入口。
- **模型接入线索**：已展示的条目包括接入 OpenCode Zen 的 opencode2dsh、连接本地已登录 WorkBuddy 的 dsh-workbuddy-connect，以及面向符合条件订阅账号的 dsh-plugin-subscriptions。它们各自维护安装与配置方式。
- **源码与引用入口**：条目链接到项目原始 GitHub 仓库，并列出参考资料信息。部分项目暂无已核验引用，选择时应查看具体条目的记录。
- **排序与归档标记**：同一分类先按星标、再按已核验引用数量排序。归档项目仍会保留并标注，便于识别状态。
- **双语与运维资料**：索引支持英文和简体中文。核心资源还包含手册入口，涉及架构、MCP、会话、沙箱、评估与故障排查。

## 怎么安装和使用 Awesome-DeepSeek-Harness-Plugins？

所提供的 README 没有这个目录的 DSH 安装命令，也没有可确认的 npm 包名。直接访问仓库 `https://github.com/Zhiyuan-Fan/Awesome-DeepSeek-Harness-Plugins` 开始浏览。

1. 根据阅读习惯打开 `README.md` 或 `README.zh-CN.md`。
2. 选择需求对应的分类。例如，要查找 OpenCode 模型或 WorkBuddy 连接方案，先看模型与提供商分类。
3. 阅读项目简介、归档标记和引用信息。按目录建议，在安装前检查目标项目的代码与权限需求。
4. 进入选中项目的原始仓库，按其文档安装。包名、账号条件、配置位置都应以该项目说明为准。
5. 将配置应用到实际使用的 DSH profile。当前目录 README 未提供统一配置文件，也没有一条命令安装全部条目的流程。

## Awesome-DeepSeek-Harness-Plugins 报错怎么排查？

如果在插件界面里找不到这个目录，先确认是否安装了所需的具体扩展。浏览索引只是在选择项目，不会自动启用目录列出的能力。

对于已经安装但未显示或不能工作的扩展，可以先做通用检查：确认 profile 名称与实际使用的一致，确认插件已启用，重启 DSH，再查看版本与日志。涉及模型账号、凭据或端点的问题，应继续查阅目标项目自己的配置文档。

所提供的目录 README 没有列出具体错误码或对应修复方法。核心资源中的手册可作为运维参考入口；定位某个插件的问题时，仍应结合其仓库文档和实际日志。
