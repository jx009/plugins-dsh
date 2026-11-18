---
title: "Minke: Desktop Workspace for DSH"
description: "Minke is a desktop workspace for DeepSeek Harness with browser control and local files. Learn installation, remote access setup and error checks."
summary: "Work with conversations, files, terminals and an agent-controlled browser in one desktop workspace. Continue from a phone through Web or PWA access."
highlights:
  - "Shared browser control"
  - "Split views, files and terminals"
  - "Tailscale and Cloudflare remote access"
  - "LM Studio and Ollama models"
  - "Native DSH plugin management"
faq:
  - q: "How do I install Minke for DeepSeek Harness?"
    a: "Download the package matching your operating system and architecture from the official lencx/Minke GitHub Releases page. Minke is a desktop application; the supplied README does not provide a DSH plugin installation command."
  - q: "Does Minke support Windows and Linux?"
    a: "The listed Windows package is an x64 EXE, while Linux offers x64 DEB, RPM and AppImage packages. macOS packages are available for both Apple Silicon and Intel."
  - q: "How do I use Minke on my phone?"
    a: "Join the Minke computer and phone to the same Tailscale tailnet, then enable HTTPS Serve under Connections → Device access → Remote access. Open the displayed HTTPS address on your phone; the Web client supports conversations, project files and a terminal running on the host computer."
  - q: "Can Minke use Ollama or LM Studio models?"
    a: "Minke can discover models from both local model services and optionally start local services. It also supports cloud providers and custom endpoints."
  - q: "Why does Minke ask for Keychain access on macOS?"
    a: "The request is for credential storage and is triggered when you choose Authorize credential access in Connections. If access was denied, use Request authorization again; persistent problems can be related to an invalid or modified application signature."
---

## What does Minke do?

Minke is a local-first desktop agent workspace powered by DeepSeek Harness. It gives developers one place to work with conversations, project files, terminals and a shared browser, with sessions and settings stored on their computer. It is a desktop application with native DSH plugin management, not a package documented for installation through the plugin CLI.

The independent community project supports macOS, Windows and Linux. Development is ongoing, so a packaged release may not include everything visible in the current source. Local-first storage does not mean models must run locally: cloud providers and custom endpoints are also supported.

## Minke core features

- **Shared browser control** — Follow agent activity in visible tabs, take control yourself and return annotated page context to the conversation.
- **Integrated development workspace** — Arrange conversations, files and terminals with split views and a bottom panel. Edit files, preview documents and inspect changes without leaving the workspace.
- **Remote Web and PWA access** — Continue tasks from another device through a responsive client backed by Minke Host. Its terminal runs on the Minke computer; this is not a streamed desktop window.
- **Cloud and local models** — Connect cloud providers or custom endpoints, discover LM Studio and Ollama models, and optionally start local services.
- **Agent extensions** — Use Harness presets, skills, subagents and scheduled tasks alongside native plugin management. WeChat, Telegram and Discord can also serve as entry points for starting tasks.

## How to install and use Minke

No DSH installation command or confirmed npm package name is provided. Get the desktop installer from the official release page: `https://github.com/lencx/Minke/releases`.

1. Select the correct package: macOS arm64 or x64 DMG, Windows x64 EXE, or Linux x64 DEB, RPM or AppImage. Release checksums are published in `SHA256SUMS`.
2. On macOS, open the DMG, drag `Minke.app` into Applications and launch it there. For credential storage, open Connections and select Authorize credential access. If prompted, use your Mac login password and select Always Allow.
3. Use the workspace for conversations, file editing and terminal work. Choose cloud providers or local models according to your setup; the supplied excerpt does not specify model configuration fields.
4. For recommended remote access, install Tailscale on both devices and join the same tailnet. Open Connections → Device access → Remote access, choose HTTPS Serve and enable it. Open the displayed `https://…ts.net` address on the other device. No restart is required for this connection.
5. To install the PWA, open a Tailscale Serve or Cloudflare Access HTTPS address and choose Install Minke in the sidebar. On iPhone or iPad, use Share → Add to Home Screen.

Only one remote route is active at a time, and the proxy stops when Minke exits. Remote users can start tasks and use already-authorized local tools, so limit access to trusted identities. Cloudflare Access requires a configured tunnel, Access application and explicit allow policy.

## How to troubleshoot Minke

- **macOS blocks launch:** Current pre-release builds are not notarized. First use Open Anyway under System Settings → Privacy & Security. Removing quarantine bypasses a security check and should only be a last resort for the exact official application.
- **Credential access fails:** Select Request authorization again. If storage remains unavailable, check the application signature with `codesign --verify --deep --strict --verbose=2 "/Applications/Minke.app"` before considering further changes.
- **Remote access is unavailable:** Confirm the host is running, the selected route is enabled and both Tailscale devices are connected to the same tailnet. Direct IP uses HTTP and is not a browser secure context; use HTTPS Serve for the documented PWA setup.
- **Features differ from documentation:** Check the installed version against the release. About Minke → Check for updates starts a manual check; background downloads are controlled under Settings → Minke → Preferences → Software updates. Update installation always requires an explicit action.
