---
title: "dsh-desktop：DSH 桌面与手机连接"
description: "dsh-desktop 是一个通过随包 DSH 插件提供桌面增强的非官方客户端，支持手机连接并共享命令行会话。了解安装方法、远程连接配置和启动报错排查。"
summary: "把 dsh web 放进原生桌面窗口，用快捷键提问、从托盘切换工作区，也能让手机继续电脑上的会话。内置插件面板与启动恢复入口。"
highlights:
  - "局域网手机扫码连接"
  - "Tailscale 远程连接"
  - "Cloudflare 域名访问"
  - "快捷提问与工作区直达"
  - "插件故障安全启动"
faq:
  - q: "dsh-desktop 怎么安装，需要 npm 命令吗？"
    a: "README 提供的是桌面安装包方式：从官网或 Releases 下载对应系统的版本，安装后打开。没有可用的 Node 时，运行环境面板可一键安装 Node 24；文档未提供桌面客户端的 npm 包名或 DSH 安装命令。"
  - q: "dsh-desktop 手机不在同一个 Wi-Fi 怎么连接？"
    a: "可以选择 Tailscale，README 明确支持在外面使用蜂窝网络连接。也可以用自己的域名选择 Cloudflare，它是文档所列三种通道中唯一带 HTTPS 的方式。"
  - q: "dsh-desktop 和命令行的会话互通吗？"
    a: "会话、凭证和配置都保存在 DSH_HOME，默认是 ~/.dsh。桌面端与命令行使用相同目录时，访问的是同一份数据。"
  - q: "dsh-desktop 装插件后卡在加载页怎么办？"
    a: "选择加载页的「不加载插件启动」，暂时移除用户安装的插件层，dsh 自带插件保留。进入自动打开的面板卸载问题插件后，再从菜单执行「重新加载插件」。"
  - q: "dsh-desktop 支持 Windows、macOS 和 Linux 吗？"
    a: "支持，分别提供 .exe、.dmg，以及 .deb 和 .AppImage；macOS 安装包同时支持 Apple Silicon 与 Intel。Windows 缺少 WebView2 时会引导安装，Linux 的 .AppImage 因自带 WebKit 而体积更大。"
---

## dsh-desktop 是做什么的？

dsh-desktop 是一个通过随包 DSH 插件提供桌面增强的非官方客户端，将 `dsh web` 放进原生窗口，适合想减少终端操作、从托盘管理任务或用手机继续会话的用户。启动后自动拉起本地服务并选择空闲回环端口，无需手动维护端口。

会话、凭证和配置统一保存在 `DSH_HOME`，默认目录为 `~/.dsh`，与命令行共用。项目基于 Tauri v2 和系统 WebView，桌面能力由 DeepSeek Harness 插件提供，不修改 dsh 源码；它与 DeepSeek 官方没有隶属关系。

## dsh-desktop 核心功能

- **手机连接**：同一 Wi-Fi 可选局域网，外出可用 Tailscale，也能通过自己的域名使用 Cloudflare。后者是三种通道中唯一带 HTTPS 的方式，闲置 30 分钟后自动关闭。
- **设备配对**：手机扫码后，电脑端需手动批准。配对码五分钟内有效且仅能使用一次，配对保持三十天；支持单独断开设备，或全部断开并更换密钥。
- **快速提问**：默认按 `Ctrl+Alt+Space`，macOS 按 `Ctrl+Option+Q` 打开提问框，可选择工作区、已有会话或模型。设置卡片支持自定义快捷键。
- **工作区直达**：通过 `dsh-desktop <路径>`、文件夹右键菜单或 `dsh-desktop://open?path=` 协议进入工作区。托盘列出最近工作区与活动会话，Windows 另有任务栏跳转列表。
- **插件管理与恢复**：可视化面板提供 DSH Market 入口，也能用系统文件选择器安装本地插件。插件导致启动失败时，可通过安全启动进入面板处理。

## 怎么安装和使用 dsh-desktop？

README 未提供桌面客户端的 DSH 安装命令，也未确认 npm 包名。请从官网 `https://dsh-desktop.cc.cd/` 或仓库 Releases 下载系统安装包。

1. Windows 使用 `.exe`，macOS 使用 `.dmg`，Linux 可选 `.deb` 或 `.AppImage`。macOS 提供兼容 Apple Silicon 与 Intel 的通用二进制。
2. 安装后打开应用，按提示完成运行环境设置。dsh 要求 Node.js 22.19.0 或更高；缺少可用版本时，面板可安装 Node 24。安装包不含 Node 与 dsh，首次补齐组件需要联网。
3. 在主窗口或快速提问框中使用会话。蓝色角标表示忙碌，橙色表示等待响应；关闭窗口会收进托盘，真正结束程序需选择「退出 dsh」。
4. 从菜单打开「手机连接…」，选择通道、扫码，再在电脑上批准。手机通过浏览器使用，无需另装 App。
5. 在设置中调整快捷键与任务期间防休眠选项。主题和语言跟随 dsh 设置，切换无需重启。环境变量 `DSH_HOME` 指定数据目录；`DSH_BIN` 可指定可执行文件绝对路径，优先级最高，并跳过 Node 版本检查。

## dsh-desktop 报错怎么排查？

- 安装插件后卡住：选择「不加载插件启动」，卸载问题插件后再执行「重新加载插件」。安全启动保留 dsh 自带插件。
- macOS 首次打开被拦截：在访达中右键应用并选择「打开」，也可按文档执行 `xattr -dr com.apple.quarantine /Applications/dsh-desktop.app`。
- `github:` 插件构建被拦截：按面板提示，在 `$DSH_HOME/profiles/web/pnpm-workspace.yaml` 的 `allowBuilds` 中放行对应构建脚本。
- 运行环境缺失：核对 Node 版本，完成运行环境面板的安装步骤；Windows 出现 WebView2 提示时，按引导补齐组件。
- 其他异常：确认 profile 名和数据目录是否符合预期，重启 DSH，并查看版本与日志，再整理问题反馈。
