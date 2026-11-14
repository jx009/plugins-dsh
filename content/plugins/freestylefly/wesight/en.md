---
title: "wesight: Agent Workspace for DSH Users"
description: "wesight is a desktop workspace for local AI agents and model routing. Learn how to install it, configure engines, and check runtime issues."
summary: "Manage local coding agents, model providers, file changes, and runtime metrics from one desktop workspace. Reuse existing CLI configurations or set up supported engines through the interface."
highlights:
  - "Claude Code and Codex setup"
  - "Custom OpenAI-compatible model routing"
  - "Feishu messaging through IM Agent Hub"
  - "SkillHub local skill management"
  - "Token usage, TTFT, and TPS monitoring"
faq:
  - q: "How do I install wesight on macOS or Windows?"
    a: "Choose the appropriate desktop build from the repository's latest release. The README lists signed and notarized macOS builds for Apple Silicon and Intel, plus a Windows x64 installer."
  - q: "Can wesight reuse my existing Claude Code or Codex configuration?"
    a: "Yes, it supports using existing local CLI accounts and configuration. Its macOS setup interface can also detect installed CLIs or install supported ones."
  - q: "Does wesight support Ollama and custom model endpoints?"
    a: "Yes, its unified provider configuration includes Ollama and custom OpenAI-compatible endpoints. The listed providers also include OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and OpenRouter."
  - q: "Which agents can wesight connect to Feishu?"
    a: "The IM Agent Hub routes Feishu messages to OpenClaw, Hermes Agent, Claude Code, or Codex. Bot profiles are configured separately for each engine."
  - q: "What performance metrics does wesight show?"
    a: "The runtime dashboard includes token usage, TTFT, output-phase TPS, estimated model TPS, and tool latency. It also records engine, model, status, completion time, and agent steps."
---

## What does wesight do?

wesight is an open-source desktop workspace for running local AI agents and managing their model providers. It helps developers bring agent setup, chat, tool execution, file changes, and runtime monitoring into a shared interface. The repository includes DeepSeek Harness ecosystem topics, but the supplied README describes a standalone desktop application rather than a documented DSH plugin package.

For users exploring a wesight desktop agent workspace, the main benefit is a graphical surface around local coding tools. Supported engines include Claude Code, Codex, Kimi Code, OpenClaw, Hermes Agent, OpenCode, Qwen Code, DeepSeek-TUI, and an included runtime. Existing terminal accounts and configuration can be reused where supported. The project uses the MIT license.

## wesight core features

- **Agent setup and reuse**: On macOS, the interface can install supported local CLIs or detect existing installations. Engine settings provide a place to configure the available agents.
- **Model provider routing**: Configure services such as OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Ollama, and OpenRouter, alongside custom OpenAI-compatible endpoints. This brings provider configuration into the workspace used for agent tasks.
- **Visual tools and file changes**: Chat displays commands, permissions, slash commands, outputs, and tool results. The right-side Live Workspace exposes code writing, diffs, task todos, and generated artifacts while work proceeds.
- **Feishu agent access**: IM Agent Hub connects messages to OpenClaw, Hermes Agent, Claude Code, or Codex. Separate bot profiles let users configure the messaging entry point for each supported engine.
- **Skills and runtime visibility**: SkillHub supports discovering, installing, enabling, updating, and removing local skills. The runtime dashboard shows token usage, TTFT, TPS, tool latency, task status, and agent steps; scheduled tasks and memory add recurring work and preference reuse.

## How to install and use wesight

The supplied README contains no DSH installation command, and no npm package name is confirmed. Installation therefore follows the desktop release path documented by the project.

1. Open the latest release for `freestylefly/wesight` on GitHub and select your platform. Public builds cover macOS Apple Silicon, macOS Intel, and Windows x64; the macOS builds are signed and notarized.
2. Install and launch the application, then open Agent Engines. Choose the engine you want to use, or start with the included runtime.
3. For an existing terminal setup, use its local CLI accounts and configuration. On macOS, use installation or detection for supported CLIs; follow the engine's listed setup path where an official installer is required.
4. Configure your model service in the model provider settings. The README lists both hosted providers and local options, including custom compatible endpoints.
5. Start a task in Cowork Chat with the engine and model controls. Review permission prompts and tool output, then inspect file changes in Live Workspace.
6. Add local skills through SkillHub if needed. For messaging workflows, configure the relevant engine's bot profile in IM Agent Hub; use the runtime dashboard to inspect task results and timing.

## How to troubleshoot wesight

The supplied README does not include an error catalog or specific repair commands. Begin with general checks: confirm the application version, selected engine, provider configuration, and any reused CLI setup, then inspect available logs.

Use the runtime dashboard to identify the engine, model, and status associated with an affected task. Review tool results and permission prompts in chat for additional context. These views provide diagnostic information, but the README does not promise a particular fix for failed requests.

If investigating an issue from a separate DSH environment, verify its profile and enabled plugins, then restart the harness and review its version and logs. Those are general environment checks; the supplied documentation does not establish a wesight plugin registration procedure.
