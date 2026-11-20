---
title: "dsh-purge: DSH Host Policy Testing"
description: "dsh-purge is a DSH plugin that modifies local host policy. Check installation requirements, profile settings, and troubleshooting steps."
summary: "Check whether dsh-purge matches your Web or desktop setup, see what it changes, and find the controls for restoring or uninstalling it."
highlights:
  - "Grouped patch status in the Clean tab"
  - "Separate Web and desktop profiles"
  - "Built-in Restore and Uninstall controls"
faq:
  - q: "What DeepSeek Harness version does dsh-purge 1.1.71 support?"
    a: "The README says this release targets the DeepSeek Harness 0.2 series and specifically names the official 0.2.0-rc.2 desktop build. Older Harness builds need a matching older plugin release."
  - q: "Why does dsh-purge show up in Web but not on desktop?"
    a: "The official Web client uses the `web` profile, while the official desktop app uses `desktop`. Check whether the plugin is listed and enabled in the profile for the client you're using."
  - q: "Does dsh-purge need Node.js 22 on Windows?"
    a: "The general minimum is Node.js 18. The README lists Node.js 22 or later specifically for the Windows no-flash option."
  - q: "Where is the Restore button in dsh-purge?"
    a: "Open the dock from the button beside the session title, then look in the Clean tab. That tab also has a separate Uninstall control."
  - q: "Is dsh-purge still maintained?"
    a: "The README says maintenance and new releases are paused, and the maintainers are not accepting issues or pull requests during the pause. Compatibility with newer DeepSeek Harness versions is not guaranteed."
---

## What does dsh-purge do?

`dsh-purge` is a DSH plugin that modifies local DeepSeek Harness policy for security evaluation. Its scope includes the host's prompt handling, permission rules, and tool limits. That distinction matters when diagnosing a refusal: the Harness can block an action before it reaches the model, so a refusal on its own does not tell you which layer made the decision.

The README describes changes to an installed copy of the official Harness and its local configuration, not edits to the Harness source tree. This repository is a mirror, and the README credits `YuJunZhiXue/dsh-purge` as the original source. Maintenance is paused, so treat the listed versions as a compatibility statement for this release, not a promise of support for future builds.

## dsh-purge core features

- **Patch status.** The Clean tab groups the status of host changes. Look here to distinguish a plugin that is simply present in a profile from one that has already modified the host.
- **Restore and Uninstall.** Clean exposes separate controls for reversing changes and removing the plugin. If you inherited a modified setup, check the status and use Restore rather than assuming that closing the dock or switching clients resets the host.
- **Client-specific profiles.** Official Web and the official desktop app use different profiles. A listing or status you see in one client does not confirm the state of the other.

## How to install and use dsh-purge

This listing covers compatibility, status checks, and recovery rather than installation or activation steps for changes that bypass prompt, approval, or sandbox controls. If the plugin is already present, use these checks to identify the affected client and review its state.

1. Check your Harness version. The README identifies plugin version `1.1.71` as targeting the `0.2` series and names `0.2.0-rc.2` for the official desktop app. Community Desktop is not maintained.
2. Verify the runtime. The general requirement is Node.js `18` or newer. The separate Windows no-flash option has a higher minimum of Node.js `22`.
3. Identify the active profile. Official Web runs under `web`; the official desktop app uses `desktop`. Check the client you actually launched before comparing its plugin status with another window.
4. To inspect an existing setup, open the dock from the button beside the session title and look at the grouped status in Clean. If your goal is to undo existing changes, use Restore. The same tab provides Uninstall if you no longer want the plugin.

## How to troubleshoot dsh-purge

- **The dock button is missing.** Confirm that you're using a supported official client and that the plugin is enabled in that client's profile. Restart the client and check beside the session title again.
- **The plugin is listed but the host looks unchanged.** Adding a plugin to a profile does not by itself modify the host. Use the grouped status in Clean to check whether changes are present rather than treating the plugin listing as confirmation.
- **A problem started after a Harness upgrade.** Compare the running build and Node.js version with the requirements above, then check the Harness logs. The maintenance pause means a newer host build may not have a matching plugin release.
