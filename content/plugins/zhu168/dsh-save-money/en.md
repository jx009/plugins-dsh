---
title: "dsh-save-money: Schedule API Pauses in DSH"
description: "dsh-save-money is a DSH plugin that schedules model request pauses. Learn setup steps, model-tier controls and fixes for paused replies."
summary: "Pause selected model tiers during configured time windows and resume tasks afterward. Track official DeepSeek balance and recent spending from the session header."
highlights:
  - "Scheduled pauses with automatic resume"
  - "Per-provider model-tier exemptions"
  - "Timezone and weekday filters"
  - "DeepSeek peak-hour preset"
  - "Balance and eight-hour spend chart"
faq:
  - q: "How do I install dsh-save-money in DeepSeek Harness?"
    a: "The supplied README excerpt describes npm installation and repository builds using DSH's apply module and cordis.yml mounting format. It ends before the actual commands, so an exact installation command cannot be verified from this material."
  - q: "Why does dsh-save-money stop AI replies in new conversations?"
    a: "During an active pause window, selected model tiers cannot send new requests, including in new conversations. Click “End this save mode” to resume immediately while keeping later windows enabled."
  - q: "Can dsh-save-money pause official DeepSeek but allow other providers?"
    a: "Yes. Official API and Other API each have flash, pro and vision switches; official tiers pause by default while other-provider tiers are exempt. Models without those tier markers are always exempt."
  - q: "Does dsh-save-money support overnight schedules and weekends?"
    a: "Windows can cross midnight, and you can choose an IANA timezone. Both the global weekday selection and the individual window's weekday filter must match; the global default selects Monday through Friday."
  - q: "Why does dsh-save-money hide my DeepSeek balance?"
    a: "Balance display is optional and follows the provider used by the latest actual model request. It hides when that provider is non-official, while retaining sampled history for a later switch back."
---

## What does dsh-save-money do?

dsh-save-money is a DSH plugin that pauses selected model requests during scheduled windows and resumes tasks when those windows end. It helps DeepSeek Harness users shift long-running work away from unwanted operating hours, including periods they configure around peak API pricing. Running work is paused with its progress retained; an idle session has no task to pause.

The schedule gates requests for selected model tiers. During an active window, those tiers do not send new model requests, and AI replies can also pause in new conversations. Exempt tiers remain available. This distinction matters when choosing which providers should wait and which should continue working.

## dsh-save-money core features

- **Pause windows and weekday filters:** Create multiple windows, including overnight ranges such as `23:00–08:00`. Global and per-window weekday filters must both match; the global default is Monday through Friday.
- **Provider and model-tier controls:** Official API and Other API each offer flash, pro and vision switches. Official tiers are selected by default, other-provider tiers are exempt, and names without these markers always bypass the pause.
- **Timezone and DeepSeek preset:** Choose an IANA timezone or use browser detection, with Beijing time as the fallback. The preset adds `08:58–12:02` and `13:58–18:02` without duplicates, including a two-minute margin around each boundary.
- **Immediate window override:** “End this save mode” skips the current active or upcoming window without changing Enable. Later windows still apply, and the skipped state clears at the window's resume time.
- **Balance and spend statistics:** Optional official DeepSeek balance sampling runs every five minutes. Hover for recent balance changes, or click for eight hours of ten-minute spending bars; windows with no local activity receive a warning color, and top-ups are excluded from spending bars.

## How to install and use dsh-save-money

The supplied README excerpt ends before the installation commands and does not establish an npm package name. It describes npm installation and repository builds, with a module exporting `apply` mounted through `cordis.yml`. Consult the complete installation section for the exact command before proceeding.

1. After installation, click the colored Save status beside Session log in the session header to open settings. This is the persistent entry point for the plugin.
2. Set your timezone and weekdays. Add pause/resume windows manually, or apply the DeepSeek preset. The preset updates legacy windows without boundary margins, but does not automatically enable scheduling.
3. Select the model tiers that should pause. Checked switches participate in saving; unchecked switches allow requests during a window. Other API includes non-official sources such as SiliconFlow, relays and opencode go/zen.
4. Turn on Enable. A yellow reminder appears within five minutes of a pause; red indicates requests are suspended. Tasks resume automatically at the configured end time.
5. Optionally enable Show balance. The display follows the latest actual request's provider, appearing for the official service and hiding for others.

Settings save automatically to the workspace's `save-money.config.json`. Balance history is stored separately at `~/.dsh/dsh-save-money-balance.json`, shared across projects and retained through restarts. Changing the API key discards the previous key's history.

## How to troubleshoot dsh-save-money

If the AI is not replying, check whether a selected tier is inside an active window. This is expected behavior; use “End this save mode” to continue immediately. To restore all windows after an override, turn Enable off and back on.

If a pause does not happen, check Enable, timezone, both weekday filters and the selected provider tier. Models without flash/pro/vision markers remain exempt. A weekend also does not match the default global weekday selection.

If balance disappears, confirm Show balance is enabled and the latest actual request used official DeepSeek. A warning-colored spending bar means the balance fell without local model activity; the change may originate elsewhere, rather than proving local consumption.

If the settings entry itself is missing, check the active DSH profile and plugin activation, then restart the harness and inspect its version and logs.
