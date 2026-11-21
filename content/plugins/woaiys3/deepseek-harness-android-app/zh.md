---
title: "deepseek-harness-android-app：DSH 安卓手机版"
description: "deepseek-harness-android-app 是内置手机操作插件的 DSH 安卓版，支持免 Root 读屏。本文介绍 APK 安装、Shizuku 和无障碍权限配置，以及引擎启动报错排查。"
summary: "在安卓手机上运行 DeepSeek Harness，让 AI 读网页、编辑文件或操作屏幕。按任务开启权限，也可以用虚拟屏运行应用，不占用主屏。"
highlights:
  - "Android APK 直接安装"
  - "免 Root 无障碍读屏"
  - "Shizuku 系统操作"
  - "虚拟屏悬浮预览"
  - "AI 浏览器多页签"
faq:
  - q: "deepseek-harness-android-app 怎么安装，要用 DSH 命令吗？"
    a: "不用，在仓库的 Releases 页面下载 Android APK 后直接安装即可。这个仓库发布的是内置插件的安卓应用，不是通过 DSH 命令添加的 npm 包。"
  - q: "deepseek-harness-android-app 不装 Shizuku 能编辑文件吗？"
    a: "可以，文件读取、预览和编辑只需要开启「所有文件访问」，不需要 Shizuku 或 Root。如果还想让 AI 点击应用界面，再单独开启无障碍屏幕助手。"
  - q: "deepseek-harness-android-app 虚拟屏为什么用不了？"
    a: "虚拟屏与无障碍读屏的权限要求不同，只开屏幕助手不能建屏。请确认 Shizuku 已授权或设备具备 Root，再打开一次应用，让虚拟屏桥启动。"
  - q: "deepseek-harness-android-app 的 AI 浏览器怎么关闭？"
    a: "在原生控制台的「插件」页关闭 AI 浏览器即可。「AI 浏览器」页的「同屏查看」只控制画面是否显示在屏幕上，不是插件开关。"
  - q: "deepseek-harness-android-app 升级后会话显示 0 条怎么办？"
    a: "先查看应用版本，不要因为列表为空就清除数据。v1.20.1 修复了内核 0.2.1 的 `session.v4.jsonl.zstd` 会话列表识别问题，旧版遇到这一情况可先升级确认。"
---

## deepseek-harness-android-app 是做什么的？

deepseek-harness-android-app 是一个通过安卓应用交付、让 AI 读取和操作手机界面的 DSH 插件套件。它把内核、原生控制台和五个手机端工具打包进同一个 Android APK，无需先装 Termux。它保留了 DeepSeek Harness 插件生态；如果你只想在手机上处理文件或浏览网页，不必先开通系统级权限。

## deepseek-harness-android-app 核心功能

- **无障碍屏幕助手**：读取当前界面的文字和控件，让 AI 按文字点击、输入或滚动，不依赖 Root 或 Shizuku。无障碍截图需要 Android 11 及以上版本，并搭配支持图片输入的模型。
- **Shizuku 系统操作**：可用于安装应用、调整系统设置和模拟系统输入。应用优先使用设备已有的 Root 通道，没有 Root 时才使用已授权的 Shizuku。
- **虚拟屏**：把指定应用启动到独立屏幕，AI 在其中点击、滑动或输入，不占用手机主屏。可拖动和缩放的悬浮窗用于查看实时画面。
- **AI 浏览器**：通过网页结构定位元素，支持点击、填表、读取正文和切换页签。浏览器在独立进程运行，页面崩溃不会连带关闭控制台和引擎。
- **后台任务通知**：前台保活用于在切到后台或锁屏时维持任务运行；授予通知权限后，任务完成或需要关注时可在通知栏收到提醒。

## 怎么安装和使用 deepseek-harness-android-app？

本项目通过 APK 安装，没有可用的 DSH 安装命令。

1. 到仓库的 Releases 页面下载 Android APK 并安装。打开应用后，先在原生控制台查看解压和引擎状态，再进入主界面。
2. 按用途授权。只做文件预览和编辑时，在权限引导中开启「所有文件访问」；需要读屏或点击时，进入安卓系统设置的「无障碍」，在服务列表中启用「DeepSeek Harness 屏幕助手」。
3. 回到应用，让 AI 先用 `android_screen` 读取当前控件，再用 `android_tap` 按可见文字点击。想在独立屏幕运行应用时，先授权 Shizuku 或确认设备已有 Root，再打开一次应用启动虚拟屏桥，随后让 AI 创建虚拟屏。
4. 想让 AI 操作网页时，先在控制台「插件」页确认浏览器已启用，再提供网页地址和要找的内容。需要跟看操作时，在「AI 浏览器」页开启「同屏查看」。

## deepseek-harness-android-app 报错怎么排查？

- **升级后引擎无法启动**：如果日志提示 `cosmokit` 缺少某个导出项，先在控制台点「重新解压」，不用清除应用数据。也可通过「内核自检」确认有哪些随包文件缺失或内容不符。
- **插件改坏配置后引擎拒绝启动**：如果日志指向无效的 YAML，尝试控制台的「安全模式启动」。它会暂时旁置用户配置，改用出厂配置启动，不会删除会话或凭证。
- **屏幕助手读不到控件**：先确认系统无障碍设置中的服务仍然开启，再让 AI 调用 `android_a11y_status`，检查服务状态、前台应用和可读控件数。若只是滚动没有变化，先看是否已到页面边缘，不要直接判定手势失效。
