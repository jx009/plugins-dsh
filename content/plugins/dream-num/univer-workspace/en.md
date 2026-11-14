---
title: "univer-workspace: Office Collaboration for DSH"
description: "univer-workspace is a DSH plugin for Office collaboration. Learn how to get started, configure MCP access, and troubleshoot editing permissions."
summary: "Create and review Office content with people and agents in a shared workspace. Use the DSH-based Workspace Agent, browser, CLI, or remote MCP connection."
highlights:
  - "Collaborative Sheets, Docs, and Slides"
  - "Isolated Worktrees and change review"
  - "Remote MCP with OAuth"
  - "Spreadsheet dashboards bound to cells"
  - "Self-hosted storage and permissions"
faq:
  - q: "How do I install univer-workspace in DeepSeek Harness?"
    a: "The supplied README identifies Workspace Agent as a local application built on DSH and points to apps/agent/README.md for installation. It does not provide a DSH plugin installation command or a confirmed npm package name."
  - q: "Can univer-workspace connect to my own server?"
    a: "Workspace Agent and CLI can connect to an existing Workspace deployment or a local instance. For MCP, use https://&lt;your-workspace>/mcp with Streamable HTTP."
  - q: "Why can univer-workspace browse files but not edit them?"
    a: "On space.univer.ai, editing tools are currently restricted to invited accounts. All accounts can browse, search, and manage issues and pull requests, so successful browsing does not establish editing access."
  - q: "How does univer-workspace keep agent edits separate?"
    a: "Agents make and verify changes inside isolated Worktrees. A person reviews the result before merging, while humans can continue editing the workspace."
  - q: "Can univer-workspace MCP work without OAuth?"
    a: "Clients that cannot perform OAuth can use a personal access token created under Access tokens in the Workspace account menu. Send it as an Authorization: Bearer &lt;token> header."
---

## What does univer-workspace do?

univer-workspace is a DSH plugin for collaborative Office workflows, delivered through a workspace whose local Agent application is built on DeepSeek Harness. It helps developers and teams manage documents created by AI agents, inspect proposed changes, and keep people involved in review. The supplied README describes the Agent application rather than a standalone npm plugin installation.

Built with Univer Office SDK, the workspace combines Sheets, Docs, Slides, relational tables, and canvases. Browser, Agent, and CLI entry points connect to a Workspace Server that manages document storage and permissions. Local file references in Agent refer to the machine running that application; Workspace documents remain on the connected service.

## univer-workspace core features

- **Office collaboration:** Work together on spreadsheets, documents, presentations, Bases, and Boards. Personal and Team Spaces provide ways to organize content, with access control based on roles and nodes.
- **Worktrees and review:** Agents edit in isolated environments, verify their work, and submit results for human review. Multiple rounds of changes can happen without altering trunk.
- **Remote MCP access:** Connected assistants can find files, open pull requests, edit Office content, read results back, and mark changes ready for browser review. The default toolset is `core`.
- **Spreadsheet mini-apps:** Agents can create dashboards and interactive reports whose metrics, charts, and controls connect to spreadsheet cells. Those connections support reads, writes, and collaborative updates.
- **Agent inspection tools:** The documented capabilities include data inspection, screenshot and PDF rendering, layout checks, and offline discovery of Skills and APIs matched to the installed version.

## How to install and use univer-workspace

The supplied README contains no DSH installation command, and the repository information does not confirm an npm package name. Consult `apps/agent/README.md` for Agent installation and first use; there is no verified `dsh plugin` command to copy from this material.

1. Choose your entry point. Use Workspace Browser for direct editing, Workspace Agent for document conversations and change review, or Workspace CLI for scripts and automation. The Agent and CLI can use an existing deployment or one started locally.
2. For a remote assistant connection, configure its MCP settings with `https://space.univer.ai/mcp` and Streamable HTTP. For a self-hosted service, substitute `https://<your-workspace>/mcp`. This connection requires no local Workspace installation.
3. Sign in through browser OAuth. Review the requested `read`, `write`, `publish`, and `worktree:merge` permissions, and deselect permissions you do not want to grant.
4. If more tools are needed, append `?toolsets=core,files` for Blob, Asset, Markdown, Typst, SVG, and HTML View tools. The README also documents `admin` for repository and label management and `all` for all toolsets.
5. Ask the connected assistant to locate a document, propose edits in a pull request, and read back the result. Review the changes in the browser before merging.

## How to troubleshoot univer-workspace

If browsing works but editing does not, check account eligibility first. On the hosted service, `execute`, `inspect`, import, and export currently require an invited account. Browsing, search, issues, and pull request management are available to every account.

If a client cannot use OAuth, create a personal access token under the Workspace account menu’s Access tokens section and send `Authorization: Bearer <token>`. In Claude Code, a configured Authorization header bypasses OAuth, so do not configure both authentication methods together.

For DSH-side loading problems, check the active profile and whether the relevant integration is enabled, restart the harness, and inspect versions and logs. These are general checks; the supplied excerpt does not document plugin-specific error codes or configuration paths.
