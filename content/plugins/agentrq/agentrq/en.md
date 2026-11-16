---
title: "agentrq: Task Workflows for DSH"
description: "agentrq is a DSH plugin listing for an agent task platform. Learn about setup requirements, MCP workflows, approvals and troubleshooting."
summary: "Coordinate human and agent work through a shared task board, scheduled runs and event-driven workflows. Inspect tool calls and respond to approval requests from the task view."
highlights:
  - "MCP task collaboration"
  - "Recurring task scheduling"
  - "Event-driven workflow graphs"
  - "Tool call history and approvals"
  - "On-device Whisper transcription"
faq:
  - q: "How do I install agentrq in DeepSeek Harness?"
    a: "The supplied README excerpt does not include a DSH installation command, and no npm package name has been confirmed. Consult the repository's full setup instructions before configuring the integration."
  - q: "Can agentrq schedule recurring agent tasks?"
    a: "Tasks can have a launch date or repeat every 15 minutes, hourly, daily, weekly or on custom days. A background poller checks for due tasks every minute."
  - q: "Can agentrq turn GitHub webhook events into tasks?"
    a: "External services can send signals to a hook URL, and subscribed workspaces automatically receive tasks. The README describes a failed CI run becoming a task through this mechanism."
  - q: "How does agentrq YOLO mode handle approvals?"
    a: "Enabling YOLO on a task automatically allows subsequent permission requests and records them as auto-allowed in its history. Switching it off restores approval requests."
  - q: "Does agentrq upload audio for speech-to-text?"
    a: "The documented transcription feature uses a Whisper model inside the browser. Voice processing happens on the device, without uploading the audio."
---

## What does agentrq do?

agentrq is a DSH plugin listing for AgentRQ, a self-hosted platform for collaboration between humans and AI agents. It gives developers a shared place to delegate work, follow progress and answer agent questions. The repository identifies DSH among its ecosystem topics; the supplied README describes the platform but does not document its specific DeepSeek Harness setup.

Agents interact with workspace tasks through the Model Context Protocol (MCP). They can retrieve assigned work, change task status, ask for permission and communicate with the operator. Changes synchronize in real time, so the board reflects work as it happens. The repository description also identifies support for harnesses using ACP, although connection settings are outside the supplied excerpt.

## agentrq core features

- **Visual task board:** View tasks in a list or Kanban layout from a dashboard accessible on different devices. This makes active work, requests for input and completed tasks visible in one workspace.
- **Task scheduling:** Assign a launch date or a recurring cadence, including every 15 minutes, hourly, daily, weekly and custom days. A background poller checks every minute and creates runs when tasks become due.
- **Events and workflows:** Named signals such as `qa_passed` can create tasks in subscribed workspaces. Arrange events and workspaces on a graph to connect completion in one stage with work in the next; outside services can also send signals through hook URLs.
- **Tool call history and approvals:** Inspect messages and tool calls in lanes for Input, Agent and Tools. Search entries and review arguments, results and permission outcomes. Optional YOLO mode automatically approves requests while preserving their history.
- **On-device speech-to-text:** Dictate task descriptions and replies using the microphone control. A browser-based Whisper model processes the voice locally, with a model download on first use.

The task timeline adds another way to understand progress: it records status changes and time spent working, blocked or waiting for input. Workspace message delay can hold messages for a configurable countdown, during which you can send immediately or cancel and recover the text and attachments.

## How to install and use agentrq

No verified DSH installation command is available in the supplied material. The npm package name is also unconfirmed, so there is no package command to copy from this page. The excerpt does not specify deployment commands, connection configuration files or authentication settings; use the complete repository documentation to establish those prerequisites.

Once the platform and your agent connection are configured, use the documented interface as follows:

1. Open a workspace and create a task describing the desired outcome. Assign the work to an agent, which can retrieve its tasks through MCP.
2. Follow progress in the list or Kanban view. Use the task conversation to answer questions and review permission requests when they arise.
3. Open the task detail History tab to inspect calls and results. Consult the status timeline when you need to understand waiting or blocked time.
4. Set a launch date or recurring schedule for repeated work. For work spanning multiple stages, connect workspaces and events in the workflow graph.
5. Configure message delay at workspace level if you want time to revise messages before delivery. For local task search, use `⌘K` on macOS or `Ctrl+K` elsewhere.

## How to troubleshoot agentrq

The supplied excerpt contains no error-code reference or DSH-specific repair procedure. If an integration does not appear, start with general checks: confirm the intended profile, verify that the integration is enabled, restart the harness and inspect installed versions and logs. These are diagnostic checks, not documented fixes for a particular AgentRQ defect.

For unexpected task behavior, inspect the call history and status timeline to identify where execution stopped. If permission requests are being accepted automatically, review the task's YOLO setting and any workspace or trigger defaults. If a task is missing from search, remember that the finder searches the copy already saved on the current device; its displayed search scope matters.
