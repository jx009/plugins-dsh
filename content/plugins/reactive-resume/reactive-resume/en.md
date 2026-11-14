---
title: "Reactive Resume: Resume Builder MCP for DSH"
description: "Reactive Resume is a free resume builder with an MCP server DSH agents can use to edit resumes and track applications. Learn to connect it and fix sign-in."
summary: "Write and customize resumes and cover letters, review them against job postings, and organize applications. Supports document exports and self-hosting."
highlights:
  - "Live PDF preview with 18 templates"
  - "Job keyword and ATS checks"
  - "Cover letters and application tracker"
  - "MCP server and REST API"
  - "Self-hostable, no tracking or ads"
faq:
  - q: "How do I use Reactive Resume from DeepSeek Harness?"
    a: "Reactive Resume runs an MCP server at your instance address plus `/mcp`, which is `https://rxresu.me/mcp` on the hosted app. Add it to DSH as a remote MCP server, signing in with OAuth or an API key."
  - q: "How does an agent authenticate with the Reactive Resume MCP server?"
    a: "OAuth is recommended: you approve the client in your browser and no secret is copied. Clients that cannot do OAuth can send an API key in the `x-api-key` header; create the key under Settings → Developer."
  - q: "What can an agent do through Reactive Resume?"
    a: "Read and edit resumes, cover letters and job applications in plain language, plus imports, exports and checks through the same MCP tools and REST API."
  - q: "Which formats can Reactive Resume export?"
    a: "Resumes and letters export as PDF, Word (DOCX), Markdown or JSON, and you can share a public link with optional password protection and view statistics."
  - q: "Can I self-host Reactive Resume?"
    a: "Yes. It runs with Docker, Kubernetes, Vercel, Cloudflare Workers or a one-click Hostinger deploy, using PostgreSQL plus storage for uploads. The project is MIT licensed."
  - q: "Does Reactive Resume have agent skills too?"
    a: "Yes. The project publishes 32 agent skills for resume writing and job searching, covering drafts, proofreading, career changes, cover letters, interviews and offers."
---

## What does Reactive Resume do?

Reactive Resume is a free, open-source resume builder with an MCP server, so a DSH agent can read and edit your resumes, cover letters and job applications when you ask in plain language. It brings resume editing, document checks and application tracking into one app that you can use online or host yourself.

You can import an existing resume or start from scratch, edit content inline next to a live PDF preview, and check the result against a job posting before you apply. Saved jobs connect to a tracker with stages, contacts, interviews and follow-ups.

For agents, the project offers a REST API, an MCP server and a set of agent skills. The repository is tagged as a DSH plugin, and DeepSeek Harness can work with it the same way other MCP clients do.

## Reactive Resume core features

- **Editor**: inline editing with live PDF preview, rich text, custom sections, drag-and-drop ordering, autosave and version history.
- **Design**: 18 templates with controls for fonts, colors, spacing, paper size and custom styles.
- **Checks**: readability findings, job keyword matching and a view of the text applicant tracking systems read from your PDF.
- **Library**: resumes and cover letters with tags and restorable versions.
- **Application tracker**: list, board, insights and calendar views for applications, interviews and contacts.
- **Export and share**: PDF, Word, Markdown and JSON downloads, plus public links with optional passwords.
- **Integrations**: REST API, MCP server and 32 agent skills for resume and career workflows.

## How to install and use Reactive Resume

1. Create an account at `rxresu.me`, or self-host the app with Docker.
2. Import a resume or start a new document, pick a template and edit next to the preview.
3. To let a DSH agent work with your documents, find the MCP server address under Settings → Developer. On the hosted app it is:

   ```text
   https://rxresu.me/mcp
   ```

4. Add it to DeepSeek Harness as a remote MCP server. Sign in with OAuth when prompted, or create an API key under Settings → Developer and send it in the `x-api-key` header.
5. Ask the agent for a task, for example "tailor my backend resume to this job posting and draft a cover letter".

For a self-hosted instance, use your own address followed by `/mcp`.

## How to troubleshoot Reactive Resume

- **The MCP client cannot connect.** The server uses Streamable HTTP. If your client only supports local servers, run it through the `mcp-remote` bridge. Check that the address ends in `/mcp`.
- **Authentication fails with an API key.** Send the key in the `x-api-key` header, and make sure it was created in Settings → Developer on the same instance you are connecting to.
- **A self-hosted instance will not start.** Set both `AUTH_SECRET` and a separate `ENCRYPTION_SECRET` in `.env` (for example with `openssl rand -hex 32`), and confirm PostgreSQL and storage are running.
- **Integrations broke after upgrading from v5.** Version 6 changed API and MCP integrations and old style rules. Back up your database and uploads and follow the "Migrating from v5" guide.
- **AI features do nothing.** AI is optional and needs a provider you connect yourself; provider usage may cost money.

When reporting a problem, include whether you use the hosted app or a self-hosted version, the MCP client and the error message.
