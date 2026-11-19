---
title: "DSH-X: Multi-Instance Launcher for DSH"
description: "DSH-X is a DSH launcher with plugin management and multi-instance support. Learn how to install it, configure launch entries, and diagnose startup errors."
summary: "Run separate DeepSeek Harness environments side by side without replacing the official Web UI. Choose a version and profile for each launch entry, and manage plugins and modpacks from the launcher."
highlights:
  - "Parallel launches with per-entry profiles"
  - "DSH version pinning and cleanup"
  - "Plugin marketplace and modpack imports"
  - "WSL and SSH remote launches"
  - "Startup logs grouped by plugin"
faq:
  - q: "How do I install DSH-X for DeepSeek Harness?"
    a: "Download the desktop installer for your platform from the GitHub Releases page of `yyh-001/DSH-X`. The launcher downloads `dsh-x-core` on first run; DSH-X itself is not installed as a DSH plugin."
  - q: "Does DSH-X support Windows, macOS, and Linux?"
    a: "The README lists installers for Windows 10 or later on x64, macOS 13 or later on Apple Silicon and Intel, and Linux on x64. Linux users can choose an AppImage or a Debian package."
  - q: "How do I keep DSH-X sessions separate between launch entries?"
    a: "Choose session isolation when creating a launch entry to give it a separate user directory. The default plugin isolation mode separates plugin settings but shares sessions, memory, and skills."
  - q: "Can DSH-X import DSH-PackForge modpacks?"
    a: "Yes. The Instances page supports DSH-PackForge v5 `.dspack` files and is where you manage the plugins and dependencies associated with an instance."
  - q: "Does DSH-X replace the official DeepSeek Harness Web UI?"
    a: "No. DSH-X is a community-maintained launcher that opens the original Web UI. Opening it in a launcher tab, a separate window, or your system browser changes where it appears, not the interface itself."
---

## What does DSH-X do?

DSH-X is a desktop launcher for DeepSeek Harness that manages DSH plugins, versions, and parallel instances. It is useful when you want to test a different version or plugin setup without changing the launch entry you use every day. The community project opens the original DSH Web UI rather than replacing it with a custom interface.

## DSH-X core features

- **Launch entries and isolation:** Choose a user directory, profile, version, and port for each entry. Run entries side by side and choose whether to separate only plugin settings or also sessions, memory, and skills.
- **Version management:** Detect installed DSH versions, install or remove them, and review their disk usage. Pin a version to a launch entry when you do not want that entry to switch versions.
- **Plugin marketplace and modpacks:** Install plugins from the marketplace and enable or disable them by profile. Managed instances can pin both the DSH version and the plugin set, and support import and export with DSH-PackForge v5 `.dspack` compatibility.
- **WSL and SSH launches:** Configure a connection under Settings → Remote Management and use it for a launch entry. For SSH launches, the remote host runs the service and the page opens locally through an SSH tunnel.
- **MCP and skills:** Browse the built-in marketplaces for MCP and skills. These are separate from the launcher settings that control where the official Web UI opens.

## How to install and use DSH-X

1. Open the GitHub Releases page for `yyh-001/DSH-X` and download the package for your system. Use the x64 installer on Windows, the matching Apple Silicon or Intel disk image on macOS, or the AppImage or `.deb` on x64 Linux. Make the AppImage executable before running it.
2. Open the launcher while connected to the internet. The installer contains the Electron shell; on first launch it fetches `dsh-x-core` from npm and displays download progress. The shell and core update separately.
3. Create a launch entry. Use the default plugin isolation mode if you want a different profile without giving up access to shared sessions and memory. For separate session data, choose session isolation. Use the custom option to supply your own user directory, profile, or port. Keep DSH user and version directories outside the launcher installation directory.
4. Select the DSH version and start the entry. Open the Web UI in a launcher tab, a separate window, or your system browser. For plugin changes, check which profile the entry uses; for a modpack, go to Instances to manage its plugins and dependencies.

## How to troubleshoot DSH-X

- **A plugin fails during startup:** A red log indicator flags plugin errors. Open the raw log for the error details and use the timing view to see startup costs grouped by plugin. The space view helps you inspect disk usage. Check that the plugin is enabled in the launch entry's profile and confirm compatibility with the selected DSH version.
- **The Linux AppImage cannot use FUSE:** Run it with `--appimage-extract-and-run`. If Windows SmartScreen instead reports an unknown publisher, the README notes that the installer is not Authenticode-signed and provides SHA256 verification instructions.
- **A configuration change causes problems:** The launcher saves a configuration snapshot before startup. Use the restore option on the Instances page or in the profile actions menu to roll back the configuration and reinstall dependencies.
