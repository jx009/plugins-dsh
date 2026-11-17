---
title: "harness-mix: DSH in Codex Desktop"
description: "harness-mix connects DSH to Codex Desktop for multi-agent work. Learn setup prerequisites, task handoffs, MCP configuration and error checks."
summary: "Use DeepSeek Harness alongside other coding agents in Codex Desktop, with task handoffs, team orchestration and native session controls."
highlights:
  - "Codex Desktop integration"
  - "Four task handoff modes"
  - "Multi-agent team orchestration"
  - "Native Skills and MCP management"
  - "Handshake diagnostics and error recovery"
faq:
  - q: "How do I install harness-mix for DeepSeek Harness?"
    a: "The supplied README excerpt does not include an installation command, so a DSH plugin installation procedure cannot be confirmed here. It points to docs/cross-platform.md for installation methods and platform prerequisites."
  - q: "How does harness-mix connect to DeepSeek Harness?"
    a: "The support matrix lists Web Remote for ordinary use and ACP for collaboration. A locally installed harness must complete its handshake before it can execute tasks."
  - q: "How do I switch agents in harness-mix?"
    a: "Use the handoff control in the composer or /switch. The available modes cover continuing execution, executing a plan, independent review and fresh analysis."
  - q: "Can harness-mix configure MCP servers?"
    a: "Settings → MCP supports local stdio and remote Streamable HTTP or SSE connections, including custom headers. Configuration takes effect separately for each harness, subject to its supported capabilities."
  - q: "Does harness-mix support macOS and Linux?"
    a: "The README reports source-build and startup adaptations for both platforms. Full desktop acceptance still needs testing on the target machine, and the cross-platform guide documents Linux desktop prerequisites."
---

## What does harness-mix do?

harness-mix is a local integration kernel that brings DeepSeek Harness and other coding agents into the official Codex Desktop interface. It serves developers who want to coordinate work across several harnesses while keeping their native models, tools, sessions and credentials. For users browsing a DSH plugin catalog, its documented role is a desktop integration; the supplied excerpt does not establish a DSH-loadable plugin installation procedure.

The registry contains 18 harnesses, including Codex, Claude Code and OpenCode. Registration alone does not make an agent runnable: it must be installed locally and complete a handshake. Ordinary official Codex sessions connect directly from Desktop to the official app-server. The independent Harness Mix Host handles tasks when another harness or the collaborative Codex option is explicitly selected.

## harness-mix core features

- **Task handoffs:** Move work between harnesses through the composer control or `/switch`. Four modes cover continuing work, executing a plan, obtaining an independent review and starting a fresh analysis, with persisted sanitized checkpoints and traceable evidence.
- **Multi-agent teams:** Use `#` to select participating harnesses and manage them as composer tags. Any harness can serve as team lead; orchestration includes review loops, cascading subtask cancellation and timeout handling.
- **Native Skills and MCP:** Settings exposes skill directories for all 18 registered harnesses and accepts a `SKILL.md` file or a complete folder by drag and drop. MCP configuration supports local stdio, remote Streamable HTTP and SSE, with custom headers and separate settings per harness.
- **History and session context:** Import native Pi, Claude, Codex and CodeBuddy history, or reference an older session with `#`. References initially fetch the latest page; read-only MCP tools allow agents to retrieve further messages and session metadata as needed.
- **Health and usage visibility:** The health center shows host state, handshake results and crash reports, with manual refresh and reprobing. The usage center aggregates up to 90 days of reported token usage, cost and reporting counts by day, harness and model.

## How to install and use harness-mix

The provided README excerpt contains no installation command. The supplied npm package name is `@harness-mix/cli`, but that alone does not document how this desktop integration should be installed through DSH. Consult the repository's `docs/cross-platform.md` for installation methods, Linux desktop prerequisites and support boundaries.

1. Prepare the desktop environment and install the native harnesses you intend to use. The README reports macOS and Linux source-build and startup adaptations, while full desktop acceptance remains a target-machine check.
2. In Codex Desktop, use the Harness Mix toolbar or composer entry to select the intended harness. For DSH, the matrix specifies ordinary Web Remote access and ACP collaboration.
3. Open Settings → Health and inspect the handshake result before attempting real work. Only successfully connected local harnesses participate in execution.
4. Configure skills under Settings → Skills and servers under Settings → MCP. Models, credentials and permission approvals remain managed by the underlying harness.
5. Start a task, use `/switch` for a handoff, or select participants through `#`. For reusable teams, configure members under the collaboration template settings and choose a template from the composer's team tab.

## How to troubleshoot harness-mix

If a harness cannot run, check its local installation and inspect Settings → Health. Refresh the status or request another handshake probe, and inspect available crash reports when the host is unhealthy.

Failed turns can be classified as connection, login, quota, rejection or service problems. Unclassified failures retain an `unknown` label. Follow the available action, such as retrying, signing in or creating a new session; login controls appear only where the harness supports them.

For missing interface capabilities, consult the support matrix. Native subagent cards currently cover 16 of 18 harnesses, excluding Trae and Kiro CLI. For startup problems on macOS or Linux, check the cross-platform guide and record the installed versions and logs before further diagnosis.
