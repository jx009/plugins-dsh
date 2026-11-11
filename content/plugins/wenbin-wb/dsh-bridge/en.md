---
title: "dsh-bridge: remote access and IM bots for DSH"
description: "dsh-bridge puts DeepSeek Harness on your phone through LAN QR codes or public tunnels, and lets you run sessions from WeChat, QQ, Feishu or Telegram."
summary: "A remote access plugin for DSH: scan a QR code on the same Wi-Fi, open a Cloudflare or self-hosted tunnel, or message a chat bot to start, stop and approve tasks."
highlights:
  - "LAN QR-code access"
  - "Three tunnel modes"
  - "Four chat platforms"
  - "Password and admin lock"
  - "Installable mobile PWA"
faq:
  - q: "Do I need a public IP or my own server to reach DSH from outside?"
    a: "No. The default temporary tunnel creates a trycloudflare.com address without a login or port forwarding. A Cloudflare tunnel token gives you a fixed domain, and the custom WebSocket tunnel is for people who prefer to route through their own VPS."
  - q: "What can I do from a chat app?"
    a: "The bots accept slash commands: /sessions and /use to switch sessions, /new to start a task, /stop to halt it, /yes or /no to answer permission requests, and /diff to export changes as a .patch file."
  - q: "Who is allowed to message the bot?"
    a: "Each bot keeps a sender allowlist. The admin who sends the first message after login is bound to it automatically, and only authorized senders can drive the agent."
---

## What does dsh-bridge do?

dsh-bridge makes a DeepSeek Harness instance running on your computer reachable from other devices. You can open the DSH interface on a phone over the local network, expose it through a public tunnel, or talk to it through a chat bot.

It suits people who start a long agent task at their desk and want to check progress, approve an operation or send the next instruction while away. Everything is configured in one "Remote Access" panel in DSH settings, which follows the DSH language (Chinese or English).

## Core features

- **LAN access**: starts with DSH and shows a QR code that a phone on the same Wi-Fi scans to open the mobile UI. With several network interfaces, you pick one and the choice persists.
- **Public tunnels**: a temporary Cloudflare tunnel with no login, a Cloudflare tunnel token bound to a fixed domain, or a custom WebSocket tunnel to your own VPS. The public entry is probed every 60 seconds.
- **Mobile UI and PWA**: a phone layout that can be added to the home screen, plus a tree-style directory browser for picking workspaces remotely.
- **Access control**: QR token login, a visitor password, a separate admin password for the settings console, and an option to restrict management to the host machine.
- **IM bots**: WeChat, QQ, Feishu (Lark) and Telegram bots that handle multiple workspaces, stream replies and report changed files after each turn.

## How to use dsh-bridge

1. Add the plugin with the install command shown on this page. The DSH desktop app uses a separate `desktop` profile, so install it there too:

   ```bash
   dsh plugin --profile desktop add @wenbin_wb/dsh-bridge
   ```

2. Launch DeepSeek Harness, open Settings in the left sidebar and click "Remote Access".
3. For LAN use, put phone and computer on the same Wi-Fi and scan the QR code.
4. For access from outside, click Start in the tunnel section to get a temporary `https://*.trycloudflare.com` address, or enter a Cloudflare tunnel token and hostname for a fixed domain.
5. Turn on Access Auth and set a password before relying on a tunnel. The README warns that a custom tunnel with no password lets anyone who knows the URL reach your DSH.
6. To use a bot, open IM Bot under Remote Access, bind a platform (QR scan for WeChat and QQ, a BotFather token for Telegram), then send the first message to authorize yourself.
