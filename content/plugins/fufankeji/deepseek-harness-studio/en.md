---
title: "deepseek-harness-studio: DSH Plugin Manager"
description: "deepseek-harness-studio is a DSH plugin management desktop app. Learn how to install it, connect local models and troubleshoot plugin setup."
summary: "Manage projects, conversations and plugins from an Electron desktop workspace. Discover extensions with Agent recommendations, apply reusable Presets and connect local model services."
highlights:
  - "Plugin discovery and Agent recommendations"
  - "Verified plugin installation and recovery"
  - "Preset Square reusable workflows"
  - "Ollama, vLLM and SGLang connections"
  - "Workspace sessions and history navigation"
faq:
  - q: "How do I install deepseek-harness-studio for DeepSeek Harness?"
    a: "Get the desktop preview from the repository’s GitHub Releases, which provides a macOS arm64 ZIP and a Windows x64 installer. Studio is delivered as a desktop application; the supplied README does not provide a DSH plugin installation command for it."
  - q: "Can deepseek-harness-studio find plugins without an npm package name?"
    a: "Yes. Describe your goal in Plugin Discovery, and the current Agent receives a `/find-plugins` request to search the public directory. Recommendations include package information and matching reasons; installation still requires a separate check and confirmation."
  - q: "Does deepseek-harness-studio support Ollama and vLLM?"
    a: "Yes, its local model entry supports Ollama, vLLM, SGLang and custom OpenAI-compatible services. It also supports configuring DeepSeek and other compatible providers."
  - q: "Can deepseek-harness-studio install a plugin directly from GitHub source?"
    a: "No. A GitHub repository can be used to locate an already published npm package, but Studio does not install repository source directly. The selected package version must pass Bundle, integrity and runtime compatibility checks."
  - q: "Why can't I install deepseek-harness-studio Presets in browser development mode?"
    a: "Preset installation, deletion and use in new sessions depend on local files and the Host, so those actions run in Desktop. Browser development mode supports viewing and checking the interface without modifying local Presets."
---

## What does deepseek-harness-studio do?

deepseek-harness-studio is a DSH plugin management desktop application that brings the DeepSeek Harness workspace into Electron. It serves developers who want to open local projects, manage conversations and install extensions through a graphical interface. The desktop main process starts and manages the local `dsh web` service.

Studio combines Plugin Discovery, Plugin Center, Preset Square and model connections in one workspace. The supplied README documents Studio `0.1.0-rc.19` with Harness `0.1.1-rc.2`; these version numbers are maintained separately. Desktop previews are available for macOS arm64 and Windows x64.

## deepseek-harness-studio core features

- **Plugin discovery and recommendations:** Browse curated, recently updated and popular extensions, or search by name, capability or author. A natural-language request invokes `/find-plugins`, letting the Agent return candidates from the public directory with versions and matching reasons.
- **Verified installation and lifecycle management:** Plugin Center checks the selected version, permissions, compatibility, package integrity and Bundle declarations. Installed extensions can be enabled, disabled, updated or removed; incomplete transactions roll back automatically.
- **Preset Square workflows:** Inspect a Preset’s role, Skills, tools and prerequisites before installing it. Seven built-in workflows are maintained by the Studio team, and installed user Presets can be applied to new sessions, deleted and reinstalled.
- **Local models and vision:** Connect Ollama, vLLM, SGLang or a custom OpenAI-compatible service through a dedicated entry. Image support includes native DeepSeek vision models, verified alternative vision routes and persistent image attachments.
- **Workspace and conversation navigation:** Select a local directory, group and search sessions, rename or archive them, and Fork at the last completed turn. The history outline can load older messages and jump to their highlighted full text.

## How to install and use deepseek-harness-studio

No Studio npm package or DSH installation command is identified in the supplied material. Install the desktop application using the preview assets from this repository’s GitHub Releases.

1. Choose the macOS arm64 preview ZIP or Windows x64 setup executable for your machine. Releases are the documented distribution channel for desktop packages.
2. Launch Desktop and select your local project directory through the native directory picker. Use Workspace grouping to keep the project’s conversations together.
3. Configure DeepSeek or another compatible provider, or open the local model entry to connect your inference service. The README names supported services but does not supply endpoint-by-endpoint configuration instructions in this excerpt.
4. Open Plugin Discovery from the left navigation. Search for a capability or describe your goal to the Agent, then inspect its proposed packages.
5. Continue in Plugin Center, review the chosen version and permission information, and confirm installation. Studio restarts the Harness Host and checks runtime status after installing.
6. For a reusable working method, open Preset Square and review its dependencies. Install the Preset, then choose the new-session action from the installed list; this installation does not require a Host restart.

## How to troubleshoot deepseek-harness-studio

If a plugin cannot be installed from a GitHub reference, check that the repository maps to a package published on the public npm Registry. A `dsh-plugin` topic is a discovery signal, while installation still depends on package validation.

If an interrupted installation leaves the runtime manifest inconsistent after rollback, Studio enters a plugin safe mode where extensions can be disabled or uninstalled. Incompatible historical lock files trigger compatibility recovery without rewriting those files.

If Preset actions are unavailable, check whether you are using browser development mode rather than Desktop. For other missing-plugin issues, confirm the active profile and enabled state, restart DSH, and inspect versions and logs. Jobs only represent tasks in the current process; after a restart, previously running tasks are not treated as still alive.
