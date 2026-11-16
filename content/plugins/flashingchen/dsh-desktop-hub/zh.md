---
title: "dsh-desktop-hub：DSH 桌面与插件管理"
description: "dsh-desktop-hub 是一个管理 DSH 插件、MCP 和 Skills 的桌面控制台。了解安装方法、DeepSeek 登录、MCP JSON 导入配置和常见报错排查。"
summary: "把 Harness 对话与插件、MCP、Skills 管理放进同一个桌面窗口。内置运行环境，macOS 和 Windows 用户无需另装 Node.js，即可登录账号并配置扩展。"
highlights:
  - "内置运行环境"
  - "三类扩展市场"
  - "MCP JSON 配置转换"
  - "Skills 导入与可见性"
  - "配置备份与热生效"
faq:
  - q: "dsh-desktop-hub 怎么安装到电脑上？"
    a: "从仓库的 GitHub Releases 下载 macOS DMG 或 Windows EXE，安装后打开即可。它是内置运行时的桌面应用，README 没有提供将应用本身装成 DSH 插件的命令。"
  - q: "dsh-desktop-hub 支持 Windows 和 Linux 吗？"
    a: "当前预览版提供 Windows x64 和 macOS arm64 安装包。Linux 安装包仍在计划中。"
  - q: "dsh-desktop-hub 怎么导入 Cursor 的 MCP 配置？"
    a: "将 Cursor 或 Claude Code 导出的 MCP JSON 粘贴到转换入口，检查转换结果后确认写入 profile patch。转换器会处理环境变量引用，并对 SSE 或非法 serverName 给出警告。"
  - q: "dsh-desktop-hub 在哪里登录 DeepSeek 或填写 API Key？"
    a: "在 Harness 设置中登录账号或配置 API Key，退出与授权状态也在这里管理。桌面控制台不再提供独立的账号管理入口。"
  - q: "dsh-desktop-hub 的 Skill 为什么显示被遮蔽？"
    a: "同名 Skills 按 rank 决定生效项，数值较低的条目生效。较高 rank 的同名条目会被标记为被遮蔽。"
---

## dsh-desktop-hub 是做什么的？

dsh-desktop-hub 是一个管理 DSH 插件、MCP 和 Skills 的桌面控制台，面向希望在同一窗口完成对话与扩展配置的用户。它把 Harness Web UI 与管理面板放在不同 Tab 中，减少切换终端和手写 YAML 的操作。

这是社区维护的 Electron 与 TypeScript 项目，并非 DeepSeek 官方产品。应用保留官方 Web UI，内置 Node.js 和 Harness 运行时，无需另装运行环境。当前预览版支持 macOS arm64、Windows x64，profile 固定为 `web`，切换能力尚在开发中。

## dsh-desktop-hub 核心功能

- **三类扩展市场**：统一搜索插件、MCP 和 Skills，安装前查看来源、来源等级与权限。DeepSeek Harness 插件目录来自 DSH Plugin Market；MCP 合并官方 Registry 与 DSH MCP Market，Skills 合并 ClawHub 与 SkillsMP。
- **MCP 配置转换**：粘贴 Claude Code 或 Cursor 导出的 MCP JSON，转换为 DSH 插件行 YAML。环境变量引用自动转换，确认后写入 profile patch，由 Harness 热生效。
- **Skills 导入与管理**：扫描用户级和随包条目，支持 `.skill`、`.zip`、GitHub 仓库链接及新建用户级 Skill。模型可见、用户可见分别控制，同名条目按 rank 选择生效项。
- **插件生命周期管理**：按组合包与依赖展示 `web` 的插件清单，安装、移除、更新调用实际的 `dsh plugin` 操作。缺少 `dsh.bundle` 的聚合仓库会被拒绝误装。
- **备份与应用更新**：写入采用原子落盘并生成 `.bak-<ts>` 备份。启动时检查 GitHub Releases，发现新版后提示，由用户确认下载并重启安装。

## 怎么安装和使用 dsh-desktop-hub？

README 提供的是桌面安装包，没有应用本身的 DSH 安装命令；也未确认 npm 包名，因此不应拼接插件安装命令。

1. 打开 `https://github.com/FlashingChen/dsh-desktop-hub/releases/latest`，按系统下载 DMG 或 EXE 并安装。
2. 启动后进入 Harness 设置，登录 DeepSeek 账号或配置 API Key；退出和授权状态也在这里管理。
3. 在 Harness Tab 开始对话，需要扩展时进入 Plugin、MCP 或 Skills Tab，核对来源与权限后确认安装。
4. 导入 MCP JSON 时先检查转换结果。市场条目声明环境变量时，可在安装卡片填写密钥，值会写入当前 MCP 配置，无需手动设置系统环境变量。
5. 需要复习操作时，从侧栏重新打开“使用引导”。关闭窗口只会隐藏到托盘，完全结束运行需使用托盘或应用菜单的退出操作。

## dsh-desktop-hub 报错怎么排查？

Windows 预览版尚未签名，首次被 SmartScreen 拦截时，README 给出的流程是“更多信息 → 仍要运行”。macOS 从 v0.3.5 起已签名并公证，排查时先确认安装包版本与架构。

插件未显示时，检查当前是否为 `web` profile、插件是否启用，再重启应用并查看版本和日志。Skill 显示“被遮蔽”时，检查同名条目的 rank：低 rank 生效，同时核对可见性开关。

MCP 转换出现警告时，检查 SSE 类型与 serverName。插件安装拒绝聚合仓库时，核对来源及 `dsh.bundle`，避免选择仓库根目录。配置改错可利用自动生成的备份恢复。

网络不可用时，市场会回退到本地缓存和随包目录。仍无法定位可使用“反馈”Tab；诊断信息默认不附加，可单独复制。离线时也可复制反馈内容发送到 QQ 群 `1106611027`。
