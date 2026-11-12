---
title: "在 AI 助手中接入内容创作与多平台发布"
description: "通过技能包与 MCP 将 AiToEarn 接入 DSH 等 AI 助手，支持图文和视频创作、跨平台发布与排期，并提供浏览器插件辅助互动运营，可使用托管服务或自行部署。"
summary: "AiToEarn 提供面向 AI 助手的插件、技能包与 MCP 接口，将内容生成、多平台发布、互动运营和商业推广任务接入内容营销流程。"
highlights:
  - "提供插件与技能包，安装说明明确涵盖 DeepSeek Harness"
  - "中国版与国际版分别提供 MCP 接口，使用 API Key 认证"
  - "支持向 14 个以上平台发布内容，并通过统一日历安排发布时间"
  - "支持视频、图文制作及批量创作任务"
  - "通过浏览器插件执行互动操作和 AI 评论回复"
faq:
  - q: "DSH 用户如何接入？"
    a: "README 将 DeepSeek Harness 列入插件与技能包的适用助手，并提供指向仓库 skills 目录的对话式安装提示词。所给内容没有 DSH CLI 安装命令。"
  - q: "MCP 接入需要哪些认证信息？"
    a: "先在 AiToEarn 设置中创建 API Key，再通过 x-api-key 请求头传入。接口地址必须与密钥所属的中国版或国际版环境一致，否则会返回 401。"
  - q: "是否必须自行部署？"
    a: "使用托管网页版或 MCP 接口无需自行部署。需要运行私有实例的团队也可以采用 README 中的 Docker 部署方式。"
---

## AiToEarn 是做什么的？

AiToEarn 面向创作者、一人公司和团队提供内容营销能力，并通过插件、技能包及 MCP 接口供 AI 助手使用。README 明确将 DeepSeek Harness 列入对话式安装流程支持的助手。

平台涵盖内容制作、分发、互动运营和商业推广任务，推广任务提供按成交额、互动量或播放量结算的 CPS、CPE、CPM 模式。

## 核心功能

- 向抖音、小红书、TikTok、YouTube、Instagram、LinkedIn 等 14 个以上平台发布内容，并通过日历统一排期。
- 生成视频和图文，处理视频翻译与剪辑，并批量下发创作任务。
- 通过 AiToEarn 浏览器插件，在支持的平台执行点赞、收藏、关注、AI 评论回复及品牌讨论监测。
- 提供中国版与国际版 MCP 接口，以 API Key 认证。
- 支持使用托管服务，也提供 Docker 自部署方式。

## 怎么使用 AiToEarn

在 DSH 对话中，请助手安装 `https://github.com/yikart/AiToEarn/tree/main/skills` 中的插件包。文档描述的流程会索取 API Key、完成配置并验证连接。所给 README 没有提供 DSH CLI 安装命令。

如需通过 MCP 接入，先在设置中的 API Key 页面创建密钥，再填写对应环境的接口地址与认证请求头：

- 中国版：`https://aitoearn.cn/api/unified/mcp`
- 国际版：`https://aitoearn.ai/api/unified/mcp`
- 请求头：`x-api-key: YOUR_API_KEY`

密钥来源必须与接口环境一致。自部署实例需使用自己的服务地址；启动 Docker 部署前，按 `DOCKER_DEPLOYMENT_CN.md` 配置必填认证密钥，并导出 `JWT_SECRET`。
