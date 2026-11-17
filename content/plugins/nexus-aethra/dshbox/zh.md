---
title: "DSHBox：管理 DSH 版本与插件"
description: "DSHBox 是管理 DSH 插件、多版本和隔离环境的桌面工具，支持内嵌界面与扩展包共享。了解安装方法、容器配置、模板使用和任务日志报错排查。"
summary: "为不同项目维护独立的 DSH 版本、profile 和工作区，在桌面窗口中启动环境。通过资源管理导入插件与技能，复用模板，并查看安装任务的阶段和日志。"
highlights:
  - "多版本与独立容器"
  - "内嵌 WebView 界面"
  - "插件与技能打包共享"
  - "Boxfile 模板复用"
  - "任务队列与实时日志"
faq:
  - q: "DSHBox 怎么安装，支持哪些系统？"
    a: "从仓库 Releases 下载对应安装包：Windows x64 MSI、Linux x64 DEB 或 macOS arm64 DMG。Windows 自带运行工具，Linux 需要系统 Git；macOS 包面向 Apple Silicon。"
  - q: "DSHBox 能同时管理多个 DSH 版本吗？"
    a: "可以安装不同 Harness 标签，并为每个容器固定版本。容器分别维护 profile、工作区、插件、技能、日志和宿主进程。"
  - q: "DSHBox 怎么导入和分享插件、技能？"
    a: "在 Resources 中导入扩展，再将插件与技能组织成 bundle。快速导出保留 URL，完整导出则生成单个归档文件。"
  - q: "DSHBox 更新后为什么提示服务端版本旧？"
    a: "旧版后台服务可能仍在运行，应用会保留它，避免打断正在进行的工作。可以在合适的时间通过托盘菜单重启服务，启用依赖新版服务端的功能。"
  - q: "DSHBox 关闭窗口后还会继续安装吗？"
    a: "关闭窗口会将应用最小化到系统托盘，后台任务由 dshboxd 继续处理。托盘菜单提供打开窗口及启动、停止、重启后台服务的入口。"
---

## DSHBox 是做什么的？

DSHBox 是管理 DSH 插件、多版本与隔离环境的桌面工具，帮助开发者为不同项目维护独立的运行配置。它基于 Tauri 2，通过平台安装包部署，适合需要安装、测试和组织 DeepSeek Harness 插件的用户。

每个容器拥有自己的版本、profile、插件、技能、工作区、日志和宿主进程。启动后，界面在内嵌 WebView 中打开，不需要手动复制本地地址到浏览器。应用提供英文和简体中文界面，日常管理可在桌面窗口完成。

## DSHBox 核心功能

- **多版本与隔离容器**：安装指定 Harness 标签，并为各容器固定版本。默认使用宿主模式；实验性 VM 模式在 Windows 上为每个容器使用独立 WSL2 发行版，在 Linux 上使用 libkrun microVM。
- **插件与技能共享**：通过 Resources 导入扩展，并组合为 bundle。快速导出保留来源 URL，完整导出生成一个归档，便于按使用场景整理扩展组合。
- **Boxfile 模板复用**：用 `FROM` 和 `ADD` 描述环境，构建后反复创建容器。模板会实体化所需载荷，避免容器依赖可变的外部载荷。
- **任务队列与日志**：安装和构建任务预先展示阶段，每段都有进度、耗时与时间预算。支持取消、日志和历史记录，便于检查耗时步骤。
- **资源与智能体操作**：对话、密钥和插件状态可提取为命名副本并注入，YAML 可按键路径编辑。CLI 支持 `dshbox apply -f` 文档配置与 JSON 输出；容器内的 `dsh-box-sandbox` 插件提供类型化 `box_*` 工具。

## 怎么安装和使用 DSHBox？

从 `https://github.com/Nexus-Aethra/DSHBox/releases` 下载平台安装包。所给 README 未提供桌面应用的 DSH 安装命令，也未确认 npm 包名，因此这里使用安装包流程。

1. 选择 Windows x64 `.msi`、Debian/Ubuntu Linux x64 `.deb`，或 Apple Silicon macOS `.dmg`。Windows 包含 Node、npm、pnpm 和 Git；Linux 需通过 `apt install git` 或发行版对应命令安装系统 Git。
2. 启动应用，选择可写的 runtime directory，所有受管 DSH 数据保存在这里。
3. 打开 `Resources` → `DSH Versions`，点击 `Load versions`，安装需要的标签。
4. 进入 `Resources` → `Templates`，拉取官方模板，或从 Boxfile 构建模板。
5. 在 `Container` 中从模板创建容器，填写名称和 profile。首次创建会在最终目录准备依赖、本地插件和前端构建。
6. 点击 `Start` 启动并打开界面。之后在 `Resources` 中导入插件或技能、整理 bundle，以及维护可复用模板。

## DSHBox 报错怎么排查？

初始化受阻时，先确认运行目录可写。Linux 用户还需检查系统 Git；构建使用隔离的 Git 配置，不读取宿主的 `~/.gitconfig`。

安装或构建耗时较长时，查看任务阶段、已用时间、预算和日志，再判断是否需要干预。下载异常可检查 GitHub 镜像、npm registry 镜像及自动代理检测相关设置。可选 GitHub API token 直接发送到 `api.github.com`，不经过镜像。

顶部提示客户端与服务端构建不同，表示旧后台服务仍在运行，并不直接说明故障。应用保留它以免打断任务；在合适的时机从托盘菜单重启 `dshboxd`，即可使用依赖新版服务端的功能。

若找不到环境或扩展，可按通用步骤核对容器和 profile、确认插件已启用，再查看版本与日志，必要时重启对应 DSH 环境。关闭窗口后任务仍可能继续运行，应通过托盘菜单管理后台服务。
