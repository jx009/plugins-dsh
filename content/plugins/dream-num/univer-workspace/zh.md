---
title: "univer-workspace：DSH Office 协作"
description: "univer-workspace 是一个面向 Office 内容协作与审阅的 DSH 插件。了解安装入口、MCP 连接配置、智能体文档使用方法和编辑权限报错排查。"
summary: "把智能体生成的表格、文档和演示稿放进可协作、可审阅的工作区。通过基于 DSH 的 Workspace Agent 对话处理内容，在独立 Worktree 中检查修改，再由人决定合并。"
highlights:
  - "表格文档演示稿协作"
  - "独立工作树变更审阅"
  - "MCP 远程连接"
  - "单元格驱动仪表盘"
  - "自托管存储与权限"
faq:
  - q: "univer-workspace DSH 插件怎么安装？"
    a: "提供的 README 将 Workspace Agent 定义为基于 DSH 的本地应用，安装入口是 apps/agent/README.md。当前资料没有给出 DSH 插件安装命令，也未确认 npm 包名，因此不能直接生成安装命令。"
  - q: "univer-workspace 可以连接自托管服务吗？"
    a: "Workspace Agent 和 CLI 都能连接已有部署，也能使用本地启动的服务。通过 MCP 接入时，将地址设为 https://&lt;your-workspace>/mcp，传输方式使用 Streamable HTTP。"
  - q: "univer-workspace 为什么能查看文件却不能编辑？"
    a: "space.univer.ai 当前只向受邀账号开放编辑工具，包括 execute、inspect、导入和导出。所有账号都可以浏览、搜索及管理议题和拉取请求，因此能查看内容不代表已获得编辑能力。"
  - q: "univer-workspace 怎么审阅智能体修改？"
    a: "智能体先在独立 Worktree 中完成修改和验证，再交给人审阅。修改可以进行多轮而不改变主干，人也能继续编辑工作区内容。"
  - q: "univer-workspace MCP 不支持 OAuth 的客户端怎么连接？"
    a: "可以在 Workspace 账号菜单的 Access tokens 中创建个人访问令牌。客户端通过 Authorization: Bearer &lt;token> 请求头发送该令牌。"
---

## univer-workspace 是做什么的？

univer-workspace 是一个面向 Office 内容协作与审阅的 DSH 插件，其接入载体是基于 DeepSeek Harness 的本地 Workspace Agent 应用。它帮助开发者和团队管理智能体生成的内容，把修改、验证和人工审阅放在同一工作区。对于寻找 DeepSeek Harness 插件的用户，需要注意：当前资料介绍的是工作区及 Agent 应用，没有提供独立 npm 插件的安装说明。

项目基于 Univer Office SDK，将 Sheets、Docs、Slides、关系表和画布连接起来。浏览器、Agent 与 CLI 共用 Workspace Server，由服务端管理文档存储和权限。Agent 引用的本地文件位于运行它的机器上，工作区文档则保存在所连接的服务中。

## univer-workspace 核心功能

- **Office 协同编辑**：支持表格、文档、演示稿、Base 和 Board，可通过个人空间与团队空间整理内容，并按角色和节点控制访问。
- **Worktree 变更审阅**：智能体在独立工作树中修改和验证，多轮操作不改变主干。结果交给人审阅，用户可以继续编辑并决定合并内容。
- **MCP 远程连接**：助手能够查找文件、创建拉取请求、修改 Office 内容并回读结果，最后提交到浏览器审阅。默认开放 `core` 工具集。
- **表格驱动的小应用**：仪表盘和交互报告的指标、图表、控件可以绑定单元格，支持数据读取、写入及协同更新。
- **内容检查能力**：智能体可检查数据、渲染截图与 PDF、运行布局检查，并离线发现与版本匹配的 Skills 和 API。

## 怎么安装和使用 univer-workspace？

提供的 README 没有 DSH 安装命令，仓库信息也未确认 npm 包名，因此这里没有可直接复制的插件安装命令。Agent 的安装与首次使用入口是 `apps/agent/README.md`，CLI 说明位于 `apps/cli/README.md`。

1. 选择入口：直接编辑和整理空间用 Workspace Browser；围绕文档对话、引用文件和审阅变更用 Agent；脚本自动化用 CLI。后两者都能连接已有部署或本地服务。
2. 使用远程助手时，在客户端 MCP 配置中填写 `https://space.univer.ai/mcp`，传输方式选择 Streamable HTTP。自托管服务使用 `https://<your-workspace>/mcp`，这种连接方式无需在本机安装 Workspace。
3. 通过浏览器完成 OAuth 登录，检查 `read`、`write`、`publish` 和 `worktree:merge` 授权，取消不希望授予的权限。
4. 需要文件类工具时，在地址后添加 `?toolsets=core,files`，可使用 Blob、Asset、Markdown、Typst、SVG 和 HTML View 工具。仓库及标签管理使用 `admin`，全部工具使用 `all`。
5. 让助手定位文档、提出修改并回读结果，再到浏览器审阅拉取请求，确认后合并。

## univer-workspace 报错怎么排查？

能浏览却不能编辑时，先确认账号资格。托管站点当前仅向受邀账号开放 `execute`、`inspect`、导入和导出；普通账号仍能搜索及管理议题、拉取请求。

客户端无法使用 OAuth 时，可在账号菜单的 Access tokens 中创建个人访问令牌，通过 `Authorization: Bearer <token>` 发送。Claude Code 配置该请求头后会跳过 OAuth，不要同时设置两种认证方式。

若问题发生在 DSH 加载阶段，可检查当前 profile、相关集成是否启用，重启后查看版本与日志。这些是通用检查步骤；所给资料没有列出专用错误码或插件配置路径。
