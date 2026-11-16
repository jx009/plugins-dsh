---
title: "xiaobai-kanban: Agent and Git Guide for DSH"
description: "xiaobai-kanban is a Chinese guide to DSH, coding agents and Git. Learn how to start, find plugin setup guides and clarify requirements."
summary: "A Chinese learning path for coding-agent beginners, covering requirements, CLI setup, Git workflows and DSH plugin discovery."
highlights:
  - "Coding agent basics"
  - "Requirements and acceptance criteria"
  - "CLI setup and Git workflows"
  - "DSH plugin discovery"
  - "Vibe coding review guidance"
faq:
  - q: "How do I install xiaobai-kanban in DeepSeek Harness?"
    a: "The repository is a tutorial resource, with no installation command for the guide itself in the supplied README. Read its learning path and follow the separate instructions for whichever tools you choose."
  - q: "Is xiaobai-kanban available in English?"
    a: "The supplied repository information describes a Chinese beginner guide. Its learning path and linked article titles are in Chinese; an English edition is not documented."
  - q: "Which DSH plugins does xiaobai-kanban recommend?"
    a: "It introduces dsh-plugin-install for conversational installation, dsh-plugin-marketplace for browsing in settings, and dsh-find-plugin for discovery. Other recommendations cover context management, messaging connections, token usage, screenshots and themes."
  - q: "Can xiaobai-kanban help me write better requirements?"
    a: "Its requirements lesson organizes requests around background, goals, scope and acceptance criteria. The README also points to a fill-in template and a self-check list."
  - q: "Does xiaobai-kanban teach Git and CLI setup?"
    a: "Yes, the learning path includes environment checks, Git installation, GitLab CLI, GitHub CLI and login configuration. It also introduces a Gitflow workflow for everyday development."
---

## What does xiaobai-kanban do?

xiaobai-kanban is a Chinese beginner guide to coding agents, CLI setup and Git workflows, with a learning path for DeepSeek Harness users. It helps people who can describe what they want but need guidance on turning that description into a development task. The repository is documentation rather than an installable DSH plugin.

The guide begins with identifying your agent and understanding its capabilities. It then moves through a first webpage exercise, clearer requests, tool installation and code delivery. Readers already comfortable generating code can continue into lessons on smaller iterations, reviewing results and dividing responsibilities between people and agents.

## xiaobai-kanban core features

- **Coding agent basics:** Introductory articles explain what an agent does and why you might use one. A glossary provides a reference for unfamiliar terms such as CLI, Git and Token.
- **Requirements and acceptance criteria:** A dedicated lesson uses background, goals, scope and acceptance criteria to structure requests. Templates and a self-check list help beginners make their expectations explicit.
- **CLI setup and Git workflows:** The learning path covers environment checks, Git, GitLab CLI, GitHub CLI and login configuration. It connects these tools to a daily Gitflow workflow rather than presenting installation as the final goal.
- **DSH plugin discovery:** The toolbox introduces plugins for installation, marketplace browsing and conversational search. It also lists options for context management, messaging, token usage, application screenshots and visual themes.
- **Vibe coding review:** Follow-up lessons address iteration size, reviewing generated work and maintaining human oversight. They give readers a route beyond repeatedly asking an agent to change code without a clear review process.

## How to install and use xiaobai-kanban

No DSH installation command or npm package for this guide is documented in the supplied material. Start with the repository README and its linked lessons; install individual tools using their own instructions.

1. Identify the agent you are using. Ask it to explain its name and role in everyday language, then request a simpler explanation if its answer is unclear.
2. Read `docs/what-is-agent.md` and try `docs/first-project.md`. These introduce the basic concepts and a small webpage exercise before moving into more tooling.
3. Use `docs/how-to-speak-to-agent.md` and `docs/how-to-write-requirements.md` to prepare a task. Specify its purpose, expected outcome, boundaries and how you will decide it is complete.
4. Follow the README sections for environment checks, CLI installation, login and Gitflow. Consult `docs/about-cli.md` to understand the role of each command-line tool before configuring it.
5. If you use DSH, review the toolbox recommendations. The guide points to `dsh-plugin-marketplace` for a marketplace in settings and `dsh-find-plugin` for finding plugins through conversation. Configuration belongs to the chosen tools; the guide does not document its own runtime settings.
6. Continue with `docs/vibe-coding-path.md` once you can complete basic coding tasks. For review guidance, the README specifically directs time-limited readers to `docs/vibe-coding-review.md`.

## How to troubleshoot xiaobai-kanban

If an explanation is confusing, ask your agent to restate it in simpler language and consult the glossary. For setup difficulties, return to the environment-check and login sections appropriate to the tool you are using. The supplied excerpt links to these sections but does not include their full commands or detailed fixes.

If a separately installed plugin does not appear in DSH, check the active profile, confirm that the plugin is enabled, restart the harness, and inspect its version and logs. These are general checks, not documented fixes for this tutorial. The README also recommends periodically checking plugin versions and links to help through `docs/about.md`.
