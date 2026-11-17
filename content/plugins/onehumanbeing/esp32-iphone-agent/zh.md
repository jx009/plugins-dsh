---
title: "esp32-iphone-agent：DSH 控制真实 iPhone"
description: "esp32-iphone-agent 是一个借助 ESP32 控制真实 iPhone 的 DSH 插件。了解开发板刷写、视觉模型配置、使用步骤及免费线路报错排查。"
summary: "通过 AirPlay 获取 iPhone 画面，再用 ESP32-S3 模拟鼠标和键盘，让智能体操作真实手机。手机上的应用负责运行模型循环，执行任务时无需电脑持续连接。"
highlights:
  - "AirPlay 屏幕采集"
  - "USB HID 点击与输入"
  - "兼容 OpenAI 视觉模型"
  - "手机音频转文字"
  - "任务回放与轨迹导出"
faq:
  - q: "esp32-iphone-agent 怎么安装到 DeepSeek Harness？"
    a: "所提供的 README 未列出 DSH 安装命令，也没有可确认的 npm 包名。已公开的设备安装流程是用 Chrome 或 Edge 刷写 Seeed XIAO ESP32S3，再通过 TestFlight 安装手机应用并完成引导。"
  - q: "esp32-iphone-agent 需要 Mac 或越狱吗？"
    a: "README 描述的手机加开发板方案不需要 Mac、越狱或开发者账号。它通过辅助触控和 USB 鼠标键盘输入操作手机，执行任务时也无需电脑持续连接。"
  - q: "esp32-iphone-agent 支持哪些模型？"
    a: "应用支持兼容 OpenAI 接口的视觉模型。README 还介绍了共享免费模型线路，并允许在 Settings › Model 中改用自己的 API key。"
  - q: "esp32-iphone-agent 出现 HTTP 503 怎么办？"
    a: "共享免费线路繁忙时可能返回 HTTP 503，表现为任务卡住或每一步都失败。README 给出的处理方式是在 Settings › Model 中切换到自己的 API key。"
  - q: "esp32-iphone-agent 怎么导出任务记录？"
    a: "在 Runs 中打开目标任务，再选择 ⋯ → Export trace。导出内容包括截图、动作和已保存的标注，可交给其他智能体分析；手机端也支持逐步回放。"
---

## esp32-iphone-agent 是做什么的？

esp32-iphone-agent 是一个借助 ESP32-S3 开发板让 AI 操作真实 iPhone 的 DSH 插件项目。它面向需要手机自动化的开发者，通过 AirPlay 获取画面，以 USB HID 执行鼠标键盘动作，再由手机应用调用视觉模型。仓库提供了 DeepSeek Harness 插件相关演示，但所给 README 片段未包含具体的接入配置。

已介绍的独立运行方案需要一部 iPhone 和约 7 美元的 Seeed XIAO ESP32S3，无需越狱或开发者账号，任务运行时也不必连接电脑。每一步通常需要几秒，主要耗时来自模型；开发板热点占用 Wi-Fi，因此模型请求使用手机蜂窝网络。

## esp32-iphone-agent 核心功能

- **AirPlay 屏幕采集**：开发板创建热点，在屏幕镜像列表中显示为 `ESP32 Agent`。画面以 H.264 形式经 TCP `7201` 端口转发，解码由手机完成。
- **USB HID 操作**：开启辅助触控后，开发板作为鼠标和键盘工作。智能体可点击、滑动、绘制、输入文字、按键及返回主屏幕；应用会追踪指针并在精确点击前校正位置。
- **视觉模型接入**：应用将截图发送给兼容 OpenAI 接口的视觉模型，协调规划和执行。每次操作后等待画面稳定，再把是否发生变化反馈给模型。
- **手机音频理解**：开发板转发 AirPlay 音频，手机将其转成文字，用于听力练习和语音提示。README 列出的更新要求开发板固件为 `v0.2.4`。
- **长任务与轨迹复盘**：更新后取消原有的 40 步限制，停止的任务可继续执行。记录保存在手机上，支持带动作标记的逐步回放，以及截图、动作和标注导出。

## 怎么安装和使用 esp32-iphone-agent？

所给资料没有 DSH 安装命令，也没有已确认的 npm 包名，因此不能提供可直接执行的插件安装指令。以下为 README 已说明的设备部署流程，Harness 侧配置需另行参考完整接入文档。

1. 准备 Seeed XIAO ESP32S3，以及运行 iOS 18 或更高版本的 iPhone。
2. 用 Chrome 或 Edge 打开 `https://handsy.tech/install`，通过浏览器刷写开发板。
3. 从项目的 TestFlight 入口安装应用，完成应用内四步引导，并按提示开启辅助触控。
4. 按引导连接开发板热点，在屏幕镜像中选择 `ESP32 Agent`。此时 Wi-Fi 用于连接开发板，模型联网使用蜂窝数据。
5. 在 `Settings › Model` 配置模型；需要使用自己的 API key 时，也在此处切换。
6. 在应用内启动任务。完成后进入 `Runs`，打开记录逐步回放；选择 `⋯ → Export trace` 可导出数据供其他智能体分析。

## esp32-iphone-agent 报错怎么排查？

如果免费线路卡住或每一步都失败，检查是否出现 HTTP `503`。共享服务繁忙时可能暂时不可用，README 建议在 `Settings › Model` 改用自己的 API key。

开发板、热点或屏幕镜像连接丢失时，任务会暂停。先检查这些连接；应用设计为连接恢复后从同一步继续。使用音频和长任务更新时，也应核对固件是否符合 `v0.2.4` 要求。

若已另行配置 DSH 集成但插件未显示，可按通用顺序检查当前 profile 名、插件是否启用，再重启 DSH 并查看版本和日志。所给片段没有列出专用的 Harness 错误码或配置路径。
