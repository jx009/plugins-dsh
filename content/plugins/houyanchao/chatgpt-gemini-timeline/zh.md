---
title: "chatgpt-gemini-timeline：DSH 对话导航"
description: "chatgpt-gemini-timeline 是一个提供对话导航的 DSH 插件关联项目，原生版为 dsh-timeline。了解安装方法、提示词库使用和常见问题排查。"
summary: "用时间轴回看提问，以文件夹整理收藏，并复用常用提示词。本仓库提供浏览器扩展；DeepSeek Harness 用户应转到原生版 dsh-timeline。"
highlights:
  - "按提问跳转时间轴"
  - "收藏文件夹与搜索"
  - "常用提示词库"
  - "对话导出与公式复制"
  - "提供 DSH 原生版入口"
faq:
  - q: "chatgpt-gemini-timeline 怎么安装到 DeepSeek Harness？"
    a: "README 将 Harness 用户引导到独立的 dsh-timeline 仓库，地址为 https://github.com/houyanchao/dsh-timeline。当前资料没有提供 DSH 安装命令，也没有确认本仓库的 npm 包名，应按原生版文档安装。"
  - q: "chatgpt-gemini-timeline 和 dsh-timeline 有什么区别？"
    a: "本仓库是用于 AI 对话网页的 Timeline 浏览器扩展，dsh-timeline 则是原生 DSH 插件。README 明确列出的原生版能力包括时间轴、收藏文件夹、提示词库、对话导出和公式复制，并支持主题跟随。"
  - q: "chatgpt-gemini-timeline 支持哪些浏览器？"
    a: "README 提供 Chrome、Microsoft Edge 和 Firefox 的官方商店入口。本地开发时，Chrome 和 Edge 可加载解压后的源码目录，Firefox 可通过 about:debugging 临时加载。"
  - q: "chatgpt-gemini-timeline 能用 Google Drive 备份吗？"
    a: "浏览器版支持在用户主动授权后使用 Google Drive 备份和恢复，核心数据默认保存在本地。当前 README 没有说明原生 DSH 版也支持这项功能，不能直接套用浏览器版结论。"
  - q: "chatgpt-gemini-timeline 为什么没有显示某个功能？"
    a: "各平台支持范围不同，例如 NotebookLM 未列出时间轴支持，部分网站没有侧边栏收藏入口。先对照 README 的平台表，再检查扩展设置中是否关闭了对应平台或功能。"
---

## chatgpt-gemini-timeline 是做什么的？

chatgpt-gemini-timeline 是一个提供对话导航与整理能力的 DSH 插件关联项目，其原生实现是独立的 dsh-timeline。本仓库实际提供 Timeline 浏览器扩展，帮助用户在长对话中定位旧提问、保存有用回答，并减少重复输入提示词的操作。

查找 DeepSeek Harness 插件时，需要区分这两个安装对象：网页用户安装浏览器版，Harness 用户转到原生版仓库。README 明确说明原生版具有时间轴、收藏文件夹、提示词库、对话导出、公式复制和主题跟随；不能据此认定浏览器版的所有其他功能也已移植。

## chatgpt-gemini-timeline 核心功能

- **时间轴导航**：浏览器页面右侧的节点对应用户提问，可点击跳转，也支持键盘导航。问题列表和提问时间标签提供额外的回顾入口，具体支持情况取决于平台。
- **收藏文件夹**：保存单条问答或整页会话，再通过文件夹、备注与搜索整理资料。部分网站还能在原生侧边栏展示收藏入口。
- **提示词库**：集中保存常用提示词，并配合快捷追问减少重复操作。浏览器版还提供输入行为设置，可按平台与功能控制启用范围。
- **对话导出与公式复制**：将需要保留的对话内容带出聊天页面。浏览器版还支持识别 LaTeX、MathML 公式，并提供代码块辅助操作。
- **本地数据与备份**：浏览器版默认在本地保存收藏、提示词和设置，可用 JSON 导入导出，或授权 Google Drive 备份恢复。这些备份能力未在当前原生版介绍中得到确认。

## 怎么安装和使用 chatgpt-gemini-timeline？

当前 README 没有 DSH 安装命令，也未确认本仓库的 npm 包名，因此这里不提供推测生成的命令。

1. 使用 Harness 时，前往 `https://github.com/houyanchao/dsh-timeline`，按原生插件文档安装。不要把浏览器仓库名直接当作 npm 包名。
2. 使用网页版 AI 时，从 README 的 Chrome、Edge 或 Firefox 官方商店入口安装。随后打开受支持的对话页面，大多数功能默认开启。
3. 在较长的会话中点击时间轴节点，定位之前的问题；需要长期保留的问答可加入收藏文件夹。
4. 将重复使用的指令放进提示词库。浏览器版的开关位于扩展设置面板，可分别关闭平台适配或具体功能。
5. 更换浏览器前，使用浏览器版的 JSON 导出，或在主动授权后进行 Google Drive 备份。

本地开发浏览器扩展时，可运行 `node scripts/build-content.js` 单次生成资源，或运行 `node scripts/build-content.js --watch` 持续监听。这两条命令只负责构建资源，不是原生插件安装命令。

## chatgpt-gemini-timeline 报错怎么排查？

先确认出问题的是浏览器扩展还是 dsh-timeline。网页适配表与浏览器构建流程不等于原生插件的运行说明，排查时应使用对应项目的资料。

- 功能缺失时，先核对目标平台是否支持，再检查扩展设置中的平台与功能开关，避免把支持范围差异当作故障。
- 修改浏览器源码后，等待构建成功，再重新加载扩展并刷新 AI 页面。监听模式不会自动执行后两步；生成失败时，修正源码并保存后可再次触发构建。
- 原生版采用通用检查：确认 profile 名称正确、插件已启用，重启 DSH，并查看版本与日志；当前资料没有提供专用错误码。
- 提交浏览器问题时，附上浏览器版本、扩展版本、目标平台、复现步骤、预期结果、实际表现和截图，便于维护者定位。
