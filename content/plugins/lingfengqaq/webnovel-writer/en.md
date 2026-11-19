---
title: "webnovel-writer: Serial Fiction for DSH"
description: "webnovel-writer is a DSH plugin that supports long-running serial fiction. Learn where to install v8, get started, and check common setup issues."
summary: "Use the v8 writing workbench for long-running web novels. The project focuses on keeping outlines, character details, and plot threads consistent as the chapter count grows."
highlights:
  - "DSH v8 serial fiction workbench"
  - "Volume and chapter planning in v6"
  - "Chapter continuity review in v6"
  - "Foreshadowing queries in v6"
faq:
  - q: "How do I install webnovel-writer in DeepSeek Harness?"
    a: "Use the v8 installation guide at https://lingfengqaq.github.io/webnovel-writer/docs/install.html. The commands in the default branch README install the Claude Code edition, not the DSH workbench."
  - q: "Which webnovel-writer branch should DSH users use?"
    a: "Use the `v8` branch for DeepSeek Harness. The `master` branch maintains the Claude Code v6 plugin, and the frozen `v7` CLI was never released."
  - q: "Can I migrate a webnovel-writer v6 book directly to v8?"
    a: "The repository does not document a verified direct migration path for existing book projects. Keep your v6 project intact while you evaluate v8 separately."
  - q: "Can webnovel-writer v6 find unresolved plot threads?"
    a: "The v6 status query can look up foreshadowing recorded in the project. The README gives `/webnovel-query 伏笔` as a Claude Code example, not as a confirmed v8 command."
  - q: "Does webnovel-writer v6 need an embedding API key?"
    a: "No. The documented v6 configuration falls back to BM25 keyword retrieval without an embedding key, which means it may miss passages that match in meaning but use different words."
---

## What does webnovel-writer do?

webnovel-writer is a DSH plugin for writing long-running web novels and keeping story details consistent across chapters. It is aimed at serial authors who need to carry character motivations, world rules, timelines, and unresolved plot threads forward instead of treating each chapter as a standalone prompt. When a later chapter returns to an earlier event, the writing workflow is meant to make the existing story details easier to check before adding new ones.

The DeepSeek Harness edition is the v8 writing workbench. The repository’s default `master` branch documents v6 for Claude Code, so its detailed examples explain the project’s approach to continuity but do not establish which commands or settings are available in v8.

## webnovel-writer core features

- **Serial fiction workbench (v8).** The DSH edition has its own branch, public runtime skills, and a beginner tutorial. Use that tutorial to look up the workflow and entry points for this edition.
- **Volume and chapter planning (v6).** The documented planner breaks the overall outline into volumes and chapters. It also updates the timeline and records new setting details that come out of planning.
- **Chapter drafting and continuity review (v6).** The drafting workflow prepares context before writing and records new facts afterward. Review covers continuity, pacing, and whether characters act in line with their established motivations.
- **Foreshadowing queries and project memory (v6).** Status queries can look up characters, foreshadowing, and entity relationships. Project memory can retain writing techniques that worked for the current book, while the read-only dashboard provides a way to inspect project state.

## How to install and use webnovel-writer

The default branch README does not supply a DSH installation command or identify an npm package for this plugin. Follow the v8 installation guide at https://lingfengqaq.github.io/webnovel-writer/docs/install.html rather than adapting the Claude Code marketplace commands.

1. Confirm that you are following the v8 instructions, then complete setup in DeepSeek Harness using the linked guide.
2. Open the v8 beginner tutorial at https://lingfengqaq.github.io/webnovel-writer/docs/beginner.html and follow its first-project walkthrough. Use the tutorial’s entry points for your first writing task rather than assuming the v6 slash commands are shared.
3. Use the v8 guide to check where to configure the workbench. The `.env` and RAG examples in the default README apply to v6 and do not establish the configuration for the DSH edition.
4. If you already write with v6, try v8 with a separate book project first. The repository does not provide a verified way to move an existing book project directly between the two editions.

## How to troubleshoot webnovel-writer

- **The workbench does not appear.** First check that the installation instructions were for v8, not `master`. Then confirm that the plugin is enabled in the DSH profile you are actually running and restart the harness.
- **A command or setting from the README does not work.** Check which edition the example belongs to. The default branch’s `/webnovel-write` command and embedding configuration are documented for Claude Code; check the v8 tutorial before treating a mismatch as a plugin error.
- **Setup still fails.** Check the installed versions and DSH logs. Note which profile you used and where the guide’s instructions stopped matching what you saw.
