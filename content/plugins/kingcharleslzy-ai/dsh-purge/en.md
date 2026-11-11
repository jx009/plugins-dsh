---
draft: true
title: "dsh-purge: unrestricted-mode patches for DSH"
description: "Community edition of dsh-purge. It patches the DeepSeek Harness host and injects prompts to cut agent confirmations, with self-checks, backups and rollback."
summary: "A self-hosted add-on, often called a jailbreak or unrestricted-mode plugin, that patches the DSH host and manages injected prompts. It adds status diagnostics, local backups and rollback."
highlights:
  - "Host patches"
  - "Prompt and preset management"
  - "Layered self-check"
  - "Backup and rollback"
  - "Sidebar settings page"
faq:
  - q: "What does \"unrestricted mode\" mean for dsh-purge?"
    a: "It is the community's name for this plugin, alongside \"jailbreak\". According to the README, it applies host patches and injects prompts so the agent keeps working through a task instead of stopping to confirm each step; it does not change the model itself."
  - q: "Does dsh-purge modify the DSH installation?"
    a: "Yes. Applying it patches host files, and the community installer may repair parts of the desktop layout. Snapshots are taken before apply, install and rollback, and applying patches and restarting DSH are separate steps that you trigger yourself."
  - q: "Can some presets be kept out of the prompt injection?"
    a: "Yes. Since 1.6.40 the `excludePresets` setting can leave presets such as `roleplay` or `minimal` out of the injection while keeping the commands, panel and tools. It does not undo the global host patches."
---

## What does dsh-purge do?

dsh-purge is a self-hosted add-on for DeepSeek Harness that patches the host application and injects prompts so the agent works through tasks with fewer confirmations and interruptions. The community usually calls it a "jailbreak" or "unrestricted mode" plugin. This repository is the community-maintained edition of the original dsh-purge by YuJunZhiXue.

Around that core, much of the project deals with making the changes visible and reversible. A layered self-check reports whether the install, patches and injection are in place. A diagnose command locates patch anchors that drifted after a host update. Prompts, rules and presets are managed in one place, and a full page in the DSH sidebar shows the current state.

The README says that all logic runs on your machine, that the plugin does not change the model itself, and that it is meant for environments you own or are authorised to use. It is community-maintained rather than an official DeepSeek project, and it does modify host files, so read the installation notes before applying it.

## Core features

- **Host patches**: A set of patches to the DSH host (the README counts 86), applied through an explicit apply step.
- **Self-check and diagnosis**: `purge-community selfcheck` reports status layer by layer; `diagnose` gives the file, line and candidate positions when anchors drift.
- **Prompt management**: Prompts, rules and an "unrestricted mode" preset are edited centrally, and `excludePresets` keeps chosen presets out of the injection.
- **Backup and rollback**: Snapshots are taken before changes, with `backup` and `rollback` commands and a local backup list in the panel.
- **Update control**: Automatic checking and automatic installing are separate settings. By default it only checks, and it never restarts DSH for you.

## How to use dsh-purge

1. For a first install from the DSH interface, enable the custom plugin market, add the community index below as a source, then pick dsh-purge Community and confirm the source is `kingcharleslzy-ai/dsh-purge`:

```
https://kingcharleslzy-ai.github.io/dsh-purge/index.json
```

2. CLI and web users can install the release tarball instead. The README pins the URL to a release and says not to replace it with a bare package name:

```sh
dsh plugin --profile web add "https://github.com/kingcharleslzy-ai/dsh-purge/releases/download/v1.6.93/dsh-purge-community-1.6.93.tgz"
```

3. If an older dsh-purge is already installed, use the community installer script from the README, which backs up first and migrates in place.
4. Open the Purge page in the left sidebar, read the status line and choose Apply. Restart DSH yourself when it suits you.
5. Check the result:

```sh
purge-community selfcheck --json
```
