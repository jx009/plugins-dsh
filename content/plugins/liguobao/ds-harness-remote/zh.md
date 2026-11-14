---
title: "ds-harness-remote：DSH 远程访问插件"
description: "ds-harness-remote 是一个通过端到端加密的 P2P 连接，从手机、浏览器或另一台电脑访问本机 DeepSeek Harness 的 DSH 插件。了解安装和连接问题排查。"
summary: "面向 DeepSeek Harness 桌面端的远程访问插件。运行 Harness 的电脑作为 Host，网页、安卓和其他 DSH 客户端都能连上，Host 不需要公网 IP，也不用开端口。"
highlights:
  - "网页、安卓和 iOS 客户端"
  - "无需公网 IP 和开放端口"
  - "端到端加密会话"
  - "远程文件、终端和预览"
  - "通过 ACP 打开 Codex、Claude Code 工作区"
faq:
  - q: "ds-harness-remote 怎么安装到 DeepSeek Harness？"
    a: "在 DSH 桌面端打开插件管理，选择从 npm 安装，填入 `ds-harness-remote@0.6.5`；或者运行 `dsh plugin --profile desktop add -w ds-harness-remote@0.6.5`。装完重启桌面端。"
  - q: "ds-harness-remote 需要公网 IP 或端口转发吗？"
    a: "不需要。Host 只发起出站连接，连接方式按局域网、P2P、TURN、加密 WebSocket 中继的顺序尝试。"
  - q: "ds-harness-remote 的服务器能看到我的对话吗？"
    a: "看不到。会话流量在客户端和 Host 之间端到端加密，服务器只转发密文。它能看到账号、设备、在线状态等控制信息，看不到提示词、工具输出、路径和文件内容。"
  - q: "ds-harness-remote 支持哪些 DSH 版本？"
    a: "当前基线是 `dsh-v0.2.2-rc.1`，`0.2.1-rc.5` 和 `0.2.0` 的 rc.1、rc.2 仍然兼容。对 Harness `0.1.1-rc.2` 的支持已经移除。"
  - q: "ds-harness-remote 能打开 Codex、Cursor 或 Claude Code 的工作区吗？"
    a: "能，通过实验性的 ACP 工作区。Host 在本地运行 Codex、Cursor、OpenCode、Claude 等支持 ACP 的 Agent，并转发提示词、流式回复和审批。"
  - q: "ds-harness-remote 的服务端能自己部署吗？"
    a: "能。仓库里有一个最小服务端，包含局域网、P2P、TURN 协调和加密中继。TURN 需要自己部署 coturn，完整的托管网页客户端不在其中。"
---

## ds-harness-remote 是做什么的？

ds-harness-remote 是一个让你在别的设备上继续使用工作电脑里 DeepSeek Harness 的 DSH 插件。手机、浏览器或另一台电脑连到这台电脑（称为 Host），就能看到你离开工位时的那些会话和工作区。

Harness 继续在 Host 上运行，用的还是原来的工具、项目配置和权限流程。客户端直接调用 Host 上的原生 Harness 接口，所以远程打开的工作区还是熟悉的 Harness 界面，而不是另一个聊天应用。Host 不需要公网 IP，也不监听任何端口；连接从 Host 向外发起，并且端到端加密。

插件默认通过项目托管的服务器 `dsh.r2049.cn` 协调连接，仓库里也提供了可以自己部署的最小服务端。

## ds-harness-remote 核心功能

- **多种客户端**：DSH 桌面端里的 Remote 侧栏、网页版、原生安卓应用、TestFlight 测试中的 iOS 版，以及第三方的 DSH Go。
- **Host 只出站**：不用做端口转发。优先走局域网和 P2P，其次 TURN，最后是加密的 WebSocket 中继。
- **端到端加密**：客户端和 Host 之间用 Noise 协议加密，服务器只转发密文。
- **文件、终端和预览**：浏览工作区文件并只读预览，使用远程终端，打开经过授权的本地开发服务预览。
- **Agent 工具**：可选的 `remote_*` 会话工具，让 Agent 能发现 Host 和工作区、管理会话、读取历史、传输授权文件。
- **ACP 工作区**：实验性支持在 Host 上运行 Codex、Cursor、OpenCode、Claude 等支持 ACP 的 Agent。
- **多端同时连接**：多台设备可以同时连同一个 Host，各自的调用和数据流相互隔离。

## 怎么安装和使用 ds-harness-remote？

1. 在 Host 电脑上打开 DSH 桌面端的插件管理，选择从 npm 安装，填入 `ds-harness-remote@0.6.5`。也可以运行：

   ```bash
   dsh plugin --profile desktop add -w ds-harness-remote@0.6.5
   ```

2. 重启 DSH 桌面端。
3. 在 Harness 侧栏打开 **Remote**，用知乎、GitHub、Google 授权登录，或者用账号密码登录。注册账号需要邀请码，可以发邮件向作者申请。
4. 在另一台设备上，要么装同一个插件并登录，要么直接打开 Remote 网页版、安卓应用、iOS 或 DSH Go。
5. 选择一个在线的 Host，再选已有的工作区，或者浏览远程目录打开一个。

DSH 0.2.2 及以上，通过 npm 安装的插件可以在插件管理里检查和更新版本。Linux 用户可以登录 `dsh.r2049.cn`，拿到授权码后一条命令安装。

## ds-harness-remote 报错怎么排查？

- **Host 不显示在线**：确认 Host 上装了插件并已登录、装完重启过 DSH 桌面端，并且两台设备登录的是同一个账号。
- **在旧版 DSH 上出错**：对照兼容基线 `dsh-v0.2.2-rc.1` 检查 Harness 版本，`0.1.1-rc.2` 已经不再支持。
- **插件管理里不能在线更新**：只有从 npm 安装的才支持在线更新。从 GitHub 或本地链接装的，要先改用 npm 重新安装。
- **连接慢或经常断**：局域网和 P2P 都连不上时会走 TURN 或中继，延迟会变高。在 Host 的「插件 → Remote 设置」里打开调试日志，在日志中搜索 `[ds-harness-remote]`，桌面端看 `desktop.log`。
- **安卓应用连不上**：先复现问题，再在「设置 → 诊断 → 导出连接日志」保存日志文件。文件里不含凭据和对话内容，可以直接附到 issue 里。

另外提醒：远程终端以 Host 用户身份运行，并且默认开启。用不到的话，在 Host 上关掉 `terminal.enabled`。
