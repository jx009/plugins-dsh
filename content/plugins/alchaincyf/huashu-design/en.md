---
title: "huashu-design: AI Design Skill for DSH"
description: "huashu-design is a DSH plugin that turns one prompt into HTML prototypes, editable PPTX decks, motion clips and infographics. Learn how to install and fix it."
summary: "A design skill for Claude Code, Cursor, Codex and DSH. It sketches six directions, builds the three strongest, and delivers HTML, MP4, GIF, editable PPTX or PDF."
highlights:
  - "Clickable iOS and web prototypes"
  - "HTML slides with editable PPTX"
  - "MP4 and GIF motion export"
  - "Design direction advisor"
  - "Six-dimension design critique"
faq:
  - q: "How do I install huashu-design in DeepSeek Harness?"
    a: "Run `dsh plugin --profile desktop add github:alchaincyf/huashu-design`, using `web` instead of `desktop` for the web app. In the desktop app you can also paste the GitHub URL under Plugins → Add plugin."
  - q: "Why does huashu-design not appear after I install it in DSH?"
    a: "The README says the desktop app must have been opened once and then fully quit before a command-line install. Install with DSH closed, then reopen it so the plugin loads."
  - q: "Can huashu-design export an editable PowerPoint file?"
    a: "Yes. Slide decks come as an HTML presentation plus a PPTX that keeps real text frames. The DSH desktop app builds the PPTX with its bundled Python, and PDF export uses the Chrome or Edge already on your computer."
  - q: "The skill's prompts are in Chinese. Can huashu-design handle English tasks?"
    a: "Yes. SKILL.md and the reference files are written in Chinese, but the README says the agent is bilingual and works with English requests."
  - q: "Does huashu-design upload my designs or need an API key?"
    a: "No. Design, rendering and MP4, PDF and PPTX export run locally with no key and no telemetry. Optional cloud features such as text-to-speech live in `scripts/cloud/`, use your own key and ask for confirmation first."
  - q: "What can huashu-design not do?"
    a: "It cannot round-trip a layer-editable PPTX into Figma, and 3D, physics and particle animation are out of scope. The README also warns that quality drops when a brand has to be invented from nothing."
---

## What does huashu-design do?

huashu-design is a DSH plugin that turns your coding agent into a designer. You describe the deliverable in one sentence, and the agent builds it in HTML first, then exports it to the formats you need: clickable prototypes, slide decks, motion clips, infographics or social image sets.

There is no canvas, panel or Figma plugin to operate. You talk to the agent, review what it shows you and ask for changes. The README puts typical jobs at 3 to 30 minutes depending on the format. When a brief is vague, the skill sketches several visual directions before committing, so you choose a look instead of accepting the first attempt.

The skill works in Claude Code, Codex, Cursor and other agents that support skills. The same repository also installs directly as a DeepSeek Harness plugin.

## huashu-design core features

- **Interactive prototypes**: single-file HTML wrapped in an iPhone bezel, with screens you can actually click through and a Playwright check before delivery.
- **Slides with editable PPTX**: an HTML deck for presenting in the browser, plus a PowerPoint file that keeps real text frames you can edit.
- **Motion design**: MP4 and GIF export with 60fps interpolation and optional background music.
- **Design direction advisor**: for open-ended briefs it prepares six thumbnails from three lines of reasoning, builds three into full designs and keeps the rest as alternates.
- **Style library**: HTML-native styles for web, decks, infographics, apps, East Asian design and Xiaohongshu posts, each with a specimen page.
- **Brand asset protocol**: for branded work it asks for, searches, downloads and verifies logos, product shots and colors, then records them in `brand-spec.md`.
- **Six-dimension critique**: ask it to review an existing design and it scores the work across six dimensions with concrete fixes.

## How to install and use huashu-design

1. Open the DSH desktop app once, then quit it completely.
2. Add the plugin from a terminal. Use `web` in place of `desktop` for the browser version:

   ```bash
   dsh plugin --profile desktop add github:alchaincyf/huashu-design
   ```

   In the desktop app you can instead paste the repository URL under Plugins → Add plugin.

3. Reopen DSH so the plugin loads.
4. Ask for a deliverable in plain language:

   ```text
   Make a keynote on AI psychology and give me 3 style directions to pick from.
   ```

5. Iterate in the same chat: "make the cover darker", "export MP4 and GIF", or "run a six-dimension review of this design".

Outside DSH, install it as a regular skill with `npx skills add alchaincyf/huashu-design`. To remove the DSH plugin, run `dsh plugin --profile desktop remove huashu-design`.

## How to troubleshoot huashu-design

- **The plugin does not load after a command-line install.** DSH desktop must have been opened at least once and fully closed before you run `dsh plugin add`. Close it, install again, then reopen.
- **The skill works badly or misses templates outside DSH.** The skill needs its `references/`, `assets/`, `scripts/` and `demos/` folders. If the install folder only has `SKILL.md`, your `skills` CLI is older than 1.5.19. Run `npm i -g skills@latest` and reinstall, or fall back to `git clone` into your skills folder.
- **PDF export fails.** The export script borrows a Chrome or Edge browser installed on your computer. Install one of them and retry.
- **A cloud feature asks for a key.** Voice-over and AI video review are optional and live in `scripts/cloud/`. They only run with your own API key and an explicit `--yes` confirmation; the core design pipeline never needs a key.
- **You want to reset its taste memory.** Learned preferences and the record of past looks are stored only in `~/.huashu-design/`. Delete that folder to start fresh.

When reporting an issue, include your DSH version, the profile name and the exact export format that failed.
