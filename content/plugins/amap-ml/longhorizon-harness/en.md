---
title: "LongHorizon-Harness: Resume DSH workflows"
description: "LongHorizon-Harness is a workflow runner for DeepSeek Harness. Learn how to install it, configure the headless backend, and troubleshoot errors."
summary: "Run multi-step terminal tasks with checkpoints you can resume from. An independent audit checks each result before it becomes part of the task state."
highlights:
  - "Fresh context for each execution round"
  - "Independent checks before checkpointing"
  - "Resume from verified task state"
  - "Headless DSH backend integration"
  - "Per-role settings in the Web workbench"
faq:
  - q: "How do I install LongHorizon-Harness for DeepSeek Harness?"
    a: "Install the standalone runner using the upstream README’s Usage section. The available documentation does not provide a DSH plugin install command or confirm an npm package name."
  - q: "What backend name does LongHorizon-Harness use for DeepSeek?"
    a: "Use `--agent deepseek_harness` to select DeepSeek Harness from the command line. That backend uses the `headless` DSH profile rather than the `web` profile used by the marketplace install template."
  - q: "Does LongHorizon-Harness support desktop GUI or MCP with DSH?"
    a: "Not in the documented phase-one integration, which is CLI-only. Desktop computer use elsewhere in the project does not mean the DeepSeek backend supports it."
  - q: "Can LongHorizon-Harness resume after a failed step?"
    a: "Yes. A step that fails verification is recorded as evidence, so the next round can account for the failure while working from the last accepted checkpoint."
  - q: "Can I change the goal while LongHorizon-Harness is running?"
    a: "You can send an instruction from the Web workbench while a run is active. A message sent during a round is picked up by the next round rather than interrupting the current one."
---

## What does LongHorizon-Harness do?

LongHorizon-Harness is a workflow runner that uses DeepSeek Harness as a backend for long-running terminal tasks. It works alongside an existing agent rather than replacing it or installing as a DSH plugin. Its main job is to decide what should happen next, check what actually happened, and preserve enough verified state to continue without relying on one long conversation.

The project supports desktop and terminal workflows across its supported backends, but the documented DeepSeek integration is CLI-only. Use it for tasks where progress can be checked against files, command output, or tests. Desktop GUI control and MCP support are not part of this integration phase.

## LongHorizon-Harness core features

- **Fresh-context execution.** The Manager uses the original goal, accepted progress, and evidence from failed attempts to choose one bounded step. The Executor starts that round with a fresh context instead of carrying the entire conversation forward.
- **Independent auditing.** The Auditor checks the actual result, such as a file change or test output, rather than accepting the Executor’s report. A rejected result can inform the next attempt, but it does not count as completed work.
- **Recoverable checkpoints.** Verified results become durable task state. If a step fails or the context is refreshed, the next round can use the last accepted checkpoint to determine what still needs doing.
- **Isolated DSH backend.** The integration uses an isolated `DSH_HOME`, supports role-scoped read and write permissions, and allows DeepSeek API endpoint overrides. It normalizes the backend’s JSONL output for the runner.
- **Web workbench.** Choose a backend and model for each role, respond to approval requests, and send instructions during a run. You can also follow up on a finished run without discarding its round history.

## How to install and use LongHorizon-Harness

No DSH package installation command is documented. Use the upstream README’s Usage section to install the standalone runner; the project lists Python 3.10 or newer as a requirement. The commands below select or launch components after setup; they do not install the project.

1. Choose the directory you want the task to work in. Runs use the directory you launch from by default, so start in the relevant workspace.
2. Run `lh-harness web` to open the browser workbench. In the task setup, choose DeepSeek Harness and a model for each role you want to use that backend. The Manager, Executor, and Auditor can be configured separately.
3. For a terminal run, use the upstream CLI usage instructions and select `--agent deepseek_harness`. The runner invokes `dsh --profile headless` for this backend.
4. Give the run a goal with a result you can check, such as an output file or a passing test. In the workbench, review the round history and respond if an approval is requested.

## How to troubleshoot LongHorizon-Harness

- **The backend does not start.** Check that the DSH CLI is available and that the run uses `deepseek_harness` with the `headless` profile. Consult the runner’s `doctor` diagnostics and logs, especially if you changed the API endpoint or are expecting settings from your usual DSH home.
- **Approvals fail after resuming an older run, or CLI output has encoding problems.** The README lists fixes for resumed-run approvals and non-UTF-8 output in `v0.1.8`. Check your installed version and consult that release’s notes for upgrade details and Windows limitations.
- **The final reply is slow.** Release `v0.1.8` adds `--final-response-timeout`, which lets you allow more time for the closing response.
