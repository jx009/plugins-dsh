---
title: "loopx: Long-Running Agent Goals in DSH"
description: "loopx is a DSH plugin and control plane that keeps goals, todos and approvals across agent sessions. Learn how to install it in DeepSeek Harness and fix setup."
summary: "LoopX gives long agent tasks a durable goal, a todo list, human approval gates and a record of evidence. Your agent runtime still supplies the model and tools."
highlights:
  - "Durable goals and todos across sessions"
  - "Human approval gates"
  - "Quota-aware continuation"
  - "GoalBar and LoopX panel inside DSH"
  - "Local dashboard and evidence history"
faq:
  - q: "How do I install loopx in DeepSeek Harness?"
    a: "Install the prebuilt `dsh-loopx-plugin` release with `dsh plugin --profile web add` followed by the release `.tgz` URL from the repository. On first start it installs the LoopX CLI and workflow skills automatically."
  - q: "What do I need before installing the loopx DSH plugin?"
    a: "Stable Node.js 22.22.3 or later (not Node.js 23), pnpm, Python 3.11+ with pip, and network access on the first start if no compatible LoopX CLI is installed yet."
  - q: "Is loopx an agent framework?"
    a: "No. The README calls it a control plane. DeepSeek Harness, Codex or Claude Code supplies the model and tools, while LoopX keeps the goal, todos, gates and evidence."
  - q: "Why does the loopx GoalBar not show up in DSH?"
    a: "The GoalBar stays hidden until the current DSH session has exactly one LoopX binding. Invoke the `loopx` skill in that session first; installing the plugin alone does not create a binding."
  - q: "Which decisions does loopx leave to a person?"
    a: "Work that needs a human decision waits at a user gate. According to the README, dangerous permissions, publishing and production writes stay with the human."
  - q: "Does loopx collect usage data?"
    a: "Basic usage statistics are on by default after a first-use notice: a daily random-ID heartbeat and ID-free CLI counts, with no content. Turn them off with `loopx usage-ping disable` or `LOOPX_USAGE_PING=0`."
---

## What does loopx do?

loopx is a DSH plugin and local-first control plane that keeps a long-running agent task on track when sessions end, hosts restart or work moves between runtimes. It stores the goal, the todo list, pending approvals, ownership and evidence on your machine, so the next session starts from recorded state instead of a fresh prompt.

LoopX does not run a model or call tools itself. DeepSeek Harness does that, and LoopX decides what the next turn should see: the active goal, the next todo and any decision waiting for you. That makes it useful for work spanning many sessions, such as performance investigations, bug-fix loops or research with several agents, where progress otherwise gets lost between conversations.

The project also supports Codex and Claude Code. For DSH it ships a native package, `dsh-loopx-plugin`, that installs the CLI and skills, adds a GoalBar to the chat and a LoopX panel to the sidebar.

## loopx core features

- **Goal state and todos**: a goal with its todos, claims and gates that survives session ends and restarts.
- **User gates**: steps that need a person stop and wait for your decision before the agent continues.
- **Quota-aware continuation**: `loopx quota should-run` tells an agent whether to act now, wait or stay quiet, and the DSH driver queues the next turn only when LoopX allows it.
- **GoalBar in DSH**: a compact bar above the queue shows the bound goal with Start and Pause controls.
- **LoopX panel**: a sidebar entry embeds the local `loopx dashboard` workspace inside DSH.
- **Evidence and history**: `loopx status` and `loopx review-packet` show the goal, waiting decisions, the next todo and what was done.

## How to install and use loopx

1. Make sure you have Node.js 22.22.3+ (not 23), pnpm and Python 3.11+ with pip.
2. Install the prebuilt plugin into your DSH profile:

   ```bash
   dsh plugin --profile web add "https://github.com/loopx-project/loopx/releases/download/dsh-loopx-plugin-v0.1.1-beta.6/dsh-loopx-plugin-0.1.1-beta.6.tgz"
   ```

3. Start DSH. On the first start the plugin installs or upgrades the LoopX CLI into an isolated runtime under `~/.agents/runtime/dsh-loopx-plugin` and copies the workflow skills into `~/.agents/skills`.
4. Select the `loopx` skill and describe the goal, for example:

   ```text
   /loopx speed up this project's slowest workflow; compare approaches and verify the gains
   ```

5. Check progress with `loopx status`, approve gated steps when asked, or open the LoopX panel in the sidebar for the dashboard.

The beta.6 release targets the DSH 0.2.0-rc.2 API and keeps the 0.1.5 and 0.1.7-rc.2 compatibility ranges.

## How to troubleshoot loopx

- **Automatic setup failed on first start.** Look in the DSH log for the named Python or package-manager problem, fix it, then run `/loopx-init` once to retry.
- **Python cannot be found on Windows.** The plugin tries `PYTHON_BIN`, then `python3`, versioned `python3.x` names and finally `python`. The Microsoft Store alias for `python3` never starts Python, so install Python from python.org or set `PYTHON_BIN` explicitly.
- **The GoalBar is missing.** It appears only after the current session has invoked the `loopx` skill and has one exact binding. Inside that session, run `loopx resolve-agent-thread` with `--host-surface deepseek-harness-native` to check that the status is `bound`.
- **The LoopX panel shows a recovery notice.** The panel only displays an already running dashboard. Start it with `loopx dashboard`, then retry.
- **The plugin rejects your LoopX version.** It needs LoopX 1.2.4 or newer. An older global CLI is upgraded automatically, but a custom `LOOPX_BIN` must be upgraded by you.

When reporting a problem, include the plugin version, DSH version, LoopX CLI version and the relevant DSH log lines.
