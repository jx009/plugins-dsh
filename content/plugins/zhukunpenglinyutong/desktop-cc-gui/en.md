---
title: "desktop-cc-gui: Desktop GUI for DSH"
description: "desktop-cc-gui is a desktop GUI for DSH and other coding engines. Learn setup basics, session controls, and how to troubleshoot missing features."
summary: "Use DeepSeek Harness, Claude Code, Codex CLI, and other coding engines in one desktop interface. Follow streaming responses, resume sessions, and view tool calls without working solely in a terminal."
highlights:
  - "Multi-engine desktop interface"
  - "Streaming output and tool calls"
  - "Session history and resume"
  - "Model picker and image attachments"
  - "DSH sub-agent display"
faq:
  - q: "How do I install desktop-cc-gui for DeepSeek Harness?"
    a: "The supplied README excerpt identifies it as a desktop application but does not include installation commands. No npm package name is confirmed, so a DSH plugin installation command cannot be provided."
  - q: "Does desktop-cc-gui support Windows and Linux?"
    a: "Yes. The README lists macOS, Windows, and Linux as supported platforms, using a Tauri-based desktop application."
  - q: "Can desktop-cc-gui resume DSH sessions?"
    a: "Yes, the compatibility matrix marks session history and resume as supported for DSH. Session renaming, stopping a response, and message queues are also supported."
  - q: "Which DSH permission modes does desktop-cc-gui support?"
    a: "The matrix lists auto mode only for DSH. It does not list manual, plan, or bypass modes for this engine."
  - q: "Does desktop-cc-gui support DSH skills and provider switching?"
    a: "Both the slash-command and skills picker and provider/channel switching are marked as partially supported. CC Switch import is marked unsupported for DSH."
---

## What does desktop-cc-gui do?

 desktop-cc-gui is a desktop graphical client that brings DeepSeek Harness and other command-line coding engines into one interface. It helps developers work on projects through chat while watching generated output and tool activity. For users searching for a DSH plugin, its role is a desktop integration; the supplied repository information does not identify an installable harness plugin package.

The application also supports Claude Code, Codex CLI, OpenCode, and several other engines. Its Rust backend uses dedicated protocol adapters to handle streaming events, session history, and provider channels. The interface receives structured engine activity rather than reconstructing it from terminal screen contents.

Built with Tauri 2, React 18, TypeScript, and Rust, the client runs on macOS, Windows, and Linux. Settings and application state are stored locally. Content sent to an AI provider follows the channel configured for the relevant CLI.

## desktop-cc-gui core features

- **Streaming output and tool visibility:** Watch responses arrive incrementally and inspect tool calls and thinking traces as they are exposed. Usage information appears when the engine reports it; the DSH column also lists context-window support.
- **Session history and resume:** Return to previous conversations and rename sessions. DSH supports stopping a response and queuing messages, giving you controls for ongoing work as well as past conversations.
- **Models and project context:** DSH supports the model picker, image attachments, and `@` file mentions. These provide ways to choose a model and supply project context through the interface.
- **Sub-agent display:** The DSH adapter supports the dispatch panel for displaying sub-agent activity. The matrix separately marks team-mode orchestration as unsupported, so these are distinct capabilities.
- **Native session commands:** DSH supports `/new` for a new session and `/clear` for clearing context. The matrix marks `/compact`, the slash-command and skills picker, and provider/channel switching as partial support.

## How to install and use desktop-cc-gui

The provided README excerpt contains no installation command, and the repository information supplies no confirmed npm package name. Installation instructions therefore need to come from the complete project documentation; there is no verified `dsh plugin` command to reproduce here.

Once the desktop application and your chosen runtime are available, use the following workflow supported by the README:

1. Open ccgui and choose the project you want to work on. Select DSH as the coding engine for that work.
2. Check the provider channel configured for the CLI. The excerpt explains that this channel determines how content reaches the provider, but does not document a specific configuration file or settings path.
3. Choose a model using the model picker. Add file context with `@` mentions or attach an image when needed.
4. Send a coding request, such as investigating a bug or changing project code. Follow streaming output and tool activity, and use Stop if you need to interrupt the response.
5. Resume the conversation from session history for follow-up work. Use `/new` to start another session or `/clear` when you want to clear the current context.

## How to troubleshoot desktop-cc-gui

Check the DSH compatibility column before treating a missing control as an error. Only auto permission mode is listed. Reasoning-effort controls, Todo rendering, team mode, fast mode, CC Switch import, and the native `/mcp` command are not supported for this engine.

For incomplete skills discovery, provider switching, or context compaction, note that those features have partial support. The excerpt provides no specific error codes or repair commands. General checks are to confirm the selected engine and intended DSH profile, restart the application and runtime, and inspect their versions and available logs. Include the action that failed and the relevant log output when investigating further.
