---
title: "deja-vu：让多个编程智能体共享本地记忆"
description: "deja-vu 把编程智能体已存在磁盘上的会话记录建成本地索引，供 DeepSeek Harness 等智能体检索过往工作、跨工具交接任务、找回被覆盖代码。"
summary: "一个 Go 写的单文件程序，在本机索引 43 种编程智能体保存的会话，提供搜索、跨智能体交接和被覆盖代码的恢复。DeepSeek Harness 是它支持的其中一种。"
highlights:
  - "跨智能体搜索"
  - "会话交接"
  - "找回被覆盖代码"
  - "本地索引"
  - "仓库级记忆"
faq:
  - q: "deja-vu 是专门给 DeepSeek Harness 做的吗？"
    a: "不是。它是通用工具，读取 Claude Code、Codex、Cursor 等 43 种编程智能体的会话存储。DeepSeek Harness 是其中之一，README 里为它列了单独的 npm 包 dsh-deja。"
  - q: "在 DeepSeek Harness 里能用到 deja-vu 的哪些功能？"
    a: "README 的支持表里，DeepSeek Harness 一行标明可用的有 MCP 召回、自动召回、skill、命令和交接；恢复原会话（resume）标为不支持，依赖一栏写的是 zstd。"
  - q: "deja-vu 会把会话记录传到网络上吗？"
    a: "索引和搜索都在本机完成，不调用 LLM。按 README 的说明，只有 deja update、deja sync ssh、版本检查以及你自己配置的 embedding 端点会用到网络；设置 DEJA_OFFLINE=1 可以关掉每天一次的新版本检查。"
---

## deja-vu 是做什么的？

deja-vu 把编程智能体本来就写在磁盘上的会话记录，整理成一份可以搜索的本地记忆。它的命令行工具叫 `deja`，负责给这些文件建索引，之后无论是接入的智能体还是你自己在终端里，都能查到以前做过什么决定、跑过什么命令、改过哪些文件。

它不是 DeepSeek Harness 专用的插件。项目覆盖 43 种智能体，包括 Claude Code、Codex、Cursor、Gemini CLI、OpenCode 等，DSH 只是列表中的一项。索引的来源是已有的历史记录，所以第一次建完索引，过去的会话就能搜到；在一个智能体里修过的问题，换到另一个智能体里也能被想起来。

同一份索引还用来做另外两件事：把没做完的会话交给别的智能体继续，以及找回智能体在提交之前覆盖掉的代码。

## 核心功能

- **跨智能体搜索**：不带参数运行 `deja` 会打开终端搜索界面，范围是所有智能体的历史，可以按智能体、时间段、项目过滤。`deja view` 则把整个存储导出成一个本地 HTML 文件。
- **会话交接**：`deja handoff` 把当前会话的目标、已做的决定、动过的文件和未完成的事项交给另一个智能体。
- **恢复与溯源**：索引里记有打开过的文件、带退出码的命令和每次编辑的精确范围，`deja restore` 据此找回被覆盖的代码，`deja blame` 可以查出某一行是哪次会话写的。
- **自动召回**：通过钩子和一个 MCP 工具，在会话开始时、编辑文件或执行命令之前、命令失败之后，主动给出相关的历史会话。
- **仓库级记忆**：`deja repo add` 把你挑选的决定和走不通的方案写进 `.deja/memory.jsonl`，同事克隆仓库后，他的智能体也能读到。
- **凭据脱敏**：建索引时，密钥、令牌、密码会被替换成脱敏标记。原始会话文件不会被改动，`deja secrets` 可以列出包含凭据的会话。

## 怎么使用 deja-vu

1. 安装程序。macOS 和 Linux 按 README 用安装脚本：

```sh
curl -fsSL https://raw.githubusercontent.com/vshulcz/deja-vu/main/install.sh | sh
```

这个脚本在 Windows 上不能运行，改用 Scoop 或 winget：

```powershell
scoop install deja-vu
winget install vshulcz.deja-vu
```

2. 接入本机检测到的智能体。这一步会配置 MCP 召回和钩子，并建立首次索引：

```sh
deja install --auto
```

3. 如果习惯从 DSH 的插件体系安装，README 里列出的 npm 包是 `dsh-deja`：

```sh
dsh plugin --profile web add dsh-deja
```

4. 新开一个智能体会话，或者自己直接查历史：

```sh
deja "jwt refresh token"
deja handoff --to codex
deja restore internal/auth/jwt.go
```
