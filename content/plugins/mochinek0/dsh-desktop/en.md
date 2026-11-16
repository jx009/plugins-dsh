---
title: "dsh-desktop: DSH Desktop and Phone Access"
description: "dsh-desktop is a DSH plugin-enabled desktop client with phone access. Learn how to install it, configure remote access and fix startup errors."
summary: "Run dsh web in a native desktop window and continue the same sessions from your phone. Includes quick questions, workspace shortcuts and plugin recovery."
highlights:
  - "Phone access over LAN or Tailscale"
  - "Cloudflare access with your own domain"
  - "Global quick-question shortcuts"
  - "Shared CLI sessions and configuration"
  - "Safe startup for broken plugins"
faq:
  - q: "How do I install dsh-desktop for DeepSeek Harness?"
    a: "Download the installer for your operating system from the project website or GitHub Releases, then open the installed application. If no usable Node installation is found, the runtime panel offers to install Node 24."
  - q: "Can dsh-desktop connect to my phone outside home Wi-Fi?"
    a: "The phone connection menu supports Tailscale for access away from your local network, including cellular connections. Cloudflare is another option using your own domain, and is the only documented connection mode with HTTPS."
  - q: "Does dsh-desktop share sessions with the DSH CLI?"
    a: "Yes: sessions, credentials and configuration use DSH_HOME, which defaults to ~/.dsh. Using the same data directory gives the desktop application access to the same data as the CLI."
  - q: "How do I recover dsh-desktop when a plugin breaks startup?"
    a: "Use the loading page option to start without installed plugins; built-in dsh plugins remain available. The application then opens the plugin panel so you can remove the problematic plugin before reloading plugins from the menu."
  - q: "Does dsh-desktop support Windows, macOS and Linux?"
    a: "Installers are available for all three platforms, with a universal macOS binary for Apple Silicon and Intel. Windows requires WebView2 and guides installation if it is missing; Linux offers .deb and .AppImage packages."
---

## What does dsh-desktop do?

dsh-desktop is a DSH plugin-enabled, unofficial desktop client that opens `dsh web` in a native window. It helps DeepSeek Harness users work without keeping a terminal open, manage tasks from the system tray and continue sessions in a phone browser. The application starts the local service in the background and selects an available loopback port automatically.

Sessions, credentials and configuration live in `DSH_HOME`, defaulting to `~/.dsh`, so the desktop client and CLI use the same data when pointed at that directory. Built with Tauri v2 and the system WebView, it provides desktop enhancements through bundled plugins without modifying dsh itself. This is a third-party project with no affiliation to DeepSeek.

## dsh-desktop core features

- **Phone access:** Choose LAN for the same Wi-Fi, Tailscale for access while away, or Cloudflare with your own domain. Cloudflare is the only documented HTTPS option and closes automatically after 30 minutes of inactivity.
- **Device pairing:** Scan a QR code and approve the new device on the computer. Pairing codes expire after five minutes and work once; pairings last 30 days. Disconnect devices individually, or disconnect all devices and rotate the key.
- **Quick questions:** Open a compact prompt window with `Ctrl+Alt+Space`, or `Ctrl+Option+Q` on macOS. Choose a workspace, existing session or model without opening the main window; shortcuts can be customized in settings.
- **Workspace navigation:** Open a folder with `dsh-desktop <path>`, the file manager context menu or a `dsh-desktop://open?path=` link. Tray menus expose recent workspaces and active sessions; Windows also provides a taskbar Jump List.
- **Plugin management and recovery:** A visual panel supports local plugin selection through the system file picker and features DSH Market. A recovery startup option makes the panel accessible when an installed plugin prevents normal loading.

## How to install and use dsh-desktop

No DSH installation command or npm package name is documented for the desktop application. Install it using the operating-system packages from `https://dsh-desktop.cc.cd/` or `https://github.com/MochiNek0/dsh-desktop/releases`.

1. Download the Windows `.exe`, macOS `.dmg`, or Linux `.deb` or `.AppImage`, then install and open it. The macOS package supports both Apple Silicon and Intel.
2. Complete runtime setup if prompted. Running dsh requires Node.js 22.19.0 or newer; the runtime panel can install Node 24. Node and dsh are not bundled, so downloading missing components requires internet access.
3. Use the main window or quick-question shortcut to begin work. Blue status badges indicate activity, while orange badges indicate that a response is needed. Closing the window sends it to the tray; use the menu exit action to quit dsh.
4. Open the phone connection menu, choose a connection method, scan the code and approve the device on the desktop. The phone uses its browser and needs no separate app.
5. Customize shortcuts and sleep prevention in settings. Theme and interface language follow dsh settings without a restart. For environment configuration, `DSH_HOME` selects the data directory; `DSH_BIN` specifies an absolute executable path, takes priority over discovery and skips the Node version check.

## How to troubleshoot dsh-desktop

- If startup stalls after adding a plugin, choose the loading page action to start without installed plugins. Remove the offending plugin in the panel, then use the menu to reload plugins.
- If macOS blocks first launch, right-click the application in Finder and choose Open. The documented terminal alternative is `xattr -dr com.apple.quarantine /Applications/dsh-desktop.app`.
- If a `github:` plugin fails because pnpm blocks its build scripts, follow the panel instructions to permit the build under `allowBuilds` in `$DSH_HOME/profiles/web/pnpm-workspace.yaml`.
- If the runtime is unavailable, check the Node requirement and finish the offered runtime setup. Windows users should also complete the WebView2 installation prompt when shown.
- For other failures, confirm the intended profile and data directory, restart DSH, and inspect version information and logs before reporting the issue.
