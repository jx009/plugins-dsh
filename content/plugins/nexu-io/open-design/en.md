---
title: "open-design: AI Design Workspace for DSH"
description: "open-design is an AI design workspace that runs DeepSeek Harness as a native agent to build prototypes, decks and motion. Learn to connect DSH and fix setup."
summary: "A local-first design workspace with native DeepSeek Harness runtime support. Build prototypes and visual assets, gather team feedback, and iterate in the same project."
highlights:
  - "Native DeepSeek Harness runtime"
  - "Interactive prototypes with live preview"
  - "Slide decks, images and MP4 motion"
  - "151 design systems and 100+ skills"
  - "Team feedback in one workspace"
faq:
  - q: "How do I connect open-design to DeepSeek Harness?"
    a: "Install the official `dsh` CLI first, then select DeepSeek Harness in OpenDesign or run `od agent setup deepseek-harness`, which installs or repairs OpenDesign's connection component."
  - q: "What does the open-design DSH integration support?"
    a: "DeepSeek Harness is a first-class native runtime. The README lists structured streaming, model discovery, cancellation and session resume through the official `dsh` CLI."
  - q: "What can I create with open-design?"
    a: "Interactive web, desktop and mobile prototypes, live dashboards, slide decks, generated images, and motion graphics exported to MP4 through HyperFrames."
  - q: "Does open-design run on Linux?"
    a: "There is no prebuilt Linux release yet. macOS and Windows have desktop downloads; on Linux, run OpenDesign from source or with Docker."
  - q: "Why does the `od` command not work on my Mac?"
    a: "macOS ships its own `/usr/bin/od` octal-dump tool, which can shadow OpenDesign's command. Desktop app users should copy the client snippet from Settings → MCP server, which uses absolute paths."
  - q: "Can I use open-design without installing a coding agent?"
    a: "Yes. A bring-your-own-key proxy supports Anthropic, OpenAI, Azure, Google and Ollama; paste a base URL, API key and model and it runs the same design loop."
---

## What does open-design do?

open-design (OpenDesign) is a local-first AI design workspace that can run DeepSeek Harness as its built-in agent. You and your team start from a brief, the agent turns it into prototypes, decks, images or motion graphics, and everyone refines the result through feedback inside the same project.

It connects to coding agents in two ways. Agents such as Claude Code, Codex and Cursor consume OpenDesign as a skill, CLI or MCP server. DeepSeek Harness goes further: OpenDesign launches it directly through the official `dsh` CLI as a native runtime, with streaming output, model discovery, cancellation and session resume.

The desktop app loads more than 100 functional skills, a separate catalog of rendering templates and 151 design systems, so the agent designs against real constraints rather than a blank page. The project is open source under Apache-2.0.

## open-design core features

- **Native DSH runtime**: OpenDesign drives DeepSeek Harness through the official `dsh` CLI, including structured streaming and resuming earlier sessions.
- **Prototypes**: interactive web, desktop and mobile prototypes with live preview next to the agent conversation.
- **Live artifacts and dashboards**: data views that update instead of static mockups.
- **Decks**: magazine-style decks, weekly updates and pitch decks with speaker notes and export.
- **Images and video**: image generation through `gpt-image-2`, ImageRouter or a custom API, and motion graphics with HyperFrames exported to MP4.
- **Design systems and plugins**: 151 design systems plus skills, templates and plugins you can inspect and adapt.

## How to install and use open-design

1. Download the desktop app for macOS or Windows from `open-design.ai` or the project's GitHub Releases. On Linux, run it from source or with Docker.
2. Install the official DeepSeek Harness `dsh` CLI so it is on your `PATH`. The app auto-detects agent CLIs on startup.
3. Select DeepSeek Harness as the agent in OpenDesign, or set it up from a terminal:

   ```bash
   od agent setup deepseek-harness
   ```

4. Type a brief on the Home page, for example "a landing page for a note-taking app", or start from an example.
5. Review the result in Studio, collect comments from teammates and ask the agent for the next revision.

To use OpenDesign inside another agent instead, run `od mcp install <agent>`, for example `od mcp install claude`, and add `--print` for a dry-run preview.

## How to troubleshoot open-design

- **DeepSeek Harness does not appear as an agent.** Make sure the `dsh` CLI is installed and on your `PATH`, then restart OpenDesign so it re-detects agents. Run `od agent setup deepseek-harness` to repair the connection component.
- **`od` prints octal output on macOS or WSL2.** The system `/usr/bin/od` is shadowing OpenDesign's command. Use the snippet from Settings → MCP server in the desktop app, or follow the WSL2 setup guide in the repository.
- **No Linux download is available.** Official releases do not include Linux builds yet. Run from source, or start the Docker image and open `http://127.0.0.1:7456`.
- **You have no agent CLI installed.** Use the bring-your-own-key proxy: enter a base URL, API key and model for a supported provider.
- **An MCP install went to the wrong client.** Remove it with `od mcp install <agent> --uninstall` and list supported clients with `od mcp install --help`.

When reporting an issue, include the OpenDesign version, your operating system, the agent runtime and the brief that failed.
