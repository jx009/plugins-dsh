---
title: "dsh-desktop: DSH Sessions, Files, and Git"
description: "dsh-desktop is a DeepSeek Harness desktop app with bundled plugins. Learn how to install it, configure your profile, and troubleshoot startup errors."
summary: "Work with official DSH Sessions alongside your files, Git repositories, and terminal. Manage community plugins from Settings without maintaining a separate desktop plugin profile."
highlights:
  - "Official DSH Web sessions and approvals"
  - "Better Sidebar for files, Git, and terminal"
  - "Plugin Marketplace in official Settings"
  - "Isolated workspaces with Git Worktree"
  - "Remote access from Android or a browser"
faq:
  - q: "Can I install dsh-desktop with the DSH plugin CLI?"
    a: "No. Download the desktop app from the project's GitHub Releases page, then use the Plugin Marketplace or the CLI to manage individual bundles."
  - q: "How do I install dsh-desktop on an Intel Mac?"
    a: "The project does not list an official Intel Mac installer. It can run from source on Intel Macs; the signed and notarized `.dmg` is for Apple Silicon."
  - q: "Does reinstalling dsh-desktop move my sessions and plugins?"
    a: "No. The client install directory holds the app, while profiles, sessions, and plugins live in a separate data directory. Choosing another client directory does not migrate or delete that data."
  - q: "How do I use Git Worktree in dsh-desktop?"
    a: "Start from a session whose working directory is in a Git repository. The bundled Worktree feature creates an isolated worktree from that directory and opens a new official session for it."
  - q: "How do I turn off phone access in dsh-desktop?"
    a: "Disable or uninstall the `ds-harness-remote` bundle if you do not need remote access. App updates do not restore it after you disable or uninstall it."
---

## What does dsh-desktop do?

`dsh-desktop` is a community-maintained DeepSeek Harness desktop app that bundles official DSH Web, the official runtime, and a set of community plugins. It is a desktop distribution, not a standalone DSH plugin you add to an existing installation. Your sessions, tool approvals, settings, and chat history stay in the official interface, while the desktop app adds native file selection and a sidebar for project work.

The app initializes a new profile from pinned bundles included with the download, so you can start without installing each component separately. Routine launches leave existing profiles intact, and updates do not reinstall bundles you chose to remove.

## dsh-desktop core features

- **Official DSH Web sessions.** Continue conversations, review tool requests, and find earlier messages in the same interface that manages agents, skills, and MCP connections. There is no separate desktop chat history to maintain.
- **Better Sidebar.** Browse the file tree, edit code or Markdown, and switch between Git, terminal, and web tabs without leaving your session. Add files or folders to a conversation from the message composer.
- **Plugin Marketplace.** Find, install, update, disable, or remove bundles in official Settings. The marketplace and CLI use the same profile rather than keeping separate plugin records.
- **Git Worktree.** Create an isolated checkout from the current session's working directory and open a separate session for that workspace. The original session can stay in its existing checkout.
- **Phone and browser access.** The bundled remote feature lets you resume the same workspace and session from Android, Remote Web, or another desktop client. It uses a third-party service and requires you to sign in and enable the current computer first.

## How to install and use dsh-desktop

Download the desktop installer from the `vibeinging/dsh-desktop` GitHub Releases page. There is no DSH install command for the app itself. On Apple Silicon, open the `.dmg` and drag the app into Applications. On Windows x64, use the `.exe` listed for the current release and choose the installation scope and client directory. The Linux x64 AppImage is in invitation testing; Intel Macs do not have an official installer.

1. Open the app and select a working directory, or create a session directly. Configure model credentials through DSH Settings or the local environment.
2. Open Files, Git, or Terminal from the sidebar. To include project material in a conversation, add the relevant files or folders from the composer.
3. For additional bundles, open Settings, then Plugin Marketplace. Check the source, version, compatibility, and requested permissions before installing. A marketplace listing does not mean the bundle has been reviewed by the desktop project.

## How to troubleshoot dsh-desktop

If the app opens its recovery page, the project documents that behavior for profile or client failures. The app preserves the original profile when a startup failure sends you to recovery. For first-launch questions about Gatekeeper, SmartScreen, or API keys, consult the project's website FAQ.

If a bundle is missing from the interface, check that you are looking at the same profile in the app and CLI, and confirm in Settings that the bundle is enabled. Restart the app, then check the client and bundle versions and review the available logs if the problem persists. If a plugin works in Desktop but not in another host, check whether it requires desktop-only features such as native file dialogs or Browser Workspace.
