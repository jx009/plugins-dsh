---
title: "dsh-mobile：手机访问 DSH 会话"
description: "dsh-mobile 是一个配合网关的 DSH 插件移动客户端，可在手机查看会话和执行轨迹。了解应用安装、网关配置、语音输入与连接报错排查。"
summary: "通过 Whaleness 在 Android、iPhone 或 iPad 上访问 Harness 工作区，跟进实时回复、查看 Agent 轨迹并处理审批，也能管理文件、插件和计划任务。"
highlights:
  - "WebSocket 实时会话"
  - "Agent 轨迹与工具审批"
  - "多主机与工作区切换"
  - "文件上传与代码预览"
  - "插件与计划任务管理"
faq:
  - q: "dsh-mobile 怎么安装到手机？"
    a: "iPhone 和 iPad 通过 TestFlight 安装 Whaleness 测试版，Android 从仓库的 GitHub Releases 下载 APK。桌面端还需要安装并启用 0.11.2 或更高版本的 dsh-plugin-mobile-gateway。"
  - q: "dsh-mobile 支持哪些 Android 和 iOS 版本？"
    a: "Android 最低要求为 Android 7.0，即 API 24。iPhone 和 iPad 需要 iOS 或 iPadOS 16.1 及以上版本，部分系统效果和功能取决于设备与系统能力。"
  - q: "dsh-mobile 使用 WebSocket 还是 WebRTC 连接？"
    a: "控制操作和会话数据都通过 Mobile Gateway 使用 WebSocket 传输。当前版本已移除原生 WebRTC 传输。"
  - q: "dsh-mobile 语音输入怎么开启？"
    a: "先在桌面端 Plugins 区域启用官方 Voice Input 插件，完成模型下载和初始化。手机端还需授予麦克风权限，转写使用的是主机提供的语音能力。"
  - q: "dsh-mobile 可以离线搜索聊天记录吗？"
    a: "应用会在本地缓存会话，并支持离线搜索常用会话。存储管理可按聊天记录、图片、文件预览和临时文件等类别查看占用并清理缓存。"
---

## dsh-mobile 是做什么的？

dsh-mobile 是一个配合网关的 DSH 插件移动客户端，以 Whaleness 名称提供原生 Android 和 iOS 应用。它由第三方独立开发，帮助开发者离开电脑后继续查看工作区、跟进回复、检查工具执行，并处理 Agent 提出的问题与审批请求。

它通过 DeepSeek Harness 插件 `dsh-plugin-mobile-gateway` 连接桌面主机，控制操作与会话数据均使用 WebSocket。两端以 Kotlin Multiplatform 共享业务逻辑，各自保留原生界面和系统集成；功能正在对齐，部分系统行为仍有差异。

## dsh-mobile 核心功能

- **实时会话与执行轨迹**：阅读流式 Markdown、代码、推理、工具调用和图片附件。轨迹可展示参数、结果、schema、token 用量与耗时，便于检查执行过程。
- **Agent 团队与审批**：查看团队成员，在主 Agent 和成员会话间切换，检查共享任务的状态与归属。支持回答人工问题，以及取消、拒绝或单次批准工具请求。
- **多主机与工作区**：保存凭据独立的网关主机，浏览或创建工作区，搜索、切换和归档会话。本地历史缓存支持离线搜索常用会话，返回会话后可逐步加载旧消息。
- **文件上传与预览**：添加附件、查看上传进度并重试失败上传。从会话文件卡片打开或下载文件，也可浏览远程目录，预览 PDF、图片和代码，在 Markdown 源码与渲染视图间切换。
- **插件与计划任务**：查看插件详情及运行状态，在主机支持时安装、启停和配置插件。搜索计划任务，检查规则、下次执行时间和投递信息，并编辑或删除任务。

## 怎么安装和使用 dsh-mobile？

所提供的 README 没有该仓库的 DSH 安装命令，也未确认 npm 包名。请先通过平台渠道安装原生应用，再准备桌面网关。

1. iPhone 或 iPad 通过 `https://testflight.apple.com/join/1Euwby6r` 加入测试，需要 iOS 或 iPadOS 16.1 及以上版本。Android 从 `https://github.com/Clarklevis1995/dsh-mobile/releases` 下载 APK，最低要求为 Android 7.0。
2. 在桌面运行 Harness，安装并启用 `dsh-plugin-mobile-gateway`，版本至少为 `0.11.2`。仓库的 `AppRelease/release-info.json` 记录网关最低版本要求。
3. 使用应用的主机连接与二维码配对能力连接网关。需要访问多套环境时，可分别保存主机及凭据，再切换目标主机。
4. 进入工作区，打开或创建会话，发送消息并查看实时回复。需要检查执行细节时打开轨迹，出现问题或审批请求时在手机上处理。
5. 使用语音前，在桌面 Plugins 区域启用官方 Voice Input 插件，完成模型下载和初始化，并授予手机麦克风权限。按住说话、松开后转为可编辑草稿。

会话与默认设置可调整 Agent 预设、提供商、模型及推理强度。`read-only`、`workspace-write` 等权限控制的是主机上的 Agent。

## dsh-mobile 报错怎么排查？

连接失败时，先检查网关版本、目标 profile 和插件启用状态，再确认保存的主机是否正确。仍无法连接，可重启 DSH 并查看主机与插件日志。所提供的 README 未列出连接错误码，不宜仅凭现象推断原因。

语音无法转写时，检查桌面语音插件是否完成模型初始化，以及手机麦克风权限。文件上传失败可使用重试操作；本地占用较大时，可在存储管理中按类别清理缓存。反馈平台差异时，附上应用、网关和操作系统版本，方便定位问题。
