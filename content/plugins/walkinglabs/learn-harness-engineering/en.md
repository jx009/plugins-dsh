---
title: "learn-harness-engineering: DSH Harness Course"
description: "learn-harness-engineering is a free course and DSH skill pack on building agent harnesses, with a DeepSeek Harness design breakdown. Learn where to start."
summary: "A project-based course on the systems around AI coding agents. Includes DeepSeek harness design analysis and exercises for automated loops and graph orchestration."
highlights:
  - "14 lectures and 8 hands-on projects"
  - "DeepSeek Harness design breakdown"
  - "harness-creator agent skill"
  - "audit-harness.sh repository check"
  - "Course in 15 languages"
faq:
  - q: "How do I use learn-harness-engineering with DeepSeek Harness?"
    a: "Read the course in your browser, then copy the `harness-creator` skill from the repository's `skills/` folder into your DSH skills folder, `~/.dsh/skills/`, and restart DSH. The skill helps scaffold a harness for your own project."
  - q: "Is learn-harness-engineering an installable DSH plugin?"
    a: "Not in the npm sense. It is a course with reusable agent skills and a shell audit tool. There is no `dsh plugin add` command for it."
  - q: "What does learn-harness-engineering say about DeepSeek Harness?"
    a: "A dedicated breakdown explains how DeepSeek builds its harness: everything is a plugin, capability seams, and an event pipeline. It sits alongside breakdowns of Pi, Claude Code and Codex."
  - q: "How do I check my repository with learn-harness-engineering?"
    a: "Run `tools/audit-harness.sh` against your repo. It checks all five harness subsystems and exits 0 when every critical item passes, with no Node.js required."
  - q: "What do I need to follow the learn-harness-engineering projects?"
    a: "A coding agent that can edit files, run commands and handle multi-step tasks, such as Claude Code, Codex or DeepSeek Harness. You can read the lectures without one, but not complete the projects."
  - q: "Is learn-harness-engineering available in Chinese?"
    a: "Yes. The course materials are translated into 15 languages, including Simplified Chinese, and PDF coursebooks are available."
---

## What does learn-harness-engineering do?

learn-harness-engineering is a free, project-based course on harness engineering: the system of instructions, tools, environment, state and feedback that makes a coding agent reliable. It ships with a DSH-friendly agent skill and an audit script, and includes a full breakdown of how DeepSeek Harness itself is designed.

The course starts from a simple observation: even the strongest model fails real engineering tasks without a proper environment around it. Over 14 lectures it explains what that environment needs, and over 8 projects you apply each idea to the same Electron app with a real coding agent, from instructions and verification to automated loops and graph orchestration.

For DSH users and plugin authors, the most direct value is the DeepSeek design breakdown, which covers the "everything is a plugin" architecture, capability seams and the event pipeline, plus the `harness-creator` skill that scaffolds a harness for your own repository.

## learn-harness-engineering core features

- **Lectures**: 14 conceptual units, each answering one core question about agent reliability.
- **Projects**: 8 hands-on projects, including goal, timer and maker-checker loops, and a graph with parallel branches, conditional rollback and a human-approval node.
- **Five-subsystem framework**: instructions, tools, environment, state and feedback as a checklist for any harness.
- **Harness design breakdowns**: how DeepSeek, Pi, Claude Code and Codex structure their harnesses.
- **harness-creator skill**: an agent skill that scaffolds a production-grade harness for your project.
- **audit-harness.sh**: a zero-dependency shell script that checks a repository against all five subsystems.
- **15 languages**: full translations, including Simplified Chinese, plus PDF coursebooks.

## How to install and use learn-harness-engineering

1. Open the course and pick your language from the repository README, or preview it locally:

   ```bash
   npm install
   npm run docs:dev
   ```

2. For DSH-specific study, read `docs/en/harness-designs/deepseek/index.md`.
3. To use the skill in DeepSeek Harness, copy `skills/harness-creator` into `~/.dsh/skills/` and restart DSH, then ask the agent to scaffold a harness for your project.
4. Audit an existing repository without installing anything:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/walkinglabs/learn-harness-engineering/main/tools/audit-harness.sh | bash -s -- /path/to/your/repo
   ```

5. Work through the projects with your coding agent, allowing it to edit files and run commands.

## How to troubleshoot learn-harness-engineering

- **DSH does not pick up the harness-creator skill.** Make sure the folder sits directly under `~/.dsh/skills/` with its `SKILL.md` at the top level, then restart DSH.
- **The audit script reports failures.** It exits non-zero when a critical item is missing. Each item maps to a lecture between L03 and L12; read the matching lecture to see what to add.
- **The local docs site will not start.** The viewer uses VitePress; run `npm install` first and use a current Node.js version.
- **You cannot finish a project.** The projects assume an agent that can edit files and run commands. Grant those permissions, or switch to a tool that supports multi-step tasks.

Report course errors or translation issues on the project's GitHub repository.
