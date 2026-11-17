---
title: "desktop-pet: DSH Status Companion"
description: "desktop-pet is a DSH plugin companion that shows agent status as Comi. Learn how to set it up, switch display modes and fix connection issues."
summary: "Keep Comi on your desktop or inside DSH to follow work, permission requests and results. Local adapters connect assistant events without giving the pet control over your tasks."
highlights:
  - "Desktop and DSH display modes"
  - "Permission reminders and task status"
  - "Local file-based status bridge"
  - "Chat through your DSH model"
  - "macOS and Windows desktop companion"
faq:
  - q: "How do I install desktop-pet in DeepSeek Harness?"
    a: "Download the desktop package for your operating system and install the separate DSH adapter using adapters/dsh/README.md in the repository. Reload DSH when enabling its frontend plugin for the first time; the provided README does not include a DSH installation command."
  - q: "Does desktop-pet support Windows, macOS and Linux?"
    a: "Packaged versions support Windows and macOS 13 or later, while Linux is not currently supported. Windows also supports walking along visible window tops and random dialogue bubbles; those two features are not available on Mac."
  - q: "Why does desktop-pet return to the desktop after switching to DSH?"
    a: "The desktop pet hides only after the DSH page confirms that it has taken over. Without that confirmation it falls back after about six seconds; if the page later closes or disconnects, desktop display resumes when the lease expires, around 60 seconds."
  - q: "Does desktop-pet need an account or model API?"
    a: "The standalone pet runs without an account, Codex or a model API. Optional conversation requires an online DSH instance with the adapter installed and uses the model configured there."
  - q: "Can desktop-pet follow my current Codex desktop session?"
    a: "No, the documented Codex adapter cannot currently follow an existing Codex desktop session. Its verified scope is limited to an independent App Server client handshake, thread listing and simulated events."
---

## What does desktop-pet do?

desktop-pet is a DSH plugin companion that brings Comi, a small animated desktop pet, into your coding workflow through an optional adapter. The project is primarily a standalone application for macOS and Windows, rather than a pet that requires an assistant to run. For DeepSeek Harness users, it adds visible work status, permission reminders and feedback when a round finishes or fails.

Comi can live on the desktop or move into the harness interface. She reacts to clicks and dragging, plays animated routines and can display information supplied by connected assistants. The status bridge does not approve permissions, submit tasks or take control of an assistant. Closing either side leaves the other free to continue working.

## desktop-pet core features

- **Desktop and embedded display:** Switch between the standalone pet and the DSH interface. Embedded mode supports dragging, action playback and status bubbles, with coordinated handover to avoid displaying two copies.
- **Work status and permission reminders:** Follow session and tool events, waiting for confirmation and goal results through the DSH host plugin. In automatic source mode, sessions awaiting confirmation take priority over the most recently active session.
- **Local status bridge:** Adapters deliver events through local files, without network transport or additional model calls for status synchronization. Status and tool names are sent by default; task labels and reply summaries require separate opt-in and depend on the source.
- **Animations and interaction:** Click to make Comi hop, double-click for a happy reaction, or drag and throw her with bouncing physics. The right-click menu offers individual actions, automatic playback and five Halloween routines.
- **Optional conversation:** Talk to Comi using the model configured in DSH. This requires the adapter and an online host; the pet retains the most recent eight conversation rounds locally.

## How to install and use desktop-pet

The supplied README provides no DSH installation command or confirmed npm package name. Use the repository's `adapters/dsh/README.md` for adapter installation rather than guessing a package command.

1. Download the appropriate ZIP from the repository's latest release and extract it. On macOS 13 or later, open `ComiPet.app`; on Windows, run `ComiPet.exe` without installing Python.
2. Install the DSH adapter separately. Version 2.2.0 adds visual plugin configuration. Reload the harness when first enabling the frontend plugin.
3. Open the Comi entry in DSH to move the character into its interface. You can also initiate the switch through the standalone pet's display-mode menu.
4. Choose a tracking source from the right-click menu. Automatic mode accepts all configured sources; selecting one source prevents other assistants from taking over the display. Selecting a source alone does not install its adapter.
5. Configure action playback and notifications through the companion menu. Notifications default to interrupting only while the desktop pet is hidden in embedded mode; they can also be set to always appear or disabled.

Position is remembered in `~/.comi-pet/config.json`. For optional conversation, choose the right-click talk command; clearing its history deletes `~/.comi-pet/chat/memory.json`. The local control interface also supports commands such as `python tools/comi_cli.py say "Take a break"`.

## How to troubleshoot desktop-pet

- If macOS cannot verify the developer, right-click the application and choose Open. Alternatively, run `xattr -d com.apple.quarantine ComiPet.app` before opening it; the package is temporarily signed and not notarized.
- After updating the DSH plugin, restart the host and refresh its page. For a missing plugin, also check the active profile, enabled state, installed version and logs.
- If embedded mode does not take over, keep the DSH page available. The pet returns to the desktop after roughly six seconds without confirmation, or after a roughly 60-second lease expires following disconnection.
- If a source shows no events, confirm its adapter is installed. Merely opening the assistant or selecting its name is not a connection.
- Treat the insufficient-quota animation as a manually selected performance, not a balance detector. Claude Code, Cursor and OpenCode adapters still need real-client validation; Codex cannot follow the current desktop session.
