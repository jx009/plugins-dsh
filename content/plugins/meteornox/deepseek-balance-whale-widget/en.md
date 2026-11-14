---
title: "DeepSeek Balance Whale Widget for DSH"
description: "DeepSeek-Balance-Whale-Widget is a DSH plugin that shows your DeepSeek API balance, daily spend and per-turn cost. Learn to install it and fix setup."
summary: "A draggable whale that sits in the corner of the DSH web UI and tracks DeepSeek API balance, daily spend and per-turn cost. Bubbles, sounds and alerts are all configurable."
highlights:
  - "DeepSeek API balance and daily spend"
  - "Per-turn token cost bubbles"
  - "Spending ledger by day and model"
  - "Low-balance and budget alerts"
  - "Balance templates for 34 providers"
faq:
  - q: "How do I install the DeepSeek Balance Whale Widget in DSH?"
    a: "For the web UI, run `dsh plugin --profile web add github:MeteorNOX/DeepSeek-Balance-Whale-Widget`, restart `dsh web` and refresh the browser. The npm package name is `dsh-whale-widget`."
  - q: "How do I install DeepSeek-Balance-Whale-Widget in the DSH desktop app?"
    a: "The desktop app reads its own `desktop` profile, which the `dsh plugin` command refuses to touch. In a desktop session, ask DSH to install `dsh-whale-widget` with its built-in `plugin_manager`, then reopen the client."
  - q: "Does DeepSeek-Balance-Whale-Widget need a DeepSeek platform token?"
    a: "No. The balance is read with the `DEEPSEEK_API_KEY` credential or your DSH account login, and today's spend is worked out locally from balance drops and DSH session events."
  - q: "How does DeepSeek-Balance-Whale-Widget calculate the cost of each turn?"
    a: "It reads input, cache, output and reasoning token counts from DSH session events and prices them with DeepSeek's peak and off-peak rates. Top-ups and bonus credit are logged separately so they do not cancel earlier spend."
  - q: "Can DeepSeek-Balance-Whale-Widget track providers other than DeepSeek?"
    a: "Yes. The accounting menu has 34 provider templates. OpenRouter and Moonshot return a real balance or quota; providers without a balance endpoint, such as OpenAI and Anthropic, get a key check and estimated spend."
  - q: "Why does DeepSeek-Balance-Whale-Widget return 403 behind a reverse proxy?"
    a: "Its `/dsh-whale/*` endpoints accept loopback requests only by default. List your host in `DSHW_TRUSTED_HOSTS`, for example `DSHW_TRUSTED_HOSTS=dsh.example.com dsh web`."
---

## What does DeepSeek-Balance-Whale-Widget do?

DeepSeek-Balance-Whale-Widget is a DSH plugin that puts a small whale character in the bottom-right corner of the DeepSeek Harness web UI and keeps an eye on your DeepSeek bill. It shows your DeepSeek API balance, how much you have spent today and what each conversation turn cost, so you notice expensive prompts while you work.

The balance refreshes every 60 seconds, or whenever you click the whale. Spending is calculated locally: a drop in balance counts as consumption, while top-ups and bonus credit are recorded separately. Per-turn cost comes from the token usage in DSH session events, including cache and reasoning tokens, priced at DeepSeek's peak and off-peak rates.

Everything else is customization. Speech bubbles are built from modules you arrange yourself, and the character image, sounds, alerts and edge snapping can all be changed from the menu.

## DeepSeek-Balance-Whale-Widget core features

- **Balance display**: reads your DeepSeek balance through the `DEEPSEEK_API_KEY` credential or the DeepSeek account you are logged into in DSH.
- **Spending ledger**: a records window lists spend for today, the last 7 days and all time, with a per-model share bar and search by date or model.
- **Modular bubbles**: each bubble holds up to six rows of text, links, random phrases, images and live values such as balance or peak and off-peak status.
- **Alerts and sounds**: optional reminders for low balance and daily budget, plus sounds when a turn ends or DSH is waiting for your answer or approval.
- **Other providers**: 34 templates cover balance or quota lookups for services such as OpenRouter and Moonshot, and estimated spend where no balance endpoint exists.
- **Drag and snap**: drag the whale anywhere, snap it to screen edges, and it flips to face inward when docked on the left.

## How to install and use DeepSeek-Balance-Whale-Widget

1. For the DSH web UI, install straight from GitHub:

   ```bash
   dsh plugin --profile web add github:MeteorNOX/DeepSeek-Balance-Whale-Widget
   ```

   After that the plugin appears in DSH's plugin management page, where you can update it later.

2. Restart `dsh web`, then refresh the browser.
3. Set your DeepSeek key as the `DEEPSEEK_API_KEY` credential, or stay logged into your DeepSeek account in DSH.
4. Click the whale to refresh the balance, and open its menu to edit bubbles, alerts, sounds and provider templates.

For the official desktop app, do not use the `--profile web` command. Inside a desktop session, ask DSH: "Use the built-in `plugin_manager` to install `dsh-whale-widget`", then reopen the client.

## How to troubleshoot DeepSeek-Balance-Whale-Widget

- **The whale does not appear in the web UI.** Check that `dsh --profile web --dump-config` lists `dsh-whale-widget`, then restart `dsh web` and refresh the page.
- **Nothing appears in the desktop app.** You probably installed into the `web` profile. The desktop app reads the `desktop` profile, so reinstall through `plugin_manager` and reopen the client.
- **Installation fails with `exit 1` or `pnpm failed`.** These are summary errors. Look for the earliest real error in `.plugin-manager/logs/operation-*/pnpm.log`, and check whether `pnpm` can actually be found by the host.
- **Requests return 403 behind a proxy or LAN address.** The plugin only trusts loopback by default. Add your host to `DSHW_TRUSTED_HOSTS` when starting `dsh web`.
- **No image or sound.** The `assets/` folder must be complete; missing files make those features silently fall back.
- **A download manager pops up on every start.** Tools such as IDM grab the widget's sound files. Exclude `127.0.0.1` and `localhost` in the download manager's site settings.

Before posting logs publicly, remove API keys, tokens, cookies and personal paths.
