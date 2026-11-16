---
title: "DSH-Android：在安卓运行 DSH"
description: "DSH-Android 是一个集成手机控制能力的 DSH 插件应用，通过 APK 在安卓运行智能体，无需 root 或 Termux。了解安装方法、模型服务配置、Shizuku 使用和常见报错排查。"
summary: "用一个 APK 在安卓手机运行智能体，读屏操作 App、整理文件、修改设置并执行定时或条件任务。支持可选 Shizuku，也能通过 SSH 或 DSH Remote 连接电脑上的代理。"
highlights:
  - "无障碍读屏操作"
  - "定时与条件自动化"
  - "可选 Shizuku 授权"
  - "多模型服务接入"
  - "SSH 远程连接"
faq:
  - q: "DSH-Android 怎么安装到安卓手机？"
    a: "从仓库 Releases 下载 APK，在 Android 10 及以上的 arm64-v8a 手机上安装。打开后登录 DeepSeek 账号或填写 API key，再描述任务，按提示授予所需权限。"
  - q: "DSH-Android 必须 root 或安装 Shizuku 吗？"
    a: "不需要 root，也不需要 Termux，引擎已嵌入应用。Shizuku 是可选组件，可增加系统控制能力；Android 14 及以上的虚拟屏幕操作需要 Shizuku 或自连 ADB。"
  - q: "DSH-Android 怎么接入 Claude、Gemini 或 OpenRouter？"
    a: "在“设置 → 模型服务”中添加服务商、填写 key 并拉取模型列表，第三方接口须兼容 HTTPS Chat Completions。使用第三方模型时，联网搜索还需要单独配置 DeepSeek API key。"
  - q: "DSH-Android 后台定时器和机器人为什么停止？"
    a: "默认任务结束五分钟后引擎会停止，插件定时器和机器人连接也会停止。需要持续在线时，在“设置 → 关于 → 后台保活”开启“引擎常驻”，并按页面提示允许自启动和后台运行。"
  - q: "DSH-Android 锁屏后还能操作 App 吗？"
    a: "有安全锁屏时，操作其他 App 界面的任务会暂停，解锁后才能继续。文件、设置、通知等系统 API 类任务仍可执行。"
---

## DSH-Android 是做什么的？

DSH-Android 是一个集成手机控制能力的 DSH 插件应用，让开发者和普通用户通过对话操作 App、处理文件与执行自动化任务。它以 APK 交付，内嵌 DeepSeek Harness 引擎，无需 root、Termux 或电脑即可运行。

搜索 DSH-Android 安卓手机自动化时，需要区分其交付方式：这是带有设备能力适配的安卓应用，支持 DeepSeek Harness 插件生态。它也能通过 SSH 或 DSH Remote 连接电脑、服务器；仅用远程模式时无需安装本地运行环境。项目由社区维护，与 DeepSeek 官方无关联。

## DSH-Android 核心功能

- **读屏操作 App**：通过无障碍服务读取屏幕、点击、滑动和输入。悬浮球可用于对话、派发任务或发送当前屏幕，执行中能暂停、停止或插话。
- **文件处理与脚本**：查找、移动、重命名、压缩和解压文件，读取 PDF、Word、Excel、PPT 文字。自带 Linux 环境，可运行 Python 和智能体编写的脚本。
- **系统控制与 Shizuku**：调整亮度、音量等设置，读取回复通知、控制媒体。可选授权扩展系统开关；Android 14 及以上配好 Shizuku 或自连 ADB 后，可在虚拟屏幕操作。
- **定时与条件自动化**：按时间执行，或由 Wi-Fi、蓝牙连接、充电、位置和通知事件触发，适合重复性手机任务。
- **模型服务与扩展**：可添加 OpenAI、Claude、Gemini、OpenRouter 等服务。原版引擎保留技能、MCP、子 agent 和网页搜索能力。

## 怎么安装和使用 DSH-Android？

README 未提供 DSH 安装命令，也未确认 npm 包名；安装入口是仓库 Releases 中的 APK。

1. 从 `https://github.com/jackwener/DSH-Android/releases/latest` 下载。设备须为 Android 10 及以上、arm64-v8a；安装包约 110 MB，建议预留 500 MB 空间。
2. 安装后登录 DeepSeek 账号或填写 API key，确认网络能访问对应 API。
3. 先尝试“列出下载目录里最大的 5 个文件”等具体任务，按应用提示开启所需权限。
4. 在“设置 → 模型服务”添加其他服务商，填 key、拉取模型列表，再从模型选择器切换。第三方服务仅支持 HTTPS 的 OpenAI 兼容 Chat Completions 接口。
5. 按需在“设置 → 手机权限”安装 Shizuku。需要插件持续在线时，到“设置 → 关于 → 后台保活”开启“引擎常驻”。

## DSH-Android 报错怎么排查？

- **未签名或解析失败**：签名提示请换用 v0.3.5 及以后版本。解析失败则重新下载，检查是否被改成 `.apk.1`，并核对发布说明中的 SHA-256。
- **签名冲突或设备不兼容**：不同签名的旧版本须先卸载，操作会清除应用数据。兼容性问题需核对系统版本和 arm64-v8a 架构。
- **提示有害应用**：核对发布哈希后，可在弹窗中选择“更多详情”再点“仍要安装”。`adb install` 一直没输出时，检查手机是否正在等待弹窗确认。
- **锁屏或后台任务暂停**：界面操作需解锁后继续；部分国产 ROM 还须按体检页提示允许后台弹出和自启动。引擎默认在任务结束五分钟后停止，持续连接类插件需开启常驻。
- **重启后 Shizuku 失效**：重新启动服务；Shizuku 13.6 及以上配合 Android 11 及以上可开启“开机启动（无线调试）”。
- **推理档位或搜索不可用**：自定义模型在“设置 → 模型服务 → 模型设置”声明推理控制。第三方模型的联网搜索另需 DeepSeek API key，工具调用效果取决于所选模型。
