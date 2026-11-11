---
title: "deja-vu: local memory shared across coding agents"
description: "deja-vu indexes the session transcripts your coding agents already save, so DeepSeek Harness and other agents can search, hand off and restore past work."
summary: "A single Go binary that indexes saved sessions from 43 coding agents on your own machine, then offers search, cross-agent handoff and recovery of overwritten code. DeepSeek Harness is one of the supported harnesses."
highlights:
  - "Cross-agent session search"
  - "Session handoff"
  - "Overwritten code recovery"
  - "Local index"
  - "Repository-level memory"
faq:
  - q: "Is deja-vu built only for DeepSeek Harness?"
    a: "No. It is a general tool that reads the session stores of 43 coding agents, including Claude Code, Codex and Cursor. DeepSeek Harness is one supported harness, and the README lists a dedicated npm package for it, dsh-deja."
  - q: "Which deja-vu features work in DeepSeek Harness?"
    a: "The README's support table marks MCP recall, automatic recall, the skill, the command and handoff as available for DeepSeek Harness. Resume is marked as not supported, and zstd is listed as a requirement."
  - q: "Does deja-vu send my session history over the network?"
    a: "Indexing and search run locally with no LLM calls. According to the README, the network is used only by deja update, deja sync ssh, version checks and an embedding endpoint if you configure one; setting DEJA_OFFLINE=1 turns off the daily release check."
---

## What does deja-vu do?

deja-vu turns the session transcripts that coding agents already write to disk into one searchable local memory. Its command-line tool, `deja`, indexes those files so that any connected agent, or you in a terminal, can look up what was decided, run or edited before.

It is not specific to DeepSeek Harness. The project covers 43 agents, among them Claude Code, Codex, Cursor, Gemini CLI and OpenCode, with DSH as one entry on the list. Because the index is built from history that already exists, earlier sessions become searchable right after the first indexing pass, and a fix made in one agent can be recalled from another.

The same index supports two further jobs: passing an unfinished session to a different agent, and getting back code that an agent overwrote before it was committed.

## Core features

- **Search across agents**: Running `deja` with no arguments opens a terminal search over every agent's history, with filters for agent, time range and project. `deja view` exports the store to a single local HTML file.
- **Handoff**: `deja handoff` passes the active session's goal, decisions, touched files and open work to another agent.
- **Restore and blame**: The index records opened files, commands with exit codes and exact edit spans, so `deja restore` can recover overwritten code and `deja blame` can trace which session wrote a line.
- **Automatic recall**: Through hooks and a single MCP tool, earlier sessions are surfaced at session start, before an edit or command, and when a command fails.
- **Repository memory**: `deja repo add` writes the decisions and dead ends you choose into `.deja/memory.jsonl`, so a teammate's agent can recall them after cloning.
- **Credential redaction**: Keys, tokens and passwords are replaced with a redaction marker while the index is built. The original transcripts are left as they are; `deja secrets` lists the affected sessions.

## How to use deja-vu

1. Install the binary. On macOS or Linux the README uses an install script:

```sh
curl -fsSL https://raw.githubusercontent.com/vshulcz/deja-vu/main/install.sh | sh
```

The script does not run on Windows; use Scoop or winget there:

```powershell
scoop install deja-vu
winget install vshulcz.deja-vu
```

2. Wire it into the agents found on your machine. This sets up MCP recall and hooks and builds the first index:

```sh
deja install --auto
```

3. If you prefer to install from the DSH plugin system, the README lists the npm package `dsh-deja`:

```sh
dsh plugin --profile web add dsh-deja
```

4. Start a new agent session, or query the history yourself:

```sh
deja "jwt refresh token"
deja handoff --to codex
deja restore internal/auth/jwt.go
```
