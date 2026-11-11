---
draft: true
title: "dsh-purge：DSH 的“破甲”补丁与提示词管理"
description: "dsh-purge 社区维护版给 DSH 宿主打补丁并注入提示词，减少 agent 的反复确认，并提供状态自检、提示词管理和本机备份回滚，适合在自己机器上做实验的用户。"
summary: "自托管的 DSH 附加组件，社区里常叫“破甲”或“无限制模式”插件：给宿主打补丁、管理注入的提示词，并带状态诊断、本机备份和回滚。"
highlights:
  - "宿主补丁"
  - "提示词与预设管理"
  - "分层状态自检"
  - "备份与回滚"
  - "侧栏整页设置"
faq:
  - q: "dsh-purge 说的“无限制模式”是什么意思？"
    a: "这是社区对这个插件的叫法，也有人叫“破甲”。按 README 的说明，它通过宿主补丁和提示词注入，让 agent 连续执行任务，而不是每一步都停下来确认；它不改动模型本身。"
  - q: "dsh-purge 会改动 DSH 的安装文件吗？"
    a: "会。应用时要给宿主文件打补丁，社区安装器在某些情况下还会修复桌面版的目录布局。应用、安装、回滚之前都会自动做快照；应用补丁和重启 DSH 是两个独立动作，都由你自己触发。"
  - q: "能让某些预设不被注入提示词吗？"
    a: "可以。1.6.40 起新增 `excludePresets` 配置，可以把 `roleplay`、`minimal` 等预设排除在注入之外，命令、面板和工具照常保留。它不会撤销全局的宿主补丁。"
---

## dsh-purge 是做什么的？

dsh-purge 是 DeepSeek Harness 的自托管附加组件：它给宿主程序打补丁并注入提示词，让 agent 执行任务时少一些确认和打断。社区里一般叫它“破甲”或“无限制模式”插件。这个仓库是社区维护版，原版 dsh-purge 的作者署名为小杨 / YuJunZhiXue。

除了这个核心功能，项目的不少工作花在让改动看得见、退得回上。分层自检会报告安装、补丁、注入是否就绪；宿主更新导致补丁锚点漂移时，诊断命令能定位问题；提示词、规则和预设集中管理；DSH 左侧栏里有一整页面板显示当前状态。

README 写明全部逻辑在本机运行，插件不改模型本身，并要求在自己拥有或已获授权的环境里使用。它由社区维护，不是 DeepSeek 官方项目，而且确实会修改宿主文件，应用之前请先读完安装说明。

## 核心功能

- **宿主补丁**：一组针对 DSH 宿主的补丁（README 标注为 86 条），需要手动点“应用”才会生效。
- **自检与诊断**：`purge-community selfcheck` 逐层给出状态；锚点漂移时，`diagnose` 会列出文件、行号和候选位置。
- **提示词管理**：集中编辑提示词、规则和“无限制模式”预设，`excludePresets` 可以让指定预设不参与注入。
- **备份与回滚**：改动前自动快照，另有 `backup`、`rollback` 命令，面板里可以查看本机备份。
- **更新控制**：自动检查和自动安装分开设置，默认只检查；它不会替你重启 DSH。

## 怎么使用 dsh-purge

1. 首次安装可以走 DSH 界面：启用自定义插件市场，把下面的社区索引添加为索引源，然后选择 dsh-purge Community，并核对来源是 `kingcharleslzy-ai/dsh-purge`：

```
https://kingcharleslzy-ai.github.io/dsh-purge/index.json
```

2. CLI 和 Web 用户也可以直接安装发行包。README 用的是固定版本的地址，并提醒不要换成裸包名：

```sh
dsh plugin --profile web add "https://github.com/kingcharleslzy-ai/dsh-purge/releases/download/v1.6.93/dsh-purge-community-1.6.93.tgz"
```

3. 已经装过旧版 dsh-purge 的，用 README 里的社区安装器脚本，它会先备份再原地迁移。
4. 打开左侧栏的 Purge 页面，看一眼顶部的状态说明，再点“应用”。什么时候重启 DSH 由你自己决定。
5. 检查结果：

```sh
purge-community selfcheck --json
```
