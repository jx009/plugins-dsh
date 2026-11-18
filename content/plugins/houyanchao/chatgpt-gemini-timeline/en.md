---
title: "chatgpt-gemini-timeline: DSH Chat Navigation"
description: "chatgpt-gemini-timeline is a DSH plugin companion via dsh-timeline. Learn how to install, use timeline navigation and troubleshoot setup."
summary: "Navigate long AI conversations, organize saved answers and reuse prompts. Browser users install Timeline; DeepSeek Harness users are directed to the separate native dsh-timeline plugin."
highlights:
  - "Question-by-question timeline navigation"
  - "Favorites organized into folders"
  - "Reusable prompt library"
  - "Conversation export and formula copying"
  - "Native DSH version: dsh-timeline"
faq:
  - q: "How do I install chatgpt-gemini-timeline in DeepSeek Harness?"
    a: "The README directs Harness users to the separate native dsh-timeline repository at https://github.com/houyanchao/dsh-timeline. It does not provide a DSH installation command or a confirmed npm package name for this repository."
  - q: "Is chatgpt-gemini-timeline a browser extension or a DSH plugin?"
    a: "This repository contains the Timeline browser extension for AI conversation pages. Its documented native DSH counterpart is dsh-timeline, which provides timeline navigation, folders, prompts, export and formula copying."
  - q: "Which browsers does chatgpt-gemini-timeline support?"
    a: "The README provides official store installation links for Chrome, Microsoft Edge and Firefox. For local development, Chrome and Edge can load the unpacked repository, while Firefox supports temporary loading through about:debugging."
  - q: "Does chatgpt-gemini-timeline sync favorites with Google Drive?"
    a: "The browser extension supports optional Google Drive backup and restoration after you authorize access. Core data is stored locally by default; the README does not establish that this backup feature is available in the native DSH version."
  - q: "Why are some chatgpt-gemini-timeline features missing on an AI website?"
    a: "Feature support varies by platform: for example, NotebookLM is listed without timeline navigation, and some sites lack sidebar favorites. Check the README support table and the extension's per-platform and per-feature settings before treating an absent control as a bug."
---

## What does chatgpt-gemini-timeline do?

chatgpt-gemini-timeline is a DSH plugin companion project for navigating and organizing AI conversations; its native DeepSeek Harness implementation is the separate dsh-timeline plugin. This repository itself contains the Timeline browser extension. It helps people revisit earlier questions, retain useful answers and reuse prompts without repeatedly scrolling through long conversations.

The distinction matters when choosing an installation route. Browser users install Timeline for supported AI websites. Harness users follow the README's referral to dsh-timeline, which is described as providing timeline navigation, favorites folders, a prompt library, conversation export and formula copying, with theme following. Browser-specific capabilities described below should not automatically be assumed to exist in the native version.

## chatgpt-gemini-timeline core features

- **Timeline navigation:** On supported browser pages, nodes on the right correspond to user questions. Click a node to jump back, or use keyboard navigation; question timestamps and a question list provide additional ways to revisit a conversation.
- **Favorites folders:** Save individual exchanges or an entire conversation, then organize them using folders, notes and search. Some platforms also expose favorites through their native sidebar.
- **Prompt library:** Keep frequently used prompts available alongside quick follow-up actions. Browser settings also offer input behavior controls, with availability depending on the platform.
- **Conversation export and formula copying:** Take useful material out of a chat rather than leaving it buried in the thread. The browser extension also recognizes LaTeX and MathML formulas and provides additional reading and code-block helpers.
- **Local data and Google Drive backup:** The browser version stores favorites, prompts and settings locally by default. JSON import/export and optional authorized Drive backup support migration and restoration; these are not documented here as native Harness features.

## How to install and use chatgpt-gemini-timeline

No DSH installation command or confirmed npm package name is supplied for this repository, so there is no verified command to copy from this page.

1. For Harness, open the native plugin repository at `https://github.com/houyanchao/dsh-timeline` and follow its installation instructions. Do not substitute the browser repository name into an npm-based command.
2. For browser use, choose the Chrome, Edge or Firefox store entry linked in the README. After installation, open a supported AI conversation page; most functions are enabled by default.
3. Open a longer conversation and use its timeline to revisit earlier questions. Save an exchange into a folder when you need to retain it beyond the current reading session.
4. Add reusable text to the prompt library. Adjust platform and feature switches in the browser extension's settings panel if you only need selected tools.
5. Before changing browsers, use the browser version's JSON export or authorized Google Drive backup to preserve extension data.

Developers can build browser resources once with `node scripts/build-content.js` or watch changes with `node scripts/build-content.js --watch`. These commands build extension assets; they do not install a Harness plugin.

## How to troubleshoot chatgpt-gemini-timeline

First identify whether the problem concerns the browser extension or dsh-timeline. Browser platform compatibility and build instructions do not establish native plugin behavior.

- Check whether the target website supports the missing feature and whether its platform or feature switch is disabled.
- After browser source changes, wait for a successful build, reload the extension and refresh the AI page. Watch mode does not perform those last two actions automatically.
- For a native Harness installation, use general checks: confirm the intended profile, verify the plugin is enabled, restart the application and inspect its version and logs.
- When reporting browser issues, include browser and extension versions, the AI platform, reproduction steps, expected and actual behavior, and screenshots.
