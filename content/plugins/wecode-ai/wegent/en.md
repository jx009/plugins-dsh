---
title: "Wegent: AI Project Collaboration for DSH"
description: "Wegent is an AI project workspace tagged as a DSH plugin. Learn how to install Wegent Desktop, set up Codex, and check agent execution."
summary: "Keep project Issues, AI coding tasks, and deliverables together. Work locally in Wework or connect to Wegent Backend for shared projects and remote execution."
highlights:
  - "Issue assignment and handoffs"
  - "Codex coding in Wework"
  - "Linked tasks and deliverables"
  - "Personal stand-ins in beta"
  - "Self-hosted Web and Backend"
faq:
  - q: "How do I install the Wegent DSH plugin?"
    a: "The repository is tagged `dsh-plugin`, but the available README excerpt does not provide a DeepSeek Harness installation command or confirm an npm package name. The documented installation options are Wegent Desktop and the self-hosted Web and Backend."
  - q: "Does Wegent Desktop need a Backend login for local Codex tasks?"
    a: "No. For local work, set up a model in Wegent Desktop and add or select a local project."
  - q: "How do I deliver a Wegent task result back to an Issue?"
    a: "Create the task from the Issue so the two stay linked. After reviewing the run, select the files or notes to deliver back to the Issue."
  - q: "Why isn't an AI agent available in my new Wegent project?"
    a: "New projects do not add agents automatically. Add the agent explicitly and make sure it has a configured model and an available execution environment."
  - q: "Can a Wegent personal stand-in work when my computer is off?"
    a: "A stand-in needs an available execution device; automatic processing does not keep a powered-off device running. Wegent supports local, remote, and server-managed execution targets."
---

## What does Wegent do?

Wegent is an open-source workspace for AI coding and team collaboration whose repository carries the `dsh-plugin` topic. It lets developers work on a local codebase and gives teams a way to assign work, review AI execution, and hand results back through a shared Issue. The available README describes how to run Wegent itself, but does not establish how it loads into DeepSeek Harness or which of its features are exposed through DSH.

## Wegent core features

- **Issue-based collaboration.** Assign a goal to a person, an agent, or a collaboration group. Keep feedback and handoffs on the Issue so the next owner can pick up the existing plan and files.
- **Linked tasks and deliverables.** Create an execution task from an Issue in Wework, the Wegent desktop workbench. Review what ran and choose which files or notes to deliver back instead of treating a task run as a completed handoff.
- **Local coding with Codex.** Use Codex with the files, commands, and development environment of a local project. Review tool activity, test output, and source diffs before accepting the changes.
- **Reusable agents and execution targets.** Configure an agent with a model, prompts, Skills, knowledge, and tools. Wegent supports local devices, remote work machines, and server-managed executors.
- **Personal stand-ins (beta).** Define which project sources can send work to a stand-in and set its responsibilities and processing policy. Execution records let you review what it did, and the workflow can return work to you for confirmation.

## How to install and use Wegent

The available README does not list a DSH plugin installation command, and no npm package name is confirmed. Use the setup path that matches where you intend to work:

1. **For local coding**, download the latest Wegent Desktop installer from GitHub Releases. Open the app, follow the model setup flow, and select or add a local project. You do not need to sign in to Wegent Backend for this workflow. Create a task that spells out what to analyze, change, or verify, then review its command output, tests, and diffs.
2. **For team collaboration**, connect Wework to Wegent Backend and create or join a cloud collaboration project. Add members, then explicitly add any agents you want to use and configure their models and execution environments. Open an Issue, assign it, and create a linked task. When the task is done, select the results to return and use Issue comments for feedback or reassignment.
3. **For self-hosting**, follow the README's Docker standalone setup for Wegent Web and Backend. This deploys the web application and server; it does not install a DeepSeek Harness plugin. Open `http://localhost:3000` after startup and use the setup flow to create an administrator password and configure a model.

## How to troubleshoot Wegent

- **An Issue is assigned but no work has run.** Check whether someone created a linked task. Assignment identifies the owner; the task provides the execution record. For AI work, confirm the agent was added to the project and has both a model and an execution environment.
- **A personal stand-in is not picking up work.** Check the authorized project sources, responsibilities, and processing policy under `My stand-in`. Confirm the model is configured and the execution device is available. Automatic processing remains subject to project permissions and operation approvals.
- **Something is missing from a DSH profile.** If you have a separately verified installation, check that you are using the intended profile and that the plugin is enabled there. Restart DSH and check its version and logs. The documented Desktop and Backend setup paths do not establish that anything has been installed in that profile.
