---
title: "deepseek-harness-mobile: DSH Android control"
description: "deepseek-harness-mobile is a DSH companion app for Android. Learn how to set it up, configure models and check connection or on-device issues."
summary: "Follow coding tasks, approve commands and manage sessions from Android. Connect to a computer over Wi-Fi or relay, or try the built-in phone harness."
highlights:
  - "Android chat and command approvals"
  - "Goal tracking and background notifications"
  - "Wi-Fi and relay connections"
  - "On-device harness setup in beta"
  - "Workspace previews and remote terminal"
faq:
  - q: "How do I install deepseek-harness-mobile for DeepSeek Harness?"
    a: "This project is an Android companion app, not a documented npm plugin installation. Use the repository's releases for the app, then paste the link printed by your computer's harness or choose Set up for the built-in harness."
  - q: "Can deepseek-harness-mobile work without a computer?"
    a: "Yes, the built-in harness beta can run on a 64-bit phone with Android 8.0 or newer. You still need an internet connection and a model-provider API key; the app does not run the model locally."
  - q: "How do I configure an API key in deepseek-harness-mobile?"
    a: "For the built-in harness, add your model-provider API key in Settings, Models. The harness sends model requests to that provider over the internet."
  - q: "Does deepseek-harness-mobile notify me when approval is needed?"
    a: "The app provides notifications when the agent needs an answer, a turn finishes, or a goal completes or becomes blocked. It also supports approving or rejecting commands and reviewing plans."
  - q: "How much storage does deepseek-harness-mobile need for the built-in harness?"
    a: "The initial harness download is about 155 MB, with roughly 1.1 GB used on the phone and 1.4 GB free needed during setup. The running harness uses about 300–400 MB of memory."
---

## What does deepseek-harness-mobile do?

deepseek-harness-mobile is an unofficial Android companion app for controlling DeepSeek Harness from a phone. It helps developers follow coding work away from their desks, answer agent questions and approve commands without returning to the computer. For users browsing a DSH plugin marketplace, this is a device integration rather than a documented npm-installed extension.

You can connect to an existing harness over your local Wi-Fi network or through a relay. Alternatively, the built-in harness beta runs inside the Android app, so a computer is not required. The app supports Android 8.0 and newer; the built-in option additionally requires a 64-bit phone and a model-provider API key.

## deepseek-harness-mobile core features

- **Chat and command approvals.** Read streaming replies, reasoning, code and tool calls. Attach photos or files, reference workspace files with `@`, invoke commands or skills with `/`, and approve or reject requested commands.
- **Goals and notifications.** Separate views expose goals, todo lists, queued messages, background jobs and subagents. Notifications cover completed turns, completed or blocked goals, and requests for your input while the connection stays active in the background.
- **Sessions and harness management.** Group sessions by project or drag them into a preferred order. Manage models, agent presets, plugins, scheduled tasks and archived sessions from the app.
- **Workspace previews and terminal.** Browse workspace files and preview formats including CSV, JSON, notebooks and PDFs. Save copies to your phone or open a shell on the harness computer.
- **On-device harness beta.** A downloaded Linux environment runs Node.js and the harness through `proot`. It supports repositories, files, agents and shell tools without requiring a separate computer.

## How to install and use deepseek-harness-mobile

No DSH installation command or confirmed npm package is provided in the supplied README. Install the Android app using the repository's releases rather than substituting the repository name into a plugin command.

1. Choose where the harness will run. For an existing computer installation, select the local-network or relay connection route and paste the link the harness prints into the app's connection screen. That link connects and signs you in.
2. To run on the phone instead, open This phone and tap `Set up`. Setup downloads, checks and unpacks the environment, then starts the harness and signs you in.
3. For the built-in option, add your provider's API key under `Settings` → `Models`. Allow about 155 MB for the initial download and 1.4 GB of free storage during setup; the installed environment occupies about 1.1 GB.
4. Choose command handling. `Ask me first` shows each command and waits for approval; `Run it` is the alternative. The on-device environment cannot sandbox commands or run a model locally.
5. Start chatting, inspect tool calls and follow progress in the goal or subagent views. Long-press messages, tool calls or files to find contextual actions.

## How to troubleshoot deepseek-harness-mobile

The built-in harness arrived in version 0.22.0 and remains beta. Testing described in the README covered emulators and one Samsung phone, so compatibility with every phone is not established.

- If setup fails, check the Android version, 64-bit requirement and available storage. Running the harness also needs roughly 300–400 MB of memory.
- If model requests fail, check your provider key in `Settings` → `Models` and internet access. On-device operation does not mean offline inference.
- If a computer connection fails, recheck the harness address and whether you selected local network or relay. As general checks, restart the harness and review versions and available logs.
- For built-in harness inspection, use its harness page, which exposes start, stop, updates, storage and logs. A computer-hosted harness or Termux remains an alternative described by the README.
