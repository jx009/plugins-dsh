---
title: "Awesome-DeepSeek-Harness-Plugins: DSH directory"
description: "Awesome-DeepSeek-Harness-Plugins is a DSH plugin directory for finding extensions. Learn how to choose plugins, find install guides and check errors."
summary: "Find DeepSeek Harness extensions by capability, then inspect their source repositories and reference links. English and Chinese indexes cover model providers, skills, memory, clients and integrations."
highlights:
  - "Eight capability categories"
  - "Canonical repositories and reference links"
  - "English and Chinese indexes"
  - "Star and reference count ordering"
  - "Archived project labels"
faq:
  - q: "How do I install Awesome-DeepSeek-Harness-Plugins in DeepSeek Harness?"
    a: "It is a directory to browse, rather than an installable extension. Open an individual project's repository for its installation instructions; the supplied README provides no directory-wide DSH install command."
  - q: "Can Awesome-DeepSeek-Harness-Plugins help me find OpenCode models?"
    a: "Its Models & Providers section includes opencode2dsh for OpenCode Zen and dsh-opencode-go for OpenCode Go. Follow the relevant repository to check its setup requirements."
  - q: "Does Awesome-DeepSeek-Harness-Plugins have a Chinese version?"
    a: "The repository links English and Simplified Chinese indexes. Use README.md for English or README.zh-CN.md for Chinese."
  - q: "How are projects ranked in Awesome-DeepSeek-Harness-Plugins?"
    a: "Projects within each section are ordered by GitHub stars, followed by verified reference count. Entries can have zero verified references, and archived projects remain listed with a label."
---

## What does Awesome-DeepSeek-Harness-Plugins do?

Awesome-DeepSeek-Harness-Plugins is a DSH plugin directory that helps developers discover extensions for DeepSeek Harness. It brings together public projects covering model providers, tools, skills, memory, automation, runtimes, desktop clients and browser integrations. Use it when you know the capability you need but have not yet chosen a project to install.

The repository describes a daily-curated index with English and Simplified Chinese versions. Entries point to canonical GitHub repositories and show star counts alongside reference information. Its inclusion criteria focus on public, inspectable projects with a clear connection to the harness. The directory itself does not provide the runtime capabilities of the projects it lists.

## Awesome-DeepSeek-Harness-Plugins core features

- **Capability-based discovery:** Eight sections organize Models & Providers, Tools & Skills, Sessions & Storage, Loops & Scheduling, Runtime & Sandboxes, UI & Clients, Integrations, and Developer & Operations. This gives readers a starting point based on the task they want to accomplish.
- **Model-provider examples:** The supplied index includes opencode2dsh for OpenCode Zen, dsh-workbuddy-connect for a locally signed-in WorkBuddy app, and dsh-plugin-subscriptions for eligible subscription accounts. These are separate projects with their own setup requirements.
- **Source and reference inspection:** Each entry identifies its upstream repository and displays reference information. Some entries explicitly have no verified references yet, so check the information attached to the particular project you are considering.
- **Visible ordering and archive status:** Projects are sorted within each section by stars, then verified reference count. Archived entries are retained with labels, giving readers additional context when reviewing a candidate.
- **Bilingual operator resources:** Readers can switch between English and Chinese indexes. The Core section also links a handbook covering architecture, plugins, MCP, sessions, sandboxing, evaluation and troubleshooting.

## How to install and use Awesome-DeepSeek-Harness-Plugins

No DSH installation command is provided for this directory, and no npm package name has been established. Start by browsing the repository at `https://github.com/Zhiyuan-Fan/Awesome-DeepSeek-Harness-Plugins`.

1. Open `README.md` for English or `README.zh-CN.md` for Simplified Chinese.
2. Choose a category that matches your goal. For example, start with Models & Providers when looking for OpenCode model access or WorkBuddy connectivity.
3. Read the entry's description, archive status and available references. Review the project's code and requested permissions before installing, as the directory recommends.
4. Open the canonical project repository and follow its own installation and configuration documentation. Package names, account requirements and configuration locations must come from that project's instructions.
5. Apply those instructions to the DSH profile you intend to use. The directory has no shared configuration file or installation procedure documented in the supplied README.

## How to troubleshoot Awesome-DeepSeek-Harness-Plugins

If you expect the directory itself to appear in the plugin interface, return to the chosen entry and check that you installed the actual extension it describes. Browsing the index does not enable its listed capabilities.

For an installed extension that is missing or not working, use general checks: confirm the profile name, verify that the plugin is enabled, restart DSH, and inspect versions and logs. Consult the selected project's documentation for specific configuration requirements and error handling.

The supplied directory README does not document plugin-specific error codes or fixes. Its linked handbook is an additional operator reference; use the individual repository to investigate behavior specific to that extension.
