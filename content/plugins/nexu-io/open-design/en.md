---
title: "Create and refine designs with your team and coding agents"
description: "OpenDesign connects coding agents, including DSH, to a collaborative workspace for prototypes, design systems, slides, images, and motion graphics."
summary: "A local-first design workspace with native DeepSeek Harness runtime support. Build prototypes and visual assets, gather team feedback, and iterate in the same project."
highlights:
  - "Native DSH runtime integration through the official `dsh` CLI"
  - "Structured streaming, model discovery, cancellation, and session resume for DSH"
  - "Interactive web prototypes with live preview alongside agent conversations"
  - "Workflows for slides, generated images, and motion graphics with MP4 export"
  - "Adaptable skills, templates, design systems, and plugins under Apache-2.0"
faq:
  - q: "How does OpenDesign integrate with DSH?"
    a: "OpenDesign can launch DSH through a native runtime adapter using the official `dsh` CLI. The README lists structured streaming, model discovery, cancellation, and session resume as supported capabilities."
  - q: "What can I create in the workspace?"
    a: "The documented Studio workflows cover interactive web prototypes, slide decks, generated images, and motion graphics. Prototypes have live preview, and HyperFrames can export motion graphics to MP4."
  - q: "Is there a DSH plugin installation command?"
    a: "The supplied README excerpt does not include one, and the repository information does not identify an npm package. No DSH plugin installation command is provided here."
---

## What does OpenDesign do?

OpenDesign provides a local-first workspace where teams and coding agents turn briefs into designs and refine them through feedback. Projects can include prototypes, design systems, and media assets.

For DSH users, the documented connection is a native runtime adapter built around the official `dsh` CLI. OpenDesign also provides skills, CLI access, and MCP for agents that use its capabilities.

## Core features

- Run DSH with structured streaming, model discovery, cancellation, and session resume.
- Build interactive web prototypes with agent conversations and live preview in Studio.
- Create presentations, review speaker notes, and export decks.
- Generate images from conversations and inspect or download the results.
- Create motion graphics with HyperFrames and export them to MP4.

Teams can inspect and adapt the project's skills, design templates, design systems, and plugins. The repository uses the Apache-2.0 license.

## How to use OpenDesign

Start from a brief or an example on the Home page. Use a coding agent or OpenDesign Cloud to develop a prototype guided by your design system, then share the work with teammates and use their feedback for further revisions.

Use Studio to preview and refine the output. The Design Systems page exposes brand assets for review, while the Plugins page lets you discover skills and launch them with `Try it`.

DSH runs through the official `dsh` CLI integration. The supplied README excerpt does not specify a DSH installation command or the full runtime setup procedure.
