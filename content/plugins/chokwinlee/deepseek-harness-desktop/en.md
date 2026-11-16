---
title: "deepseek-harness-desktop: DSH Desktop & Remote"
description: "deepseek-harness-desktop is a DSH plugin ecosystem desktop host with mobile Remote. Learn how to install it, pair phones and check connection issues."
summary: "Run the Harness Web UI in a desktop app with its runtime included, then continue projects and handle approvals from iPhone or Android while execution stays on your computer."
highlights:
  - "Bundled Harness runtime"
  - "iPhone and Android Remote"
  - "Trusted Wi-Fi and Tailscale pairing"
  - "Multimodal image conversations"
  - "macOS token and cost insights"
faq:
  - q: "How do I install deepseek-harness-desktop for DeepSeek Harness?"
    a: "Install a Desktop package from the repository's GitHub releases. The app includes the Harness runtime and manages its process, so you do not need a separate Node.js installation or a manual `dsh web` command."
  - q: "How do I pair an iPhone with deepseek-harness-desktop?"
    a: "Install the DSH Remote TestFlight beta on iOS 17 or later, then open Settings → General → Mobile Remote → Connect phone in Desktop. Start pairing on trusted Wi-Fi and scan the QR code with the phone."
  - q: "Does deepseek-harness-desktop support Android Remote?"
    a: "Yes, the README provides a signed APK for Android 8.0 or later through GitHub releases. Its installation example pairs `DSH-Remote-Android-v0.5.0.apk` with the Desktop package from the same release; Google Play distribution is not available in the supplied documentation."
  - q: "Does deepseek-harness-desktop need Tailscale for phone access?"
    a: "Same-Wi-Fi pairing does not require a Tailscale account. For access from another network, both devices join your own tailnet and use a private Tailscale Serve HTTPS entry; the README explicitly excludes Funnel."
  - q: "Why are some deepseek-harness-desktop model costs missing?"
    a: "Cost estimates combine local token records with available public model pricing. Models without a matching price remain unpriced, so a missing estimate does not mean their usage is free."
---

## What does deepseek-harness-desktop do?

deepseek-harness-desktop is a desktop host in the DSH plugin ecosystem that packages the official DeepSeek Harness Web UI and runtime with mobile Remote companions. It helps developers work in a desktop window and continue controlling projects from a phone while tasks execute on the computer. It is distributed as an application; the supplied README does not provide an npm plugin installation command.

The app starts and stops the local runtime automatically. You do not need to install Node.js separately or launch `dsh web` in a terminal. This is an independent community project, and the underlying Harness remains a developer preview. The documented build bundles `@deepseek-ai/dsh@0.1.5-rc.2`, with version information visible in the sidebar.

## deepseek-harness-desktop core features

- **Bundled desktop runtime** — Open the Harness interface inside a self-contained desktop application. On macOS, Tauri and the system WKWebView keep the documented DMG size around 100 MB while including the runtime.
- **iPhone and Android Remote** — Native SwiftUI and Kotlin/Compose companions let you browse projects, create sessions, steer tasks, handle approvals and follow subagents. Agent execution remains on the host computer.
- **Wi-Fi and Tailscale pairing** — Use an opt-in authenticated LAN endpoint on trusted Wi-Fi, or connect through your own tailnet with private Tailscale Serve HTTPS access. The project does not operate a relay.
- **Multimodal conversations** — Paste or attach images when the selected provider and model declare image-input support. Image messages remain available in conversation history.
- **macOS usage insights** — View daily and seven-day token totals, estimated costs, active tasks and aggregate running throughput. Expanded details include input, output and cache usage calculated from local session history.

## How to install and use deepseek-harness-desktop

No DSH installation command is documented, and no npm package name is confirmed. Start with the Desktop application release rather than a generated package command.

1. Open the repository's GitHub releases and install the appropriate Desktop package. Launch the application and check the Desktop and bundled Harness versions in its sidebar.
2. Use the included Web UI for your projects and sessions. For image conversations, select a provider and model that support image input before attaching an image.
3. On iPhone, install Apple's TestFlight app, accept the public DSH Remote invitation linked in the README, and install the beta. It requires iOS 17 or later.
4. On Android 8.0 or later, follow the documented release pairing: install the `v0.5.0` Desktop package and `DSH-Remote-Android-v0.5.0.apk`. If prompted, allow installation from the browser or file manager, and compare the APK's SHA-256 with `SHA256SUMS.txt` from that release.
5. In Desktop, open `Settings → General → Mobile Remote → Connect phone`. Start local pairing on trusted Wi-Fi and scan the QR code in Remote.
6. For cellular or another remote network, follow the built-in Tailscale guide, enable anywhere access and scan the HTTPS QR code. Open a project and create or resume a session from the phone.

Developers can also build the iPhone companion with Xcode 16 or later by opening `ios/DSHRemote/DSHRemote.xcodeproj` and configuring signing for their own device.

## How to troubleshoot deepseek-harness-desktop

If pairing fails, check which connection path you selected. Local pairing requires the trusted Wi-Fi setup and Desktop's enabled LAN endpoint. Remote access requires both devices on your own tailnet and the private Serve HTTPS setup; do not use Funnel.

For Android, verify that the APK and Desktop build match the documented release. For an iPhone source build, check signing and provisioning: a free Xcode Personal Team requires periodic re-provisioning, and an unsigned or unrelated GitHub IPA will not install through that route.

If images are unavailable, confirm that both the provider and selected model declare image support. If a cost is absent, check whether public pricing exists for that model; unmatched entries intentionally remain unpriced. For other failures, restart Desktop, record both sidebar versions and inspect available logs before reporting the issue.
