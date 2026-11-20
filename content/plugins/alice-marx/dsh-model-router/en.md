---
title: "dsh-model-router: Model routing for DSH"
description: "dsh-model-router is a DSH plugin for model routing and Bot collaboration. Learn how to install it, configure AI connections, and troubleshoot setup."
summary: "Compare cost and quality before starting a task, then review the proposed models, tools, and permissions. Choose the full Bot edition if you also need persistent chats, task handoffs, and private files."
highlights:
  - "Economy, balanced, and quality-first routing plans"
  - "Model and permission review before execution"
  - "Native CLI tool detection and readiness checks"
  - "API budgets and separate subscription usage tracking"
  - "Persistent Bot chats and task delegation"
faq:
  - q: "Which dsh-model-router package adds Bot chat?"
    a: "Choose `@ljwei-stak/dsh-model-route-bot` for persistent Bot chats, delegation, and private file libraries. The `@ljwei-stak/dsh-model-router` package adds the routing workbench without the Bot workspace."
  - q: "How do I switch dsh-model-router editions without losing my settings?"
    a: "Remove the current package entry in plugin management, then add the other edition in the same profile. Keep your data directories and configured Bot home, since the editions share routing configuration."
  - q: "Does dsh-model-router work with Ollama?"
    a: "Yes. In the full Bot edition, add an Ollama connection under `Settings → AI → Model API`, then select its saved route in the Bot's `Models & tools` settings."
  - q: "How do I use a ChatGPT subscription with dsh-model-router?"
    a: "On a Windows Host running the full Bot edition, authorize your ChatGPT or Codex account under `AI connections → Subscription accounts`. Select a synced text model for the Bot and set its call allowance before starting a chat."
  - q: "Why can dsh-model-router chat with my CLI but not run tasks?"
    a: "A native CLI chat connection does not grant execution access. For a supported tool, save a separate binding under `Official tools` and check that the account and execution mode are ready."
---

## What does dsh-model-router do?

`dsh-model-router` is a DSH plugin that turns tasks into reviewable plans and routes them to configured models or native CLI tools. In DeepSeek Harness, you can compare plans before running a task or select an exact model when you already know what you want to use. Provider and CLI connections use their own accounts and access rights.

Choose Model Router if you want a workbench for planning, execution, and usage tracking in the standard Harness interface. Choose the full Bot edition if you also want to keep conversations, task records, and private files in a persistent workspace.

## dsh-model-router core features

- **Task-oriented model routing.** Start with a task template and compare economy, balanced, and quality-first plans. Use a single route, choose a specific model, or plan a team whose steps have dependencies.
- **Execution review.** Inspect the proposed models, tools, workspace, permissions, and estimates before confirming. After launch, follow progress and results, cancel a run, or retry where supported.
- **Native CLI tools.** Check whether registered tools are installed, signed in, and ready for the selected mode. Open an interactive terminal when you need to work with a tool directly.
- **Budgets and usage tracking.** Set API limits and review reservations and receipts. Track subscription calls and tokens separately from API spending.
- **Bot delegation.** In the full edition, give each Bot its own model, role, working directory, and permissions. A Main Bot can hand off a task to an eligible Bot based on its saved model, tool, computer, and funding settings.

## How to install and use dsh-model-router

1. Open `Plugins → Add plugin` in the Harness profile you want to use. Enter `@ljwei-stak/dsh-model-route-bot` for the full Bot workspace or `@ljwei-stak/dsh-model-router` for routing only. Install just one edition per profile.
2. In the full Bot edition, open `Settings → AI`. Use `Model API` to save an endpoint, credentials, and model details for an API connection, such as one using the OpenAI, Anthropic, or Google Gemini protocol, or Ollama. Use `Subscription accounts`, `CLI chat`, or `Official tools` for those connection types instead.
3. To use a saved route in chat, select it in the Bot's `Models & tools` settings. For official execution tools, choose the tool identity and execution mode, then save the binding. Chat access and execution access are configured separately.
4. For a first routing task, open the routing workbench, start from a template, and compare the proposed plans. Confirm the plan only after checking that the chosen model, tools, and workspace match the task.

## How to troubleshoot dsh-model-router

- If the expected workspace does not appear, verify that the package is enabled in the active profile and that you installed the intended edition. Restart DSH and check the installed version and logs if the entry is still missing.
- If an official CLI tool is not ready, finish the vendor sign-in, refresh detection, and confirm that the model and execution mode are saved in the Bot's grant. Use `Configure and repair` to check or repair the managed tool installation.
- If an older subscription record needs attention, follow its reauthorization prompt and select a new model route. If the app prompts you to install or repair Codex, use `Official tools` before retrying.
