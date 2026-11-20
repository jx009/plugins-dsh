---
title: "launch-wechat-miniprogram: DSH Mini App Launch"
description: "launch-wechat-miniprogram is a DSH plugin for launching WeChat Mini Programs. Learn how to install, configure, and troubleshoot the skill."
summary: "Turn a first app idea into a testable release plan, with clear decisions about what to build, which devices to test, and what to verify before submitting for review."
highlights:
  - "Three native UI directions before prototyping"
  - "AppID and filing preparation"
  - "Optional Tencent Cloud backend planning"
  - "Read-only project artifact validation"
  - "Trial build and review readiness checks"
faq:
  - q: "How do I install launch-wechat-miniprogram without an npm package?"
    a: "Ask a coding agent that supports Agent Skills to install the repository root into your user Skills directory. The README does not provide a DeepSeek Harness CLI install command or a confirmed npm package name."
  - q: "Can I use launch-wechat-miniprogram before I have an AppID?"
    a: "Yes. You can start by defining what the first release should do and choosing a UI direction; AppID setup comes later, during environment preparation."
  - q: "Does launch-wechat-miniprogram require Tencent Cloud?"
    a: "No. The skill uses questions such as whether users need their data after switching phones to decide whether an online backend is worth considering."
  - q: "Can launch-wechat-miniprogram update an existing WeChat Mini Program?"
    a: "Yes. It inventories the existing pages, navigation, components, and backend before proposing changes, and preserves the current design conventions for targeted updates."
  - q: "Does launch-wechat-miniprogram submit my app for WeChat review?"
    a: "No. It helps you check that reviewers can reach the relevant screens and that declared privacy practices match the interfaces used. You submit the app and publish it yourself on the official platform."
---

## What does launch-wechat-miniprogram do?

launch-wechat-miniprogram is a DSH plugin packaged as an Agent Skill that guides first-time WeChat Mini Program developers from an idea to release and later updates. It splits the work into design, environment preparation, development, and release. The agent asks you to confirm the requirements, first-release scope, and design before it starts writing application code.

The skill covers WeChat Mini Programs only. It helps you prepare for account setup, filing, testing, and review, but you handle identity verification, QR scans, review submission, and production publishing on the official platform.

## launch-wechat-miniprogram core features

- **Three native UI directions.** Compare a WeUI-inspired option, a TDesign MiniProgram option, and a more distinctive design. Once you choose, the skill maps the design to implementable components and accounts for the WeChat capsule, safe areas, and bottom navigation before creating a high-fidelity prototype.
- **AppID and backend planning.** Prepare the account, developer tools, and filing steps. Consider Tencent Cloud only when features such as shared data or file uploads call for a backend, and confirm costs and extra setup before proceeding.
- **Static validation and device testing.** A read-only script checks project configuration, missing pages, subpackages, local components, and native `tabBar` PNG assets. The skill tracks that evidence separately from simulator, physical-device, trial-build, and production results.
- **Review and release preparation.** Check reviewer access, test accounts, and privacy declarations before submission. With your approval, the skill keeps decisions, test results, version changes, and release checks under `docs/miniapp/`.

## How to install and use launch-wechat-miniprogram

No DeepSeek Harness CLI install command is documented. The README describes installing the project through a coding agent that supports Agent Skills.

1. Give the agent `https://github.com/niuhuoshan/launch-wechat-miniprogram` and ask it to use its Skill installer if one is available. Install the entire repository root in your user Skills directory, not in your application project.
2. Confirm that the entry point is `<Skills directory>/launch-wechat-miniprogram/SKILL.md`. If a copy already exists, check its version and source before replacing it. The `agents/openai.yaml` file is optional interface metadata for Codex.
3. In a compatible agent, invoke the skill with `$launch-wechat-miniprogram`. Describe what people should be able to do in your app, who needs to see the data, and what the first release must accomplish.
4. Confirm the scope and choose a design. Work through AppID and tool setup during environment preparation. If you approve creating project records, keep non-secret identifiers and decisions in `docs/miniapp/`, but leave passwords, verification codes, and AppSecret values out.

## How to troubleshoot launch-wechat-miniprogram

- If the skill is not discovered, check that `SKILL.md` is directly inside the installed skill folder rather than an extra nested copy. If using DSH, confirm the active profile and that the skill is enabled, then restart and check the version and logs if it still does not appear.
- If you need to verify the installation and Python is available, run `python scripts/validate_skill.py .` from the skill directory. For an existing app, run `python scripts/validate_miniprogram_artifacts.py <project-root>` to check the project's static artifacts without changing them.
- If validation passes but the app looks or behaves differently from the HTML prototype, check it in WeChat Developer Tools and test on physical Android and iPhone devices. A static pass does not establish that a trial build or production release works.
