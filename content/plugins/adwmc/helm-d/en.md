---
title: "helm-d: DSH Security Case Tracking"
description: "helm-d is a DSH plugin for security case tracking and artifact triage. Learn about install requirements, preset configuration, and error checks."
summary: "Keep artifact hashes, evidence IDs, and findings together in a disk-backed case. The workbench shows which case belongs to the current session and which hypotheses are still unresolved."
highlights:
  - "Automatic evidence capture with numbered IDs"
  - "Disk-backed case status"
  - "Artifact hashing and triage"
  - "On-demand reference lookup"
  - "Session-specific Case workbench"
faq:
  - q: "What Node and DSH versions does helm-d need?"
    a: "The README requires Node 22.19.0 or newer and an installed DSH CLI. It reports preset and workbench UI regression testing across released DSH versions from 0.2.0-rc.1 to 0.2.2-rc.5, but not cold-start testing on every release in that range."
  - q: "Why does helm-d show ERR_PNPM_TARBALL_INTEGRITY?"
    a: "A rolling release URL can point to a different archive after a new release, leaving the checksum in the pnpm lockfile out of date. Check whether the profile uses a rolling URL rather than a version-pinned release dependency."
  - q: "Where does helm-d save case evidence?"
    a: "Tool output is stored under `evidence/` in the case workspace. Findings can reference evidence entries by their numbered IDs, such as `E-001`."
  - q: "Can I skip the helm-d Star prompt?"
    a: "Yes. The prompt appears on first launch in the web interface, but dismissing it does not disable any features."
  - q: "Why is my helm-d Case tab empty in a new session?"
    a: "The Case tab shows the case bound to the current session, not the case open in another conversation. If no case is bound, it shows a notice and may list recent cases from disk."
---

## What does helm-d do?

helm-d is a DSH plugin for security case tracking, artifact triage, and evidence review. It adds tools and a workbench to DeepSeek Harness through Cordis hooks rather than modifying the host binary. For defensive reviews, its most useful distinction is between evidence and findings: evidence preserves tool output, while a finding explains what that output supports.

This guide covers defensive case review in an existing setup. It does not provide installation or activation steps for the bundled exploit automation or model safeguard bypass features.

## helm-d core features

- **Evidence capture.** Tool output is saved to the case workspace under `evidence/` and assigned numbered IDs. The plugin rejects references to IDs that do not exist, so reviewers can trace a finding back to a stored artifact instead of relying on a chat summary.
- **Disk-backed case status.** The case workspace keeps findings, evidence, and hypotheses together. Case status can be recovered from disk after conversation context is compressed, which is useful when a review spans a long session.
- **Artifact hashing and triage.** The tool catalog includes artifact hashing and triage for files you are authorized to inspect. A hash gives reviewers a way to check whether they are discussing the same file, even if copies have different names.
- **On-demand references.** The repository lists 353 reference articles and nine indexes. References are loaded as needed rather than inserted into the system prompt; the collection includes evidence-report templates.
- **Case workbench.** The Case tab shows findings, evidence, and unresolved hypotheses for the current session. If the sidebar is unavailable, the workbench opens in an overlay.

## How to install and use helm-d

For compatibility, the README requires the DSH CLI and Node `22.19.0` or newer. It documents a versioned release archive for the `web` profile. The session-level `helmd` preset is selected in the Agent preset menu; on first launch, a health check validates or repairs the preset for the installed host version without manual YAML edits.

For defensive review in an existing setup:

1. Open the DSH web session associated with the case you want to review. Use the workbench entry in the session header and select the Case tab.
2. Check that the evidence list and findings belong to the intended case. A newly opened conversation does not automatically inherit another session's case.
3. Match each finding's evidence IDs to the stored entries. For an artifact inventory, compare the recorded hash against the file under review and keep tentative explanations separate from confirmed findings.

## How to troubleshoot helm-d

- **An install or update reports `ERR_PNPM_TARBALL_INTEGRITY`.** The README points to rolling release URLs as a cause: the archive changes when a new release is published, but the lockfile still expects the old SHA-512 checksum. A version-pinned release archive avoids that mismatch.
- **Only shell and read appear on the first turn.** This is documented host behavior: the initial turn has a limited tool list. That display alone does not indicate a broken install.
- **A Star panel appears on first launch.** Dismiss it if you do not want to star the repository. It is a prompt, not a condition for using the workbench.
- **The workbench does not show the expected case.** Check which session you opened and whether it has a bound case. The workbench can show recent cases from disk without treating any of them as the current session's case.
