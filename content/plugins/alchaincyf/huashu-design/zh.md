---
title: "huashu-design DSH 插件：一句话出设计稿"
description: "huashu-design 是一个用一句话生成 HTML 原型、可编辑 PPTX、动画和信息图的 DSH 插件。了解安装方法、导出格式和常见问题排查。"
summary: "适用于 Claude Code、Cursor、Codex 和 DSH 的设计技能：先出六个方向的缩略图，把其中三个做成成品，交付 HTML、MP4、GIF、可编辑 PPTX 或 PDF。"
highlights:
  - "可点击的 App 和网页原型"
  - "HTML 幻灯片转可编辑 PPTX"
  - "导出 MP4 和 GIF 动画"
  - "设计方向顾问"
  - "六维度设计评审"
faq:
  - q: "huashu-design 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile desktop add github:alchaincyf/huashu-design`，网页版把 `desktop` 换成 `web`。桌面端也可以在「插件 → 添加插件」里直接填 GitHub 仓库地址。"
  - q: "huashu-design 装完在 DSH 里看不到怎么办？"
    a: "README 说明，用命令行安装前，桌面端要先打开过一次并完全退出。关掉 DSH 再安装，装完重新打开，插件才会加载。"
  - q: "huashu-design 能导出可编辑的 PPT 吗？"
    a: "能。幻灯片会同时给出 HTML 演示版和保留真实文本框的 PPTX。DSH 桌面端用自带的 Python 生成 PPTX，导出 PDF 时借用你电脑上已装的 Chrome 或 Edge。"
  - q: "huashu-design 会上传设计稿吗，需要 API Key 吗？"
    a: "不会，也不需要。设计、渲染和 MP4、PDF、PPTX 导出全部在本地完成，没有遥测。配音等云端能力放在 `scripts/cloud/`，完全可选，要用你自己的 Key 并显式确认。"
  - q: "huashu-design 学到的审美偏好存在哪里？"
    a: "经验记录和外观账本只写在本机的 `~/.huashu-design/` 目录里，不会上传，删掉这个目录就全部清空。"
  - q: "huashu-design 有哪些做不到的？"
    a: "不支持把 PPTX 按图层往返到 Figma，3D、物理模拟和粒子动画也不在范围内。README 还提到，从零设计一个品牌时质量会明显下降。"
---

## huashu-design 是做什么的？

huashu-design 是一个让编程 Agent 承担设计工作的 DSH 插件。你用一句话说明要什么，Agent 先用 HTML 把成品做出来，再按需要导出成别的格式：可点击的原型、幻灯片、动画、信息图，或者小红书图文。

整个过程没有画布、面板或 Figma 插件要操作。你和 Agent 对话，看它给出的结果，再提修改意见。README 给出的参考耗时是 3 到 30 分钟，视成品类型而定。需求比较模糊时，它会先做出几个不同的视觉方向让你挑，而不是直接交出第一版。

这个技能可以装进 Claude Code、Codex、Cursor 等支持 skills 的 Agent，同一个仓库也能直接作为 DeepSeek Harness 插件安装。

## huashu-design 核心功能

- **交互原型**：单文件 HTML，套 iPhone 外框，每个页面都能真的点进去，交付前用 Playwright 检查一遍。
- **幻灯片转可编辑 PPTX**：一份在浏览器里演示的 HTML 版，加一份保留真实文本框、可以直接改字的 PowerPoint 文件。
- **动画**：导出 MP4 和 GIF，支持 60fps 插帧，可以加背景音乐。
- **设计方向顾问**：需求开放时，按三种思路各出两个候选，共六张缩略图，把其中三个做成完整设计，其余留作备选。
- **风格库**：HTML 原生风格覆盖网页、幻灯片、信息图、App、中式与东亚、小红书几类，每种都附样张。
- **品牌资产流程**：涉及具体品牌时，按询问、搜索、下载、核对的顺序收集 Logo、产品图和色值，最后写入 `brand-spec.md`。
- **六维度评审**：让它评一份现成的设计，它会从六个维度打分，并给出具体的修改建议。

## 怎么安装和使用 huashu-design？

1. 先打开一次 DSH 桌面端，然后完全退出。
2. 在终端里添加插件，网页版把 `desktop` 换成 `web`：

   ```bash
   dsh plugin --profile desktop add github:alchaincyf/huashu-design
   ```

   也可以在桌面端的「插件 → 添加插件」里直接填仓库地址。

3. 重新打开 DSH，插件随之加载。
4. 用自然语言提需求，例如：

   ```text
   做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选
   ```

5. 在同一个对话里继续改：“封面再暗一点”“导出 MP4 和 GIF”“对这个设计做一个 6 维度评审”。

不用 DSH 的话，用 `npx skills add alchaincyf/huashu-design` 当作普通技能安装。要卸载 DSH 插件，运行 `dsh plugin --profile desktop remove huashu-design`。

## huashu-design 报错怎么排查？

- **命令行装完插件没加载**：DSH 桌面端必须先打开过一次、并且完全退出，再执行 `dsh plugin add`。关掉 DSH，重新安装后再打开。
- **在其他 Agent 里效果差、找不到模板**：这个技能依赖 `references/`、`assets/`、`scripts/`、`demos/` 四个子目录。如果安装目录里只有 `SKILL.md`，说明 `skills` 命令行版本低于 1.5.19，运行 `npm i -g skills@latest` 后重装，还不行就用 `git clone` 直接克隆到技能目录。
- **导出 PDF 失败**：导出脚本借用的是你电脑上已安装的 Chrome 或 Edge，装好其中一个再试。
- **某个功能要求填 Key**：配音和 AI 看片评审是可选的云端能力，放在 `scripts/cloud/` 里，只有填了你自己的 Key 并加 `--yes` 确认才会运行，核心设计流程不需要任何 Key。
- **想清空它学到的偏好**：审美经验和外观账本只存在 `~/.huashu-design/`，删掉这个目录即可重新开始。

反馈问题时，请附上 DSH 版本、profile 名称和导出失败的具体格式。
