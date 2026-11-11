---
title: "huashu-design: HTML-native design skill for agents"
description: "huashu-design is an agent skill that turns one prompt into HTML prototypes, slide decks with editable PPTX, motion clips and infographics in 92 styles."
summary: "A design skill for Claude Code, Cursor, Codex and DSH. It sketches six directions, builds the three strongest, and delivers HTML, MP4, GIF, editable PPTX or PDF."
highlights:
  - "92 styles with specimens"
  - "Editable PPTX export"
  - "Design direction advisor"
  - "Six-dimension critique"
  - "Local taste records"
faq:
  - q: "Does huashu-design only run in DeepSeek Harness?"
    a: "No. It is a general markdown skill that the README says drops into Claude Code, Cursor, Trae, Hermes, OpenClaw and similar agents. The same repository also installs as a DSH plugin."
  - q: "The skill's prompts are in Chinese. Can I give it English tasks?"
    a: "Yes. The README notes that SKILL.md and the reference files are written in Chinese, but the agent is bilingual and works with English tasks."
  - q: "What is outside its scope?"
    a: "There is no layer-editable PPTX-to-Figma round trip, and 3D, physics simulation and particle systems are out of scope. The README also says quality drops when a brand has to be designed from nothing."
---

## What does huashu-design do?

huashu-design is a skill that lets a coding agent act as a designer. You describe what you need in a sentence, and the agent produces the deliverable as HTML first, then exports it to other formats where needed.

It covers clickable App and Web prototypes, slide decks, motion design, infographics and Xiaohongshu image sets. Because the output is built in HTML, there is no canvas or panel to operate: you talk to the agent, review what it shows, and ask for changes. The README gives typical times of 3 to 30 minutes depending on the task.

The skill is not tied to DeepSeek Harness. It is a general agent skill, and DSH is one of the hosts it can be installed into.

## Core features

- **Prototypes**: single-file HTML with an iPhone bezel, clickable screens and a Playwright check before delivery.
- **Slide decks**: an HTML deck for presenting in the browser plus an editable PPTX that keeps real text frames.
- **Motion design**: MP4 and GIF export with 60fps interpolation and background music.
- **Direction advisor**: when the brief is vague, it prepares six thumbnails from three lines of reasoning, turns three into full designs and keeps the rest as alternates.
- **Style library**: 92 HTML-native styles across web, deck, infographic, app, Chinese and East Asian, and Xiaohongshu sections, each with a specimen.
- **Brand asset protocol**: for branded work it asks for, searches, downloads and verifies logos, product shots and colors, then writes them to `brand-spec.md`.

## How to use huashu-design

1. In DeepSeek Harness, add the repository as a plugin and restart DSH. Use `web` in place of `desktop` for the web app:

   ```bash
   dsh plugin --profile desktop add github:alchaincyf/huashu-design
   ```

2. In other agents, install with the skills CLI:

   ```bash
   npx skills add alchaincyf/huashu-design
   ```

3. Check that the install path contains the `references/`, `assets/`, `scripts/` and `demos/` folders. If only SKILL.md is there, the README says to upgrade the CLI and reinstall:

   ```bash
   npm i -g skills@latest
   ```

4. Ask for a deliverable in plain language:

   ```
   Make a keynote for AI psychology. Give me 3 style directions to pick from.
   ```

Taste notes and the record of past looks are stored only in `~/.huashu-design/` on your machine; deleting that folder clears them.
