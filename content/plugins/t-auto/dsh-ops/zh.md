---
title: "dsh-ops：为 DSH 省 Token 的底层工具集"
description: "dsh-ops 是 DeepSeek Harness 的底层工具插件，用紧凑的文件、文档、Bash 工具替换部分官方工具，减少 Token 消耗和调用轮次。"
summary: "面向 DeepSeek Harness 的底层工具插件：为 Native 和 PTC 两种模式提供 ops 系列工具，不常用的工具按需加载，在 Windows 上可以用 Bash 代替 PowerShell。"
highlights:
  - "紧凑的文件工具"
  - "工具按需加载"
  - "ops-ptc 模式"
  - "可换用 Bash"
  - "TUI 侧栏"
faq:
  - q: "dsh-ops 会把 DSH 官方工具删掉吗？"
    a: "不会删除，只是隐藏其中一部分，换成 ops 系列工具。Bash、文件替换、宿主 PowerShell 隐藏各有独立开关，关掉某项替换后，对应的官方工具仍然可用。"
  - q: "dsh-ops 新增的 ops-ptc 模式是什么？"
    a: "它是由插件运行时注册的第五个内置模式，继承 PTC 的工具面，可以在会话首轮注入一次批量调用提示。是否把它设为默认模式由 global.forceDefaultOpsPtc 控制，这个开关默认开启，可以关闭。"
  - q: "dsh-ops 支持哪些 DSH 版本？"
    a: "README 写明宿主从 DSH 0.2.2-rc.1 起受支持。插件的 0.5 系列不再支持 0.2.0、0.2.1 以及更早的 0.2.2 预览版。"
---

## dsh-ops 是做什么的？

dsh-ops 是 DeepSeek Harness 的底层工具插件，目标写得很明确：提高 Token 效率。它新增一套处理文件、文档和 Shell 的 ops 工具，同时隐藏一部分官方工具，让模型改用更省的版本。

作者把这套方案概括为改动面小、侵入性低。组件包只往 profile 里插入一行 `dsh-ops`，哪些工具常驻、哪些动态加载、是否替换 Bash 和文件工具、是否隐藏宿主的 PowerShell，都在这一行的配置里决定。省下来的开销主要来自三处：工具返回更短，报错后的重复尝试更少，以及新增工具时系统提示词不跟着变长。

## 核心功能

- **Native 模式工具**：文件工具的返回更紧凑，带行号，错误反馈更清楚，用来避免模型在同一个报错上反复打转。
- **PTC 模式工具**：工具返回结构化 JSON，模型在 PTC 模式下要写的 TypeScript 更少。PTC SDK 目录共 18 个 API，其中 15 个是文件和文档工具，另有批处理、结果引用和加载器。
- **动态加载**：启用 DSH 预留的 `tools_addition` 机制，工具按渐进方式披露。读取 PDF、Word，或者批量修改大量文件这类功能，用到时才加载。
- **ops-ptc 模式**：额外提供的一个模式，继承 PTC 工具面，可以用附加上下文的方式给出批量调用提示，不会拦截或改写模型写的程序。
- **Shell 处理**：Bash 和宿主 Shell 的隐藏分开配置。在 Windows 上可以用 `ops_bash` 代替 pwsh，也可以保留官方 Shell。
- **OPS 侧栏**：配合 dsh-TUI 使用时，可以打开一个只读侧栏，不抢焦点，也不产生额外的工具调用。

## 怎么使用 dsh-ops

1. 先初始化目标 DSH 应用，并确认宿主版本不低于 0.2.2-rc.1。
2. 在应用的插件市场里输入 npm 包名 `dsh-ops` 安装，装好后启用。不确定能否连上 npm 官方源时，README 建议选择自定义地址并填入华为云镜像。
3. 也可以用 npx 安装器，必须显式指定 profile：

```console
npx --yes dsh-ops@latest install --profile desktop
npx --yes dsh-ops@latest install --profile web
npx --yes dsh-ops@latest install --profile tui
```

desktop 这个 profile 只能通过桌面应用自带的 CLI 操作。加上 `--dry-run` 只打印计划，不修改 profile。

4. 按应用提示重载；如果替换的是已经加载的代码，需要重启应用。
5. 查看状态，或者以后卸载：

```console
npx --yes dsh-ops@latest status --profile desktop
npx --yes dsh-ops@latest uninstall --profile desktop
```

6. 想用侧栏的话，在 dsh-TUI 里启用 `dsh-ops/tui` 这一行并重启。
