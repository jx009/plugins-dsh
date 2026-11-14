---
title: "dsh-wallpaper-engine：DSH 动态壁纸插件"
description: "dsh-wallpaper-engine 是一个把 Wallpaper Engine 场景和视频壁纸放进 DeepSeek Harness 界面的 DSH 插件。了解安装方法、外观设置和渲染问题排查。"
summary: "在 DSH 界面背后播放 Wallpaper Engine 项目或你自己的图片、视频的外观插件。它不注册 Agent 工具，不增加模型 token 开销。"
highlights:
  - "场景、网页、视频三类壁纸"
  - "液态玻璃界面与自定义字体"
  - "吉祥物、头像与指针特效"
  - "不增加模型 token 开销"
  - "外观预设导入导出"
faq:
  - q: "dsh-wallpaper-engine 怎么安装到 DeepSeek Harness？"
    a: "先完全关闭 DSH，再运行 `dsh plugin --profile web add dsh-plugin-wallpaper-engine`，桌面端把 `web` 换成 `desktop`。README 要求 Node.js 22.12.0 以上、DSH 0.2 内核，并装有 pnpm。"
  - q: "用 dsh-wallpaper-engine 必须开着 Wallpaper Engine 吗？"
    a: "不用。场景壁纸由插件内置的 WebWallGL 引擎渲染，不需要 Wallpaper Engine 进程。macOS 上没有 Wallpaper Engine 客户端，可以上传文件或指定项目目录。"
  - q: "dsh-wallpaper-engine 会消耗模型 token 吗？"
    a: "不会。它不向 Agent 注册工具，也不往提示词里加内容，所以不增加任何 token 开销。设置保存在宿主端。"
  - q: "dsh-wallpaper-engine 不支持哪些壁纸？"
    a: "不支持应用程序类壁纸。这类壁纸需要启动第三方可执行文件，所以既不会出现在壁纸库里，也不会进入轮播列表。"
  - q: "dsh-wallpaper-engine 的液态玻璃效果能关掉吗？"
    a: "能。液态玻璃是独立的子包 `wallpaper-engine-glass`，在插件管理器里单独停用后，界面恢复原生外观，壁纸、字体和吉祥物照常可用。"
  - q: "dsh-wallpaper-engine 支持哪些系统？"
    a: "Windows、macOS 和 Linux 都支持，同一个包、同一条命令。"
---

## dsh-wallpaper-engine 是做什么的？

dsh-wallpaper-engine 是一个给 DeepSeek Harness 对话界面加动态壁纸的 DSH 插件。它读取你电脑上的 Wallpaper Engine 项目，在 DSH 里渲染出来，再叠加一层外观设置：液态玻璃面板、自定义字体、吉祥物，以及可以分享的外观预设。

这个插件只改 DSH 的样子。它不给 Agent 增加工具，也不往提示词里塞内容，对话消耗的 token 和装之前完全一样。设置保存在宿主端，改完立即生效。

它适合长时间开着 DSH、希望工作界面和桌面风格统一的人。一个 npm 包同时支持 Windows、macOS 和 Linux。

## dsh-wallpaper-engine 核心功能

- **场景壁纸**：由内置的 WebWallGL 引擎实时渲染，支持粒子、puppet 骨骼、SceneScript、音频反应和鼠标交互。渲染失败时自动降级为内嵌视频或静态帧。
- **网页和视频壁纸**：网页壁纸在沙箱里运行，并注入 Wallpaper Engine 接口；视频壁纸支持转码、帧率上限，界面被遮挡时自动暂停省电。
- **自己的文件**：上传 JPG、PNG、MP4，或者指定一个 Wallpaper Engine 项目目录，文件只留在本机。
- **液态玻璃**：设置窗、对话区和侧栏都可以套上玻璃效果，配色、透明度、模糊、边框和字体都能调。
- **扩展效果**：吉祥物、会话头像、点击和指针拖尾特效、3D 视差。
- **壁纸库管理**：筛选、隐藏和恢复、自动轮播，整套外观可以导出成预设再导入。

## 怎么安装和使用 dsh-wallpaper-engine？

1. 确认环境：Node.js 22.12.0 以上、DSH 0.2 内核，并装有 pnpm。
2. 完全关闭 DSH。
3. 安装插件，桌面端把 `web` 换成 `desktop`：

   ```bash
   dsh plugin --profile web add dsh-plugin-wallpaper-engine
   ```

4. 打开 DSH，进入「设置 → Wallpaper Engine → 壁纸库」。拉一下对话区上方吉祥物的绳子，也能打开同一个面板。
5. 选一张缩略图，再调整播放和外观，改动立即生效。
6. 用暂停和播放控制当前壁纸。清除当前壁纸不会删除源文件。

## dsh-wallpaper-engine 报错怎么排查？

- **装完插件没出现**：要在 DSH 完全关闭时安装，确认用的是你实际在用的 profile（`web` 或 `desktop`），再重新打开 DSH。同时检查 Node.js 是否在 22.12.0 以上、DSH 是否为 0.2 内核。
- **场景壁纸显示不对或只有静态图**：场景渲染依赖浏览器的 WebGL 和显卡驱动，复杂的创意工坊项目可能和原版有差异。WebGL 失败时插件会降级为视频或静态帧，更新显卡驱动或换一个简单些的场景通常能解决。
- **壁纸库里少了某张壁纸**：应用程序类壁纸需要运行第三方可执行文件，所以不会列出来。
- **视频壁纸占用太高**：调低帧率上限让视频转码，并保持“被遮挡时暂停”开启。
- **想恢复 DSH 默认外观**：在插件管理器里停用 `wallpaper-engine-glass` 子包，或者清除当前壁纸。

另外，插件代码采用 MIT 协议，但壁纸、角色和字体素材可能有各自的授权。
