---
title: "DSHA: Run DSH on Android Without Root"
description: "DSHA is a DSH plugin companion that runs the harness on Android without root. Learn APK installation, model setup and startup troubleshooting."
summary: "Run DeepSeek Harness on an Android phone with a bundled Ubuntu environment, mobile Web UI and device controls. Install an APK, configure your model provider and manage plugins in the app."
highlights:
  - "Android launcher without root or Termux"
  - "Bundled Ubuntu 24.04 environment"
  - "Mobile Web UI and output overlay"
  - "Wireless ADB without Shizuku"
  - "Conversation and plugin backup export"
faq:
  - q: "How do I install DSHA for DeepSeek Harness?"
    a: "Install the APK from the repository’s Releases on an Android 11 or newer arm64 device. Let the first launch unpack and verify the environment, then open the Web UI to configure your provider, model and API key."
  - q: "Does DSHA need root, Termux or Shizuku?"
    a: "Basic installation and harness use require neither root nor Termux. Wireless ADB works without Shizuku, while experimental virtual screens require authorization through ADB, Shizuku or Root."
  - q: "Can DSHA deploy its Ubuntu environment offline?"
    a: "The APK includes an offline Ubuntu root filesystem and bundled tools, so environment deployment can finish without a network connection. That does not establish offline availability for your chosen model provider."
  - q: "Will DSHA keep my conversations when I upgrade?"
    a: "An in-place upgrade with the same package name and signing certificate preserves current data; stop DSH normally before upgrading. For a different app identity or phone, export and import through Data and Backup, and reauthorize device capabilities."
  - q: "Should I choose proot or proroot in DSHA?"
    a: "The default runtime is proot, with proroot available in Configuration. Compatibility and performance depend on the device, storage I/O, cache and plugins, so the README does not claim a universal speed winner."
---

## What does DSHA do?

DSHA is a DSH plugin companion that packages DeepSeek Harness as an Android launcher with a complete Ubuntu environment. It helps developers run the harness on a phone without installing Termux, obtaining root access or assembling a Linux toolchain manually. The project is distributed as an APK, rather than an npm plugin package.

The supported platform is Android 11 or newer on arm64-v8a. The supplied release bundles Ubuntu 24.04, Node.js 24, pnpm 10.34.5 and a mobile Web UI. First launch unpacks and verifies the offline environment; model provider configuration happens afterward in the browser interface. Offline environment deployment should not be confused with offline model access.

## DSHA core features

- **Ubuntu environment:** Use `apt`, Python, git and interactive PTY sessions inside the bundled Linux environment. The installation system checks components separately and can repair failed parts without repeating the entire setup.
- **Mobile Web UI:** A phone-oriented interface provides narrow-screen layouts and shortcuts. An adjustable output overlay shows streamed AI output, and authenticated LAN access lets a computer or tablet use the harness running on the phone.
- **Android device controls:** Accessibility provides screen reading, tapping, typing and screenshots without ADB. Wireless ADB connects without Shizuku; experimental virtual screens require an authorized ADB, Shizuku or Root channel.
- **Plugin management:** Install, update, enable, disable and search plugins inside the app. Supported inputs include several GitHub link formats, HTTPS archives and local imports; built-in plugins cannot be deleted.
- **Backup and migration:** Export conversations, attachments, settings and user plugins through Data and Backup. Full or scoped restores are available, while device permissions remain specific to each app identity.

## How to install and use DSHA

There is no documented DSH installation command for this launcher and no confirmed npm package name. Use the APK installation route described by the repository.

1. Confirm that your phone runs Android 11 or later and uses arm64. Get the Standard APK from the repository’s Releases; the supplied README identifies `dsha-0.2.2.apk` and its matching SHA-256 asset.
2. Install the appropriate signed APK and launch it. Allow the bundled environment to unpack and pass verification; completion time depends on device I/O.
3. Wait for the home page to report that the background Web service is ready. Open the Web UI and enter your provider, model and API key in its settings.
4. Keep the default proot runtime initially, or select proroot in Configuration when you want to evaluate device compatibility. Enable device capabilities according to the features you intend to use.
5. Manage extensions in the app’s plugin interface. Before changing app identities or uninstalling, export the data you need from Data and Backup and retain a copy outside the app.

For an in-place upgrade, stop the harness normally first and use an APK with the same package name and signature. The official identity is `dsh.android.client`; test and historical identities have separate data and permissions.

## How to troubleshoot DSHA

- **Environment setup fails:** Open Installation and Repair to check the six installation components and repair failed items. Component-level repair avoids rebuilding healthy parts.
- **Web startup seems slow:** Check home-page progress and startup diagnostics. The documented 60-second authentication wait is a notice, not a forced termination deadline.
- **proroot does not start:** Check the selected runtime in Configuration. Automatic proot fallback only applies to a confirmed pre-authentication exit without a plugin failure; slow startup alone does not trigger it.
- **Two app identities conflict:** Running two Web instances can cause a port conflict. Web ports are configurable, and the app reports automatic fallback.
- **PTY behaves incorrectly:** Switch to the simple terminal fallback; terminal sessions remain in the background.
- **Migrated device controls are unavailable:** Reenable device authorizations and accessibility for the destination app. These permissions do not transfer with exported data.
