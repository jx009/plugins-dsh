---
title: "mem9: Persistent Memory for DSH"
description: "mem9 is a DSH plugin that carries agent memory across sessions. Learn where to find installation steps, how to configure the API, and how to troubleshoot."
summary: "Pick up a project in a new session without restating the same decisions. Connect multiple supported agents to one memory space so they can recall the same context."
highlights:
  - "Persistent memory across sessions and machines"
  - "Shared memory for supported agent runtimes"
  - "Hybrid semantic and keyword recall"
  - "Smart ingest and memory management tools"
  - "Hosted API or self-hosted server"
faq:
  - q: "How do I install mem9 in DeepSeek Harness?"
    a: "Open `dsh-plugin/README.md` in the `mem9-ai/mem9` repository and follow the instructions for the native DSH/Cordis bundle. The main README points to that guide but does not give a DSH install command."
  - q: "Which API key does mem9 need for DSH?"
    a: "Set `MEM9_API_KEY` to the key for the mem9 space you want to use. For a self-hosted server, use the key returned or configured during provisioning."
  - q: "Can mem9 share memory between DeepSeek Harness and OpenClaw?"
    a: "Yes. Configure the integrations for both runtimes to use the same memory space so that a fact stored through one can be recalled through the other."
  - q: "Can I use mem9 in DSH without hosting my own server?"
    a: "Yes. Use the hosted API at `https://api.mem9.ai` with a key for your hosted space; the service handles storage and search."
  - q: "Why is mem9 not recalling memories in a new DSH session?"
    a: "Check that the new session uses a profile where the bundle is enabled and that its API settings point to the space where the memory was stored. Look for the test entry in the dashboard to check whether it reached that space in the first place."
---

## What does mem9 do?

mem9 is a DSH plugin that lets agents save and recall context across sessions and machines. Its native DSH/Cordis bundle connects DeepSeek Harness to a server-backed memory space. For example, you can store a project convention during one session and ask the agent to recall it in another, rather than adding the same background to every prompt.

Storage and search run on the server, not inside the harness. That also lets other supported runtimes work with the same records when their integrations are configured for the same space.

## mem9 core features

- **Persistent memory.** Stored context stays available after a session ends. An agent on another machine can retrieve it when configured to use the same space.
- **Shared memory.** DeepSeek Harness can share a space with supported runtimes such as Claude Code and OpenClaw. A project decision saved in one runtime can be looked up from another.
- **Hybrid recall.** The server combines semantic search with keyword search. That lets recall use both the meaning of a query and the literal terms it contains, such as a project name.
- **Smart ingest and memory tools.** The native bundle supports ingest and recall as well as tools for working with stored records. The server API supports storing, searching, retrieving, updating, and deleting memories.
- **Visual dashboard.** Inspect and manage stored records outside the agent conversation. This is useful when you want to verify what was saved before testing what the agent can retrieve.

## How to install and use mem9

The main repository README does not include a DSH install command. Start with `dsh-plugin/README.md` in `mem9-ai/mem9` for the bundle installation steps. Don't substitute the OpenClaw or ClawHub instructions; those apply to a different integration.

1. Choose an endpoint. Use `https://api.mem9.ai` for hosted storage and search. For self-hosting, follow the repository's server setup and provisioning instructions, then use the URL of your deployment.
2. Set `MEM9_API_URL` and `MEM9_API_KEY` in the environment that launches DeepSeek Harness. Use the base URL of your chosen endpoint and the API key for the target space. For local self-hosting, the repository gives `http://localhost:8080` as an example; use your actual server address if it differs.
3. Start the harness with the profile where you installed the bundle. Store a short, non-sensitive fact, such as a sample project naming convention. Open a fresh session and ask the agent to recall it. This checks persistence across sessions rather than recall from the current conversation alone.

## How to troubleshoot mem9

- **Check the active profile.** Confirm the session is running in the profile where you installed the bundle and that the plugin is enabled there.
- **Check the endpoint and credentials together.** Verify that the harness process receives both environment variables and that the key belongs to the intended space on that server. Restart the harness after changing its environment, then try again.
- **Separate storage from recall.** Inspect the dashboard for the test record. If it is present, check that the session doing the lookup uses the same space. If it is absent, start by reviewing the write attempt in the logs.
- **Review versions and logs.** If the bundle still does not load or the test does not work, note the harness and bundle versions and check the startup and request logs. Remove credentials before sharing log excerpts.
