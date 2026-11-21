---
title: "LantaiAgent: Code Dependency Analysis for DSH"
description: "LantaiAgent brings HoloGram code graphs to DSH on Windows x64. Learn how to install the plugin, configure the web profile, and fix missing tools."
summary: "Trace cross-file references, check for dependency cycles, and see what a proposed code change might affect. The DSH package includes the analysis engine and its MCP tools, not the Lantai desktop canvas."
highlights:
  - "Static dependency graph queries"
  - "Cross-file reference analysis"
  - "Dependency cycle detection"
  - "Execution and data flow queries"
  - "Import of existing SCIP indexes"
faq:
  - q: "What is the npm package for the LantaiAgent DSH plugin?"
    a: "The repository identifies `@a834063245/hologram-dsh` as its DSH package. For package-specific installation instructions, look in `dsh-bundle/README.md`, not the Windows desktop quick start."
  - q: "Does the LantaiAgent DSH plugin work on macOS or Linux?"
    a: "The DSH bundle is documented for Windows x64. The project separately publishes standalone engine builds for Linux x64 and Apple Silicon macOS, but those are not the DSH bundle."
  - q: "Does LantaiAgent add the desktop canvas or 3D graph to DSH?"
    a: "No. The bundle provides the engine and its MCP query tools without the desktop canvas or a 3D graph viewer."
  - q: "Why are LantaiAgent HoloGram tools missing after installation?"
    a: "Check that the package is enabled in the profile used by your web session and that the host is Windows x64. Restart `dsh web`, then look for tool names beginning with `mcp__hologram__`."
  - q: "Can LantaiAgent generate a SCIP index for my repository?"
    a: "No. HoloGram can import an existing `index.scip`, but it does not run an indexer to create that file."
---

## What does LantaiAgent do?

LantaiAgent provides a DSH plugin for inspecting code dependencies with the HoloGram engine. The repository also contains a Windows desktop agent workbench, but the DeepSeek Harness package exposes the engine through MCP rather than bringing over the desktop interface. Use it when you want to see which files refer to a module, investigate a dependency cycle, or understand what might be affected before changing shared code.

## LantaiAgent core features

- **Static dependency graphs:** HoloGram parses source code and builds a graph of relationships across files. Start with a module you plan to change and use its references to decide what else to review.
- **Dependency cycle detection:** The engine calculates cycles when queried. Ask whether a particular module participates in a cycle when reviewing how parts of a project depend on one another.
- **Execution and data flow queries:** Use execution flow to examine how control moves through code and data flow to see how values move. The engine computes these views on demand rather than during the initial graph build.
- **SCIP index import:** The engine can consume an existing `index.scip`. If you want to use a SCIP index, generate it separately; the engine does not run the indexer for you.
- **Incremental graph updates:** The engine can update its graph as files change and fall back to a full rebuild if an incremental update fails. Results that reference files edited since indexing carry a freshness notice.

## How to install and use LantaiAgent

The main README names the DSH package but does not show its install command. Use the package instructions in `dsh-bundle/README.md` rather than the desktop `.exe` instructions.

1. On Windows x64, add `@a834063245/hologram-dsh` to the profile you use for the web interface. The desktop application's `Settings → MCP` toggle applies to the desktop workbench, not this setup.
2. After installation, restart `dsh web` and confirm that the agent's tool list includes names beginning with `mcp__hologram__`.
3. Start in the repository you want to inspect. For a first query, give the agent a module or file path and ask which other files reference it. If you're planning a change, ask it to distinguish direct references from broader effects it can trace through the graph.

## How to troubleshoot LantaiAgent

- **The tools don't appear:** Confirm that you're running on Windows x64, that the package is enabled in the profile serving your web session, and that you restarted DSH after installing it. If the tools still don't appear, note the installed versions and check the DSH logs for messages related to loading the package or starting the engine.
- **A result mentions stale files:** The engine flags results that refer to files edited after indexing. Compare the flagged files with the current source before relying on the result for a change.
- **A dynamic import doesn't resolve to a fixed target:** HoloGram marks dynamic imports as dynamic sites. Review those sites in the source instead of treating the absence of a fixed graph edge as proof that no dependency exists.
