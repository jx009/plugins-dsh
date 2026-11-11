---
title: "DSH 小鲸鱼挂件：实时查看 DeepSeek 余额"
description: "常驻 DSH 网页界面右下角的小鲸鱼记账挂件，显示 DeepSeek API 余额、今日已用和每轮对话消耗，泡泡、音效与提醒都能自行配置，适合想随时掌握花费的用户。"
summary: "住在 DSH 网页界面右下角的小鲸鱼挂件，显示 DeepSeek API 余额、今日已用和每轮对话消耗，泡泡、音效、提醒均可自定义。"
highlights:
  - "余额与今日已用"
  - "每轮消耗提示"
  - "模块化泡泡"
  - "多厂商模板"
  - "预算与余额预警"
faq:
  - q: "统计今日已用需要 DeepSeek 平台令牌吗？"
    a: "不需要。今日已用由观测到的余额下降和本机 DSH 会话事件算出，不涉及平台令牌。余额本身通过 `DEEPSEEK_API_KEY` 凭据读取；没有配置 key 时，会改用你在 DSH 里登录的 DeepSeek 账号。"
  - q: "能显示 DeepSeek 以外厂商的余额吗？"
    a: "可以。记账菜单内置 34 个厂商模板，其中 OpenRouter、Moonshot 等能查到真实余额或额度；OpenAI、Anthropic、Gemini 等没有余额接口，挂件只验证密钥是否可用，今日已用按会话事件估算。"
  - q: "官方桌面客户端能用吗？"
    a: "同一个包支持桌面端，但 `--profile web` 命令在那里不适用，因为桌面端读的是自己的 `desktop` profile。README 的做法是在桌面端会话里让 DSH 用内置的 `plugin_manager` 安装 `dsh-whale-widget`。"
---

## DeepSeek-Balance-Whale-Widget 是做什么的？

DeepSeek-Balance-Whale-Widget 在 DeepSeek Harness 网页界面的右下角放一只小鲸鱼，用来显示 DeepSeek API 余额、今天花了多少钱，以及每一轮对话的消耗。

余额每 60 秒自动刷新一次，点一下鲸鱼也能手动刷新。花费是在本机算出来的：余额下降记为消费，充值和赠金单独记录，不会把之前的消费冲掉。每轮对话的金额取自 DSH 会话事件里的 token 用量（输入、缓存、输出、推理），并按 DeepSeek 的峰谷价格换算。

记账之外，这个项目的大部分篇幅都花在自定义上。泡泡由若干模块拼成，排版自己定；角色图片、音效、吸附方式也都能在挂件菜单里更换。

## 核心功能

- **余额显示**：通过 `DEEPSEEK_API_KEY` 凭据或 DSH 账号登录态读取余额。
- **用量记录**：记录窗口可查看今日、近 7 天和全部消费，带模型占比条，支持按日期或模型名搜索。
- **模块化泡泡**：一个泡泡最多 6 行，可放文本、链接、随机语句、图片，以及余额、峰谷时段等内置数值。
- **提醒与音效**：可选的余额预警和今日预算提醒；一轮回复结束、DSH 等你回答或授权时可以播放提示音。
- **其他厂商**：34 个模板覆盖 OpenRouter、Moonshot 等厂商的余额或额度查询，没有余额接口的厂商则给出估算消费。
- **拖拽吸附**：鲸鱼可以拖动，吸附区域可调，贴到左侧时会水平翻转。

## 怎么使用 DeepSeek-Balance-Whale-Widget

1. 用本页的安装命令把 npm 包装进 web profile。README 提醒不要混用 npm 和 `github:` 两种安装来源；之前从 GitHub 装过的话，先把旧的卸掉：

```
dsh plugin --profile web remove dsh-whale-widget
```

2. 重启 `dsh web` 并刷新浏览器，此后每次打开网页界面鲸鱼都会自动出现。
3. 让它能读到余额：在 DSH 凭据服务里配置 `DEEPSEEK_API_KEY`，或者在设置的“账号与余额”里登录 DeepSeek 账号。
4. 点击鲸鱼刷新余额、切换泡泡。大小、吸附、音效、提醒和记账窗口都在菜单里。

如果用的是官方桌面客户端，不要执行 `--profile web` 命令，改为让 DSH 用内置的 `plugin_manager` 安装这个包。
