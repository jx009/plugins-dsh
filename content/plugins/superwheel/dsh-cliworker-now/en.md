---
title: "dsh-cliworker-now: Multi-CLI Agents for DSH"
description: "dsh-cliworker-now is a DSH plugin that manages CLI agents in a sidebar. Learn setup steps, role configuration and common troubleshooting checks."
summary: "Dispatch named CLI agents from your main conversation, follow their independent sessions in the sidebar, and resume tasks with saved roles and native accounts."
highlights:
  - "Codex and Claude Code agents"
  - "Independent sidebar conversations"
  - "Named agents and role presets"
  - "Native accounts and permission controls"
  - "Optional parallel project copies"
faq:
  - q: "How do I install dsh-cliworker-now in DeepSeek Harness?"
    a: "The supplied README excerpt does not include a plugin installation command, and an npm package name has not been confirmed. Check the repository's complete installation instructions; the documented prerequisites include Node.js 22.19.0 or newer and native installations of the external CLIs you intend to use."
  - q: "Does dsh-cliworker-now support Windows and macOS?"
    a: "Both platforms are supported, with external CLIs installed in their native versions. The documented host adaptation target is DeepSeek Harness 0.2.2-rc.3; validation coverage varies by CLI."
  - q: "Does dsh-cliworker-now include model subscriptions or API credits?"
    a: "No model service, subscription, or API quota is included. Each CLI uses its own authentication and model access, and a model appearing in the catalog does not establish permission to call it."
  - q: "Can dsh-cliworker-now resume a task after switching accounts?"
    a: "Existing tasks continue using the currently selected account. If the original native session cannot be restored, a new session receives the earlier conversation, which sends that history to the current account's provider."
  - q: "How does dsh-cliworker-now handle parallel file changes?"
    a: "Write tasks in the same directory run serially by default. Enabling parallel writes creates private project copies for additional tasks, and the main agent merges results back as uncommitted changes without requiring Git."
---

## What does dsh-cliworker-now do?

dsh-cliworker-now is a DSH plugin that organizes multiple CLI agents into independent sidebar conversations. It lets developers dispatch work from the main DeepSeek Harness conversation, inspect each agent's progress, usage and status, and continue a task under the same agent name.

The interface identifies it as CLI Worker or CLI Worker Now. It connects tools such as Codex, Claude Code, Pi and OpenCode while preserving their native accounts, models and sessions. Model subscriptions and API credits remain your responsibility. Typical uses include assigning code review to one agent, configuring separate writing and editing roles, and returning to longer tasks after an initial result.

## dsh-cliworker-now core features

- **Independent conversations:** Each worker uses the host's conversation view, input box, model controls and usage display. You can queue requests, stop execution and continue after completion.
- **Named agents and role presets:** Give workers unique names, reusable roles and custom prompts. The first dispatch requires an explicit selection; subsequent selection prompts can be disabled in favor of saved defaults.
- **Native accounts and tools:** Models and reasoning settings come from the selected CLI and account. Native tools take priority, with eligible missing capabilities supplied through `dsh_worker_tools` under host approval; bridge availability differs by CLI.
- **Permission controls:** Workers offer ask, automatic approval and full-access modes where supported by their native CLI. Planning mode rejects writes, and additional authorization is presented in the conversation that originated the work.
- **Optional parallel writes:** Same-directory write tasks are serialized by default. An optional setting runs additional tasks in private project copies, then lets the main agent integrate their changes without creating commits.

## How to install and use dsh-cliworker-now

The provided README excerpt contains no DSH installation command, and the npm package name is unconfirmed. Consult the complete repository installation instructions before installing the plugin; the CLI update page described below manages external CLIs.

1. Prepare the environment. The documented platforms are macOS and Windows, with Node.js 22.19.0 or newer. The current host adaptation target is version 0.2.2-rc.3.
2. Install the native version of each external CLI you want to use and complete its login or API configuration. In CLI Worker settings, the “Update CLI” page lists detected versions and available installation or update methods.
3. Select the CLI, model and role before the first dispatch. Use a unique worker name and choose a permission level appropriate to the task; an unconfigured worker follows the main conversation's permission preset.
4. Ask the main conversation to dispatch work to the selected CLI. Open its sidebar conversation to review execution, respond to approval requests or provide follow-up instructions.
5. Resume by the same worker name. If you switch accounts, continuation uses the current account; when native session restoration fails, earlier conversation records are attached to a new session and sent to that account's provider.

## How to troubleshoot dsh-cliworker-now

If the sidebar entry is missing, check the active profile and whether the plugin is enabled, restart the host, and inspect versions and logs. Confirm that the external CLI path and its own authentication are configured. A visible model listing alone does not confirm access to run that model.

Read task status alongside the timeline. A recovered tool failure can still produce a completed task; a final tool failure followed by termination is marked for result verification. Denied authorization remains visible in the timeline even when the CLI ends the turn as completed. A failed CLI is not silently replaced with another.

For installation or update issues, inspect the command output and progress details on “Update CLI.” Some entries provide manual instructions instead of automatic installation. WorkBuddy integration is experimental, and its international variant has not completed the documented task acceptance checks.
