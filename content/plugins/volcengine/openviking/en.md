---
title: "OpenViking: Long-Term Memory Plugin for DSH"
description: "OpenViking is a context database whose DSH plugin gives DeepSeek Harness memory that persists across sessions. Learn to install it, connect a server and verify."
summary: "A context database that organizes agent knowledge, memories, and skills under viking:// URIs. Inspect stored context, search specific subtrees, and extract editable memories from sessions."
highlights:
  - "Cross-session memory for DSH"
  - "Context as a browsable virtual filesystem"
  - "Scoped semantic search"
  - "L0, L1, L2 layered context loading"
  - "Editable Markdown memories"
faq:
  - q: "How do I install OpenViking in DeepSeek Harness?"
    a: "On macOS or Linux, run `curl -fsSL https://openviking.ai/install | bash` and pick DSH as a harness. On Windows, write `~/.openviking/ovcli.conf` with your server URL and key, then add `@openviking/dsh-memory-plugin` from DSH Desktop's Plugins page."
  - q: "Does OpenViking need its own server?"
    a: "Yes. The plugin connects to an OpenViking server: one you deploy yourself (uv, Python 3.10+ and an embedding model plus a VLM), Volcengine's OpenViking Cloud, or any other address."
  - q: "How do I check that OpenViking memory works in DSH?"
    a: "Start `dsh --profile web` and open a conversation. You should see an OpenViking context injection at the top and `mcp__openviking__*` tools available. Ask about something from an earlier session to confirm recall."
  - q: "Why does OpenViking not appear in DSH Desktop after installing for the CLI?"
    a: "Desktop keeps plugins in its own `desktop` profile, separate from the CLI's `web` profile. Install for Desktop separately; both read the same `~/.openviking/ovcli.conf`."
  - q: "Which API key should I use with OpenViking?"
    a: "A user key you created on the server. A root key cannot read or write memories. If the server has authentication turned off, pass an empty key."
  - q: "Why can't OpenViking find something I just said?"
    a: "Memories are processed in the background, so a fact may not be retrievable immediately. Try again in a new session a little later."
---

## What does OpenViking do?

OpenViking is an open-source context database from Volcengine, and its DSH plugin gives DeepSeek Harness long-term memory across sessions. Tell the agent a preference today and it can recall it next week, because conversations are archived and turned into memories stored on an OpenViking server.

What makes it different from typical agent memory is transparency. Instead of hiding everything in embeddings, OpenViking organizes knowledge, memories and skills as a virtual filesystem under `viking://` addresses. Agents navigate it with file-style operations such as `ls`, `tree`, `read` and `grep`, and you can open, edit and merge the stored memories yourself because they are plain Markdown.

The DSH integration combines a plugin with an MCP server: context is injected at the start of each conversation, and the model gets `mcp__openviking__*` tools to search and read more when it needs it.

## OpenViking core features

- **Cross-session memory**: committed sessions are archived and memories are extracted automatically in the background.
- **Virtual filesystem**: documents, code, memories and skills each have a `viking://` address you can browse and edit.
- **Scoped retrieval**: limit semantic search to one project directory or memory subtree. `find` runs a direct query, while `search` plans retrieval from session context.
- **Layered loading**: L0 abstracts for a quick relevance check, L1 overviews for more detail and L2 full content only when needed, which keeps prompts small.
- **Editable memories**: memories are Markdown files you can inspect, correct and merge.
- **VikingBot**: an optional component that compiles source material into wikis, knowledge graphs or reports.

## How to install and use OpenViking

1. Have an OpenViking server ready: deploy your own, use Volcengine's OpenViking Cloud, or point at an existing address. Create a user key on it.
2. On macOS or Linux, run the installer and choose DSH (and DSH Desktop on macOS) when asked:

   ```bash
   curl -fsSL https://openviking.ai/install | bash
   ```

   The installer needs Node.js 18+ and curl, and stores your connection in `~/.openviking/ovcli.conf`.

3. On Windows, create `%USERPROFILE%\.openviking\ovcli.conf` with your server details:

   ```json
   { "url": "https://<your-openviking-server>", "api_key": "<your-api-key>" }
   ```

   Then open Plugins → Add plugin in DSH Desktop, enter `@openviking/dsh-memory-plugin` and install it.

4. Start `dsh --profile web` or reopen Desktop and begin a new conversation.
5. Ask the agent to remember a preference, then ask about it in a new session later.

## How to troubleshoot OpenViking

- **No memory shows up in DSH.** Check for the OpenViking context injection at the top of the conversation and the `mcp__openviking__*` tools. If they are missing, confirm the plugin is installed in the profile you are running.
- **Desktop does not see the plugin.** Desktop uses `~/.dsh/profiles/desktop`, separate from the `web` profile. Quit Desktop fully (⌘Q on macOS) before installing, then reopen it. If the plugin's switch is off, turn it on.
- **Authentication fails.** Use a user key, not the root key. For a local server without auth at `http://127.0.0.1:1933`, no key is needed.
- **The MCP tools misbehave.** Set `OPENVIKING_DEBUG=1` and `OPENVIKING_DEBUG_LOG=/tmp/ov-dsh.log` before starting DSH, then read that log.
- **A memory is not found right away.** Extraction runs in the background; wait a bit and ask again in a new session.

When reporting an issue, include the plugin version, DSH version, server type and the relevant debug log lines, with keys removed.
