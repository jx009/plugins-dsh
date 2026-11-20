---
title: "dsh-purge-safe: DSH Host Policy Evaluation"
description: "dsh-purge-safe is a DSH plugin for local host policy evaluation. Check installation requirements, profile configuration, and how to troubleshoot errors."
summary: "Distinguish a DeepSeek Harness policy block from a model refusal. Check which host the release supports, review local patch status, and find the Restore control."
highlights:
  - "Clean dock with grouped patch status"
  - "Restore and Uninstall controls"
  - "Separate Web and desktop installations"
  - "Super Agent support"
faq:
  - q: "Which DeepSeek Harness version does dsh-purge-safe support?"
    a: "The README lists DeepSeek Harness `0.2.2-rc.3` for release `2.0.0`. It also lists Node.js 18 or newer; the supplied excerpt does not establish compatibility with later Harness releases."
  - q: "Can I use the same dsh-purge-safe installation for Web and desktop?"
    a: "No. The README treats the official Web host and desktop EXE as separate targets, so seeing the plugin in one does not mean it is installed in the other."
  - q: "Why is the dsh-purge-safe dock missing?"
    a: "Look beside the session title in the host where the plugin is enabled. If the button is missing, confirm the active profile, restart the host, and check its startup logs."
  - q: "How do I restore local changes made by dsh-purge-safe?"
    a: "Open the dock in the affected host and select Restore on the Clean page. Restore and Uninstall are listed as separate controls, so do not assume uninstalling is the same as restoring."
  - q: "Does dsh-purge-safe apply changes automatically on startup?"
    a: "The README says automatic application is off by default in the local build. If the installation has been customized, do not assume its startup settings still match that default."
---

## What does dsh-purge-safe do?

 dsh-purge-safe is a DSH plugin for evaluating host policy on an existing local DeepSeek Harness installation. Its documentation distinguishes two reasons an action may be blocked: the host can enforce a permission or sandbox rule before the model responds, while the model can decline a request of its own accord. The distinction matters when recording a test result: a host block is not evidence that the model refused.

The repository describes a patching tool, not a read-only diagnostic. Its changes can affect prompts, permission policy, and tool limits in official local packages and configuration. The project is independent of DeepSeek, and its README scopes evaluation to authorized local environments rather than production workloads or public systems.

## dsh-purge-safe core features

- **Clean dock:** A button beside the session title opens the dock. The Clean page groups patch status so you can review what the plugin reports for the current host.
- **Restore and Uninstall:** Clean presents these as separate controls. Use Restore when your goal is to revert changes in the affected installation, rather than assuming removal alone will revert them.
- **Separate host support:** The README lists the official Web host and desktop EXE. Each has its own installation, so the status you see in one should not be taken as the status of the other.
- **Super Agent compatibility:** Release `2.0.0` adds support for Super Agent and targets Harness `0.2.2-rc.3`. The supplied documentation does not establish support for other Harness versions.

## How to install and use dsh-purge-safe

No installation command is provided here. The supplied README excerpt does not include its Install section, and this guide covers compatibility checks, status review, and restoration rather than applying patches that weaken host safeguards.

1. Check the prerequisites before planning an installation. The release notes name Harness `0.2.2-rc.3` and list Node.js 18 or newer.
2. Identify the host and active profile you want to inspect. For an existing installation, the documented configuration lookup starts with `$DSH_HOME`, then checks for `.dsh` beside the launcher, then checks `~/.dsh`. If more than one location exists, review them in that order before concluding that a profile is missing.
3. In an existing setup, open the dock from the session title and use Clean to review patch status. If you intend to revert local changes, select Restore in the affected host. Check Web and desktop separately if both were modified.

## How to troubleshoot dsh-purge-safe

If the dock is missing, first confirm you are in the intended host and profile and that the plugin is enabled there. Restart that host and check the session title again. If the dock still does not appear, compare the installed Harness and Node.js versions with the documented requirements, then look at the startup logs for plugin loading errors.

If the problem is a blocked action rather than a missing dock, record whether the host reported a permission decision or the model returned a refusal. Keep that distinction in your notes instead of treating either outcome as evidence that the plugin failed to load.
