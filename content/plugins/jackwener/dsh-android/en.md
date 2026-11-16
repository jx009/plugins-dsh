---
title: "DSH-Android: Run DSH on Android"
description: "DSH-Android is a DSH plugin integration app that runs agents on Android. Learn how to install the APK, set up models and fix common errors."
summary: "Run the harness on your Android phone to operate apps, manage files and automate tasks. Install one APK without root or Termux, or connect to a remote agent."
highlights:
  - "Android app control through accessibility"
  - "Scheduled and event-triggered automation"
  - "Optional Shizuku system controls"
  - "OpenAI-compatible model services"
  - "SSH and DSH Remote connections"
faq:
  - q: "How do I install DSH-Android for DeepSeek Harness?"
    a: "Download the APK from the repository’s Releases and install it on an Android 10 or newer arm64-v8a phone. Sign in to DeepSeek or enter an API key, then describe a task; the app prompts for permissions as needed."
  - q: "Does DSH-Android need root, Termux or Shizuku?"
    a: "Root and Termux are not required because the app embeds the engine. Shizuku is optional and enables additional system controls; Android 14+ virtual-screen operation requires Shizuku or a self-connected ADB setup."
  - q: "Can DSH-Android use Claude, Gemini or OpenRouter?"
    a: "The app includes these provider options under Settings → Model services, with third-party access limited to HTTPS OpenAI-compatible Chat Completions interfaces. Web search still requires a separate DeepSeek API key when you use another provider."
  - q: "Why do DSH-Android plugin timers stop in the background?"
    a: "By default, the engine stops five minutes after tasks finish, which also stops plugin timers and bot connections. Enable engine persistence under Settings → About → Background keep-alive and follow that page’s background-running instructions."
  - q: "Can DSH-Android control apps while my phone is locked?"
    a: "A secure lock screen prevents interaction with other apps, so those tasks pause until you unlock the phone. System API tasks, including file, settings and notification operations, can continue."
---

## What does DSH-Android do?

DSH-Android is a DSH plugin integration app that runs DeepSeek Harness on Android and exposes phone capabilities to its agent. It helps users operate apps, organize files, change settings and automate recurring work through conversation. Distribution is an Android APK with an embedded engine, so getting started requires neither root nor Termux.

DSH-Android for DeepSeek Harness also supports SSH and DSH Remote connections to a computer or server. If you use only remote mode, the phone does not need a local runtime installation. This is a community project with no official DeepSeek affiliation or endorsement.

## DSH-Android core features

- **App control and floating access:** Accessibility services provide screen reading, tapping, swiping and typing. A floating button lets you start a conversation or share the current screen; you can pause, stop or interrupt the agent.
- **Files and scripts:** Find, move, rename, archive and extract files, and read text from PDF, Word, Excel and PowerPoint documents. The included Linux environment supports Python and agent-written scripts.
- **System controls and Shizuku:** Adjust settings such as brightness and volume, interact with notifications and control media. Optional Shizuku access unlocks additional system switches. Android 14+ supports virtual-screen operation with Shizuku or self-connected ADB.
- **Scheduled and conditional automation:** Run tasks on a schedule or trigger them through Wi-Fi, Bluetooth, charging, location and notification events. These capabilities support recurring phone workflows.
- **Model services and harness features:** Add services such as OpenAI, Claude, Gemini and OpenRouter through supported interfaces. The original harness engine retains skills, MCP, sub-agents and web search.

## How to install and use DSH-Android

Installation uses an APK from the repository’s Releases. The README provides no DSH plugin installation command, and no npm package name is confirmed.

1. Download the APK from `https://github.com/jackwener/DSH-Android/releases/latest`. Check that your phone runs Android 10 or newer and uses arm64-v8a. The package is approximately 110 MB; reserve around 500 MB of available storage.
2. Install and open the app. Sign in to your DeepSeek account or enter an API key. Your network must be able to reach the DeepSeek API.
3. Start with a concrete request, such as listing the five largest files in Downloads. Enable the permissions requested for that task.
4. To add another provider, open Settings → Model services, enter its key and fetch the model list. Choose a model in the model selector. Third-party endpoints must support HTTPS OpenAI-compatible Chat Completions.
5. Optionally install Shizuku through Settings → Phone permissions. For continuously connected plugins, enable engine persistence under Settings → About → Background keep-alive.

## How to troubleshoot DSH-Android

- **Unsigned-package warning:** Use version 0.3.5 or newer, which includes v1, v2 and v3 signatures for broader installer compatibility.
- **Package parsing failure:** Download the APK again from Releases. Check for an altered extension such as `.apk.1` and verify SHA-256 against the release notes.
- **Signature mismatch or incompatible device:** A differently signed installation must be uninstalled before installing the official build; this clears app data. Compatibility requires Android 10+ and arm64-v8a.
- **Play Protect blocks installation:** After verifying the release hash, use the warning dialog’s additional details and install-anyway option. If `adb install` appears stuck, check whether that dialog is awaiting input on the phone.
- **App actions pause or background work stops:** Unlock a secure lock screen to resume app interaction. Follow the health-check page’s guidance for vendor-specific autostart and background pop-up permissions. Restart Shizuku after reboot, or configure its wireless-debugging startup feature on supported versions.
- **Missing model controls or search:** Declare reasoning controls for custom models under Settings → Model services → Model settings. Third-party model use needs a separate DeepSeek API key for web search; tool-call results depend on the selected model.
