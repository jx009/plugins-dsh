---
title: "dsh_desktop: DSH Desktop Plugin Bundle"
description: "dsh_desktop is a DSH plugin bundle with a desktop client and runtime. Learn how to install it, manage built-in plugins and fix Node.js errors."
summary: "Run DeepSeek Harness in a desktop window with 33 bundled companion plugins. Choose an installer or portable edition, then manage plugins from settings."
highlights:
  - "33 bundled companion plugins"
  - "Full edition includes Node.js"
  - "Better Sidebar file workspace"
  - "DeepSeek-Bot teams and group chats"
  - "GitHub and Gitee client updates"
faq:
  - q: "How do I install dsh_desktop for DeepSeek Harness?"
    a: "Download the desktop package matching your operating system from the repository's Releases page. Run the installer or extract the Windows portable archive; the README provides desktop downloads rather than a DSH plugin installation command."
  - q: "Does dsh_desktop need Node.js installed?"
    a: "The installer and Full portable edition include a Node.js runtime. Portable Lite requires Node.js 22 or later on the computer."
  - q: "Where do I enable built-in plugins in dsh_desktop?"
    a: "Open Settings → Plugins → Built-in Plugins to inspect versions and change plugin states. Enable and disable changes take effect on the next launch."
  - q: "Does dsh_desktop support macOS and Linux?"
    a: "The README lists macOS 12 or later on Apple Silicon and Linux x64 alongside Windows 10 and 11. Windows arm64 is an experimental release target."
  - q: "Where does dsh_desktop store conversations and portable data?"
    a: "Conversations, attachments, plugin profiles and API credentials live under DSH_HOME, which defaults to ~/.dsh. The portable client's own settings and logs go beside the executable in data; set DSH_HOME inside that directory if you also want the harness data to travel with it."
---

## What does dsh_desktop do?

dsh_desktop is a DSH plugin bundle delivered as a desktop client with a packaged runtime. It helps DeepSeek Harness users start a desktop workspace without separately assembling the runtime and companion plugins. The documented release includes 33 selected companion plugins, covering file work, Bot collaboration, search and session management.

The client uses Tauri 2 and packages the harness runtime. Installers and the Full portable edition include Node.js, while Portable Lite relies on an existing installation. The bundled runtime can start offline; this startup capability does not establish offline availability for every connected service.

## dsh_desktop core features

- **Built-in plugin management**: Inspect bundled plugin versions, search the list, filter by state and enable or disable entries from settings. State changes apply on the next launch.
- **Better Sidebar file workspace**: Work with a file explorer, editor and Diff views in the right sidebar. Local-open actions connect the workspace to files on your computer.
- **DeepSeek-Bot collaboration**: Use a main Bot, persistent Bots and group chats in the same client. The integration includes @ handoffs and shared group memory.
- **Free Search and tool management**: The bundle includes multi-engine search, plus a settings panel for managing MCP servers, skills and rules. These capabilities are supplied by companion plugins.
- **Desktop notifications and updates**: Notifications cover completed turns, approvals and errors, with navigation back to the relevant conversation. Client updates use GitHub and Gitee sources with SHA-256 verification.

## How to install and use dsh_desktop

The supplied README does not provide a DSH installation command for this desktop bundle, and its npm package name is unconfirmed. Install it using a release artifact from `https://github.com/myYangyunfan/dsh_desktop/releases/latest`.

1. Choose your platform: Windows 10/11, macOS 12+ on Apple Silicon, or Linux x64. Windows arm64 is listed as experimental.
2. On Windows, choose `DSH-Desktop-Setup-<version>-win-x64.exe` for installation, or extract the Full portable ZIP. Choose the Lite ZIP only when Node.js 22 or later is already available.
3. Start the application. Its boot sequence performs repairs, synchronizes bundled plugins into the profile, applies patches and checks the kernel before loading the window.
4. Open Settings → Plugins → Built-in Plugins to review the bundle and select the plugins you want. Restart after changing enable or disable settings.
5. Set the `DSH_HOME` environment variable if you need a specific harness data directory. The default is `~/.dsh`, containing conversations, attachments, plugin profiles and API credentials.

Windows installed-client settings and logs are under `%APPDATA%\dsh-desktop\`. Portable-client settings and logs use `data\` beside the executable. To carry harness data with a portable copy as well, point `DSH_HOME` to a location inside that directory. The README states that upgrades and overwrite installations preserve profiles and conversations.

## How to troubleshoot dsh_desktop

- **Node.js is unavailable**: Check whether you downloaded Portable Lite. It needs Node.js 22 or later; use the Full edition if you need a bundled runtime.
- **macOS blocks the first launch**: The documented DMG is ad-hoc signed and not notarized. The README instructs users to right-click the application and choose Open for the first launch.
- **A plugin appears missing or unchanged**: Confirm the active profile and the plugin's enabled state, then restart the client. Built-in enable and disable changes require another launch.
- **Older portable packages behave unexpectedly**: The README identifies a missing bundled Node executable in v1.0.10 portable packages and says v1.1.0 fixes the Full/Lite packaging distinction. Check the actual release number when choosing an artifact.
- **Startup still fails**: Inspect the client version and logs in the documented data directory. Confirm `DSH_HOME` points to the intended configuration before investigating individual plugins.
