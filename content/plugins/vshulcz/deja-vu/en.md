---
title: "deja-vu: Shared Agent Memory for DSH"
description: "deja-vu is a DSH plugin that indexes past coding agent sessions so DeepSeek Harness can recall, hand off and restore earlier work. Learn to install and tune it."
summary: "A single Go binary that indexes saved sessions from 43 coding agents on your own machine, then offers search, cross-agent handoff and recovery of overwritten code. DeepSeek Harness is one of the supported harnesses."
highlights:
  - "Search sessions from 43 coding agents"
  - "Automatic recall at session start"
  - "Cross-agent session handoff"
  - "Restore overwritten code"
  - "Fully local, no LLM key needed"
faq:
  - q: "How do I install deja-vu in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add dsh-deja`. Alternatively, install the `deja` binary with the install script and run `deja install --auto`, which wires every detected agent, including DSH, and builds the first index in about ten seconds."
  - q: "Which deja-vu features work in DeepSeek Harness?"
    a: "MCP recall, automatic recall, the skill, the command and handoff all work in DSH. Resume is not supported, and the README lists `zstd` as a requirement."
  - q: "Does deja-vu send my session history anywhere?"
    a: "No. Indexing and search run locally with no LLM calls. The network is used only by `deja update`, `deja sync ssh`, version checks and an embedding endpoint if you configure one. Set `DEJA_OFFLINE=1` to turn off the daily release check."
  - q: "Will deja-vu slow DeepSeek Harness down?"
    a: "Recall is a local lexical lookup with a median of under a millisecond. A hook adds process start and a freshness check, about 0.2 seconds end to end on a 1.9 GB store."
  - q: "Can deja-vu recall work from before I installed it?"
    a: "Yes. It indexes the transcripts agents have already saved on disk, so earlier sessions become searchable after the first indexing pass."
  - q: "How do I keep some projects out of deja-vu?"
    a: "List project names or path patterns, one per line, in `~/.config/deja/exclude`, or add `harness:<name>` to skip an agent's store entirely."
---

## What does deja-vu do?

deja-vu is a DSH plugin that turns the session transcripts your coding agents already save into one searchable local memory. Its command-line tool, `deja`, indexes those files so DeepSeek Harness, any other connected agent, or you in a terminal can look up what was decided, run or edited before.

Because the index is built from history that already exists, there is no capture step and no empty start: sessions from before you installed it are searchable after the first pass. And because it covers 43 agents, including Claude Code, Codex, Cursor, Gemini CLI and DSH, a fix worked out in one agent can be recalled from another.

The same index powers two more jobs: handing an unfinished session to a different agent, and recovering code that an agent overwrote before it was committed. Everything runs in one Go binary on your machine.

## deja-vu core features

- **Search across agents**: run `deja` with no arguments for a terminal search over every agent's history, filtered by agent, time and project; `deja view` exports it all to one local HTML page.
- **Automatic recall**: through hooks and an MCP tool, relevant earlier sessions surface at session start, before an edit or command, and when a command fails.
- **Handoff**: `deja handoff` passes the current session's goal, decisions, touched files and open work to another agent.
- **Restore and blame**: the index keeps exact edit spans, so `deja restore` recovers overwritten code and `deja blame` shows which session wrote a line.
- **Repository memory**: `deja repo add` saves chosen decisions and dead ends to `.deja/memory.jsonl` so teammates' agents can recall them after cloning.
- **Credential redaction**: keys, tokens and passwords are replaced with a marker while the index is built.

## How to install and use deja-vu

1. Add the DSH package:

   ```bash
   dsh plugin --profile web add dsh-deja
   ```

2. Or install the `deja` binary and wire every detected agent at once:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/vshulcz/deja-vu/main/install.sh | sh && deja install --auto
   ```

   Homebrew (`brew install deja-vu`), Scoop, winget and `go install` are also supported.

3. Make sure `zstd` is installed; DSH support needs it.
4. Open a new DSH session in a repository. Earlier relevant work appears automatically, or ask directly: "have we dealt with JWT refresh rotation before?"
5. From a terminal, run `deja` to search, `deja last` to list recent sessions across agents, or `deja handoff` to continue in another tool.

## How to troubleshoot deja-vu

- **DSH recalls nothing.** Check that the plugin or `deja install --auto` wired the profile you are running and that `zstd` is installed. Run `deja` in a terminal to confirm the index has sessions.
- **Recent sessions are missing from results.** Automatic indexing may be off; check `auto_index` in `~/.config/deja/policy.json` or the `DEJA_NO_AUTO_INDEX` variable.
- **Unwanted projects show up in recall.** Add patterns to `~/.config/deja/exclude`, or adjust the `ignore` list in `policy.json`.
- **Resume does not work in DSH.** Resume is not supported for DeepSeek Harness; use handoff instead.
- **You need a fully offline setup.** Set `DEJA_OFFLINE=1` to stop the daily release check, and leave the optional embedding endpoint unconfigured.

When reporting a problem, include `deja --version`, your DSH version and which agents' stores are indexed.
