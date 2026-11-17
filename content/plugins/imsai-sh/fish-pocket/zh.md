---
title: "fish-pocket：在 iPhone 上运行 DSH"
description: "fish-pocket 是一个支持本机运行引擎的 DSH 插件配套移动应用，适配 iPhone 和 iPad。了解安装方法、本机能力配置、插件兼容性与常见问题排查。"
summary: "把 DSH 引擎、原生对话界面和插件商店放进 iPhone 与 iPad，不必为本机会话另开电脑或服务器。还可按需开启系统日历、提醒事项、Bot 模式和远程会话管理。"
highlights:
  - "本机运行 DSH 引擎"
  - "内置插件商店"
  - "日历与提醒事项"
  - "Bot 独立记忆"
  - "远程会话审批"
faq:
  - q: "fish-pocket 怎么安装到 iPhone 和 iPad？"
    a: "设备需要 iOS 17 或更高版本，可从 App Store 下载，或加入 TestFlight 公测。它是独立移动应用，不是通过 DSH 插件命令安装的 npm 包。"
  - q: "fish-pocket 不连服务器就能离线用吗？"
    a: "本机会话的引擎在 App 内运行，不需要电脑或单独部署的 Harness 服务器。模型调用仍需联网，并使用支持的账号、API Key 或应用内购买额度。"
  - q: "fish-pocket 能安装 DeepSeek Harness 插件吗？"
    a: "可以在内置商店搜索并安装，也能添加可信的索引源，或从 npm 安装纯 JavaScript 插件。README 的兼容性结果来自抽样测试，不能据此认定所有插件都无需调整。"
  - q: "fish-pocket 为什么装不了 numpy 和 pandas？"
    a: "内置 Python 支持纯 Python 包和虚拟环境。目前不支持需要编译扩展的包，numpy、pandas 属于这一限制范围。"
  - q: "fish-pocket 操控手机需要电脑吗？"
    a: "普通本机使用不需要，但可选的 iCTRL 首次设置要用一次电脑。该功能还要求 iOS 17.4 或更高版本、开启开发者模式并侧载第三方 iCTRL 应用。"
---

## fish-pocket 是做什么的？

fish-pocket 是一个支持本机运行引擎的 DSH 插件配套移动应用。它面向希望在 iPhone、iPad 上使用智能体的开发者，把会话、工具调用、文件操作和审批放进原生界面；产品本身是独立 App，并不是装进 Harness 的扩展包。

引擎在设备内运行，界面由 SwiftUI 实现，本机会话不依赖电脑或另设服务器。会话与工作区保存在设备上，但这不代表模型推理离线进行：模型请求仍需联网，可使用 DeepSeek 账号或 API Key；App Store、TestFlight 版也支持登录 Fish Pocket 账号并使用购买的额度。

## fish-pocket 核心功能

- **本机能力：** 智能体可调用日历、提醒事项、通讯录、健康、照片和地图等系统能力。每项都由用户单独开启，已安装的插件也能使用获准能力。
- **插件商店：** 在手机上搜索、安装 DeepSeek Harness 插件，也能添加信任的索引源，或从 npm 安装纯 JavaScript 扩展。
- **开发工作台：** 终端、文件预览、改动查看和多标签浏览器集中在同一面板。内置 Node、Python、Git、FFmpeg，智能体还可操作网页。
- **Bot 模式：** 每个 Bot 有独立记忆和工作文件夹，支持私聊、群聊与定时任务。GitHub、Notion 等连接器可供普通会话和 Bot 共用。
- **远程会话与平板布局：** 通过 Agents Anywhere 管理电脑上的 Codex、Claude Code 和 DSH 会话；iPad 支持多窗口、拖放文件和外接键盘快捷键。

## 怎么安装和使用 fish-pocket？

README 未提供该应用的 DSH 安装命令，也没有确认 npm 包名，因此不应套用插件安装命令。设备需要 iOS 17 或更高版本，可选择以下渠道：

- App Store：`https://apps.apple.com/app/id6830703602`
- TestFlight：`https://testflight.apple.com/join/2SCftb2M`，适合提前体验新版本。

1. 安装后选择可用的模型访问方式，并保持联网。不要把本机引擎理解成无需模型服务。
2. 在「探索 → 本机能力」开启需要的项目；iOS 17 的入口位于侧边栏。可先让智能体创建一条日程和提醒，确认调用结果。
3. 到插件商店选择扩展，安装并启用；需要执行命令、查看文件或操作网页时使用工作台。
4. 如需操控其他 App，另行设置第三方 iCTRL。完成后检查「探索」中的「操控手机」是否显示「运行中」。
5. 如需远程会话，在电脑安装 Agents Anywhere 桌面应用，再用手机扫码登录；无图形界面的服务器使用 Connector。远程通信经该服务转发，本机会话不需要开启此功能。

## fish-pocket 报错怎么排查？

日历或提醒事项不可用时，先检查对应本机能力是否开启，未授权的项目无法调用。操控手机另有条件：iOS 17.4 或更高版本、开发者模式、侧载 iCTRL，首次设置还需电脑。建议保持其远程访问关闭；其他 App 的屏幕内容会随对话发给所选模型服务商。

Python 装包失败时先区分包类型：纯 Python 包可安装，numpy、pandas 等编译扩展暂不支持。访问私有 Git 仓库应使用 HTTPS 加 Token 认证。

插件未出现或启动失败时，检查当前 profile（如适用）、启用状态，再重启应用并查看版本和日志。README 抽样中有部分插件需处理安装脚本、指定版本或重启后才能使用，但未给出逐包通用修复方案，不宜直接推断为全部兼容。
