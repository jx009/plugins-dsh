---
title: "EAC-Desktop: DSH Desktop and Plugin Management"
description: "EAC-Desktop is a DSH desktop app with a plugin market and project file views. Learn how to install it, configure models, and troubleshoot startup."
summary: "Run DeepSeek Harness in a native desktop window with a bundled runtime. Review project file changes, configure visual models, and manage extensions from the same workspace."
highlights:
  - "Bundled Node.js and DSH runtime"
  - "Unified plugin market and enable controls"
  - "Plugin snapshots, health checks, and rollback"
  - "Session file change review and restore"
  - "DPX environments separated by release channel"
faq:
  - q: "Do I need Node.js to install EAC-Desktop?"
    a: "No separate Node.js installation is needed to run the packaged desktop app. The published packages include Node.js, npm, and the resources needed to run DSH."
  - q: "Does EAC-Desktop support Windows, Linux, and macOS?"
    a: "The README lists Full and Lite installers for Windows x64, AppImage and deb packages for Linux x64, and a DMG for macOS arm64. Release versions differ by platform."
  - q: "Will EAC-Desktop import my existing DSH settings?"
    a: "It can detect the host `~/.dsh` directory and notify you, but it does not automatically migrate, delete, or overwrite that directory. The app uses its own `web-desktop` profile in a DPX environment."
  - q: "How do I change the EAC-Desktop Web UI skin?"
    a: "Install a Web UI skin through the market and activate it for the desktop host. With no skin active, the app uses the host’s default appearance."
  - q: "Does EAC-Desktop sandbox access to project files?"
    a: "No. DPX separates default data paths and runtime variables, but access to explicit absolute paths still depends on operating system permissions."
---

## What does EAC-Desktop do?

EAC-Desktop is an open-source DSH desktop workbench for project conversations, tool execution, and plugin management. It is distributed as a standalone app rather than as a package you add to an existing profile. It is useful if you want to work in a project directory, review what an agent changed, and manage extensions without setting up a separate Node.js runtime for the desktop app.

The native window opens a local Web UI, while DeepSeek Harness handles conversations and runs tools. Model requests go to the provider you configure; installing the desktop app does not change which provider serves them.

## EAC-Desktop core features

- **Unified plugin market:** Browse the aggregated catalog and use its controls to install, enable, or disable extensions. Built-in, recommended, and external plugins are distributed differently, so check what your release actually includes.
- **Plugin snapshots and rollback:** The protection center provides snapshots, health checks, and rollback controls. These are for managing extensions; use the session file view when you need to restore a project change.
- **Session file changes:** Start a task in a working directory, then use the file view to inspect or restore changes associated with that session.
- **Visual model and persona setup:** Use the quick setup entry to manage visual model and persona settings. For longer conversations, request-time context compression and bounded overflow recovery help manage context space.
- **DPX environments:** The app keeps its desktop profile and default data paths in a channel-specific environment. Launches on the same channel reuse that environment, while different channels store data separately.

## How to install and use EAC-Desktop

Install the desktop app from the repository’s Releases page. The README does not provide a DSH plugin install command for EAC-Desktop itself.

1. Pick the package for your platform. The README lists Full and Lite Setup for Windows x64, AppImage and deb for Linux x64, and DMG for macOS arm64. Check the version on the platform’s release asset rather than assuming it matches the Windows release.
2. Open the app. It prepares the `web-desktop` profile and starts the local Web UI with the bundled runtime, so ordinary use does not require a separate Node.js installation.
3. Choose a project working directory and start a session. Use quick setup for visual model or persona settings, then open the file view to review changes after a task.
4. To add an extension, use the market and check whether it is enabled. Compatibility and extra dependencies depend on the release and the extension’s configuration.

## How to troubleshoot EAC-Desktop

- **The window does not reach the Web UI:** Check the installed version and startup logs. A failed DPX initialization stops startup and records an error instead of continuing with the wrong data root.
- **An extension is missing or inactive:** Confirm you are checking `web-desktop` in the intended release channel. Check that the installed release includes the extension or that it was installed and enabled, then restart the desktop app and review the logs if it still does not appear.
- **Settings or sessions look missing:** Check the active channel before moving files. On Windows, the default product data root is `%LOCALAPPDATA%\Deepseek Harness EAC`, and channel data lives under `dpx/dsh-environments/eac-<channel>/`. To back up your work, quit the app and copy the actual product data root and your separate project directories.
