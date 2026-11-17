---
title: "DSHBox: Manage DSH Versions and Plugins"
description: "DSHBox is a desktop manager for DSH versions, plugins and isolated environments. Learn how to install it, create containers and check task logs."
summary: "Run separate DeepSeek Harness environments with their own versions, profiles and workspaces. Import extensions, reuse templates and follow installation tasks from a desktop window."
highlights:
  - "Isolated DSH versions and profiles"
  - "Embedded WebView for the DSH UI"
  - "Plugin and skill bundles"
  - "Reusable Boxfile templates"
  - "Queued tasks with live logs"
faq:
  - q: "How do I install DSHBox for DeepSeek Harness?"
    a: "Download the platform installer from the repository’s Releases page: Windows x64 MSI, Linux x64 DEB or macOS arm64 DMG. Windows includes its runtime tools; Linux requires system Git."
  - q: "Can DSHBox run multiple DSH versions separately?"
    a: "Yes. Each container has its own DSH version, profile, workspace and host process, with separate plugins, skills and logs."
  - q: "How do I share plugins and skills with DSHBox?"
    a: "Use Resources to group plugins and skills into a bundle. Quick export retains URLs, while full export packages the bundle into one archive."
  - q: "Why does DSHBox show an older server after updating?"
    a: "The background service can remain running from the previous build, and the app deliberately keeps it to avoid interrupting work. Restart the service through the tray menu when convenient to enable features that require the newer server."
  - q: "Does closing DSHBox stop installation tasks?"
    a: "Closing the app minimizes it to the system tray. The dshboxd background service continues its work, including installation and rebuild tasks."
---

## What does DSHBox do?

DSHBox is a desktop manager for DeepSeek Harness versions, isolated environments and extensions. It helps developers maintain separate setups for different projects without sharing one profile or workspace. Although relevant to DSH plugin users, the application itself is a Tauri 2 desktop shell installed through a platform installer.

Each managed container has its own Harness version, profile, plugins, skills, workspace, logs and host process. The UI opens inside an embedded WebView, so you can work in a desktop window without copying a local URL into a browser. English and Simplified Chinese interfaces are available.

## DSHBox core features

- **Version manager and isolated containers**: Install a Harness tag and pin a version for each container. Host mode is the default; experimental VM mode supports a WSL2 distribution per container on Windows or a libkrun microVM on Linux.
- **Plugin and skill bundles**: Import extensions through Resources and collect them into shareable bundles. Quick export retains source URLs, while full export produces a single archive.
- **Boxfile templates**: Describe reusable environments with `FROM` and `ADD`, then build a template for repeated container creation. Template payloads are materialized so containers do not depend on mutable external payloads.
- **Queued tasks and live logs**: Installation and build tasks expose their stages, progress bars, elapsed time and time budgets. Tasks support cancellation, logs and history, helping you inspect long-running preparation work.
- **Resources and agent access**: Extract or inject named copies of conversations, keys and plugin state, and edit YAML by key path. The CLI supports document-based configuration with `dshbox apply -f` and JSON responses; the `dsh-box-sandbox` plugin provides typed `box_*` tools to an agent inside a container.

## How to install and use DSHBox

Install DSHBox using a release artifact from `https://github.com/Nexus-Aethra/DSHBox/releases`. The supplied README does not provide a DSH installation command or an npm package name for the desktop application.

1. Choose the installer matching your platform: Windows x64 `.msi`, Debian/Ubuntu Linux x64 `.deb`, or Apple Silicon macOS `.dmg`. Windows bundles Node, npm, pnpm and Git. On Linux, install system Git with `apt install git` or your distribution’s equivalent.
2. Launch the application and select a writable runtime directory. This directory holds the managed DSH data.
3. Open `Resources` → `DSH Versions`, select `Load versions`, and install your chosen tag.
4. Open `Resources` → `Templates`. Pull an official template or build one from a Boxfile.
5. Create a container from the template under `Container`, supplying its name and profile. Initial creation prepares dependencies, local plugins and the frontend in the final container directory.
6. Press `Start` to launch the prepared environment and open its UI. Return to `Resources` to import plugins or skills, assemble bundles and create reusable templates.

## How to troubleshoot DSHBox

If setup cannot proceed, first confirm that the runtime directory is writable. On Linux, check that system Git is installed. Builds use isolated Git configuration rather than reading the host’s `~/.gitconfig`.

For a slow install or build, inspect the current task stage, elapsed time, budget and logs. These indicators help distinguish an active lengthy step from a task that needs investigation. For fetching problems, review the documented GitHub mirror, npm registry mirror and automatic proxy detection options; an optional GitHub API token is sent directly to `api.github.com`.

A topbar message showing different client and server builds means an older daemon is still running. Existing work is preserved. When convenient, restart `dshboxd` from the tray menu to make newer server features available.

For an environment or extension that appears missing, confirm the container and profile, check that the plugin is enabled, and review the relevant versions and logs. Restart the affected DSH environment as a general diagnostic step.
