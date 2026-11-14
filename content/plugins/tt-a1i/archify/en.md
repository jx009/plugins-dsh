---
title: "archify: Interactive Diagrams for DSH Agents"
description: "archify is a DSH plugin that turns a description, plan or repo into an interactive HTML diagram. Learn how to install it, refine diagrams and fix load issues."
summary: "Describe a system or point your agent at a repository, and archify returns a self-contained HTML diagram you can explore, refine in chat and export as an image."
highlights:
  - "Ten diagram types, from ERD to sequence"
  - "Single-file interactive HTML output"
  - "Schema and layout checks before delivery"
  - "Git-pinned source links on nodes"
  - "PNG, WebP and JPG export"
faq:
  - q: "How do I install archify in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0`, replacing `web` with your own profile name. The package is a community integration that bundles Archify Skill 3.2.0; it is not an official DeepSeek product."
  - q: "Which DSH version does the archify plugin support?"
    a: "Version 1.1.0 of the integration targets the developer preview `@deepseek-ai/dsh@0.2.1-rc.2` on Node.js `^22.19.0` or `>=24.0.0`. The README says compatibility with other DSH versions is not guaranteed."
  - q: "Why does DSH still load an old archify version after I upgraded?"
    a: "Personal and project Skill folders outrank the bundled copy, so an older `archify` Skill you installed yourself can shadow the plugin. Check which source path the loaded Skill comes from, then update or remove that copy yourself."
  - q: "Can archify convert my existing Mermaid diagrams?"
    a: "No. The README lists automatic Mermaid parsing, general-purpose auto-layout, hosted sharing and WYSIWYG editing as outside the current scope."
  - q: "How do I change an archify diagram after it is generated?"
    a: "Keep talking to the agent with focused requests such as \"add Redis\", \"move auth to the left\" or \"highlight the rollback path\". archify keeps the typed source, so the agent edits the same diagram instead of starting over."
  - q: "Does the archify plugin send my code or prompts anywhere?"
    a: "The DSH adapter makes no network requests and has no telemetry. The bundled Skill has an optional update reminder that only fetches a fixed manifest, and you can turn it off with `ARCHIFY_UPDATE_CHECK_DISABLED=1`."
---

## What does archify do?

archify is a DSH plugin that lets your coding agent draw technical diagrams. You give it a short description, a design plan or a whole repository, and it hands back a single HTML file containing an interactive diagram you can open in any browser.

The agent does not write that page freehand. It first produces a typed JSON description of the diagram, and validators bundled with the skill check the schema, layout and routes. Only when every check passes does the new file replace the last good one, so a broken render never overwrites a working diagram.

archify started as a general agent skill for Cursor, Claude Code, Codex CLI and OpenCode. DeepSeek Harness support comes from a separate, opt-in community package, `@tt-a1i/archify-dsh`, which bundles the same skill for DSH profiles.

## archify core features

- **Ten diagram types**: Architecture, Workflow, Sequence, Data Flow, Lifecycle, ERD, Class, Tree, Timeline and Waterfall, so the same tool covers system design, database schemas and release timelines.
- **Validation before delivery**: schema, layout, HTML/SVG and route checks all have to pass before the agent hands over the file.
- **Interactive viewer**: focus a node, see what is upstream and downstream of it, trace a single route or compare roles. Everything is driven by the nodes and relationships the agent wrote, not by guesswork.
- **Source evidence**: on request, nodes in an architecture diagram link to Git-verified files and line ranges pinned to one commit, which makes the diagram useful in code review.
- **Portable output**: the result is one HTML file. You can export it as PNG, WebP or JPG, or share a link that opens a specific view.
- **Localized interface**: the viewer ships in English, Simplified and Traditional Chinese, Spanish, Korean and Arabic.

## How to install and use archify

1. Add the community package to your DSH profile. Replace `web` with the profile you actually use:

   ```bash
   dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0
   ```

2. Restart that profile so DSH picks up the new skill provider, named `archify-plugin`.
3. Ask for a diagram from a plain description. No repository is required:

   ```text
   Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.
   ```

4. Or open a project and ask archify to map it:

   ```text
   Use the archify skill to map this repository's runtime architecture.
   ```

5. Refine the result in the same conversation, for example "add authentication", "highlight the cache-miss path" or "switch to the light theme".

To remove the plugin later, run `dsh plugin --profile web remove @tt-a1i/archify-dsh`. Outside DSH, Cursor, Claude Code, Codex and OpenCode users can install the skill by asking their agent to read `https://raw.githubusercontent.com/tt-a1i/archify/main/llms.txt`.

## How to troubleshoot archify

- **The agent cannot find the skill.** Check that you installed the package into the profile you are running, then restart that profile. The integration is a skill-only bundle, so it adds no new buttons or panels; you invoke it by asking for an archify diagram.
- **An old archify version keeps loading.** Personal and project Skill folders take priority over the bundled snapshot. If you once installed `archify` by hand, that copy can shadow the plugin even after an upgrade. Look up the source path of the loaded skill first, then decide yourself whether to update or delete the old copy.
- **Your other skills disappeared after installing.** This happened with integration version 1.0.0, which disabled the host's default skill folders. Version 1.1.0 fixes it, so upgrade to `@tt-a1i/archify-dsh@1.1.0`.
- **Installation fails or the plugin will not start.** Version 1.1.0 targets the DSH developer preview `0.2.1-rc.2` and Node.js `^22.19.0` or `>=24.0.0`. Check both versions before filing an issue.
- **You want no network access at all.** The adapter itself makes no requests. Set `ARCHIFY_UPDATE_CHECK_DISABLED=1` to stop the skill's optional update reminder as well.

When you report a problem, include the plugin version, your DSH version and the source path of the loaded skill.
