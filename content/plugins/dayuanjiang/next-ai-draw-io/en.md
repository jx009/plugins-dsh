---
title: "next-ai-draw-io: AI draw.io Diagrams for DSH"
description: "next-ai-draw-io is an AI draw.io tool and MCP server for DSH agents that draws and edits diagrams from chat. Learn to connect it, pick a model and fix errors."
summary: "Generate editable draw.io diagrams from text, images or documents. Use chat and canvas editing together, with version history and an MCP server for AI agents."
highlights:
  - "Architecture, flowchart and sequence diagrams"
  - "AWS, Azure, GCP and Kubernetes icons"
  - "Edit selected shapes through chat"
  - "Version history with compare and undo"
  - "MCP server for coding agents"
faq:
  - q: "How do I use next-ai-draw-io in DeepSeek Harness?"
    a: "The project exposes its drawing tools as an MCP server. The README gives no DSH-specific command, so add it to DSH the way you add any MCP server, launching `npx` with `@next-ai-drawio/mcp-server@latest` as the argument."
  - q: "Which model works best with next-ai-draw-io?"
    a: "The README advises a capable model because the task is producing long, strictly formatted draw.io XML. Small models tend to return broken diagrams. DeepSeek is one of the 25 supported providers."
  - q: "Can I edit next-ai-draw-io diagrams by hand?"
    a: "Yes. The output is a normal draw.io diagram. You can move and restyle shapes, add pages, or select a few shapes and ask the AI to change only those."
  - q: "Where does the next-ai-draw-io MCP server save diagrams?"
    a: "It auto-saves to `~/.next-ai-drawio/`. The draw.io editor ships inside the package, so the browser preview works offline."
  - q: "Can I self-host next-ai-draw-io with my own API keys?"
    a: "Yes. Run it locally or with Docker, set the provider in environment variables, and optionally set `ADMIN_PASSWORD` to manage models, access codes and quotas from the `/admin` page."
  - q: "What file formats can next-ai-draw-io export?"
    a: "Diagrams export as `.drawio`, `.png`, `.svg` or `.drawio.svg`, and multi-page diagrams are supported."
---

## What does next-ai-draw-io do?

next-ai-draw-io is an AI diagram tool that draws on a real draw.io canvas, and DSH agents can use it through its MCP server. You describe a diagram in a sentence, or upload a screenshot, sketch or document, and the AI draws an editable draw.io diagram: architecture diagrams, flowcharts, sequence diagrams and more.

The result is not a static image. You can keep editing it by hand like any draw.io file, or select a few shapes and tell the AI what to change. Every AI edit becomes a version you can compare, restore or undo, so experimenting is safe.

The project comes in three forms: a hosted web demo, desktop apps for Windows, macOS and Linux, and an MCP server that lets coding agents draw diagrams from inside a conversation. The MCP server is what connects it to DeepSeek Harness and other agent tools.

## next-ai-draw-io core features

- **Many diagram types**: architecture diagrams, flowcharts, sequence diagrams and others, with built-in AWS, Azure, GCP and Kubernetes icon libraries.
- **Flexible input**: plain text, screenshots, hand sketches, PDFs, Markdown and source code can all be turned into diagrams.
- **Targeted edits**: select shapes on the canvas and ask the AI to change only those. AI changes stream onto the canvas with the touched shapes outlined.
- **Version history**: each AI change is saved with a thumbnail, and one Ctrl+Z takes it back.
- **MCP server**: the same drawing rules, icon libraries and canvas as the web app, plus a screenshot tool so the AI can look at the rendered diagram and fix it.
- **Model choice**: 25 providers including DeepSeek, OpenAI, Anthropic, Qwen and Ollama, plus an OpenAI-compatible preset for any other endpoint.
- **Export**: `.drawio`, `.png`, `.svg` and `.drawio.svg`, with multiple pages per file.

## How to install and use next-ai-draw-io

1. To use it from an agent, register the MCP server. The standard configuration is:

   ```json
   {
     "mcpServers": {
       "drawio": {
         "command": "npx",
         "args": ["@next-ai-drawio/mcp-server@latest"]
       }
     }
   }
   ```

   In DSH, add an MCP server with the same command and argument, then restart the profile.

2. Ask the agent for a diagram, for example "a flowchart of user authentication with login, MFA and session management". The diagram opens in your browser as it is drawn.
3. Refine it in chat or edit the canvas directly, then export the format you need.

Without an agent, open the online demo or download a desktop installer from the project's GitHub Releases. Claude Code users can also run `claude mcp add --scope user drawio -- npx @next-ai-drawio/mcp-server@latest`.

## How to troubleshoot next-ai-draw-io

- **The agent cannot see the drawing tools.** Check that the MCP entry uses `npx` with `@next-ai-drawio/mcp-server@latest`, that Node.js is installed so `npx` runs, and restart the DSH profile after adding the server.
- **Diagrams come out broken or incomplete.** The AI has to write long, strictly formatted draw.io XML. Switch to a more capable model; the README notes that small models often fail at this.
- **The online demo stops responding after a few requests.** The demo has a usage limit. Enter your own provider and API key in chat settings; the README says the key stays in your browser and is not stored on the server.
- **A self-hosted instance cannot reach the model.** Provider settings live in environment variables. Check the provider configuration guide in the repository's `docs/en/ai-providers.md`, and for several models use `AI_MODELS_CONFIG` or an `ai-models.json` file.
- **You lost a diagram.** The MCP server auto-saves into `~/.next-ai-drawio/`, and version history inside the editor lets you restore earlier AI revisions.

When reporting an issue, include the form you used (web, desktop or MCP), the model provider and the prompt that produced the broken diagram.
