---
title: "AI_Animation：DSH HTML 动画技能"
description: "AI_Animation 是一个面向 HTML 动画生成的 DSH 插件目录项目，实际提供 Agent Skills 集合。了解安装依据、演示主题配置与常见报错检查方法。"
summary: "用自然语言生成 HTML 演示、协议可视化和动态架构图。17 项 Agent Skills 提供执行指令、参考提示词与模板，并覆盖视频渲染和质量检查。"
highlights:
  - "PPT 风格 HTML 演示"
  - "网络协议可视化"
  - "动态架构图"
  - "GSAP 动效素材库"
  - "视频渲染与质量检查"
faq:
  - q: "AI_Animation 怎么安装到 DeepSeek Harness？"
    a: "当前 README 摘录没有提供 DSH 安装命令，也没有确认 npm 包名。仓库以 Agent Skills 文件夹组织内容，接入方式需要结合所选技能文档与宿主的技能加载说明确认。"
  - q: "AI_Animation 能生成 PPTX 文件吗？"
    a: "已提供的文档说明 ppt-animation 生成的是单文件 HTML 演示，支持翻页和元素分批入场。当前资料不能确认 PPTX 导出能力。"
  - q: "AI_Animation 的 PPT 演示有哪些主题？"
    a: "ppt-animation 提供 dark-tech、warm-paper、clean-white、cyber-red 和 gradient-dark 五套主题。也可以指定 assets/ 中已有的 HTML 模板作为改写基础。"
  - q: "AI_Animation 能做 TCP/IP 和 DHCP 动画吗？"
    a: "network-protocol-viz 覆盖 TCP/IP、IPv4、以太帧、路由和 DHCP 等网络协议内容。使用时可在需求中说明协议、数据包流程与需要解释的阶段。"
  - q: "AI_Animation 支持 HTML 转 MP4 吗？"
    a: "集合中的 HyperFrames 提供从 HTML、CSS、媒体和可定位时间的动画生成确定性 MP4 的能力。FrameProof 则用于检查空帧、冻结、字幕、音频和编码元数据等视频问题。"
---

## AI_Animation 是做什么的？

AI_Animation 是一个面向 HTML 动画生成的 DSH 插件目录项目，实际交付形式是 Agent Skills 集合。它为制作技术讲解、教学课件和视频演示的开发者提供执行指令、提示词参考与页面模板，帮助智能体根据文字需求生成动画。README 提到的宿主包括 WorkBuddy、Claude Code 和 Cursor，当前摘录没有说明 DSH 的具体接入流程。

仓库列出 17 项技能，每项使用独立文件夹组织：`SKILL.md` 存放智能体指令，`README.md` 提供使用说明，`references/` 保存提示词参考，`assets/` 提供 HTML 模板。在查找 DeepSeek Harness 插件时，可以将它作为动画技能资源评估；具体加载方式仍需依据宿主文档确认。

AI_Animation HTML 动画技能覆盖演示翻页、流程讲解、协议可视化和视频场景，也包含渲染与成片检查资源。选择时应先明确需要的是交互网页、录屏素材还是视频输出，再查看对应技能说明。

## AI_Animation 核心功能

- **PPT 风格演示：**`ppt-animation` 生成 16:9 单文件 HTML，翻页后逐步显示页面元素，支持键盘、滚轮和点击操作，适合全屏展示与录屏。
- **网络协议可视化：**`network-protocol-viz` 覆盖 TCP/IP、IPv4、以太帧、路由和 DHCP，用于呈现协议过程与数据包相关概念。
- **动态架构图：**`dynamic-archify` 支持系统架构、流程图、时序图、数据流和状态机，包含流动动画与多格式导出；摘录没有列出具体导出格式。
- **GSAP 动效素材：**`ui2v-motions` 收录 1,262 个离线动效包，文档标注体积为 641MB，并提供按镜头用途检索的索引与暂停时间轴接入参考。
- **视频渲染与检查：**HyperFrames 提供确定性 MP4 渲染、组合、批量变量及本地或云端渲染。FrameProof 检查空帧、冻结、字幕、音频等问题，并提供修复包与基线回归机制。

## 怎么安装和使用 AI_Animation？

当前摘录没有 DSH 安装命令，npm 包名也未确认，因此不能据此生成安装指令。资料同样未给出 DSH 配置文件位置或技能目录。

1. 按任务选技能：翻页课件选 `ppt-animation`，协议过程选 `network-protocol-viz`，架构表达选 `dynamic-archify`。
2. 阅读对应文件夹的 `README.md` 与 `SKILL.md`，结合宿主的技能加载说明使用，并保留配套参考资料和模板。
3. 描述主题、受众、展示形式和步骤。在支持的智能体环境中安装后，项目设计为根据描述激活相应技能。
4. 需要演示主题时，在请求中指定 `dark-tech`、`warm-paper`、`clean-white`、`cyber-red` 或 `gradient-dark`；也可指定 `assets/` 中的模板。
5. 生成后检查内容、翻页与入场顺序，再全屏演示或录屏；需要 MP4 时，另行查看 HyperFrames 的使用文档。

可参考这样的请求：`用 ppt-animation 制作 TCP 建连讲解，采用 clean-white 主题和 16:9 布局，以图形呈现消息顺序，逐步显示说明文字。`这是使用示例，不是仓库安装命令。

## AI_Animation 报错怎么排查？

摘录没有错误码或 DSH 专用修复方案。可先检查当前 profile 是否正确、相关技能或插件集成是否已启用，再重启 DSH，查看版本与日志以确认加载情况。

若智能体无法读取指令或模板，检查所选文件夹是否保留文档中的文件与资源目录。若生成样式不符合预期，在请求中明确技能、主题和模板。渲染或视频检查失败时，应查看对应技能文档；当前资料仅说明能力，未提供这些工具的配置命令与错误处理步骤。
