---
title: "dsh-routing-suite: Reasoning Router for DSH"
description: "dsh-routing-suite is a DSH plugin kit that picks a reasoning mode per task, adds a hot-reload injector and a graded task protocol. Learn to install it."
summary: "One repository that bundles a runtime injector, the Router Standard and Router Spec presets, and a graded task protocol with check-ins and a red-team gate."
highlights:
  - "Task-aware reasoning mode router"
  - "Per-model personas for Pro and Flash"
  - "Hot-reload runtime injector"
  - "Graded protocol for long tasks"
  - "Session measurement script"
faq:
  - q: "How do I install dsh-routing-suite in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add github:yjh051108/dsh-routing-suite`, restart DSH, then pick Router Standard or Router Spec in a new session. On Windows you can also clone the repository and run `install.ps1`."
  - q: "What is the difference between Router Standard and Router Spec in dsh-routing-suite?"
    a: "Router Standard classifies each task and applies a matching persona with the full set of prompt sections. Router Spec leans towards deep thinking first and is labelled experimental."
  - q: "Why don't the dsh-routing-suite presets appear in DSH?"
    a: "DSH only scans one level under `~/.dsh/.agent-presets`. Copy `preset/router-standard` and `preset/router-spec` there individually; copying the whole `preset` folder adds an extra level and hides them."
  - q: "Does dsh-routing-suite double my API calls?"
    a: "Not since v0.3.0. Guidance is now injected in the same request as your message through `agent/pre-step`; earlier versions made a second call each turn, doubling the cost."
  - q: "Which DSH versions does dsh-routing-suite target?"
    a: "The README states `>=0.1.0-rc.6` and warns that DSH is a developer preview with expected breaking changes. Compatibility updates are tracked in `preset/CHANGELOG.md`."
  - q: "What does the dsh-routing-suite graded protocol do?"
    a: "It turns long tasks into stages: multiple-choice brainstorming to fix the goal, a spec-style plan, check-ins, group wrap-ups and a final verification, with a red-team gate and an audit endpoint."
---

## What does dsh-routing-suite do?

dsh-routing-suite is a DSH plugin kit that makes DeepSeek Harness choose how hard to think based on the task in front of it. Each user message is sorted into a behaviour band, such as plan-first "spec" or executor-style "react", and the router swaps the persona section of the prompt to match, with different wording for Pro and Flash models.

The kit has three parts in one repository. A runtime injector provides `dev_*` tools to inject, hot-reload and unload plugin code without restarting DSH. Router presets build on it to route tasks. A graded protocol breaks long-running work into planned, checked stages.

The author documents the router's behaviour through a series of measured experiments labelled P1 to P23, and ships a script so you can recompute the metrics from your own sessions.

## dsh-routing-suite core features

- **Router Standard preset**: classifies each task and applies a matching persona, with separate wording for Pro and Flash models.
- **Router Spec preset**: favours deep thinking before acting; marked experimental.
- **First-turn routing**: since v0.3.0 the first real user message is captured before assembly, so even the opening request is classified correctly.
- **Proximity guidance**: a short hint travels in the same request as each message, so there is no extra API call per turn.
- **Plan mode preserved**: only the persona section is replaced, leaving plan-mode boundaries intact.
- **Runtime injector**: tools for injection, hot reload, unloading, promoting side-loaded plugins and repairing routes.
- **Graded protocol and measurement**: six tools, three modes and a red-team gate, plus `graded/scripts/measure.mjs` to recompute published metrics from your own session file.

## How to install and use dsh-routing-suite

1. Install the whole suite:

   ```bash
   dsh plugin --profile web add github:yjh051108/dsh-routing-suite
   ```

2. Restart DSH.
3. Start a new session and choose **Router Standard**, or **Router Spec (experimental)** if you want plan-first behaviour.
4. Work as usual. The router classifies each message and adjusts the reasoning mode automatically.

For a manual install on Windows, clone the repository and run `install.ps1`, which assembles the injector, copies the presets and checks the layout. Doing it by hand, add `.\injector` with `dsh plugin --profile web add`, then copy `preset\router-standard` and `preset\router-spec` separately into `%USERPROFILE%\.dsh\.agent-presets\`.

## How to troubleshoot dsh-routing-suite

- **The router presets do not show up.** DSH scans only one level under `.agent-presets`. Copy each preset folder on its own, not the parent `preset` folder.
- **`dsh` is not on your PATH.** Run the install through `npx '@deepseek-ai/dsh' plugin --profile web add .\injector` instead.
- **The first turn always uses the weak mode.** This was fixed in v0.3.0; update to the latest version from GitHub.
- **API costs doubled.** Versions before v0.3.0 sent a second call each turn for guidance. Upgrade so guidance rides along with your message.
- **Something broke after a DSH update.** DSH is a developer preview with breaking changes. Check `preset/CHANGELOG.md` for compatibility notes before reporting.

When filing an issue, include the suite version, your DSH version, the preset you selected and the output of the measurement script if relevant.
