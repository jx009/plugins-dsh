---
title: "Distilly: Person Profile Skills for DSH"
description: "Distilly is a DSH skill that distills a colleague's or public figure's judgment and voice into a reusable agent skill. Learn how to install and use it."
summary: "Distilly converts materials about a person into a reusable Person Profile, packaged as an Agent Skill. It supports colleague, relationship, and public or fictional figure workflows."
highlights:
  - "Person Profiles from chats, docs and interviews"
  - "Colleague, relationship and celebrity workflows"
  - "Lark, DingTalk and Slack collection"
  - "Packaged as an Agent Skill"
  - "Native skill discovery in DeepSeek Harness"
faq:
  - q: "How do I install Distilly in DeepSeek Harness?"
    a: "Clone the repository into your DSH skills folder, `~/.dsh/skills/distilly` (or `$DSH_HOME/skills/distilly`), or `.dsh/skills/distilly` inside a project. Alternatively, ask your agent to install Distilly from its GitHub URL and verify DSH can discover it."
  - q: "Is there an npm package for Distilly?"
    a: "No. Distilly is installed as a skill folder, not an npm plugin, so there is no `dsh plugin add` command for it."
  - q: "What does Distilly produce?"
    a: "A Person Profile grounded in the materials you supply, packaged as an Agent Skill named `{character}-{slug}` that DSH and other hosts can load."
  - q: "Which kinds of people can Distilly model?"
    a: "Three families: colleagues and mentors, personal relationships, and public figures or fictional characters. Each has its own collection strategy, analysis dimensions and profile structure."
  - q: "How do I install a generated Distilly profile into DSH?"
    a: "Run `python3 tools/install_generated_skill.py --skill-dir \"skills/{character}/{slug}\" --host deepseek-harness`. It writes only the self-contained `SKILL.md` into `~/.dsh/skills`, not your private source material."
  - q: "Is Colleague Skill the same project as Distilly?"
    a: "Yes. Colleague Skill is the former name. The creator skill is now called `distilly` and installs into a `distilly` folder."
---

## What does Distilly do?

Distilly is an agent skill for DeepSeek Harness that distills how a person thinks and works into a reusable Person Profile. You feed it messages, documents, interviews, public sources or just your own description, and it organizes the evidence about that person's experience, judgment, voice and working habits into a skill your agent can load.

The project used to be called Colleague Skill, and it still covers workplace use: capture how a senior engineer reviews code, or how a mentor makes trade-offs, so the knowledge does not leave with them. It now also handles personal relationships and public or fictional figures, each with its own workflow.

Distilly is not an npm plugin. It is a skill folder that DSH discovers natively, alongside Claude Code, Codex, OpenCode, Hermes and other hosts. The profiles it generates describe observable patterns from your sources; the project does not claim to clone anyone.

## Distilly core features

- **Colleague profiles**: technical standards, workflows and workplace behavior, with automatic collection from Lark, DingTalk and Slack.
- **Relationship profiles**: expression, emotional triggers, conflict and repair patterns found in chat history and letters.
- **Celebrity profiles**: a research pipeline for subtitles, transcript cleanup, source merging and quality checks.
- **Your own profile**: say "Use Distilly to set up my profile" and a short interview produces a profile kept locally at `~/.distilly/owner/profile.md`.
- **Agent Skill output**: each result is packaged as a skill named `{character}-{slug}`.
- **Safe install of results**: the installer copies only the generated `SKILL.md`, never your private source files.

## How to install and use Distilly

1. Clone Distilly into your DSH skills folder:

   ```bash
   git clone https://github.com/titanwings/distilly ~/.dsh/skills/distilly
   ```

   Use `.dsh/skills/distilly` inside a project for a project-level install, or ask your agent: "Install Distilly from https://github.com/titanwings/distilly, then verify that this host can discover it."

2. Restart DSH so it picks up the new skill.
3. In a conversation, say "Use Distilly to create a Person Profile for <name>".
4. Choose `colleague`, `relationship` or `celebrity`, add a description or source material (every field is optional), then review the draft.
5. Install the generated profile into DSH:

   ```bash
   python3 tools/install_generated_skill.py --skill-dir "skills/{character}/{slug}" --host deepseek-harness
   ```

## How to troubleshoot Distilly

- **DSH does not find the skill.** Check that `SKILL.md` sits directly inside `~/.dsh/skills/distilly` (or `$DSH_HOME/skills/distilly`), not one folder deeper, then restart DSH.
- **A generated profile is not available.** Generated profiles are separate skills. Run the installer with `--host deepseek-harness`, and add `--force` to overwrite an older copy; use `--skills-dir` for a project-level root.
- **Lark collection returns nothing.** Automatic collection needs the app bot added to the relevant group chats.
- **The profile feels shallow.** Quality follows the sources. For colleagues, long-form writing and decision replies beat casual chat; for public figures, first-person books and long interviews beat commentary.
- **You upgraded from Colleague Skill.** The creator skill was renamed `distilly`; follow the migration notes in the install guide so the folder name matches.

The project describes itself as a demo version, so report bugs on GitHub with your host, Distilly version and the workflow you used.
