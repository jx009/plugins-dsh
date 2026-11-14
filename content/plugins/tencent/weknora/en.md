---
title: "WeKnora: Knowledge Base Search for DSH"
description: "WeKnora is a RAG knowledge platform whose official DSH plugin lets DeepSeek Harness search your documents with citations. Learn to install and configure it."
summary: "Use shared knowledge bases for cited answers, agent tasks, and wiki organization. The repository lists a DSH package and a built-in MCP server for access from AI tools."
highlights:
  - "Official DSH plugin with four knowledge tools"
  - "Hybrid retrieval with citations"
  - "Agents with sandboxes and MCP tools"
  - "Self-maintaining wiki and knowledge graph"
  - "Sync from Notion, Confluence, GitLab and Feishu"
faq:
  - q: "How do I install WeKnora in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora`, then set `WEKNORA_BASE_URL` and `WEKNORA_API_KEY` before starting `dsh web`. You also need a running WeKnora deployment for the plugin to connect to."
  - q: "What tools does the WeKnora DSH plugin add?"
    a: "Four: `weknora_list_knowledge_bases`, `weknora_search` for ranked passages, `weknora_read_document` for a whole document in order, and `weknora_ask` for WeKnora's own cited answer."
  - q: "What API key permissions does the WeKnora plugin need?"
    a: "A WeKnora API key with the `retrieve` permission for search and reading, plus `chat` if you want the `weknora_ask` tool."
  - q: "Can I connect two WeKnora deployments to one DSH profile?"
    a: "Yes. Add two plugin rows in the profile's `cordis.patch.yml`, each with its own `baseUrl` and a different `toolPrefix`, such as `internal_kb` and `public_kb`."
  - q: "How do I run WeKnora myself?"
    a: "Clone the repository, copy `.env.example` to `.env`, then run `docker compose pull` and `docker compose up -d`. The web UI opens at `http://localhost` and the API at `http://localhost:8080`."
  - q: "Why does DSH need WeKnora for document search?"
    a: "DSH has no retrieval, embedding or knowledge-base feature of its own; its search tools read the workspace and the web. The WeKnora plugin adds your organization's documents."
---

## What does WeKnora do?

WeKnora is an open-source knowledge platform from Tencent, and its official DSH plugin gives DeepSeek Harness access to your team's documents. DSH can search your workspace files and the web, but it has no knowledge base of its own; with WeKnora connected, the agent can search internal docs, read whole documents and quote them with citations.

On the platform side, WeKnora turns raw documents into a searchable knowledge base. The same knowledge bases serve three modes: RAG for quick cited answers, an agent for multi-step tasks with skills and sandboxes, and an automatic wiki that organizes material into pages and a knowledge graph.

You can use WeKnora online through the WeChat Dialog platform, deploy it from a Tencent Cloud template, or run it yourself with Docker or Kubernetes, choosing your own models, vector database and storage.

## WeKnora core features

- **DSH plugin**: `@wxg-prc-cpg/dsh-weknora` adds four tools for listing knowledge bases, searching passages, reading full documents and asking WeKnora for a composed answer.
- **Hybrid retrieval**: keyword and vector search with reranking and citations, over PDF, Word, Excel, images, XMind and more.
- **Agents and sandboxes**: run skills in session-persistent Docker, E2B or Cube sandboxes, and connect external MCP services with per-tool switches.
- **Automatic wiki**: documents become wiki pages linked in a knowledge graph, with revisions and rollback.
- **Data sources**: sync from Feishu, Confluence, GitLab, Notion, Yuque, RSS and others; uploaded folders keep their structure.
- **Governance and tracing**: workspace roles, ownership, audit logs and Langfuse tracing of agent steps and token usage.

## How to install and use WeKnora

1. Run WeKnora, or use an existing deployment. For a local setup:

   ```bash
   git clone https://github.com/Tencent/WeKnora.git
   cd WeKnora
   cp .env.example .env
   docker compose pull
   docker compose up -d
   ```

   Open `http://localhost`, follow the onboarding guide and create a knowledge base.

2. Install the plugin into your DSH profile:

   ```bash
   dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora
   ```

3. Point it at your deployment and start DSH:

   ```bash
   export WEKNORA_BASE_URL=http://localhost:8080
   export WEKNORA_API_KEY=sk-...
   dsh web
   ```

4. Ask the agent something your documents answer, for example "according to our product docs, how is the refund flow approved?". It searches WeKnora and cites the passages it used.

For finer control, such as default knowledge bases, timeouts or a custom WeKnora agent, override the plugin row in `cordis.patch.yml`.

## How to troubleshoot WeKnora

- **The plugin fails to load.** Invalid configuration stops the load with a message naming each problem. Check the field names, and remember that a patch replaces the whole `config`, so restate every field you keep.
- **Search returns permission errors.** The API key needs the `retrieve` permission; `weknora_ask` also needs `chat`.
- **The agent cannot reach WeKnora.** Check `WEKNORA_BASE_URL`; with the default Docker setup the API is at `http://localhost:8080`, not the web UI address.
- **Answers time out.** Raise `requestTimeoutMs` or `chatTimeoutMs` in the plugin config; composed answers can take longer than searches.
- **Local Ollama models are not found.** Start `ollama serve` before WeKnora and check the embedding model name and `OLLAMA_BASE_URL` in the configuration guide.

When reporting an issue, include the WeKnora version, plugin version, deployment type and the tool call that failed.
