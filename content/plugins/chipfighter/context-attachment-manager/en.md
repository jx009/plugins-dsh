---
title: "context-attachment-manager: DSH Image Context"
description: "Context Attachment Manager is a DSH plugin that replaces older chat images with references. Learn how to install, configure, and troubleshoot it."
summary: "Keep screenshots, scans, and keyframes available in long chats without resending every original on each turn. The agent can retrieve an earlier image by ID when it needs to look again."
highlights:
  - "Automatic placeholders for earlier images"
  - "Original image retrieval by ID"
  - "Image references survive chat compaction"
  - "Stable placeholders support prompt caching"
  - "Local storage for originals and history"
faq:
  - q: "How do I install context-attachment-manager in DeepSeek Harness?"
    a: "Follow the DeepSeek Harness instructions in the repository’s `INSTALL.md` under Other Agents, then restart DSH. The README does not provide a DSH install command, and the npm package name is unconfirmed."
  - q: "Does context-attachment-manager have a panel in DSH?"
    a: "The README lists the DeepSeek Harness adapter as auto-select only and says it has not been tested live. The documented image panel is available in Codex and Claude Desktop’s Code tab."
  - q: "Can context-attachment-manager recover an image after chat compaction?"
    a: "Yes. The plugin is designed to retain image references through compaction so the agent can fetch the original by its ID rather than rely on a description alone."
  - q: "Does context-attachment-manager delete or compress my original images?"
    a: "No. It changes what gets sent with later requests, not the original image files or saved chat history. When the agent fetches an image, it gets the original, not a smaller copy."
  - q: "Why does context-attachment-manager still reprocess part of a turn?"
    a: "When the plugin first replaces an image with a placeholder, the part of that turn after the change is processed again once. Later requests can reuse the unchanged prefix because the placeholder stays in place."
---

## What does context-attachment-manager do?

context-attachment-manager is a DSH plugin that keeps older images available in long chats without sending every original with each new message. It assigns images IDs such as `IMG-001` and substitutes short placeholders for older attachments in outgoing requests. When the agent needs to inspect a detail again, it can fetch the original using that ID.

This is useful when a conversation builds up screenshots from browser work, scans from a document review, or keyframes from an image or video project. The goal is to reduce what gets sent repeatedly, not to remove anything from the conversation you have saved. The repository lists a DeepSeek Harness adapter with automatic image selection, but the maintainers have not tested that adapter live. Codex and Claude Code are the tested hosts.

## context-attachment-manager core features

- **Automatic image placeholders.** Older images are represented by short references that can include a brief description and your comments. Those details help the agent tell similar screenshots or keyframes apart before fetching one.
- **Original image retrieval.** The agent can look up an earlier attachment by ID, including after chat compaction. It gets the original image rather than a thumbnail or a text summary.
- **Prompt caching.** Once written, a placeholder stays the same across later requests. Fetching an original adds it to the current turn rather than changing the earlier reference, so the unchanged prefix remains eligible for cache reuse.
- **Local attachment handling.** Original images and chat history stay on your computer. Requests still go to the service your agent already uses; local storage does not mean the model runs locally.

## How to install and use context-attachment-manager

The README does not give a DSH install command, and there is no confirmed npm package name for the marketplace command. Use the repository’s platform-specific instructions rather than substituting the repository name into an npm-based command.

1. Open `INSTALL.md` in the `chipfighter/context-attachment-manager` repository. Go to Other Agents and follow the setup for DeepSeek Harness. The README also suggests asking your agent to follow that file on your behalf.
2. Restart DSH after setup and open the profile where you installed the plugin. Automatic selection is enabled by default; the README does not document a separate DSH settings panel.
3. Start with a chat containing a few distinct images. On a later turn, ask the agent to inspect a specific detail in one of the earlier attachments. If you know its reference, include it in your request, such as `IMG-001`.

## How to troubleshoot context-attachment-manager

- **The plugin appears inactive.** Confirm that the active profile is the one where you installed it and that the plugin is enabled. Restart DSH, then check your version and startup logs if it still does not load.
- **An earlier image is not retrieved.** Try a short session with two distinct images and ask about one by its ID. Check the logs for what happened during that request. The adapter is listed but has not been tested live by the maintainers.
- **The image panel is missing.** The README documents the panel for Codex and Claude Desktop’s Code tab, not for DSH. Its absence does not tell you whether automatic selection is working.
