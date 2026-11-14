---
title: "dsh-our-free-model：DSH 免费模型插件"
description: "dsh-our-free-model 是一个给 DeepSeek Harness 接入免费模型、多提供商路由和本地网关的 DSH 插件。了解安装方法、429 限流和空响应的排查。"
summary: "为 DSH 接入免登录的免费模型渠道、账号渠道和多家提供商，附带降级路由链、本地用量统计，以及兼容 OpenAI 和 Anthropic 的本地网关。"
highlights:
  - "免登录、免 Key 的免费模型"
  - "自带 Key 接入多家提供商"
  - "降级与轮询路由链"
  - "兼容 OpenAI 和 Anthropic 的本地网关"
  - "本地用量与延迟看板"
faq:
  - q: "dsh-our-free-model 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add @ebony-vinyl/dsh-our-free-model@2.8.3`，profile 换成你自己的，然后重启 DSH。注意包名带 `@ebony-vinyl` 前缀，README 特别提醒 npm 上不带前缀的同名包不是本项目发布的。"
  - q: "dsh-our-free-model 真的免费不限量吗？"
    a: "免费车道没有充值、按 token 计费或套餐。但它按会话和出口 IP 限速，短时间内打满会返回 429，插件会把该模型标记为“已达限额”，下一轮探测后自动恢复。"
  - q: "dsh-our-free-model 报 429 怎么办？"
    a: "上游按出口 IP 和会话统计免费额度。收到真实的 429 后，插件会进入冷却期，不再自动重试这一轮。可以稍后再试、换一个模型或路由链，或者改用自带 Key 的渠道。"
  - q: "dsh-our-free-model 的思考模型为什么返回空响应？"
    a: "有些模型思考阶段不输出任何内容，而且思考和正文共用输出预算，上限太低时这一轮会以空正文结束。把单次输出上限调到 16k 以上，或者改用标注了 `reasoning: false` 的模型。"
  - q: "其他工具能用 dsh-our-free-model 的模型吗？"
    a: "能。本地网关提供 OpenAI 兼容接口和 `/v1/messages` 等 Anthropic 接口，网关页面会按实际端口和密钥生成各个客户端的接入示例。"
  - q: "dsh-our-free-model 会把提示词留在本机吗？"
    a: "不会。用量统计存在本地，但推理请求会发给你选中的上游提供商。README 提到部分免费池的提供商可能记录提示词用于改进服务。"
---

## dsh-our-free-model 是做什么的？

dsh-our-free-model 是一个给 DeepSeek Harness 接入免费模型和自带 Key 模型的 DSH 插件。它最大的卖点是一组匿名免费渠道：装上插件，DeepSeek、Kimi 等模型就出现在 DSH 的模型选择器里，不用登录、注册，也不用填 API Key。

除了免费渠道，它还是一个完整的模型路由器。你可以添加需要账号登录的渠道，用自己的 Key 接入几十家提供商，连接 Ollama、LM Studio、llama.cpp 等本地服务，再把多个模型组合成降级链。模型清单、上下文上限和能力标注都从上游刷新，可用性由你这台机器的网络出口实测得出。

插件以明文 JavaScript 挂载，没有构建步骤，零依赖，也不改 DSH 内核。免费访问仍然受上游额度、地区政策和可用性限制。

## dsh-our-free-model 核心功能

- **免费渠道**：直连 OpenCode Zen、Kilo AI 等网关，不需要账号和 Key。
- **多提供商接入**：在免费渠道之外，可以添加账号渠道，或用自己的凭据接入各家提供商。
- **思考强度控制**：按模型支持的方式，下发真实的强度档位或输出 token 预算，而不只是提示词。
- **命名路由链**：以 `combo:<名字>` 的虚拟模型出现，支持降级和轮询。某次尝试失败时，只要还没输出正文，就能切到下一个模型。
- **本地网关**：OpenAI 兼容接口和包括 `/v1/messages` 在内的 Anthropic 接口，编辑器和其他 Agent 也能复用这些模型。
- **用量看板**：token 消耗、生成速度和首字延迟，全部记录在本地。
- **签名升级**：应用内升级用插件内置的 Ed25519 公钥校验，失败自动回滚，热重载无需重启。

## 怎么安装和使用 dsh-our-free-model？

1. 把带前缀的 npm 包装进你的 DSH profile，`web` 换成你实际使用的名字：

   ```bash
   dsh plugin --profile web add @ebony-vinyl/dsh-our-free-model@2.8.3
   ```

   也可以从本地代码目录安装：`dsh plugin --profile web add /绝对路径/dsh-our-free-model`。同一个 profile 里两种方式只能选一种。

2. 重启一次 DSH。
3. 打开模型选择器，选一个免费模型；或者进入插件设置，登录账号渠道、用自己的 Key 添加提供商。
4. 要在多个模型之间路由，在设置里定义一条链，然后选择 `combo:<名字>`。
5. 要在其他客户端里用这些模型，打开网关页面，复制它按实际端口和密钥生成的配置。

## dsh-our-free-model 报错怎么排查？

- **装错了包**：npm 上不带前缀的 `dsh-our-free-model` 不是本仓库发布的，文件被改动过。卸掉它，改装 `@ebony-vinyl/dsh-our-free-model`。
- **桌面端报 `PROFILE_UPGRADE_REQUIRED`**：部分 DSH 桌面整合包会拦截 profile 里的符号链接和目录 junction。不要用 `link:` 依赖，改用应用内的插件管理器，或者按 README 的说明把本地 tarball 放进 profile 的 `vendor/` 目录安装。
- **模型显示已达限额或返回 429**：免费额度按出口 IP 和会话统计，插件会进入冷却期而不是反复重试。换一个模型、用降级链，或者添加自带 Key 的渠道。
- **思考模型返回空正文或超时**：静默思考和正文共用输出预算。把输出上限调到 16k token 以上，或者选标注了 `reasoning: false` 的模型。
- **速度一栏显示 —**：有些模型一两帧就把答案全部发完，没有可计算的时间窗。这是正常现象，不是故障。

提交问题时，请附上插件版本、DSH 宿主类型和版本、模型 id 和报错原文，记得删掉密钥。
