---
title: "dsh-reverse-skill: DSH Reverse Engineering"
description: "dsh-reverse-skill is a DSH plugin for reverse engineering. Learn how to check install status, verify profile configuration, and diagnose npm errors."
summary: "See what the 88-skill Cordis bundle adds to DeepSeek Harness, how it discovers nested skills, and which tool restrictions DSH does not enforce."
highlights:
  - "88 bundled skill definitions"
  - "Recursive discovery of nested skills"
  - "Registration by declared skill name"
  - "GitHub releases with version tags"
  - "No bundled external MCP servers"
faq:
  - q: "Is dsh-reverse-skill supported on npm?"
    a: "No. The npm listing contains legacy 1.0.x releases whose peer dependency is rejected by the compatibility check in DSH 0.2.0 and later."
  - q: "How do I check which profile has dsh-reverse-skill enabled?"
    a: "Inspect the effective configuration of the profile you actually use and look for the Cordis entry named `reverse-skill`. A browser session usually uses `web`, while the desktop app manages its own profile."
  - q: "Why are some dsh-reverse-skill entries missing from my local preset?"
    a: "The local preset loader scans only direct subdirectories, whereas the Cordis plugin scans recursively. The documented preset layout can discover the top-level router without finding every nested skill."
  - q: "Does dsh-reverse-skill include the upstream agent definitions?"
    a: "No. The bundle includes the skill files but leaves out the upstream OpenAI Agents SDK definitions because they do not map to the DSH subagent interface."
  - q: "Does dsh-reverse-skill enforce allowed-tools and disallowed-tools?"
    a: "No. DSH does not enforce those skill metadata fields, so they should not be treated as permission controls. Set and verify tool restrictions at the harness level."
---

## What does dsh-reverse-skill do?

`dsh-reverse-skill` is a DSH plugin that bundles reverse-engineering and security research skills for DeepSeek Harness. The Cordis package contains 88 `SKILL.md` files: 46 domain skills and 42 capture-the-flag skills. It registers the files as skills rather than importing the upstream agent definitions. The bundle also contains dual-use penetration-testing material; this page covers inventory, profile checks, and defensive review, not activation of the full pack or automated testing workflows.

## dsh-reverse-skill core features

- **Recursive skill discovery.** The provider scans both bundled skill directories and their subdirectories. It builds its inventory from the files it finds rather than relying on a hand-maintained list.
- **Metadata-based registration.** The provider registers each skill under the name declared in its front matter. That metadata also indicates whether a skill can be invoked directly by a user, so a registered skill is not necessarily a user-facing command.
- **Versioned GitHub releases.** The repository distributes the plugin through GitHub rather than the npm registry. A release tag identifies a fixed revision, while `main` can change as new commits land.
- **Skill files, not external tools.** The bundle does not ship the MCP servers referenced in some skills or the upstream OpenAI Agents SDK definitions. A tool mentioned in a skill is not necessarily connected to your harness.

## How to install and use dsh-reverse-skill

The npm registry entry is not a supported install source. For an existing deployment, use the following checks to verify what is loaded before relying on any skill or tool setting.

1. **Identify the active profile.** The browser interface commonly uses `web`. For the Electron desktop app, check the application's own plugin manager rather than assuming a change to the browser profile applies to the desktop session.
2. **Inspect the effective configuration.** Look for `reverse-skill`, the Cordis plugin name. The scoped identifier `@dhicoc/dsh-reverse-skill` may also appear in package configuration; its presence there does not make the npm release compatible.
3. **Review the skill before use.** Check its declared name, description, and `user-invocable` setting. For defensive analysis, review the relevant skill text as a reference and verify the permissions actually enforced by your harness rather than relying on restrictions declared in the file.

## How to troubleshoot dsh-reverse-skill

- **The npm package fails compatibility checks.** The published 1.0.x builds declare an older `@deepseek-ai/dsh-skill` peer dependency. DSH 0.2.0 and later reject them during preflight, so a rejected attempt does not add the plugin to the profile.
- **The plugin is missing after a profile change.** Confirm that you are inspecting the same profile the application uses and that the plugin is enabled there. Restart the app or reload the web interface, then check the effective configuration again. If the entry is still missing, review the DSH version and startup logs.
- **A nested skill is missing from a preset.** The preset loader examines direct subdirectories only. A partial inventory in preset mode therefore does not, on its own, indicate a broken skill file.
- **A skill names a tool that is not available.** External MCP servers are not part of the bundle. Check whether the dependency has been configured separately; the skill text itself does not register the tool.
