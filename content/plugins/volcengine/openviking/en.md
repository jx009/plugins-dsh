---
title: "Organize agent memory, knowledge, and skills as files"
description: "OpenViking stores agent memory, knowledge, and skills in a browsable virtual filesystem, with layered summaries, scoped search, and session archives."
summary: "A context database that organizes agent knowledge, memories, and skills under viking:// URIs. Inspect stored context, search specific subtrees, and extract editable memories from sessions."
highlights:
  - "Browse and edit agent context through a virtual filesystem"
  - "Scope semantic retrieval to a project directory or memory subtree"
  - "Read L0 abstracts and L1 overviews before loading full L2 content"
  - "Archive committed sessions and extract memories as editable Markdown"
  - "Compile source material into wikis, knowledge graphs, or reports with VikingBot enabled"
faq:
  - q: "How is context organized?"
    a: "Documents, code, memories, and skills have viking:// URIs within a virtual filesystem. Agents can navigate this context using operations such as ls, tree, read, write, and grep."
  - q: "What is the difference between find and search?"
    a: "find executes a query directly, while search uses session context to plan retrieval. Semantic queries can be scoped to a directory or subtree."
  - q: "What happens when a session is committed?"
    a: "The conversation is archived, and memories are extracted into Markdown that can be inspected, edited, and merged."
  - q: "Is a DSH installation command available?"
    a: "The supplied README excerpt provides no DSH installation command, and the repository information does not identify an npm package. It does offer a browser-based Studio demo and references self-hosted Web Studio."
---

## What does OpenViking do?

OpenViking is an open-source context database for AI agents. It places knowledge, memories, and skills in a virtual filesystem addressed through `viking://` URIs. Developers can inspect and edit stored context, while agents can navigate it with file-style operations.

Resources can contain documents and code; memories capture preferences and experience; skills describe task procedures.

## Core features

- Browse context with operations including `ls`, `tree`, `read`, `write`, and `grep`.
- Limit semantic retrieval to a project directory or memory subtree. Use `find` for direct queries and `search` for retrieval planned from session context.
- Load context in stages: L0 abstracts for an initial relevance check, L1 overviews for more context, and L2 content for full details. Semantically processed directories carry generated summaries.
- Commit sessions to archive conversations and extract Markdown memories that can be inspected, edited, and merged.
- With VikingBot enabled, use `ov compile` to turn source material into a wiki, knowledge graph, or report.

## How to use OpenViking

The README offers a browser-based OpenViking Studio demo that requires no installation and points to separate instructions for self-hosting Web Studio.

When working with stored context, navigate to the relevant `viking://` directory, review its abstract or overview, and retrieve full content as needed. Scope searches to the relevant project or memory branch, and commit sessions to preserve conversations and extract memories.

The supplied excerpt does not document DSH installation steps or identify an npm package.
