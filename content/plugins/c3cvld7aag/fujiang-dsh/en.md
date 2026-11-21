---
title: "fujiang-dsh: Built-in DSH Prompt Rules"
description: "fujiang-dsh is a Windows DSH plugin with built-in prompt rules. Learn how to install it, choose a profile, and troubleshoot setup errors."
summary: "Use bundled prompt rules without copying them into chat. The Windows installer lets you choose a local profile, and a status message confirms whether the plugin loaded."
highlights:
  - "Built-in prompt rules"
  - "One-click Windows install and uninstall"
  - "Automatic Node.js and pnpm setup"
  - "Local DSH profile selection"
  - "Activation status above the chat box"
faq:
  - q: "How do I install fujiang-dsh on Windows?"
    a: "Download and fully extract the project ZIP, then close DeepSeek Harness before running the install batch file. Start DSH again once setup finishes."
  - q: "What is the fujiang-dsh activation word?"
    a: "Enter `富江` in chat to use the bundled prompt rules. The status message above the input box tells you whether the plugin loaded, not whether a particular response will follow those rules."
  - q: "Do I need to install Node.js before running fujiang-dsh?"
    a: "No. The installer reuses a working Node.js 22 or newer setup with npm, or downloads a supported runtime to your user directory if needed."
  - q: "Why does fujiang-dsh say it cannot find my DSH profile?"
    a: "Launch DeepSeek Harness at least once so it can create `%USERPROFILE%\\.dsh`. Then close the app and rerun the installer."
  - q: "How do I uninstall fujiang-dsh from the right profile?"
    a: "Close DSH and run `点我一键卸载.bat` from the original extracted project folder. If prompted, select the profile you installed it into, then restart the app."
---

## What does fujiang-dsh do?

fujiang-dsh is a local DSH plugin that adds built-in prompt rules to DeepSeek Harness on Windows. The repository documents version `0.4.3` and uses `fujiang-armor` as the installed plugin ID. The rules ship with the plugin, so you do not have to copy prompt text into each chat.

## fujiang-dsh core features

- **Bundled prompt rules.** Once the plugin is loaded, you can invoke the included rules with a keyword in chat.
- **Local profile selection.** If the installer detects more than one DSH profile, it asks which one should receive the plugin.
- **Automatic runtime setup.** The installer reuses working Node.js 22 or newer with npm. If that setup is missing, outdated, or broken, it downloads a Node.js LTS release, verifies its SHA-256 checksum, and installs it for the current user without changing the system `PATH`. It fetches pnpm through npm if needed.
- **Visible load status.** A message above the chat input confirms that the plugin loaded. It does not guarantee a particular response: the selected model, other prompts, and the DSH version can all affect the output.

## How to install and use fujiang-dsh

The README documents a Windows batch installer rather than a DSH CLI command. Install DeepSeek Harness and launch it at least once before running setup. Keep an internet connection available for the first installation.

1. Download the release ZIP or use the repository's `Code` menu to download the source ZIP. Extract the entire archive so the batch files and their supporting folders stay together.
2. Fully exit DSH, then double-click `点我一键注入.bat` in the extracted folder.
3. If setup finds multiple profiles, select the one you actually use. Wait for the runtime and plugin installation to finish, then relaunch the app.
4. Open a conversation and look for `富江破甲已激活` above the input box. Enter `富江` in chat to use the bundled rules.

The plugin files are installed under `%USERPROFILE%\.dsh\plugins\fujiang-armor`. Keep the extracted project folder for removal. To uninstall, close the app, run `点我一键卸载.bat`, select the original profile if prompted, and relaunch.

## How to troubleshoot fujiang-dsh

- **Profile not found:** Launch DSH once and check that `%USERPROFILE%\.dsh` exists. Fully exit before retrying setup.
- **Scripts or rules are missing:** Extract the ZIP again and keep folders such as `prompts` and `scripts` alongside the batch files. Running a copied batch file on its own is not enough.
- **Runtime or dependency download fails:** Check that your network can reach `nodejs.org` and the npm registry. If checksum verification fails, check the connection and retry; the installer will not use the rejected archive. Keep the error output if the problem persists.
- **Status message is missing or remains after removal:** Fully quit and reopen the app. Confirm that you installed or removed the plugin in the profile you are currently using.
- **DSH keeps restarting:** If you use `dsh-purge` `1.1.52`, follow its official upgrade instructions for `1.1.53` or later. Do not fill an empty patch `sha` with an arbitrary value. If the loop continues, save the startup logs and verify which version and profile are active.
