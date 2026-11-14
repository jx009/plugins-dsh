---
title: "awesome-gpt-image-2: GPT Image Prompts for DSH"
description: "awesome-gpt-image-2 is a GPT Image prompt library with 530+ cases and a style skill DSH agents can load. Learn how to add the skill and write better prompts."
summary: "A library of image generation prompts, templates, and reusable skills for agent workflows. Its gallery supports prompt discovery, while a separate 2.5 section documents shared-prompt comparisons."
highlights:
  - "530+ image prompt cases with full prompts"
  - "20+ industrial prompt templates"
  - "GPT-Image2 style library agent skill"
  - "GPT Image 2.5 side-by-side comparisons"
  - "Searchable web gallery"
faq:
  - q: "How do I use awesome-gpt-image-2 in DeepSeek Harness?"
    a: "The repository ships an agent skill called `gpt-image-2-style-library`. The README gives no DSH-specific command; copy the skill folder from `agents/skills/` into your DSH skills folder, `~/.dsh/skills/`, then restart DSH."
  - q: "What does the awesome-gpt-image-2 style library skill do?"
    a: "It lets an agent choose GPT-Image2 styles, templates, categories and scene tags from the same data the website uses, then write a full prompt, for example an infographic prompt on a given topic."
  - q: "Does awesome-gpt-image-2 generate images itself?"
    a: "The repository is mainly prompts, templates and examples. The companion website offers generation testing after Google sign-in, and the GPT Image 2.5 section shows comparisons only, without live 2.5 generation."
  - q: "How many prompts does awesome-gpt-image-2 include?"
    a: "More than 530 cases with complete prompts and over 20 templates, split across two gallery pages and a separate templates guide with common pitfalls."
  - q: "How reliable are the awesome-gpt-image-2 2.5 comparisons?"
    a: "Each of the four comparisons reruns the full prompt of an existing gallery case without a reference image. The README notes that the original generation conditions and exact tool model IDs are not verified."
  - q: "Can I install the awesome-gpt-image-2 skill with npm?"
    a: "Yes. Run `npx gpt-image-2-style-library install all`, which writes the skill into the common local folders used by Codex and Claude Code. Restart the agent session afterwards."
---

## What does awesome-gpt-image-2 do?

awesome-gpt-image-2 is a GPT Image prompt library and agent skill that DSH users can load to write better image prompts. It collects more than 530 image generation cases, each with its full prompt and result, plus over 20 industrial templates that explain what works and what tends to fail.

The project treats prompts as code: cases are organized by style and scenario, templates are reusable, and the same data powers a browsable website gallery and an agent skill. The skill, `gpt-image-2-style-library`, lets an agent pick a matching style, template and scene tag before writing the prompt, instead of improvising from scratch.

A separate GPT Image 2.5 section reruns several gallery prompts on the newer model and shows the results next to the originals, so you can see how the same prompt behaves across versions.

## awesome-gpt-image-2 core features

- **Case gallery**: 530+ cases covering infographics, interface mockups, illustration, card sets, product breakdowns and more, each with a copyable prompt.
- **Prompt templates**: more than 20 industrial templates with notes on common pitfalls.
- **Style library skill**: an agent skill that reads the same style, category and scene data as the website and turns a short request into a structured prompt.
- **2.5 comparisons**: four documented recreations with a draggable divider, side-by-side view and the generation settings used.
- **Web gallery**: filter by style or scenario, open large previews and jump back to the source case on GitHub.

## How to install and use awesome-gpt-image-2

1. Get the skill files. The simplest way is the npm CLI:

   ```bash
   npx gpt-image-2-style-library install all
   ```

   This writes the skill into `~/.codex/skills`, `~/.claude/skills` and `~/.agents/skills`.

2. For DeepSeek Harness, copy the `gpt-image-2-style-library` folder from the repository's `agents/skills/` directory into `~/.dsh/skills/`, then restart DSH.
3. Ask the agent for a prompt:

   ```text
   Use gpt-image-2-style-library to create an infographic prompt about Codex.
   ```

4. Paste the generated prompt into your image tool, or browse the gallery for a close match and adapt its full prompt.

Claude Code users can also install it from the plugin marketplace with `/plugin marketplace add freestylefly/awesome-gpt-image-2`.

## How to troubleshoot awesome-gpt-image-2

- **The agent ignores the skill.** Check that the folder sits directly under your skills directory with `SKILL.md` at its top level, then start a new agent session; the README notes a restart is required after installing.
- **`install all` did not reach DSH.** The CLI targets Codex and Claude Code folders. Copy the skill into `~/.dsh/skills/` yourself.
- **Results differ from the gallery images.** The cases were generated under different conditions and tools, and the README marks original model IDs as unverified. Treat prompts as starting points and adjust style terms for your model.
- **The website asks you to sign in.** Browsing is open, but generation testing on the site requires Google sign-in.
- **Installing from GitHub Packages fails.** That registry needs `npm login --scope=@freestylefly --registry=https://npm.pkg.github.com` first; the public npm package `gpt-image-2-style-library` needs no login.

Images in the gallery come from various sources; check the repository's disclaimer before reusing them commercially.
