---
title: "Agents-Anywhere：跨设备管理 DSH 会话"
description: "Agents-Anywhere 是一个跨设备管理会话的 DSH 集成。了解客户端安装、DSH Runtime 配置、远程审批和设备连接报错排查。"
summary: "把工作电脑上的 Agent 会话带到手机、平板或浏览器。离开电脑后仍能查看任务进度、回复输入请求，任务继续在原工作设备上执行。"
highlights:
  - "跨设备管理 DSH 会话"
  - "时间线查看任务进度"
  - "远程回复工具审批"
  - "工作区文件与终端"
  - "Docker 自托管"
faq:
  - q: "Agents-Anywhere 是用 npm 安装的 DeepSeek Harness 插件吗？"
    a: "项目文档介绍的是独立工作台和 DSH 集成，没有提供 DSH 插件安装命令。接入时需要准备桌面客户端或 Connector CLI，并参考 DSH Bridge Next 文档配置。"
  - q: "Agents-Anywhere 支持 Windows 和 Linux 吗？"
    a: "Windows 提供内置本机 Connector 的 x64 客户端，README 提醒当前安装包未做代码签名。Linux 和无图形界面的服务器可以运行 Connector CLI，再从其他客户端访问。"
  - q: "用手机操作 Agents-Anywhere，需要把 DSH 工作区迁到手机上吗？"
    a: "不需要，手机用于查看会话和发送操作。DeepSeek Harness 仍在连接的工作设备上运行，使用那台机器的工作区和权限。"
  - q: "Agents-Anywhere 除了 DSH，还能接入 Codex 和 Claude Code 吗？"
    a: "可以，工作台支持这三种 Agent。可选模型、权限和操作以对应 Runtime 在客户端提供的能力为准。"
  - q: "Agents-Anywhere 怎么用 Docker 自托管？"
    a: "仓库提供 Docker Compose 部署方案，其中包含应用服务、PostgreSQL、Redis 和迁移任务。首次启动后，从服务端日志获取 setup token，用它完成首位管理员的设置。"
---

## Agents-Anywhere 是做什么的？

Agents-Anywhere 是一个跨设备管理会话的开源 DSH 集成，形态是独立工作台，并不是装进 Harness 的 DSH 插件。它适合在工作电脑上运行 DeepSeek Harness、但不总坐在电脑前的开发者：换到手机或浏览器后，可以打开同一会话，查看任务进度，或回复正在等待处理的请求。

访问会话的设备不负责执行任务。Agent 在运行 Connector 的工作设备上使用本机工作区和权限，手机、平板和 Web 只是访问入口。工作台也能连接 Codex 和 Claude Code；负责运行和连接 Agent 的组件叫 Runtime，不同 Runtime 在客户端提供的操作可能不同。

## Agents-Anywhere 核心功能

- **会话管理与时间线**：按设备、项目和会话找到正在进行的任务，再打开时间线（Timeline）查看运行进度。手边没有工作电脑时，也可以先确认任务是否需要人工处理。
- **工具审批与输入请求**：在客户端处理 Agent 发来的工具审批，或回复它需要补充的信息。能否打断或继续任务，以当前 Runtime 提供的操作为准。
- **文件预览与远程终端**：浏览工作区文件、预览内容、上传或下载附件，也可以打开交互式终端。这里操作的是连接设备上的工作区，不是当前手机或浏览器所在设备的本地目录。
- **Cloud 与 Docker 自托管**：既可登录托管服务，也可把客户端连接到自己的实例。Agent 在工作设备执行，并不意味着数据只留在本机；会话内容、时间线和上传附件等数据会视功能经过服务端或存储在那里。

## 怎么安装和使用 Agents-Anywhere？

README 没有给出 DeepSeek Harness 插件安装命令。首次接入时，先准备实际运行 Agent 的工作设备，再用其他客户端访问它。

1. 在 macOS 或 Windows 工作设备上，从项目下载入口安装桌面客户端。桌面版已集成本机 Connector。Linux 或无图形界面的服务器则按 `connector/README.md` 运行 Connector CLI。
2. 在客户端登录 Cloud，或者填写自托管服务地址。需要核对首次登录和设备配对流程时，查看 `docs/getting-started.md`；自托管服务的部署说明在 `docker/README.md`，首次设置管理员所需的 token 可从服务端日志获取。
3. 在工作设备上按 `dsh-bridge-next/README.md` 接入 DeepSeek Harness，准备 Runtime、Agent 账号和工作目录，再创建或打开一个会话。模型与权限选项以客户端为当前 Runtime 显示的内容为准。
4. 换到手机、平板或另一台电脑，登录同一服务和账号，再选择设备、项目和会话。使用 Cloud 时也可以打开 `web.agents-anywhere.com`。先确认能看到会话进度，再按会话提示处理审批或输入请求。

## Agents-Anywhere 报错怎么排查？

- **换设备后找不到会话或工作设备**：先核对两个客户端是否登录了同一服务和同一账号，再检查工作设备是否开机联网、本机 Connector 和 DSH Runtime 是否正常运行。登录或配对问题可对照 `docs/getting-started.md` 排查。
- **找不到打断、继续或权限选项**：先确认会话用的是哪个 Runtime，再检查客户端实际显示的控制项。不要按另一种 Agent 的界面判断当前会话是否配置成功。
- **应用内更新不生效**：README 说明 2.0.3 及更早版本需要手动下载更新。核对已安装版本和发布说明，不要把 `main` 分支中的修复当成已随安装包发布的功能。
- **问题仍能复现**：反馈时写明客户端版本、操作系统、Runtime 类型和复现步骤。附日志前先移除其中的凭据。
