---
title: "Agents-Anywhere: DSH Sessions Across Devices"
description: "Agents-Anywhere is a DSH integration for managing sessions across devices. Learn how to install the client, connect a Runtime and fix connection issues."
summary: "Review agent progress and answer approval requests from your phone or browser while DeepSeek Harness keeps running on your work machine."
highlights:
  - "Cross-device DSH session management"
  - "Timeline for agent progress"
  - "Tool approvals and input requests"
  - "Workspace file previews and remote terminal"
  - "Docker self-hosting"
faq:
  - q: "Is Agents-Anywhere a DeepSeek Harness plugin I install with npm?"
    a: "The project is documented as a standalone workbench with a DeepSeek Harness integration. Its README does not provide a DSH plugin installation command; it directs users to the desktop client or Connector CLI and the DSH Bridge Next guide."
  - q: "Does Agents-Anywhere support Windows and Linux?"
    a: "Windows has an x64 desktop client with a local Connector, and the README notes that its installer is unsigned. Linux and headless work machines use Connector CLI and can be accessed from another client."
  - q: "Can I use Agents-Anywhere on my phone without moving my DSH workspace?"
    a: "Yes. The phone acts as a client, while DeepSeek Harness uses the workspace and permissions on the connected work machine."
  - q: "Can Agents-Anywhere manage Codex and Claude Code as well as DSH?"
    a: "Yes. The workbench supports Codex, Claude Code and DeepSeek Harness. Model choices, permissions and available actions depend on the Runtime you use."
  - q: "Does Agents-Anywhere support Docker self-hosting?"
    a: "Yes. The documented Docker Compose setup includes the application server, PostgreSQL, Redis and a migration task. On first launch, use the setup token from the server logs to configure the first administrator."
---

## What does Agents-Anywhere do?

Agents-Anywhere is an open-source DSH integration that lets you manage agent sessions from a desktop, phone, tablet or browser. It is a standalone workbench rather than a DSH plugin installed inside the harness. If you step away from the computer running DeepSeek Harness, you can check the session timeline or answer a pending request without moving your project to another device.

The agent runs on the work machine connected through Connector and uses that machine's workspace and permissions. The client you open on another device is where you view and control the session, not where the agent executes. The workbench also supports Codex and Claude Code; the available actions depend on the Runtime, the component that runs and connects the agent on the work machine.

## Agents-Anywhere core features

- **Session management and Timeline:** Switch between connected devices, projects and sessions. Open a session's Timeline to see its progress before deciding whether you need to respond.
- **Tool approvals and input requests:** Answer an agent's prompt or respond to a tool approval from the client. Pause or resume a task only where the Runtime exposes those controls.
- **Workspace files and remote terminal:** Browse and preview files, transfer attachments, or open an interactive terminal for the connected workspace. These tools operate on the work machine, not on the phone or browser you use to access it.
- **Cloud or Docker self-hosting:** Connect the clients to the hosted service or your own instance. Depending on the feature, session content, Timeline data and uploaded attachments pass through or are stored on the server, even though the agent executes on the work machine.

## How to install and use Agents-Anywhere

The README does not list a DSH plugin installation command. Start with the client or Connector on the machine where you want the agent to run.

1. On macOS or Windows, install the desktop client from the project's downloads. It includes a local Connector. For Linux or a headless server, follow `connector/README.md` to run Connector CLI on the work machine.
2. Sign in to Agents Anywhere Cloud, or enter the address of your self-hosted service. For device pairing and first-time sign-in, refer to `docs/getting-started.md`.
3. On the connected work machine, follow `dsh-bridge-next/README.md` for DeepSeek Harness setup. Configure the Runtime, agent account and working directory there, then create or open a session. Use the model and permission options exposed by that Runtime.
4. On your phone, tablet or another computer, open the app or visit `web.agents-anywhere.com` for Cloud access. Sign in with the same account on the same service, choose the work device and project, then open the session.

If you are deploying your own service, follow `docker/README.md`. The initial administrator setup uses a token from the server logs.

## How to troubleshoot Agents-Anywhere

- **The work device is missing or unavailable:** Confirm that both clients are using the same account and service. Check that the work machine is on and online, then verify that Connector and the DSH Runtime are running there. Use `docs/getting-started.md` for pairing and sign-in checks.
- **An agent control is missing:** Check which Runtime the session uses and which actions the client offers for it. A control available for one agent may not be available for another.
- **The app does not update in place:** The README says to download and install updates manually for version 2.0.3 and earlier. Compare your installed version with the release notes; a fix on `main` may not be in your installer yet.
- **The issue persists:** When reporting it, include the client version, operating system, Runtime type and steps that reproduce the issue. Remove credentials before sharing logs.
