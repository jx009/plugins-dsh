---
title: "cc-switch: API Provider Switching for DSH"
description: "cc-switch is a desktop API provider manager for DeepSeek Harness. Learn how to install it, configure providers, and troubleshoot switching issues."
summary: "Switch between API providers from a desktop interface instead of editing configuration files by hand. The same app also manages MCP, skills, and prompts for supported clients."
highlights:
  - "One-click API provider switching"
  - "Centralized MCP management"
  - "Skills and prompt management"
  - "Windows, macOS, and Linux support"
faq:
  - q: "How do I install cc-switch for DeepSeek Harness?"
    a: "Get the desktop release for Windows, macOS, or Linux from the project's official website, `ccswitch.io`, or its GitHub Releases page. The supplied README excerpt does not document a DSH installation command."
  - q: "Does cc-switch run as a DSH plugin or a desktop app?"
    a: "The project describes cc-switch as a desktop app that supports DeepSeek Harness. This listing covers the desktop setup because the available documentation does not establish an in-harness installation process."
  - q: "Can cc-switch manage Claude Code and Codex too?"
    a: "Yes. The project lists both as supported clients, so you can use the same desktop manager when working with either tool alongside DSH."
  - q: "Can cc-switch manage MCP, skills, and prompts?"
    a: "Yes. The desktop app brings those three types of settings together, but the README excerpt does not specify which options are available for every client."
  - q: "Why is DeepSeek Harness still using my old provider after I switch in cc-switch?"
    a: "Check that you changed the provider for the intended client and are testing from the correct DSH profile. If the selection looks right, restart the harness and try a fresh request before checking the logs."
---

## What does cc-switch do?

cc-switch is a desktop companion for DeepSeek Harness (DSH) that lets you switch API providers without editing configuration files by hand. If you found it by searching for a DSH plugin, the documented setup is a separate desktop app. It also manages settings for supported clients such as Claude Code, Codex, and OpenCode, so you can use the same interface when moving between tools.

The main use case is changing providers without reopening a JSON, TOML, or YAML file each time. The desktop interface also gives you a place to manage other parts of your setup, including MCP, skills, and prompts. Treat those as separate settings: if your immediate goal is to change which provider handles requests, start with the provider selection.

## cc-switch core features

- **API provider switching:** Select a configured provider from the desktop interface. This is the feature to use when you want to change providers without editing configuration files directly.
- **MCP management:** Manage Model Context Protocol settings from the same app you use for providers. Check the selected client before making changes, especially if you work with more than one coding tool.
- **Skills and prompts:** Use the desktop manager to organize these settings alongside the rest of your setup. The available project information does not establish that every supported client exposes the same options.
- **Multiple clients and platforms:** The desktop app is available for Windows, macOS, and Linux. The project covers several coding clients, so check that you are working with the one you intend to configure.

## How to install and use cc-switch

The supplied README excerpt does not document a DSH install command. Use the desktop release for your operating system instead.

1. Find the project through `ccswitch.io` or the Releases page for `farion1231/cc-switch`. Select the release for your operating system and follow its installation instructions.
2. Open the desktop app and work in the provider settings for DeepSeek Harness. If you also use the manager for another tool, confirm that you are editing the intended client before changing anything.
3. Configure the provider you want to use, then select it. Make a fresh request in the harness to check the provider change before adjusting any unrelated settings.
4. If you also need to change MCP, skills, or prompts, use the corresponding options available for your client. Make those changes separately so it is easier to tell which setting affected the result.

## How to troubleshoot cc-switch

- **Check the client and profile first.** If a provider change does not appear to take effect, verify both the client you edited in the desktop app and the DSH profile you are using for the test.
- **Restart and retest.** After confirming the provider selection, restart the harness and make a new request. Test the provider change on its own before changing another setting.
- **Record versions and review logs.** If the issue persists, note the installed desktop and harness versions, then check any available logs for the failing request. Keep API keys and other credentials out of anything you share.
