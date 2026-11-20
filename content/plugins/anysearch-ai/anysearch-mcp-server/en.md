---
title: "anysearch-mcp-server: Web Search for DSH"
description: "anysearch-mcp-server adds real-time web search to DSH. Learn how to install and configure the MCP connection and troubleshoot access errors."
summary: "Give your agent access to current web results, specialized searches, and page text in Markdown through one hosted MCP connection. You can try every search mode without an API key."
highlights:
  - "Real-time web search in natural language"
  - "Vertical search for finance, academia, and more"
  - "Parallel batch search in one call"
  - "URL content extraction as Markdown"
  - "Anonymous access without an API key"
faq:
  - q: "How do I install anysearch-mcp-server in DeepSeek Harness?"
    a: "Add `https://api.anysearch.com/mcp` as a remote MCP server using Streamable HTTP. The available README excerpt does not provide a DSH install command or confirm an npm package name."
  - q: "Can I use anysearch-mcp-server without an API key?"
    a: "Yes. Leave out the `Authorization` header to use anonymous access; all search features remain available, subject to per-IP rate limits and the daily free quota."
  - q: "How do I search multiple topics with anysearch-mcp-server?"
    a: "Give your agent a list of independent questions and ask it to run them as a parallel batch. For example, it can look up release dates for several projects in one call."
  - q: "Can anysearch-mcp-server turn a URL into Markdown?"
    a: "Yes. Give your agent the URL and ask it to extract the page body as Markdown rather than search for pages about the topic."
  - q: "Why does anysearch-mcp-server return HTTP 429?"
    a: "The request exceeded a rate limit. Wait for the delay in `Retry-After` or the response body before trying again."
---

## What does anysearch-mcp-server do?

anysearch-mcp-server is a DSH plugin that adds real-time web search and page content extraction through a hosted MCP server. It lets your agent look up current information when you have a question, or read the body of a specific page when you already have its URL.

Current DeepSeek Harness releases can connect directly over Streamable HTTP. You do not need an SSE or stdio proxy, and you can test the connection before creating an API key.

## anysearch-mcp-server core features

- **General web search:** Ask a question in plain language when you want results from the open web. For a first test, ask your agent to find the latest release notes for a project you follow.
- **Vertical domain search:** Narrow a structured query to a field such as finance, academic research, law, or code. Use this when the type of source matters more than broad coverage.
- **Parallel batch search:** Send several independent queries in a single call. For example, ask for the current documentation pages for three libraries without waiting for each lookup in turn.
- **URL content extraction:** Pass a specific URL to retrieve the page body as Markdown. This is useful when you already know which page you want and need its text rather than a list of search results.

## How to install and use anysearch-mcp-server

No DSH package-install command is documented in the available README excerpt. Set it up as a remote MCP connection instead.

1. Open the MCP configuration for the DSH profile you use. Check the documentation for your version if you are unsure where that profile stores its settings.
2. Add a server named `anysearch`, choose Streamable HTTP, and set the URL to `https://api.anysearch.com/mcp`. Add the header `X-Anysearch-Client` with the value `mcp/1.0.0`.
3. For anonymous access, leave out `Authorization` and keep the client header. To authenticate, set `Authorization` to `Bearer <your_api_key>` in private configuration, or inject the key from `ANYSEARCH_API_KEY` if your client supports it. Do not put the key in chat or shared project files.
4. Save your changes and restart DSH. Check that the server is enabled in the active profile, then ask your agent to perform one web search to verify that the tool is available.

## How to troubleshoot anysearch-mcp-server

- **The server does not appear:** Check that you edited the active profile and enabled the MCP entry. Confirm that your DSH version supports remote Streamable HTTP, restart the harness, and inspect its logs if the connection still fails.
- **HTTP `401` or `403`:** Check the bearer header and verify that the key is valid, enabled, and unexpired. The server does not switch to anonymous access when a supplied key fails. To test anonymously, remove only the authorization header.
- **HTTP `402`:** The quota is exhausted. Check the limits that apply to your account rather than relying on example quota values.
- **HTTP `429`:** You hit a rate limit. Use the delay in `Retry-After` or the retry time in the response body before sending another request. Anonymous requests are limited per client IP and count toward the daily free quota.
