---
title: "dsh-prompt-setting: DSH System Prompt Manager"
description: "dsh-prompt-setting is a DSH plugin that manages system prompts. Learn setup basics, configure prompt layers and troubleshoot changes."
summary: "Inspect the system prompt assembled for each turn, add your own instructions, and review changes through diffs, history and exportable backups."
highlights:
  - "Assembled system prompt search and preview"
  - "Layer-specific My Prompt editing"
  - "Reusable presets with tags"
  - "Version history and line-level diffs"
  - "Backup export and import preview"
faq:
  - q: "How do I install dsh-prompt-setting in DeepSeek Harness?"
    a: "The supplied README excerpt does not include an initial installation command, and the npm package name is unconfirmed. Consult the repository's complete installation instructions; after installation, look for Prompt settings in the Web GUI Settings."
  - q: "Can dsh-prompt-setting edit built-in system prompt sections?"
    a: "The current editing surface is My Prompt, whose text is appended after all built-in sections. Those built-in sections remain read-only, while Advanced lists legacy overrides."
  - q: "How do dsh-prompt-setting presets work across workspaces?"
    a: "Applying a preset writes it into a reserved section of the selected workspace layer. Canceling that application restores the workspace's previous content; deleting an applied preset first cancels its applications."
  - q: "Does dsh-prompt-setting send my prompts to GitHub?"
    a: "The documented update check sends no local, session or workspace data, and includes no body or cookies. Turn off Check for updates in Advanced to disable the plugin's update-check requests."
  - q: "Does dsh-prompt-setting restart DSH after an update?"
    a: "No; Update now asks for confirmation and has the host install the announced release into the current profile. Restart the command-line host yourself, or quit and reopen the desktop app."
---

## What does dsh-prompt-setting do?

dsh-prompt-setting is a DSH plugin that lets you inspect and manage the system prompt assembled for each conversation turn. It gives DeepSeek Harness users a Settings interface for adding system-level instructions without editing files in the global installation. You can inspect the final assembly, search its sections and compare your changes with the base prompt.

The plugin keeps configuration in its own data directory, so upgrading or reinstalling the host does not overwrite those settings. It uses plain JavaScript with no runtime dependencies or build step. The supplied README lists compatibility as `>=0.2.1-0 <0.3.0-0`.

## dsh-prompt-setting core features

- **My Prompt editing:** Choose a layer, edit your instructions and save. Your text comes after every built-in section; those sections remain read-only. Restore default removes only that layer's My Prompt entry and preserves its other overrides.
- **Reusable presets:** Create, edit and tag texts in My presets, then apply them to workspace layers. Canceling an application restores the previous workspace content. Deleting an applied preset first cancels its applications.
- **Prompt overview:** Search, filter and copy the assembled sections, read the full text, and inspect a `base ↔ effective` diff. This provides a way to check what your saved instructions actually changed.
- **History and backups:** Review line-level version differences or export configuration for download. Import preview shows the proposed changes before anything is written; the history list has its own scope selector.
- **Status and update controls:** Advanced exposes mount state, build fingerprint, renderer self-check and assembly status. Update checks are optional, and installing a newer release requires confirmation and a manual restart.

## How to install and use dsh-prompt-setting

The supplied README excerpt contains no initial DSH installation command, and no npm package name has been confirmed. Use the repository's complete installation instructions before proceeding; a command cannot be reliably derived from the repository name alone.

1. After installation, open the Web GUI's Settings and select Prompt settings, whose pane ID is `prompt-setting`.
2. Open My Prompt and choose View scope beneath the panel title. This selector determines the layer where your next save lands; check the displayed target before editing.
3. Enter your system-level instructions and save. Read the two-line status summary for assembly and delivery verdicts, plus override counts for the selected layer.
4. Open Prompt overview to inspect the assembled text and compare the base and effective versions. Use search or filters to locate the relevant section.
5. For reusable instructions, create an entry in My presets and apply it to the intended workspace. Use tags to organize the library; filtering selects one tag at a time.
6. Review Version history or export a backup before further changes. Its log scope is independent of My Prompt, and the user-layer log is global.

The interface follows the host's language setting immediately. Eight interface languages are covered, with Chinese and English fallback on older hosts.

## How to troubleshoot dsh-prompt-setting

If saved instructions appear ineffective, first verify the selected layer and target workspace. Check My Prompt's status summary, then open Details to inspect Advanced for the corresponding session. Compare the effective assembly in Prompt overview rather than relying only on the editor text.

For an unwanted edit, Restore default removes the current layer's My Prompt entry. Advanced's clear all overrides preserves that entry, whereas reset the whole layer removes it too. Both Advanced clearing actions require double confirmation.

If the pane is missing, confirm the active profile and that the plugin is enabled, restart DSH, and inspect host versions and logs. For an installed update, restart `dsh web` after a command-line launch, or quit and reopen the desktop app. A failed update check deliberately produces no top-of-page error, so a missing banner alone does not establish a plugin failure.
