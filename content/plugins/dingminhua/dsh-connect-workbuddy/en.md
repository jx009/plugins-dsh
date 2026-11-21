---
title: "dsh-connect-workbuddy: WorkBuddy Models in DSH"
description: "dsh-connect-workbuddy is a DSH plugin that adds WorkBuddy models. Learn how to install it, configure accounts, and troubleshoot missing models."
summary: "Choose domestic and international WorkBuddy models from the same model picker, see their current credit multipliers, and control image input and reasoning defaults per model."
highlights:
  - "Domestic and international WorkBuddy providers"
  - "Current credit multipliers and promotion badges"
  - "Per-model image input and reasoning controls"
  - "Separate account pools and daily check-in"
  - "Read-only credit balance in the composer"
faq:
  - q: "Can dsh-connect-workbuddy use domestic and international WorkBuddy at the same time?"
    a: "Yes, as long as both providers are enabled and each region has a signed-in account. Different conversations can use models from different providers."
  - q: "Where are the dsh-connect-workbuddy settings in DeepSeek Harness?"
    a: "Go to Settings → WorkBuddy. Starting with plugin version 5.19.0, the marketplace detail page no longer contains the configuration card."
  - q: "How do I enable image input in dsh-connect-workbuddy?"
    a: "Open the Models section for the relevant region, turn on image input for the model, and save. The plugin does not automatically turn it on for models whose image support it has not verified."
  - q: "Why did the credit multiplier change in dsh-connect-workbuddy?"
    a: "The multiplier comes from WorkBuddy, not from a price table in the plugin. During an active promotion, the model picker and settings card can show a discounted multiplier that reverts when the promotion ends."
  - q: "Why does dsh-connect-workbuddy say my model is queued?"
    a: "WorkBuddy has placed the request in that model's queue. The plugin does not resend the request automatically or switch accounts to get around the queue; wait and resend it yourself, or choose another model."
---

## What does dsh-connect-workbuddy do?

dsh-connect-workbuddy is a DSH plugin that adds models from your signed-in WorkBuddy accounts to the DeepSeek Harness model picker. It supports the domestic and international editions as separate providers, so you can use both without merging their account pools or model settings. The settings card and the chat composer's credit indicator show balances without changing them; model requests still use your own account's credits.

The integration relies on unofficial client interfaces. WorkBuddy has begun restricting requests from unofficial clients, so access may stop working even if your settings are correct. Review the account risk before installing. The official client is the safer option.

## dsh-connect-workbuddy core features

- **Two regional providers.** The domestic edition appears as `workbuddy` and the international edition as `workbuddy-global`. You can turn off either provider without losing its accounts or saved model settings.
- **Credit multipliers and promotion badges.** Refreshing the model catalog fetches the rates supplied by WorkBuddy. The model picker and settings card show eligible promotions while their time windows are active.
- **Per-model controls.** Choose which models appear, whether each accepts image input, and what reasoning level it uses when a request does not specify one. The option to turn reasoning off is separate and is blocked for models known to reject it.
- **Account pools and credit visibility.** Each region has its own account pool, with manual switching and automatic rotation. The plugin also provides daily check-in and read-only credit displays.

## How to install and use dsh-connect-workbuddy

The npm package is `dsh-connect-workbuddy`. The available README excerpt does not include a DeepSeek Harness install command.

1. Once the plugin is installed and enabled in your active profile, open Settings → WorkBuddy. Choose the domestic or international tab. Use this settings page rather than the marketplace detail page to make changes.
2. Sign in to the appropriate edition locally or sign in once in a browser. If you signed in after opening settings, use the account pool's redetect action or restart the harness so the plugin can find the account.
3. Open Models in that region and refresh the catalog. New catalog entries and credit multipliers take effect immediately, but refreshing does not save your edits. Enable the models you want, adjust their options, and select Save.
4. Open the model picker in a conversation and select an enabled model. If you want to change the credit display or its refresh interval, use the Capabilities section. Those changes take effect without saving the model settings.

## How to troubleshoot dsh-connect-workbuddy

- **No models for one region:** Check that the provider is enabled and that you are signed in to that edition. A region without an account does not list any models. Redetect the account or restart, then check whether your model selections were saved.
- **`NO_ADAPTER` after disabling a provider:** The conversation may still point to a model from the removed provider. Pick a model from an enabled provider, or turn the original provider back on.
- **No busy indicator for international models:** This is expected. WorkBuddy supplies that data only for the domestic edition; the missing icon is not a sign of a failed setup.
- **The cause is unclear:** Check Diagnostics in the affected region for the active account, login expiry, catalog counts, and the latest upstream error. If needed, confirm the profile, verify that the plugin is enabled, restart the harness, and check the installed version and logs.
