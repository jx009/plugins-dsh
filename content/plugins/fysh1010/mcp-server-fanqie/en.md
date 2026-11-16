---
title: "mcp-server-fanqie: Fanqie Reading in DSH"
description: "mcp-server-fanqie is a DSH plugin that searches and reads Fanqie novels. Learn how to install from source, sign in and troubleshoot reading errors."
summary: "Search Fanqie novels and read website-visible chapters in the Harness sidebar. Scan the official login QR code to access your own bookshelf and saved highlights."
highlights:
  - "Fanqie novel search"
  - "Sidebar chapter reading"
  - "Personal bookshelf and highlights"
  - "Seven conversation tools"
  - "Independent MCP and Skill entry points"
faq:
  - q: "How do I install mcp-server-fanqie in DeepSeek Harness?"
    a: "Download the current repository and install its complete plugins/deepseek-harness/ directory through the desktop plugin manager, keeping vendor/ intact. Refresh or restart Harness, then select 番茄阅读 from the sidebar’s + start page."
  - q: "Can I install the mcp-server-fanqie DSH plugin from npm?"
    a: "The README states that the Harness plugin has not been published to npm. The older @fysh925/mcp-server-fanqie package and historical 0.2.0-dev.6 release do not contain it; use the current repository."
  - q: "Does mcp-server-fanqie require login to search novels?"
    a: "Public novel search does not require your account or a request signature. Your own bookshelf and saved highlights require official QR-code login confirmed on your phone."
  - q: "Can mcp-server-fanqie read every chapter available in the Fanqie app?"
    a: "It reads chapters visible on the official website, so coverage may differ from the app. Locked chapters, unknown fonts and remaining garbled characters produce explicit errors."
  - q: "Does mcp-server-fanqie need a separate MCP server for the sidebar?"
    a: "No separate MCP server or manually started HTTP API is required for the Harness plugin. Its Host calls the bundled core, and the MCP and Skill entry points can be used independently."
---

## What does mcp-server-fanqie do?

mcp-server-fanqie is a DSH plugin that brings Fanqie novel search, website-visible chapter reading and personal reading data into the sidebar. It helps readers find a book, inspect its chapter directory and read without leaving DeepSeek Harness. After official QR-code login, users can also view their own bookshelf and saved highlights.

The repository provides MCP, an independent Skill, a CLI and a local HTTP API alongside the graphical plugin. These entry points share a local data core that accesses official Fanqie services. The Harness package is named `dsh-fanqie-reader`; it is separate from the older MCP npm package. Current queries no longer depend on the third-party server used by version 0.1.x, but they still require internet access.

## mcp-server-fanqie core features

- **Fanqie novel search:** Search from the sidebar and inspect book covers and chapter directories before opening a chapter. Public novel search does not require personal account login.
- **Website chapter reading:** Read text available through the official website. The project does not guarantee the same chapter coverage as the mobile app and reports locked content or unsupported font decoding.
- **Personal bookshelf and highlights:** Use your own authorized session to view your bookshelf and saved passages. The shared account core also retrieves available cloud reading positions and distinguishes highlights from ordinary bookmarks.
- **Conversation tools:** The Harness plugin registers seven `fanqie_*` tools alongside its graphical interface. These are distinct from the MCP server’s 22 registered tools, so the two tool lists should not be treated as interchangeable.
- **Independent access options:** MCP and Skill expose book details, paginated directories and whole-book reviews through their documented methods. Their broader capability table does not establish identical media support for the sidebar plugin.

## How to install and use mcp-server-fanqie

The README provides a local bundle installation procedure, not a DSH shell installation command. The current plugin is unpublished on npm, and the historical `0.2.0-dev.6` release does not include it.

1. Clone or download the current `fysh1010/mcp-server-fanqie` repository. Keep the complete `plugins/deepseek-harness/` directory, including `vendor/`.
2. Use a Harness desktop version with plugin support. The README records desktop validation with `0.2.1-rc.5`.
3. Select that directory in the plugin management page. Alternatively, ask the agent to install its absolute path using `plugin_manager install_bundle`.
4. Refresh or restart Harness as needed. Open the right sidebar’s `+` start page and choose `番茄阅读`.
5. Search for a novel, browse its directory and open a website-visible chapter. To access personal data, open `我的` and complete the official QR-code flow on your phone.

The plugin Host runs the bundled core; no separate API startup is necessary. Account credentials use local storage by default. The core supports `FANQIE_ACCOUNT_DIR` for a custom location, although the default path can vary with packaging. The repository’s plugin documentation contains further installation and removal details.

## How to troubleshoot mcp-server-fanqie

- If the sidebar entry is missing, confirm that you installed the current source bundle with `vendor/`, rather than the old npm package or historical release. Check the active DSH profile and plugin enablement, then restart and inspect versions and logs.
- If a chapter fails, check whether it is visible on the official website. Locked chapters, unknown fonts and residual garbling are documented limits; an app-visible chapter is not evidence of website availability.
- If requests are rate-limited, follow the returned waiting time. Public requests retry network interruptions or HTTP 502/503/504 once; account requests are not automatically retried.
- If MCP or Skill category search or book reviews fail, the shared anonymous example device may have expired. The core supports paired `FANQIE_DEVICE_ID` and `FANQIE_INSTALL_ID` settings; these are separate from personal QR-code login.
- When reading paginated highlights through the account methods, continue until `has_more=false`. An empty highlights page can still have a next page because upstream pagination also counts other bookmark records.
