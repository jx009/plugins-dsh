---
title: "CodeIsland: Live Agent Status for DSH"
description: "CodeIsland is a DSH plugin that shows agent status in your MacBook notch. Learn about setup, hook configuration and missing-session checks."
summary: "Track coding sessions from the MacBook notch, respond to approvals and questions, and jump to the right terminal pane. Supports DSH alongside 30+ AI coding tools."
highlights:
  - "Live agent status in the notch"
  - "Tool approvals and question replies"
  - "Exact terminal and pane navigation"
  - "SSH remote session monitoring"
  - "iPhone and Apple Watch companions"
faq:
  - q: "Does CodeIsland support DeepSeek Harness?"
    a: "Yes, the README explicitly lists it among the supported coding tools. It also includes DSH among tools whose waiting hooks allow approvals and questions to be answered from the island."
  - q: "Can CodeIsland approve DSH tool calls?"
    a: "Yes, DSH is listed as supporting responses through hooks that wait for a decision. The panel provides approval and question interactions without requiring you to switch to the agent window."
  - q: "What macOS version does CodeIsland require?"
    a: "The README specifies macOS 14 or later for the Mac application. It also advertises separate iPhone and Apple Watch companions called Code Island Buddy."
  - q: "Can CodeIsland show remote SSH coding sessions?"
    a: "Yes, sessions on SSH remote hosts can appear alongside local sessions. The supplied excerpt does not include the remote-host setup procedure."
  - q: "Where do I configure custom tools in CodeIsland?"
    a: "Open Settings → Hooks to add a custom CLI that uses Claude-style hooks. That section also supports registering extra configuration directories for Claude Code, Codex and Grok."
---

## What does CodeIsland do?

CodeIsland is a DSH plugin companion that displays AI coding-agent activity in the MacBook notch. Its integration with DeepSeek Harness helps developers see which sessions are working, waiting for input or finished without repeatedly switching windows. The project is distributed as a macOS application; the supplied repository information does not identify an npm package or a DSH installation command.

The CodeIsland DSH status panel sits alongside support for more than 30 coding tools, including Claude Code, Codex and OpenCode. Session cards bring together current activity, the latest response and project context. For supported tools whose hooks wait for a decision, you can also respond directly from the island. DSH is explicitly included in that group.

## CodeIsland core features

- **Live session status:** See the current tool and latest reply for each session. Completed replies render Markdown, including lists, tables and code, while agent task checklists can appear as progress bars.
- **Approvals and questions:** Approve, deny or always allow tool calls, and answer prompts containing multiple questions. Global shortcuts cover approval, denial, skipping and jumping to a session.
- **Project context and navigation:** Cards display Git branches and worktrees, with grouping by project or tool. Click-to-jump targets terminal tabs, IDE windows and supported tmux, zellij or Herdr panes.
- **Quiet notifications:** Smart suppression avoids pinging you while you are already viewing the relevant session tab. Quiet hours, directory silence rules and optional follow-up reminders give you more control over interruptions.
- **Remote and companion access:** SSH sessions can appear beside local work. iPhone and Apple Watch companions offer additional surfaces, and webhook forwarding exposes raw events for your own automations.

## How to install and use CodeIsland

The supplied README excerpt contains no installation command, and no npm package name has been confirmed. Its installation section is outside the supplied text, so a copy-and-paste DSH package command cannot be provided. Check the repository's complete installation instructions and release information before installing the Mac application. The stated operating-system requirement is macOS 14 or later.

1. Install the application using the repository's documented procedure. The README describes automatic hook installation, which connects supported coding tools to the status panel.
2. Review hook configuration in `Settings → Hooks`. This is also where Claude-style custom CLIs and additional configuration directories for certain supported tools are registered; the excerpt does not specify a separate DSH configuration path.
3. Start a coding session and inspect its card for activity, tool use and the latest response. Use project or tool grouping when following several sessions.
4. When a waiting approval or question appears, respond from the island. Use the jump action when you need to work in the originating terminal or IDE.
5. Adjust quiet hours, silence rules or optional reminders to match how you monitor ongoing work. Consult the complete documentation for SSH and mobile-companion setup.

## How to troubleshoot CodeIsland

The supplied excerpt does not include a troubleshooting section or named error codes. For missing sessions, use basic checks: confirm the macOS requirement, review hook configuration, verify the DSH profile you actually launch and ensure the relevant integration is enabled. Restart DSH after checking the setup, then inspect application versions and available logs if the session still does not appear.

For missing sounds or notifications, review the documented suppression behavior. The application mutes itself while the screen is locked or asleep, supports quiet hours and directory silence rules, and can suppress alerts when the session tab is already visible. A failed individual tool call does not trigger the error sound; a terminated turn does. These behaviors can explain silence without indicating a broken integration.
