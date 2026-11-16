---
title: "SAG: Traceable Knowledge for DSH"
description: "SAG is a knowledge base with MCP and API access for agents. Learn how to install the app, use cited search, and check DSH integration requirements."
summary: "Turn documents and web sources into searchable knowledge with source tracing and cited answers. MCP and API interfaces make the same knowledge available to agent applications."
highlights:
  - "MCP and REST API access"
  - "Event and entity indexing"
  - "Fast and precise retrieval modes"
  - "Source tracing to original chunks"
  - "Agent answers with clickable citations"
faq:
  - q: "Can I install SAG as a DSH plugin?"
    a: "The supplied README describes a standalone knowledge base with MCP and API interfaces, rather than a packaged DSH plugin. It provides no DSH installation command or DSH-specific connection configuration."
  - q: "Does SAG require Python or an external database?"
    a: "The desktop app includes its workspace and local backend, so users do not need to install Python, Node.js, or a database. Its local-first storage starts with SQLite and LanceDB."
  - q: "Which search modes does SAG support?"
    a: "SAG offers Fast retrieval through `vector` or `multi_es_fast`, Precise retrieval through `multi`, and optional JEV reranking through `multi_jev`. Searches can cover multiple sources or be limited to a selected source."
  - q: "Can SAG show where an answer came from?"
    a: "Retrieval results remain linked to their original document chunks. Agent chat also supplies clickable citations so you can inspect the supporting text."
  - q: "What happens to old knowledge data when SAG upgrades?"
    a: "For incompatible legacy data, SAG waits for confirmation before creating a backup and a fresh workspace. It preserves accounts and model settings, but documents must be uploaded again because the old knowledge base is not automatically migrated."
---

## What does SAG do?

SAG is a local-first knowledge base that exposes document retrieval to agents through MCP and APIs. For DeepSeek Harness users looking for a DSH plugin for knowledge search, it is a relevant integration candidate; the supplied README does not document a native plugin package or a harness-specific setup. It helps developers turn scattered files and web sources into searchable evidence that remains connected to its origin.

The application handles document parsing, chunking, embedding, and event/entity extraction. Users can search the resulting knowledge, inspect associations, or ask an agent questions grounded in selected sources. Its default storage uses SQLite and LanceDB without requiring an external database, and the product is designed for a single user.

## SAG core features

- **Event and entity indexing:** Each chunk produces a semantically complete event and multiple indexing entities. At query time, SQL joins connect events through shared entities to construct relevant dynamic hyperedges.
- **Vector search and precise retrieval:** Fast modes use `vector` or `multi_es_fast`; Precise mode uses `multi`. Optional JEV reranking is available through `multi_jev`, and searches can span sources or target a particular source.
- **Source tracing and cited answers:** Search results lead back to original chunks. Multi-turn agent chat uses selected sources and provides clickable citations for checking evidence.
- **Knowledge graph inspection:** Users can inspect events, entities, and their associations. New chunks add their own records and links without requiring a global graph rebuild.
- **MCP and API integration:** The project exposes self-hosted REST/OpenAPI, OpenAI-compatible chat, MCP, and the `zleap-sag` Python package. These are documented integration surfaces; a DSH connector configuration is not included in the supplied excerpt.

## How to install and use SAG

No DSH installation command is available in the supplied README, and no npm package has been confirmed. The Docker quick-start command is also truncated, so it cannot be reproduced as a working installation procedure here.

1. Download the appropriate desktop installer from the repository's GitHub Releases. macOS 15 or later on Apple Silicon uses `SAG-*-mac-arm64.dmg`; Windows 10/11 on x64 uses `SAG-Setup-*-win-x64.exe`.
2. Install and open the bundled workspace. The desktop distribution includes the local knowledge backend, so separate Python, Node.js, and database installations are unnecessary.
3. Upload documents or add web sources. SAG processes content into chunks, embeddings, events, and entities for retrieval.
4. Choose the sources to search and select a retrieval mode. Open a result's original chunk to check its context, or use agent chat for an answer with citations.
5. For external agent access, consult the full integration documentation for the chosen MCP or API interface. The excerpt does not specify connection addresses, authentication settings, model configuration locations, or DSH configuration fields.

For self-hosting, the documented prerequisite is Docker Desktop or Docker Engine with Compose v2. Use the complete repository guide for the remaining deployment steps.

## How to troubleshoot SAG

Windows may display an unknown-publisher warning because the desktop installer is currently unsigned. The README identifies this limitation and notes that releases include `SHA256SUMS.txt` checksums. In-app updates on both supported platforms require separate download and installation confirmation.

If incompatible legacy knowledge data is detected, review the backup and fresh-workspace confirmation. SAG leaves the old data unchanged until confirmation, preserves accounts and model settings, and requires documents to be uploaded again. Earlier knowledge bases, agents, conversations, and related tasks do not appear in the fresh workspace; the backup remains available for manual recovery.

For a separately configured DSH integration that does not appear, check the active profile, confirm the relevant integration is enabled, restart the harness, and inspect versions and logs. These are general checks, not a documented SAG-specific error remedy.
