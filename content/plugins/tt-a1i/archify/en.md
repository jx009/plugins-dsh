---
title: "archify: interactive diagrams from your agent"
description: "archify is an agent skill that turns a description, plan or repository into one interactive HTML diagram, with ten diagram types and built-in validation."
summary: "Describe a system or point your agent at a repository, and archify returns a self-contained HTML diagram you can explore, refine in chat and export as an image."
highlights:
  - "Ten diagram types"
  - "Single-file HTML output"
  - "Validated before delivery"
  - "Git-pinned source links"
  - "PNG, WebP, JPG export"
faq:
  - q: "Is archify a DSH-only plugin?"
    a: "No. It is an agent skill for Cursor, Claude Code, Codex CLI and OpenCode. DeepSeek Harness support comes through a separate community integration package, which the README says is not an official DeepSeek product."
  - q: "Can archify convert my existing Mermaid diagrams?"
    a: "No. The README lists automatic Mermaid parsing, general-purpose auto-layout, hosted sharing and WYSIWYG editing as intentionally outside the current scope."
  - q: "How do I change a diagram after it is generated?"
    a: "Keep talking to the agent with focused requests such as add Redis, move auth to the left or highlight the rollback path. Archify keeps the typed source so the agent can edit the same diagram."
---

## What does archify do?

archify is a skill that has your coding agent draw technical diagrams. You give it a description, a plan or a repository, and it returns a single HTML file containing an interactive diagram.

The agent does not write the page freehand. It produces a typed JSON description of the diagram, and bundled validators check schema, layout and routes before the file is delivered. The viewer inside the file lets a reader focus a node, follow upstream and downstream paths, trace a route and switch themes.

archify is a general agent skill, not a DSH-specific plugin. Its main targets are Cursor, Claude Code, Codex CLI and OpenCode; DeepSeek Harness is supported through an opt-in community integration.

## Core features

- **Ten diagram types**: Architecture, Workflow, Sequence, Data Flow, Lifecycle, ERD, Class, Tree, Timeline and Waterfall.
- **Validation before delivery**: schema, layout, HTML/SVG and route checks must all pass before a new file replaces the last good one.
- **Interactive viewer**: node focus, upstream and downstream reach, route tracing and role comparison, all based on the nodes and relationships the agent authored.
- **Source evidence**: on request, Architecture nodes link to Git-verified files and line ranges pinned to one commit.
- **Portable output**: one HTML file, with image export and shareable links to a specific view.
- **Localized interface**: English, Simplified and Traditional Chinese, Spanish, Korean and Arabic are bundled.

## How to use archify

1. In Cursor, Claude Code, Codex or OpenCode, send your agent this message and let it install the skill:

   ```text
   Install Archify for me by reading https://raw.githubusercontent.com/tt-a1i/archify/main/llms.txt
   ```

2. In DeepSeek Harness, add the community integration package named in the README instead:

   ```bash
   dsh plugin --profile web add @tt-a1i/archify-dsh@1.1.0
   ```

3. Ask for a diagram from a description:

   ```text
   Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.
   ```

4. Or open a repository and ask the skill to map it:

   ```text
   Use the archify skill to map this repository's runtime architecture.
   ```

5. Refine the result in chat until it reads the way you want.

The README describes the DSH integration as built for the developer-preview release `@deepseek-ai/dsh@0.2.1-rc.2`, with Node `^22.19.0` or `>=24.0.0`.
