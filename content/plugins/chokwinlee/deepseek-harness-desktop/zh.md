---
title: "deepseek-harness-desktop：DSH 桌面遥控"
description: "deepseek-harness-desktop 是一个提供桌面宿主与手机遥控的 DSH 插件生态项目。了解安装方法、Wi-Fi 配对、Tailscale 配置与常见问题排查。"
summary: "将 Harness 界面与运行时装进桌面应用，无需单独安装 Node.js。通过 iPhone 或 Android 继续会话、处理审批，任务仍在电脑上执行。"
highlights:
  - "内置 Harness 运行时"
  - "原生手机遥控"
  - "Wi-Fi 与 Tailscale 配对"
  - "多模态图片会话"
  - "macOS 用量与费用估算"
faq:
  - q: "deepseek-harness-desktop 怎么安装，需要 Node.js 吗？"
    a: "从仓库的 GitHub Releases 下载并安装桌面应用即可。它已包含 Harness 运行时并自动管理进程，无需另装 Node.js，也无需手动运行 `dsh web`。"
  - q: "deepseek-harness-desktop 怎么连接 iPhone？"
    a: "在 iOS 17 或更新版本上通过 TestFlight 安装 DSH Remote 测试版。随后在桌面端打开 Settings → General → Mobile Remote → Connect phone，在可信 Wi-Fi 下开始配对并用手机扫码。"
  - q: "deepseek-harness-desktop 支持 Android 遥控吗？"
    a: "支持，README 提供适用于 Android 8.0 及以上版本的签名 APK。文档示例使用 `v0.5.0` 的桌面包和对应 APK，当前所给说明中尚无 Google Play 版本。"
  - q: "deepseek-harness-desktop 手机遥控必须用 Tailscale 吗？"
    a: "同一可信 Wi-Fi 下配对不需要 Tailscale 账号。跨网络访问时，两台设备需加入你自己的 tailnet，并使用私有 Tailscale Serve HTTPS 入口，README 明确要求不要使用 Funnel。"
  - q: "deepseek-harness-desktop 为什么有些模型没有费用？"
    a: "费用由本地 token 记录与可用的公开模型价格估算得出。未匹配到价格的模型会显示为未定价，不会被当作免费使用。"
---

## deepseek-harness-desktop 是做什么的？

deepseek-harness-desktop 是一个提供桌面宿主与手机遥控能力的 DSH 插件生态项目，将官方 Web UI 和运行时整合到桌面窗口。它适合在电脑上开发、又希望从手机继续会话或处理审批的用户。浏览 DeepSeek Harness 插件市场时，需要注意该项目以桌面应用分发，所给 README 未提供 npm 插件安装命令。

应用自动启动和停止本地运行时，无需另装 Node.js 或手动执行 `dsh web`。这是独立社区项目；底层 Harness 仍处于开发者预览阶段，可能出现破坏性变更。文档对应构建内置 `@deepseek-ai/dsh@0.1.5-rc.2`，侧栏会显示相关版本。

## deepseek-harness-desktop 核心功能

- **内置桌面运行时**：安装应用即可使用 Harness 界面。macOS 采用 Tauri 和系统 WKWebView，包含完整运行时的 DMG 约为 100 MB。
- **原生手机遥控**：iPhone 使用 SwiftUI，Android 使用 Kotlin/Compose。可浏览项目、创建会话、调整任务、处理审批及跟踪子智能体，执行仍留在电脑上。
- **局域网与异地连接**：可信 Wi-Fi 下使用主动启用且带认证的 LAN 入口；异地通过自己的 tailnet 和私有 HTTPS 入口访问，无项目方中继。
- **多模态图片会话**：所选提供商和模型声明支持图片输入时，可粘贴或附加图片。图片消息会保留在会话历史中。
- **macOS 用量统计**：展示当天及七天 token 总量、估算费用、活跃任务数与运行吞吐量。展开后可查看输入、输出和缓存明细，数据来自本地历史。

## 怎么安装和使用 deepseek-harness-desktop？

README 未给出 DSH 安装命令，也未确认 npm 包名，因此这里不生成包安装命令。请从仓库的 GitHub Releases 获取桌面应用。

1. 安装适合电脑的 Desktop 发布包，启动后核对侧栏中的桌面版与 Harness 版本。
2. 在内置 Web UI 中使用项目和会话。发送图片前，选择声明支持图片输入的提供商与模型。
3. iPhone 需运行 iOS 17 或更新版本。先安装 TestFlight，再通过 README 的公开邀请接受并安装 DSH Remote 测试版。
4. Android 需为 8.0 或更新版本。文档示例安装 `v0.5.0` 桌面包及 `DSH-Remote-Android-v0.5.0.apk`；按提示临时允许安装未知应用，并与同一发布中的 `SHA256SUMS.txt` 核对摘要。
5. 在桌面端进入 `Settings → General → Mobile Remote → Connect phone`，于同一可信 Wi-Fi 下开始配对，用手机扫码。
6. 使用蜂窝网络或其他远程网络时，按内置 Tailscale 指引启用异地访问，扫描 HTTPS 二维码，再打开项目并继续会话。

开发者也可用 Xcode 16 或更新版本打开 `ios/DSHRemote/DSHRemote.xcodeproj`，配置签名后部署到自己的 iPhone。

## deepseek-harness-desktop 报错怎么排查？

配对失败时，先确认连接方式。本地模式检查可信 Wi-Fi 和桌面端 LAN 入口是否启用；异地模式检查两台设备是否加入自己的 tailnet，以及私有 Serve HTTPS 配置是否完成，不要使用 Funnel。

Android 应核对 APK 与桌面构建是否匹配。iPhone 源码安装需检查签名与配置文件；免费 Personal Team 需要定期重新配置，下载未签名或无关的 IPA 无法替代这一流程。

无法发送图片时，检查提供商与模型的图片输入声明。费用缺失可能是没有匹配的公开价格，并不表示免费。其他问题可先重启桌面应用，记录侧栏中的两个版本，再查看可用日志并反馈。
