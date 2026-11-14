---
title: "Reactive Resume：DSH 可调用的简历工具"
description: "Reactive Resume 是一个带 MCP 服务的免费简历工具，DSH 的 Agent 可以用它修改简历、跟踪求职进度。了解接入方法和登录问题排查。"
summary: "编写和定制简历与求职信，对照岗位要求检查内容，管理求职进度。支持多种格式导出和自托管。"
highlights:
  - "实时 PDF 预览，18 套模板"
  - "岗位关键词与 ATS 检查"
  - "求职信与求职进度追踪"
  - "MCP 服务和 REST API"
  - "可自托管，无追踪无广告"
faq:
  - q: "DeepSeek Harness 怎么使用 Reactive Resume？"
    a: "Reactive Resume 在实例地址后加 `/mcp` 提供 MCP 服务，官方站点是 `https://rxresu.me/mcp`。在 DSH 里把它添加为远程 MCP 服务，用 OAuth 或 API Key 登录。"
  - q: "Agent 怎么通过 Reactive Resume 的 MCP 服务认证？"
    a: "推荐用 OAuth：在浏览器里批准客户端，不用复制任何密钥。不支持 OAuth 的客户端可以在 `x-api-key` 请求头里带 API Key，Key 在「设置 → Developer」里创建。"
  - q: "Agent 通过 Reactive Resume 能做什么？"
    a: "用自然语言读取和修改简历、求职信和求职记录，还能通过同一套 MCP 工具和 REST API 导入、导出和检查文档。"
  - q: "Reactive Resume 能导出哪些格式？"
    a: "简历和求职信可以导出为 PDF、Word（DOCX）、Markdown 或 JSON，也能生成公开链接分享，可选密码保护并查看浏览统计。"
  - q: "Reactive Resume 能自己部署吗？"
    a: "能。支持 Docker、Kubernetes、Vercel、Cloudflare Workers，以及 Hostinger 一键部署，需要 PostgreSQL 和上传文件的存储。项目采用 MIT 协议。"
  - q: "Reactive Resume 有 Agent 技能吗？"
    a: "有。项目发布了 32 个面向简历写作和求职的 Agent 技能，覆盖初稿、校对、转行、求职信、面试和 offer 选择等场景。"
---

## Reactive Resume 是做什么的？

Reactive Resume 是一个免费开源的简历工具，自带 MCP 服务，所以 DSH 里的 Agent 可以按你的自然语言要求，读取和修改你的简历、求职信和求职记录。它把简历编辑、文档检查和求职进度追踪放进同一个应用，可以在线用，也可以自己部署。

你可以导入已有的简历或者从零开始，在实时 PDF 预览旁边直接修改内容，投递前再对照岗位要求检查一遍。保存的职位会接入一个追踪器，记录阶段、联系人、面试和跟进事项。

面向 Agent，项目提供了 REST API、MCP 服务和一组 Agent 技能。仓库标注了 DSH 插件标签，DeepSeek Harness 可以和其他 MCP 客户端一样接入它。

## Reactive Resume 核心功能

- **编辑器**：所见即所得编辑，实时 PDF 预览，富文本、自定义栏目、拖拽排序、自动保存和版本记录。
- **排版设计**：18 套模板，可以调整字体、颜色、间距、纸张大小和自定义样式。
- **内容检查**：可读性提示、岗位关键词匹配，还能看到招聘系统从你的 PDF 里读到的文字。
- **文档库**：简历和求职信统一管理，支持标签和版本恢复。
- **求职追踪**：列表、看板、统计和日历几种视图，管理申请、面试和联系人。
- **导出与分享**：导出 PDF、Word、Markdown、JSON，生成可设密码的公开链接。
- **集成**：REST API、MCP 服务，以及 32 个简历和求职相关的 Agent 技能。

## 怎么安装和使用 Reactive Resume？

1. 在 `rxresu.me` 注册账号，或者用 Docker 自己部署。
2. 导入简历或新建文档，选一个模板，对着预览编辑。
3. 要让 DSH 的 Agent 操作你的文档，在「设置 → Developer」里找到 MCP 服务地址，官方站点是：

   ```text
   https://rxresu.me/mcp
   ```

4. 在 DeepSeek Harness 里把它添加为远程 MCP 服务。按提示用 OAuth 登录，或者在「设置 → Developer」里创建 API Key，放在 `x-api-key` 请求头里。
5. 给 Agent 布置任务，比如“按这份岗位描述改写我的后端简历，再起草一封求职信”。

自己部署的实例，用你自己的地址加上 `/mcp`。

## Reactive Resume 报错怎么排查？

- **MCP 客户端连不上**：服务使用 Streamable HTTP。如果你的客户端只支持本地服务，用 `mcp-remote` 桥接。另外确认地址以 `/mcp` 结尾。
- **用 API Key 认证失败**：Key 要放在 `x-api-key` 请求头里，并且要在你正在连接的那个实例的「设置 → Developer」里创建。
- **自己部署后起不来**：在 `.env` 里同时设置 `AUTH_SECRET` 和另一个独立的 `ENCRYPTION_SECRET`（可以用 `openssl rand -hex 32` 生成），并确认 PostgreSQL 和存储服务都在运行。
- **从 v5 升级后集成失效**：v6 修改了 API 和 MCP 集成，旧的样式规则也要手动转换。先备份数据库和上传文件，再按「Migrating from v5」指南操作。
- **AI 功能没反应**：AI 是可选功能，需要你自己连接一个服务商，产生的费用由服务商收取。

反馈问题时，请说明用的是官方站点还是自己部署的版本，以及 MCP 客户端和报错信息。
