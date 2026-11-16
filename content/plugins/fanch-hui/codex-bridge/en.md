---
title: "codex-bridge: ChatGPT MCP Access for DSH"
description: "codex-bridge is a DSH plugin integration that connects ChatGPT to local agents via MCP. Learn how to install, configure DSH and fix connection issues."
summary: "Connect ChatGPT to authorized local projects and delegate coding tasks to DeepSeek Harness. Manage agent sessions, approvals and live output from a desktop app."
highlights:
  - "ChatGPT MCP connection"
  - "DSH ACP and native desktop connections"
  - "Direct Workspace file and command tools"
  - "Live output and task approvals"
  - "Up to four workbench panes"
faq:
  - q: "How do I install codex-bridge for DeepSeek Harness?"
    a: "Download the desktop installer for your platform from the repository’s GitHub Releases. Start the app and enable the desired agent from Connections; the supplied README does not provide a DSH plugin installation command."
  - q: "Does codex-bridge need an agent to edit local files?"
    a: "No. Direct Workspace can read and modify files and run commands after you register a project and connect a supported chat client through MCP. Operations follow the project authorization, execution rules and approval settings."
  - q: "What is the difference between codex-bridge DSH ACP and DSH desktop?"
    a: "ACP uses API configuration, while the desktop connection reuses the official app’s login, tool settings and native sessions. Both can be connected simultaneously with separately saved models and permissions; native desktop support covers full-permission text tasks on macOS and Windows x64."
  - q: "Does codex-bridge support Windows and Linux?"
    a: "The README lists Windows x64 and ARM64 packages, plus Ubuntu 24.04 LTS packages for both architectures. Windows requires WebView2 Runtime, and portable packages must be fully extracted before launch."
  - q: "Why does codex-bridge need refreshing in ChatGPT after an update?"
    a: "The README instructs users to refresh the plugin in ChatGPT after every update to clear cached information from the previous version. Finish running tasks before installing an update and restarting the app."
---

## What does codex-bridge do?

codex-bridge is a DSH plugin integration that connects ChatGPT and other supported clients to authorized local projects and coding agents through MCP. Distributed as a desktop app and background service, it helps developers use DeepSeek Harness from a shared interface for tasks, approvals and sessions.

You can use it in two ways: ask a connected client to operate on project files through Direct Workspace, or delegate work to a coding agent. Direct file access does not require an agent installation. Project authorization, task records and configuration remain on your machine; requests to a chat or model service go to the service you select.

## codex-bridge core features

- **ChatGPT MCP connection**: OpenAI Secure MCP Tunnel connects the browser client to the local service. The documented setup requires a Plus-or-higher or team subscription.
- **Two DSH connections**: ACP uses API configuration, while the native desktop connection shares the official app’s login, tool configuration and sessions. Both can stay connected, with separate model and permission settings.
- **Direct Workspace tools**: Read and write files, apply patches, execute commands and perform Git operations within registered projects. Execution follows the configured rules and approvals.
- **Task and session control**: The web workbench displays live output, tool execution, approval requests and structured questions. It also provides history search, failed-task retries and handoffs between agents.
- **Split workbench views**: Display up to four panes with independent agent conversations and input areas. Supported agents include Codex, OpenCode and Antigravity alongside DSH.

## How to install and use codex-bridge

The supplied README provides desktop downloads rather than a DSH installation command, and no npm package name is confirmed. Download the appropriate installer from `https://github.com/Fanch-hui/codex-bridge/releases/latest`.

1. Install the app for your system. The documented packages cover macOS 14+ on Apple Silicon or Intel, Windows x64 or ARM64, and Ubuntu 24.04 LTS x64 or ARM64. Fully extract portable archives before starting the executable.
2. Launch the app and confirm that its background service is connected. Approve the macOS background item in system settings if prompted.
3. Open Projects and register your repository folder. Registering a directory grants full access to it; a default workspace is available for requests without an explicit project.
4. Connect your chat client. For ChatGPT, configure Secure MCP Tunnel, then add a custom MCP server from its plugin interface. Qwen Studio uses the JSON configuration copied from the Bridge connection page.
5. To delegate coding work, open Connections and enable the desired agent. Existing installations are discovered during initialization; use one-click setup when installation or environment configuration is needed. Agent login or API setup is separate from the client’s MCP connection.
6. Set the default model, reasoning strength and task permissions in the agent details or Settings → Accounts and Models. Create a task in the web workbench, delegate from the built-in workbench, or call `submit_task` through a connected client.

Choose the intended DSH connection for new tasks. Existing tasks retain their original binding, and changing the native desktop model or reasoning strength also updates the desktop defaults for future sessions.

## How to troubleshoot codex-bridge

- **macOS blocks launch**: The app uses ad-hoc signing without Apple notarization. Allow it to open through Privacy & Security in system settings.
- **Windows reports a missing runtime**: Check WebView2 Runtime; the app prompts when the required environment is unavailable.
- **ChatGPT behaves incorrectly after an update**: Refresh its plugin to clear old cached information. Wait for running tasks to finish before installing updates and restarting.
- **Gemini cannot use the tools**: Enable the Bridge app in task mode. The browser version requires Cloud MCP through ChatGPT Sites or ngrok, using the complete dedicated URL generated by Bridge.
- **A task remains queued**: Check Settings → Execution and Approvals. Same-project concurrency defaults to four agents and can be set from one to four; DSH also uses a task-level write lease.

For other connection problems, check the background service, enabled agent connection, installed version and diagnostic logs. Remove credentials before sharing logs or configuration.
