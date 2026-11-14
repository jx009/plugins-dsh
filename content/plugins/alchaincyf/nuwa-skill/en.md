---
title: "nuwa-skill: Distill Thinkers into DSH Skills"
description: "nuwa-skill is a DSH plugin that studies a public figure and turns their mental models and decision rules into a reusable skill. Learn to install and use it."
summary: "Give Nuwa a name and it researches, extracts and blind-tests a person skill. It follows the open Agent Skills standard, so it is not limited to DSH."
highlights:
  - "Five-step distillation workflow"
  - "Blind-test validation per skill"
  - "Mental models and decision heuristics"
  - "Honest limits written into every skill"
  - "Works across agent runtimes"
faq:
  - q: "How do I install nuwa-skill in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add github:alchaincyf/nuwa-skill`, replacing `web` with your profile, then restart DSH. To remove it later, run `dsh plugin --profile web remove huashu-nuwa`."
  - q: "Where does nuwa-skill save the person skills it creates in DSH?"
    a: "Skills distilled inside DeepSeek Harness are written to the project's `.dsh/skills/` folder, and DSH loads them automatically from there."
  - q: "What files does a nuwa-skill person skill contain?"
    a: "A `SKILL.md` of at most 350 lines, a casebook at `references/casebook.md`, a quote bank at `references/voice.md`, and a `FIDELITY.md` that records the blind-test results, losses included."
  - q: "Is nuwa-skill only for DeepSeek Harness?"
    a: "No. It follows the open Agent Skills standard and runs in Claude Code, Codex, Cursor, OpenClaw, Hermes Agent and other compatible runtimes. DSH is one of the supported hosts."
  - q: "What can a nuwa-skill person skill not do?"
    a: "The README lists three limits: it cannot capture intuition, it is a snapshot up to the research date, and it rests only on public statements, which may differ from what the person privately believes."
  - q: "Can I use nuwa-skill in a runtime without skill support?"
    a: "Yes. `SKILL.md` is plain markdown with YAML front matter, so you can paste its contents into a conversation as reference material."
---

## What does nuwa-skill do?

nuwa-skill (女娲.skill) is a DSH plugin that builds other skills. You give your agent the name of a public figure, and Nuwa researches that person, extracts how they reason and packages the result as a "person skill" your agent can load whenever you want that perspective.

The aim is to capture a way of thinking, not to recite quotes. A finished person skill describes the figure's mental models, the rules of thumb they decide by, how they express themselves, what they refuse to do, and where the skill's own knowledge runs out. You can then ask "how would Munger look at this deal?" and get an answer grounded in documented reasoning.

Nuwa follows the open Agent Skills standard, so it also runs in Claude Code, Codex, Cursor and other compatible agents. DeepSeek Harness is one of the supported hosts and installs it as a regular plugin.

## nuwa-skill core features

- **Prior snapshot**: before researching, Nuwa writes down what the model already knows about the person, then looks only for material that overturns, deepens or fills gaps in that picture.
- **Collect and seal**: it gathers writings, interviews, posts, critics' views, decision records and a life timeline. Some real decisions are sealed away as exam questions for the final test.
- **Extraction**: each skill gets 5–8 characteristic moves, 3–7 mental models, decision heuristics, sourced case cards and at least two common misreadings of the person.
- **Blind-test validation**: independent agents answer the sealed questions with and without the skill, and a judge grades them without knowing which is which. Results go into `FIDELITY.md`, losses included.
- **Ready-made examples**: the author has published 14 person skills and one topic skill as standalone installs, including Paul Graham, Charlie Munger and Richard Feynman.
- **Upgrades**: skills built with v1.x can be brought up to date by asking the agent to "upgrade the X skill".

## How to install and use nuwa-skill

1. Add the plugin to your DSH profile. Replace `web` with the profile you use:

   ```bash
   dsh plugin --profile web add github:alchaincyf/nuwa-skill
   ```

2. Restart DSH so the plugin loads.
3. Ask the agent to distill someone:

   ```text
   Distill Paul Graham
   ```

4. When the person skill is ready, call it by name:

   ```text
   Use Munger's perspective to analyze this investment decision
   ```

Person skills created in DSH are saved to the project's `.dsh/skills/` folder and load automatically next time. In other agents, install with `npx skills add alchaincyf/nuwa-skill`, which detects your runtime, or clone the repository into the runtime's skills folder; for DSH that folder is `~/.dsh/skills/nuwa-skill/`.

## How to troubleshoot nuwa-skill

- **The agent does not respond to "distill X".** Confirm the plugin is installed in the profile you are running and that you restarted DSH afterwards. If you installed manually, check that the folder sits at `~/.dsh/skills/nuwa-skill/` with `SKILL.md` at its top level.
- **A new person skill is not available in the next session.** In DSH, distilled skills are written to the current project's `.dsh/skills/`. Open the same project again, or copy the folder into your personal skills directory if you want it everywhere.
- **The remove command says the plugin is not found.** The plugin is registered as `huashu-nuwa`, not `nuwa-skill`. Use `dsh plugin --profile web remove huashu-nuwa`.
- **An older person skill feels outdated.** Skills built with v1.x lack the newer structure. Ask the agent to "upgrade the X skill" to regenerate it.
- **Results feel generic.** A person skill is only as good as the public material behind it. Figures with few interviews or writings produce thinner skills, and `FIDELITY.md` shows how the skill scored in blind tests.

When reporting a problem, include your DSH version, the plugin install path and the person you tried to distill.
