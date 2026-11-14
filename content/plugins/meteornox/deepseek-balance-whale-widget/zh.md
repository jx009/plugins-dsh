---
title: "DeepSeek Balance Whale Widget：DSH 余额小鲸鱼"
description: "DeepSeek-Balance-Whale-Widget 是一个在界面角落显示 DeepSeek 余额、今日花费和每轮消耗的 DSH 插件。了解安装方法和挂件不显示的排查。"
summary: "常驻 DSH 网页界面右下角的小鲸鱼记账挂件，显示 DeepSeek API 余额、今日已用和每轮对话消耗，泡泡、音效与提醒都能自行配置。"
highlights:
  - "DeepSeek 余额与今日花费"
  - "每轮对话消耗气泡"
  - "按日期和模型的记账"
  - "余额不足与预算提醒"
  - "34 家服务商余额模板"
faq:
  - q: "DeepSeek Balance Whale Widget 怎么安装到 DSH？"
    a: "网页版运行 `dsh plugin --profile web add github:MeteorNOX/DeepSeek-Balance-Whale-Widget`，重启 `dsh web` 后刷新浏览器。npm 包名是 `dsh-whale-widget`。"
  - q: "DSH 桌面端怎么装 DeepSeek-Balance-Whale-Widget？"
    a: "桌面端读的是自己的 `desktop` profile，`dsh plugin` 命令会拒绝操作它。在桌面端的会话里让 DSH 用内置的 `plugin_manager` 安装 `dsh-whale-widget`，装完重开客户端。"
  - q: "DeepSeek-Balance-Whale-Widget 需要 DeepSeek 平台令牌吗？"
    a: "不需要。余额通过 `DEEPSEEK_API_KEY` 凭据或你在 DSH 里登录的账号读取，今日花费根据余额下降和 DSH 会话事件在本地算出。"
  - q: "DeepSeek-Balance-Whale-Widget 怎么算每轮对话的花费？"
    a: "从 DSH 会话事件里读取输入、缓存、输出和推理 token 数，按 DeepSeek 的高峰和低谷价格计算。充值和赠送额度单独记录，不会抵消之前的消费。"
  - q: "DeepSeek-Balance-Whale-Widget 能查其他服务商的余额吗？"
    a: "能。记账菜单内置 34 个服务商模板。OpenRouter、Moonshot 等能返回真实余额或额度；OpenAI、Anthropic 这类没有余额接口的，只检查 Key 并估算花费。"
  - q: "DeepSeek-Balance-Whale-Widget 放在反向代理后面报 403 怎么办？"
    a: "它的 `/dsh-whale/*` 接口默认只接受本机地址的请求。启动时用 `DSHW_TRUSTED_HOSTS` 声明允许的域名，例如 `DSHW_TRUSTED_HOSTS=dsh.example.com dsh web`。"
---

## DeepSeek-Balance-Whale-Widget 是做什么的？

DeepSeek-Balance-Whale-Widget 是一个在 DeepSeek Harness 网页界面右下角放一只小鲸鱼、帮你盯着 DeepSeek 账单的 DSH 插件。它显示 DeepSeek API 余额、今天花了多少、每轮对话消耗多少，让你在干活时就能发现哪些提示词特别费钱。

余额每 60 秒刷新一次，点一下鲸鱼也会立即刷新。花费在本地计算：余额下降算作消费，充值和赠送额度单独记账。每轮消耗来自 DSH 会话事件里的 token 用量，包括缓存和推理 token，按 DeepSeek 高峰和低谷时段的价格计价。

剩下的都是个性化设置。气泡由你自己排列的模块拼成，角色图片、音效、提醒和贴边吸附都能在菜单里改。

## DeepSeek-Balance-Whale-Widget 核心功能

- **余额显示**：通过 `DEEPSEEK_API_KEY` 凭据，或你在 DSH 里登录的 DeepSeek 账号读取余额。
- **记账明细**：记录窗口列出今天、最近 7 天和全部的花费，带各模型占比条，可以按日期或模型名搜索。
- **模块化气泡**：每个气泡最多 6 行，可以放文字、链接、随机语句、图片，以及余额、高峰低谷状态等实时数值。
- **提醒与音效**：可选的余额不足和每日预算提醒；每轮结束、DSH 等你回答或审批时会播放提示音。
- **其他服务商**：34 个模板，支持查询 OpenRouter、Moonshot 等服务的余额或额度，没有余额接口的服务按用量估算。
- **拖拽吸附**：鲸鱼可以随意拖动、吸附到屏幕边缘，停靠在左边时会自动翻转朝向。

## 怎么安装和使用 DeepSeek-Balance-Whale-Widget？

1. DSH 网页版直接从 GitHub 安装：

   ```bash
   dsh plugin --profile web add github:MeteorNOX/DeepSeek-Balance-Whale-Widget
   ```

   装完后插件会出现在 DSH 的插件管理页面，以后可以直接在页面里更新。

2. 重启 `dsh web`，再刷新浏览器。
3. 把 DeepSeek 的 Key 设为 `DEEPSEEK_API_KEY` 凭据，或者保持在 DSH 里登录 DeepSeek 账号。
4. 点击鲸鱼刷新余额，打开它的菜单可以编辑气泡、提醒、音效和服务商模板。

官方桌面端不要用 `--profile web` 这条命令。在桌面端的会话里对 DSH 说：“请使用内置的 `plugin_manager` 安装 `dsh-whale-widget`”，装完重开客户端。

## DeepSeek-Balance-Whale-Widget 报错怎么排查？

- **网页版看不到鲸鱼**：运行 `dsh --profile web --dump-config`，确认里面有 `dsh-whale-widget`，然后重启 `dsh web` 并刷新页面。
- **桌面端什么都没有**：多半是装进了 `web` profile。桌面端读的是 `desktop` profile，用 `plugin_manager` 重新安装，再重开客户端。
- **安装失败，只看到 `exit 1` 或 `pnpm failed`**：这只是汇总错误。到 `.plugin-manager/logs/operation-*/pnpm.log` 里找最早的真实报错，并确认宿主能找到 `pnpm`。
- **挂在反向代理或局域网地址后报 403**：插件默认只信任本机地址，启动 `dsh web` 时把你的域名加进 `DSHW_TRUSTED_HOSTS`。
- **没有图片或声音**：插件包里的 `assets/` 目录必须完整，缺文件时对应功能会静默降级。
- **每次打开 DSH 都弹下载框**：IDM 这类下载管理器会抢走挂件的音效文件。在下载管理器的站点排除里加上 `127.0.0.1` 和 `localhost`。

公开贴日志前，记得删掉 API Key、令牌、Cookie 和个人目录路径。
