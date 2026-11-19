---
title: "DSHCode: Run DSH on macOS and Windows"
description: "DSHCode is a desktop app for the DSH plugin runtime on macOS and Windows. Learn how to install it, set your API key and recover from plugin failures."
summary: "Open the Harness workspace from Applications or the Start menu. DSHCode handles the local service and gives you graphical controls for models, plugins and session recovery."
highlights:
  - "macOS and Windows desktop installers"
  - "Plugin installation from npm or Git"
  - "Per-provider reasoning controls"
  - "Plan review before execution"
  - "Safe mode for plugin failures"
faq:
  - q: "How do I install DSHCode on an Apple Silicon Mac?"
    a: "Choose the DMG ending in `macos-arm64.dmg` from the project’s GitHub Releases. After installation, open DSHCode from Applications."
  - q: "Does DSHCode need Node.js on Windows?"
    a: "The Windows x64 installer includes the runtime. Launch the app from the Start menu and it starts the Web profile for you."
  - q: "Where do I enter my DeepSeek API key in DSHCode?"
    a: "Enter your key in the desktop app’s settings. DSHCode uses that credential to access DeepSeek models through the official API."
  - q: "How do I recover an archived conversation in DSHCode?"
    a: "Search for the conversation in archive management. Select the matching session and restore it to continue the conversation."
  - q: "Who maintains DSHCode?"
    a: "DSHCode is an independent community project. Its desktop distribution incorporates the Web UI and plugin runtime from DeepSeek’s open-source Harness project."
---

## What does dshcode do?

DSHCode is a community desktop app that packages the DeepSeek Harness Web UI and DSH plugin runtime for macOS and Windows. If you want to use the agent from a graphical workspace, you can open the app, configure your model and start a conversation. The desktop app manages the local Web service throughout the session, from startup to shutdown.

The workspace runs in an Electron window. Its HTTP service listens on `127.0.0.1`, and the operating system assigns an available port at launch. The app opens that address itself. Quitting the app stops the service and frees the port. Desktop integration also includes a tray icon and system notifications.

## dshcode core features

- **Plugin management** lets you install a DeepSeek Harness plugin from npm or a Git repository. You can check for updates and enable or disable each extension individually.
- **Model controls** let you set reasoning effort and the maximum output token count for each provider. Separate controls cover image input, generation and recognition.
- **Plan and Goal modes** support work that takes several steps. Use Plan to review the agent’s proposed actions before approving execution. Use Goal to keep an objective active across conversation turns.
- **Skills and interactive results** share the conversation workspace. Install a skill for a task such as research or document writing. GenUI cards can display tables, charts, forms and progress alongside the conversation.

## How to install and use dshcode

1. Go to `github.com/whitelonng/dshcode/releases` and choose an installer for your machine. On a Mac with Apple Silicon, select the file ending in `macos-arm64.dmg`. For an Intel Mac, choose `macos-x64.dmg`. Windows x64 users need `win-x64.exe`.
2. Compare the downloaded file’s SHA-256 checksum with its entry in `SHA256SUMS.txt` from the same release. Run the installer, then launch DSHCode from Applications on macOS or the Start menu on Windows.
3. Open settings and enter your DeepSeek API key. Start a conversation in the workspace. For a task you want to review before execution, select Plan mode and read the proposed steps before approving them.
4. When you need an extension, open the plugin manager, install it from its npm or Git source and check that it is enabled. For a previous conversation you archived, use archive search and restore the matching session.

## How to troubleshoot dshcode

- **A warning appears before first launch.** Preview installers are unsigned, and the macOS builds also lack notarization. After checking the download against the release checksum, right-click the app in Finder, choose Open and confirm. In Windows SmartScreen, choose More info, then Run anyway.
- **A plugin fails to load.** Read the diagnostics in the failure notice to identify the extension. Disable that plugin, or start in safe mode if it prevents normal startup. The repair option passes the failure details to the agent so it can attempt a fix.
- **A model request fails after installation.** Check the API key in settings. To inspect the context of a particular request, open the session log, which records what the model received during the run.
