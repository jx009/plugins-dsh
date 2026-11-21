---
title: "OpenBitFun: Agent Workspace for DSH Users"
description: "OpenBitFun is a desktop workspace for coding and general-purpose agents. Learn how to install it, configure remote control, and troubleshoot sign-in."
summary: "Choose an agent mode to match the task, then check progress or respond to approvals from your phone while the work runs on the selected computer."
highlights:
  - "Four Agent Harness modes"
  - "Phone and browser remote control"
  - "Reusable Mini Apps"
  - "MCP tools and reusable Skills"
  - "Persistent sessions and interruption recovery"
faq:
  - q: "Can I install OpenBitFun as a DSH plugin?"
    a: "The available OpenBitFun README does not show a DeepSeek Harness install command, and no npm package name is confirmed. The documented setup uses the standalone desktop download."
  - q: "Which OpenBitFun mode should I use for coding?"
    a: "Use Minimal for a focused change where you want to give feedback as you go, or Standard for a task that needs a plan and a final check. Ultimate fits larger work that can be split among agents."
  - q: "Can I approve OpenBitFun requests from my phone?"
    a: "Yes. A phone or browser can act as a remote controller for the selected host, so you can respond to approval requests without returning to that computer."
  - q: "Why does OpenBitFun LAN mode still ask me to sign in?"
    a: "Same-network connections still use the online OpenBitFun identity service. LAN mode changes how devices connect, but it does not provide offline sign-in."
  - q: "Can I reuse an OpenBitFun Mini App I build?"
    a: "Yes. You can install and reuse a Mini App you create, then refine it through its associated agent conversation."
---

## What does OpenBitFun do?

OpenBitFun is an open-source desktop agent workspace for coding and general-purpose tasks, listed here for DeepSeek Harness users. The repository carries a `dsh-plugin` topic, but the available README documents the standalone application rather than a DSH plugin installation. It does not establish that the workspace runs inside DeepSeek Harness.

The desktop app pairs a Rust agent runtime with an interface for working with agents, files, sessions, and tasks. You can choose how much planning or coordination a task needs, move between connected computers, and check on work without having to stay at the computer running it.

## OpenBitFun core features

- **Agent Harness modes.** Minimal is for direct collaboration and quick feedback, while Standard adds planning and review for multi-step work. Ultimate can divide a complex task among agents and bring their results together; Creative focuses on building Mini Apps and customizing the workspace.
- **Cross-device remote control.** Switch the desktop view to another connected computer to see its sessions, files, and task status. From a phone or browser, you can send instructions, check progress, or answer approval requests while execution stays on the selected host.
- **Mini Apps.** Turn a recurring need, such as viewing Git insights for a repository, into a dedicated interface. Each app has an associated agent conversation so you can refine it after you start using it.
- **MCP, Skills, and Hooks.** Connect tools through MCP, capture repeatable procedures as Skills, and use Hooks to customize how tasks run. Specialist agents can also have their own model, role, and tools.
- **Persistent sessions.** The Rust runtime manages session state and context, with support for interruption recovery and long-term memory. Context compression and cache reuse help manage resource use during extended tasks.

## How to install and use OpenBitFun

No DSH installation command is documented in the available README, and an npm package name has not been confirmed. Use the desktop setup below rather than guessing a package name.

1. Open the project's Desktop Download page and choose the application for Windows, macOS, or Linux.
2. In the desktop workspace, choose a mode that matches your first task. Try Minimal for a short request you want to guide directly, or Standard when you want the agent to plan the work and check the result.
3. For remote control, sign in on your devices with the same account. The documented sign-in options include GitHub and email verification codes where supported. The official Relay is the default, so there is no server to deploy for that setup.
4. Select the connected computer whose workspace you want to use. From your phone or browser, check its task progress or respond to approvals. Disconnecting the controller does not stop the task on the host.

## How to troubleshoot OpenBitFun

- **No install command for DeepSeek Harness.** The repository topic is not an installation instruction. If you are trying to launch the documented workspace, use the desktop download instead of a guessed package name.
- **A connected computer's sessions or files are unavailable.** Confirm that both devices use the same account and that you selected the intended computer. Sessions and files are read from the device that owns them, so that device needs to be online.
- **Sign-in is unavailable on a local connection.** Check internet access for the identity service. Both the official Relay and same-network control rely on online sign-in, even when the devices share a network.
- **A private Relay does not connect.** Check that you are using a client build that matches that Relay. The repository's deployment guide covers this setup separately from the default hosted connection.
