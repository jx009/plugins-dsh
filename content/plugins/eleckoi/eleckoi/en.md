---
title: "ElecKoi: DSH Roleplay and Character Cards"
description: "ElecKoi is a DSH-powered app for AI roleplay and character card creation. Learn how to install it, configure a model, and troubleshoot setup."
summary: "Chat with AI characters on Windows or Android, or turn a story idea into a character card with an agent that lets you review changes before saving."
highlights:
  - "AI roleplay on Windows and Android"
  - "Agent-assisted character card editing"
  - "On-demand lorebook lookup"
  - "Validated updates to story variables"
  - "Custom interactive character interfaces"
faq:
  - q: "How do I install ElecKoi as a DSH plugin?"
    a: "ElecKoi is a standalone client powered by DeepSeek Harness, and the project README does not list a DSH plugin installation command. Follow the official ElecKoi tutorial to download and install the Windows or Android client."
  - q: "Does ElecKoi come with an AI model service?"
    a: "No, the project does not provide a model service. Choose a provider you trust and configure it in the client using the tutorial's model setup instructions."
  - q: "Can ElecKoi use SillyTavern character cards?"
    a: "ElecKoi supports selected SillyTavern content formats, but it does not reproduce the full extension environment. Check the project's character card guidance for the specific format you want to use."
  - q: "How does ElecKoi track inventory and relationships in roleplay?"
    a: "The character agent uses dedicated tools to read and validate changes to story variables, including inventory and relationships. Those updates do not depend on the model placing a special update string in its dialogue."
  - q: "Can I make an interactive interface for an ElecKoi character?"
    a: "Yes, a character can include HTML, CSS, JavaScript, and assets to display story state in an interactive interface. The Author SDK documents character frontends and provides importable examples."
---

## What does ElecKoi do?

ElecKoi is a DSH-powered app for AI roleplay and character card creation on Windows and Android. It uses DeepSeek Harness as its agent runtime, but you use it through a standalone client rather than installing it into an existing harness profile. The official clients are free and open source, and you choose which model service to connect.

For players, the app offers character chat and interactive stories in which details such as relationships, possessions, and world events can change as a scene unfolds. For creators, it offers a character card editor and a creation agent. You can describe a character or a change in plain language, then inspect the proposed edits instead of writing every piece of the card by hand.

## ElecKoi core features

- **On-demand lorebook lookup.** A character agent can search the lorebook for details relevant to the current scene. It reads what it needs for that part of the story rather than pulling in the entire setting.
- **Agent-assisted character card editing.** The creation agent can draft or revise character details, lore entries, story variables, regular expressions, and visual assets. You can preview the proposed edits and check validation results before deciding what to save.
- **Tool-based story variables.** Dedicated tools read, validate, and update state such as relationships, inventory, and events. The model does not have to embed a special update format in its dialogue, so state changes can be tracked separately from the story text.
- **Interactive character interfaces.** A card can include HTML, CSS, JavaScript, and assets to show story state in a custom interface. The Author SDK covers character frontends, native scripts, and examples you can import.

## How to install and use ElecKoi

There is no documented DSH plugin install command. For normal use, start with the installation instructions in the official ElecKoi tutorial, not the repository's source build commands.

1. Download and install the client for your platform. The repository documents a Windows x64 installer and standard and compatibility builds for Android.
2. Open the client and follow the tutorial's model configuration instructions. Select and configure a model service you trust; the project does not supply one.
3. To start roleplaying, open a character card and begin a character conversation. To write your own, open the character editor and either edit the card directly or tell the creation agent what you want to change.
4. Review the preview and validation results before saving agent-proposed edits. If you are adding a custom character interface, consult the Author SDK for the supported interfaces and examples.

## How to troubleshoot ElecKoi

- **If installation fails:** Check that the download matches your platform. On Android, consult the project's build notes for the distinction between the standard and compatibility variants. On Windows, check the release notes for the x64 installer.
- **If a character does not reply:** Confirm which model service the client is configured to use and recheck that configuration against the tutorial. Restart the client, note its version, and check any available logs for details about the failure.
- **If a card from another client behaves differently:** Check which content format and features the card uses. SillyTavern compatibility is selective, so do not assume a card that relies on its extensions will behave the same way in ElecKoi.
