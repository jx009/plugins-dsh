---
title: "deepseek-harness-android-app: Run DSH on Android"
description: "deepseek-harness-android-app is a DSH app for Android with built-in plugins. Learn how to install the APK, configure permissions, and fix launch errors."
summary: "Run DeepSeek Harness on your phone without Termux. Use the built-in tools to edit files, interact with apps, browse the web, and get notifications when tasks finish."
highlights:
  - "Direct APK installation without Termux"
  - "Root-free screen control through Android Accessibility"
  - "Optional Shizuku or root for system tasks"
  - "Separate virtual display with live preview"
  - "Multi-tab AI browser with structured page snapshots"
faq:
  - q: "How do I install deepseek-harness-android-app without Termux?"
    a: "Download an APK from the repository's GitHub Releases page and install it directly on your phone. The download includes the harness engine and its mobile tools, so the app itself does not need a DSH plugin install command."
  - q: "Can deepseek-harness-android-app edit files without Shizuku or root?"
    a: "Yes. Grant Android's All files access permission for file reading, previews, and editing; you do not need either privileged setup for those tasks."
  - q: "Why is the deepseek-harness-android-app virtual screen blank?"
    a: "First check that Shizuku is authorized or that the device has root, then open the app so its virtual screen bridge can start. If the display exists but has not produced a frame yet, the virtual screen tool's `waitMs` option lets it wait for the first frame."
  - q: "Does deepseek-harness-android-app work with an older Android WebView?"
    a: "The compat APK bundles GeckoView so it does not rely on the system WebView. It requires Android 8.0 (API 26) or later and is larger than the standard build."
  - q: "How do I enable the AI browser in deepseek-harness-android-app?"
    a: "Use the Plugins page in the native console to turn on the bundled browser plugin. The AI Browser page shows the active page and open tabs and lets you display the browser on your phone screen."
---

## What does deepseek-harness-android-app do?

`deepseek-harness-android-app` is a DSH app for Android that packages the DeepSeek Harness engine and five built-in plugins in an installable APK. If you found it while looking for a DeepSeek Harness plugin for Android, the distinction matters: you install the app on your phone, then manage its bundled tools from the native console. You do not need Termux, and you can set up only the permissions that match what you want the agent to do.

## deepseek-harness-android-app core features

- **Android Accessibility screen assistant.** Read the current screen's controls and let the agent tap, type, or scroll without Shizuku or root. Screenshot interpretation through this service requires Android 11 or later and a model that accepts images.
- **Optional system controls.** The bundled Android and Shizuku tools support tasks such as managing apps and changing system settings. The app prefers root if available and otherwise uses Shizuku when authorized.
- **Virtual screen.** Launch an app on a separate display where the agent can interact with it while you continue using the main screen. A floating preview shows what is happening on that display.
- **AI browser.** The agent can open web pages, locate elements through structured DOM snapshots, and interact with them across multiple tabs. The browser runs in a separate process, so a page crash does not take down the console or engine.
- **File editing and task notifications.** Grant All files access for reading, previewing, and editing files without privileged system access. Foreground operation helps keep tasks running when the app is in the background, and notification permission lets the app alert you when a task finishes or needs attention.

## How to install and use deepseek-harness-android-app

1. Download an Android APK from the `woaiys3/deepseek-harness-android-app` GitHub Releases page and install it on your device. No DSH CLI install command is needed for the APK.
2. Open the app and use the native console to check runtime extraction, review the permission prompts, and see which bundled tools are enabled on the Plugins page. If you only need file editing, grant All files access and skip the privileged setup.
3. For basic screen interaction, open Android Settings, go to Accessibility, and turn on the DeepSeek Harness screen assistant under downloaded services. Back in the app, ask the agent to read the screen before interacting with a visible control.
4. For a separate virtual display, authorize Shizuku or use a rooted device. Open the app after setting up access so the virtual screen bridge can start, then ask the agent to create a display. The floating preview should appear when the display is created.

## How to troubleshoot deepseek-harness-android-app

- **The engine will not start after an upgrade.** If the console reports a missing `cosmokit` export, use its re-extract option rather than clearing app data. This repair removes stale engine packages without touching user data or third-party plugins.
- **Invalid YAML prevents startup.** Start in safe mode from the console. It sets the user configuration aside and starts with factory defaults without deleting sessions or credentials.
- **Screen controls are unavailable.** Check Android Accessibility settings and use `android_a11y_status` to verify that the screen assistant is running. For other missing tools, confirm the relevant plugin is enabled and check the installed app version and console logs.
