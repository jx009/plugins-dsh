---
title: "deja-vu：DSH 跨 Agent 共享记忆插件"
description: "deja-vu 是一个索引过往编程 Agent 会话、让 DeepSeek Harness 能回忆、交接和恢复之前工作的 DSH 插件。了解安装方法和常用设置。"
summary: "一个 Go 程序，在本机索引 43 种编程 Agent 保存的会话，提供搜索、跨 Agent 交接和被覆盖代码的恢复。DeepSeek Harness 是支持的工具之一。"
highlights:
  - "搜索 43 种编程 Agent 的会话"
  - "会话开始时自动回忆"
  - "跨 Agent 交接会话"
  - "恢复被覆盖的代码"
  - "完全本地，不需要模型 Key"
faq:
  - q: "deja-vu 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add dsh-deja`。也可以用安装脚本装好 `deja` 程序，再运行 `deja install --auto`，它会接入包括 DSH 在内的所有已检测到的 Agent，大约十秒建好首个索引。"
  - q: "deja-vu 的哪些功能在 DeepSeek Harness 里可用？"
    a: "MCP 回忆、自动回忆、技能、命令和交接都可用。恢复会话（resume）不支持，README 还注明需要安装 `zstd`。"
  - q: "deja-vu 会把会话记录发到外部吗？"
    a: "不会。索引和搜索都在本地完成，不调用任何模型。只有 `deja update`、`deja sync ssh`、版本检查，以及你自己配置的向量接口会联网。设置 `DEJA_OFFLINE=1` 可以关掉每日版本检查。"
  - q: "deja-vu 会拖慢 DeepSeek Harness 吗？"
    a: "回忆是本地的词法查找，中位耗时不到 1 毫秒。钩子会额外加上进程启动和新鲜度检查，在 1.9 GB 的会话存储上端到端约 0.2 秒。"
  - q: "deja-vu 能找到安装之前的工作吗？"
    a: "能。它直接索引各个 Agent 已经保存在磁盘上的记录，第一次索引完成后，之前的会话就能搜到。"
  - q: "怎么让 deja-vu 不索引某些项目？"
    a: "在 `~/.config/deja/exclude` 里每行写一个项目名或路径模式；要跳过某个 Agent 的全部记录，写 `harness:<名字>`。"
---

## deja-vu 是做什么的？

deja-vu 是一个把编程 Agent 已经保存的会话记录变成本地可搜索记忆的 DSH 插件。它的命令行工具 `deja` 会索引这些文件，DeepSeek Harness、其他接入的 Agent，或者你自己在终端里，都能查到之前做过的决定、跑过的命令和改过的代码。

因为索引来自已有的历史记录，不需要额外的采集步骤，也不会从空白开始：装之前的会话，第一次索引后就能搜到。它覆盖 43 种 Agent，包括 Claude Code、Codex、Cursor、Gemini CLI 和 DSH，在一个工具里解决的问题，换到另一个工具里也能找回来。

同一个索引还能做两件事：把没做完的会话交给另一个 Agent 继续，以及找回被 Agent 覆盖、还没提交的代码。这一切都在你电脑上的一个 Go 程序里完成。

## deja-vu 核心功能

- **跨 Agent 搜索**：直接运行 `deja`，在终端里搜索所有 Agent 的历史，可以按 Agent、时间和项目筛选；`deja view` 把全部记录导出成一个本地 HTML 页面。
- **自动回忆**：通过钩子和一个 MCP 工具，在会话开始、编辑或执行命令之前、命令失败时，自动带出相关的历史会话。
- **会话交接**：`deja handoff` 把当前会话的目标、决定、改过的文件和未完成的工作交给另一个 Agent。
- **恢复与追溯**：索引记录了精确的编辑范围，`deja restore` 能找回被覆盖的代码，`deja blame` 能查出某一行是哪个会话写的。
- **仓库记忆**：`deja repo add` 把你挑选的决定和踩过的坑写进 `.deja/memory.jsonl`，同事克隆仓库后，他们的 Agent 也能回忆起来。
- **凭据脱敏**：建索引时，Key、令牌和密码都会被替换成脱敏标记。

## 怎么安装和使用 deja-vu？

1. 安装 DSH 插件包：

   ```bash
   dsh plugin --profile web add dsh-deja
   ```

2. 或者安装 `deja` 程序，一次接入所有检测到的 Agent：

   ```bash
   curl -fsSL https://raw.githubusercontent.com/vshulcz/deja-vu/main/install.sh | sh && deja install --auto
   ```

   也支持 Homebrew（`brew install deja-vu`）、Scoop、winget 和 `go install`。

3. 确认装了 `zstd`，DSH 的支持依赖它。
4. 在某个仓库里打开新的 DSH 会话，相关的历史工作会自动出现；也可以直接问：“我们之前处理过 JWT 刷新轮换吗？”
5. 在终端里，`deja` 用来搜索，`deja last` 列出所有 Agent 最近的会话，`deja handoff` 把工作交给另一个工具。

## deja-vu 报错怎么排查？

- **DSH 什么都回忆不起来**：确认插件或 `deja install --auto` 接入的是你正在用的 profile，并且装了 `zstd`。在终端运行 `deja`，看看索引里有没有会话。
- **最近的会话搜不到**：可能关掉了自动索引，检查 `~/.config/deja/policy.json` 里的 `auto_index`，或者环境变量 `DEJA_NO_AUTO_INDEX`。
- **不想要的项目出现在回忆里**：在 `~/.config/deja/exclude` 里加上排除规则，或者调整 `policy.json` 里的 `ignore` 列表。
- **DSH 里用不了恢复会话**：DeepSeek Harness 不支持 resume，改用交接功能。
- **需要完全离线**：设置 `DEJA_OFFLINE=1` 关掉每日版本检查，并且不要配置可选的向量接口。

反馈问题时，请附上 `deja --version` 的输出、DSH 版本，以及索引了哪些 Agent 的记录。
