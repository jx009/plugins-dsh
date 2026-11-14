---
title: "MuseAI: AI Roleplay and Adventures for DSH"
description: "MuseAI is a DSH plugin that brings AI roleplay to your workspace via a client. Learn about installation, model setup and troubleshooting."
summary: "Create characters, explore story worlds and preserve shared memories. MuseAI offers a separate DSH client plugin alongside its local companion and text-adventure application."
highlights:
  - "Character cards and world books"
  - "AI companion conversations"
  - "Multi-character text adventures"
  - "Playable novel worlds"
  - "Archived memories and relationship timelines"
faq:
  - q: "How do I install the MuseAI DSH plugin?"
    a: "The README directs DeepSeek Harness users to the separate yejiming/dsh-museai-tavern repository. It does not provide a DSH installation command or a confirmed npm package name, so use that repository's installation instructions."
  - q: "Which AI providers does MuseAI support?"
    a: "The application supports OpenAI, Anthropic and services compatible with the OpenAI API format. Enter your provider's API key, endpoint and model name in Settings, then test the connection."
  - q: "Does MuseAI keep character cards and conversations locally?"
    a: "The desktop application stores its data under ~/Documents/MuseAI/. When you request a model response or analysis, relevant context is sent to the AI provider you configured."
  - q: "How are MuseAI chat, adventures and novel interaction different?"
    a: "Companion chat uses one character card, while adventures combine multiple characters with a world book and an AI narrator. Novel interaction uses prepared story materials, lets you choose an entry point and identity, and supports saving progress."
  - q: "How do I fix MuseAI memory archiving failures?"
    a: "Retry first, because provider instability or incorrectly formatted JSON can interrupt extraction. If failures continue, set the relevant chat or adventure memory-archiving agent's Temperature to 0 in the relationship page settings."
---

## What does MuseAI do?

MuseAI is a DSH plugin for AI character interaction through a dedicated client, backed by a local companion and storytelling application. It serves people who want recurring characters, shared adventures and relationship history instead of disconnected roleplay sessions.

The main repository documents the desktop application and points DeepSeek Harness users to `yejiming/dsh-museai-tavern` for the client plugin. The features and settings below describe the main application; the supplied README does not establish feature parity or configuration paths inside the client.

## MuseAI core features

- **Character cards and world books**: Define personalities, speech patterns, relationships and boundaries alongside geography, factions and world rules. Create these materials manually or extract structured settings from a novel or outline.
- **AI companion conversations**: Choose one character for ongoing dialogue informed by its settings and past memories. Archive significant experiences to update the character's relationship details and key events.
- **Text adventures**: Combine one world book with multiple character cards. An AI narrator advances scenes in response to dialogue, actions and plot instructions.
- **Novel interaction**: Assemble outlines, world books and characters into a playable story. Select an entry point and identity, influence events and save your progress for another session.
- **Memory and relationship records**: Review relationship summaries, event timelines and character-specific chat and adventure history. Supporting writing tools include Markdown editing, outline analysis and reverse-outline extraction.

## How to install and use MuseAI

No DSH installation command or verified npm package name appears in the supplied README. For the MuseAI DSH plugin, follow the instructions in `https://github.com/yejiming/dsh-museai-tavern`; a package-install command cannot be established from the main repository alone.

For the documented desktop workflow:

1. Download a `.dmg` or `.exe` installer from `https://github.com/yejiming/MuseAI/releases`, install it and launch the application.
2. Open Settings and enter your API key, API address and model name. Supported options include OpenAI, Anthropic and OpenAI-compatible providers. Use the connection test before starting a story.
3. Open the background-settings area and create a world book and character card. Start with essential details; memory archiving can help expand them later.
4. Select a character in companion chat, or choose a world book and several characters for an adventure. For novel interaction, prepare the story materials first, then choose your entry point.
5. Archive completed conversations or adventures and review their relationship records. Back up `~/Documents/MuseAI/` to preserve local settings, materials and sessions.

Models and parameters can be configured separately for different modules. For phone access, keep the desktop application running, connect both devices to the same Wi-Fi and open the address displayed in Settings. This accesses computer-stored data over the local network.

## How to troubleshoot MuseAI

- **Connection test fails**: Check the API key for missing characters or spaces, verify the full endpoint, confirm network access and check the provider account balance.
- **Characters drift from their settings**: Confirm the correct world book and character card are bound. Try a new conversation or adjust the chat agent's maximum context tokens, system prompt and temperature.
- **Extraction or memory archiving fails**: Retry after incomplete responses or invalid JSON. For character extraction, supply an explicit list of names. For repeated memory failures, set the relevant archiving agent's temperature to `0`.
- **Reverse-outline output is truncated**: Increase maximum output tokens for the relevant outline agents and make the prompt's length constraints more specific.
- **Features fail after an update**: Restore the affected module's default system prompt in Settings. For client-loading issues, check the active DSH profile, plugin enablement, versions and logs, then restart the harness.
