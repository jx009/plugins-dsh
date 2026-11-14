---
title: "dsh-bridge: Remote Control DSH from Phone"
description: "dsh-bridge is a DSH plugin that opens DeepSeek Harness on your phone via LAN QR codes or tunnels, and from WeChat, QQ, Feishu or Telegram. Learn setup tips."
summary: "A remote access plugin for DSH: scan a QR code on the same Wi-Fi, open a Cloudflare or self-hosted tunnel, or message a chat bot to start, stop and approve tasks."
highlights:
  - "LAN QR-code access"
  - "Cloudflare and self-hosted tunnels"
  - "WeChat, QQ, Feishu and Telegram bots"
  - "Visitor and admin passwords"
  - "Installable mobile PWA"
faq:
  - q: "How do I install dsh-bridge in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add @wenbin_wb/dsh-bridge`. The desktop app uses a separate `desktop` profile, so install it there too, either with `--profile desktop` or from Settings → Plugins → Add plugin, then restart DSH."
  - q: "Do I need a public IP to reach DSH remotely with dsh-bridge?"
    a: "No. The default temporary Cloudflare tunnel gives you a `trycloudflare.com` address with no account or port forwarding. A tunnel token binds a fixed domain, and a custom WebSocket tunnel routes through your own VPS."
  - q: "What can I do from a chat app with dsh-bridge?"
    a: "Bots accept commands such as `/sessions` and `/use` to switch sessions, `/new` to start a task, `/stop` to halt it, `/yes` or `/no` for permission requests, and `/diff` to export changes as a patch file."
  - q: "Who can control DSH through the dsh-bridge bots?"
    a: "Only senders on the bot's allowlist. The admin who sends the first message after setup is bound automatically, and messages from anyone else are dropped without reaching the model."
  - q: "Which DSH versions does dsh-bridge support?"
    a: "Versions from `0.1.0` through `0.1.7` and `0.2.0-rc.2`, on both the web profile and the desktop app's built-in host. You do not need to pick a plugin version per DSH version."
  - q: "Why can't my phone open dsh-bridge after scanning the QR code?"
    a: "Make sure phone and computer are on the same Wi-Fi without AP isolation, choose your physical network adapter if VPNs or VMs add others, and allow Node.js through the firewall on port 3082."
---

## What does dsh-bridge do?

dsh-bridge is a DSH plugin that lets you keep using the DeepSeek Harness on your computer from your phone or any other device. Scan a QR code on the same Wi-Fi, open a public tunnel when you are away, or simply message a chat bot on WeChat, QQ, Feishu or Telegram to start, stop and approve agent tasks.

It is built for people who start a long agent task at their desk and want to check progress, approve an operation or send the next instruction from the couch or the commute. You do not need a public server: the default Cloudflare tunnel works without an account.

Remote traffic goes through the plugin's own access gate, with QR tokens, a visitor password and a separate admin password. Everything is configured in a single "Remote Access" panel in DSH settings.

## dsh-bridge core features

- **LAN access**: a QR code appears when DSH starts; scan it on the same Wi-Fi to open the mobile UI. With several network adapters, you choose the right one and the choice is remembered.
- **Public tunnels**: a temporary Cloudflare tunnel with no login, a token-based tunnel on a fixed domain, or a custom WebSocket tunnel to your own VPS. The public entry is health-checked every 60 seconds.
- **Mobile UI and PWA**: a phone layout you can add to the home screen, plus a directory browser for picking workspaces remotely.
- **Access control**: QR token login, a visitor password, a separate admin password for the settings console, and an option to allow management only from the host machine.
- **Chat bots**: WeChat, QQ, Feishu and Telegram bots handle multiple workspaces, stream replies and list changed files after each turn.
- **Monitoring**: an operations dashboard and one-click upgrade and restart from the settings panel.

## How to install and use dsh-bridge

1. Check that Node.js 22.19+ or 24+ and the `dsh` CLI are available.
2. Install the plugin:

   ```bash
   dsh plugin --profile web add @wenbin_wb/dsh-bridge
   ```

   For the desktop app, run the same command with `--profile desktop`, or add `@wenbin_wb/dsh-bridge` under Settings → Plugins → Add plugin.

3. Restart DSH, open Settings in the left sidebar and click **Remote Access**.
4. On the same Wi-Fi, scan the QR code with your phone. Away from home, click Start in the tunnel section to get a temporary `https://*.trycloudflare.com` address.
5. To use a chat bot, configure WeChat, QQ, Feishu or Telegram in the same panel, then send the bot a first message to bind yourself as admin.

To upgrade, use the one-click upgrade at the bottom of the Remote Access panel, or run `dsh plugin --profile web add @wenbin_wb/dsh-bridge@latest`.

## How to troubleshoot dsh-bridge

- **The phone cannot open the page after scanning.** Put both devices on the same Wi-Fi and check that the router has no AP isolation. If WSL, VMware, Hyper-V or a VPN added virtual adapters, pick the physical Wi-Fi or Ethernet IP in the adapter selector. Allow Node.js through the firewall on port 3082.
- **Different networks or a company LAN.** Switch to the Cloudflare tunnel instead of LAN access.
- **The plugin is missing in the desktop app.** Desktop and web use separate profiles; install dsh-bridge into `desktop` as well and restart from the app menu.
- **An upgrade still shows the old version.** With pnpm 11, the `minimumReleaseAge` rule can delay fresh releases; force the install with the `@latest` tag.
- **The bot ignores your messages.** Only allowlisted senders are processed. Re-bind by sending the first message as admin after setup.

When reporting a problem, include the plugin version, DSH version, profile and which access mode you were using.
