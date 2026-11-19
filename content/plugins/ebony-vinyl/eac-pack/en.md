---
title: "EAC-Pack: Batch Manage DSH Plugins"
description: "EAC-Pack is a DSH plugin that manages Desktop plugins in batches. Learn which package to install and how to fix missing assets or checksum errors."
summary: "Browse a catalog of 61 baseline plugins and choose what to install, update or remove. The suite also includes 30 skin previews and 10 prompt sets."
highlights:
  - "Batch plugin installation, updates and removal"
  - "30 skin previews"
  - "10 prompt sets"
  - "Local SHA256 verification"
  - "Offline suite installation from a complete release"
faq:
  - q: "Can I install EAC-Pack from Git in DeepSeek Harness Desktop?"
    a: "Not from the documented source handoff alone: its required asset package had not been published. Once your registry can resolve `eac-plugin-suite-assets@0.2.3`, the documented Desktop entry is `github:DSH-EAC/EAC-Pack`."
  - q: "Which EAC-Pack file should I use for an offline install?"
    a: "Use `eac-plugin-suite-0.2.3.tgz` from a complete release or the `release/` output of a complete local build. It contains the assets for the suite itself; individual plugins may still need network access for their own dependencies."
  - q: "Why hasn't EAC-Pack enabled all 61 plugins?"
    a: "A verified baseline means the plugin archives are available locally, not that the plugins are active. Choose what to install from the catalog; compatibility and skin conflict rules still apply."
  - q: "Does EAC-Pack replace my old dsh-plugin-suite installation?"
    a: "No. Desktop treats the two packages as separate plugins, so disable the old one first. The suite can copy the old data directory if the new one does not exist, but it does not uninstall the old package."
---

## What does EAC-Pack do?

EAC-Pack is a DSH plugin that lets you install, update and remove plugins in batches in DeepSeek Harness Desktop. Use its catalog to choose the plugins you want rather than enabling an entire collection at once. Version 0.2.3 separates the catalog and management code from the assets: the Git repository describes the baseline, while a required, versioned package supplies the actual plugin archives, skin previews and prompts.

## EAC-Pack core features

- **Batch plugin management.** Select catalog entries for installation, updates or removal. Package selection and compatibility checks still apply, including rules against duplicate kernel packages and mutually exclusive skins.
- **Skin previews and prompts.** The asset package supplies 30 skin previews and 10 prompt sets alongside the 61 baseline plugin archives. It is data for the suite, not a second Desktop plugin to enable.
- **Local integrity checks.** The suite uses `suite/assets/bootstrap.json` to check the asset package identity, version, file sizes and SHA256 digests. Enabling the suite verifies and assembles local files rather than downloading missing ones.
- **Persistent plugin archives.** Before installing a plugin, the suite verifies its resources again and stores the complete archive under `$DSH_HOME/eac-plugin-suite/resources/<sha256>/`. This keeps a local file dependency from pointing into a suite installation that might later be removed.

## How to install and use EAC-Pack

1. Check availability before using Git. The October 5, 2026 handoff contains source code only and reports that `eac-plugin-suite-assets@0.2.3` had not been publicly released. The Git entry is not a supported installation route until that exact package is published and your registry can resolve it.
2. Once that condition is met, open Plugins → Add Plugin in Desktop and enter `github:DSH-EAC/EAC-Pack`. Installation should bring in both the suite and its required assets. If you already have `dsh-plugin-suite`, disable it before enabling the new suite.
3. For an installation without a registry connection, use `eac-plugin-suite-0.2.3.tgz` from a complete release or a complete local build's `release/` directory, if available. The smaller `git/` archive does not bundle the assets.
4. Enable the suite and read the local verification status. Once the baseline is ready, choose plugins from the catalog for batch installation. Later online channel checks and updates are separate from this initial verification; a plugin's own dependencies may still require a connection.

## How to troubleshoot EAC-Pack

- **Missing package or wrong version.** Check publication status, registry settings, proxy access and mirror synchronization for the exact asset version. Reinstall the suite with its required dependency. Disabling pnpm security policies is not necessary.
- **Manifest or SHA256 mismatch.** Reinstall from a matching set of packages, or use a verified complete release if available. Restarting will not fetch a replacement: the suite does not substitute a cached copy or fall back to the latest upstream version.
- **Wrong archive.** Check the file's origin as well as its name. `dist-artifacts-*.tar.gz` is a build archive, not a Desktop installer. Releases through v0.2.1 used a different package name; renaming an old download does not convert it.
- **Old data not copied.** Check whether `$DSH_HOME/eac-plugin-suite/` already exists. Migration copies from `$DSH_HOME/plugin-suite/` only when the destination is absent, so existing new data is not overwritten.
