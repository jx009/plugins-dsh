---
title: "dsh-our-free-model: Free AI Models in DSH"
description: "dsh-our-free-model is a DSH plugin that adds free model channels, provider routing and a local gateway to DeepSeek Harness. Learn to install it and fix 429s."
summary: "Adds anonymous free model channels, account-based channels and provider integrations to DSH. Includes fallback chains, local usage statistics and an OpenAI- and Anthropic-compatible gateway."
highlights:
  - "Free channels with no login or API key"
  - "Bring-your-own-key provider integrations"
  - "Fallback and round-robin model chains"
  - "OpenAI- and Anthropic-compatible local gateway"
  - "Local token usage and latency dashboard"
faq:
  - q: "How do I install dsh-our-free-model in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add @ebony-vinyl/dsh-our-free-model@2.8.3`, using your own profile name, then restart DSH. Note the `@ebony-vinyl` scope: the README warns that the bare `dsh-our-free-model` package on npm is not published by the project."
  - q: "Is dsh-our-free-model really free and unlimited?"
    a: "The anonymous channels have no top-ups, token billing or plans. They are still rate-limited per session and per outbound IP, so heavy bursts return HTTP 429, and the plugin marks the model as limited until the next probe."
  - q: "Why does dsh-our-free-model return HTTP 429?"
    a: "Upstream free quotas are counted per outbound IP and session. After a real 429 the plugin opens a cool-down window and stops retrying that turn automatically. Wait, switch to another model or chain, or use a channel with your own key."
  - q: "Why do I get an empty reply from a thinking model in dsh-our-free-model?"
    a: "Some models think silently and share the output budget with the answer, so a low output limit can end the turn with no text. Raise the per-request output limit above 16k, or pick a model marked `reasoning: false`."
  - q: "Can other tools use the models from dsh-our-free-model?"
    a: "Yes. The local gateway offers OpenAI-compatible access and Anthropic Messages endpoints such as `/v1/messages`, and the gateway page generates setup examples with the real port and key."
  - q: "Does dsh-our-free-model keep my prompts on my machine?"
    a: "No. Usage statistics are stored locally, but inference requests go to the selected upstream provider. The README notes that some free-pool providers may record prompts to improve their services."
---

## What does dsh-our-free-model do?

dsh-our-free-model is a DSH plugin that brings free and bring-your-own-key model channels into DeepSeek Harness. Its headline feature is a set of anonymous free channels: install the plugin and models such as DeepSeek and Kimi appear in the DSH model picker with no login, sign-up or API key.

Beyond the free channels, it is a full model router. You can add account-based channels, connect dozens of providers with your own keys, point it at local servers such as Ollama, LM Studio and llama.cpp, and combine models into fallback chains. Model lists, context limits and capabilities are refreshed from upstream, and availability is measured from your own machine's network.

The plugin is mounted as plain JavaScript with no build step and no dependencies, and it does not modify the DSH core. Free access remains subject to upstream quotas, regional policies and availability.

## dsh-our-free-model core features

- **Free channels**: direct connections to gateways such as OpenCode Zen and Kilo AI, with no account or key required.
- **Provider integrations**: account-based channels and providers configured with your own credentials, alongside the free ones.
- **Reasoning controls**: real effort levels or output-token budgets are sent upstream, not just prompt hints, depending on what each model supports.
- **Named chains**: `combo:<name>` virtual models with fallback or round-robin routing. A failed attempt can switch to the next model before any reply text has been sent.
- **Local gateway**: OpenAI-compatible access and Anthropic endpoints, including `/v1/messages`, so editors and other agents can reuse the same models.
- **Usage dashboard**: token consumption, generation speed and first-token latency, all recorded locally.
- **Signed updates**: in-app upgrades are verified against a pinned Ed25519 key, roll back on failure and hot-reload without restarting.

## How to install and use dsh-our-free-model

1. Install the scoped npm package into your DSH profile. Replace `web` with the profile you use:

   ```bash
   dsh plugin --profile web add @ebony-vinyl/dsh-our-free-model@2.8.3
   ```

   To install from a local checkout instead, run `dsh plugin --profile web add /absolute/path/dsh-our-free-model`. Use only one of the two methods in a profile.

2. Restart DSH once.
3. Open the model picker and choose one of the free models, or open the plugin settings to connect accounts and add providers with your own keys.
4. To route between models, define a chain in settings and select it as `combo:<name>`.
5. To use the models from another client, open the gateway page and copy the generated setup, which includes the actual port and key.

## How to troubleshoot dsh-our-free-model

- **You installed the wrong package.** The bare `dsh-our-free-model` package on npm is not from this repository and contains modified files. Remove it and install `@ebony-vinyl/dsh-our-free-model` instead.
- **Desktop shows `PROFILE_UPGRADE_REQUIRED`.** Some DSH desktop bundles block symlinks and junctions in profiles. Do not use `link:` dependencies; install through the in-app plugin manager, or pack a local tarball into the profile's `vendor/` folder as the README describes.
- **A model shows as rate-limited or returns 429.** Free quotas are counted per outbound IP and session. The plugin opens a cool-down window instead of retrying. Switch models, use a fallback chain, or add a channel with your own key.
- **A thinking model returns an empty answer or times out.** Silent reasoning shares the output budget with the reply. Raise the output limit above 16k tokens, or choose a model marked `reasoning: false`.
- **The speed column shows a dash.** Some models deliver the whole answer in one or two frames, so there is no time window to measure. This is expected, not an error.

When filing an issue, include the plugin version, your DSH host and version, the model id and the error text, with keys removed.
