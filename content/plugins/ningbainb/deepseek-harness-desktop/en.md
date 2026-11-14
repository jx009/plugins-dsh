---
title: "deepseek-harness-desktop: DSH Desktop GUI"
description: "deepseek-harness-desktop is a DSH plugin host and desktop GUI. Learn how to install it, configure models and Skills, and troubleshoot setup."
summary: "Run a community-maintained Harness desktop workspace with bundled runtime, model configuration, Skills, plugins, Git and scheduled agent tasks. Windows is supported, with macOS and Linux Preview builds."
highlights:
  - "Bundled Node.js and DSH runtime"
  - "Unified Skills and plugin management"
  - "Claude Code and Codex project import"
  - "Agent Team and model coordination"
  - "Task boards and scheduled execution"
faq:
  - q: "How do I install deepseek-harness-desktop for DeepSeek Harness?"
    a: "Download the installer for your platform from the repository’s GitHub Releases. The application bundles Node.js and DSH; Windows also includes Git, while macOS and Linux require system Git for Git operations."
  - q: "Does deepseek-harness-desktop support Windows, macOS and Linux?"
    a: "The README lists Windows 10 and 11 x64 support, macOS 13+ Apple Silicon arm64 Preview, and Linux x64 Preview. All three builds are unsigned, and the macOS build is not notarized."
  - q: "Is deepseek-harness-desktop an official DeepSeek app?"
    a: "It is a community-maintained desktop client under the BSD-3-Clause license. It uses the public official runtime and web interface while keeping its application identity, data directories and update sources separate from a future official desktop product."
  - q: "Where does deepseek-harness-desktop find Skills?"
    a: "It scans project `.dsh/skills`, user DSH Skills and user Agents Skills. The conversation skill menu and skill center use the same discovery sources and scopes."
  - q: "Can deepseek-harness-desktop import Codex or Claude Code projects?"
    a: "It discovers projects and historical conversations in read-only mode and lets you preview them before importing into a Harness workspace. Sensitive information is redacted, and historical tool calls are not executed again."
---

## What does deepseek-harness-desktop do?

 deepseek-harness-desktop is a DSH plugin host and desktop GUI that brings DeepSeek Harness into a community-maintained coding workspace. It gives developers a graphical place to manage conversations, project files, models and extensions, with Node.js and the runtime included in the installer. Windows packages also include Git.

The project is an independent desktop client, distributed under BSD-3-Clause. Its application identity, data directories and update sources remain separate from a future official desktop product. Windows 10/11 x64 is supported; macOS 13+ Apple Silicon arm64 and Linux x64 are available as Preview builds.

## deepseek-harness-desktop core features

- **Skills and plugins:** Discover extensions through the desktop workspace and configure plugins through their details pages. The conversation skill menu and skill center share project and user skill sources.
- **Claude Code and Codex import:** Find existing projects and historical conversations without modifying their sources, then preview an import into a Harness workspace. Sensitive information is redacted, and past tool calls are not replayed.
- **Agent Team and model coordination:** Open the collaboration page from the conversation sidebar. Multi-role teamwork and the mode that separates controller and execution models can run independently or together.
- **Task boards and scheduling:** Move work through planning, pending, running and completed or failed states. Tasks can run through actual agent sessions with Task Run and Evidence records; scheduled tasks support recurring work.
- **Coding workspace and usage tracking:** Browse and edit files, perform Git operations and preview formats including Markdown, Diff and PDF. The usage dashboard displays tokens, context, cache, request duration and costs.

## How to install and use deepseek-harness-desktop

The supplied README provides desktop installers rather than a DSH installation command, and no npm package name is confirmed. Start with the repository’s GitHub Releases and choose the installer matching your operating system and architecture.

1. Install the desktop application and launch it. You do not need to prepare Node.js or the runtime separately. On macOS and Linux, install system Git if you plan to use Git operations.
2. Configure a model through the model entry or model settings. The application supports bai authorization and independent third-party API connections. Installing the client does not itself authorize model access.
3. Open a project workspace, or preview a Claude Code or Codex project import before accepting it.
4. Search for Skills from the conversation input. Project skills belong in `.dsh/skills`; user DSH Skills and Agents Skills are also scanned. The skill marketplace requires confirmation on first activation.
5. Open the plugin center to find extensions and their configuration details. For model coordination, use the sidebar’s collaboration entry; for repeat work, use the task board and scheduling capabilities.

## How to troubleshoot deepseek-harness-desktop

If an extension is missing, confirm the active profile and that the plugin is enabled, then restart DSH. For missing project skills, check `.dsh/skills` and compare the source and scope shown in the skill center. Record the desktop version and relevant logs if the problem continues.

If bai authorization is absent or its key has expired, follow the browser login guidance. The documented flow does not automatically purchase credit or resend messages.

For downloads, compare the package against the SHA-256 information from the same release. Builds are unsigned, and macOS builds are not notarized. Back up important data before upgrading. Users of a local 5.1.0 test build must manually install the official package; same-version automatic updating is not promised.

If Git operations fail on macOS or Linux, check that system Git is installed. The README also notes that repeated Computer Use startup failures trigger safe mode; Browser Use and Computer Use are disabled by default.
