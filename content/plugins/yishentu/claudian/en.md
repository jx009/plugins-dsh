---
title: "claudian: Use DSH in Obsidian"
description: "Claudian is an Obsidian plugin that runs DeepSeek Harness in your vault. Learn how to install it, configure your provider, and troubleshoot CLI errors."
summary: "Chat with your coding agent without leaving Obsidian. Reference vault files, review inline edits, and group related conversations into projects with shared instructions."
highlights:
  - "DeepSeek Harness chat in Obsidian"
  - "Inline edits with word-level diffs"
  - "Vault file and session mentions"
  - "Project sessions with shared memory"
  - "Temporary side chats"
faq:
  - q: "How do I install claudian for DeepSeek Harness?"
    a: "Install Claudian from Settings → Community plugins in desktop Obsidian, then enable it. DeepSeek Harness is a separate requirement; installing the Obsidian plugin does not install the harness."
  - q: "Does claudian work on Obsidian mobile?"
    a: "No. Claudian requires Obsidian 1.13.0 or later on macOS, Linux, or Windows."
  - q: "How do I start a side chat in claudian?"
    a: "Type `/side` or `/btw` to open a temporary conversation without changing the main chat. You can ask follow-up questions and use tools there."
  - q: "Where do I configure MCP servers for claudian?"
    a: "Configure MCP servers through the selected agent's native CLI configuration. If you switch agents, check that the new agent has the server configured too."
  - q: "Does claudian send my Obsidian notes to an API?"
    a: "Prompts and attached notes can be sent to the service configured for the selected provider, along with images and tool outputs. Check your provider settings before sharing sensitive vault content."
---

## What does claudian do?

Claudian is an Obsidian plugin that brings DeepSeek Harness into your vault; it is not a DSH plugin installed inside the harness. It opens an agent chat in Obsidian and uses the vault as the agent's working directory. That means you can ask it to search your notes, read a relevant file, or make an edit without switching to a terminal. It also supports other agents, including Claude Code and Codex.

For a first task, point the agent at a meeting note and ask it to list the decisions without editing the file. If you want to revise one of those decisions afterward, select the relevant passage and review the proposed change in the inline editor.

## claudian core features

- **Inline Edit** — Select a passage or place the cursor where you want a change, then invoke the inline edit hotkey. A word-level diff shows what the agent proposes to add or remove.
- **Vault mentions** — Type `@` to reference a file, folder, or another session. Use a file mention when several notes have similar names and you want to point the agent at a specific one.
- **Projects** — Group conversations that are working toward the same goal. Sessions in a project share instructions and a memory file that agents update as work progresses.
- **Slash commands and skills** — Type `/` or `$` to find reusable prompts or skills. Claudian can surface entries from both your user configuration and the current vault.
- **Session layouts** — Use tabs in single-pane mode or keep the session manager alongside the conversation in dual-pane mode. If you collapse the sidebar, Zen Mode moves the composer to the bottom of the note.

## How to install and use claudian

There is no documented DSH install command. Install the integration through Obsidian Community Plugins instead.

1. Confirm that you are running desktop Obsidian 1.13.0 or later. For a DSH setup, have DeepSeek Harness installed and a compatible subscription or API provider available.
2. In Obsidian, open Settings → Community plugins → Browse. Search for `Claudian`, install it, and enable it.
3. Open Claudian from the ribbon icon or the command palette. In the plugin's settings, use the provider tab for your chosen agent. The selected provider's settings and environment variables determine the API destination.
4. Start a conversation and use `@` to reference a note. Ask a question about it before trying a task that writes to the vault.

## How to troubleshoot claudian

- **The provider CLI or Node.js isn't found.** Check that the required executable is installed and works in a terminal. If Obsidian still cannot find it, consult the project's troubleshooting guide for executable discovery.
- **A newly released model is missing.** Check the installed plugin and provider versions, then consult the guide's section on model availability before changing your setup.
- **Authentication fails even though the CLI works.** Confirm that the affected session uses the intended provider. Check its settings and environment variables, then consult the authentication section of the troubleshooting guide if the problem persists.

If you report a bug, include your operating system, the plugin and provider versions, and the steps that trigger the issue.
