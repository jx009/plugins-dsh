---
title: "dsh-anchored-standard：DSH 工具分阶段加载"
description: "dsh-anchored-standard 是一个分阶段开放工具的 DSH 插件。了解安装依据、Minimal 启动、按需工具发现配置与常见报错排查。"
summary: "先用 Minimal 工具启动会话，再开放工具发现与按需解锁能力。项目提供多种实验性预设，围绕 V4 Pro 调优，目前已冻结维护。"
highlights:
  - "Minimal 工具启动"
  - "持久事件触发阶段切换"
  - "Standard 工具按需发现"
  - "自动上下文注入控制"
  - "预制轨迹初始化会话"
faq:
  - q: "dsh-anchored-standard 怎么安装到 DeepSeek Harness？"
    a: "README 说明各模式目录可以独立安装，复制时使用的 ID 就是其安装标识。当前节选缺少 Install 章节，也未确认 npm 包名，因此无法据此给出可直接运行的安装命令或目标路径。"
  - q: "dsh-anchored-standard 什么时候开放 Standard 工具？"
    a: "基础模式在首个持久化工具调用或助手消息出现后切换阶段。之后先提供常驻目录和发现工具，较重的工具需要显式解锁。"
  - q: "dsh-anchored-standard 重启后会丢失阶段状态吗？"
    a: "阶段状态根据会话日志中已持久化的事件推导。README 明确说明恢复会话和重新加载可以保留阶段状态。"
  - q: "dsh-anchored-standard 会增加模型调用次数吗？"
    a: "基础模式没有额外的锚定调用，Zero-Anchored 和 Whoami 各增加一次。Prefab 使用已经完成阶段切换的预制轨迹，实例化时无需调用模型。"
  - q: "dsh-anchored-standard 还在维护吗，适合 V4.1 Flash 吗？"
    a: "README 已将项目标记为冻结，不再处理新 issue 和 PR，原有调优对象是 V4 Pro。维护者没有测量 V4.1 Flash 自身的首轮轨迹，不能把早期 flash 系列的实验结果当作该模型已验证有效的依据。"
---

## dsh-anchored-standard 是做什么的？

dsh-anchored-standard 是一个以 Minimal 条件启动会话、再分阶段开放工具的 DSH 插件。它面向研究首轮工具定义、输出预算和上下文注入如何影响模型推理轨迹的开发者，让启动请求与后续执行阶段使用不同的工具目录。

基础模式首轮只提供 `bash` 和 `str_replace_editor`，并暂停自动上下文注入。首次工具调用或助手消息写入持久化日志后，会话进入常驻阶段，恢复标准注入，再通过发现工具按需解锁较重的能力。

这是社区维护的实验性 DeepSeek Harness 插件，并非官方预设。README 已宣布项目冻结，不再接收或处理新 issue 和 PR。测量与调优围绕 V4 Pro 展开；维护者没有测量 V4.1 Flash 自身的首轮轨迹，不能将早期 flash 系列的观察视为后继模型的验证结果。

## dsh-anchored-standard 核心功能

- **Minimal 启动条件**：使用真实的双工具定义，基础模式默认沿用适配器输出预算。`bootstrapMaxTokens` 是可选参数，并非默认强制的小额上限。
- **持久事件驱动切换**：`promoteOn: either` 表示首次持久化的 `tool/call` 或 `assistant/message` 均可结束启动阶段。状态从日志推导，恢复会话与重新加载后仍可保留。
- **按需发现 Standard 工具**：切换后提供 `dev_tool_search`、`skill_search` 和 `skill_load`。常驻目录由初始工具、发现工具和已显式解锁的工具组成。
- **统一控制上下文注入**：`context-gate` 在启动阶段通过统一注入路径抑制自动内容，包括技能目录提醒等；阶段切换后恢复标准注入。
- **多种会话起点**：Zero-Anchored 通过固定锚定对话启动，Whoami 使用自我介绍轮次，各增加一次模型调用。Prefab 使用已完成切换的预制轨迹，实例化无需模型调用。

## 怎么安装和使用 dsh-anchored-standard？

当前 README 节选没有安装命令，仓库信息也未确认 npm 包名，因此不提供推测的安装指令。文中引用了 Install 章节，但其具体路径与注册步骤未包含在材料中，需要查阅完整文档。

1. 先在完整 README 的 Install 章节确认复制目标和注册方式。各模式目录自包含，可独立安装，并使用复制时指定的 ID。
2. 需要基础两阶段行为时选择 `preset/`。固定锚定、自我介绍和预制轨迹分别对应 `zero-anchored-standard/`、`whoami-standard/`、`prefab/`。
3. 安装后选择对应预设并开始会话。Prefab 会在选中时原地初始化空白会话，无需为每个工作区单独导入。
4. 使用基础模式时，先观察双工具启动，再确认持久事件触发切换。后续通过发现工具开放需要的能力，不应预期首轮就显示完整工具集。
5. 如需修改输出预算，查阅完整配置说明中的 `bootstrapMaxTokens`。节选没有给出配置文件位置或完整语法，不能据此生成可直接粘贴的配置。

## dsh-anchored-standard 报错怎么排查？

若看不到预设，先确认当前 profile 名与安装位置一致、插件已启用，再重启 DSH，查看版本和日志。这些是通用检查步骤；现有节选没有提供专门的安装错误码。

若阶段没有切换，检查日志是否已有持久化工具调用或助手消息。基础模式接受任一事件，使用实时锚定轮次的变体则等待锚定回复，不同模式的触发条件不能混用。

若锚定效果发生变化，核对首轮工具定义、自动注入内容和输出上限。README 的实验中，技能目录提醒曾使锚定无法复现；首轮回复超过较小上限时，截断与续写循环也可能放大轨迹漂移。因此基础模式默认不设置该上限，实验观察也不代表所有模型和任务都能获得相同结果。
