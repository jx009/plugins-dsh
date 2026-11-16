---
title: "Deepseek-Harness-Local-Android: DSH on Android"
description: "Deepseek-Harness-Local-Android is a DSH plugin companion app for Android coding. Learn how to install toolchains and fix Gradle startup errors."
summary: "Run the DeepSeek Harness agent on Android without root or Termux. Add native build tools, use an optional Linux workspace, and preview local services on your phone."
highlights:
  - "Native bionic Node.js runtime"
  - "Clang, JDK 17 and Gradle"
  - "Alpine and Ubuntu Linux Workspace"
  - "Local HTTP previews in WebView"
  - "Individual device capability switches"
faq:
  - q: "How do I install Deepseek-Harness-Local-Android in DeepSeek Harness?"
    a: "This project is an Android application distributed as an APK, rather than a documented npm plugin package. The supplied README excerpt contains no DSH plugin installation command; its extension center provides additional toolchains."
  - q: "Does Deepseek-Harness-Local-Android need root or Termux?"
    a: "Neither is required for the documented runtime. The APK includes a bionic Node.js build, and the optional Linux Workspace runs inside the application's sandbox without root."
  - q: "Can Deepseek-Harness-Local-Android build Android APKs?"
    a: "The documented build stack includes OpenJDK 17, Gradle, aapt2, apksigner and d8. The README reports using this phone-based stack to compile an extension for the project."
  - q: "Can Deepseek-Harness-Local-Android run glibc command-line tools?"
    a: "Use the optional Ubuntu 24.04 Linux Workspace for tools that require glibc. It supplies glibc 2.39 and apt, while the alternative Alpine workspace uses musl and apk."
  - q: "Why does Deepseek-Harness-Local-Android show a Gradle -Xmx64m error?"
    a: "The README traces this failure to Android toybox xargs preserving quotation marks in the bundled Gradle launcher. Installation-time patches address the launcher and the bundled JDK's fixed home and temporary-directory paths."
---

## What does Deepseek-Harness-Local-Android do?

Deepseek-Harness-Local-Android is a DSH plugin companion application that runs DeepSeek Harness on Android and adds phone-based development tools. Distributed as an APK, it serves developers who want the agent to work inside a mobile workspace without first installing Termux or obtaining root access.

The application bundles an Android-native bionic Node.js runtime. An extension center supplies additional tools, while an optional Linux environment handles software that needs a different libc or a Linux package manager. The supplied README identifies Android 8.0 through 16 as its platform range. Its offline-start capability concerns the bundled runtime; it does not establish that every model or extension works without a network connection.

## Deepseek-Harness-Local-Android core features

- **Native Android runtime:** Node.js binaries ship inside the APK and execute directly on Android. Both runtime paths use a persistent Node.js compilation cache to reuse compiled JavaScript modules.
- **On-device compilation:** The extension center lists 57 entries across eight categories, including 20 toolchains. Options include Clang, OpenJDK 17, Gradle, CMake, Rust and Go, supporting development beyond script execution.
- **Linux Workspace:** This optional feature is disabled by default. Choose bundled Alpine 3.22 for musl and `apk`, or download Ubuntu 24.04 base for glibc 2.39 and `apt`.
- **Shared workspace and previews:** Native and container execution share engine code, `$DSH_HOME` and the workspace. Local HTTP services can be previewed in WebView; the project does not provide an X11 or Wayland desktop.
- **Device capability controls:** The README describes 176 HTTP routes, 42 self-describing catalog entries and 21 independent capability switches. Capabilities require individual user approval, rather than being enabled together automatically.

## How to install and use Deepseek-Harness-Local-Android

The supplied README excerpt provides no DSH installation command and no confirmed npm package name. Installation is APK-based, so a package-manager command cannot be supplied from this material. The detailed APK installation section is outside the excerpt.

1. Obtain the Android APK from the repository's releases and install the application. The native runtime is bundled, with extraction performed on first launch.
2. Open the extension center and install tools for your project. Choose Clang and CMake for C/C++, or OpenJDK 17 and Android build tools for Java and APK builds.
3. Start with native execution for the documented Node, Python, Go, Rust and C toolchains. If a prebuilt CLI needs glibc, add Linux Workspace and choose Ubuntu; its initial rootfs download requires connectivity.
4. Ask the agent to create a project in the current workspace, compile it with the installed tools, start a development server and return a `127.0.0.1` preview address. Open the local service in WebView.
5. Use the independent capability switches to approve the phone functions your task needs. The excerpt does not specify their exact settings-screen location.

## How to troubleshoot Deepseek-Harness-Local-Android

For `Could not find or load main class "-Xmx64m"`, check the Android build-tools installation and version. The README documents a Gradle launcher problem caused by toybox `xargs` retaining quotes. Installation-time patches also correct hard-coded `user.home` and `java.io.tmpdir` paths in the bundled JDK.

If a precompiled CLI requires glibc, use the Ubuntu workspace. Alpine uses musl, and the native runtime uses bionic. Linux Workspace provides compatibility rather than isolation for untrusted code.

For other startup or extension problems, check the application and engine versions, confirm the intended profile and enabled extensions, restart DSH, and inspect available logs. The excerpt supplies no additional error codes or exact log locations.
