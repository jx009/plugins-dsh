---
title: "iosdev: iOS Release Guidance for DSH"
description: "iosdev is an iOS development skill for China-region releases. Learn its documented setup, App Store Connect workflow and troubleshooting limits."
summary: "Get structured guidance for iOS development, signing, testing and China-region App Store submission. The documented setup targets Codex; DSH installation is not specified."
highlights:
  - "China-region App Store release guidance"
  - "Build and signing reference materials"
  - "Subscription and IAP testing"
  - "Privacy and ATS configuration guidance"
  - "Keyword-triggered development skill"
faq:
  - q: "How do I install iosdev?"
    a: "The README says to copy the repository directory into `~/.codex/skills/helloagents/`, or use the distributed `iosdev-cn.skill` package. These are the documented skill installation options; no DSH installation command is provided."
  - q: "How do I use iosdev after installation?"
    a: "Enter `iosdev` in Codex to invoke the skill. The repository's `SKILL.md` describes its trigger and output structure."
  - q: "Does iosdev cover App Store Connect submission in China?"
    a: "Yes, the skill addresses the China-region iOS development and release process, including App Store Connect submission and review. Its reference materials include release checklists and review considerations."
  - q: "Can iosdev help with subscriptions and IAP testing?"
    a: "Yes, subscription and in-app purchase setup and testing are included in its scope. Related guidance is organized in the `references/` directory."
  - q: "Where can I find iosdev privacy and ATS guidance?"
    a: "The `references/` directory contains material on privacy, ATS and security compliance. The README describes configuration recommendations, not an automated compliance checker."
---

## What does iosdev do?

iosdev is an iOS App development and release skill focused on the China region. It helps developers organize the work between development, building, signing, testing and App Store Connect submission, with supporting guidance for review preparation. The repository describes reusable skill content rather than a standalone build or publishing application.

For developers browsing the DSH plugin catalog, this is relevant as an agent skill for iOS work. However, the documented installation and invocation target Codex, not DeepSeek Harness. The README does not establish a native harness installation method, so its Codex instructions should not be treated as a verified DSH setup procedure.

The repository separates the skill definition from topic-specific references. That gives developers a starting point for understanding how to invoke the skill and where to look for release-related information without assuming that the skill performs those operations automatically.

## iosdev core features

- **Development-to-release guidance:** Covers the stages from App development through build, signing and testing to store submission. Its focus is helping developers structure the process and prepare the necessary checks.
- **Build and signing references:** Includes reference material for builds, signing, dependencies and version-number management. These topics are grouped in the repository's `references/` directory.
- **China-region review preparation:** Provides pre-release checklists and review considerations for the China-region release workflow. App Store Connect submission is part of the documented scope.
- **Subscriptions and IAP:** Covers subscription and in-app purchase creation, configuration and testing. This gives developers a reference area for purchase-related release preparation.
- **Privacy and ATS:** Includes privacy, ATS configuration recommendations and security compliance material. These are guidance resources; the README does not describe automatic validation or certification.

## How to install and use iosdev

No DSH installation command is documented, and no npm package name has been confirmed. Consequently, there is no supported package-manager command to provide here. The README instead gives the following Codex-oriented setup options.

1. Copy the repository directory into `~/.codex/skills/helloagents/`. This is the destination named in the documentation, not a DeepSeek Harness configuration path.
2. Alternatively, use `iosdev-cn.skill`, the distributable skill package. The README identifies this option but does not provide a detailed package-import procedure.
3. In Codex, enter the trigger word `iosdev` to invoke the installed skill.
4. Consult `SKILL.md` for the trigger definition and output structure. Use `references/` for the relevant build, review, purchase or privacy topic.

For example, when preparing a release, the documented materials cover signing and version management as well as submission checks. If the App includes subscriptions, the IAP references are also relevant. The README does not specify additional trigger syntax, configuration keys or service credentials, so none are required by these instructions.

## How to troubleshoot iosdev

The README lists no specific error messages or repair procedures. Start with the documented setup rather than assuming that a missing invocation indicates a signing or App Store issue.

- Confirm that you are testing the documented Codex workflow and using the exact trigger `iosdev`.
- Check the destination directory and inspect `SKILL.md` when verifying the installed skill content.
- Distinguish invocation problems from questions about building, signing or review; the latter have separate reference topics.
- If working through a separate DSH integration, check its profile name, whether the skill or plugin is enabled, and the application version and logs; then restart the harness. These are general checks, not repository-specific fixes or evidence of native compatibility.

There are no documented error codes, supported operating-system guarantees or automated publishing commands to rely on.
