---
title: "Search documents, run knowledge tasks, and maintain a wiki"
description: "WeKnora combines document RAG, multi-step agents, and wiki management on shared knowledge bases, with a DSH package and self-hosted deployment options."
summary: "Use shared knowledge bases for cited answers, agent tasks, and wiki organization. The repository lists a DSH package and a built-in MCP server for access from AI tools."
highlights:
  - "RAG with hybrid retrieval, multimodal document parsing, and citations"
  - "Agent tasks with skills, persistent sandboxes, and external MCP tools"
  - "Wiki organization with a knowledge graph and rollback"
  - "Automatic synchronization from sources including Notion, Confluence, GitLab, and Feishu"
  - "Local or private-cloud deployment with configurable models, vector databases, and storage"
faq:
  - q: "How is WeKnora relevant to DSH?"
    a: "The README identifies the npm package @wxg-prc-cpg/dsh-weknora. It also describes a built-in MCP server for AI tools. The supplied excerpt does not specify the DSH package's commands or configuration."
  - q: "Do RAG, agents, and the wiki use separate knowledge bases?"
    a: "All three modes operate on the same knowledge bases, supporting retrieval, multi-step work, and knowledge organization."
  - q: "Can I run it in my own environment?"
    a: "The README supports local and private-cloud deployment, including Docker and Kubernetes. Models, vector databases, and storage backends can be selected independently."
---

## What does WeKnora do?

WeKnora is an open-source knowledge platform for document understanding, retrieval, and reasoning. It gives teams three ways to work with the same knowledge bases: retrieve answers through RAG, carry out multi-step agent tasks, and organize material into a wiki.

For DSH users, the README lists the npm package `@wxg-prc-cpg/dsh-weknora`. The platform also exposes a built-in MCP server for access from AI tools.

## Core features

- Retrieve information with hybrid search and citations, using document parsing that covers PDF, Word, images, Excel, XMind, and other formats.
- Run agent skills in session-persistent Docker, E2B, or Cube sandboxes, and connect external MCP services with tools enabled individually.
- Organize documents into a wiki with a knowledge graph and rollback support.
- Synchronize knowledge from services such as Feishu, Confluence, GitLab, Notion, Yuque, and RSS. Uploaded folders retain their directory structure.
- Manage access through workspace roles, resource ownership, and audit logs, with Langfuse tracing for agent steps, token usage, and pipelines.

## How to use WeKnora

Choose a deployment route: the online WeChat Dialog platform, a Tencent Cloud Lighthouse template, or a self-hosted Docker or Kubernetes environment. For self-hosting, configure models, storage, and networking, then add documents or connect supported data sources.

Use RAG for document questions, the agent for multi-step tasks, and the wiki for organizing knowledge.

The README identifies the DSH package `@wxg-prc-cpg/dsh-weknora`, but the supplied excerpt does not include its connection settings or usage commands. Consult the package documentation for those details.
