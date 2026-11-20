---
title: "codeg: Multi-agent coding workspace for DSH"
description: "Codeg is a multi-agent coding workspace for DSH users. Learn how to install it, configure agents, and troubleshoot setup or session issues."
summary: "Find and resume coding sessions from several agents in one workspace, then review their changes alongside your project files."
highlights:
  - "Unified chat for supported coding agents"
  - "Searchable and resumable session history"
  - "Cross-agent delegation with @ mentions"
  - "Live diffs and Git worktrees"
  - "Desktop, self-hosted server, and Docker deployment"
faq:
  - q: "Is codeg a DeepSeek Harness plugin I can install with dsh?"
    a: "The repository presents Codeg as a standalone workspace and does not document a DSH plugin install command or identify an npm package for one. Use a desktop release or follow the project's deployment guide instead."
  - q: "Can codeg import Claude Code and Codex sessions?"
    a: "Yes. Codeg can import session history from supported agents, including Claude Code and Codex, so you can look up earlier work without starting a new conversation."
  - q: "How do I add a custom ACP agent to codeg?"
    a: "Use the project's Custom Agents guide to configure an Agent Client Protocol (ACP) agent. If the agent is already supported, start with the Supported Agents guide instead."
  - q: "Can I run codeg in Docker instead of installing the desktop app?"
    a: "Yes. Docker is one of the documented deployment options, alongside a self-hosted server and the desktop app."
  - q: "Why is my old session missing from codeg search?"
    a: "Check that the originating agent is supported and that its on-disk history has been imported. If the session is still missing, note the app version and check the logs before reporting the issue."
---

## What does codeg do?

Codeg is a standalone multi-agent coding workspace for DeepSeek Harness users who want to manage coding sessions in one place. It brings sessions from tools such as Claude Code, Codex, and OpenCode into a shared interface. Instead of switching between terminal windows to find an earlier conversation or see what changed, you can search session history and review live diffs next to the chat and project files.

The repository lists DeepSeek Harness among its topics, but its setup instructions describe a separate app or server, not a DSH plugin installed into a profile. If you're looking for a graphical workspace to use alongside your coding tools, start with the project's Supported Agents guide to check the tools you plan to bring over.

## codeg core features

- **Unified agent interface:** Supported agents share a chat layout with tool cards, interactive replies, and live diffs. The project also documents how to add a custom agent through the Agent Client Protocol (ACP).
- **Session search and import:** Bring in history that supported agents have saved on disk, then search or tag conversations so you can find them later. Resume an earlier session or share its context with another agent.
- **Cross-agent delegation:** Use an `@` mention to hand part of a coding task to another agent. You can follow progress in the conversation rather than switching to a separate terminal for every agent.
- **Code and Git review:** Inspect edits beside the conversation, then use the workspace's Git tools, worktrees, and merge editor to review changes. The canvas gives you a place to arrange chats, files, terminals, and notes for the same project.

## How to install and use codeg

No DSH install command is documented, and no npm package name is confirmed. Choose a standalone installation method rather than trying to add the repository to a DSH profile.

1. Choose your deployment. For desktop use, open the repository's Releases page and select the build for your platform. For a self-hosted server or Docker, follow the Deployment guide for that option.
2. Open the workspace and consult the Supported Agents guide for the coding tool you want to use. For a custom ACP setup, follow the Custom Agents guide rather than adding an entry to your harness profile.
3. If you want to continue existing work, use the session aggregation workflow to import that agent's history. Search for the conversation you need and resume it from the workspace.
4. Try a small coding task first. Open the live diff beside the chat so you can compare what the agent says it changed with the edits it actually made.

## How to troubleshoot codeg

If a conversation is missing, check whether the originating agent is supported and whether its saved history was imported. If an agent does not appear, check its setup against the Supported Agents or Custom Agents guide as appropriate. Use the instructions for your deployment type when checking the installation: desktop, self-hosted server, or Docker.

For a persistent startup or connection problem, restart the app or service, confirm the version you're running, and inspect the logs. If you're reporting the problem, include the deployment type, the agent involved, and the step that failed so it's clear whether the issue starts at launch, during agent setup, or during session import.
