---
title: "dsh-desktop: Native DSH App for Windows and Mac"
description: "dsh-desktop is a DSH desktop app that runs DeepSeek Harness on Windows, macOS and Linux with no Node.js setup. Learn how to install it and fix common issues."
summary: "A community-built desktop client that wraps the DSH Web UI, Host service and plugin system into one installable app. No Node.js or command-line setup needed."
highlights:
  - "Windows, macOS and Linux installers"
  - "Built-in DSH plugin marketplace"
  - "Mobile remote control for iOS and Android"
  - "Per-profile setup wizard"
  - "Uses your system proxy automatically"
faq:
  - q: "How do I install dsh-desktop?"
    a: "Download the Windows installer or macOS DMG from dshdesktop.cn, or the Linux deb, AppImage or tar.gz from the project's GitHub Releases page. The installer bundles Node.js, pnpm and a pinned DeepSeek Harness, so nothing else needs to be set up first."
  - q: "How do I add DSH plugins in dsh-desktop?"
    a: "Use the built-in marketplace, or open DSH Terminal from the tray and run `dsh plugin add`, `dsh plugin remove` or `dsh plugin update`. The commands target the active profile, and you need to restart the app after changing plugins."
  - q: "Is dsh-desktop an official DeepSeek product?"
    a: "No. The README calls it an independent community project with no affiliation or endorsement from DeepSeek. It runs an unmodified, pinned upstream DeepSeek Harness and adds the desktop shell as a plugin."
  - q: "Does dsh-desktop use my system proxy?"
    a: "Yes. At startup it reads the operating system's proxy settings, including PAC scripts, and applies them to model calls, web search, MCP and plugin installs. `HTTPS_PROXY` and similar variables take priority, and SOCKS-only setups are not supported."
  - q: "Can other devices on my network open dsh-desktop?"
    a: "Not by default: the Web service listens on the loopback interface only. LAN access is a separate opt-in setting, and the README warns it has no authentication, so anyone on the same network could operate your computer."
  - q: "How do I update dsh-desktop on Linux?"
    a: "Linux builds cannot update inside the app. The app tells you a new version exists and opens its release page; download the same format again, then reinstall the deb with `sudo apt install` or replace the old AppImage."
---

## What does dsh-desktop do?

dsh-desktop is a DSH desktop app that runs DeepSeek Harness as a native application on Windows, macOS and Linux. It starts and manages the local Harness service for you, adds a window, a system tray icon and a terminal, and needs no Node.js installation or command-line setup before the first conversation.

The project is community-built and states that it is not affiliated with DeepSeek. It does not patch upstream code: a pinned DeepSeek Harness release runs unchanged, and the desktop parts are added through the plugin mechanism the harness already provides. The desktop shell is therefore one more DSH plugin, and plugins compatible with the pinned upstream version keep working.

Because it is distributed as installers, you do not add dsh-desktop with `dsh plugin add`. Download it, install it, and it brings its own copy of DSH with it.

## dsh-desktop core features

- **Native installers**: an NSIS installer for Windows x64, a universal DMG for Intel and Apple Silicon Macs, and deb, AppImage and tar.gz builds for Linux x64 and arm64.
- **Plugin marketplace**: the built-in DSH Community Market handles plugin discovery, details, installation and management, and can read any data source that follows its public schemas.
- **Mobile remote control**: from version 2.0.9, you can connect from iOS or Android to start tasks, follow the agent's progress and send follow-ups.
- **Setup wizard**: on the first launch of each profile, a native wizard sets window mode, marketplace, notifications, browser opening and Web access scope. It can be skipped.
- **System proxy support**: the app reads your operating system's proxy settings at startup and uses them for model calls, web search, MCP servers and plugin installs.
- **Loopback by default**: the Web service is only reachable from your own machine unless you turn on LAN access.

## How to install and use dsh-desktop

1. Download the build for your system: Windows and macOS installers from `https://dshdesktop.cn`, Linux packages from the project's GitHub Releases page.
2. On Windows, run the installer. On macOS, open the DMG and drag DSH Desktop into Applications.
3. On Debian, Ubuntu and their derivatives, install the deb and start the app from the application menu:

   ```bash
   sudo apt install ./DSH-NEXT-<version>-amd64.deb
   ```

4. On other distributions, make the AppImage executable and run it:

   ```bash
   chmod +x DSH-NEXT-<version>-x86_64.AppImage
   ```

5. Complete the setup wizard on first launch, or skip it.
6. Install plugins from the built-in marketplace, or open DSH Terminal from the tray and run `dsh plugin add <package>`. Restart the app after adding or removing plugins.

The README recommends the deb on Ubuntu 24.04 and later because it installs the AppArmor profile Chromium's sandbox needs. Each release page includes `SHA256SUMS.txt` for checking downloads; arm64 file names end in `-arm64.deb` and `-arm64.AppImage`.

## How to troubleshoot dsh-desktop

- **A plugin I installed does not show up.** Plugin commands apply to the active profile, and each profile has its own plugins. Check which profile is active, or pass `--profile <name>` explicitly, then restart dsh-desktop.
- **Model calls or plugin installs fail behind a proxy.** The app reads the system proxy only at startup, so restart it after switching the proxy on or changing nodes. If your proxy client offers only SOCKS, enable its HTTP or mixed port. Environment variables such as `HTTPS_PROXY` override the system setting.
- **The app will not start on Ubuntu 24.04.** Install the deb rather than the AppImage or tar.gz; the deb adds the AppArmor configuration that Chromium's sandbox requires.
- **Linux shows an update but cannot install it.** In-app updates are not available on Linux. Download the same format from the release page and reinstall manually.
- **Another device on the network cannot connect.** The Web service listens on loopback only. LAN access is a separate opt-in setting with no authentication, so only enable it on a network you fully trust.

When reporting a problem, include the app version, your operating system and package format, and the profile you were using.
