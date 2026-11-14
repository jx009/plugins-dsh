---
title: "ds-harness-remote: Remote Access for DSH"
description: "ds-harness-remote is a DSH plugin that opens your local DeepSeek Harness from a phone, browser or second PC over encrypted P2P. Learn setup and fixes."
summary: "A remote access plugin for DeepSeek Harness Desktop. The computer running Harness acts as a Host that web, Android and other DSH clients connect to, with no public IP or open port needed on the Host."
highlights:
  - "Web, Android and iOS clients"
  - "No public IP or open port"
  - "End-to-end encrypted sessions"
  - "Remote files, terminal and previews"
  - "Codex and Claude Code workspaces via ACP"
faq:
  - q: "How do I install ds-harness-remote in DeepSeek Harness?"
    a: "In DSH Desktop, open Plugin management, choose install from npm and enter `ds-harness-remote@0.6.5`, or run `dsh plugin --profile desktop add -w ds-harness-remote@0.6.5`. Restart Desktop afterwards."
  - q: "Does ds-harness-remote need a public IP or port forwarding?"
    a: "No. The Host only opens outbound connections. Paths are tried in the order LAN, P2P, TURN and then an encrypted WebSocket relay."
  - q: "Can the ds-harness-remote server read my conversations?"
    a: "No. Session traffic is end-to-end encrypted between client and Host, and the server relays ciphertext only. It sees control metadata such as account, device and online status, but not prompts, tool output, paths or file contents."
  - q: "Which DSH versions does ds-harness-remote support?"
    a: "The current baseline is `dsh-v0.2.2-rc.1`, and `0.2.1-rc.5` and `0.2.0` rc.1 and rc.2 remain compatible. Support for Harness `0.1.1-rc.2` has been removed."
  - q: "Can ds-harness-remote open Codex, Cursor or Claude Code workspaces?"
    a: "Yes, through experimental ACP workspaces. The Host runs local ACP-capable agents such as Codex, Cursor, OpenCode and Claude, and forwards prompts, streamed replies and approvals."
  - q: "Can I self-host the ds-harness-remote server?"
    a: "Yes. The repository includes a minimal server with LAN, P2P and TURN coordination plus an encrypted relay. TURN needs your own coturn deployment, and the full hosted web client is not included."
---

## What does ds-harness-remote do?

ds-harness-remote is a DSH plugin that lets you use the DeepSeek Harness running on your work computer from another device. A phone, a browser or a second PC connects to that computer, called the Host, and shows the same sessions and workspaces you left on your desk.

Harness keeps running on the Host with its own tools, project setup and permission flows. The client talks to the Host's native Harness API, so a remote workspace opens in the familiar Harness interface rather than a separate chat app. The Host needs no public IP and opens no listening port; connections go out from the Host and are end-to-end encrypted.

By default the plugin coordinates connections through the project's hosted server at `dsh.r2049.cn`. A minimal server for self-hosting is also in the repository.

## ds-harness-remote core features

- **Many clients**: a Remote sidebar inside DSH Desktop, a web page, a native Android app, iOS in TestFlight beta, and the third-party DSH Go app.
- **Outbound-only Host**: no port forwarding. Connections prefer LAN and P2P, then TURN, then an encrypted WebSocket relay.
- **End-to-end encryption**: traffic is encrypted between client and Host with a Noise protocol suite; the server only relays ciphertext.
- **Files, terminal and previews**: browse workspace files with read-only previews, use a remote terminal, and open authorized previews of local development servers.
- **Agent tools**: optional `remote_*` session tools let an agent discover Hosts and workspaces, manage sessions, read history and transfer authorized files.
- **ACP workspaces**: experimental support for running Codex, Cursor, OpenCode, Claude and other ACP-capable agents on the Host.
- **Concurrent clients**: several devices can connect to one Host at the same time, each with isolated calls and streams.

## How to install and use ds-harness-remote

1. On the Host computer, open Plugin management in DSH Desktop, choose install from npm and enter `ds-harness-remote@0.6.5`. Or run:

   ```bash
   dsh plugin --profile desktop add -w ds-harness-remote@0.6.5
   ```

2. Restart DSH Desktop.
3. Open **Remote** from the Harness sidebar and sign in with Zhihu, GitHub or Google, or with an account and password. Registering an account requires an invitation code from the author.
4. On the other device, either install the same plugin and sign in, or open Remote Web, the Android app, iOS or DSH Go directly.
5. Select an online Host, then pick an existing workspace or browse remote folders to open one.

On DSH 0.2.2 and later, npm installs can be checked and updated from Plugin management. On Linux, sign in at `dsh.r2049.cn` to get a one-command install with an authorization code.

## How to troubleshoot ds-harness-remote

- **The Host does not appear online.** Confirm the plugin is installed and signed in on the Host, that you restarted DSH Desktop, and that both devices use the same account.
- **The plugin fails on an older DSH.** Check your Harness version against the compatibility baseline `dsh-v0.2.2-rc.1`. Support for `0.1.1-rc.2` has been removed.
- **Online updates are unavailable.** Updates in Plugin management only work for npm installs. If you installed from GitHub or a local link, reinstall from npm first.
- **Connections are slow or drop.** When LAN and P2P fail, traffic goes through TURN or the relay, which adds latency. On the Host, enable **Debug logging** in Plugins → Remote settings and look for `[ds-harness-remote]` in the log, or `desktop.log` on Desktop.
- **The Android app cannot connect.** Reproduce the problem, then use Settings → Diagnostics → Export connection log. The file excludes credentials and conversation content, so it is safe to attach to an issue.

Remember that the remote terminal runs as the Host user and is on by default. Turn off `terminal.enabled` on the Host if you do not need it.
