---
title: "dsh-dock: DSH Profiles and Plugin Management"
description: "dsh-dock is a DSH plugin management app for desktop workspaces. Learn how to install it, configure MCP and troubleshoot startup issues."
summary: "Manage DeepSeek Harness profiles, browse 3,400+ community plugins, configure model credentials and inspect runtime logs from a desktop control center."
highlights:
  - "Isolated profile creation and cloning"
  - "3,400+ community plugin marketplace"
  - "Profile and global MCP configuration"
  - "Model credentials and runtime diagnostics"
  - "Windows local and WSL2 modes"
faq:
  - q: "How do I install dsh-dock for DeepSeek Harness?"
    a: "Use the desktop downloads offered through the repository’s Releases page for your platform. The application bootstraps its required runtime on first launch; the supplied README does not identify an npm package for installing Dock itself."
  - q: "Does dsh-dock support Windows without WSL2?"
    a: "Yes, Windows supports both local and WSL2 operation. Local mode avoids symbolic links and does not require administrator privileges or Developer Mode."
  - q: "Can dsh-dock use my existing global DSH installation?"
    a: "Dock manages an engine in its own directory and automatically provisions it when needed. It does not discover or adopt a globally installed engine through PATH."
  - q: "Why can't dsh-dock launch the desktop profile?"
    a: "The desktop profile is reserved for the official Electron application, so its lifecycle controls are disabled in Dock. Content management remains available, and you can copy its configuration into a differently named profile to launch it."
  - q: "How do I configure MCP servers in dsh-dock?"
    a: "Open a profile’s MCP tab and choose either profile-local or global scope. The editor supports stdio and streamable-http, with capability discovery for tools and resources."
---

## What does dsh-dock do?

dsh-dock is a DSH plugin management desktop application and independent control center for DeepSeek Harness. It helps developers who maintain multiple workspaces, install community extensions or diagnose runtime problems manage those tasks through a visual interface. Dock works with the official CLI and file contracts without modifying upstream source code.

The application uses Tauri v2, Rust and React 19. It supports macOS on Apple Silicon and Intel, Windows in local or WSL2 mode, and Linux through deb, rpm and AppImage packages. Chinese and English interfaces are available, including automatic selection based on the system language.

## dsh-dock core features

- **Multi-profile management:** Create, clone, rename, delete and launch workspaces from the Profile list. Cloning excludes `node_modules` and rewrites the package name; running workspaces are locked against accidental lifecycle changes.
- **Community plugin marketplace:** Browse a registry described in the README as containing 3,400+ plugins, with category filters and keyword search. Install from npm, GitHub repositories or HTTPS tarballs into a selected workspace, and follow progress in the background queue.
- **MCP server configuration:** Set commands, arguments and environment variables, choose profile-local or global scope, and probe available tools and resources. Supported transports include `stdio` and `streamable-http`.
- **Model credentials and configuration:** Manage API keys for providers including DeepSeek, OpenAI and Anthropic. The console also exposes `.credentials.yaml` and `settings.yaml`; engine configuration saves include confirmation and automatic backup.
- **Health diagnostics and logs:** Inspect Node, pnpm and DSH versions, paths and readiness. Switch between shell and runtime logs, filter by keyword and follow the latest 600 lines.

## How to install and use dsh-dock

The supplied README does not provide a command for installing Dock itself or confirm an npm package name. Obtain the platform-specific desktop package from the repository’s Releases page. The generic plugin commands mentioned in the README describe installing extensions inside the engine, rather than installing this application.

1. Install and launch the desktop application. Its bootstrap process supplies missing or incompatible runtime components, so Node.js, pnpm and DSH do not need to be installed beforehand.
2. Choose a workspace in Launchpad or open Control Center → Profile list to create one. Set a default launch profile if you want subsequent launches to enter the same workspace directly; the factory default is `web`.
3. Open Plugin Center, search for an extension and select its target workspace. In that profile’s plugin list, review the installed version, runtime badge and enable switch. Community plugins are the default filter.
4. Open the profile’s MCP tab to configure external servers. Choose the intended scope before entering settings and use capability discovery to inspect what the server exposes.
5. Open System Console → Model credentials to configure your provider. Use the engine configuration panel for `settings.yaml`, and the profile’s Patch tab for `cordis.patch.yml` edits.

## How to troubleshoot dsh-dock

If a plugin is missing or inactive, confirm the selected profile, check list filters and inspect its enable switch and runtime badge. Follow any restart-required prompt, then consult the runtime logs if loading still fails.

Dock uses its own engine directory rather than discovering DSH through `PATH`. If your terminal installation differs from the desktop runtime, inspect Health Dashboard for the versions and paths actually in use.

The official `desktop` profile cannot be launched, restarted, renamed, deleted or made default through Dock. Copy it to another name when you need a launchable workspace; plugin and MCP content management remains available on the reserved profile.

After three crashes within 60 seconds, automatic restarting stops and a failure card displays log excerpts. Inspect those excerpts and copy the diagnostic report for further investigation. Closing the main window only hides it: reopen it from the tray or macOS menu bar, and use Quit there when you need to exit.
