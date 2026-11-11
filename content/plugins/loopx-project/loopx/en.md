---
title: "loopx: durable goals for long-running agents"
description: "LoopX is a local-first control plane that keeps goals, todos, approvals and evidence intact across agent sessions, for Codex, Claude Code and DSH."
summary: "LoopX gives long agent tasks a durable goal, a todo list, human approval gates and a record of evidence. Your agent runtime still supplies the model and tools."
highlights:
  - "Durable goal state"
  - "Human approval gates"
  - "Quota-aware continuation"
  - "Evidence and run history"
  - "Local dashboard"
faq:
  - q: "Is LoopX an agent framework?"
    a: "No. The README positions it as a control plane, not an agent framework or runtime. Codex, Claude Code, DeepSeek Harness or another host supplies the model and tools, while LoopX keeps the goal state."
  - q: "Which decisions does LoopX leave to a person?"
    a: "Work that needs a human decision waits at a user gate. According to the README, dangerous permissions, publishing and production writes stay with the human."
  - q: "Does LoopX collect usage data?"
    a: "Basic usage statistics are on by default after a first-use disclosure: a daily random-ID heartbeat plus ID-free CLI counts, with no content collected. You can turn them off with the command loopx usage-ping disable or by setting LOOPX_USAGE_PING=0."
---

## What does loopx do?

LoopX keeps a long-running agent task on track when sessions end, hosts restart or work moves between runtimes. It stores the goal, the todo list, pending approvals, ownership and evidence on your machine, so the next session starts from recorded state instead of a fresh prompt.

It does not run a model or call tools itself. The agent host does that, and LoopX decides what the next turn should see: the active goal, the next todo, and any decision that is waiting for you. This makes it a fit for work that spans many sessions, such as performance investigations, bug-fix loops or research with several agents, where progress otherwise gets lost in between.

## Core features

- **Goal state and todos**: a goal with its todos, claims and gates, kept across sessions and restarts.
- **User gates**: steps that need a person stop and wait for a decision before the agent continues.
- **Quota-aware continuation**: `loopx quota should-run` tells a registered agent whether it should act now, wait or stay quiet.
- **Evidence and history**: `loopx status` and `loopx review-packet` show the goal, waiting decisions, the next todo and what was done.
- **Dashboard**: `loopx dashboard` opens a local browser or PWA view of the workspace.
- **Host entries**: documented starting points for Codex App, Codex CLI, Claude Code, DeepSeek Harness and several other hosts.

## How to use loopx

1. Install LoopX once. It requires Python 3.11+ and Node.js 22.22.3+ (24 LTS recommended):

   ```bash
   python3 -m pip install --upgrade loopx && loopx workflow-skills --install
   ```

2. Restart your agent host and open your project.
3. In Codex, send one goal in natural language:

   ```text
   $loopx speed up this project's slowest workflow; compare approaches and verify the gains
   ```

   Claude Code uses `/loopx <complex task>` instead.
4. In DeepSeek Harness, install the native DSH plugin documented in the repository at `packages/dsh-loopx-plugin/README.md`, select the `loopx` skill, then describe the task.
5. Check progress with `loopx status`. If something looks wrong with the setup, run:

   ```bash
   loopx doctor
   ```

If you are upgrading from 1.x, the README asks you to read the 2.0 migration guide before continuing existing goals.
