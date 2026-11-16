---
title: "pojia-next: Custom Prompts for DSH"
description: "pojia-next is a DSH plugin that replaces built-in client prompts. Learn how to install it, edit persona.md and troubleshoot verification failures."
summary: "Use a shared persona across DSH, WorkBuddy, ZCode and Codex through a Windows executable. Preview file changes, apply prompt replacements and restore backups from its graphical interface."
highlights:
  - "Shared persona.md across four clients"
  - "Read-only preview of file changes"
  - "Automatic backups and one-click restore"
  - "Fixed-phrase prompt verification"
  - "Windows executable without Python installation"
faq:
  - q: "How do I install pojia-next for DeepSeek Harness?"
    a: "Download the official Windows archive, extract the executable and complete activation in its interface. The README says DSH moved to a separate integrated package distributed through the project group in version 8.42; follow the official site's current DSH instructions."
  - q: "How do I change persona.md in pojia-next?"
    a: "Use the prompt editor at the bottom of the window and save your changes. Apply the patch again to load the revised persona into the selected clients."
  - q: "Does pojia-next need Python or an internet connection?"
    a: "The distributed executable does not require a separate Python installation. Activation is verified online, and the core is downloaded after successful verification."
  - q: "How do I verify that pojia-next loaded my prompts?"
    a: "Start a new client conversation and send `破甲自检` by itself. The README's expected result is exactly `破甲自检成功`, without explanations or additional text."
  - q: "Can pojia-next restore the original client prompts?"
    a: "The tool creates backups before making changes and provides a `还原` button to restore the original files. Its `演练` mode lets you inspect proposed changes without writing them."
---

## What does pojia-next do?

pojia-next is a DSH plugin that replaces built-in client prompts with a user-defined persona. It is distributed as a standalone Windows tool rather than an npm extension. For developers using DeepSeek Harness alongside other AI clients, it provides a shared `persona.md` and a graphical workflow for applying, checking and reversing local file changes.

The documented targets are DSH, WorkBuddy, ZCode and Codex. Their integration methods differ: Codex uses `model_instructions_file` in `config.toml`, while ZCode uses instruction, memory and skill files alongside its system-prompt patch. The README warns that modifying third-party client prompts can carry account and terms-of-use risks.

## pojia-next core features

- **Shared persona.md:** Edit one persona for the four supported clients. The window includes a prompt editor, so you can save changes and apply them again without separately editing each client's files.
- **Read-only preview:** The `演练` button shows which files an operation would change. Status indicators also provide read-only detection before you choose to apply anything.
- **Backups and restoration:** Changes are backed up before execution. The `还原` action restores original files using the tool's recorded file list.
- **Prompt verification:** A fixed phrase in a fresh conversation checks whether the expected prompt was loaded. This gives users a specific result to compare instead of asking the model to describe its identity.
- **Client restart and logs:** Since version 8.26, applying changes includes stopping processes that occupy patch files and relaunching clients. The Logs tab displays execution progress, with saved logs available in the data directory.

## How to install and use pojia-next

No DSH installation command or confirmed npm package is provided. Use the Windows distribution described in the README. Its version 8.42 notes say DSH moved to an integrated package obtained through the project group, so check the official site's current DSH download guidance.

1. Download the archive from `https://pojiaduan.cn/` or the repository's GitHub Releases and extract the executable. A separate Python installation is unnecessary.
2. Launch the executable and complete the startup agreements and activation process. New account registration includes QQ group verification; the client accepts an activation code and validates it online before downloading the core.
3. Inspect the client cards and their status indicators. Run `演练` to preview the proposed file changes.
4. Edit the bottom prompt field and save `persona.md`. Select the desired clients and click `破甲` to apply it.
5. Open a new conversation in the target client and send `破甲自检`. The documented expected reply is exactly `破甲自检成功`.

For the standalone executable, personas, logs and backup history are stored in `%LOCALAPPDATA%\破甲一键通\`. Closing the window minimizes it to the system tray; use the tray's exit action to stop it completely.

## How to troubleshoot pojia-next

- **Window closes or fails to open:** The README identifies a missing WebView2 runtime as a common cause, particularly on stripped-down Windows installations. Check that runtime first.
- **WorkBuddy targets remain unchanged:** Version 8.43 addresses insufficient permissions under `C:\Program Files` with an administrator-retry action.
- **Verification returns unexpected text:** Check that you started a fresh conversation. Older tool versions require fully exiting the client, including its tray process, and reopening it. The README also recommends downloading the official build again if the expected response is absent.
- **Changes disappear after a client update:** Refresh the detection results, then apply the patch again. Client upgrades can overwrite patched files.
- **Installation cannot be found:** Use the offered manual directory selection option, `B`. The selected location is remembered for later use.
