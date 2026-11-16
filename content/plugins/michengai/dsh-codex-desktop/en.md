---
title: "dsh-codex-desktop: DSH Desktop Workspace"
description: "dsh-codex-desktop is a DeepSeek Harness desktop client with bundled runtimes. Learn how to install, use its DSH plugin market and check errors."
summary: "Run a local DSH workspace without preparing Node.js or starting a terminal service. Manage conversations, skills, plugins, messaging channels and scheduled tasks from a desktop window."
highlights:
  - "Bundled Node.js and local DSH runtime"
  - "DSH plugin market"
  - "Agent skills and expert presets"
  - "IM assistant channel management"
  - "Scheduled tasks and conversation archives"
faq:
  - q: "How do I install dsh-codex-desktop?"
    a: "Download the installer or archive for your operating system from the repository's GitHub Releases. Open the installed application and wait for its local DSH service to start before creating a task."
  - q: "Does dsh-codex-desktop need Node.js installed first?"
    a: "No separate Node.js setup is required because the installer supplies the runtime alongside the local DSH runtime. You can launch the workspace as a desktop application without starting DSH in a terminal."
  - q: "Does dsh-codex-desktop support Windows, macOS and Linux?"
    a: "The documented builds cover Windows x64, macOS Apple Silicon and Intel, and Linux x64 and ARM64. Available formats include Windows installers and archives, macOS disk images, and Linux AppImage and deb packages."
  - q: "Will dsh-codex-desktop keep my sessions after an upgrade?"
    a: "The application uses your existing DSH user profile, allowing sessions and settings to remain available across application upgrades. The documented Windows location is `%USERPROFILE%\\.dsh`."
  - q: "Is dsh-codex-desktop an official DeepSeek application?"
    a: "It is a community-maintained desktop distribution of DeepSeek Harness. The README explicitly identifies it as separate from official DeepSeek AI products."
---

## What does dsh-codex-desktop do?

dsh-codex-desktop is a community-maintained desktop distribution of DeepSeek Harness that bundles the environment needed to run a local AI workspace. It serves developers who want project navigation, task conversations and model controls in an application they can launch directly. The installer supplies Node.js and the local DSH runtime, removing the need to prepare that environment separately or start the service from a terminal.

The project is a desktop client with a DSH plugin market, rather than an individual package to add through the plugin CLI. It is maintained by the community and is not an official DeepSeek AI product. Desktop packages are documented for Windows, macOS and Linux.

## dsh-codex-desktop core features

- **Desktop conversation workspace:** Navigate projects and tasks, manage conversation sessions, choose models and permission modes, and inspect session logs inside the desktop window. The local service starts on a validated loopback address, with the browser interface contained in the application shell.
- **Expert presets and Agent skills:** Enable specialist roles for code review, architecture, frontend, backend and operations. In Settings, inspect, upload, enable or disable local and shared skills.
- **DSH plugin market:** Discover community extensions, install or update them, inspect their enabled state and access diagnostic tools. Initial startup prepares desktop-facing community plugins in the Web profile, including the documented Codex-style workspace UI.
- **IM assistant:** Configure messaging channels such as DingTalk, Feishu, Lark, WeChat, WeCom, QQ and Telegram from one place. The interface also provides access to accounts and incoming messages.
- **Scheduled automation and archives:** Manage recurring tasks through the built-in scheduling capability and access run history. Search archived conversations, restore a session or permanently remove archived records.

## How to install and use dsh-codex-desktop

The supplied README does not document a DSH installation command for this desktop application. Start with its platform packages from GitHub Releases at `https://github.com/MichengAI/dsh-codex-desktop/releases`.

1. Choose a package matching your system and processor. Windows x64 offers an `.exe` installer or `.zip` archive; macOS offers `.dmg` packages for Apple Silicon and Intel; Linux offers `.AppImage` and Debian/Ubuntu `.deb` packages for x64 and ARM64.
2. Install and launch the application. On Windows, the installer route provides a Start menu entry. On macOS, open the disk image and move the app to Applications. On Linux, run the matching AppImage or install the deb package.
3. Let the bundled local service finish starting. First launch also prepares the desktop-facing community plugins in the Web profile.
4. Create a task, select a model and permission mode, and begin work in your project. Use Settings for skill management, then open the relevant plugin, messaging or automation page when configuring those capabilities.

Application upgrades retain access to sessions and settings through the existing DSH user profile. On Windows, the documented data directory is `%USERPROFILE%\.dsh`.

## How to troubleshoot dsh-codex-desktop

The supplied README excerpt provides no specific error codes or error-specific repair procedures. Use basic checks to establish which part of startup or configuration needs attention:

- Confirm that the downloaded package matches your operating system and CPU architecture.
- If the workspace is not ready, check whether the local service has completed startup, then restart the application if necessary.
- If a desktop plugin is missing, check the Web profile and confirm that the relevant plugin is enabled. Inspect its installation and update status in the plugin market.
- Check application and plugin versions, then review available logs and plugin diagnostics. When reporting an issue, include the platform, version and relevant log details.
