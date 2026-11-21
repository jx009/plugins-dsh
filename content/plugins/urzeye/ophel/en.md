---
title: "ophel: AI Chat Organization for DSH Users"
description: "ophel is a browser tool for outlining, organizing, and exporting AI chats. Learn how to install it, configure site support, and troubleshoot setup."
summary: "Jump back to the right passage in a long ChatGPT, Claude, or DeepSeek thread, group related chats into folders, and save prompts for your next session."
highlights:
  - "Searchable outlines for long chats"
  - "Conversation folders and tags"
  - "Reusable prompt templates with variables"
  - "Markdown, JSON, and plain text exports"
  - "Installable site adapter packs"
faq:
  - q: "Can I install ophel as a DeepSeek Harness plugin?"
    a: "The available README does not document a native DSH plugin installation command. It lists browser extensions and userscript distributions, so use one of those routes for the documented browser features."
  - q: "Does ophel work with ChatGPT and Claude?"
    a: "Yes, both are listed as supported sites. Gemini, Google AI Studio, Grok, and the DeepSeek chat website are also listed."
  - q: "How do I search chats by folder or tag in ophel?"
    a: "Use Global Search with a `folder:` or `tag:` filter to narrow the results. A `date:` filter is also available when you need to search by date."
  - q: "Can ophel export part of a conversation as Markdown?"
    a: "Yes, ophel supports Markdown and segmented exports. Use the segmented option when you want to keep a specific part of a thread rather than the entire exchange."
  - q: "Can ophel reuse the same prompt with different inputs?"
    a: "Yes, the Prompt Library supports templates with variables. Save the wording you want to keep and change the variable values when you use the template for a new task."
---

## What does ophel do?

ophel is a browser-based AI chat organizer for DeepSeek Harness users who also work on supported chat websites. Published as Ophel Atlas, it gives long threads a searchable outline, lets you group conversations, and helps you keep prompts and useful answers for later. The available README documents browser installations, not a native DSH plugin setup.

If you use ChatGPT for drafts, Claude for reviews, or DeepSeek for research, the organization tools serve the same purpose: finding the right part of a conversation without scrolling through every turn. For example, you can bookmark an important decision in a long thread, file the chat with related work, and export just the passage you need for your notes.

## ophel core features

- **Smart Outline.** Turn a thread into a table of contents you can search and collapse by level. Use anchors to jump to a section and bookmarks to mark passages you plan to revisit.
- **Chat folders and tags.** Group related conversations into folders and use tags to label topics that span several projects. The chat manager supports syncing from source sites, so you can organize existing threads rather than starting over.
- **Global Search.** Look across chats, outlines, prompts, and settings from one search interface. Add `folder:`, `tag:`, or `date:` filters when a text query returns too many results.
- **Prompt Library.** Save frequently used instructions as categorized templates and use variables for details that change each time. Insert a saved prompt into the chat, or use a prompt chain to send a sequence of prompts in order.
- **Conversation export.** Save chats as Markdown, JSON, or plain text. Export a segment when you only need one part of the discussion, or use a ZIP package when you need to include images and attachments.

## How to install and use ophel

No DeepSeek Harness installation command appears in the available README. For the documented setup, install the browser extension from the Chrome Web Store, Edge Add-ons, or Firefox Add-ons. If you use a userscript manager instead, the project lists distributions on Greasy Fork and ScriptCat.

1. Open a supported AI chat website and load an existing conversation. A thread with several turns makes it easier to see how the outline is structured.
2. Use Smart Outline to jump to a passage, then bookmark it if you expect to return to it. For organization across threads, use the Chats area to assign folders and tags.
3. Open the Prompt Library to save a prompt you expect to reuse. Add variables for inputs that change, such as a topic or a target audience, then insert the template when you need it.
4. To add support beyond the built-in adapters, look in `Site Packs` for a pack that covers your site. That is the documented place to configure additional site support.

## How to troubleshoot ophel

- If the outline or chat controls do not appear, check that the extension is enabled in the browser profile you are using. Reload the chat page and try an existing conversation on a supported site.
- If the problem only affects one website, check whether that site has a built-in adapter or requires a pack from `Site Packs`. Testing a second supported site can help you tell whether the issue is site-specific.
- If the issue persists, note the browser version, installed extension or userscript version, and affected site. Check any available logs before reporting what you expected to see and what happened instead.
