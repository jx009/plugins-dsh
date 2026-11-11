---
title: "answer-me-with-html: answers as one-page HTML"
description: "An agent skill that turns hard questions into a readable one-page HTML answer with diagrams and tables. Runs in DSH, Claude Code, Codex, Cursor and others."
summary: "The agent writes a short Markdown draft and a bundled CLI renders it into an HTML page with diagrams, tables and code. A general agent skill that also installs as a DSH plugin."
highlights:
  - "One-page HTML answers"
  - "Markdown-to-page CLI"
  - "Diagrams and tables"
  - "Explainer videos"
  - "Always-on mode"
faq:
  - q: "Why use this skill instead of asking the model to write HTML directly?"
    a: "With the skill, the model writes only a Markdown draft and the bundled CLI generates the SVG, CSS and markup. The author's benchmark reports an average of 612 output tokens against 4,893 for hand-written HTML on the same questions, and 12 seconds against 31."
  - q: "Does every question produce a page?"
    a: "No. The agent decides whether a page is worth it, for example for related concepts, multi-step flows or multi-way comparisons, and a one-line question still gets a one-line answer. An optional always-on mode adds a small page to every conclusion."
  - q: "Is answer-me-with-html only for DeepSeek Harness?"
    a: "No. It is a general agent skill. The README covers Claude Code, Codex, Cursor, OpenCode and other agents alongside the DSH plugin install, and describes it as usable in any agent that can run a shell command."
---

## What does answer-me-with-html do?

answer-me-with-html is an agent skill that answers complex questions with a single HTML page instead of a long block of chat text. The page can combine prose, tables, code and diagrams.

The division of labour is the main idea. The agent writes a short Markdown draft, then hands it to a CLI bundled with the skill, which produces the SVG diagrams, styling and markup. Because the model no longer writes coordinates and CSS by hand, it emits far fewer tokens; the author's benchmark puts the draft at about one eighth of the tokens of hand-written HTML for the same questions.

It is not specific to DSH. The same skill installs into Claude Code, Codex, Cursor, OpenCode and other agents, and the repository documents a DSH plugin install as well. The agent decides when a page is warranted: a question about how modules fit together gets a folder tree and a call graph, a "Redis or Memcached" question gets a comparison table, and a one-line question gets a one-line reply.

## Core features

- **Page generation**: Renders a Markdown draft into one HTML page, saved under `~/.answer-me-with-html/pages/`.
- **Diagram types**: Sequence and state diagrams, call graphs, folder trees, timelines and comparison tables, picked to suit the question.
- **Page controls**: Buttons switch the theme and light/dark mode, collect your reply, and copy the Markdown that produced the page.
- **Explainer videos**: On request, `am video` builds a narrated player page in which the diagram unfolds step by step.
- **Always-on mode**: Off by default. Once enabled through a rule in your agent's rules file, each conclusion comes with a small page of 2 to 4 panels.
- **Settings by command**: `am config` and the matching slash commands change options such as `open`, `theme`, `mode` and `scale`.

## How to use answer-me-with-html

1. Make sure Node.js 20 or newer is installed. There is no separate `npm install` step, because the CLI ships inside the skill.
2. For DeepSeek Harness, the README gives this command, run with the profile you use:

```bash
dsh plugin --profile web add github:QingYunA/answer-me-with-html
```

3. For other agents, use the skills installer, which asks which agents to install into:

```bash
npx skills add QingYunA/answer-me-with-html
```

4. Ask questions as usual, for example "Explain the TCP three-way handshake", or say "explain it in HTML" to request a page.
5. Change settings from the terminal when needed, for instance to stop pages from opening in the browser:

```bash
am config set open off
```
