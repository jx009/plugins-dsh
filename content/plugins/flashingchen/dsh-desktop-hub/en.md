---
title: "dsh-desktop-hub: DSH Desktop & Plugin Manager"
description: "dsh-desktop-hub is a DSH plugin manager and desktop client. Learn how to install it, import MCP JSON, manage Skills and troubleshoot setup."
summary: "Run Harness and manage plugins, MCP servers and Skills in one desktop window. Bundled runtimes let macOS and Windows users start without installing Node.js."
highlights:
  - "Bundled Node.js and Harness runtime"
  - "Plugin, MCP and Skills markets"
  - "Claude Code and Cursor MCP import"
  - "DeepSeek login through Harness settings"
  - "Configuration backups and hot reload"
faq:
  - q: "How do I install dsh-desktop-hub for DeepSeek Harness?"
    a: "Download the macOS DMG or Windows EXE from the repository's GitHub Releases and open the installer. This is a desktop application with bundled runtimes; the README does not provide a DSH plugin installation command for the application itself."
  - q: "Does dsh-desktop-hub support Windows and Linux?"
    a: "The preview provides Windows x64 and macOS arm64 installers. Linux packaging is listed as planned."
  - q: "Can dsh-desktop-hub import Cursor or Claude Code MCP settings?"
    a: "Yes, it accepts exported MCP JSON and converts it into DSH plugin YAML before applying a confirmed profile patch. The converter handles environment-variable references and warns about SSE or invalid server names."
  - q: "Where do I configure my DeepSeek account in dsh-desktop-hub?"
    a: "Use Harness settings to log in, log out or check authorization. API Key configuration is also available there; the desktop manager has no separate account settings entry."
  - q: "Why is a Skill shadowed in dsh-desktop-hub?"
    a: "Skills with the same name are resolved by rank, with the lower rank taking effect. The manager marks the higher-ranked duplicate as shadowed."
---

## What does dsh-desktop-hub do?

dsh-desktop-hub is a DSH plugin manager and desktop client for DeepSeek Harness. It brings the Harness Web UI, extension catalogs and configuration tools into one window for users who want to chat and manage their setup without repeatedly opening a terminal or editing YAML.

The community-maintained Electron and TypeScript application bundles Node.js and the Harness runtime. Users do not need to install those environments separately. It displays the official Web UI inside its Harness tab, but the desktop project itself is not an official DeepSeek product. The current preview supports macOS arm64 and Windows x64, with the active profile fixed to `web`.

## dsh-desktop-hub core features

- **Three extension markets:** Search plugins, MCP servers and Skills, then inspect their sources, source levels and permissions before confirming installation. Plugin listings use the DSH Plugin Market catalog; MCP combines the official Registry with DSH MCP Market, while Skills combines ClawHub and SkillsMP.
- **MCP JSON conversion:** Import configuration exported by Claude Code or Cursor. The converter translates environment-variable references into DSH syntax, flags SSE or invalid server names, and writes the confirmed result to a profile patch with Harness hot reload.
- **Skills management:** Scan bundled and user-level Skills, import `.skill` or `.zip` files and GitHub repository links, or create a user-level Skill. Separate controls determine model and user visibility, and rank resolves duplicate names.
- **Plugin lifecycle management:** View bundles and dependencies in the `web` profile. Installation, removal and updates run the actual `dsh plugin` operations; aggregate repositories missing `dsh.bundle` are rejected to prevent installing the wrong repository root.
- **Backups and application updates:** Configuration writes are atomic and create `.bak-<ts>` backups. Windows and macOS releases check GitHub Releases at startup, then download and restart to install an update after user confirmation.

## How to install and use dsh-desktop-hub

Install the desktop release rather than using a package command: the supplied README documents installers and provides no DSH installation command for this application.

1. Open `https://github.com/FlashingChen/dsh-desktop-hub/releases/latest` and download the DMG for macOS arm64 or EXE for Windows x64.
2. Install and launch the application. macOS releases starting with v0.3.5 are signed and notarized. The Windows preview is unsigned; its documented first-run flow is SmartScreen → More info → Run anyway.
3. Open Harness settings and sign in with a DeepSeek account or configure an API Key. Account authorization stays within those settings.
4. Start a conversation in Harness. Use the Plugin, MCP or Skills tab when you need extensions, checking the listed source and permissions before installation.
5. For imported MCP JSON, review the conversion before applying it. If a market entry declares environment variables, enter the required secrets in its installation card; values are written into the current MCP configuration.

The sidebar tutorial can be replayed. Closing the window leaves Harness running in the tray; use the tray menu to show the window again or quit.

## How to troubleshoot dsh-desktop-hub

If an extension is missing, first check the `web` profile and whether the plugin is enabled. Profile switching is still under development. For duplicate Skills, inspect rank and visibility: the lower-ranked entry takes effect.

For MCP conversion warnings, review SSE usage and the server name before applying changes. A rejected aggregate plugin repository may lack `dsh.bundle`; verify the selected plugin source. If a configuration edit goes wrong, use its generated backup for recovery.

When catalog access fails, the application falls back to local cache and bundled selections. For unresolved issues, restart the application, check versions and logs, and use the Feedback tab. Diagnostic information is not attached by default; it can be copied separately. Offline users can copy their feedback for the QQ group `1106611027`.
