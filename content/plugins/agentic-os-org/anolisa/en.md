---
title: "ANOLISA: Agent Runtime Tools for DSH"
description: "ANOLISA is an agent runtime stack with plugin adapters. Learn how to approach DSH integration, configure components and troubleshoot setup."
summary: "Add context compression, persistent memory, workspace recovery, security and observability to an agent runtime. Existing agents can access headless capabilities through adapters and plugins."
highlights:
  - "Tokenless tool output compression"
  - "Persistent memory across sessions"
  - "OS Skills discovery"
  - "Workspace snapshots and rollback"
  - "Agent execution observability"
faq:
  - q: "How do I install ANOLISA in DeepSeek Harness?"
    a: "The supplied README points existing harness users to the installation and adapter integration guide. It does not provide a DSH installation command or identify an npm package, so a specific command cannot be confirmed."
  - q: "Does ANOLISA replace my existing agent interface?"
    a: "Its adapter and plugin approach lets you retain your agent's interface, model account and workflow. The runtime environment supplies the selected headless system capabilities."
  - q: "How does ANOLISA Tokenless reduce token usage?"
    a: "Tokenless compresses tool output so lengthy results occupy less context. The README links to a reproduction guide for inspecting compression and changes in token usage, without promising a fixed savings rate."
  - q: "Can ANOLISA recover workspace changes?"
    a: "Workspace snapshots support inspecting file changes and rolling them back. These capabilities depend on installing and configuring the relevant components."
  - q: "What can I inspect with ANOLISA observability?"
    a: "The documented observability workflow covers model calls, tool calls, execution trajectories and token usage. The README directs users to the AgentSight reproduction guide to observe an agent run."
---

## What does ANOLISA do?

ANOLISA is a system software stack that adds runtime capabilities to AI agents through components, adapters and plugins. For developers exploring an ANOLISA agent runtime for DSH, it provides a route toward context management, security, workspace recovery and execution visibility while retaining an existing harness. The supplied README describes integration with agent harnesses generally; it does not establish a specific DeepSeek Harness installation procedure.

The stack runs on existing operating system kernels and infrastructure. You can start with a preinstalled image, add components to a supported existing system, or connect an existing agent to headless capabilities. The last option is the relevant starting point for users seeking a DSH plugin integration: it preserves the agent interface, model account and working process.

## ANOLISA core features

- **Tokenless context compression** shortens tool output to reduce the space that lengthy results consume. The README includes a demonstration path for comparing compressed output and token usage; it does not specify a guaranteed reduction.
- **Persistent memory** enables agents to retrieve information from earlier sessions. Reusing that information can reduce repeated reads and help keep context focused on the current task.
- **OS Skills discovery** lets agents consult operating system instructions and find relevant Skills. The cosh terminal also provides a natural-language entry point for invoking tools and Skills within a familiar shell experience.
- **Security and workspace recovery** combine action constraints with mechanisms for inspecting and undoing workspace changes. Security policies and underlying isolation constrain actions, while snapshots support reviewing file changes and rolling them back.
- **AgentSight observability** exposes model and tool calls, execution trajectories and token usage. These records help developers investigate task failures and examine runtime costs.

## How to install and use ANOLISA

No DSH installation command appears in the supplied README, and no npm package name has been confirmed. Start with the installation and adapter integration guide referenced by the project at `https://agentic-os.sh/docs/user-guide/getting-started/installation/`; the available excerpt is insufficient to provide a copy-and-run harness command.

1. Choose the deployment route. For an existing harness, follow the adapter integration route. For a separate runtime environment, consult the image catalog or the package installation guide.
2. Check platform requirements before installing components. The README names supported Linux systems for extending an existing OS, and its platform badge lists Linux and macOS; component requirements belong in the installation guide.
3. Select the capabilities your workload needs. Install the relevant packages and configure their services using the component documentation. The excerpt does not supply configuration filenames, service commands or adapter settings.
4. Keep using your existing agent interface after completing the applicable integration. If you choose cosh as the terminal entry point instead, follow its first-use guide and configure model access and relevant services.
5. Validate the capability you enabled. Follow the Tokenless measurement example to inspect compression, or the AgentSight example to inspect an agent run. Configure snapshot and security components before relying on their functionality.

## How to troubleshoot ANOLISA

The supplied README contains no DSH-specific error codes or repair commands. Begin with general integration checks: verify the intended profile, confirm that the applicable adapter or plugin is enabled, and restart DSH after configuration changes.

Check installed component versions and review available harness and service logs. Compare your setup with the installation guide, paying attention to platform requirements and service configuration. If compression, snapshots or execution records are absent, first verify that the corresponding component has been installed and configured. Record which capability failed and any relevant log output before seeking further support.
