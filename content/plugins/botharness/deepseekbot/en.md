---
title: "DeepSeekBot: Personal AI Bot Teams for DSH"
description: "DeepSeekBot is a DSH plugin for personal AI teams with persistent memory. Learn how to install Tobs, configure your bots, and troubleshoot setup."
summary: "Give research, writing, and coding their own bots instead of starting from scratch in every chat. Now called Tobs, the project lets you bring those bots into group conversations and hand off recurring work."
highlights:
  - "Distinct bot identities and permissions"
  - "Editable Git-backed memory"
  - "Multi-agent group chats"
  - "Recurring tasks from chat"
  - "Slack, Discord, and Lark integrations"
faq:
  - q: "How do I install DeepSeekBot on DeepSeek Harness?"
    a: "For a new installation, follow the official Tobs installation guide and use the instructions for `@botharness/tobs`. Enable the plugin in the desktop app, then look for Bot Mode in the sidebar."
  - q: "Is DeepSeekBot the same as Tobs or DS Bot?"
    a: "Tobs is the new name for DeepSeekBot, and existing users can still use the `deepseekbot` package and command. DS Bot, published as `ds-bot`, is a separate project."
  - q: "Can I edit DeepSeekBot's persistent memory?"
    a: "Yes. Open the bot's memory in the sidebar to review its Git history and correct anything it recorded incorrectly."
  - q: "Can DeepSeekBot reply in Slack or Discord?"
    a: "Yes. Once connected, a bot can answer in its own identity when you mention it in a group or send it a direct message. The project also supports Lark, QQ, and WeChat."
  - q: "Does DeepSeekBot need my computer online for scheduled tasks?"
    a: "Yes, the computer running DeepSeek Harness needs to stay online for background work. If a scheduled task doesn't run, check that the host was online at the scheduled time."
---

## What does DeepSeekBot do?

DeepSeekBot is a DSH plugin for building a team of personal AI agents with distinct identities and persistent memory. The project now goes by Tobs and is an MIT-licensed, open-source alternative to GrokBot. It runs inside DeepSeek Harness and uses the model providers and usage allowances configured there.

Use it when one general-purpose chat isn't enough. You might keep a research bot that remembers a project's background and a writing bot that knows your editorial preferences. Talk to each privately when the work is separate, or put them in a group chat when you want both to contribute. Their identities carry over when you switch conversations.

## DeepSeekBot core features

- **Separate bot identities.** Give each agent a name and persona that fit its role. The project supports per-bot permissions, and each name generates a pixel avatar that helps you tell agents apart in a group.
- **Git-backed memory.** Each bot stores its memory in a regular Git repository. Use the sidebar to see what changed and correct inaccurate notes, or push the repository to GitHub to use the same bot across computers.
- **Multi-agent collaboration.** Mention the bot you want in a group chat, or delegate a larger assignment for a bot to work on separately. It can report back when finished and let you know when it needs your decision.
- **Chat integrations.** Connect bots to Slack, Discord, Lark, QQ, or WeChat so they can respond in the conversation where you contacted them. WeChat direct messages also support sending and receiving files.
- **Scheduled tasks.** Ask for a recurring job in plain language, such as a daily morning summary, or set the recurrence manually. Keep the computer running the harness online if you expect bots to work in the background.

## How to install and use DeepSeekBot

1. Copy the current verified command from the official Tobs installation guide. For a new setup, choose the `@botharness/tobs` package, which uses the `tobs` command. The `deepseekbot` package and command are still available for existing users.
2. Install and enable the plugin in the DeepSeek Harness desktop app. If you haven't installed the desktop app yet, do that first. After enabling the plugin, open Bot Mode from the sidebar.
3. Check your model provider and available allowance in the harness model settings. In Bot Mode, create a bot with a clear role and try a direct message before adding more agents or moving the conversation to a group.
4. Once you've tried a few conversations, open the memory view in the sidebar to see what the bot retained. Correct any notes that misstate your preferences or project details.

## How to troubleshoot DeepSeekBot

- If Bot Mode is missing, confirm that you're in the profile where you installed the plugin and that it is enabled. Restart DSH and check the sidebar again.
- If a bot doesn't respond, check the model provider settings and available allowance. If the issue persists, review the logs and compare your installed version with the version notes in the installation guide.
- If recurring work doesn't happen, check that the computer running the harness was online at the expected time. Review the task's recurrence to confirm that it was scheduled for when you expected it to run.
