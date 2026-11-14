---
title: "AiToEarn: AI Content Publishing for DSH"
description: "AiToEarn is a DSH skill pack and MCP server that lets DeepSeek Harness create content and publish it to 14+ social platforms. Learn to install it and fix 401s."
summary: "AiToEarn provides skills and MCP access for AI-assisted content marketing. Its platform covers content generation, social publishing, engagement, and monetization tasks."
highlights:
  - "Publish to 14+ social platforms"
  - "Shared scheduling calendar"
  - "Video and image-text generation"
  - "Skill pack and MCP server for agents"
  - "Hosted service or Docker self-hosting"
faq:
  - q: "How do I install AiToEarn in DeepSeek Harness?"
    a: "Paste \"Install the plugin pack from https://github.com/yikart/AiToEarn/tree/main/skills\" into a DSH conversation. The assistant asks for your API key, configures the integration and verifies it. The README gives no separate `dsh plugin add` command."
  - q: "Which platforms can AiToEarn publish to?"
    a: "More than 14, including Douyin, Xiaohongshu, Kuaishou, Bilibili, WeChat Channels, TikTok, YouTube, Instagram and LinkedIn, with a shared calendar for scheduling."
  - q: "How does AiToEarn MCP authentication work?"
    a: "Create an API key under Settings → API Key and send it in the `x-api-key` header. Use `https://aitoearn.cn/api/unified/mcp` for China accounts and `https://aitoearn.ai/api/unified/mcp` for international ones."
  - q: "Why does AiToEarn return 401 Unauthorized?"
    a: "The endpoint must match the environment that issued the key. A key from aitoearn.cn will be rejected by the aitoearn.ai endpoint, and the other way round."
  - q: "Do I need to self-host AiToEarn?"
    a: "No. The hosted web service and MCP work without deployment. Docker deployment is documented for teams that want their own instance."
  - q: "Do I need developer accounts on each platform to self-host AiToEarn?"
    a: "Not if you configure Relay. The README strongly recommends it: Relay uses the official credentials to complete OAuth with platforms such as Douyin, Xiaohongshu and TikTok."
---

## What does AiToEarn do?

AiToEarn is a content marketing platform that DeepSeek Harness can drive through its skill pack and MCP server. Ask the agent to write a post, make a short video or schedule a campaign, and AiToEarn creates the content and publishes it to more than 14 social platforms in China and abroad.

The platform is aimed at solo businesses, creators, brands and small teams. It covers four jobs: creating videos and image-text posts, publishing them on a shared schedule, engaging with audiences through likes, follows and AI comment replies, and earning from merchant promotions settled by CPS, CPE or CPM.

The README names DeepSeek Harness among the assistants supported by its one-line conversational install, alongside Claude Code, Codex, Trae and Kimi Work. You can use the hosted service or deploy your own copy with Docker.

## AiToEarn core features

- **Publish**: one workflow for Douyin, Xiaohongshu, Kuaishou, Bilibili, WeChat Channels and Official Accounts, TikTok, YouTube, Instagram, LinkedIn and more, with calendar scheduling.
- **Create**: video and image-text generation, video translation and editing, and batch creation tasks.
- **Engage**: a browser extension for likes, saves, follows, AI comment replies and monitoring brand discussions.
- **Monetize**: merchant promotion tasks with CPS, CPE and CPM settlement.
- **Agent access**: a skill pack for coding agents and an MCP server with separate China and international endpoints.

## How to install and use AiToEarn

1. Create an AiToEarn account on the hosted site and generate an API key under Settings → API Key.
2. In a DSH conversation, paste:

   ```text
   Install the plugin pack from https://github.com/yikart/AiToEarn/tree/main/skills
   ```

   The agent asks for your API key, configures the integration and checks that it works.

3. For a manual MCP setup, use the endpoint that matches where your key was issued:

   ```text
   China:         https://aitoearn.cn/api/unified/mcp
   International: https://aitoearn.ai/api/unified/mcp
   Header:        x-api-key: YOUR_API_KEY
   ```

4. Ask the agent for a task, for example "write three Xiaohongshu posts about our new product and schedule them for next week".

To self-host, follow the Docker deployment guide, set the required secrets such as `JWT_SECRET`, and run `docker compose up -d`.

## How to troubleshoot AiToEarn

- **Requests fail with 401.** Check that the MCP endpoint matches the environment that issued your key: aitoearn.cn keys work only with the China endpoint, aitoearn.ai keys only with the international one.
- **The agent did not finish installing.** Re-run the install prompt and have your API key ready; the flow stops if it cannot verify the key.
- **Authorizing a social account fails on a self-hosted instance.** Configure Relay so the official credentials handle OAuth, instead of applying for developer accounts on each platform.
- **The Docker stack will not start.** Set the required authentication secrets and export `JWT_SECRET` before `docker compose up -d`, as the deployment guide describes.
- **A post did not go out.** Open the scheduling calendar in AiToEarn to see its status, and confirm the target account is still authorized.

When reporting a problem, include whether you use the hosted or self-hosted service, the endpoint, and the platform you were publishing to.
