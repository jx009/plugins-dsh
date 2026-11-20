---
title: "token-monitor: AI Usage Tracking for DSH Users"
description: "token-monitor is a desktop tracker for AI token usage, costs, and limits. Learn how to install the app, configure its display, and troubleshoot it."
summary: "Compare AI coding activity across tools, projects, and devices in one desktop dashboard. Keep quota bars, reset times, or costs visible in the menu bar or system tray."
highlights:
  - "Live token tracking across 54+ tools"
  - "Cost and quota displays"
  - "Usage breakdowns by model and project"
  - "Real-time multi-device sync"
  - "Custom menu bar and tray views"
faq:
  - q: "Is token-monitor a DeepSeek Harness plugin?"
    a: "The project documents a standalone desktop app, not a native DSH plugin. It lists DeepSeek as a supported tool, but that does not confirm that it reads Harness-specific sessions."
  - q: "How do I install token-monitor on Windows or macOS?"
    a: "Get the build for your operating system from the project's GitHub Releases page. The listed requirements are Windows 10 or later and macOS 13 or later; the project also lists Linux x64."
  - q: "Can token-monitor compare Claude Code and Codex usage?"
    a: "Yes. Both are listed as supported tools, and the dashboard lets you break down usage by tool. Check the README's per-tool details before expecting the same quota or session fields from both."
  - q: "How do I see reset times in token-monitor?"
    a: "The menu bar or system tray supports a custom display that can include reset times and quota bars. Check the per-tool support details if a particular reset time is not shown."
  - q: "Can token-monitor show usage across multiple computers?"
    a: "Yes. The app supports real-time multi-device sync and lets you break down usage by device, so you can see which machine contributed to the total."
---

## What does token-monitor do?

 token-monitor is a local-first desktop usage tracker that DeepSeek Harness users can run alongside their coding tools. It brings token usage, costs, tool limits, and session activity into one dashboard. The project lists DeepSeek among more than 54 supported tools, alongside Claude Code, Codex, and Cursor. That support is distinct from a native DSH plugin: the available documentation does not establish that the desktop app reads Harness-specific sessions or runs inside the harness.

## token-monitor core features

- **Live token usage and history.** Check current activity, then use historical trends to see how it has changed. Break down the numbers by tool, device, model, session, or project when a combined total does not tell you where the usage came from.
- **Cost and quota views.** Show costs, quota bars, or reset times in a menu bar or system tray display. The project's per-tool documentation is the place to check which metrics and data sources are supported for a particular tool.
- **Session activity at a glance.** The MacBook notch panel shows running sessions, with an expanded view for daily usage, limits, and breakdowns. The edge dock offers a compact view of quotas and recent sessions without keeping the main window open.
- **Multi-device sync.** Bring usage from multiple machines into one view in real time. Use the device breakdown to distinguish activity on each computer instead of relying on the aggregate alone.

## How to install and use token-monitor

The available README does not provide a DSH install command. For the documented desktop app, start with the project's GitHub Releases page.

1. Choose the release build for your operating system. The documented platforms are Windows 10 or later, macOS 13 or later, and Linux x64.
2. Open the desktop app and start in the main window. Pick the tool or breakdown that matches your question: use the model view to compare model usage, or the project view to see where activity is concentrated.
3. Configure the glance view in the app's menu bar or system tray display. Start with a preset or compose a view with the fields you want to check most often, such as cost, quota, or live tokens per second.
4. If you want a desktop view outside the tray, use an available option such as the edge dock or, on macOS, a native widget. Use the main window when you need historical trends or a more detailed breakdown.

## How to troubleshoot token-monitor

If usage or limits are missing for one tool, check the README's supported-tools details first. Look for the specific metric you expect and where the app reads it from. A listing for a provider does not establish support for every metric or client associated with that provider.

If the desktop app does not start, confirm that the installed build matches your operating system and architecture. Restart the app, note the installed version, and check any available logs before reporting the issue. If you were expecting a page or panel inside the harness, check that assumption first: the documented interface is a separate desktop app.
