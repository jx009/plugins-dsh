---
title: "DeepSeekHarnessDesktop：DSH 桌面启动"
description: "DeepSeekHarnessDesktop 是一个提供桌面启动环境的 DSH 插件，内置 Node 运行时。了解安装方法、DeepSeek API Key 配置和启动报错排查。"
summary: "把 Harness、Node 24 和依赖打包成桌面应用，启动时自动打开后端与 Web 界面。提供 Windows、macOS 和 Linux 产物，无需另装 Node.js 即可运行。"
highlights:
  - "三平台桌面打包"
  - "内置 Node 24"
  - "自动启动后端"
  - "单实例窗口"
  - "卸载保留用户数据"
faq:
  - q: "DeepSeekHarnessDesktop 怎么安装？"
    a: "选择对应系统的桌面产物；Windows 用户运行 DeepSeekHarnessSetup-*.exe，再打开桌面快捷方式。README 没有提供 DSH 插件安装命令，也未确认 npm 包名。"
  - q: "DeepSeekHarnessDesktop 需要安装 Node.js 吗？"
    a: "运行已打包的应用不需要另装 Node.js，产物内置 Node 24。只有本地构建才需要准备 Node.js 22 或更高版本，以及 pnpm 10。"
  - q: "DeepSeekHarnessDesktop 怎么配置 DeepSeek API Key？"
    a: "启动桌面应用后，在首次打开的 Web 界面中设置密钥。后端由桌面程序自动启动，不需要先手动运行服务。"
  - q: "DeepSeekHarnessDesktop 支持 macOS 和 Linux 吗？"
    a: "支持，macOS 提供采用 ad-hoc 签名的 DMG 镜像。Linux 提供解压运行的 tar.gz 压缩包，以及面向 Debian/Ubuntu 的 deb 安装包。"
  - q: "DeepSeekHarnessDesktop 卸载后数据还在吗？"
    a: "README 明确说明卸载后保留用户数据。数据位于 ~/.dsh，与应用安装目录分开存放。"
---

## DeepSeekHarnessDesktop 是做什么的？

DeepSeekHarnessDesktop 是一个提供 Harness 桌面启动环境的 DSH 插件，面向希望直接打开界面、减少运行环境准备工作的用户。项目把 Electron 桌面壳、Node 运行时和完整依赖放进应用产物，启动后自动拉起后端并打开 Web UI。它实际以桌面应用形式分发，安装时应选择对应系统的产物。

如果你在寻找 DeepSeek Harness 插件中的桌面入口，这个项目提供了明确的使用路径：安装或解压应用，启动窗口，再在界面配置密钥。运行打包产物无需单独安装 Node.js；本地构建则有额外环境要求。

## DeepSeekHarnessDesktop 核心功能

- **内置 Node 24**：应用携带运行时和 Harness 依赖，依赖中的链接会在构建时物化为真实文件，形成完整运行环境。
- **自动启动后端**：打开应用后进入 Web 界面，服务监听 `http://127.0.0.1:3080`。关闭窗口也会停止服务。
- **三平台产物**：Windows 提供安装包和免安装版，macOS 提供采用 ad-hoc 签名的 DMG，Linux 提供压缩包与 Debian/Ubuntu 安装包。
- **桌面窗口控制**：无边框窗口右上角内嵌最小化、最大化和关闭按钮。单实例机制避免重复启动多个后端。
- **用户数据独立保存**：数据存放在 `~/.dsh`，与安装目录分离。README 说明卸载应用后仍会保留这些数据。

## 怎么安装和使用 DeepSeekHarnessDesktop？

README 未提供 DSH 安装命令，也没有确认 npm 包名，因此这里不生成插件安装命令。请使用桌面产物完成安装。

1. 选择与你的操作系统、架构匹配的产物。项目通过 GitHub Actions 构建三平台应用，推送 `v*` 标签时发布到 Release。
2. Windows 用户运行 `DeepSeekHarnessSetup-*.exe`。安装无需管理员权限，默认位置为 `%LocalAppData%\Programs\DeepSeek Harness`，并自动创建桌面快捷方式。免安装产物可直接运行 `build/DeepSeekHarnessApp/DeepSeekHarness.exe`。
3. macOS 用户选择对应的 `DeepSeekHarness-macOS-<arch>-<ver>.dmg`。Linux 用户可解压 `tar.gz` 后运行，或选择适用于 Debian/Ubuntu 的 `deb` 包。
4. 打开应用；Windows 用户可双击桌面图标。等待后端启动并显示 Web 界面。
5. 首次使用时，在 Web 界面设置 DeepSeek API Key。使用服务期间保持窗口打开。

需要自行构建时，准备 Node.js 22 或更高版本和 pnpm 10。构建流程依次准备 Harness、物化链接、精简文件、下载内置运行时并组装应用；相关脚本在 `build/`，桌面源码在 `app/`。

## DeepSeekHarnessDesktop 报错怎么排查？

- **本地依赖构建异常**：先检查 pnpm 主版本。项目要求使用 10，因为 11 移除了构建流程依赖的 hoisted linker。
- **Windows 打包工具路径不符**：前置要求写的是 Inno Setup 7，示例命令却引用版本 6 的目录。执行前确认本机编译器位置，再对应调整命令路径。
- **关窗后服务不可用**：这是 README 说明的行为，重新打开桌面应用即可再次启动后端。
- **其他启动问题**：先重启应用，核对版本并查看可用日志；涉及 Harness 配置时，再确认 profile 名和相关插件是否启用。当前材料没有给出专用错误码或日志路径，不宜据此推断具体故障原因。
