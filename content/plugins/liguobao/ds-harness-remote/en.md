---
title: "ds-harness-remote: remote access to local DSH"
description: "ds-harness-remote is a DeepSeek Harness plugin for opening the workspaces on your own computer from a phone, browser or second PC over an encrypted P2P link."
summary: "A remote access plugin for DeepSeek Harness Desktop. The computer running Harness acts as a Host that web, Android and other DSH clients connect to, with no public IP or open port needed on the Host."
highlights:
  - "Web and mobile clients"
  - "No public port"
  - "End-to-end encrypted channel"
  - "Remote files and terminal"
  - "ACP agent workspaces"
faq:
  - q: "Does the host computer need a public IP or port forwarding?"
    a: "No. The Host only opens outbound connections. Paths are negotiated in the order LAN, P2P, TURN, then Relay, and when WebRTC cannot connect the link falls back to an encrypted WebSocket relay."
  - q: "Can the hosted ds-harness-remote server read my conversations?"
    a: "According to the README, traffic is encrypted on the client and decrypted only by the selected Host, using the Noise_IK_25519_ChaChaPoly_SHA256 suite. The service coordinates connections and can observe network metadata, but not messages, prompts, tool output or file contents."
  - q: "Can ds-harness-remote open Codex, Cursor or Claude Code workspaces as well?"
    a: "Yes, through ACP workspaces, which the README labels experimental. The Host runs local ACP-capable agents and forwards prompts, streamed replies and approvals; listed backends are Codex, Cursor, Antigravity, Pi, OpenCode and Claude."
---

## What does ds-harness-remote do?

ds-harness-remote lets you keep using the DeepSeek Harness instance on your work computer from another device. A phone, a browser or a second PC connects to that computer, called the Host, and shows the same sessions and workspaces.

Harness itself keeps running on the Host with its own tools, project setup and permission flows. The client switches to the Host's native Harness API, so a remote workspace opens in the usual Harness interface, not a separate chat UI. The README lists DSH Desktop as the supported host; dsh-TUI integration is planned.

By default the plugin uses the project's hosted server at dsh.r2049.cn to coordinate connections. A minimal server for self-hosting is in the repository, though it does not include the full hosted web client.

## Core features

- **Several client types**: A Remote sidebar in DSH Desktop, a web page, an Android app and the third-party DSH Go app are supported. iOS is in TestFlight beta.
- **Outbound-only Host**: The Host needs no public IP or listening port. Connections prefer LAN and P2P, then TURN, then a relay.
- **End-to-end encryption**: Session traffic is encrypted between client and Host; the server relays ciphertext.
- **Files, terminal and previews**: The sidebar gives access to workspace files, read-only previews, a remote terminal and authorized previews of local development services. The terminal runs as the Host user and is on by default.
- **Remote tools for agents**: Optional `remote_*` session tools let an agent discover Hosts and workspaces, manage sessions, read history and transfer authorized files.
- **Concurrent clients**: Several clients can connect to one Host at once, with RPC calls and streams isolated per connection.

## How to use ds-harness-remote

1. In DeepSeek Harness Desktop, open Extensions / Plugin management, choose installation from npm and enter the package name. Restart Desktop afterwards. The README also gives a launcher command for its pinned release:

```console
dsh plugin --profile desktop add -w ds-harness-remote@0.6.4
```

2. Open **Remote** from the Harness sidebar.
3. Sign in with Zhihu, GitHub or Google authorization, or with an account and password. Registering an account requires an invitation code from the repository author.
4. On the other device, either install the same plugin and sign in, or use Remote Web at https://dsh.r2049.cn, the Android app or DSH Go, none of which need the plugin.
5. Select an online Host, then pick an existing workspace or browse remote directories to open one.
