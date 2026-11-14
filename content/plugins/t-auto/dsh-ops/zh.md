---
title: "dsh-ops：给 DSH 省 Token 的底层工具插件"
description: "dsh-ops 是一个用更精简的文件、文档和 Bash 工具替换内置工具，减少 token 消耗和调用轮次的 DSH 插件。了解安装方法和常见问题排查。"
summary: "DeepSeek Harness 的底层工具插件：为 Native 和 PTC 模式提供 ops 系列工具，按需加载少用的工具，并能在 Windows 上用 Bash 替代 PowerShell。"
highlights:
  - "带行号的精简文件工具"
  - "PDF、Word 工具按需加载"
  - "带批量提示的 ops-ptc 模式"
  - "Windows 上用 Bash 替代 PowerShell"
  - "可选的 TUI 只读侧栏"
faq:
  - q: "dsh-ops 怎么安装到 DeepSeek Harness？"
    a: "运行 `npx --yes dsh-ops@latest install --profile web`（也可以是 `desktop` 或 `tui`），或者 `dsh plugin --profile web add dsh-ops`。在插件市场里输入 npm 包名 `dsh-ops`；不确定能连上官方源的话，README 建议用华为云 npm 镜像。"
  - q: "dsh-ops 支持哪些 DSH 版本？"
    a: "宿主支持从 DSH 0.2.2-rc.1 开始。0.5 系列不再支持 0.2.0、0.2.1 和更早的 0.2.2 预览版。"
  - q: "dsh-ops 会删掉 DSH 的官方工具吗？"
    a: "它会隐藏一部分官方工具，换成 ops 版本。Bash、文件替换和宿主 PowerShell 隐藏各有独立开关，关闭替换后原版工具照常可用。"
  - q: "dsh-ops 的 ops-ptc 模式是什么？"
    a: "插件注册的第五个内置模式，继承 PTC 的工具面，可以在会话首轮注入一次批量调用提示。`global.forceDefaultOpsPtc` 开关决定它是否作为默认模式，默认开启。"
  - q: "dsh-ops 是怎么省 token 的？"
    a: "文件工具返回带行号的精简结果和更清楚的报错，避免模型反复重试；PTC 工具返回结构化 JSON，模型少写代码；PDF 读取这类重功能只在需要时才加载。"
  - q: "dsh-ops 能直接从 GitHub 安装吗？"
    a: "不能。直接用 `git+https` 安装或未构建的源码缺少完整的运行时，请安装 npm 发行包或完整构建好的 tarball。"
---

## dsh-ops 是做什么的？

dsh-ops 是一个让 DeepSeek Harness 处理日常文件和命令行工作更省、更快的 DSH 插件。它新增了一组 ops 工具，用来读写和搜索文件、读取文档、运行 Bash，同时隐藏一部分官方工具，让模型改用更精简的版本。

思路是从源头省 token。带行号的精简输出和更清楚的报错，能避免模型在同一个错误上反复打转；PTC 模式下返回结构化结果，模型要写的代码更少；不常用的工具只在任务需要时才加载，系统提示词不会因此膨胀。

插件的改动面很小。它只在 profile 里插入一行 `dsh-ops`，这一行的配置决定哪些工具常驻、哪些按需加载，以及是否替换 Bash、文件工具和宿主的 PowerShell。

## dsh-ops 核心功能

- **Native 模式工具**：文件工具返回精简、带行号的结果，报错信息更好，减少重试轮次。
- **PTC 模式工具**：返回结构化 JSON 的工具。PTC SDK 共 18 个 API：15 个文件和文档工具，加上批处理、结果引用和加载器。
- **动态加载工具**：启用 DSH 预留的 `tools_addition` 机制，PDF、Word 读取和超多文件批量修改等功能只在需要时加载。
- **ops-ptc 模式**：额外的模式，继承 PTC 工具面，附加批量调用提示，但不会阻断或改写模型写的程序。
- **Shell 控制**：Bash 和宿主 Shell 的隐藏分开配置；Windows 上可以用 `ops_bash` 替代 pwsh，也可以保留官方 Shell。
- **OPS 侧栏**：配合 dsh-TUI 时，可选的只读侧栏显示 ops 信息，不抢焦点，也不产生额外的工具调用。

## 怎么安装和使用 dsh-ops？

1. 先初始化目标 DSH 应用，确认版本在 DSH 0.2.2-rc.1 以上。
2. 用 npx 安装，必须明确指定 profile：

   ```bash
   npx --yes dsh-ops@latest install --profile web
   ```

   桌面端用 `--profile desktop`，dsh-TUI 用 `--profile tui`。加 `--dry-run` 可以先预演一遍。

3. 也可以用官方命令 `dsh plugin --profile web add dsh-ops`，或者在插件市场里输入包名 `dsh-ops`。
4. 重启 DSH 照常使用。ops 工具会自动替换被隐藏的内置工具；除非关掉 `global.forceDefaultOpsPtc`，ops-ptc 会成为默认模式。

桌面端要用桌面应用自带的命令行。Windows 上安装助手默认在 `%LOCALAPPDATA%\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd` 查找；装在别处的话，用 `--dsh-cli` 指定完整路径。

## dsh-ops 报错怎么排查？

- **装进 desktop profile 失败**：普通的 DSH 命令行不能管理保留的 `desktop` profile，要用桌面应用自带的命令行，或者用 `--dsh-cli` 让安装助手指向它。
- **插件市场安装卡住或失败**：选择自定义地址，填 `https://mirrors.huaweicloud.com/repository/npm/`。README 目前不推荐用 npmmirror。
- **旧版 DSH 上加载不了**：0.5 版本要求 DSH 0.2.2-rc.1 以上，升级宿主，或者继续用旧版 dsh-ops。
- **从 GitHub 安装后缺文件**：`git+https` 安装和未构建的源码没有运行时，改用 npm 包或构建好的 tarball。
- **Windows 上 Bash 行为异常**：运行 `dsh-ops ladder` 检查内置 Bash 的完整性标签和 MSYS 兼容性。带 Low 标签的程序产生的子进程也是 Low 级别，改不了已有的文件。
- **想恢复官方工具**：关掉对应的替换开关，原版工具就会重新可用。

反馈问题时，请附上 dsh-ops 版本、DSH 版本、profile 和操作系统。
