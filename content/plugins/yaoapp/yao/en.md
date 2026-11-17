---
title: "yao: DSH Agents Across Devices"
description: "yao is a DSH plugin ecosystem integration for agents across devices. Learn how to get started, use workspaces and check upgrade issues."
summary: "Yao Agents integrates DeepSeek Harness into a self-hosted environment for agents, isolated workspaces and task boards. Access it from desktop, Android, browser or API."
highlights:
  - "DeepSeek Harness integration"
  - "Isolated workspaces across computers"
  - "Conversation-driven task board"
  - "Open API with SSE and WebSocket"
  - "Desktop, Android and browser access"
faq:
  - q: "How do I install yao for DeepSeek Harness?"
    a: "Start with the Yao Desktop download or the Yao documentation for deployment guidance. The supplied README describes a built-in integration but provides no DSH plugin installation command or confirmed npm package."
  - q: "Can I use yao on Android or in a browser?"
    a: "The README lists desktop, Android and browser access for the integrated harness. The Android application is currently labeled Beta."
  - q: "How does the yao task board work?"
    a: "A request made in a conversation can become a task on the board. Continuing that work can develop an agent specialized for that type of task, which can also connect to apps or be shared."
  - q: "Does yao provide SSE and WebSocket APIs?"
    a: "Yes, the Open API supports both SSE and WebSocket. Expert and task agents can be integrated into your own applications and workflows."
  - q: "Is yao 2.0 compatible with yao 1.0?"
    a: "No, the README explicitly identifies 2.0 as incompatible with 1.0. Fork maintainers and self-hosting users should read BREAKING.md before updating."
---

## What does yao do?

yao is a DSH plugin ecosystem integration that brings DeepSeek Harness into Yao Agents, a self-hosted environment for managing agents and workspaces across your devices. It serves developers and teams who want to keep agent work organized while accessing it through a desktop application, Android, a browser or an API. The supplied README describes an integrated product rather than a separately installable npm extension.

Agents execute on devices you own. Adding another machine gives them another place to work, while management remains centralized. For someone searching for yao for DeepSeek Harness, the main benefit is a shared place to manage work across computers and continue interacting with it from different clients.

## yao core features

- **DeepSeek Harness integration:** The harness is available directly through the desktop app, Android and browser. The Android download is marked Beta, which is useful context when choosing a client.
- **Isolated workspaces:** Workspaces keep separate work apart across your computers. Their output accumulates into documents that form a knowledge base, and agents can read needed material from any node while working.
- **Task board:** A conversational request can become a board task. Ongoing conversations and repeated execution can develop an agent suited to that kind of work; task agents can connect to apps or be shared with others.
- **Open API:** Expert and task agents can become part of your applications and workflows. The documented interfaces support both SSE and WebSocket, giving developers concrete integration options to investigate.
- **Typed decisions with Jev:** Yao Agents also includes Jev, described as TypeSafe AI's System One model. Its output consists of typed decisions with confidence rather than generated text.

## How to install and use yao

The supplied README contains no DSH installation command, and the repository information does not identify an npm package. There is therefore no verified command to paste into the plugin installer. Use the documented Yao distribution and deployment entry points to get started.

1. Choose a client. The desktop download is at `https://yaoagents.com/download`; the Android Beta download is at `https://yaoagents.com/download/yaoagents`. Browser access is also supported.
2. Consult `https://yaoagents.com/docs` for setup and self-hosting instructions. The excerpt does not specify configuration files, server prerequisites or the steps for adding a device, so follow the product documentation for those details.
3. Use the integrated harness from your chosen client. Organize separate work in isolated workspaces and add machines according to the documented setup process.
4. Describe a piece of work in a conversation to turn it into a task on the board. Continue the conversation as the task develops and use the board to track it.
5. For application integration, consult the Open API documentation. Choose between the documented SSE and WebSocket capabilities according to your application's requirements; the excerpt provides no endpoint or authentication configuration to copy.

## How to troubleshoot yao

The explicit upgrade issue in the README is the version boundary: Yao 2.0 is not backward compatible with 1.0. Before updating a fork or self-hosted deployment, read `BREAKING.md`. The project also states that its current development focus is v2.0 and points to `YaoApp/tai-golang` for related work.

For other failures, begin with general checks: record the Yao and harness versions, restart the affected application and inspect available logs. If a separate DSH profile or plugin setup is involved, confirm that you are using the intended profile and that its relevant plugins are enabled. These are diagnostic checks, not README-documented fixes for a specific error.

The excerpt supplies no error codes, platform compatibility matrix or client-specific recovery procedures. Use the symptoms and logs to locate the relevant setup guidance before changing configuration.
