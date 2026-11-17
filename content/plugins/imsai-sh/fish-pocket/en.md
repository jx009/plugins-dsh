---
title: "fish-pocket: Run DSH on iPhone and iPad"
description: "fish-pocket is a DSH plugin companion app running the harness on iOS. Learn how to install it, enable native tools and check compatibility."
summary: "Run DeepSeek Harness inside a native iPhone or iPad app, with local workspaces, a plugin store and access to device tools. Optionally manage Bots and remote coding-agent sessions."
highlights:
  - "Native SwiftUI interface"
  - "On-device DSH engine"
  - "Built-in DSH plugin store"
  - "Calendar and reminders integration"
  - "Codex and Claude Code remote sessions"
faq:
  - q: "How do I install fish-pocket on iPhone or iPad?"
    a: "Use the App Store release or join the TestFlight beta on a device running iOS 17 or later. This is a standalone mobile app, not an npm package installed with a DSH plugin command."
  - q: "Does fish-pocket work offline without a server?"
    a: "The harness engine runs inside the app, so local sessions do not require a computer or a hosted harness server. Model requests still need an internet connection and a supported account or API key."
  - q: "Can fish-pocket install DeepSeek Harness plugins?"
    a: "It includes a marketplace for browsing and installing plugins, plus support for trusted index sources and pure JavaScript plugins from npm. The README reports compatibility sampling, not a guarantee that every plugin works unchanged."
  - q: "Why can't fish-pocket install numpy or pandas?"
    a: "The embedded Python environment supports pure Python packages and virtual environments. Packages requiring compiled extensions, including numpy and pandas, are currently unsupported."
  - q: "Does fish-pocket phone control need a computer?"
    a: "Ordinary on-device use does not, but the optional iCTRL setup requires a computer once. That feature also requires iOS 17.4 or later, Developer Mode and sideloading the third-party iCTRL app."
---

## What does fish-pocket do?

fish-pocket is a DSH plugin companion app that runs DeepSeek Harness natively on iPhone and iPad. It is a standalone iOS application rather than an installable harness plugin. Developers can use conversations, tools, files and approvals without keeping a computer or a separate harness server running.

The engine lives inside the app, while the interface uses SwiftUI rather than a web wrapper. Conversations and workspaces stay on the device. This does not mean offline model inference: model calls still require networking. You can use a DeepSeek account or API key, or use purchased credits through a Fish Pocket account in the App Store and TestFlight editions.

## fish-pocket core features

- **Native device tools:** Give the agent access to calendars, reminders, contacts, health data, photos and maps. Each capability must be enabled individually, and enabled capabilities are also available to installed plugins.
- **Plugin marketplace:** Browse, search and install extensions on the phone. Add trusted marketplace sources through the index-source interface, or install pure JavaScript packages from npm.
- **Developer workbench:** Use a terminal, file previews, change views and a multi-tab browser. Embedded tools include Node, Python, Git and FFmpeg; the agent can also interact with web pages.
- **Bot mode:** Create Bots with separate memories and working folders, chat individually or in groups, and schedule work. GitHub and Notion connections can be shared between ordinary conversations and Bots.
- **Remote sessions and iPad layouts:** Optionally connect through Agents Anywhere to manage Codex, Claude Code and harness sessions on other machines. On iPad, use multiple windows, drag-and-drop files and keyboard shortcuts.

## How to install and use fish-pocket

No DSH installation command or confirmed npm package is provided for this app. Install it through the App Store at `https://apps.apple.com/app/id6830703602`, or join TestFlight at `https://testflight.apple.com/join/2SCftb2M`. The base requirement is iOS 17 or later; beta releases arrive ahead of App Store review.

1. Open the app and choose an available model-access option. Keep internet access available for model requests.
2. Enable the device tools you need under Explore → Native Capabilities. On iOS 17, find this entry in the sidebar. Try asking the agent to add an appointment and a reminder.
3. Open the plugin store, find an extension and install and enable it. Use the workbench for terminal tasks, file inspection or browser work.
4. For optional phone control, install the third-party iCTRL app following its setup requirements. Check that Phone Control under Explore shows it is running before asking the agent to operate another app.
5. For remote sessions, install Agents Anywhere on the computer and scan the login code in the mobile app. Headless servers use its Connector instead; remote traffic passes through that service's servers.

## How to troubleshoot fish-pocket

If native tools are unavailable, check their individual toggles first. Disabled capabilities cannot be used by the agent. Phone control has separate requirements: iOS 17.4 or later, Developer Mode, sideloaded iCTRL and a one-time computer-assisted setup. Keep iCTRL remote access disabled as recommended. Screens read from other apps are sent to your selected model provider with the conversation.

For Python installation failures, distinguish pure Python packages from compiled extensions: numpy and pandas are not currently supported. Private Git repositories use HTTPS with token authentication.

If a plugin does not appear or fails to start, confirm it is enabled, check the active profile where applicable, restart the app and inspect versions and logs. The README's plugin sample includes cases requiring installation-script handling, a specific version or an app restart, but does not provide universal package-specific fixes.
