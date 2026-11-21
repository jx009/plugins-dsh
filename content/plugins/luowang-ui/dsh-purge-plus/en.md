---
title: "dsh-purge-plus: DSH Desktop Compatibility"
description: "dsh-purge-plus is a DSH plugin that modifies desktop host safeguards. Check version support, review installer errors, and learn how to roll back."
summary: "A Purge Community fork for DeepSeek Harness Desktop with a fix for host crash #119 and a dashboard for patch status, audit history, and backups."
highlights:
  - "Host crash #119 fix"
  - "toolFilter preset registration fix"
  - "Sidebar compatibility and patch status"
  - "Audit history for configuration changes"
  - "Automatic snapshots with deduplicated storage"
faq:
  - q: "Does dsh-purge-plus support DSH Desktop 0.2.1-rc.2?"
    a: "Yes. The README lists macOS testing for both 0.2.1-rc.2 and 0.2.1-rc.1, but it does not report end-to-end validation for Windows or the Web profile."
  - q: "Does dsh-purge-plus fix the toolFilter preset registration error?"
    a: "The repository description identifies a fix for the `toolFilter` preset registration failure. If you still see it, check the installed plugin and host versions before assuming it is the same issue."
  - q: "Why does dsh-purge-plus say the desktop profile is managed by Electron?"
    a: "DeepSeek Harness Desktop controls that profile through Electron, so the standard `dsh plugin add` command cannot manage it. The message is about profile ownership, not whether the npm package exists."
  - q: "Does rolling back dsh-purge-plus delete my prompts and rules?"
    a: "The README says rolling back to a plugin backup preserves the current prompts and rules. If you only want to undo changes to the host, use the separate host patch revert action instead."
  - q: "Where can I see what dsh-purge-plus changed?"
    a: "Open the recent actions view in the Purge panel to review recorded changes. The plugin also keeps an `audit.jsonl` log that tracks actions such as applying or reverting patches."
---

## What does dsh-purge-plus do?

`dsh-purge-plus` is a DSH plugin that modifies DeepSeek Harness Desktop host safeguards and provides a sidebar for inspecting and reverting those changes. This Purge Community fork targets the 0.2.1 release-candidate series. Its repository lists fixes for host crash #119 and a `toolFilter` preset registration failure. Because the plugin changes approval and sandbox behavior, treat it as a host modification rather than a routine interface add-on.

The README for plugin version 1.6.1 reports macOS testing with DSH Desktop 0.2.1-rc.1 and 0.2.1-rc.2. Other host versions are labeled unverified. Windows and the Web profile have code paths in the project, but the README does not claim end-to-end testing for either.

## dsh-purge-plus core features

- **Desktop compatibility fixes.** The fork addresses the reported host crash and preset registration failure for the release-candidate series. Check the host version before attributing a similar symptom on another build to either known issue.
- **Patch status.** The Purge sidebar shows the host version, plugin version, compatibility level, and patch state together. Expand the details to see individual entries rather than relying on the overall status line.
- **Audit history.** The recent actions view records changes such as patch application, reverts, and switches. Use it to check what changed around the time a problem appeared.
- **Automatic snapshots.** The project takes snapshots before installation, patch application, and rollback. Backup storage deduplicates large files so repeated snapshots do not have to store an identical copy each time.

## How to install and use dsh-purge-plus

There is no standard Desktop CLI install command in the supplied README. The listed npm package name does not make the Web profile command a substitute for the Desktop installer, because Electron manages the desktop profile. This guide covers inspection and recovery for existing installations rather than setup that disables host safeguards.

1. Fully quit and reopen DeepSeek Harness if the plugin was recently installed but does not appear in the interface.
2. If **Purge** is visible in the sidebar, open its **Status** page. Compare the displayed host and plugin versions with the tested versions before interpreting the patch summary.
3. Review **Recent actions** and the backup area if you are investigating a change. Decide whether you need to undo host patches or restore an earlier plugin backup; the project documents these as separate operations.

## How to troubleshoot dsh-purge-plus

- **Windows reports that it cannot find `sh`.** The shell installer shown in the README is not a Windows command. This symptom does not indicate a crash in the Desktop host.
- **A GitHub release download returns 404.** The README distinguishes GitHub release asset URLs from repository archives and says the installer uses an archive. A missing release asset alone does not mean the repository is unavailable.
- **The host stops opening after patching.** For macOS, the README documents restoring the saved `app.asar.bak` as `app.asar` in the application's Resources directory. Confirm that the backup exists before replacing the current archive.
- **The app opens, but you want to undo the host changes.** Use the sidebar's revert action or `purge-community revert`. The README distinguishes this from rolling back the plugin to an earlier backup.
