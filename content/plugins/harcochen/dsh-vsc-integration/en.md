---
title: "dsh-vsc-integration: Run DSH in VS Code"
description: "dsh-vsc-integration is a DeepSeek Harness extension for VS Code. Learn how to install it, configure your API key, and troubleshoot Runtime errors."
summary: "Review proposed edits in VS Code before approving them. Keep coding conversations in separate tabs and use Trace to see how each task progressed."
highlights:
  - "Review changes in native side-by-side diffs"
  - "Approve tool calls from chat"
  - "Attach editor context with @"
  - "Search and export persistent sessions"
  - "Inspect task activity with Trace"
faq:
  - q: "How do I install dsh-vsc-integration in VS Code?"
    a: "Install it from the VS Code Marketplace or Open VSX. If you downloaded a `.vsix` from GitHub Releases, use `Extensions: Install from VSIX...` in the Command Palette."
  - q: "Can dsh-vsc-integration show diffs for files outside Git?"
    a: "Yes, native diff review supports files outside Git. You can inspect proposed file edits before deciding whether to approve them."
  - q: "Can I continue a dsh-vsc-integration session in my browser?"
    a: "Yes, you can continue the session in the Web UI for the same Runtime. A DSH Workspace groups sessions and can be associated with a project path."
  - q: "Does dsh-vsc-integration support PR and worktree review?"
    a: "Yes, through the optional `@deepseek-ai/dsh-experimental-forge-bundle`. That bundle provides worktree and pull request review support."
  - q: "Where do I find Runtime error logs for dsh-vsc-integration?"
    a: "Run `DSH: Show dsh Runtime Logs` from the VS Code Command Palette. If you report a problem, include the extension version, your operating system, and redacted error details."
---

## What does dsh-vsc-integration do?

dsh-vsc-integration is a DSH plugin that brings DeepSeek Harness into VS Code as an editor extension. You can send a coding task with context from your editor, respond to tool approval requests, and inspect proposed changes without switching away from the project. Conversations persist beyond an individual task, and you can resume them in the Web UI if it uses the same Runtime.

## dsh-vsc-integration core features

- **Native diffs and tool approvals:** Open a side-by-side diff to inspect proposed file edits before approving them. Diff review also works for files outside Git.
- **Editor context:** Use `@` in chat to attach material relevant to your request. Available context includes files, selections, symbols, diagnostics, Git diffs, and the state of a paused debugger.
- **Persistent sessions:** Keep different conversations in separate editor tabs and use outlines or search to find earlier messages. Archive sessions or export them in Markdown, JSON, or ZIP format.
- **Trace and usage insights:** Follow task activity, subagents, and todos as work progresses. Token usage and estimated model costs are also available for reviewing a run.
- **Inline completion and debugging:** The extension supports inline completion and optional agent-driven debugging. Automatic completion and autonomous debugging are off by default.

## How to install and use dsh-vsc-integration

Install the editor extension through the VS Code Marketplace or Open VSX. If you downloaded a `.vsix` from GitHub Releases, run `Extensions: Install from VSIX...` in the Command Palette and select the file. The extension requires VS Code 1.106.0 or later and targets Runtime version `dsh 0.2.2-rc.1`.

1. Install and launch DeepSeek Desktop so it can register the `dsh` command. Open your project folder in VS Code, mark it as trusted, and run `DSH: Open Chat`.
2. For DeepSeek credentials, run `DSH: Configure API Key`. To set up another provider, use `DSH: Open dsh Web UI in Browser`. Select or register a DSH Workspace and choose a model.
3. Send a task and use `@` to attach the context you want the model to consider. When an approval card appears, open any proposed diff and review the edits before responding.

To connect to an existing Runtime, search for `dsh` in VS Code Settings. Put its launch URL in `dsh.serverUrl` and either include the token in the URL or enter it separately in `dsh.serverToken`. Remote hosts must use HTTPS. Set `dsh.connectionMode` to `attach-only` if you want the extension to use an existing process rather than launch one.

## How to troubleshoot dsh-vsc-integration

Start with `DSH: Diagnose Environment`, then open `DSH: Show dsh Runtime Logs` to see what the Runtime reports. When filing an issue, include your operating system and extension version, and redact sensitive details from any errors you share.

If you need to recover local Runtime settings, run `DSH: Open Configuration Backups`. Backups are created on launch and when configuration files change. The extension keeps the latest ten snapshots per DSH Home and profile, so check the one associated with the Runtime you want to recover and retrieve the files for manual restoration.
