---
title: "dsh-bridge：手机远程控制 DSH 插件"
description: "dsh-bridge 是一个通过局域网扫码、公网隧道，以及微信、QQ、飞书、Telegram 机器人远程使用 DeepSeek Harness 的 DSH 插件。了解安装和连接排查。"
summary: "DSH 远程访问插件：同一 Wi-Fi 下扫码访问，开启 Cloudflare 或自建隧道，或者给聊天机器人发消息来启动、停止和审批任务。"
highlights:
  - "局域网扫码直连"
  - "Cloudflare 与自建公网隧道"
  - "微信、QQ、飞书、Telegram 机器人"
  - "访问密码与后台密码"
  - "可安装的移动端 PWA"
faq:
  - q: "dsh-bridge 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add @wenbin_wb/dsh-bridge`。桌面版用的是独立的 `desktop` profile，也要单独安装：用 `--profile desktop`，或者在「设置 → 插件 → 添加插件」里安装，装完重启 DSH。"
  - q: "用 dsh-bridge 远程访问 DSH 需要公网 IP 吗？"
    a: "不需要。默认的 Cloudflare 临时隧道不用账号、不用端口转发，就能生成 `trycloudflare.com` 地址。填入隧道 Token 可以绑定固定域名，自建 WebSocket 隧道则走你自己的 VPS。"
  - q: "dsh-bridge 的聊天机器人能做什么？"
    a: "机器人支持 `/sessions` 和 `/use` 切换会话、`/new` 开始任务、`/stop` 停止任务、`/yes` 或 `/no` 回应权限请求，以及 `/diff` 把改动导出成 patch 文件。"
  - q: "谁能通过 dsh-bridge 的机器人控制 DSH？"
    a: "只有白名单里的发送者。配置完成后，第一个发消息的管理员会被自动绑定，其他人的消息直接丢弃，不会交给模型，也不消耗 token。"
  - q: "dsh-bridge 支持哪些 DSH 版本？"
    a: "支持 `0.1.0` 到 `0.1.7`，以及 `0.2.0-rc.2`，网页版 profile 和桌面版内置宿主都可以用，不需要按 DSH 版本挑插件版本。"
  - q: "手机扫码后打不开 dsh-bridge 页面怎么办？"
    a: "确认手机和电脑连的是同一个 Wi-Fi、路由器没开 AP 隔离；装了 VPN 或虚拟机的话，切换到物理网卡的 IP；并在防火墙里放行 Node.js 的 3082 端口。"
---

## dsh-bridge 是做什么的？

dsh-bridge 是一个让你在手机或其他设备上继续使用电脑里 DeepSeek Harness 的 DSH 插件。同一个 Wi-Fi 下扫码就能打开；出门在外开一个公网隧道；或者干脆在微信、QQ、飞书、Telegram 里给机器人发消息，启动、停止和审批 Agent 任务。

它适合在工位上开了一个长任务、想在沙发上或通勤路上查看进度、审批操作、发下一条指令的人。不用自己搭公网服务器，默认的 Cloudflare 隧道连账号都不需要。

远程进来的流量都要经过插件自己的门禁：二维码 Token、访问密码，以及单独的后台管理密码。所有设置都集中在 DSH 设置里的「远程访问」面板。

## dsh-bridge 核心功能

- **局域网访问**：DSH 启动时显示二维码，同一 Wi-Fi 下扫码打开手机界面。电脑有多块网卡时可以手动选择，选择会被记住。
- **公网隧道**：免登录的 Cloudflare 临时隧道、绑定固定域名的 Token 隧道，或者连接自己 VPS 的自建 WebSocket 隧道，公网入口每 60 秒检测一次。
- **移动端与 PWA**：适配手机的界面，可以添加到主屏幕全屏使用，还能在网页上远程选择工作区目录。
- **访问控制**：二维码 Token 登录、访客密码、独立的后台管理密码，还可以限制只允许在本机管理设置。
- **聊天机器人**：微信、QQ、飞书、Telegram 机器人支持多个工作区，流式回复，每轮结束后列出改动的文件。
- **运维看板**：运行状态监控，设置面板里可以一键升级和重启。

## 怎么安装和使用 dsh-bridge？

1. 确认装了 Node.js 22.19 以上或 24 以上，并且能运行 `dsh` 命令。
2. 安装插件：

   ```bash
   dsh plugin --profile web add @wenbin_wb/dsh-bridge
   ```

   桌面版把命令里的 profile 换成 `--profile desktop`，或者在「设置 → 插件 → 添加插件」里输入 `@wenbin_wb/dsh-bridge`，国内网络可以切换到中国大陆镜像源。

3. 重启 DSH，打开左侧栏的「设置」，点击「远程访问」。
4. 同一 Wi-Fi 下用手机扫二维码。不在家时，在隧道区域点击「启动」，拿到一个临时的 `https://*.trycloudflare.com` 地址。
5. 想用聊天机器人，在同一个面板里配置微信、QQ、飞书或 Telegram，然后给机器人发第一条消息，完成管理员绑定。

升级可以点「远程访问」面板底部的一键升级，或者运行 `dsh plugin --profile web add @wenbin_wb/dsh-bridge@latest`。

## dsh-bridge 报错怎么排查？

- **扫码后手机打不开页面**：确认两台设备在同一个 Wi-Fi，路由器没有开 AP 隔离。装了 WSL、VMware、Hyper-V 或 VPN 的话，在网卡选择里切换到物理 Wi-Fi 或以太网的 IP。防火墙要放行 Node.js 的 3082 端口。
- **跨网段或在公司内网**：直接改用 Cloudflare 隧道，不要用局域网访问。
- **桌面版里看不到插件**：桌面版和网页版是两个 profile，要把 dsh-bridge 也装进 `desktop`，再通过应用菜单重启。
- **升级后还是旧版本**：pnpm 11 的 `minimumReleaseAge` 机制会延后拿到新版本，用带 `@latest` 的命令强制安装。
- **机器人不理你**：只处理白名单里的发送者。配置完成后，用管理员身份发第一条消息重新绑定。

反馈问题时，请附上插件版本、DSH 版本、profile，以及当时用的访问方式。
