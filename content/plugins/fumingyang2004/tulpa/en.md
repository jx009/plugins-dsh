---
title: "Tulpa: QQ, WeChat and Bilibili for DSH"
description: "Tulpa is a DSH plugin that connects QQ, WeChat and Bilibili through MCP. Learn how to set it up, configure access and troubleshoot chat issues."
summary: "Connect your agent to QQ group conversations, local WeChat history and Bilibili research through one MCP connection, with separate permissions for each module."
highlights:
  - "QQ group chat through OneBot"
  - "Search QQ and WeChat history"
  - "Bilibili subtitles, frames and comments"
  - "Custom Markdown personality cards"
  - "Automatic SnowLuma setup"
faq:
  - q: "How do I install Tulpa in DeepSeek Harness?"
    a: "Install the Tulpa MCP release for your platform, create a connection in its interface and follow the repository's Agent setup guide for DeepSeek Harness. The README provides no DSH package installation command; access is configured through MCP."
  - q: "Can Tulpa send WeChat messages?"
    a: "No, the documented WeChat module reads available records but does not send messages. Your external agent can use that information to prepare reply drafts."
  - q: "Why does Tulpa stop chatting in a QQ group?"
    a: "Continuous chat depends on QQ, OneBot, Tulpa and the external agent remaining active. If the host ends its turn, reaches its budget, exits or sleeps, Tulpa does not continue reasoning independently."
  - q: "Does Tulpa support Linux and Windows?"
    a: "The documented desktop release supports Windows 10 and 11 x64. Linux has an x86_64 and ARM64 terminal source package with CLI/TUI access and dependency installation on first launch."
  - q: "Can Tulpa read Bilibili videos without subtitles?"
    a: "It can use an installed local ASR model when subtitles are unavailable, and it also supports actual video frames and comments. Speech models are not bundled, and unavailable content is reported as missing."
---

## What does Tulpa do?

Tulpa is a DSH plugin that connects agents to QQ, WeChat and Bilibili through MCP. It helps DeepSeek Harness users retrieve conversation material, participate in authorized group chats and research videos without moving every source into a prompt manually. The project is distributed as a standalone MCP application, with separate authorization for its three platform modules.

QQ supports live group interaction, while WeChat provides record access rather than message sending. Bilibili support is marked as testing. Local storage does not make the workflow fully offline: necessary message excerpts, and selected images when image understanding is enabled, reach your chosen model service.

## Tulpa core features

- **QQ group chat:** OneBot supplies live events for conversations with native mentions, quoted replies and separately authorized image or sticker actions. Continuous chat requires HTTP plus forward WebSocket connectivity.
- **Conversation history search:** Find material by keyword, person, conversation and date, then inspect surrounding messages. Images, voice messages and files can be read as needed within the authorized scope.
- **Bilibili research:** Search videos, inspect recommendations and multipart details, and retrieve timestamped subtitles, actual frames and paginated comments. An installed local ASR model can help when subtitles are absent.
- **Personality cards:** Bundled options include `little_whale`, `little_whale_v2` and the experimental `dragon_girl`. Custom Markdown cards define characters, while group language learning is kept separate and can continue for the same account and group.
- **SnowLuma setup:** The QQ setup flow prepares SnowLuma 2.1.1, checks its runtime, generates credentials and configures available ports. An existing standalone installation can be imported through advanced options.

## How to install and use Tulpa

The README supplies no DSH installation command or confirmed npm package. Start with the documented Tulpa MCP release and connect it through the repository's `doc/AGENT_SETUP.md` instructions for your agent.

1. On Windows 10 or 11 x64, fully extract the MCP ZIP into a writable directory and open `Tulpa/Tulpa.exe`. Windows requires .NET Framework 4.8 and uses WebView2 Evergreen Runtime; Python is bundled. Linux users receive a terminal source package for x86_64 or ARM64 and use `./tulpa`.
2. For QQ chat, log into QQ and open Tulpa's OneBot settings. Select the protocol agreement and automatic setup authorization, then run the one-click configuration. Import an existing connection through advanced options if applicable.
3. Create an MCP connection, enable QQ and select the group, continuous-chat access and sending permission. Add image or sticker permissions only when needed. Live group chat does not require a historical database import.
4. Start MCP, configure DeepSeek Harness using the Agent setup guide and reconnect the client. Use a dedicated agent conversation for ongoing group chat. Place custom personality files in `chatlocal/prompts/mcp_chat/` inside the installation directory.
5. For Bilibili, scan the login code with its app, enable the module's read-only capabilities and refresh the agent's tools. For QQ or WeChat history, verify the local account under data and synchronization, select conversations and dates, and authorize record and attachment access.

Sending and group-management permissions remain active once granted: individual tool calls execute without another Tulpa approval prompt. The interface can stop group chat, but stopping does not retract messages already sent.

## How to troubleshoot Tulpa

- If Windows launch fails, check prerequisites and full extraction. Do not run from inside the ZIP or mistake GitHub's generated source archive for the Windows release.
- If live chat stalls, verify HTTP and forward WebSocket connectivity and keep QQ, OneBot, Tulpa and the external agent running. Host turn completion, budget limits, exit or sleep prevent further autonomous reasoning.
- If a changed personality is ignored, stop and restart that chat session so it picks up the new card.
- If history is missing, check the selected account, date range, permissions and imported material. Availability also depends on client version and local cache; unavailable records cannot be guaranteed recoverable.
- After upgrading, launch the executable from the original installation directory and reconnect MCP. Back up modified bundled personality cards before updating.
