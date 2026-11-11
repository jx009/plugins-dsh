---
title: "dsh-wallpaper-engine：动态壁纸与外观"
description: "把本地 Wallpaper Engine 的 Scene、Web、Video 壁纸放进 DSH 界面的外观插件，附带液态玻璃、自定义字体和看板娘。"
summary: "一个外观插件：在 DSH 界面背后播放 Wallpaper Engine 项目或你自己的图片、视频。它不注册任何 Agent 工具，不产生模型 token 开销。"
highlights:
  - "三类动态壁纸"
  - "液态玻璃界面"
  - "看板娘与光标特效"
  - "不耗 token"
  - "预设导入导出"
faq:
  - q: "需要同时开着 Wallpaper Engine 吗？"
    a: "Scene 壁纸不需要，它由插件内置的 WebWallGL 渲染器直接渲染，README 说明不依赖 Wallpaper Engine 进程。macOS 上没有 Wallpaper Engine 客户端，可以上传文件，或者把存储位置指向壁纸项目目录。"
  - q: "这个插件会消耗模型 token 吗？"
    a: "不会。README 说明它不注册任何 Agent 工具，也不往提示词里加内容，所以没有额外的模型 token 开销。"
  - q: "哪些壁纸类型不支持？"
    a: "Application 类型的壁纸不支持。这类壁纸需要启动第三方可执行文件，所以不会出现在壁纸库和轮播候选里。"
---

## dsh-wallpaper-engine 是做什么的？

dsh-wallpaper-engine 给 DeepSeek Harness 的界面加上动态壁纸。它读取你电脑里的 Wallpaper Engine 项目，在 DSH 内部渲染出来，同时提供液态玻璃面板、自定义字体、看板娘等外观选项。

这个插件只改变 DSH 的样子，不给 Agent 增加工具，也不往提示词里写内容。设置保存在宿主一侧，改完立即生效。它适合长时间开着 DSH 干活、希望工作界面和桌面风格保持一致的人。

## 核心功能

- **壁纸类型**：Scene 壁纸由内置的 WebWallGL 实时渲染，渲染失败时按降级链回退；Web 壁纸提供 Wallpaper Engine API 兼容层和沙箱；Video 壁纸支持转码、帧率上限和暂停控制。
- **本地上传**：可以用自己的 JPG、PNG、MP4 文件，也可以读取 Wallpaper Engine 预设项目里的图片文件夹，文件都留在本机。
- **液态玻璃**：设置页、对话区和侧边栏都可以套上玻璃效果，颜色、透明度、模糊、边框和字体可调。它是独立的子包 `wallpaper-engine-glass`，可以单独停用。
- **扩展效果**：看板娘、对话头像、点击和光标拖尾特效、3D 视差。
- **壁纸库管理**：筛选、隐藏与恢复、轮播列表，以及把整套配置作为预设导入或导出。

## 怎么使用 dsh-wallpaper-engine

1. 先确认 README 列出的环境要求：Node.js 22.12.0 及以上、DSH 0.2 内核、pnpm。
2. 安装之前把 DSH 完全关闭。
3. 用本页显示的安装命令添加插件；如果用的是桌面端宿主，把命令里的 `web` 换成 `desktop`。
4. 启动 DSH，依次打开设置、Wallpaper Engine、壁纸库。拉一下对话区上方看板娘的拉绳，也能打开同一个面板。
5. 在壁纸库里点选缩略图，再调整播放和外观设置，改动立即生效。
6. 暂停和播放只影响当前的播放状态；清除当前壁纸不会删除源文件。

Scene 的渲染效果取决于浏览器的 WebGL 和显卡驱动，结构复杂的创意工坊项目可能和原版有出入。插件代码采用 MIT 许可，壁纸、角色和字体素材可能适用其他许可。
