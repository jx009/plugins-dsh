---
title: "Minke：DSH 桌面工作区与远程访问"
description: "Minke 是一个基于 DeepSeek Harness 的桌面工作区，整合会话、文件、终端与共享浏览器。了解安装方法、Tailscale 远程访问配置和 macOS 报错排查。"
summary: "在同一桌面工作区处理会话、编辑文件、运行终端并观察智能体操作浏览器，也可通过手机上的 Web 或 PWA 继续任务。会话与设置保存在本机。"
highlights:
  - "共享浏览器控制"
  - "文件与终端分屏"
  - "手机远程访问"
  - "Ollama 模型发现"
  - "原生插件管理"
faq:
  - q: "Minke 怎么安装到 DSH？"
    a: "Minke 是桌面应用，应从 lencx/Minke 官方 GitHub Releases 下载对应系统和架构的安装包。所提供的 README 没有 DSH 插件安装命令，也没有可确认的 npm 包名。"
  - q: "Minke 支持 Windows 和 Linux 吗？"
    a: "支持，Windows 提供 x64 EXE，Linux 提供 x64 DEB、RPM 和 AppImage。macOS 则分别提供 Apple Silicon 与 Intel 版本。"
  - q: "Minke 怎么在手机上使用？"
    a: "让手机与运行 Minke 的电脑加入同一 Tailscale 网络，再在 Connections → Device access → Remote access 启用 HTTPS Serve。手机打开显示的 HTTPS 地址即可使用远程工作区，其中的终端实际运行在电脑上。"
  - q: "Minke 能用 Ollama 和 LM Studio 吗？"
    a: "可以发现这两类服务中的本地模型，并可选择启动本地服务。它也支持云端提供商和自定义端点，不限于本地模型。"
  - q: "Minke 为什么要求 macOS 钥匙串授权？"
    a: "这是凭据存储授权，仅在 Connections 中点击 Authorize credential access 后发起。拒绝后可点击 Request authorization again；持续失败时，应用签名无效或被修改是可能原因之一。"
---

## Minke 是做什么的？

Minke 是一个基于 DeepSeek Harness 的本地优先桌面智能体工作区。它把会话、文件、终端和共享浏览器放在一起，让开发者在同一界面处理任务，会话与设置保存在本机。它提供 DSH 插件管理，但本身是桌面应用，不应当作已有 npm 安装命令的插件包。

这是独立社区项目，支持 macOS、Windows 和 Linux，仍在积极开发，发布包可能与当前源码不同。本地优先也不等于只用本地模型：工作区同样支持云端提供商。

## Minke 核心功能

- **共享浏览器控制**：在可见标签页中观察智能体操作，随时接管，并把带注释的页面上下文送回会话。
- **文件与终端分屏**：用分屏和底部面板组织会话、文件与终端，就地编辑文件、预览文档和检查改动。
- **远程 Web 与 PWA**：通过 Minke Host 支持的响应式客户端继续任务、管理文件。它不是桌面画面投屏，远程终端仍运行在宿主电脑上。
- **云端与本地模型**：支持自定义端点，发现 LM Studio 和 Ollama 模型，也可选择启动本地服务。
- **智能体与插件扩展**：使用预设、技能、子智能体和定时任务，通过原生管理界面扩展 DeepSeek Harness 插件；还可从微信、Telegram 和 Discord 发起任务。

## 怎么安装和使用 Minke？

README 未提供 DSH 安装命令，也没有确认的 npm 包名，因此不生成插件安装命令。请从官方发布页下载安装包：`https://github.com/lencx/Minke/releases`。

1. 按平台选包：macOS 提供 arm64、x64 DMG；Windows 提供 x64 EXE；Linux 提供 x64 DEB、RPM、AppImage。发布页的 `SHA256SUMS` 可用于核对校验和。
2. macOS 打开 DMG，将 `Minke.app` 拖入 Applications 后启动。在 Connections 点击 Authorize credential access 授权凭据存储；系统提示时输入 Mac 登录密码并选择 Always Allow。
3. 在工作区处理会话、编辑文件和运行终端，按需使用云端或本地模型。所给节选没有列出模型配置字段，不应据此猜测参数。
4. 推荐用 Tailscale Serve 远程访问：电脑与手机安装 Tailscale 并加入同一网络。在 Connections → Device access → Remote access 选择 HTTPS Serve，启用后用手机打开显示的 `https://…ts.net` 地址，无需重启。
5. 安装 PWA 时，打开 Tailscale Serve 或 Cloudflare Access 的 HTTPS 地址，选择侧栏 Install Minke。iPhone、iPad 使用“分享 → 添加到主屏幕”。

一次只能启用一条远程路由，退出应用会停止代理。远程用户能调用已授权的本地工具，因此仅向可信身份开放。Cloudflare Access 需要预先配置 Tunnel、Access 应用及明确的允许策略。

## Minke 报错怎么排查？

- **macOS 阻止启动**：当前预发布构建未公证，先在“系统设置 → 隐私与安全性”使用“仍要打开”。移除隔离属性会绕过安全检查，只能作为针对官方应用的最后手段。
- **凭据授权失败**：点击 Request authorization again。仍不可用时，可用 `codesign --verify --deep --strict --verbose=2 "/Applications/Minke.app"` 检查签名，先确认问题再修改应用。
- **手机无法连接**：确认宿主应用正在运行、远程路由已启用，且两台 Tailscale 设备处于同一网络。Direct IP 使用 HTTP，不属于浏览器安全上下文；PWA 按文档使用 HTTPS 入口。
- **功能与文档不同**：核对发布版本，在 About Minke → Check for updates 手动检查更新。后台下载设置位于 Settings → Minke → Preferences → Software updates，安装更新仍需明确操作。
