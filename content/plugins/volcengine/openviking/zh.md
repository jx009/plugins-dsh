---
title: "OpenViking：给 DSH 加长期记忆的插件"
description: "OpenViking 是一个上下文数据库，它的 DSH 插件让 DeepSeek Harness 拥有跨会话的长期记忆。了解安装方法、服务器连接和记忆生效的检查。"
summary: "面向 AI Agent 的上下文数据库，用 viking:// 地址统一组织知识、记忆和技能。可以查看已存的上下文、限定目录检索，并从会话中提取可编辑的记忆。"
highlights:
  - "DSH 跨会话记忆"
  - "上下文即可浏览的虚拟文件系统"
  - "限定范围的语义检索"
  - "L0、L1、L2 分层加载"
  - "可编辑的 Markdown 记忆"
faq:
  - q: "OpenViking 怎么安装到 DeepSeek Harness？"
    a: "macOS 和 Linux 运行 `curl -fsSL https://openviking.ai/install | bash`，选择 DSH。Windows 先写好 `~/.openviking/ovcli.conf`（填服务器地址和 Key），再在 DSH 桌面端的插件页面添加 `@openviking/dsh-memory-plugin`。"
  - q: "OpenViking 需要单独的服务器吗？"
    a: "需要。插件要连接一个 OpenViking 服务器：可以自己部署（需要 uv、Python 3.10 以上，以及向量模型和多模态模型），也可以用火山引擎的 OpenViking Cloud 或其他地址。"
  - q: "怎么确认 OpenViking 的记忆在 DSH 里生效了？"
    a: "启动 `dsh --profile web` 并打开一个对话，开头应该有 OpenViking 注入的上下文，模型也能用 `mcp__openviking__*` 工具。问一个之前会话里说过的事情，看它能否回忆起来。"
  - q: "为 CLI 装好 OpenViking 后，DSH 桌面端为什么看不到？"
    a: "桌面端的插件放在自己的 `desktop` profile，和命令行的 `web` profile 是分开的，需要单独为桌面端安装。两者读取同一个 `~/.openviking/ovcli.conf`。"
  - q: "OpenViking 应该用哪个 API Key？"
    a: "用你在服务器上创建的用户 Key。root Key 不能读写记忆。服务器关闭了认证的话，Key 传空即可。"
  - q: "OpenViking 为什么找不到我刚说过的话？"
    a: "记忆是在后台处理的，刚说完可能还检索不到。过一会儿在新会话里再问一次。"
---

## OpenViking 是做什么的？

OpenViking 是火山引擎开源的上下文数据库，它的 DSH 插件让 DeepSeek Harness 拥有跨会话的长期记忆。今天告诉 Agent 一个偏好，下周它还记得，因为对话会被归档，并整理成记忆存到 OpenViking 服务器上。

它和常见的 Agent 记忆最大的不同是透明。OpenViking 不把一切都藏进向量里，而是把知识、记忆和技能组织成 `viking://` 地址下的虚拟文件系统。Agent 用 `ls`、`tree`、`read`、`grep` 这类文件操作来浏览，你也可以自己打开、修改、合并这些记忆，因为它们就是普通的 Markdown。

DSH 的接入方式是插件加 MCP 服务：每次对话开始时注入相关上下文，模型在需要时还能用 `mcp__openviking__*` 工具继续检索和读取。

## OpenViking 核心功能

- **跨会话记忆**：提交的会话会被归档，记忆在后台自动提取。
- **虚拟文件系统**：文档、代码、记忆和技能都有自己的 `viking://` 地址，可以浏览和编辑。
- **限定范围检索**：语义检索可以只在某个项目目录或记忆子树里进行。`find` 直接查询，`search` 会结合会话上下文规划检索。
- **分层加载**：先用 L0 摘要判断相关性，再看 L1 概览，必要时才读 L2 全文，提示词不会被塞满。
- **可编辑的记忆**：记忆就是 Markdown 文件，可以查看、修正、合并。
- **VikingBot**：可选组件，把原始资料整理成 Wiki、知识图谱或报告。

## 怎么安装和使用 OpenViking？

1. 准备一个 OpenViking 服务器：自己部署、用火山引擎的 OpenViking Cloud，或者连接已有的地址，并在上面创建一个用户 Key。
2. macOS 或 Linux 上运行安装脚本，按提示选择 DSH（macOS 还可以选 DSH 桌面端）：

   ```bash
   curl -fsSL https://openviking.ai/install | bash
   ```

   安装脚本需要 Node.js 18 以上和 curl，连接信息保存在 `~/.openviking/ovcli.conf`。

3. Windows 上手动创建 `%USERPROFILE%\.openviking\ovcli.conf`，填入服务器信息：

   ```json
   { "url": "https://<你的 OpenViking 服务器>", "api_key": "<你的 API Key>" }
   ```

   然后在 DSH 桌面端打开「插件 → 添加插件」，输入 `@openviking/dsh-memory-plugin` 并安装。

4. 启动 `dsh --profile web`，或者重新打开桌面端，开始一个新对话。
5. 让 Agent 记住一个偏好，过一阵子在新会话里问它。

## OpenViking 报错怎么排查？

- **DSH 里没有任何记忆**：看对话开头有没有 OpenViking 注入的上下文、有没有 `mcp__openviking__*` 工具。没有的话，确认插件装在你正在用的 profile 里。
- **桌面端看不到插件**：桌面端用的是 `~/.dsh/profiles/desktop`，和 `web` profile 分开。安装前要完全退出桌面端（macOS 按 ⌘Q），装完再打开；插件开关是关着的话，把它打开。
- **认证失败**：要用用户 Key，不能用 root Key。本机 `http://127.0.0.1:1933` 上没开认证的服务器，不需要 Key。
- **MCP 工具行为异常**：启动 DSH 前设置 `OPENVIKING_DEBUG=1` 和 `OPENVIKING_DEBUG_LOG=/tmp/ov-dsh.log`，然后查看这个日志文件。
- **刚说的内容检索不到**：记忆提取在后台进行，稍等一会儿，在新会话里再问。

反馈问题时，请附上插件版本、DSH 版本、服务器类型和相关的调试日志，记得去掉 Key。
