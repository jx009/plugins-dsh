---
title: "ds-harness-remote：远程访问本机 DSH"
description: "ds-harness-remote 是 DeepSeek Harness 的远程访问插件，经加密的 P2P 连接，在手机、浏览器或另一台电脑打开本机工作区。"
summary: "DeepSeek Harness 桌面版的远程访问插件。运行 Harness 的电脑作为 Host，网页、Android 和其他 DSH 客户端都能连上来，Host 不需要公网 IP，也不用开放端口。"
highlights:
  - "网页与移动客户端"
  - "无需公网端口"
  - "端到端加密通道"
  - "远程文件与终端"
  - "ACP 工作区"
faq:
  - q: "被访问的电脑需要公网 IP 或端口映射吗？"
    a: "不需要。Host 只发起出站连接，路径按局域网、P2P、TURN、Relay 的顺序协商；WebRTC 连不上时，会退回到加密的 WebSocket 中继。"
  - q: "ds-harness-remote 的托管服务器能看到我的对话吗？"
    a: "按 README 的说明，流量在客户端加密，只有选定的 Host 能解密，使用 Noise_IK_25519_ChaChaPoly_SHA256 套件。服务端负责协调连接，能看到必要的网络元数据，但读不到消息、提示词、工具输出和文件内容。"
  - q: "ds-harness-remote 能打开 Codex、Cursor、Claude Code 的工作区吗？"
    a: "可以，走的是 ACP 工作区，README 把它标为实验性功能。Host 在本机运行支持 ACP 的智能体，转发提示词、流式回复和审批请求；列出的后端有 Codex、Cursor、Antigravity、Pi、OpenCode 和 Claude。"
---

## ds-harness-remote 是做什么的？

ds-harness-remote 让你在别的设备上继续使用工作电脑里的 DeepSeek Harness。手机、浏览器或者另一台电脑连到这台被称为 Host 的机器上，看到的是同一批会话和工作区。

Harness 本身一直在 Host 上运行，工具、项目配置和权限流程都留在那台电脑上。客户端切换到 Host 的原生 Harness API，所以在另一台 DSH 桌面版里打开远程工作区时，用的还是平时的 Harness 界面，而不是另做的一套聊天页面。README 写明目前支持的宿主是 DSH 桌面版，dsh-TUI 的接入列在计划中。

默认情况下，插件用项目方托管在 dsh.r2049.cn 的服务器来协调连接。仓库里也有一个可以自建的精简服务端，但不包含完整的托管网页客户端。

## 核心功能

- **多种客户端**：支持 DSH 桌面版里的 Remote 侧栏、网页、Android 应用，以及第三方的 DSH Go。iOS 版还在 TestFlight 测试阶段。
- **Host 只出站**：Host 不需要公网 IP，也不监听端口。连接优先走局域网和 P2P，其次是 TURN，最后才是中继。
- **端到端加密**：会话流量在客户端和 Host 之间加密，服务器只转发密文。
- **文件、终端与预览**：侧栏里可以浏览工作区文件、只读预览、打开远程终端，以及查看经过授权的本地开发服务预览。终端以 Host 用户的身份运行，默认开启。
- **给智能体用的远程工具**：可选的 `remote_*` 会话工具，让智能体能发现 Host 和工作区、管理会话、读取历史、传输经过授权的文件。
- **多端同时连接**：多个客户端可以同时连到一台 Host，各连接的 RPC 调用和数据流互相隔离。

## 怎么使用 ds-harness-remote

1. 在 DeepSeek Harness 桌面版里打开“扩展 / 插件管理”，选择从 npm 安装并输入包名，装完重启桌面版。README 还给了一条针对其固定版本的启动器命令：

```console
dsh plugin --profile desktop add -w ds-harness-remote@0.6.4
```

2. 从 Harness 侧栏打开 **Remote**。
3. 用知乎、GitHub 或 Google 授权登录，也可以用账号密码登录。注册账号需要邀请码，要向仓库作者申请。
4. 在另一台设备上，要么安装同一个插件并登录，要么直接用 https://dsh.r2049.cn 的网页端、Android 应用或 DSH Go，这几种都不用装插件。
5. 选一台在线的 Host，再选择已有的工作区，或者浏览远程目录打开一个新的。
