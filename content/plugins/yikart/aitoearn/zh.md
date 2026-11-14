---
title: "AiToEarn：用 DSH 一键多平台发内容"
description: "AiToEarn 是一套让 DeepSeek Harness 创作内容并发布到 14 个以上社交平台的 DSH 技能包和 MCP 服务。了解安装方法和 401 报错排查。"
summary: "AiToEarn 为 AI 助手提供内容营销用的技能和 MCP 接入，覆盖内容生成、社媒发布、互动和变现任务。"
highlights:
  - "发布到 14 个以上平台"
  - "统一的排期日历"
  - "视频和图文生成"
  - "面向 Agent 的技能包和 MCP"
  - "云端使用或 Docker 自部署"
faq:
  - q: "AiToEarn 怎么安装到 DeepSeek Harness？"
    a: "在 DSH 的对话框里粘贴“帮我安装 https://github.com/yikart/AiToEarn/tree/main/skills 的插件包”。AI 会向你要 API Key、完成配置并验证。README 没有提供单独的 `dsh plugin add` 命令。"
  - q: "AiToEarn 能发布到哪些平台？"
    a: "14 个以上，包括抖音、小红书、快手、B站、视频号、公众号、TikTok、YouTube、Instagram、LinkedIn 等，用一个日历统一排期。"
  - q: "AiToEarn 的 MCP 怎么认证？"
    a: "在「设置 → API Key」里创建 Key，放在 `x-api-key` 请求头里。国内账号用 `https://aitoearn.cn/api/unified/mcp`，国际账号用 `https://aitoearn.ai/api/unified/mcp`。"
  - q: "AiToEarn 为什么返回 401？"
    a: "接口地址必须和签发 Key 的环境一致。aitoearn.cn 签发的 Key 拿去请求 aitoearn.ai 的接口会被拒绝，反过来也一样。"
  - q: "AiToEarn 需要自己部署吗？"
    a: "不需要。云端网站和 MCP 直接就能用；想自己运行的团队，可以按文档用 Docker 部署。"
  - q: "自己部署 AiToEarn，需要在每个平台申请开发者账号吗？"
    a: "配置 Relay 就不需要。README 强烈建议配置它：Relay 借用官方凭据完成抖音、小红书、TikTok 等平台的 OAuth 授权。"
---

## AiToEarn 是做什么的？

AiToEarn 是一个内容营销平台，DeepSeek Harness 可以通过它的技能包和 MCP 服务来调用。让 Agent 写一篇帖子、做一条短视频或者排一轮推广，AiToEarn 负责生成内容，再发布到国内外 14 个以上的社交平台。

它面向一人公司、创作者、品牌和小团队，覆盖四件事：创作视频和图文；按统一排期发布；通过点赞、关注、AI 回复评论和粉丝互动；以及接商家推广任务，按 CPS、CPE、CPM 结算赚钱。

README 把 DeepSeek Harness 列为支持一句话安装的 AI 助手之一，同列的还有 Claude Code、Codex、Trae、Kimi Work 等。你可以直接用云端服务，也可以用 Docker 自己部署一套。

## AiToEarn 核心功能

- **发布**：一套流程覆盖抖音、小红书、快手、B站、视频号、公众号、TikTok、YouTube、Instagram、LinkedIn 等，用日历排期。
- **创作**：生成视频和图文，翻译和剪辑视频，批量提交创作任务。
- **互动**：浏览器插件支持点赞、收藏、关注、AI 回复评论，以及监测品牌相关讨论。
- **变现**：商家推广任务，按 CPS、CPE、CPM 结算。
- **Agent 接入**：给编程 Agent 用的技能包，以及分国内、国际两个地址的 MCP 服务。

## 怎么安装和使用 AiToEarn？

1. 在 AiToEarn 网站注册账号，在「设置 → API Key」里生成一个 Key。
2. 在 DSH 的对话里粘贴：

   ```text
   帮我安装 https://github.com/yikart/AiToEarn/tree/main/skills 的插件包
   ```

   Agent 会向你要 API Key，完成配置并检查能否正常使用。

3. 手动配置 MCP 时，选择和签发 Key 相同环境的地址：

   ```text
   国内：https://aitoearn.cn/api/unified/mcp
   国际：https://aitoearn.ai/api/unified/mcp
   请求头：x-api-key: YOUR_API_KEY
   ```

4. 给 Agent 布置任务，比如“围绕我们的新品写三篇小红书笔记，排到下周发布”。

想自己部署，按 Docker 部署文档配置好必填的密钥（包括 `JWT_SECRET`），再运行 `docker compose up -d`。

## AiToEarn 报错怎么排查？

- **请求返回 401**：检查 MCP 地址和签发 Key 的环境是否一致：aitoearn.cn 的 Key 只能用国内地址，aitoearn.ai 的 Key 只能用国际地址。
- **Agent 没装完**：准备好 API Key，重新发一遍安装指令；验证不了 Key 时流程会中断。
- **自部署时社交账号授权失败**：配置 Relay，用官方凭据完成 OAuth，不必在每个平台单独申请开发者账号。
- **Docker 启动失败**：按部署文档设置必填的认证密钥，并在 `docker compose up -d` 之前导出 `JWT_SECRET`。
- **内容没有发出去**：在 AiToEarn 的排期日历里查看这条内容的状态，并确认目标账号的授权没有过期。

反馈问题时，请说明用的是云端还是自部署、MCP 地址，以及当时发布的平台。
