---
title: "Connect your AI assistant to content creation and social publishing"
description: "Connect AI assistants to AiToEarn through skills and MCP for content creation, publishing across 14+ platforms, scheduling, and social engagement."
summary: "AiToEarn provides skills and MCP access for AI-assisted content marketing. Its platform covers content generation, social publishing, engagement, and monetization tasks."
highlights:
  - "Plugin and skill pack with installation guidance for DeepSeek Harness"
  - "MCP endpoints for China and international accounts, authenticated with an API key"
  - "Publishing to 14+ platforms with a shared scheduling calendar"
  - "Video and image-text creation, including batch generation tasks"
  - "Browser extension for engagement actions and AI comment replies"
faq:
  - q: "How can DSH users access AiToEarn?"
    a: "The README explicitly includes DeepSeek Harness among assistants supported by its plugin and skill pack installation instructions. It supplies a conversational installation prompt pointing to the repository's skills directory, but no DSH CLI installation command."
  - q: "What is needed for MCP authentication?"
    a: "Create an API key in AiToEarn settings and send it using the x-api-key header. Use the endpoint matching the China or international environment where the key was issued; a mismatch causes a 401 response."
  - q: "Does it require self-hosting?"
    a: "The hosted web service and MCP integration do not require deployment. Docker deployment is also documented for teams that want to run their own instance."
---

## What does AiToEarn do?

AiToEarn connects AI assistants to a content marketing platform for creators, solo businesses, and teams. Its repository includes a plugin and skill pack, and the README names DeepSeek Harness as a supported assistant for the conversational installation flow.

The platform covers content creation, distribution, audience engagement, and merchant promotion tasks with CPS, CPE, and CPM settlement models.

## Core features

- Publish to 14+ social platforms, including Douyin, Xiaohongshu, TikTok, YouTube, Instagram, and LinkedIn, with calendar-based scheduling.
- Generate videos and image-text content, translate and edit video, and submit creation tasks in batches.
- Use the AiToEarn browser extension for likes, saves, follows, AI comment replies, and monitoring brand discussions on supported platforms.
- Connect through MCP using separate China and international endpoints.
- Use the hosted service or deploy the project with Docker.

## How to use AiToEarn

In DSH, ask the assistant to install the plugin pack from `https://github.com/yikart/AiToEarn/tree/main/skills`. The documented flow asks for an API key, configures the integration, and verifies it. The supplied README does not provide a DSH CLI installation command.

For MCP access, create a key under settings → API Key, then configure the matching endpoint and authentication header:

- China: `https://aitoearn.cn/api/unified/mcp`
- International: `https://aitoearn.ai/api/unified/mcp`
- Header: `x-api-key: YOUR_API_KEY`

The endpoint must match the environment that issued the key. For a self-hosted instance, use your deployment address. Before starting Docker deployment, follow `DOCKER_DEPLOYMENT_CN.md` to configure the required authentication secrets and export `JWT_SECRET`.
