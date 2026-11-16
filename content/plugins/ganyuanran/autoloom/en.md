---
title: "Autoloom: Aegis Governance for DSH"
description: "Autoloom is a DeepSeek Harness desktop client with Aegis governance. Learn how to install it, configure models and inspect execution evidence."
summary: "A Windows desktop client that brings Aegis engineering checks into AI coding. Review project changes, execution records and verification evidence while using your chosen model provider."
highlights:
  - "Aegis engineering governance"
  - "Project goals and decision diffs"
  - "Linux x64 projects over SSH"
  - "Parallel/Exa MCP web search"
  - "Command logs and interactive terminals"
faq:
  - q: "How do I install Autoloom for DeepSeek Harness?"
    a: "Download the Windows x64 installer named `Autoloom-<version>-win-x64.exe` from the repository's Releases page. Open the installed client, configure your model provider and API key in settings, and choose a default model."
  - q: "Is Autoloom a DSH plugin or a desktop client?"
    a: "Autoloom is a desktop client built on DeepSeek Harness that retains the Cordis plugin mechanism. The supplied README describes installer-based setup and does not provide a DSH plugin installation command."
  - q: "Does Autoloom support macOS and Linux?"
    a: "The available desktop build is for Windows x64; macOS and Linux clients are planned. The workspace also supports connecting to Linux x64 projects over SSH, which is separate from running a Linux desktop client."
  - q: "Is Autoloom free, including model usage?"
    a: "The desktop client is free. Model usage is billed by the provider you configure."
  - q: "Does Autoloom web search need another API key?"
    a: "The built-in public Parallel/Exa MCP search services work without a separate search API key. The README lists web search support for both local projects and projects accessed over SSH."
---

## What does Autoloom do?

Autoloom is a desktop client built on DeepSeek Harness that integrates Aegis engineering governance into AI coding. It helps developers examine whether a change is necessary, challenge assumptions before editing, and compare delivery against requirements and execution evidence. For users searching for a DSH plugin, the relevant distinction is packaging: this project is installed as its own desktop application and retains the Cordis plugin mechanism.

Autoloom for DeepSeek Harness targets development work where the reasoning behind changes matters alongside the resulting code. Project goals, constraints and key decisions remain associated with the project. The runtime tracks task state, prerequisites for important actions and process records, reducing the need to repeat instructions about investigation and verification.

The client is in Beta. Its documented upstream foundation is `dsh-v0.1.1-rc.2`, with selected later reliability fixes included. Autoloom maintains its own releases; fully automated development remains a stated goal rather than a completed capability.

## Autoloom core features

- **Aegis engineering governance:** At task initiation, assess goals, existing capabilities and constraints. Before changes, examine unnecessary layers, duplicated responsibilities and conditions that could undermine the proposed solution.
- **Evidence-based delivery review:** Compare requirements with actual execution and verification material before recording results. After execution failures, the methods call for diagnosis based on observations rather than unsupported assumptions.
- **Inspectable governance impact:** Before an admitted project mutation runs, the conversation can display a collapsed Governance impact row. It explains how the methods affected that action, uses the request language for user-facing fields and preserves details for inspection.
- **Project preferences and decisions:** Review a concrete diff when recorded project decisions change. Configure a test-first preference and code complexity thresholds to reflect the project's requirements.
- **Local and SSH workspaces:** Work with local projects or Linux x64 projects over SSH, with files, code diffs, command logs, previews and docked interactive terminals. Built-in public Parallel/Exa MCP services provide web search without a separate search API key.

## How to install and use Autoloom

The supplied README provides no DSH installation command or confirmed npm package name. Use the documented desktop installation route:

1. Visit the repository's Releases page and download `Autoloom-<version>-win-x64.exe` for Windows x64.
2. Install and launch the application. In settings, add your model provider and API key, then select a default model.
3. Open a backed-up test project and begin with a clearly bounded change. This follows the README's suggested starting workflow for the Beta.
4. Inspect the resulting code diffs, command logs and available verification evidence. Review any proposed changes to recorded project decisions before accepting them.
5. If using a remote workspace, check the remote environment requirements in the repository's Beta notes before connecting to a Linux x64 project over SSH.

The client is free, while your selected provider charges for model usage. Windows x64 is currently available; macOS and Linux desktop versions are planned. The supplied excerpt confirms configurable test-first and complexity preferences but does not specify their exact settings path.

## How to troubleshoot Autoloom

The supplied README excerpt does not include specific error codes or a detailed troubleshooting guide. Start by checking the installed version and the command logs associated with the affected task. If the client behaves unexpectedly, restart it and reproduce the issue with a small, clearly scoped task.

For model setup problems, review the provider, API key and default model configured in settings. For SSH workspace issues, consult the remote environment requirements in the Beta notes; those requirements are not included in the supplied excerpt.

When investigating an execution failure, compare the observed result with the task requirements and recorded verification material. Governance records help explain the process, but they do not independently prove that a change is correct. Reliability still depends on the code, execution results and actual checks.
