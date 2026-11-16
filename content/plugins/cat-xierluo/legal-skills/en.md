---
title: "legal-skills: Legal Research Skills for DSH"
description: "legal-skills is a DSH plugin collection for legal work. Learn how to install its skills, prepare OCR workflows and check version issues."
summary: "Bring legal research materials, OCR, transcription and drafting skills into an agent workflow. Install individual skills or choose a curated expert suite."
highlights:
  - "WeChat articles to Markdown"
  - "Legal OCR and document conversion"
  - "Local and cloud audio transcription"
  - "Litigation analysis and drafting suites"
  - "Contract review and business counsel"
faq:
  - q: "How do I install legal-skills in DeepSeek Harness?"
    a: "The README describes downloading a skill ZIP from GitHub Releases and copying its complete extracted folder into the agent's skills directory. It does not provide a DSH installation command or a verified DSH directory, so confirm the host's skill-loading instructions before choosing a destination."
  - q: "Can legal-skills convert scanned legal documents to Markdown?"
    a: "The legal-ocr skill supports PDF, image, Office document and URL conversion to Markdown. It also offers conservative adjustments to legal terminology and document structure."
  - q: "Does legal-skills support local audio transcription?"
    a: "The local-asr skill provides local speech recognition with timestamps and speaker information in Markdown output. The README identifies MOSS-MLX as the default on Apple Silicon and retains a FunASR pipeline."
  - q: "Do legal-skills expert suites run their skills automatically?"
    a: "No. Expert suites package selected skills with documentation; cross-skill execution still requires a separately arranged workflow."
  - q: "Can I use legal-skills commercially?"
    a: "Licensing varies by skill: the README lists both MIT and CC-BY-NC components. Check each selected skill's license; commercial use of the noncommercial components requires authorization from the author."
---

## What does legal-skills do?

legal-skills is a DSH plugin collection of AI agent skills for legal research, document preparation and professional writing. The repository distributes agent skills rather than a documented native DeepSeek Harness package; its README does not establish DSH-specific compatibility or an installation command. It is relevant to legal practitioners who want reusable capabilities for collecting materials, processing documents and preparing legal work products.

The collection reflects two parts of legal practice: working on matters and producing professional content. Its scope includes litigation analysis, contract work, intellectual property and research materials. You can select a single capability or download an expert suite organized around a particular legal or skill-development task.

## legal-skills core features

- **WeChat article collection:** `wechat-article-fetch` uses headless Playwright to capture public-account articles, including dynamically loaded content, and save them as Markdown for research and writing.
- **Legal OCR:** `legal-ocr` converts PDFs, images, Office documents and URLs to Markdown. For legal materials, it supports conservative improvements to terminology and document structure.
- **Audio transcription:** `local-asr` produces Markdown with timestamps and speaker information. `tingwu-asr` uses Alibaba Cloud Tongyi Tingwu for cloud transcription, with speaker separation and AI summaries.
- **Legal practice suites:** Curated groups cover litigation analysis and drafting, contract review and small-business counsel, and intellectual-property practice. Each suite has its own scope and dependency documentation.
- **Complete skill distribution:** Release ZIPs contain full skill directories. Suite downloads expand the repository's shared-source symbolic links, allowing the same capability to be distributed in multiple curated groups.

## How to install and use legal-skills

No DSH installation command or confirmed npm package name is supplied. Use the documented skill-download route after checking how your host loads agent skills; the README's `~/.claude/skills/` example belongs to another agent and does not identify a DSH configuration path.

1. Open the repository's GitHub Releases page at `https://github.com/cat-xierluo/legal-skills/releases/latest`. Choose the published ZIP for the skill you need. The README recommends individual downloads, which do not require Git.
2. Extract the archive and keep the complete skill folder. Copy that folder into the skills root documented by your agent platform.
3. For a suite, download its `suite-<id>-<version>.zip`, read the included README, and copy the member folders under `skills/*` into that root. Review dependencies and check overlapping members before replacing existing files.
4. Read the selected skill's own instructions for setup and usage. The supplied repository excerpt does not define a shared configuration file, universal credentials or a common invocation command.
5. Match the skill to the task: use article collection for a research source, OCR for a scanned document, or transcription for a recording. A suite supplies capabilities and guidance; it does not automatically chain its members together.

Check licenses before selecting skills for commercial work. The collection includes MIT components and CC-BY-NC components, with commercial authorization handled separately for the latter.

## How to troubleshoot legal-skills

Start with package identity and version. The README distinguishes current source versions from published ZIP versions, so a newer changelog does not mean the downloaded archive contains that update. Compare your archive with the download column and any pending-release notes.

If installing several suites changes behavior, inspect shared members for version overlap. The project specifically advises avoiding replacement of newer skills with older copies. When using a suite archive, check that you copied the complete extracted skill directories.

For host-loading problems, use general checks: confirm the intended DSH profile, verify that the relevant skill-loading capability is enabled, restart the host, and inspect its version and logs. No DSH-specific error codes or repair commands are documented in the supplied README. For dependency or configuration details, return to the individual skill or suite instructions.
