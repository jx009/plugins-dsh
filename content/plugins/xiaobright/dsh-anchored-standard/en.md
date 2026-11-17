---
title: "dsh-anchored-standard: DSH Tool Bootstrap"
description: "dsh-anchored-standard is a DSH plugin that stages agent tools. Learn about installation, Minimal bootstrap settings and troubleshooting."
summary: "Start a session with Minimal tools, then expose discovery tools and unlock heavier capabilities on demand. These experimental community presets are frozen and were tuned for V4 Pro."
highlights:
  - "Minimal tool bootstrap"
  - "Durable event promotion"
  - "On-demand Standard tool discovery"
  - "Unified context injection control"
  - "Seeded prefab sessions"
faq:
  - q: "How do I install dsh-anchored-standard in DeepSeek Harness?"
    a: "The README says each mode directory is self-contained and can be installed independently under the ID you copy it to. The supplied excerpt omits the Install section, and no npm package name is confirmed, so it does not establish a runnable installation command or destination path."
  - q: "When does dsh-anchored-standard unlock Standard tools?"
    a: "The base preset promotes after the first durable tool call or assistant message. It then exposes a resident catalog with discovery tools; heavier tools become available when explicitly unlocked."
  - q: "Does dsh-anchored-standard preserve its phase after reloading?"
    a: "Phase state comes from events recorded in the session log. Resuming or reloading therefore preserves the phase rather than relying only on temporary runtime state."
  - q: "Does dsh-anchored-standard add an extra model call?"
    a: "The base mode adds no anchor call, while Zero-Anchored and Whoami each add one. Prefab instantiation requires no model call because it uses a bundled trajectory that has already been promoted."
  - q: "Is dsh-anchored-standard maintained for V4.1 Flash?"
    a: "The README marks the project as frozen and says new issues and pull requests are no longer handled. Its presets were tuned for V4 Pro; the successor's first-round trajectory was not measured, so compatibility should not be read as validated anchoring behavior."
---

## What does dsh-anchored-standard do?

dsh-anchored-standard is a DSH plugin that provides experimental agent presets for starting sessions under Minimal conditions and introducing more tools afterward. It serves DeepSeek Harness users investigating how the first request's tool schema, output budget and injected context affect a model's reasoning trajectory.

The base preset starts with `bash` and `str_replace_editor`, suppresses automatic context injection, and promotes after the first durable tool call or assistant message. Later requests use a small resident catalog with discovery tools and explicitly unlocked capabilities. This makes the initial tool surface different from the tools available later in the session.

This is an unofficial community project. The README marks it as frozen, with new issues and pull requests no longer accepted. Its measurements and tuning targeted V4 Pro. The maintainer did not measure V4.1 Flash's own first-round trajectory, so earlier flash-family observations should not be treated as validation for that successor.

## dsh-anchored-standard core features

- **Minimal bootstrap:** The first request uses the real Minimal tool pair. The base preset leaves the output budget at the adapter default unless `bootstrapMaxTokens` is explicitly configured.
- **Durable promotion:** With `promoteOn: either`, the first recorded `tool/call` or `assistant/message` ends bootstrap. Deriving phase state from session events preserves it across resume and reload.
- **Standard tool discovery:** After promotion, `dev_tool_search`, `skill_search` and `skill_load` expose an on-demand route to heavier tools. The resident catalog includes the bootstrap pair, discovery tools and anything explicitly unlocked.
- **Context injection control:** The `context-gate` plugin suppresses automatic injections during bootstrap through the harness's unified injection paths. Standard injections return after promotion.
- **Alternative session starts:** Zero-Anchored uses a fixed anchor exchange; Whoami uses a self-introduction exchange. Prefab instead hydrates a blank session with a bundled successful trajectory that is already promoted.

## How to install and use dsh-anchored-standard

The supplied README excerpt contains no installation command, and the repository information does not confirm an npm package name. It refers to an Install section that is absent from the excerpt, so a package command or copy destination cannot be provided reliably.

1. Consult the complete README's Install section for the destination and registration procedure. Each mode directory is self-contained and installs independently under the ID it is copied to.
2. Choose `preset/` for the base two-phase behavior. Other documented choices include `zero-anchored-standard/`, `whoami-standard/` and `prefab/`.
3. Select the installed preset and begin a session. Prefab hydrates a blank session in place when selected; it does not require a per-workspace import.
4. For the base mode, distinguish the initial tool pair from the promoted catalog. Discovery tools become available after the durable promotion event.
5. If adjusting the first-request budget, consult the full configuration documentation for `bootstrapMaxTokens`. The excerpt identifies this option but does not show its configuration file or complete syntax.

## How to troubleshoot dsh-anchored-standard

If the preset is missing, confirm the active profile name and that the installation is enabled there. Restart DSH, then inspect versions and logs. These are general checks; the excerpt supplies no specific installation error codes.

If bootstrap appears to continue, inspect the session log for the first durable `tool/call` or `assistant/message`. The base mode promotes on either event; live-anchor variants wait for their anchor reply.

If anchoring changes, check the initial tool schema, automatic injections and optional output cap. The README reports that a skill-catalog reminder prevented anchoring in its measured trials. It also reports that a small cap can worsen drift when the first reply is truncated and continued; the base default therefore leaves that cap unset. These findings describe measured conditions, not a universal guarantee.
