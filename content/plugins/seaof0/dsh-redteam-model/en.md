---
title: "dsh-redteam-model: DSH Security Workflows"
description: "dsh-redteam-model is a DSH plugin suite for security workflows. Learn the install requirements, where to check configuration, and how to troubleshoot."
summary: "Review source code and organize incident evidence in DeepSeek Harness. The suite adds dedicated presets, review checkpoints, and session records."
highlights:
  - "Dedicated source code audit preset"
  - "Windows and Linux incident response"
  - "Stage-gate decisions recorded in logs"
  - "Semgrep findings tracked for review"
  - "Profile-specific manager operation history"
faq:
  - q: "What DSH version does dsh-redteam-model require?"
    a: "The README lists DSH web 0.1.0-rc.6 or later for the Redteam Manager setup and reports testing on 0.1.1-rc.2. DeepSeek Harness itself requires Node.js 22 or newer."
  - q: "Why are dsh-redteam-model presets visible in another profile?"
    a: "Presets live in the shared `.agent-presets` directory under the active `DSH_HOME`. Profiles under that same home can see those presets even though their runtime plugin declarations are separate."
  - q: "Does dsh-redteam-model install Semgrep automatically?"
    a: "No. The Semgrep component detects a local installation rather than installing the scanner itself."
  - q: "Why did dsh-redteam-model mark an operation as interrupted after restart?"
    a: "Redteam Manager marks unfinished operations as interrupted when the web app restarts. Check the operation entry in the profile where it was started for any recorded failure details."
  - q: "Does uninstalling a dsh-redteam-model runtime plugin delete its source?"
    a: "No. Removing a runtime plugin clears its declaration from the current profile without deleting the source tree."
---

## What does dsh-redteam-model do?

dsh-redteam-model is a DSH plugin suite that adds security work presets and runtime components to the DeepSeek Harness web interface. For defensive work, its `code-audit` preset gives source review a defined scope and reporting process, while `incident-response` provides a separate workflow for investigating Windows and Linux incidents. This page covers those defensive uses rather than deployment of the full suite.

A preset combines a role, a playbook, loadable skills, and indexed references. The distinction matters when troubleshooting: the preset determines what appears in the session picker and how the session is framed, while runtime components handle functions such as recording checkpoint decisions.

## dsh-redteam-model core features

- **Source code auditing.** The `code-audit` preset is intended for white-box review. For generated code or code you maintain, use it to document the affected component, the evidence supporting a finding, and the recommended fix.
- **Incident response.** The `incident-response` preset covers Windows and Linux. State which operating system and incident scenario you are investigating so the session starts with the right context.
- **Stage-gate records.** The stage-gate component records structural checkpoint decisions in `gate-log.md`. These decisions show whether a checkpoint was met; they do not replace review of the underlying evidence.
- **Semgrep reconciliation.** The Semgrep component wraps a local scanner and records matches in `scan-reconcile.md` and `scan-reconcile.csv`. Treat matches as leads for manual review, not as confirmed vulnerabilities.
- **Session progress.** The session status panel shows completed tasks against the total and gives you a way to jump back to earlier prompts. This helps reviewers recover the original scope when checking a finding later in the session.

## How to install and use dsh-redteam-model

Install DeepSeek Harness first. Its Node.js requirement is version 22 or newer. For the settings-based setup, the repository lists DSH web `0.1.0-rc.6` as the minimum and identifies `0.1.1-rc.2` as a tested version.

1. If the suite is already installed, open the web settings and find Redteam Manager. Check that you are viewing the intended profile before reviewing runtime component status or operation history.
2. In the new-session picker, look under the specialist modes for `code-audit` or `incident-response`. For source review, identify the code you maintain and the files in scope. For incident triage, identify the operating system and what prompted the investigation.
3. Review the evidence before reporting findings. For a code audit, reconcile relevant Semgrep matches with the source. For incident triage, distinguish observed events from possible explanations.

## How to troubleshoot dsh-redteam-model

If a deployed preset is missing, refresh the web page and confirm that the session is using the expected `DSH_HOME`. If a runtime component is missing instead, check the active profile and restart DSH web after a host-level plugin change or a manager update. Refreshing the browser alone does not reload those components.

If a management operation failed, check the profile's operation history for the recorded reason. For a bug report, include the mode name, the steps that led to the problem, what you expected, what happened, and relevant excerpts from the session output or logs such as `gate-log.md` or `enforce-log.md`.
