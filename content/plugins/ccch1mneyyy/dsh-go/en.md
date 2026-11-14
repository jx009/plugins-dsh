---
title: "dsh-Go: Run and Control DSH on Android"
description: "dsh-Go is an Android client for DSH plugin workflows. Learn how to install the APK, connect remote hosts, configure models and fix setup errors."
summary: "Run the DSH engine on your Android device without Root or Termux, or connect to a computer through SSH or DSHarness Remote. Chat, review tool approvals and use adapted plugin interfaces from your phone."
highlights:
  - "On-device Linux without Root or Termux"
  - "SSH and DSHarness Remote connections"
  - "Native plugin cards and forms"
  - "Permission-based Android phone control"
  - "Conversation sharing and browser replay"
faq:
  - q: "How do I install dsh-Go for DeepSeek Harness?"
    a: "Download the APK matching your device from GitHub Releases or the project download page; Android 8.0 or later is required. Choose local environment installation or a remote host on first launch, then configure the selected host’s model and credentials."
  - q: "Does dsh-Go run AI models offline on Android?"
    a: "Local mode runs the DSH engine on the phone, not necessarily the model. Requests still go to your configured model provider, so local execution does not mean your data stays on the device."
  - q: "Why are some dsh-Go features missing with DSHarness Remote?"
    a: "That connection method supports image attachments but not the in-app web interface, DS Bot or conversation-log export. Plugin management is limited to enabling and disabling plugins, so it does not offer the same feature set as every other host configuration."
  - q: "What does dsh-Go need to control my Android phone?"
    a: "Phone control is available to the local engine in normal mode after you grant the permissions requested by the app, including accessibility access. The separate non-disturbing mode additionally requires Android 14 or later and Shizuku or self-connected ADB."
  - q: "Why can’t dsh-Go install over my old test APK?"
    a: "An early test build with a different signing identity cannot be updated by installing the new APK over it. The README instructs users to uninstall that build first, but doing so removes conversations, the Linux environment and settings."
---

## What does dsh-Go do?

dsh-Go is an Android client for DeepSeek Harness that combines on-device engine execution with access to remote hosts. It helps developers continue agent conversations, review tool requests and work with a computer’s DSH from a phone. This is a community-built, unofficial client, not an npm plugin package with a documented installation command.

For DSH plugin users, the app also supports adapted native interfaces. Local mode runs the agent engine inside the phone’s Linux environment; model requests still reach the provider you configure. It should not be described as offline model inference or a guarantee that data never leaves the device.

## dsh-Go core features

- **Local Linux environment:** Install Ubuntu, Node.js and the engine from inside the app. Root access and a separate Termux installation are not required.
- **SSH and DSHarness Remote:** Connect to a computer or server instead of running locally. Remote-only use does not require installing the phone’s execution environment.
- **Chat and plugin interfaces:** Switch models, send images, use voice input and handle tool approvals. Adapted plugins can display native tool cards, forms and panels; the repository includes an SDK, tutorials and examples.
- **Android phone control:** With the necessary permissions, the local engine can read the screen, tap and enter text. You can stop it, and sensitive actions retain protective checks by default.
- **Sharing and conversation replay:** Create reply cards or share conversations for browser replay through end-to-end encrypted links. Check the preview before sharing, because recipients can retain the content.

The interface also adapts to tablets and landscape use. Language settings support Chinese and English, while themes, icons and desktop pets provide appearance options.

## How to install and use dsh-Go

There is no confirmed npm package or DSH installation command in the supplied project information. Install the Android app rather than substituting the repository name into a plugin command.

1. Download an APK from GitHub Releases: `https://github.com/ccch1mneyyy/dsh-Go/releases`. Use Android 8.0 or later and select the correct architecture. Most 64-bit phones use arm64; x86_64 devices and emulators use the x64 build under the release notes’ other downloads. No 32-bit ARM build is provided.
2. Allow installation from the chosen source when Android prompts you. The documented distribution method is APK sideloading, not a Google Play installation flow.
3. On first launch, choose an on-device environment or a remote host. For remote access, use SSH or the supported remote connection service.
4. Configure the selected host’s model and credentials before starting a conversation. Some remote channels require configuration on the host itself; do not assume all settings belong in the mobile app.
5. Enable phone-control permissions only if needed. Normal-mode control requires a local engine; the separate non-disturbing mode requires Android 14 or later plus Shizuku or self-connected ADB.

Language can be changed in settings. Anonymous usage statistics are enabled by default and can be disabled during onboarding or under Settings → Privacy and sharing. Screen text, and potentially screenshots with image-capable models, may reach the provider during phone-control tasks.

## How to troubleshoot dsh-Go

- **APK update fails:** Check whether an older test build uses a different signature. Uninstalling it is the documented remedy, but first preserve important data: removal clears conversations, the Linux environment and settings.
- **Remote features are unavailable:** Check the connection method. DSHarness Remote supports only image attachments, cannot open the in-app web interface, limits plugin management to toggles and does not support DS Bot or conversation-log export.
- **Local startup behaves differently:** PRoot compatibility startup is the default. If you enabled direct startup in developer options, consult the project FAQ for compatibility and fallback instructions rather than assuming that mode works everywhere.
- **Other setup problems:** Confirm the selected host and model credentials, then check versions and available logs. For a host-side plugin issue, verify its profile and enabled state before restarting the relevant engine.

Repository documentation: `https://github.com/ccch1mneyyy/dsh-Go`.
