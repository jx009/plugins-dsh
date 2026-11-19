---
title: "dsh-purge: DSH Host Policy Testing"
description: "dsh-purge is a DSH plugin that modifies local host policies for security testing. Check version compatibility, Web and desktop profiles, and restore options."
summary: "Check which official DeepSeek Harness versions the archived release targets, how its Web and desktop profiles differ, and where to find the controls for undoing local changes."
highlights:
  - "Local host policy testing"
  - "Grouped patch status"
  - "Separate Web and desktop profiles"
  - "Restore and uninstall controls"
faq:
  - q: "Does dsh-purge support the official Windows desktop app?"
    a: "The archived README names the official DeepSeek Harness 0.2.0-rc.2 desktop EXE and identifies its profile as `desktop`. It does not promise compatibility with newer desktop builds."
  - q: "Does dsh-purge change both DSH profiles at once?"
    a: "No. The README treats official Web and desktop as separate profiles, so the state of one does not tell you the state of the other."
  - q: "Can I undo changes made by dsh-purge?"
    a: "The README lists both Restore and Uninstall on the Clean page. If you are reviewing an existing installation, check its patch status in the affected profile before deciding which control you need."
  - q: "Is mmparko/dsh-purge the original dsh-purge repository?"
    a: "No. It is described as a full mirror of `YuJunZhiXue/dsh-purge`, including branches, tags, and commit history. The README identifies the upstream repository as the source to credit."
---

## What does dsh-purge do?

 dsh-purge is a DSH plugin that modifies local DeepSeek Harness host policies for security testing. It is intended to help researchers distinguish a restriction imposed by the harness from a refusal returned by the model. The two can look similar in a chat, but the harness also controls prompts, approvals, sandbox policy, and tool limits. This is a host modification tool, not a model provider or a cosmetic theme.

The `mmparko/dsh-purge` repository is a mirror of `YuJunZhiXue/dsh-purge`. The supplied README describes release `1.1.71` and says upstream maintenance is paused. The mirror preserves the upstream history, but that is not evidence of support for newer DeepSeek Harness releases.

## dsh-purge core features

- **Grouped patch status.** The plugin opens a dock beside the session title. Its Clean page groups the status of host changes, providing a place to check what the plugin reports in an existing installation.
- **Separate Web and desktop profiles.** The official `dsh web` host uses `web`; the official desktop EXE named in the README uses `desktop`. A status check in one interface does not establish what has happened in the other.
- **Local host scope.** The README says changes are limited to official `@deepseek-ai` packages and local configuration, rather than the Harness source tree. Local scope does not mean the changes are only visual: prompts, approvals, and sandbox rules can affect how a session behaves.
- **Restore and uninstall controls.** The Clean page lists Restore and Uninstall as separate actions. If you inherited a modified environment, use the grouped status to identify what the plugin reports before deciding whether you need to undo changes or remove the plugin.

## How to install and use dsh-purge

This page covers compatibility and existing-installation checks. It does not provide installation or activation steps for the host-policy bypass features.

1. **Check the host version.** The archived release targets DSH 0.2. The README specifically names the official desktop build `0.2.0-rc.2`, says older Harness builds need a matching older plugin, and does not guarantee newer versions.
2. **Check the runtime.** The documented minimum is Node.js 18. The README separately lists Node.js 22 or later for the Windows no-flash behavior; that is not the general minimum.
3. **Identify the profile before reviewing changes.** Use `web` when checking the official Web host and `desktop` when checking the official desktop app. The README says that adding the package to a profile does not by itself modify the host, so package presence and patch status are separate checks.

## How to troubleshoot dsh-purge

- **The plugin is visible in only one interface.** First confirm which host and profile you are looking at. A listing under `web` is not proof that the plugin is present under `desktop`.
- **Behavior changed after an upgrade.** Record the Harness, plugin, and Node.js versions before checking the logs. The README does not guarantee newer host releases, so do not assume that a change in behavior means the model itself changed.
- **An existing environment may still be modified.** Check the Clean page in the affected profile for its reported patch status and Restore control. If both profiles were used, review them independently rather than assuming one check covers the whole machine.
