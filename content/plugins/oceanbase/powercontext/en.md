---
title: "powercontext: Agent Memory for DSH"
description: "powercontext is a DSH plugin resource for agent memory and handoff. Learn installation prerequisites, Scope selection and troubleshooting checks."
summary: "Keep decisions, constraints and task state available across sessions and agents. Review reusable lessons and explicitly export approved skills."
highlights:
  - "Revisioned long-term agent memory"
  - "Structured agent memory handoff"
  - "Reviewed Experience and Skill artifacts"
  - "Scope-isolated context storage"
  - "HTTP, MCP and Python interfaces"
faq:
  - q: "How do I install powercontext in DeepSeek Harness?"
    a: "The supplied README does not provide a DSH installation command, and no npm package name is confirmed. It describes a Server with HTTP, MCP and Python interfaces; consult its Quickstart and Integrations documentation for setup details."
  - q: "Does powercontext need a model to save memories?"
    a: "Explicit Memory writes do not require a model. Extracting memories from captured Sources requires a configured generation pipeline."
  - q: "How does powercontext hand work from Codex to Claude Code?"
    a: "Its server-side artifacts preserve context beyond a single agent host. Handoff uses a Work Contract, a Prepared Handoff, an Acknowledgement and a Task Outcome to carry work state between participants."
  - q: "Does forgetting a powercontext memory delete it?"
    a: "Forgetting removes the entry from active recall while retaining its content and history for restoration. This lifecycle operation does not advance the content revision."
  - q: "Does approving a powercontext Skill install it automatically?"
    a: "Approval creates an immutable revision without installing or executing the procedure. An exact approved revision must be explicitly exported before an agent host can discover its local projection."
---

## What does powercontext do?

powercontext is an agent memory service relevant to DSH plugin workflows that stores durable context outside individual conversations. For developers using DeepSeek Harness, its purpose is to preserve decisions, constraints, evidence and progress so another session, agent or teammate can continue the work. The supplied README describes the service and its interfaces, but does not establish a ready-to-install DSH package.

The project supports running a standard Server or embedding its Core contracts in another application. Server-side artifacts make long-term memory and agent memory handoff independent of one host's conversation history. The README specifically discusses continuity between Codex and Claude Code.

Every record belongs to a Scope, which separates the Source journal, Memory lifecycle, review inbox and Handoff history. A Scope ID selects a dataset; it does not identify a user or grant execution permissions.

## powercontext core features

- **Revisioned Memory:** Store reusable facts, decisions, constraints and next steps. Entries have lifecycle states including active, forgotten, merged and retired; forgetting preserves history while removing an entry from active recall.
- **Structured Handoff:** Move through a Work Contract, Prepared Handoff, Acknowledgement and Task Outcome. `handoff_current_work` prepares a temporary boundary snapshot; committing it creates a durable revision for a milestone.
- **Reviewed Experience and Skill:** Experiences record actions, outcomes and lessons for review before recall. Managed Skills contain procedures and validation checks, and require explicit export of an approved revision before host discovery.
- **Bounded context recall:** `PreparedContext` selects configured sections, including active Memory and approved Experience, within a shared byte budget. It returns `ready` content or `empty`, rather than automatically including the full history.
- **Multiple service interfaces:** HTTP exposes the complete remote application contract, the Python Client offers typed access, and MCP exposes a curated agent-facing interface. The Dashboard and Desktop preview provide additional ways to inspect stored context.

## How to install and use powercontext

No DSH installation command appears in the supplied README excerpt, and the repository information does not confirm an npm package. An installation command therefore cannot be provided reliably. Start with the project's Quickstart, Manual startup and Integrations documentation for the actual deployment and connection instructions.

1. Choose whether to run the standard Server or embed the Core contracts. For Kubernetes with external OceanBase, the README points to a Helm deployment guide.
2. Select the service interface appropriate to your application or agent integration. The excerpt names HTTP, MCP and the Python Client but does not give DSH-specific configuration paths or connection settings.
3. Select the exact Scope containing the project's context. Use the connected workspace view to search memories, inspect a saved revision or save a note for the next session.
4. Write explicit Memory entries for durable facts and constraints. Configure a generation pipeline if you want extraction from captured Sources; direct writes do not need a model.
5. At a work boundary, prepare a Handoff and commit it when a durable milestone is wanted. The receiver resolves it and records an Acknowledgement; preserve the final status and checks as a Task Outcome.
6. Review Experience and Skill candidates before reuse. Export an exact approved Skill revision when it should become discoverable by the receiving host.

## How to troubleshoot powercontext

The excerpt contains no DSH-specific error catalogue. For a plugin that does not appear, check the selected DSH profile, confirm that the integration is enabled, restart the harness, and inspect versions and logs.

When checking memory visibility, first confirm the exact Scope. Also inspect lifecycle and review status: active Memory and approved current Experience heads participate in their respective recall paths, while pending or rejected experiences do not. `PreparedContext` can legitimately return `empty`.

If Source extraction is unavailable, verify that a generation pipeline is configured. If an approved Skill is absent from the host, check whether its exact revision was explicitly exported. These checks follow the documented prerequisites; the excerpt supplies no specific error codes.
