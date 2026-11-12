---
title: "Create and revise draw.io diagrams through chat"
description: "Turn prompts, sketches and documents into editable draw.io diagrams, revise selected shapes, track AI changes and access diagram tools through MCP."
summary: "Generate editable draw.io diagrams from text, images or documents. Use chat and canvas editing together, with version history and an MCP server for AI agents."
highlights:
  - "Generate architecture diagrams, flowcharts and sequence diagrams with cloud and Kubernetes icon libraries."
  - "Convert screenshots, sketches, PDFs, Markdown and code into diagrams."
  - "Target selected shapes with chat instructions and compare, restore or undo AI revisions."
  - "Export diagrams as .drawio, .png, .svg or .drawio.svg."
  - "Use the web app, Windows/macOS/Linux desktop app or MCP server."
faq:
  - q: "Can I edit the generated diagrams manually?"
    a: "Yes. The output remains an editable draw.io diagram. You can rename and move shapes, adjust styles, work with multiple pages, or select shapes for a focused AI edit."
  - q: "How do AI agents access the diagram tools?"
    a: "The project provides an MCP server. The README configures it with npx and the package argument @next-ai-drawio/mcp-server@latest. The supplied excerpt does not include a DSH plugin installation command."
  - q: "Can I use my own model provider?"
    a: "The app lists 25 providers and an OpenAI-compatible preset for other endpoints. In the online demo, you can enter a provider and API key in chat settings to lift the demo usage limit. The README says the key is kept in the browser rather than stored on the server."
---

## What does next-ai-draw-io do?

next-ai-draw-io turns natural-language requests into diagrams on a draw.io canvas. It supports architecture diagrams, flowcharts, sequence diagrams and other diagram types. Screenshots, sketches and uploaded documents can also serve as input.

The project offers a web app, desktop installers for Windows, macOS and Linux, and an MCP server that exposes diagram capabilities to AI agents.

## Core features

- Generate diagrams using built-in AWS, Azure, GCP and Kubernetes icons.
- Combine manual canvas editing with chat requests, including changes restricted to selected shapes.
- See AI edits stream onto the canvas with changed shapes highlighted.
- Review AI changes as versions with thumbnails, then compare, restore or undo them.
- Work with multiple pages and export `.drawio`, `.png`, `.svg` or `.drawio.svg` files.

The app supports 25 model providers, an OpenAI-compatible endpoint preset, dark mode, and interfaces in English, Simplified Chinese, Traditional Chinese and Japanese.

## How to use next-ai-draw-io

Open the online demo or download a desktop installer from the repository's releases. Describe the diagram you want, or upload source material. Refine the result through chat or by editing the canvas, then export it in the format you need.

For agent access, configure an MCP client to launch `npx` with `@next-ai-drawio/mcp-server@latest` as its argument. The README names clients including Claude Desktop, Cursor and VS Code. The supplied excerpt provides no DSH-specific installation command.
