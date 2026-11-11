---
title: "dsh-routing-suite: task-aware routing for DSH"
description: "A three-part kit for DeepSeek Harness: a runtime injector, router presets that pick a reasoning mode per task, and a graded protocol for long-running work."
summary: "One repository that bundles a runtime injector, the Router Standard and Router Spec presets, and a graded task protocol with check-ins and a red-team gate."
highlights:
  - "Runtime injector"
  - "Task-aware router presets"
  - "Graded task protocol"
  - "Per-model personas"
  - "Session measurement script"
faq:
  - q: "What is the difference between Router Standard and Router Spec?"
    a: "Router Standard classifies each task and applies a matching persona with the full set of prompt sections. Router Spec leans towards deep thinking first and is labelled experimental. A router-pro preset is mentioned as planned but has not been released."
  - q: "Do I need the injector if I only want the router presets?"
    a: "The repository describes the injector as the first link in the install chain, with the presets installed after it. The one-line GitHub install brings in the whole suite, so you do not have to manage the order yourself."
  - q: "Which DSH versions does dsh-routing-suite target?"
    a: "The README states a target of `>=0.1.0-rc.6`. It also notes that DSH is in developer preview and breaking changes are expected; compatibility updates are tracked in `preset/CHANGELOG.md`."
---

## What does dsh-routing-suite do?

dsh-routing-suite puts three DSH add-ons in one repository: a runtime injector, router presets that choose a reasoning mode based on the task, and a "graded" protocol that breaks long tasks into planned, checked stages.

The injector is the base layer. It provides a family of `dev_*` tools for injecting, hot-reloading and unloading plugin code without restarting DSH. The router presets build on it: each user message is sorted into a behaviour band, such as plan-first "spec" or executor-style "react", and the preset swaps the persona section of the prompt to match, with different wording for Pro and Flash models. The author documents the design in a series of experiments labelled P1 to P23, linked from the repository.

The graded component is a session-level protocol. It starts with multiple-choice brainstorming to pin down the goal, moves to a spec-style plan, then works through it with check-ins, group wrap-ups and a final verification.

## Core features

- **Runtime injector**: `dev_*` tools for injection, hot reload, unloading, promoting side-loaded plugins and repairing routes.
- **Router presets**: `router-standard` routes by task class with per-model personas; `router-spec` favours deep thinking and is marked experimental.
- **Proximity guidance**: A fixed hint travels in the same request as each user message, which, according to the changelog, avoids a second API call per turn.
- **Plan mode preserved**: Only the persona section is replaced, so plan-mode boundaries stay in place.
- **Graded protocol**: Six tools, three modes, a red-team gate and an audit endpoint around a two-level task flow.
- **Measurement script**: `graded/scripts/measure.mjs` recomputes the published metrics from your own session file and prints numbers only.

## How to use dsh-routing-suite

1. Install the whole suite from GitHub:

```
dsh plugin --profile web add github:yjh051108/dsh-routing-suite
```

2. Alternatively, clone the repository and run the bundled PowerShell script, which sets up the injector, copies the presets and checks the layout:

```
git clone https://github.com/yjh051108/dsh-routing-suite.git
cd dsh-routing-suite
.\install.ps1
```

3. To do it by hand, add the injector with `dsh plugin --profile web add .\injector`, then copy `preset\router-standard` and `preset\router-spec` into `.dsh\.agent-presets` under your user profile. Copy each preset folder on its own: DSH scans one directory level only, so copying the whole `preset` folder hides them.
4. Restart DSH and choose Router Standard or Router Spec (experimental) when you start a new session.
