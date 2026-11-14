---
title: "WeKnora：给 DSH 接入企业知识库"
description: "WeKnora 是一个 RAG 知识库平台，它的官方 DSH 插件让 DeepSeek Harness 能检索你的文档并给出引用。了解安装配置方法和常见问题排查。"
summary: "基于同一套知识库提供带引用的问答、Agent 任务和 Wiki 整理。仓库提供 DSH 插件包，还内置供 AI 工具调用的 MCP 服务。"
highlights:
  - "官方 DSH 插件，提供四个知识库工具"
  - "混合检索并标注引用"
  - "带沙箱和 MCP 工具的 Agent"
  - "自动维护的 Wiki 和知识图谱"
  - "同步飞书、Confluence、GitLab、Notion"
faq:
  - q: "WeKnora 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora`，启动 `dsh web` 前设置 `WEKNORA_BASE_URL` 和 `WEKNORA_API_KEY`。另外需要一个正在运行的 WeKnora 实例供插件连接。"
  - q: "WeKnora 的 DSH 插件提供哪些工具？"
    a: "四个：`weknora_list_knowledge_bases` 列出知识库，`weknora_search` 返回排序后的段落，`weknora_read_document` 按顺序读取整篇文档，`weknora_ask` 获取 WeKnora 自己生成的带引用回答。"
  - q: "WeKnora 插件需要什么权限的 API Key？"
    a: "搜索和读取需要 `retrieve` 权限；要用 `weknora_ask`，还需要 `chat` 权限。"
  - q: "一个 DSH profile 能连两套 WeKnora 吗？"
    a: "能。在 profile 的 `cordis.patch.yml` 里加两行插件配置，各自填 `baseUrl`，并设置不同的 `toolPrefix`，比如 `internal_kb` 和 `public_kb`。"
  - q: "WeKnora 怎么自己部署？"
    a: "克隆仓库，把 `.env.example` 复制成 `.env`，再运行 `docker compose pull` 和 `docker compose up -d`。网页界面在 `http://localhost`，接口在 `http://localhost:8080`。"
  - q: "DSH 为什么需要 WeKnora 来搜文档？"
    a: "DSH 本身没有检索、向量化和知识库能力，它的搜索工具只能读工作区和网页。WeKnora 插件补上了企业内部文档这一块。"
---

## WeKnora 是做什么的？

WeKnora 是腾讯开源的知识库平台，它的官方 DSH 插件让 DeepSeek Harness 可以访问团队的文档。DSH 能搜工作区文件和网页，但自己没有知识库；接上 WeKnora 之后，Agent 可以检索内部文档、读完整篇内容，并带着引用回答问题。

在平台这一侧，WeKnora 把原始文档变成可检索的知识库。同一套知识库支持三种用法：用 RAG 快速得到带引用的答案，用 Agent 完成带技能和沙箱的多步任务，用自动 Wiki 把资料整理成页面和知识图谱。

WeKnora 可以通过微信对话开放平台在线使用，可以用腾讯云模板部署，也可以用 Docker 或 Kubernetes 自己运行，模型、向量数据库和存储都能自选。

## WeKnora 核心功能

- **DSH 插件**：`@wxg-prc-cpg/dsh-weknora` 提供四个工具，分别用于列出知识库、检索段落、读取整篇文档，以及让 WeKnora 生成完整回答。
- **混合检索**：关键词加向量检索，带重排和引用，支持 PDF、Word、Excel、图片、XMind 等格式。
- **Agent 与沙箱**：在会话级持久的 Docker、E2B 或 Cube 沙箱里运行技能，可以接入外部 MCP 服务并逐个启用工具。
- **自动 Wiki**：文档会被整理成 Wiki 页面，用知识图谱串起来，支持修订和回滚。
- **数据源同步**：从飞书、Confluence、GitLab、Notion、语雀、RSS 等同步，上传的文件夹保留原有目录结构。
- **权限与追踪**：工作区角色、资源归属、审计日志，用 Langfuse 追踪 Agent 步骤和 token 用量。

## 怎么安装和使用 WeKnora？

1. 先运行 WeKnora，或者使用已有的实例。本地部署：

   ```bash
   git clone https://github.com/Tencent/WeKnora.git
   cd WeKnora
   cp .env.example .env
   docker compose pull
   docker compose up -d
   ```

   打开 `http://localhost`，按引导完成初始化并创建知识库。

2. 把插件装进你的 DSH profile：

   ```bash
   dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora
   ```

3. 指定 WeKnora 地址并启动 DSH：

   ```bash
   export WEKNORA_BASE_URL=http://localhost:8080
   export WEKNORA_API_KEY=sk-...
   dsh web
   ```

4. 问 Agent 一个文档里有答案的问题，比如“按产品文档，退款流程是怎么审批的？”。它会检索 WeKnora，并标出引用的段落。

需要更细的配置，比如默认知识库、超时时间或者自定义的 WeKnora Agent，在 `cordis.patch.yml` 里覆盖插件那一行的配置。

## WeKnora 报错怎么排查？

- **插件加载失败**：配置有误时，加载会直接停下并列出每一处问题。检查字段名，另外注意补丁会替换整个 `config`，要保留的字段都得重新写上。
- **检索报权限错误**：API Key 需要 `retrieve` 权限，`weknora_ask` 还需要 `chat` 权限。
- **Agent 连不上 WeKnora**：检查 `WEKNORA_BASE_URL`。默认的 Docker 部署里，接口地址是 `http://localhost:8080`，不是网页界面的地址。
- **回答超时**：在插件配置里调大 `requestTimeoutMs` 或 `chatTimeoutMs`，生成完整回答比单纯检索慢。
- **找不到本地 Ollama 模型**：先运行 `ollama serve` 再启动 WeKnora，并对照配置文档检查向量模型名称和 `OLLAMA_BASE_URL`。

反馈问题时，请附上 WeKnora 版本、插件版本、部署方式和出错的那次工具调用。
