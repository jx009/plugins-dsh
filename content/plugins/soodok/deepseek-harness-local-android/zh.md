---
title: "Deepseek-Harness-Local-Android：DSH 手机编译"
description: "Deepseek-Harness-Local-Android 是一个提供手机运行与编译环境的 DSH 插件配套应用。了解工具链安装、Linux 环境选择和 Gradle 报错排查。"
summary: "在 Android 上免 Root、免 Termux 运行智能体，通过扩展中心安装编译工具链。需要 glibc 时可使用 Linux Workspace，并在手机内预览本地服务。"
highlights:
  - "原生 Node.js 运行时"
  - "手机编译 Android 应用"
  - "双发行版 Linux 环境"
  - "本地服务 WebView 预览"
  - "设备能力独立授权"
faq:
  - q: "Deepseek-Harness-Local-Android 怎么安装到 DSH？"
    a: "它以 Android APK 应用形式提供手机端运行环境，所给资料没有 npm 包名或 DSH 插件安装命令。工具链则通过应用内的扩展中心加装，不能据此套用 npm 安装方式。"
  - q: "Deepseek-Harness-Local-Android 需要 Root 或 Termux 吗？"
    a: "文档中的原生运行方案不需要 Root，也不依赖 Termux。可选的 Linux Workspace 同样在应用沙箱内免 Root 运行。"
  - q: "Deepseek-Harness-Local-Android 能在手机上编译 APK 吗？"
    a: "文档列出了 OpenJDK 17、Gradle、aapt2、apksigner 和 d8 组成的 Android 编译链。项目已使用这套环境在手机上编译自身扩展。"
  - q: "Deepseek-Harness-Local-Android 怎么运行依赖 glibc 的工具？"
    a: "选择可选 Linux Workspace 中的 Ubuntu 24.04 环境，它提供 glibc 2.39 和 apt。另一个 Alpine 环境使用 musl，不能直接当作相同的 glibc 环境。"
  - q: "Deepseek-Harness-Local-Android 的 Gradle 为什么报 -Xmx64m 错误？"
    a: "README 将该问题定位到 toybox xargs 保留引号，导致 Gradle 启动参数被错误传给 JVM。项目在安装阶段修补启动脚本，同时修正内嵌 JDK 的固定用户目录和临时目录路径。"
---

## Deepseek-Harness-Local-Android 是做什么的？

Deepseek-Harness-Local-Android 是一个提供 Android 本地运行与编译环境的 DSH 插件配套应用。它面向希望直接在手机上使用智能体开发项目的用户，以 APK 形式交付，不要求 Root 或 Termux。对寻找 DeepSeek Harness 插件的开发者来说，这个项目提供的是移动端运行入口和工具扩展环境。

应用内置基于 bionic 的 Node.js，并通过扩展中心补充编译工具。所给 README 标注支持 Android 8.0 至 16。运行时可以离线启动，但这并不表示所有模型调用、扩展下载都能离线完成。

## Deepseek-Harness-Local-Android 核心功能

- **原生运行时：** Node.js 随 APK 提供，直接执行 Android 原生二进制。原生和容器两条路径均使用编译缓存，复用 JavaScript 模块编译结果。
- **手机编译工具链：** 扩展中心列出八类共 57 个条目，其中包含 20 套工具链。Clang、OpenJDK 17、Gradle、CMake、Rust 和 Go 可支持不同项目的构建需求。
- **Linux Workspace：** 可选加装且默认关闭。Alpine 3.22 随包内置，使用 musl 与 `apk`；Ubuntu 24.04 首次联网下载，提供 glibc 2.39 与 `apt`。
- **共享工作区与预览：** 两种执行路线共用引擎代码、`$DSH_HOME` 和工作区。编译后可启动本地 HTTP 服务，在 WebView 中预览，不提供 X11 或 Wayland 桌面。
- **设备能力独立授权：** 文档列出 176 条 HTTP 路由、42 条自描述目录项和 21 个独立开关。能力需要逐项取得用户同意，并非安装后全部开放。

## 怎么安装和使用 Deepseek-Harness-Local-Android？

所给 README 片段没有 DSH 安装命令，也没有确认的 npm 包名，因此不能生成插件安装命令。项目采用 APK 安装方式；详细安装章节未包含在此次材料中。

1. 从仓库 Releases 获取 Android APK 并安装应用。原生运行时已经打包，首次启动时进行解压。
2. 进入扩展中心，按项目安装工具。C/C++ 可选择 Clang 和 CMake；Java 与 APK 构建需要 OpenJDK 17 和 Android 构建工具。
3. 常规 Node、Python、Go、Rust、C 工具链可先走原生路线。预编译 CLI 依赖 glibc 时，加装 Linux Workspace 并选择 Ubuntu，首次下载需要网络。
4. 向智能体说明任务，例如在当前工作区创建项目、执行构建、启动开发服务器，再返回 `127.0.0.1` 预览地址。通过 WebView 查看运行结果。
5. 按任务需要批准设备能力。材料确认存在独立开关，但没有给出具体设置页面位置。

## Deepseek-Harness-Local-Android 报错怎么排查？

出现 `Could not find or load main class "-Xmx64m"` 时，先核对 Android 构建工具的安装情况和版本。README 指出 toybox 的 `xargs` 保留引号，使 Gradle 参数被错误传入 JVM；项目已在安装阶段加入补丁，同时修正 JDK 中写死的 `user.home` 和 `java.io.tmpdir`。

遇到预编译工具的 libc 兼容问题，先区分 bionic、musl 和 glibc。依赖后者的 CLI 应放到 Ubuntu 环境中运行。Linux Workspace 用于兼容性与性能，不负责隔离不可信代码。

其他启动或扩展异常可按通用步骤检查：记录应用与引擎版本，确认当前 profile 和扩展启用状态，重启 DSH 后查看可用日志。所给片段没有其他明确错误码，也没有日志目录信息。
