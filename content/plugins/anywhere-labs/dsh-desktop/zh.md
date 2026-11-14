---
title: "dsh-desktop：DSH 桌面客户端，免配置安装"
description: "dsh-desktop 是一个在 Windows、macOS、Linux 上直接运行 DeepSeek Harness 的 DSH 桌面客户端。了解安装方法、插件添加和常见问题排查。"
summary: "社区维护的开源桌面客户端，把 DSH 的本地 Web UI、Host 服务和插件系统装进一个安装包，不需要 Node.js 和命令行配置。"
highlights:
  - "三平台原生安装包"
  - "内置 DSH 插件市场"
  - "手机远程控制"
  - "每个 profile 的首次设置向导"
  - "自动使用系统代理"
faq:
  - q: "dsh-desktop 怎么安装？"
    a: "Windows 安装程序和 macOS 的 DMG 从 dshdesktop.cn 下载，Linux 的 deb、AppImage、tar.gz 从项目的 GitHub Release 下载。安装包已经带上 Node.js、pnpm 和固定版本的 DeepSeek Harness，不需要另外配置环境。"
  - q: "dsh-desktop 里怎么安装 DSH 插件？"
    a: "用内置的插件市场，或者从托盘打开 DSH Terminal，运行 `dsh plugin add`、`dsh plugin remove`、`dsh plugin update`。命令默认作用于当前激活的 profile，插件变更后要重启应用。"
  - q: "dsh-desktop 是 DeepSeek 官方出品吗？"
    a: "不是。README 写明它是独立的社区项目，与 DeepSeek 没有隶属或授权关系。它原样运行一个固定版本的上游 DeepSeek Harness，桌面外壳以插件形式接入。"
  - q: "dsh-desktop 会走系统代理吗？"
    a: "会。启动时读取操作系统的代理设置（包括 PAC 自动配置），用于模型对话、联网搜索、MCP 和插件安装。手动设置的 `HTTPS_PROXY` 等环境变量优先，只有 SOCKS 的代理配置用不了。"
  - q: "局域网里的其他设备能打开 dsh-desktop 吗？"
    a: "默认不能，Web 服务只监听本机回环地址。局域网访问是单独的可选设置，README 特别提醒它没有鉴权，同一网络里的任何人都能操作你的电脑。"
  - q: "Linux 版 dsh-desktop 怎么更新？"
    a: "Linux 版不能在应用内安装更新。应用会提示有新版本并打开发布页，下载与当前相同格式的安装包：deb 用 `sudo apt install` 覆盖安装，AppImage 直接替换旧文件。"
---

## dsh-desktop 是做什么的？

dsh-desktop 是一个把 DeepSeek Harness 做成原生应用的 DSH 桌面客户端，支持 Windows、macOS 和 Linux。它会自动启动和管理本地的 Harness 服务，提供窗口、系统托盘和终端，第一次对话前不需要安装 Node.js，也不用敲命令。

项目由社区维护，README 明确说明与 DeepSeek 没有隶属关系。它不改上游代码：固定版本的 DeepSeek Harness 原样运行，桌面相关的部分通过 Harness 自带的插件机制接入。所以桌面外壳本身也是一个 DSH 插件，和这个上游版本兼容的其他插件都能照常使用。

dsh-desktop 以安装包的形式发布，不是用 `dsh plugin add` 装的插件。下载、安装，它就自带了一份 DSH。

## dsh-desktop 核心功能

- **原生安装包**：Windows x64 用 NSIS 安装程序，macOS 是同时支持 Intel 和 Apple Silicon 的 DMG，Linux 的 x64 和 arm64 各有 deb、AppImage、tar.gz 三种格式。
- **插件市场**：内置 DSH Community Market，负责插件的发现、详情、安装和管理，任何符合公开 Schema 的数据源都能接入。
- **手机远程控制**：2.0.9 起内置，可以从 iOS 或 Android 发起任务、查看 Agent 进度，需要时继续跟进。
- **首次设置向导**：每个 profile 第一次启动时，会弹出原生向导，设置窗口模式、插件市场、通知、是否用浏览器打开，以及 Web 访问范围，也可以跳过。
- **系统代理**：启动时读取操作系统的代理设置，模型对话、联网搜索、MCP 服务和插件安装都会走它。
- **默认只开放本机**：不打开局域网访问时，Web 服务只能从你自己的电脑访问。

## 怎么安装和使用 dsh-desktop？

1. 下载对应系统的安装包：Windows 和 macOS 从 `https://dshdesktop.cn` 下载，Linux 从项目的 GitHub Release 下载。
2. Windows 运行安装程序；macOS 打开 DMG，把 DSH Desktop 拖进「应用程序」。
3. Debian、Ubuntu 及其衍生发行版安装 deb，之后从应用菜单启动：

   ```bash
   sudo apt install ./DSH-NEXT-<version>-amd64.deb
   ```

4. 其他发行版给 AppImage 加上执行权限后直接运行：

   ```bash
   chmod +x DSH-NEXT-<version>-x86_64.AppImage
   ```

5. 首次启动时完成设置向导，或者直接跳过。
6. 在内置插件市场里装插件，或者从托盘打开 DSH Terminal，运行 `dsh plugin add <包名>`。添加或删除插件后重启应用。

README 建议 Ubuntu 24.04 及以上使用 deb，因为它会安装 Chromium 沙箱需要的 AppArmor 配置。每个发布页都有 `SHA256SUMS.txt` 用来核验下载文件；arm64 的文件名以 `-arm64.deb`、`-arm64.AppImage` 结尾。

## dsh-desktop 报错怎么排查？

- **装好的插件不显示**：插件命令作用于当前激活的 profile，每个 profile 的插件互相独立。先确认激活的是哪个 profile，或者用 `--profile <名字>` 显式指定，然后重启 dsh-desktop。
- **挂代理时模型调用或插件安装失败**：代理设置只在启动时读取一次，开关系统代理或切换节点后要重启应用。代理客户端只开了 SOCKS 的话，打开它的 HTTP 端口或混合端口。手动设置的 `HTTPS_PROXY` 等环境变量会覆盖系统设置。
- **Ubuntu 24.04 上打不开**：改用 deb 安装，不要用 AppImage 或 tar.gz。deb 会补上 Chromium 沙箱需要的 AppArmor 配置。
- **Linux 提示有更新却装不上**：Linux 版不支持应用内更新，去发布页下载同格式的安装包手动更新。
- **局域网里的其他设备连不上**：Web 服务默认只监听本机。局域网访问是单独的可选设置，而且没有鉴权，只在完全信任的网络里开启。

反馈问题时，请附上应用版本、操作系统和安装包格式，以及当时使用的 profile。
