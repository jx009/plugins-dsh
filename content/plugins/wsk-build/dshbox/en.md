---
title: "DSHBox: Run DSH on Android"
description: "DSHBox is an Android app for local and remote DSH, with bundled plugins. Learn how to install it, pair devices and fix blank workspace pages."
summary: "Run DeepSeek Harness on an Android phone or connect to another device. Access a terminal, files, browser automation and phone controls from one app, without requiring root or Termux."
highlights:
  - "Local DSH with Debian and Node.js"
  - "QR pairing and remote device management"
  - "Browser automation with browser-use"
  - "Phone control with Pilot and Shizuku"
  - "WebView or bundled Gecko rendering"
faq:
  - q: "How do I install DSHBox for DeepSeek Harness?"
    a: "Download an APK from the repository’s latest release and install it on an Android 10+ ARM64 device. Follow the first-run guide to prepare Debian and Node.js for local operation."
  - q: "Does DSHBox need root or Termux?"
    a: "Ordinary use requires neither root nor Termux. The separate developer-mode Root channel is optional and requires an existing working su implementation."
  - q: "Why does DSHBox show a blank workspace?"
    a: "An old or vendor-restricted system WebView can cause blank pages and loading errors. The README recommends the bundled Gecko variant in this situation; both APK variants share the package name and signature and support installing over each other while retaining app data."
  - q: "How do I connect DSHBox to a remote computer?"
    a: "Open the Remote tab and scan a supported pairing code or paste a pairing link, then approve the confirmation card. Endpoints support proxy or direct connections, with settings saved separately for each endpoint."
  - q: "What is the difference between DSHBox Browser and Pilot?"
    a: "Browser provides automation for pages in the built-in browser, while Pilot operates native phone apps and platform capabilities. Their bundled integrations are controlled through separate switches in Cordis."
---

## What does DSHBox do?

DSHBox is an open-source Android app that runs DeepSeek Harness locally or connects to an instance on another device. It gives developers a mobile workspace combining a terminal, file management, browser automation and phone control. Ordinary use requires neither root nor Termux.

DSHBox for DeepSeek Harness is distributed as an APK, with bundled integrations and DSH plugin management inside the app. Local operation uses a PRoot and Debian sandbox with Node.js; remote operation connects to an existing instance over a local network or the internet. The documented device requirements are Android 10 or newer and ARM64.

## DSHBox core features

- **Local runtime and rendering:** The supplied README documents a bundled DSH `0.2.2-rc.2` runtime. Choose a smaller system WebView APK or an APK containing GeckoView 158, which does not depend on the system renderer.
- **Remote pairing and devices:** Scan a pairing code or paste a link, review the confirmation card, and organize saved devices into groups. Each endpoint can use proxy or direct mode and its own session retention settings.
- **Browser automation:** The bundled `browser-use` integration exposes 24 tools for navigation, content reading, clicks, input, scrolling and other browser tasks. It also supports local HTML previews and screenshot feedback to a bound conversation.
- **Pilot phone control:** Accessibility, Shizuku and platform calls provide paths to native phone capabilities. The bundled `@local/mobile-pilot` integration exposes `phone_*` tools, with capability settings for denial, approval requests or full access.
- **Plugin management and recovery:** Cordis contains bundled integration switches, third-party plugin management and loading records. Safe mode and an independent emergency instance help recover from plugin-related startup failures.

## How to install and use DSHBox

Install the Android APK from `https://github.com/WSK-build/DSHBox/releases/latest`. The supplied documentation gives no DSH CLI installation command for the app and identifies no npm package for installing it.

1. Choose the system WebView build if your renderer is current and working. Choose the bundled Gecko build when the system renderer is outdated or difficult to upgrade. The two variants can replace each other while retaining app data.
2. Launch the app and follow the setup guide to prepare the minimal Debian and Node.js environments for local operation. Setup supports mirror detection, retries and offline import.
3. Open DSH after preparation. Use the home-screen DSH card to access local connection settings, copy the complete token-bearing address or configure external opening. The app discovers an available port rather than always using `3080`.
4. For an existing remote instance, open the Remote tab and pair it using a supported code or link. Select proxy or direct mode in the endpoint settings as needed.
5. Open Cordis to manage browser automation and phone integration. Use Browser for built-in web pages and Pilot for native apps, configuring phone capability permissions before use.

## How to troubleshoot DSHBox

For blank pages, workspace errors or failed loading with an older system WebView, use the bundled Gecko APK or upgrade the system renderer. Unsupported document-start injection produces an explicit upgrade prompt in the WebView variant.

If runtime preparation fails, retry setup, use another available mirror or import the environment offline. For third-party plugin crashes, start in safe mode and inspect plugin loading records. The home card’s More menu also provides emergency repair and instance switching; this instance has separate blank data and is intended for repairing the main instance.

For `dsh-mobile` pairing with an iroh transport address, switch to LAN or Cloudflare mode as directed by the app. Browser automation also has documented limitations around complex task recovery, long streaming responses and some sites or media, so full automation is not guaranteed.
