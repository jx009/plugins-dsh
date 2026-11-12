---
title: "Learn to build and evaluate coding agent harnesses"
description: "Study coding agent harnesses through 14 lectures, 8 projects, and design breakdowns covering DeepSeek, state management, verification, loops, and graphs."
summary: "A project-based course on the systems around AI coding agents. Includes DeepSeek harness design analysis and exercises for automated loops and graph orchestration."
highlights:
  - "14 lectures and 8 projects on harness engineering"
  - "A five-subsystem framework covering instructions, tools, environment, state, and feedback"
  - "Design breakdowns of DeepSeek, Pi, Claude Code, and Codex"
  - "Practical exercises for goal loops, maker-checker loops, parallel execution, and rollback"
  - "Course materials available in 15 languages, including Simplified Chinese"
faq:
  - q: "Is this an installable DSH plugin?"
    a: "The supplied README describes a learning course and includes no DSH installation command. No npm package name was identified in the supplied repository information."
  - q: "What makes it relevant to DSH developers?"
    a: "The course includes a DeepSeek harness breakdown focused on plugin architecture, capability seams, and an event pipeline, alongside broader material on building agent harnesses."
  - q: "What do the loop and graph projects cover?"
    a: "Project 07 explores goal, timer, and maker-checker loops. Project 08 extends a maker-checker loop into a graph, then introduces parallel branches, conditional rollback, and a human-approval node."
---

## What does learn-harness-engineering do?

learn-harness-engineering teaches developers how to build the systems surrounding AI coding agents: their execution environment, state handling, verification, and control mechanisms. The repository presents 14 lectures and 8 projects under the MIT license.

For DSH developers, the course includes a DeepSeek harness design breakdown examining plugin architecture, capability seams, and an event pipeline.

## Core features

- Analyze harnesses through five subsystems: instructions, tools, environment, state, and feedback.
- Compare design approaches in DeepSeek, Pi, Claude Code, and Codex.
- Explore loop engineering through automations, worktrees, skills, connectors, sub-agents, and external state.
- Practice graph orchestration with nodes, edges, shared state, routing, parallel execution, and recovery.
- Read course materials in 15 languages, including English and Simplified Chinese.

## How to use learn-harness-engineering

Choose a language from the repository README and work through the lectures and accompanying projects. For DSH-specific architecture study, consult `docs/en/harness-designs/deepseek/index.md`.

To practice automation, use Project 07 to explore goal, timer, and maker-checker loops. Continue with Project 08 to represent a workflow as a graph and add parallel branches, conditional rollback, and human approval.

The supplied README does not provide a DSH installation command.
