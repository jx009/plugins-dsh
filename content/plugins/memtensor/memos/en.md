---
title: "MemOS: Persistent Memory for DSH"
description: "MemOS is a DSH plugin that adds persistent agent memory. Learn how to approach installation, choose local storage and troubleshoot missing recall."
summary: "Give DeepSeek Harness long-term memory with automatic recall, background capture and hybrid retrieval. A local Memory Viewer helps you inspect retained context."
highlights:
  - "Automatic context recall"
  - "Background memory capture"
  - "Hybrid memory retrieval"
  - "Local SQLite storage"
  - "Local Memory Viewer"
faq:
  - q: "How do I install MemOS in DeepSeek Harness?"
    a: "The README directs DSH users to its MemOS plugin section and describes local setup as npm installation followed by agent-specific configuration. The supplied excerpt does not include the DSH command or a confirmed npm package name, so use the complete plugin instructions rather than guessing a package."
  - q: "What does the MemOS DSH plugin remember automatically?"
    a: "The DSH integration recalls relevant context before a task and retains new experience after a successful turn. The excerpt does not specify detailed capture filters or configuration switches."
  - q: "Can MemOS store DSH memory locally?"
    a: "Yes. The local plugin entry point explicitly includes DeepSeek Harness and uses SQLite with data stored on your machine."
  - q: "Does MemOS require Neo4j and Qdrant for DSH?"
    a: "Not for the local plugin path, which uses SQLite and lists no separate infrastructure requirement. Neo4j and Qdrant belong to the self-hosted service setup described in the README."
  - q: "Does MemOS support both local and cloud plugins for DSH?"
    a: "The README announces both local and cloud plugin support for DeepSeek Harness. Its quick-start table explicitly lists DSH under the local plugin, while the supplied excerpt does not provide cloud plugin configuration instructions for DSH."
---

## What does MemOS do?

MemOS is a DSH plugin that adds persistent memory to DeepSeek Harness through its broader memory operating system. It helps developers building assistants and agents carry useful context beyond a single conversation instead of repeatedly supplying the same background. The integration recalls relevant information before a task and retains new experience after a successful turn, without changes to the harness core.

The MemOS DSH plugin brings automatic recall, background capture, hybrid retrieval and a local Memory Viewer to this workflow. The wider project also manages knowledge bases, multimodal information and tool memory. Those broader capabilities should not be treated as a list of configuration options exposed by the DSH integration: the supplied README excerpt does not document that mapping.

## MemOS core features

- **Automatic recall:** Relevant stored context can be recalled before a task begins. This supports assistants that need continuity across work rather than relying only on the current conversation.
- **Background capture:** The integration retains new experience after successful turns. Memory collection therefore forms part of the agent workflow rather than a separate manual note-taking step.
- **Hybrid retrieval:** The DSH introduction explicitly lists hybrid retrieval. Elsewhere, the README describes the local memory core as combining FTS5 and vector search, although DSH-specific retrieval settings are not included in the excerpt.
- **Local SQLite storage:** The quick-start table identifies an on-device plugin path for DSH, with SQLite storage and no separate infrastructure listed. This is distinct from deploying the full memory service.
- **Local Memory Viewer:** A local viewer provides a way to inspect memory. The excerpt confirms its availability but does not specify its address, launch command or controls.

## How to install and use MemOS

The supplied README excerpt contains no DSH installation command, and the repository information does not confirm an npm package name. Consequently, there is no verified install command to copy here. Do not substitute the repository name into a package-install command.

1. Open the complete [MemOS README](https://github.com/MemTensor/MemOS#memos-plugin) and find the plugin section referenced by its DSH introduction. Use that section for the actual package and agent-specific setup.
2. Choose the relevant entry point. The local plugin explicitly supports DSH and keeps data on your machine; the README also announces cloud plugin support, but the supplied excerpt omits its DSH setup details.
3. Follow the complete instructions for configuration. No DSH configuration file path, option names or Memory Viewer launch command appears in the excerpt, so these cannot be specified reliably here.
4. Once configured, use a task containing context you want to retain. After a successful turn, inspect retained information in the viewer and check whether a later related task recalls it. This is a practical validation sequence, not a promise that every turn will produce a particular memory.

The Docker instructions in the README deploy a separate REST service with Neo4j and Qdrant. They are not instructions for installing the local DSH plugin.

## How to troubleshoot MemOS

The excerpt provides no DSH-specific error messages or documented fixes. Start with general checks: confirm that you are running the intended profile, verify that the plugin is enabled, and restart DSH after configuration changes.

If recall or capture still appears absent, record the installed harness and plugin versions and inspect their available logs. For installation problems, first verify the package and setup instructions against the complete plugin documentation. Keep local-plugin troubleshooting separate from self-hosted service troubleshooting; their storage and infrastructure requirements differ.
