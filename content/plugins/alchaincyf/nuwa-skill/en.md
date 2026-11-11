---
title: "nuwa-skill: distill how a public figure thinks"
description: "nuwa-skill is an agent skill that researches a public figure and turns their mental models, decision rules and voice into a reusable skill for your agent."
summary: "Give Nuwa a name and it researches, extracts and blind-tests a person skill. It follows the open Agent Skills standard, so it is not limited to DSH."
highlights:
  - "Five-step distillation"
  - "Blind-test validation"
  - "Stated limits per skill"
  - "Works across agent runtimes"
faq:
  - q: "Is nuwa-skill only for DeepSeek Harness?"
    a: "No. It is a general skill built on the open Agent Skills standard and runs in Claude Code, Codex, Cursor, OpenClaw, Hermes Agent and other compatible runtimes. The same repository also installs as a DSH plugin."
  - q: "What files does a distilled person skill contain?"
    a: "A SKILL.md of at most 350 lines, a casebook at references/casebook.md, a quote bank at references/voice.md, and a FIDELITY.md that records the blind-test results."
  - q: "What can a person skill not do?"
    a: "The README lists three limits: it cannot capture intuition, it is a snapshot up to the research cutoff, and it rests only on public statements, which may differ from what the person really believes."
---

## What does nuwa-skill do?

nuwa-skill (女娲.skill) is a skill that builds other skills. You give your agent the name of a public figure, and Nuwa researches that person, extracts how they reason and packages the result as a "person skill" the agent can load later.

The goal is to capture a way of thinking, not to recite quotes. A finished skill describes the person's mental models, the rules of thumb they decide by, how they express themselves, what they refuse to do, and where the skill's own knowledge runs out.

Nuwa is not specific to DeepSeek Harness. It follows the open Agent Skills standard and runs in Claude Code, Codex, Cursor and other compatible agents; DSH is one of the supported hosts.

## Core features

- **Prior snapshot**: before any research, Nuwa writes down what the model already knows, then looks only for material that overturns, deepens or fills gaps in that picture.
- **Collect and seal**: gathers writings, interviews, social posts, critics' views, decision records and a life timeline. Some real decisions are sealed away as exam questions for the last step.
- **Extraction**: produces 5–8 characteristic moves, 3–7 mental models, decision heuristics, sourced case cards and at least two common misreadings.
- **Blind-test validation**: independent agents answer the same questions with and without the skill, and a judge grades them without knowing which is which. Results, losses included, go into FIDELITY.md.
- **Published examples**: the author has released 14 person skills and one topic skill as standalone installs, among them Paul Graham, Munger and Feynman.
- **Upgrades**: skills built with v1.x can be upgraded by asking the agent to "upgrade the X skill".

## How to use nuwa-skill

1. In DeepSeek Harness, add the repository as a plugin, then restart DSH:

   ```bash
   dsh plugin --profile web add github:alchaincyf/nuwa-skill
   ```

2. In other agents, install it with the skills CLI, which detects your runtime:

   ```bash
   npx skills add alchaincyf/nuwa-skill
   ```

3. Ask the agent to distill someone:

   ```
   Distill Paul Graham
   ```

4. Once the person skill exists, call it by name:

   ```
   Use Munger's perspective to analyze this investment decision
   ```

Person skills distilled inside DSH are written to the project's `.dsh/skills/` folder, where DSH loads them automatically.
