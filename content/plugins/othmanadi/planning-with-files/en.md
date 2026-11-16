---
title: "planning-with-files: Persistent Plans for DSH"
description: "planning-with-files is a DSH plugin that keeps plans on disk. Learn how to approach installation, use session recovery and check missing context."
summary: "Keep task plans, findings and progress in Markdown files across context resets. Lifecycle hooks bring selected project context back into long-running coding tasks."
highlights:
  - "Persistent Markdown planning files"
  - "Session recovery after /clear"
  - "Per-turn planning context injection"
  - "Project-file-only automatic recovery"
  - "Explicit catchup for session records"
faq:
  - q: "Does planning-with-files support DeepSeek Harness?"
    a: "Yes. The README lists DeepSeek Harness among its native plugin hosts, alongside tools such as Claude Code and OpenCode."
  - q: "Which files does planning-with-files keep?"
    a: "It stores planning context in task_plan.md, findings.md and progress.md. These project files preserve task information outside the agent's conversation context."
  - q: "Can planning-with-files recover a plan after /clear?"
    a: "The README describes recovery across /clear, compaction and crashes using planning files on disk. Activated lifecycle hooks inject selected project planning context into the agent's work."
  - q: "Does planning-with-files automatically read old agent conversations?"
    a: "Automatic recovery reads project files only. Accessing same-project local session records for aggregate counts or bounded replay requires an explicit catchup mode."
  - q: "Can I use planning-with-files with agents other than DSH?"
    a: "The project reports installation across more than 60 agents through the Agent Skills standard. It also names native integrations for Claude Code, Codex CLI, Qoder CLI, Pi, Hermes Agent and OpenCode."
---

## What does planning-with-files do?

planning-with-files is a DSH plugin that preserves task planning in Markdown files outside the conversation window. It helps developers running long coding tasks retain a plan, findings and progress when the agent loses context. The README explicitly includes DeepSeek Harness among its native plugin hosts.

The planning-with-files DSH plugin centers on three files: `task_plan.md`, `findings.md` and `progress.md`. Keeping this information on disk gives the agent a persistent source of task context after `/clear`, compaction or a crash. Activated lifecycle hooks inject selected project planning context on subsequent turns, addressing context rot as work continues.

Recovery has a defined scope: automatic recovery reads project files. Reading local agent session records from the same project requires an explicit catchup mode, whether the purpose is aggregate counts or bounded replay. This distinction matters when deciding what information you expect a resumed task to recover.

## planning-with-files core features

- **Persistent Markdown plans**: Three named project files hold the plan, findings and progress. Task information remains available beyond the lifetime of a conversation context.
- **Session recovery**: File-based planning supports continuity after `/clear`, compaction and crashes. Recovery depends on the planning context retained on disk.
- **Per-turn context injection**: Activated lifecycle hooks reintroduce selected planning context. This keeps relevant project information available as a long task proceeds.
- **Explicit session catchup**: Automatic recovery stays within project files. Same-project local session records require an explicitly selected catchup mode for counts or bounded replay.
- **Multiple agent hosts**: The project supports the Agent Skills standard across more than 60 agents and lists several native plugin integrations. DSH is one of the named hosts.

## How to install and use planning-with-files

The supplied README excerpt does not include a DSH installation command, and the supplied repository metadata does not confirm an npm package name. An executable installation command therefore cannot be established from this material. The README points to `docs/installation.md` for the full installation guide; use its host-specific instructions to establish the supported setup.

1. Consult the full installation guide for the DeepSeek Harness integration. Check its package identifier and configuration requirements before installing.
2. After installation, confirm that the plugin is enabled in the DSH profile you intend to use. The supplied excerpt does not specify a DSH configuration file path or activation command.
3. Work with the project's planning files. Use `task_plan.md` to review the plan, `findings.md` to retain discoveries and `progress.md` to track ongoing work.
4. Keep those files current as the task evolves. They are the documented source for automatic recovery when conversation context is lost.
5. When resuming, distinguish project-file recovery from session-record catchup. If you need the latter, consult the full documentation for its explicit mode; the excerpt does not provide its invocation syntax.

## How to troubleshoot planning-with-files

The supplied excerpt does not document specific DSH error messages or fixes. If planning context is missing, begin with general checks:

- Confirm that you opened the intended project and that its planning files are present and contain the expected information.
- Check the active profile name and whether the plugin is enabled there.
- Restart DSH, then check the installed versions and available logs if the behavior persists.
- If old conversation details are absent, review the recovery scope. Automatic recovery uses project files; session-record access needs explicit catchup.

When investigating further, record whether the issue followed `/clear`, compaction or a crash. Include the active profile, versions and relevant logs so the observed behavior can be compared with the host-specific installation documentation.
