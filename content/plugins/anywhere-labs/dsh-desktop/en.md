---
title: "dsh-desktop: a native desktop app for DSH"
description: "dsh-desktop packages DeepSeek Harness as a native app for Windows, macOS and Linux, with a built-in plugin marketplace and mobile remote control."
summary: "A community-built desktop client that wraps the DSH Web UI, Host service and plugin system into one installable app. No Node.js or command-line setup needed."
highlights:
  - "Windows, macOS, Linux builds"
  - "Built-in plugin marketplace"
  - "Mobile remote control"
  - "Per-profile setup wizard"
faq:
  - q: "Is dsh-desktop an official DeepSeek product?"
    a: "No. Its README calls it an independent community project that is not affiliated with or endorsed by DeepSeek. It runs a pinned upstream DeepSeek Harness version unchanged and adds the desktop shell as a plugin."
  - q: "Can other devices on my network open dsh-desktop?"
    a: "Not by default: the Web service listens on the loopback interface only. LAN access is a separate opt-in setting, and the README warns that it has no authentication, so anyone on the same network could operate your computer."
  - q: "How do updates work on Linux?"
    a: "Linux builds cannot install updates inside the app. The app tells you when a new version exists and offers to open its release page, where you download the same format again and update manually."
---

## What does dsh-desktop do?

dsh-desktop runs DeepSeek Harness as a native desktop application on Windows, macOS and Linux. It starts and manages the local Harness service for you, so there is no Node.js installation or command-line setup before the first conversation.

The project is community-built and states that it is not affiliated with DeepSeek. It does not patch upstream code: a pinned DeepSeek Harness version runs as is, and the desktop parts (window, tray, terminal, updates and work profiles) are added through the plugin mechanism the harness already provides. The desktop shell is therefore one more DSH plugin, and plugins compatible with the pinned upstream version keep working.

It is distributed as desktop installers, not as a package you add with the `dsh plugin` command.

## Core features

- **Native installers**: an NSIS installer for Windows x64, a universal DMG for macOS, and deb, AppImage and tar.gz builds for Linux x64 and arm64.
- **Plugin marketplace**: the built-in DSH Community Market covers plugin discovery, details, installation and management, and accepts data sources that follow its public schemas.
- **Mobile remote control**: connect from iOS or Android to start tasks, watch agent progress and send follow-ups. Built in since 2.0.9.
- **Setup wizard**: on the first launch of each profile, a native wizard sets window mode, marketplace, notifications, browser opening and Web access scope. It can be skipped.
- **Loopback by default**: the Web service is reachable only from the local machine unless you turn on LAN access, which has no authentication.

## How to use dsh-desktop

1. Download the build for your system: Windows and macOS installers from https://dshdesktop.cn, Linux packages from the project's GitHub Releases page.
2. On Windows, run the installer and follow its prompts. On macOS, open the DMG and drag DSH Desktop into Applications.
3. On Debian, Ubuntu and their derivatives, install the deb and start the app from the application menu:

   ```sh
   sudo apt install ./DSH-NEXT-<version>-amd64.deb
   ```

4. On other distributions, make the AppImage executable and run it:

   ```sh
   chmod +x DSH-NEXT-<version>-x86_64.AppImage
   ```

5. Complete the setup wizard on first launch, or skip it.
6. Open the built-in marketplace to browse and install plugins.

The README recommends the deb on Ubuntu 24.04 and later, and the release page includes a `SHA256SUMS.txt` file for checking downloads. On arm64 machines the file names end in `-arm64.deb` and `-arm64.AppImage`.
