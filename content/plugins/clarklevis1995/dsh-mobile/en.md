---
title: "dsh-mobile: Access DSH from Android and iOS"
description: "dsh-mobile is a DSH plugin companion for mobile chats and Agent traces. Learn how to install the apps, set up Mobile Gateway and check connection issues."
summary: "Use Whaleness on Android or iOS to access Harness workspaces, stream conversations, inspect Agent execution, and handle approvals through Mobile Gateway."
highlights:
  - "WebSocket live conversations"
  - "Agent traces and tool approvals"
  - "Multiple hosts and workspaces"
  - "File uploads and code previews"
  - "Plugin and scheduled task management"
faq:
  - q: "How do I install dsh-mobile for DeepSeek Harness?"
    a: "Install Whaleness through TestFlight on iOS or download the Android APK from the repository's GitHub Releases. The desktop host also needs dsh-plugin-mobile-gateway version 0.11.2 or later installed and enabled."
  - q: "Which devices does dsh-mobile support?"
    a: "The Android app requires Android 7.0, API 24, or later. The iOS app supports iPhone and iPad on iOS or iPadOS 16.1 or later, with some system features depending on the device and OS version."
  - q: "Does dsh-mobile use WebSocket or WebRTC?"
    a: "Both control operations and conversation traffic use WebSocket through Mobile Gateway. Native WebRTC transport has been removed."
  - q: "How do I enable voice input in dsh-mobile?"
    a: "Enable the official Voice Input plugin in the desktop host's Plugins section and complete its model download and initialization. Grant microphone permission on the mobile device; transcription runs through the host's voice capability."
  - q: "Can dsh-mobile search conversations offline?"
    a: "The apps cache conversation history locally and support offline searches of common conversations. Storage controls let you inspect and clear chat history, images, previews, and temporary files by category."
---

## What does dsh-mobile do?

dsh-mobile is a DSH plugin companion that brings DeepSeek Harness workspaces, conversations, and Agent execution to native Android and iOS apps. Published as Whaleness, it is an independently developed third-party mobile client. It helps developers follow work on a desktop host, inspect tool activity, and respond to questions or approvals from a phone or tablet.

The apps connect through `dsh-plugin-mobile-gateway`. Both control actions and conversation events travel over WebSocket. Android and iOS share business logic through Kotlin Multiplatform while using their own native interfaces and platform integrations. Some system behavior differs between platforms as their features and interactions are being aligned.

## dsh-mobile core features

- **Live conversations and Agent traces**: Read streamed Markdown, code, reasoning, tool calls, results, and image attachments. Inspect execution events with arguments, schemas, token usage, and timing when investigating how an Agent reached its result.
- **Agent teams and approvals**: View team members, move between lead and member conversations, and inspect shared tasks with ownership and status. Answer Human Questions or handle tool requests through cancellation, rejection, and one-time approval.
- **Multiple hosts and workspaces**: Save Gateway hosts with separate credentials, then browse or create workspaces. Search, create, switch, and archive sessions, and inspect locally cached history when revisiting conversations.
- **File uploads and previews**: Attach files, follow upload progress, and retry failed uploads. Open conversation file cards, browse remote directories, preview PDFs, images, and code, or switch Markdown files between source and rendered views.
- **Plugins and scheduled tasks**: Browse plugin details and runtime status, with installation and configuration where the host supports them. Search scheduled tasks, inspect rules and next execution times, and edit or delete tasks from the mobile interface.

## How to install and use dsh-mobile

The supplied README does not provide a DSH installation command for this repository, and no npm package name is confirmed. Install the native app using its platform download channel, then prepare the desktop gateway.

1. On iPhone or iPad, join the TestFlight beta at `https://testflight.apple.com/join/1Euwby6r`. You need iOS or iPadOS 16.1 or later. On Android 7.0 or later, download an APK from `https://github.com/Clarklevis1995/dsh-mobile/releases`.
2. Run Harness on the desktop host with `dsh-plugin-mobile-gateway` version `0.11.2` or later installed and enabled. The repository's `AppRelease/release-info.json` records the required minimum gateway version.
3. Use the app's host connection and QR pairing capabilities to connect to your Gateway. Saved hosts retain separate credentials, allowing you to switch between environments.
4. Select a workspace and open or create a session. Send a message, follow the streamed response, and open execution traces to inspect tool activity. Respond to questions and approval requests as they arrive.
5. For voice input, enable the official Voice Input plugin in the desktop host's Plugins section. Finish model download and initialization, then allow microphone access on the phone. Hold to talk and release to produce an editable draft.

Session and default settings expose Agent presets, providers/models, reasoning effort, and host Agent permissions. Permission choices such as `read-only` and `workspace-write` apply to the Agent running on the host.

## How to troubleshoot dsh-mobile

If the app cannot connect, first check the gateway version and confirm that the plugin is enabled in the intended Harness profile. Check that the saved host is the one you want to access. Restart DSH and inspect host and plugin logs if the connection still fails; the supplied README does not define specific connection error codes.

If voice transcription is unavailable, verify the desktop plugin's initialization and model download, then check mobile microphone permission. For failed file uploads, use the documented retry action. For accumulated local data, review storage usage and clear the relevant cache category. When reporting platform-specific behavior, include the app, gateway, and operating system versions.
