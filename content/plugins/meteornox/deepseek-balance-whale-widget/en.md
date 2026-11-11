---
title: "DSH Whale Widget: DeepSeek balance at a glance"
description: "A floating whale widget for the DeepSeek Harness web UI that shows your DeepSeek API balance, today's spend and the cost of each turn, with editable bubbles."
summary: "A draggable whale that sits in the corner of the DSH web UI and tracks DeepSeek API balance, daily spend and per-turn cost. Bubbles, sounds and alerts are all configurable."
highlights:
  - "Balance and daily spend"
  - "Per-turn cost bubbles"
  - "Modular bubble editor"
  - "Multi-provider templates"
  - "Budget and balance alerts"
faq:
  - q: "Does the widget need a DeepSeek platform token to track spending?"
    a: "No. Today's spend is derived from observed balance drops and local DSH session events, so no platform token is involved. The balance itself is read with the `DEEPSEEK_API_KEY` credential or, when no key is set, through the DeepSeek account you are logged into in DSH."
  - q: "Can it show balances for providers other than DeepSeek?"
    a: "Yes. The accounting menu ships 34 provider templates. Some, such as OpenRouter and Moonshot, return a real balance or quota; others, including OpenAI, Anthropic and Gemini, have no balance endpoint, so the widget only checks the key and estimates spend from session events."
  - q: "Does it work in the official DSH desktop client?"
    a: "The same package supports it, but the `--profile web` command does not apply there because the desktop app reads its own `desktop` profile. The README says to ask DSH, inside a desktop session, to install `dsh-whale-widget` with its built-in `plugin_manager`."
---

## What does DeepSeek-Balance-Whale-Widget do?

DeepSeek-Balance-Whale-Widget adds a small whale character to the bottom-right corner of the DeepSeek Harness web UI. It shows your DeepSeek API balance, how much you have spent today, and what each conversation turn cost.

The balance refreshes every 60 seconds, or whenever you click the whale. Spending is worked out locally: a drop in balance counts as consumption, while top-ups and bonus credit are logged separately so they do not cancel out earlier spend. Per-turn cost comes from the token usage in DSH session events (input, cache, output and reasoning tokens), priced with DeepSeek's peak and off-peak rates.

The rest is customization: bubbles are assembled from modules you arrange yourself, and the character image, sounds and snapping can be changed from the menu.

## Core features

- **Balance display**: Reads the balance through the `DEEPSEEK_API_KEY` credential or your DSH account login.
- **Usage ledger**: A records window lists spend for today, the last 7 days and all time, with a per-model share bar and search by date or model name.
- **Modular bubbles**: Each bubble holds up to 6 rows of text, links, random phrases, images and built-in values such as balance or peak/off-peak status.
- **Alerts and sounds**: Optional reminders for low balance and daily budget, plus sounds when a turn ends or when DSH is waiting for an answer or an approval.
- **Other providers**: 34 templates cover balance or quota lookups for services such as OpenRouter and Moonshot, and estimated spend for providers without a balance endpoint.
- **Drag and snap**: The whale can be dragged, snaps to configurable screen edges, and mirrors itself when docked on the left.

## How to use DeepSeek-Balance-Whale-Widget

1. Install the npm package into your web profile with the command on this page. The README warns against mixing npm and `github:` installs; if you installed from GitHub before, remove that copy first:

```
dsh plugin --profile web remove dsh-whale-widget
```

2. Restart `dsh web` and refresh the browser. The whale then appears every time the web UI opens.
3. Give it a way to read your balance: add `DEEPSEEK_API_KEY` in the DSH credentials service, or log in to your DeepSeek account under the account and balance settings.
4. Click the whale to refresh the balance and step through bubbles. Size, snapping, sounds, alerts and the accounting window are in the menu.

On the desktop client, skip the `--profile web` command and ask DSH to install the package with its built-in `plugin_manager` instead.
