---
title: "dsh-opencode-free-models：DSH 接入免费模型"
description: "这是接入 OpenCode Zen 免费模型的 DSH 插件，可在聊天界面直接选用模型。本文介绍 Windows 安装、手动注册、后端配置和模型不显示等报错的排查方法。"
summary: "不用登录或填写 API Key，重启后即可在模型选择器里查看并选用当前可用的免费模型。支持 DSH 桌面端和 Web 端。"
highlights:
  - "同步免费模型列表"
  - "免登录免填密钥"
  - "模型选择器直接选用"
  - "支持流式回复"
  - "可配置模型列表后端"
faq:
  - q: "dsh-opencode-free-models 怎么在 Windows 上安装？"
    a: "从仓库的发布页下载并解压插件包，然后双击 `one-click-install` 文件夹里的 `install.bat`。如果脚本列出多个 DSH 目录，选你实际使用的那个，装完后重启。"
  - q: "dsh-opencode-free-models 需要 OpenCode Zen 的 API Key 吗？"
    a: "不需要自己申请或填写 API Key，插件会处理默认的公共认证。使用这些免费模型也不需要登录 OpenCode Zen。"
  - q: "dsh-opencode-free-models 安装后在哪里选模型？"
    a: "打开聊天输入框右下角的模型选择器，查找以 `opencode-free/` 开头的条目。选中一个当前可用的模型，就可以在聊天框里发消息。"
  - q: "dsh-opencode-free-models 的后端地址在哪里配置？"
    a: "可以在 DSH 设置界面的插件配置中修改，也可以在 `cordis.patch.yml` 中设置 `backendUrl`。如果修改后没有生效，检查 profile 层或 DSH 根目录下是否有覆盖项。"
  - q: "dsh-opencode-free-models 的免费模型突然不见了怎么办？"
    a: "如果之前可用，先确认是单个模型消失，还是整个 `opencode-free/` 系列都不见了。单个模型可能已下架或超出可用时段；如果全部消失，再检查插件是否已加载，以及后端总开关是否关闭。"
---

## dsh-opencode-free-models 是做什么的？

`dsh-opencode-free-models` 是一个把 OpenCode Zen 免费模型接入聊天界面的 DSH 插件。它从后端获取模型列表，并在输入框右下角的模型选择器中注册 `opencode-free/` 系列模型。安装并重启后，只要列表里有可用模型，就能选中一个开始对话，不必手动添加模型或填写 API Key。

这个 DeepSeek Harness 插件支持桌面端和 Web 端。模型列表会随服务端状态变化，因此曾经出现过的模型不一定会一直保留在选择器里。

## dsh-opencode-free-models 核心功能

- **自动同步模型列表**：插件每 30 秒向后端请求一次 `/api/models`，并根据返回结果更新模型选择器，不用逐个维护模型名称。
- **免登录选用模型**：插件会处理免费模型的公共认证。选中模型后，对话发送至 OpenCode Zen，回复会以流式方式返回。
- **免费模型面板**：重启后可通过聊天界面的「免费模型」按钮打开面板。要发起对话，在输入框旁的模型选择器里切换即可。
- **按后端状态更新可用性**：后端可控制单个模型的上下架和可用时段。总开关关闭时，插件会移除对应路由，相关模型也会从选择器中消失。

## 怎么安装和使用 dsh-opencode-free-models？

仓库未提供可确认的 DSH 命令行安装方式。Windows 可运行发布包里的安装脚本，macOS、Linux 和服务器可将插件文件复制到对应的 profile 后手动注册。

1. **Windows 10/11**：先确认已安装 DSH，再从仓库的 Releases 下载并解压发布包。打开 `one-click-install`，双击 `install.bat`。如果脚本检测到多个安装目录，按提示选择你正在使用的目录。
2. **macOS、Linux 或服务器**：将 `one-click-install/plugin/dsh-opencode-free-models/` 整个目录复制到 `<DSH_HOME>/profiles/web/node_modules/` 下。若从源码准备安装文件，先在 Node.js 18 或更高版本的环境中运行 `node scripts/build.mjs`。
3. **手动安装后注册**：编辑 `profiles/web/package.json`，在 `dependencies` 中登记 `dsh-opencode-free-models`，再将同名条目加入 `dsh.profile.bundles`。保留原有依赖和已注册的插件。
4. **重启并选模型**：完全退出后重新打开 DSH；使用桌面端时，也要退出系统托盘中的程序。打开聊天输入框右下角的选择器，选一个 `opencode-free/` 模型并发送消息。

默认配置即可使用。需要更换模型列表后端时，可以在 DSH 设置界面的插件配置中调整 `backendUrl`，也可以编辑 `cordis.patch.yml`。`pageSize` 控制每页显示数量，`requestTimeoutMs` 控制请求超时。排查配置为什么没生效时，按优先级从高到低检查 DSH 根目录、profile 和插件 bundle 三层配置。

## dsh-opencode-free-models 报错怎么排查？

- **安装脚本找不到 DSH**：确认已安装 DeepSeek Harness。如果程序已经装好但脚本仍未识别，把环境变量 `DSH_HOME` 指向包含 `profiles` 文件夹的根目录，而不是 `profiles/web`，再运行脚本。
- **装完后没有模型**：先做一次完整重启，再确认当前使用的 profile 与安装目标一致，并检查插件是否已注册和启用。如果只有部分模型缺失，留意模型是否已下架或不在可用时段；如果整组消失，也要考虑后端总开关是否关闭。
- **修改配置后仍然报错**：确认生效层中的 `backendUrl` 是你要使用的地址。若仍无法判断原因，可核对 DSH 和插件版本，开启 `debug` 后查看加载与请求日志。
