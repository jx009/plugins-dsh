---
title: "dscode: Terminal Coding with DSH"
description: "dscode is a DSH plugin-integrated coding agent that runs in your terminal. Learn setup checks, remote runtime configuration and troubleshooting."
summary: "Code with a persistent shell, hand tasks between sessions and run independent reviews. Terminal, CLI and scripts share a runtime built on DeepSeek Harness."
highlights:
  - "Persistent Bash and version-checked edits"
  - "Ultra reasoning and isolated subagents"
  - "Cross-session task handoffs"
  - "Independent code and permission review"
  - "Remote runtime and scripted execution"
faq:
  - q: "How do I install dscode in DeepSeek Harness?"
    a: "The supplied README excerpt describes dscode as a versioned harness with its dependencies, TUI and plugins verified together, rather than a standalone plugin package. It does not include an installation command, so use the project's complete installation instructions instead of guessing an npm package."
  - q: "Does dscode support Linux and Windows?"
    a: "The README lists macOS 14+ and glibc-based Linux on x64 or arm64. It does not list Windows support, and the documented distribution includes Node.js."
  - q: "How do I connect dscode to a remote runtime?"
    a: "Start the server with `dscode server --port 8080`, then configure the client using `dscode config --runtime host:8080 --token … --alias devbox --set-default`. The connection uses token authentication without encryption, so use a VPN, trusted LAN or SSH tunnel."
  - q: "Can I use dscode in scripts or CI?"
    a: "Yes: `dscode exec \"prompt\"` runs a non-interactive turn, and piped input is supported. Replies go to stdout, tool activity and the session ID go to stderr, and `--json` and `--resume` are available."
  - q: "Does dscode Ultra automatically grant more permissions?"
    a: "No: Ultra changes reasoning and delegation behavior without expanding permissions. The default guardrails include a `workspace-write` sandbox and independent permission review, with human approval available."
---

## What does dscode do?

dscode is a DSH plugin-integrated terminal coding agent built on DeepSeek Harness. It helps developers edit files, run builds and tests, and coordinate work across sessions without maintaining separate contexts for the terminal interface, CLI and scripts.

This is a complete, versioned harness distribution rather than a standalone npm plugin. Its dependencies, TUI and plugins are pinned and verified together. The documented platforms are macOS 14+ and glibc-based Linux on x64 or arm64, with Node.js bundled.

A local background host owns sessions while terminals attach to it. Closing a terminal does not end the work, and multiple terminals can share a session. This separation is useful when moving between interactive coding and scripted access to the same task.

## dscode core features

- **Persistent shell and guarded edits:** Bash preserves shell state and saves large captured output for later reading. File tools provide bounded reads, batch edits and atomic writes with stale-version protection.
- **Ultra and subagents:** Ultra uses the model's `max` reasoning setting and decides how much investigation, delegation and verification to perform. Editing children can use isolated Git worktrees created from a clean `HEAD`.
- **Session bridge and handoffs:** Sessions can discover, read and message one another. The CLI also exposes session listing, input submission, output reading and progress watching against the shared runtime.
- **Independent review:** A separate read-only model checks changes after relevant checks pass. Permission review is a distinct safeguard, evaluating approvals from user instructions rather than simply granting additional access.
- **Remote runtime and automation:** Keep tools, files and credentials on a server while using a local terminal. Non-interactive execution supports scripts and CI, including structured output and session resumption.

## How to install and use dscode

The supplied README excerpt contains no installation command, and the npm package name is unconfirmed. Follow the complete project installation instructions; do not substitute a guessed `dsh plugin` command.

1. After installation, run `dscode` to open the terminal interface. The default architecture starts a background host; inspect it with `dscode host status`.
2. Work interactively, or ask an isolated side question with `/btw why is the cache cold on the first turn?`. Its read-only child exchange stays outside the main conversation.
3. Use `dscode sessions` to find sessions. To request a review from another session, run `dscode send <session-id> --steer "review the change in parser.ts and reply"`.
4. Run `/review` for an explicit code review. `/permission auto-review` selects automatic permission review, while `/review-usage` shows its decisions and usage.
5. For automation, run `dscode exec "review the current changes"`, or pipe a diff with `git diff | dscode exec "review this"`.

For a remote runtime, start `dscode server --port 8080` on the server. On the client, configure the connection with `dscode config --runtime host:8080 --token … --alias devbox --set-default`, replacing the host and token placeholders. Then run `dscode` or `dscode runtime devbox`. Authentication does not encrypt traffic; use a VPN, LAN or SSH tunnel.

## How to troubleshoot dscode

Check the runtime involved before changing settings. For local sessions, inspect `dscode host status`; for a remote alias, use `dscode runtime status devbox` or `dscode runtime doctor devbox`. Both remote inspection commands accept `--json`.

Network interruptions reconnect automatically, but token or protocol-version failures require correction. Update connection fields with `dscode config --alias devbox`. Managed server installations expose status and logs through `dscode server status` and `dscode server logs`.

If submitting a message fails in a project with prompt hooks, or an otherwise healthy host terminates after 90 seconds during IPv6 readiness checks, inspect your installed version: the README identifies fixes in 0.7.54. Include the version and relevant logs when reporting a persistent problem.
