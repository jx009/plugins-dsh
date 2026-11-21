---
title: "MatrixMedia: DSH video publishing"
description: "MatrixMedia is a DSH plugin for multi-platform video publishing through MCP tools. Learn installation, configuration, publishing, and error troubleshooting now."
summary: "Connect DeepSeek Harness to MatrixMedia for multi-platform video publishing, account checks, publishing history, comments, and account statistics through MCP."
highlights:
  - "Publish videos to eight platforms"
  - "MCP tools for AI workflows"
  - "Shared GUI and CLI sessions"
  - "Account and history queries"
  - "Comment reading and replies"
faq:
  - q: "How do I install the MatrixMedia DSH plugin?"
    a: "Open the DSH Web UI, go to Plugins, choose Add Plugin, and enter the MatrixMedia repository as a Git repository. The README does not provide a `dsh plugin` package-install command; the ready-made integration is located in the repository’s `dsh-plugin/` directory."
  - q: "What can MatrixMedia DSH plugin publish?"
    a: "It can automate video publishing to Douyin, Kuaishou, Baijiahao, Bilibili, Toutiao, WeChat Channels, Xiaohongshu, and Fanqie Video. Local files and HTTP(S) video URLs are supported by the CLI publishing flow."
  - q: "Can MatrixMedia DSH plugin use accounts from the GUI?"
    a: "Yes. Log in through the MatrixMedia GUI first, then MCP can reuse the shared account session for publishing and account operations. MCP runs headlessly, so it cannot open a QR-code login window by itself."
  - q: "Why is MatrixMedia DSH plugin showing an Xiaohongshu AI-hosted warning?"
    a: "Xiaohongshu may detect automation inside the Electron window. In the account’s publishing settings, enable the real-browser option, select or detect local Chrome or Chromium, test the connection, and save the setting."
  - q: "How do I troubleshoot MatrixMedia DSH plugin publishing failures?"
    a: "First confirm that the correct DSH profile is active and that the plugin is enabled, then restart DSH and inspect the installed version and logs. Also verify that the target account is logged in through the GUI and that the selected platform supports the requested operation."
---

## What does MatrixMedia do?

MatrixMedia is a DSH plugin for connecting DeepSeek Harness to a multi-platform video publishing and creator-account workflow. The MatrixMedia application combines an Electron GUI with a command-line interface, while its included MCP server lets compatible AI tools call publishing and account functions without manually operating every platform. It is designed for content teams, creator matrices, and automation workflows that need to distribute videos across several accounts.

The repository includes a ready-made `dsh-plugin/` integration for DSH. After it is connected, an agent can work with MatrixMedia’s MCP tools for account discovery, video publishing, publishing history, comments, and account statistics. The main application still handles platform login and browser-based interaction, so DSH should be treated as an orchestration layer rather than a replacement for account authentication.

## MatrixMedia core features

- **Multi-platform video publishing** MatrixMedia supports automated publishing for Douyin, Kuaishou, Baijiahao, Bilibili, Toutiao, WeChat Channels, Xiaohongshu, and Fanqie Video. The publishing workflow can accept a local file or an HTTP(S) video URL, which is downloaded before upload when needed.

- **MCP integration for AI workflows** The built-in MCP server exposes tools that supported clients can call directly. These include video publishing, article publishing, account listing, publishing-history queries, comment retrieval, comment replies, account snapshots, and work statistics.

- **GUI, CLI, and HTTP access** MatrixMedia can be operated through its Electron interface, the `cli` command flow, or the local HTTP endpoint exposed by the GUI. This makes it suitable for DSH agents, shell-based automations, and other workflow systems that consume exit codes or JSON output.

- **Shared login sessions** GUI and CLI operations use shared platform sessions. Douyin and WeChat Channels support CLI QR-code login, while other platforms should be logged in through the GUI before an agent attempts to publish.

- **Publishing and interaction records** CLI commands can check account status and inspect local publishing history. The MCP tools can also retrieve supported comments and perform replies with a confirmation step, helping keep automated interactions reviewable.

## How to install and use MatrixMedia

The README does not list a DSH package-install command, so the `install` field for this listing is intentionally empty. Install the integration from the MatrixMedia Git repository instead:

1. Open the DSH Web UI and enter the **Plugins** section.
2. Select **Add Plugin**, choose the Git repository option, and provide the MatrixMedia repository address.
3. Let DSH load the repository’s `dsh-plugin/` integration, then enable the plugin in the profile you use for web sessions.
4. Restart DSH if the plugin does not appear immediately, and confirm that the MatrixMedia tools are available to the agent.
5. Open MatrixMedia’s GUI and log in to the platform accounts you want to use. MCP operates through a headless stdio process and cannot display a QR-code login window.
6. Ask the DSH agent to list accounts before publishing. Use a specific platform, account, video file or URL, title, and other supported publishing parameters.

For external automation, the CLI follows a `cli` entry pattern and can return stable JSON for account and history queries. The GUI also exposes a local publishing API at `http://127.0.0.1:30088/publish`; use it only when the MatrixMedia GUI is running. If you connect the MCP server directly to another client, build the `mcp/` package and configure the generated server entry with the absolute MatrixMedia directory.

## How to troubleshoot MatrixMedia

If DSH cannot load the integration, verify the Git repository source, the active profile, and whether the plugin is enabled. Restart DSH and check the DSH and MatrixMedia logs, along with the installed application version. A stale plugin process or an incomplete repository checkout can also prevent tools from appearing.

If publishing fails at login, sign in through the GUI first and confirm the target account is shown as active. For CLI or MCP calls, check the platform name, file path or URL, required parameters, and returned exit status. Do not assume a successful request means a platform accepted the upload; inspect the publishing record and platform-side result.

Xiaohongshu can display an automation warning in the embedded Electron window. Open the Xiaohongshu account’s publishing settings, enable **Use real browser**, select a local Chrome or Chromium executable, test the connection, and save it. If Chrome cannot be detected or started, MatrixMedia falls back to the embedded-window mode, so verify the browser path and permissions before retrying.
