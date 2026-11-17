---
title: "DeepSeek-Harness-Desktop：DSH 桌面运行"
description: "DeepSeek-Harness-Desktop 是一个支持 DSH 插件的 Windows 桌面发行版，内置运行时与通知。了解安装方法、后台任务、自动更新和 SmartScreen 提示排查。"
summary: "无需另装 Node，即可从 Windows 快捷方式启动 Harness。独立后台进程保留关窗后的任务，桌面端提供原生通知、插件商店和带校验的更新流程。"
highlights:
  - "Windows 原生通知"
  - "常驻后台任务"
  - "内置 dshmarket"
  - "默认启用 Computer Use"
  - "差分更新与完整性校验"
faq:
  - q: "DeepSeek-Harness-Desktop 怎么安装？"
    a: "在仓库最新 Release 下载 DeepSeekHarness-Setup-&lt;版本>.exe，运行向导并选择安装目录。随后通过桌面或开始菜单快捷方式启动；它是桌面发行版，不是通过 npm 添加的普通插件。"
  - q: "DeepSeek-Harness-Desktop 需要另外安装 Node 吗？"
    a: "使用已发布的安装包不需要另装 Node，后端使用 Electron 内置的 Node 运行时。Harness runtime、原生终端、图片处理和插件能力也随安装包提供。"
  - q: "DeepSeek-Harness-Desktop 关闭窗口后任务还会运行吗？"
    a: "普通关窗不会停止独立 daemon 管理的后台任务，再点快捷方式可以恢复界面。需要完全退出桌面壳时使用 Ctrl+Q。"
  - q: "DeepSeek-Harness-Desktop 提示未知发布者怎么办？"
    a: "安装包暂未使用商业代码签名证书，因此可能触发 SmartScreen 提示。请对照对应 Release 核验文件字节数和 SHA-256。"
  - q: "DeepSeek-Harness-Desktop 升级会清空配置吗？"
    a: "升级不会重置 ~/.dsh 中的现有 profile。README 明确说明会保留会话、模型配置、凭据以及已有社区插件。"
---

## DeepSeek-Harness-Desktop 是做什么的？

DeepSeek-Harness-Desktop 是一个支持 DSH 插件的 Windows 桌面发行版，将 Harness 内核、运行时和原生桌面能力放进同一个安装包。它面向不想单独准备 Node、每次通过命令行启动服务的用户；项目本身不是添加到现有 profile 的普通插件，而是独立安装的桌面应用。

它支持 Windows 10 和 11，并可继续使用 DeepSeek Harness 插件生态。安装后无需在首次启动时临时下载运行时，但这不等于所有模型和外部服务都能离线工作，具体仍取决于用户配置的服务。

## DeepSeek-Harness-Desktop 核心功能

- **捆绑运行时**：安装包包含 Harness runtime、原生终端、图片处理和插件能力，后端使用 Electron 内置 Node，无需用户另装运行环境。
- **常驻后台 daemon**：窗口与后端独立运行，普通关窗不会终止任务。登录预热、编译缓存和界面预加载减少重复启动工作，再点快捷方式可回到界面。
- **dshmarket 与 DSH-IM**：新 profile 自带插件商店入口，消息渠道通过 DSH-IM 配置。社区插件仍由用户 profile 管理，不会连同个人配置写进公共安装包。
- **Computer Use**：官方服务与 Cua Driver 原生提供方随包提供并默认启用，无需再手动安装这些组件。
- **校验与自动更新**：侧栏按钮可检查新版本，下载差分或完整安装包并校验。进入安装阶段后才停止后台进程树，完成后补齐缺失的快捷方式。

## 怎么安装和使用 DeepSeek-Harness-Desktop？

README 未提供 DSH 安装命令，也没有已确认的 npm 包名，因此应使用 Windows 安装包，不套用 `dsh plugin` 命令。

1. 打开 `https://github.com/Links2008/DeepSeek-Harness-Desktop/releases/latest`，下载该版本的 `DeepSeekHarness-Setup-<版本>.exe`。
2. 运行安装向导，选择安装目录，再通过桌面或开始菜单快捷方式启动。
3. 继续使用 `~/.dsh` 下的 profile、会话和模型配置。安装器不会重置该目录，也不会把其中的凭据加入公开制品。
4. 需要扩展能力时，从新 profile 的 dshmarket 入口查找插件；消息渠道通过 DSH-IM 配置。所给 README 没有列出具体渠道字段，不应照猜测填写。
5. 暂时离开时直接关窗，后台任务继续运行；再次点击快捷方式恢复。完全退出桌面壳使用 `Ctrl+Q`。
6. 需要更新时点击侧栏更新按钮。注意实际安装会停止 daemon 和后端进程树，与普通关窗的行为不同。

## DeepSeek-Harness-Desktop 报错怎么排查？

遇到 SmartScreen“未知发布者”提示，先核对对应 Release 公布的安装包字节数和 SHA-256。项目目前没有商业代码签名证书，这类提示不应被当作应用自身的错误码。

启动或插件异常时，先确认 profile 名称和插件启用状态，再重启 DSH，查看版本与诊断日志。README 提到，第三方插件缺少构建产物时可以隔离故障项，避免影响整个后端。不要优先删除 `~/.dsh`，其中保存着会话、配置和凭据。

核对版本时，以实际 Release 和 `upstream-lock.json` 为准：所给文档存在不同版本号引用。当前说明采用“官方发布标签、兼容性验收、锁定后发布”的流程，并非自动推送每次主分支提交。反馈问题时说明安装、启动或更新阶段，勿在公开 Issue 粘贴凭据或完整私人日志。
