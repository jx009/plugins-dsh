---
title: "dsh-desktop：DSH 的原生桌面客户端"
description: "dsh-desktop 是 DeepSeek Harness 的开源桌面客户端，支持 Windows、macOS、Linux，内置插件市场和手机远程控制。"
summary: "社区维护的开源桌面客户端，把 DSH 的本地 Web UI、Host 服务和插件系统装进一个安装包，不需要 Node.js 和命令行配置。"
highlights:
  - "三平台安装包"
  - "内置插件市场"
  - "手机远程控制"
  - "首次设置向导"
faq:
  - q: "dsh-desktop 是 DeepSeek 官方出品吗？"
    a: "不是。README 写明它是独立的社区项目，与 DeepSeek 没有隶属或授权关系。它原样运行一个固定版本的上游 DeepSeek Harness，桌面外壳以插件形式接入。"
  - q: "局域网里的其他设备能访问它吗？"
    a: "默认不能，Web 服务只监听本机回环地址。局域网访问要单独开启，README 明确提醒这种方式没有任何认证，同一网络里的人都能打开并操作你的电脑。"
  - q: "Linux 版怎么更新？"
    a: "Linux 版不能在应用内安装更新。有新版本时应用会提示并可打开对应的发布页，需要你下载同一格式的安装包手动更新。"
---

## dsh-desktop 是做什么的？

dsh-desktop 是一个开源桌面客户端，让 DeepSeek Harness 以原生应用的形式运行在 Windows、macOS 和 Linux 上。它替你启动并管理本地的 Harness 服务，开始第一次对话之前不用装 Node.js，也不用在命令行里做配置。

这个项目由社区维护，README 写明与 DeepSeek 没有隶属关系。它不改上游代码：内置的是一个固定版本的 DeepSeek Harness，窗口、托盘、终端、更新和工作档案这些桌面能力，都通过 Harness 自带的插件机制接入。换句话说，桌面外壳本身就是一个 DSH 插件，兼容该上游版本的其他插件可以照常使用。

它以安装包的形式分发，不是用 `dsh plugin` 命令添加的插件包。

## 核心功能

- **原生安装包**：Windows x64 提供 NSIS 安装程序，macOS 提供通用 DMG，Linux x64 和 arm64 提供 deb、AppImage、tar.gz 三种格式。
- **插件市场**：内置 DSH Community Market，可以发现、查看、安装和管理插件；数据源是开放的，符合公开 schema 的来源都能接入。
- **手机远程控制**：用 iOS 或 Android 手机连接桌面端，发起任务、查看 Agent 进度、追加指令，自 2.0.9 起内置。
- **首次设置向导**：每个档案第一次启动时，可以设置窗口模式、插件市场、通知、是否自动打开浏览器和 Web 访问范围，也可以直接跳过。
- **默认仅本机访问**：Web 服务默认只监听回环地址；局域网访问需要单独开启，并且没有认证。

## 怎么使用 dsh-desktop

1. 下载对应系统的安装包：Windows 和 macOS 版在 https://dshdesktop.cn 下载，Linux 版在项目的 GitHub Releases 页面下载。
2. Windows 运行安装程序并按提示操作；macOS 打开 DMG，把 DSH Desktop 拖进“应用程序”。
3. Debian、Ubuntu 及其衍生版安装 deb 包，然后从应用菜单启动：

   ```sh
   sudo apt install ./DSH-NEXT-<version>-amd64.deb
   ```

4. 其他发行版给 AppImage 加上执行权限后直接运行：

   ```sh
   chmod +x DSH-NEXT-<version>-x86_64.AppImage
   ```

5. 首次启动时按向导完成设置，或者跳过。
6. 打开内置的插件市场，挑选并安装需要的插件。

README 建议 Ubuntu 24.04 及以上版本优先用 deb 包，发布页附带 `SHA256SUMS.txt`，可以用来校验下载的文件。arm64 设备对应的文件名以 `-arm64.deb`、`-arm64.AppImage` 结尾。
