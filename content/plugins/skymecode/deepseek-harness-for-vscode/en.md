---
title: "deepseek-harness-for-vscode: DSH in VS Code"
description: "deepseek-harness-for-vscode is a DSH plugin that brings agents to VS Code. Learn VSIX installation, MCP setup and session troubleshooting."
summary: "Run DeepSeek Harness in a native VS Code workbench with a bundled runtime. Manage shared session history, attach editor context and configure MCP servers without a separate Harness deployment."
highlights:
  - "Native VS Code workbench"
  - "Shared project-based session history"
  - "MCP server management"
  - "Editor context and file attachments"
  - "Streaming Markdown and slash commands"
faq:
  - q: "How do I install deepseek-harness-for-vscode?"
    a: "Download the VSIX matching your platform from the repository’s v0.6.2 release, install it in VS Code and reload the editor. The extension bundles Node and the Harness runtime, so a separate Node/npm setup is unnecessary."
  - q: "Does deepseek-harness-for-vscode support Windows and Linux?"
    a: "The documented release builds win32-x64, linux-x64, linux-arm64 and darwin-arm64 packages. Choose the asset matching both your operating system and processor architecture."
  - q: "Can deepseek-harness-for-vscode share history with the official DSH CLI?"
    a: "Yes, the extension and an independently installed official CLI can read the same saved conversations. Credentials and plugin profiles remain separate, and shared logs do not synchronize management settings between Hosts."
  - q: "How do I add MCP servers in deepseek-harness-for-vscode?"
    a: "Open More → MCP servers or use the command palette to manage servers. Both stdio and Streamable HTTP are supported; validated changes reload the Host once model turns are idle."
  - q: "Why do file-change cards disappear in deepseek-harness-for-vscode?"
    a: "Snapshots are retained for the Session lifetime within its current Harness Host, so old cards disappear after a Host restart. In Git projects, snapshots cover shell edits; outside Git, only file-tool captures are recorded."
---

## What does deepseek-harness-for-vscode do?

deepseek-harness-for-vscode is a DSH plugin that brings a native coding-agent workbench to VS Code, delivered as a platform-specific extension. It helps developers use DeepSeek Harness alongside their files, editor selections and project conversations without managing a separate local deployment. Interaction stays in the sidebar or a detachable editor panel; the official WebUI is neither served nor embedded.

The documented community-maintained release is 0.6.2. It bundles `@deepseek-ai/dsh@0.2.2-rc.1` and standalone Node `24.22.2`, so you do not need to clone the upstream repository or prepare Node/npm. The extension release is stable, while its bundled runtime remains a release candidate and Harness remains a Developer Preview.

## deepseek-harness-for-vscode core features

- **Project-based session history:** Create, rename, fork, resume, archive, restore, import and export conversations. Histories belong to their original project folder, and previews let you inspect a conversation before requesting execution ownership with `Continue here`.
- **Streaming Markdown:** Read formatted answers with tables, code blocks, copy controls and clickable workspace file references. Incremental updates preserve disclosure state, and scrolling through earlier messages interrupts automatic following until you return to the bottom.
- **Editor context:** Attach selected code as a removable context card. Type `@` in the composer to fuzzy-search workspace files and attach them to your request.
- **Slash commands and agent controls:** Use official commands alongside `/model`, `/reasoning` and `/preset`. The workbench also exposes native approvals, structured questions, Todos, Skills, Goals, Plan mode and background jobs.
- **MCP and file changes:** Manage stdio or Streamable HTTP servers through native controls. Per-turn snapshots and historical diffs come from `@deepseek-ai/dsh-workspace-changes`, with labels for binary files, oversized files and capped lists.

## How to install and use deepseek-harness-for-vscode

The README documents VSIX installation rather than a DSH plugin installation command. Use the release asset for your platform.

1. Download the v0.6.2 VSIX for `darwin-arm64`, `win32-x64`, `linux-x64` or `linux-arm64` from the repository’s release page.
2. Install the VSIX in VS Code, then reload the editor. The bundled runtime supplies the local execution environment.
3. Open the native workbench. If no key is configured, follow the first-run guidance to connection settings and complete configuration there.
4. Select a project folder and create a conversation. Attach selected code or workspace files, then send your request. Model and reasoning choices remain editable; changing the conversation preset requires creating a new conversation.
5. To resume saved work, preview its history and check the original project and execution directory. Choose `Continue here` when ready to request native execution ownership.
6. For external tools, open `More → MCP servers` or the command palette. Add or edit a server; configuration changes are validated and applied after model turns become idle.

## How to troubleshoot deepseek-harness-for-vscode

If setup stops at a missing key, use the connection-settings link in the first-run hint. For session issues, inspect the history panel’s actual storage path and migration details. The usual shared location is `~/.dsh/sessions`, but shared history does not imply shared credentials or plugin profiles.

A missing project directory blocks execution. Writer conflicts leave conversations readable, and history preview alone does not activate an Agent. Check the displayed directory before continuing.

Before a runtime upgrade, back up `~/.dsh` and `~/.dsh/vscode/harness-home`. Supported older logs migrate to V4 while originals remain intact; older runtimes cannot read the new generation. Do not downgrade an active profile. Third-party plugins relying on removed `ctx.agent` or runtime `Inbox` APIs need compatibility updates.

If another issue persists, confirm the extension is enabled, check the relevant profile and installed versions, reload VS Code and inspect logs. A Host restart removes older snapshot cards by design; it does not make those cards persistent history.
