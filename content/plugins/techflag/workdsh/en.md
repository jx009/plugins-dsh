---
title: "workdsh: Projects and Skills for DSH"
description: "workdsh is a DSH plugin workspace for projects, files and skills. Learn how to install Desktop, add Enterprise Connection and troubleshoot setup."
summary: "Organize projects, local material, experts and skills in a desktop workspace. Add enterprise collaboration and company models through optional plugins."
highlights:
  - "Projects with plans and task material"
  - "Local file search and previews"
  - "Reusable experts and callable skills"
  - "Document and spreadsheet working copies"
  - "Enterprise Connection for colleague sharing"
faq:
  - q: "How do I install workdsh for DeepSeek Harness?"
    a: "Start with the Desktop download linked in the repository README. The supplied documentation does not identify a workdsh npm package or provide a DSH CLI installation command."
  - q: "Does workdsh include Node.js and Python?"
    a: "Desktop bundles Node.js, pnpm, Python and built-in plugins, so these components do not need to download on first login. Community skills and plugins are installed when needed."
  - q: "How do I enable enterprise collaboration in workdsh?"
    a: "Install and activate the Enterprise Connection archive through Plugins → Add plugin, then sign in through Settings → Enterprise account. Company login enables colleague mentions and sharing text or files through Collaboration."
  - q: "Can workdsh use personal and company models together?"
    a: "Yes, the README describes retaining personal providers while adding company models through model settings. Company models appear in the conversation model picker, with supplier keys kept in the admin backend."
  - q: "How do workdsh business plugins reuse enterprise login?"
    a: "Host plugins can use the workdshEnterprise service after Enterprise Connection is installed, activated and signed in. Requests reuse the member login without returning backend tokens or passwords to the plugin; the service is unavailable in personal mode."
---

## What does workdsh do?

workdsh is a DSH plugin workspace that organizes projects, local files, experts, skills and connectors on desktop. Built on DeepSeek Harness, it gives users a place to keep project instructions, reusable capabilities and working documents together across ongoing tasks. Its WorkBuddy-style organization is implemented through extensible workspace features.

Personal use is the starting point. Enterprise Connection adds company login and collaboration while retaining the same underlying library, experts, skills and connectors. The Agent and tools execute on the employee’s computer; the enterprise backend handles accounts, authorization, collaboration data and model forwarding.

## workdsh core features

- **Projects:** Keep instructions, plans, tasks, material and capability settings together for a continuing goal. This gives related work a shared project context.
- **Local file library:** Manage local files with search and previews. Tasks can reference both the material and its revision, making the relevant source identifiable.
- **Experts and skills:** Experts preserve role and capability settings. Skills package callable instructions and resources for methods you want to reuse.
- **Deliverable workspace:** Preview or edit supported working copies of documents, spreadsheets, presentations, HTML and PDF. Results can remain useful beyond the conversation that produced them.
- **Enterprise collaboration and models:** With Enterprise Connection and company login, mention colleagues using `@` and share text or files through Collaboration. Company models can appear alongside personal providers in the conversation model picker.

## How to install and use workdsh

The supplied README does not provide a DSH installation command or identify an npm package for the workspace itself. Start with its Desktop download; the supplied release link points to `desktop-v3.0.0-alpha.4`. Desktop bundles Node.js, pnpm, Python and built-in plugins, while community additions are installed on demand.

1. Open Desktop and organize your work in Projects. Bring the goal’s instructions, plans, tasks and capability settings together there.
2. Use the library to manage source files. Reference the material and its revision from tasks, and use experts or skills to reuse the relevant role settings and instructions.
3. Use the deliverable workspace for supported document working copies. Choose the preview or editing capabilities available for the material you are handling.
4. For company use, download `workdsh-enterprise-connection-0.1.0-alpha.2.tgz` from the repository’s release link. Enter the downloaded file’s full path in `Plugins → Add plugin`, install it and activate it. This extension is not listed in a plugin marketplace.
5. Connect through `Settings → Enterprise account`. Add company models through model settings, then select them in the conversation model picker. Use colleague mentions and Collaboration for sharing after company login.

For developers, the reusable enterprise service belongs in a plugin’s Host entry. The `workdshEnterprise` service delegates request authentication to Desktop Main, and the backend checks member and business permissions. It requires the enterprise extension and an active company login.

## How to troubleshoot workdsh

If an installed extension is missing, check the active profile where applicable, confirm that the plugin is enabled, fully restart Desktop and inspect the version and logs. For enterprise features, also verify that the connection extension is activated and that company sign-in has completed.

The README’s DSH Friends example specifically requires enabling the plugin and fully restarting Desktop after installation. It uses `dsh-friends@0.1.0-alpha.11` through `Plugins → Add plugin`; this is a separate community extension.

For unresolved installation, interface or feature failures, search existing repository issues before reporting. Include the application version, personal or enterprise mode, reproduction steps and error screenshots. Send backend account, permission and model-forwarding problems to WorkDSH Admin. Public reports should exclude passwords, tokens, API keys and confidential company material.
