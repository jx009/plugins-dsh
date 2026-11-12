---
title: "检索文档、执行知识任务并维护 Wiki"
description: "WeKnora 在共享知识库上提供文档检索问答、多步智能体任务和 Wiki 管理，支持数据源同步与私有化部署，并提供 DSH 包及内置 MCP 服务。"
summary: "在同一套知识库上完成带引用的问答、多步智能体任务和 Wiki 整理。仓库列出了 DSH 包，并提供供 AI 工具访问的内置 MCP 服务。"
highlights:
  - "结合混合检索、多模态文档解析和引用信息进行 RAG 问答"
  - "通过技能、持久化沙箱和外部 MCP 工具执行智能体任务"
  - "使用知识图谱与回滚功能组织 Wiki"
  - "自动同步 Notion、Confluence、GitLab、飞书等来源的内容"
  - "支持本地或私有云部署，可配置模型、向量数据库和存储后端"
faq:
  - q: "WeKnora 与 DSH 有什么关联？"
    a: "README 列出了 npm 包 @wxg-prc-cpg/dsh-weknora，也介绍了供 AI 工具访问的内置 MCP 服务。所提供的片段未说明 DSH 包的具体命令或配置方式。"
  - q: "RAG、智能体和 Wiki 需要分别建立知识库吗？"
    a: "这三种模式使用同一套知识库，分别用于信息检索、多步任务和知识组织。"
  - q: "能否部署在自己的环境中？"
    a: "README 支持本地和私有云部署，包括 Docker 与 Kubernetes 方式。模型、向量数据库和存储后端均可按需选择。"
---

## WeKnora 是做什么的？

WeKnora 是面向文档理解、检索和推理的开源知识平台。团队可以在同一套知识库上使用三种模式：通过 RAG 查询文档答案，让智能体执行多步任务，以及将资料整理为 Wiki。

对于 DSH 用户，README 列出了 npm 包 `@wxg-prc-cpg/dsh-weknora`。平台还提供内置 MCP 服务，供 AI 工具访问。

## 核心功能

- 使用混合检索和引用信息进行问答，支持 PDF、Word、图片、Excel、XMind 等文档格式的解析。
- 在会话内持久化的 Docker、E2B 或 Cube 沙箱中运行智能体技能，并连接外部 MCP 服务，按工具启用能力。
- 将文档组织为 Wiki，支持知识图谱和回滚。
- 从飞书、Confluence、GitLab、Notion、语雀及 RSS 等来源同步内容；上传文件夹时保留目录结构。
- 通过工作区角色、资源归属和审计日志管理访问，并使用 Langfuse 跟踪智能体步骤、Token 用量和处理流程。

## 怎么使用 WeKnora

先选择运行方式：使用微信对话开放平台、通过腾讯云 Lighthouse 模板部署，或在自己的环境中使用 Docker、Kubernetes。自托管时需配置模型、存储和网络，再导入文档或连接支持的数据源。

查询文档内容时使用 RAG，需要执行多步任务时使用智能体，整理知识时使用 Wiki。

README 已列出 DSH 包 `@wxg-prc-cpg/dsh-weknora`，但所提供的片段没有包含连接配置或使用命令。这些细节需查阅对应包的文档。
