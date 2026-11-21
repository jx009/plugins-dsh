---
title: "AIBanlv-Bot: 3D Desktop Companion for DSH"
description: "AIBanlv-Bot is a 3D desktop companion for DeepSeek Harness. Learn how to install it, configure voice and agent access, and troubleshoot connection issues."
summary: "Send a task by text, voice, or a paired phone, then follow its progress beneath a 3D desktop avatar. Use the built-in Harness or connect the client you already use."
highlights:
  - "Built-in Harness and client connection"
  - "Codex and WorkBuddy task delegation"
  - "3D avatar with voice interaction"
  - "Phone task control and file delivery"
  - "Local persona and conversation memory"
faq:
  - q: "Can I install AIBanlv-Bot with the DSH plugin command?"
    a: "The project README does not provide a DSH install command or identify an npm package for the connector. Install the desktop app first, then follow the repository's connector instructions if you want to link an existing Harness client."
  - q: "Does AIBanlv-Bot work on an Intel Mac?"
    a: "No, the README lists Intel Macs as unsupported. The Mac download is for Apple Silicon, and the full source environment has separate requirements from the packaged app."
  - q: "Can AIBanlv-Bot use DeepSeek without a Qwen Realtime key?"
    a: "Yes. In local mode, text and computer tasks can use a DeepSeek key or a connected Harness client; the Qwen Realtime key is for voice features."
  - q: "Why can't AIBanlv-Bot send a task to Codex or WorkBuddy?"
    a: "Check that the agent you selected is installed separately and that you're signed in to it. Then confirm that the relevant tool is enabled and the task falls within its configured permissions."
  - q: "Does AIBanlv-Bot local mode work offline?"
    a: "Not for every feature. The avatar renders on your computer, but model and voice requests still reach the providers you've configured."
  - q: "Can AIBanlv-Bot send a screenshot to my phone?"
    a: "Yes, once you pair the companion app, you can request a screenshot or a specific file be sent to your bound phone. Delivery depends on the available tools and permissions."
---

## What does AIBanlv-Bot do?

AIBanlv-Bot is a 3D desktop companion for DeepSeek Harness that uses a DSH plugin to connect to an existing signed-in client. The desktop app also includes its own Harness runtime, so connecting another client is optional. Give the avatar a task by typing, speaking, or sending it from a paired phone. Once a configured tool or agent takes the task, you can follow its public updates and results under the avatar or opt to hear a spoken report.

## AIBanlv-Bot core features

- **Computer tools.** Use plain language to request a search, read material, or perform a supported action on your computer. The built-in Harness routes the request to tools you've configured, within the permissions you've granted.
- **Codex and WorkBuddy delegation.** Hand work to an agent you already have installed and signed in to. The companion reports public progress and results without displaying hidden reasoning.
- **Phone pairing.** Submit tasks from the companion app and have the desktop send a screenshot or a specific file back to your bound phone. Review what you're sharing before asking the agent to send it.
- **3D voice interaction.** The desktop avatar renders locally and uses facial expressions and lip sync. You can interact by voice, text, or mouse. Local rendering doesn't require a dedicated graphics card.
- **Local persona and memory.** Set up a character with its own prompt, and keep persona details and conversation records in `SOUL.md`, `MEMORY.md`, and daily conversation files.

## How to install and use AIBanlv-Bot

The README doesn't provide a DSH install command or a confirmed npm package name. Start by downloading the desktop installer for Windows x64 or Apple Silicon from the project's download page. The README lists Windows 10 or 11 and macOS 13 or later for packaged use; check the release notes for the build you choose. For a source install, start with `docs/INSTALL_FOR_AGENTS.md` and, on Apple Silicon, also read `docs/MAC_SOURCE_BUNDLE.md` for the runtime requirements and self-checks.

1. Open the desktop app, select a character, and choose a usage mode. Local mode uses your own model credentials and doesn't require QR sign-in. Online mode offers public characters, with QR sign-in enabling account credits, phone sync, and cloud saves.
2. In the app's configuration, enable the AI tools you want. For a local character, use a Qwen Realtime key for voice, and either a DeepSeek key or a connected Harness client for text and computer tasks. To link an existing signed-in client instead of relying on the built-in runtime, follow `demos/web-desktop-pet/harness-client-plugin/README.md`.
3. Try a text request first, such as asking the companion to search for a topic and list its sources. Check for the result under the avatar before adding voice, an external agent, or phone pairing.

## How to troubleshoot AIBanlv-Bot

- If the desktop app won't start, check that the build matches your OS and CPU architecture. For an Apple Silicon source install, use the resource checks in `docs/MAC_SOURCE_BUNDLE.md` on the Mac that will run the app.
- If the external Harness connection doesn't work, confirm you're signed in to the intended client and that the connector is enabled in the active profile. Restart DSH, then check the app and client versions and review their logs before retrying.
- If chat works but a tool action doesn't, verify that the tool is enabled and that you've granted the required permissions. Keep API keys and private conversation content out of any public issue or log excerpt.
