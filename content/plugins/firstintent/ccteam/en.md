---
title: "ccteam: Cross-agent orchestration for DSH"
description: "ccteam is a DeepSeek Harness integration for coordinating coding agents. Learn how to install, configure, and troubleshoot the web and chat consoles."
summary: "Delegate work to the coding agents you already use, then follow their sessions, results, and costs from a browser or chat."
highlights:
  - "Built-in DeepSeek Harness Web access"
  - "Cross-vendor coding agent delegation"
  - "Telegram, Lark, and Slack controls"
  - "Claude sessions on satellite hosts"
  - "Live delegation and cost tracking"
faq:
  - q: "How do I install ccteam as a DSH plugin?"
    a: "The available repository information does not list a DSH install command or a verified npm package. Set up the standalone ccteam daemon using the project's installer, then open the DSH page in its web console."
  - q: "Can ccteam use Codex and DeepSeek Harness in the same project?"
    a: "Yes. Registered sessions can delegate to agents from other supported harnesses, so you can hand a task to Codex without moving your main conversation out of DeepSeek Harness."
  - q: "How does ccteam keep Slack sessions separate?"
    a: "A top-level Slack message starts a session, and replies in that thread go to that session. Use `!status` rather than `/status` in Slack."
  - q: "Why is ccteam running Codex on the daemon instead of my satellite?"
    a: "Satellite execution currently supports Claude sessions only. Other vendors run on the machine hosting the daemon."
  - q: "Where can I see which agent ccteam delegated a task to?"
    a: "Open the Team page to see which session hired which delegate, along with the model, reasoning effort, and cost. For a scripted Flow, open the Runs tab to see the sessions associated with that run."
---

## What does ccteam do?

ccteam is a DeepSeek Harness integration that lets coding agents from different vendors delegate work and return results. It runs as a standalone service rather than a documented npm-installed DSH plugin. Its own browser console includes a DSH page, so you can open your harness workspace alongside the sessions you coordinate through the service.

For example, keep the main conversation in one session, ask it to hand an implementation task to Codex, and then follow the delegate's progress without switching terminals. The service connects the sessions and tracks who hired whom; your prompts and project routing guide determine how the team divides the work.

## ccteam core features

- **Cross-vendor delegation:** A registered session can start a delegate, send it work, and collect its response. Supported harnesses include Claude Code, Codex, Grok, Kimi, and Pi alongside DSH.
- **Embedded harness workspace:** The DSH page opens DeepSeek Harness Web on the same origin as the console. The daemon starts or attaches to a local web instance and gives each signed-in user a separate DSH home.
- **Chat controls:** Use Telegram, Lark, or Slack to interact with sessions away from the browser. Completion notifications, approval prompts, and delivered files can arrive in the chat thread.
- **Delegation and cost visibility:** The Team page shows parent and delegate sessions, including their active models and reasoning effort. The Status page exposes per-session costs and daily budget caps.
- **Scripted Flows:** Use a JavaScript Flow when the same sequence of coding tasks needs to run repeatedly. The runner journals progress so a run can be resumed after a daemon restart, and the Runs tab shows which sessions it started.

## How to install and use ccteam

No DSH installation command is documented in the available README excerpt, and no npm package is confirmed. Use the repository's standalone installer for macOS, Linux, or WSL; the excerpt confirms that the installer starts the daemon but does not show the installer command.

1. After installation, run `ccteam status` to retrieve the console link. Open it from a browser on the same local network.
2. Select the DSH page in the console to open the harness workspace. To start a session from the browser launcher, choose the project, host, vendor, and model, then send your first message.
3. To control sessions from chat, go to Settings → Access. Enter the bot token for Telegram or Lark, or use the Slack app setup there. In a group or channel, you can configure the bot to respond only when mentioned.
4. For a second machine, create a join token under Settings → Access and use it to register the satellite. Projects are tied to a host, so select the project where you want a supported remote session to run.

## How to troubleshoot ccteam

- **Can't find the browser console?** Run `ccteam status` again for the current link and verify that your browser is on the same local network as the daemon when using that address.
- **The chat bot doesn't respond?** Check the bot setup under Settings → Access and confirm that the sender is allowed. If mention-only mode is enabled, mention the bot. In Slack, reply in the session's thread to address that existing session.
- **A session runs on the wrong machine?** Check which host the selected project is bound to. Only Claude sessions currently execute on satellites; other vendors run on the daemon host.
- **The DSH page still won't open?** Confirm you're checking the intended workspace, then review the installed versions and logs. Restart the affected service before retrying if the checks don't identify the cause.
