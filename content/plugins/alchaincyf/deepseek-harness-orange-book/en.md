---
title: "deepseek-harness-orange-book: DSH field guide"
description: "A Chinese-language field guide to DeepSeek Harness. Learn how to download it, read the startup configuration, and troubleshoot PDF preview issues."
summary: "See what DSH loads at startup, when it asks for approval, and how it uses tools. Follow the author's tests through configuration snapshots and original session logs."
highlights:
  - "Full system prompt and 129-line startup manifest"
  - "Three unedited session logs"
  - "PTC tool orchestration and cost breakdown"
  - "Tool creation and persistence after restart"
  - "Free PDF, EPUB, and standalone HTML"
faq:
  - q: "How do I install deepseek-harness-orange-book in DSH?"
    a: "You don't install the book as a DSH plugin. Open one of the reading formats from the repository's download table or read individual chapters in WorkBuddy."
  - q: "Is deepseek-harness-orange-book available in English?"
    a: "The README includes an English summary, but the full book is available only in Chinese. The PDF, EPUB, and HTML downloads are all Chinese editions."
  - q: "Which DSH version does deepseek-harness-orange-book cover?"
    a: "Edition `v261020` was retested on the `0.2.1-rc.2` preview release. Sections marked August describe the earlier tests, so check the date before comparing a result with your setup."
  - q: "Does deepseek-harness-orange-book include a PTC cost example?"
    a: "Yes. The Programmatic Tool Calling example coordinates 15 operations in five model turns, yet fixed overhead rises by 9% in that test."
  - q: "Why won't the deepseek-harness-orange-book PDF display fully on GitHub?"
    a: "The README warns that GitHub's preview may not render the whole PDF. Download the file and open it locally, or use the standalone HTML edition."
---

## What does deepseek-harness-orange-book do?

`deepseek-harness-orange-book` is a Chinese-language field guide to DeepSeek Harness, not an installable DSH plugin. It follows the author's first runs on a local machine and shows what the harness loads, when it asks for permission, and what a task costs. The October edition revisits those experiments in a fresh, isolated directory using the `0.2.1-rc.2` preview release.

If you're new to the harness, start with the chapters on completing a first task, file permissions, and operating modes. If you're deciding whether to migrate from Claude Code, use the appendix to distinguish what carried over in the author's tests from what required extra setup or didn't transfer. The book also explains how skills, MCP, and plugins fit together, including what happens when two plugins compete to handle file editing.

## deepseek-harness-orange-book core features

- **System prompt and startup manifest.** Read the full prompt captured during testing and the 129-line default startup configuration. A separate inventory identifies 35 npm extension packages that weren't bundled with the tested installation.
- **Original session logs.** Compare unedited runs from standard mode, Programmatic Tool Calling (PTC), and creation mode. The logs let you follow the order of events rather than relying on the book's summary of each run.
- **PTC cost breakdown.** Follow how the model wrote a program to coordinate several tool operations. The accompanying bill shows why fewer model turns didn't mean lower fixed overhead in that run.
- **Tool creation and approval.** Follow the `count_chinese` experiment from tool creation to installation approval. The October run packaged the tool as a plugin and verified that it remained available after a restart, unlike the August test.

## How to install and use deepseek-harness-orange-book

There's no installation command or profile setting for the book itself. Use the repository's download table to choose a format, or open the WorkBuddy edition to read chapter by chapter.

1. Download the PDF for local reading, the EPUB optimized for WeRead, or the standalone HTML file with images embedded. The README's English summary is an overview, not a translation of the book.
2. Start with the first-task walkthrough if you're setting up the harness. If you just need to look up a command or a migration detail, go straight to the appendix.
3. To compare your startup configuration with the book's snapshot, run `dsh --profile web --dump-default-config` in your existing DSH setup. This command exports the default configuration for the `web` profile; it does not install anything.
4. To use the book as agent context, pick the relevant chapter in WorkBuddy and share that chapter's URL with your agent. Each chapter has its own web page.

## How to troubleshoot deepseek-harness-orange-book

If the PDF looks incomplete in GitHub's preview, download it and open it locally. The standalone HTML file is another way to read the illustrated edition without relying on the PDF preview.

If your startup output or session behavior doesn't match the book, check your DSH version and the profile you used before comparing details. The October tests use a preview release, while passages marked August describe earlier behavior. Use your local configuration output and session logs as the reference for what actually happened on your machine.
