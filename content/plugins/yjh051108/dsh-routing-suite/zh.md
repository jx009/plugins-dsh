---
title: "dsh-routing-suite：DSH 思维模式路由套装"
description: "dsh-routing-suite 是一套按任务自动选择推理模式、附带热重载注入器和分级任务协议的 DSH 插件。了解安装方法、预设选择和常见问题。"
summary: "一个仓库装齐运行时注入器、Router Standard 和 Router Spec 两个路由预设，以及带打卡和红队门的分级任务协议。"
highlights:
  - "按任务选择推理模式"
  - "Pro 和 Flash 分别适配人设"
  - "免重启的运行时注入器"
  - "长任务分级协议"
  - "会话指标测量脚本"
faq:
  - q: "dsh-routing-suite 怎么安装到 DeepSeek Harness？"
    a: "运行 `dsh plugin --profile web add github:yjh051108/dsh-routing-suite`，重启 DSH，在新会话里选择 Router Standard 或 Router Spec。Windows 上也可以克隆仓库后运行 `install.ps1`。"
  - q: "dsh-routing-suite 的 Router Standard 和 Router Spec 有什么区别？"
    a: "Router Standard 给每个任务分类，套用对应的人设和完整的提示词段落。Router Spec 偏向先深度思考再动手，目前标注为实验性。"
  - q: "dsh-routing-suite 的预设在 DSH 里看不到怎么办？"
    a: "DSH 只扫描 `~/.dsh/.agent-presets` 下的一级目录。要把 `preset/router-standard` 和 `preset/router-spec` 分别复制进去，复制整个 `preset` 目录会多套一层，DSH 就找不到了。"
  - q: "dsh-routing-suite 会让 API 调用翻倍吗？"
    a: "v0.3.0 起不会。引导内容通过 `agent/pre-step` 和你的消息放在同一个请求里；之前的版本每轮要多调用一次，费用翻倍。"
  - q: "dsh-routing-suite 支持哪些 DSH 版本？"
    a: "README 写的是 `>=0.1.0-rc.6`，并提醒 DSH 处于开发者预览阶段，会有破坏性变更。兼容性更新记录在 `preset/CHANGELOG.md`。"
  - q: "dsh-routing-suite 的分级协议是做什么的？"
    a: "把长任务拆成几个阶段：先用选择题式的头脑风暴确定目标，再写规格化计划，然后按打卡推进、分组收尾，最后终验，并配有红队门和审计端点。"
---

## dsh-routing-suite 是做什么的？

dsh-routing-suite 是一套让 DeepSeek Harness 根据手头任务决定“想多深”的 DSH 插件。每条用户消息都会被归入一个行为档位，比如先规划的 spec 型、直接执行的 react 型，路由器随之替换提示词里的人设段落，Pro 和 Flash 模型还用不同的写法。

一个仓库里有三个部分：运行时注入器提供一组 `dev_*` 工具，不用重启 DSH 就能注入、热重载和卸载插件代码；路由预设在它之上给任务分流；分级协议把长时间运行的工作拆成有计划、有检查的阶段。

作者用编号 P1 到 P23 的一系列实测记录了路由器的表现，还附了一个脚本，可以用你自己的会话重新算出这些指标。

## dsh-routing-suite 核心功能

- **Router Standard 预设**：给每个任务分类并套用对应的人设，Pro 和 Flash 模型分别适配。
- **Router Spec 预设**：先深度思考再动手，目前是实验性的。
- **首轮即路由**：v0.3.0 起在装配前就捕获第一条真实消息，开场第一个请求也能正确分类。
- **近距离引导**：简短的提示和每条消息放在同一个请求里，不会每轮多一次 API 调用。
- **保留计划模式**：只替换人设段落，计划模式的边界不受影响。
- **运行时注入器**：注入、热重载、卸载、转正旁加载的插件、修复路由等工具。
- **分级协议与测量**：六个工具、三种模式和红队门，另有 `graded/scripts/measure.mjs` 用你的会话文件重算公开的指标。

## 怎么安装和使用 dsh-routing-suite？

1. 安装整个套装：

   ```bash
   dsh plugin --profile web add github:yjh051108/dsh-routing-suite
   ```

2. 重启 DSH。
3. 开一个新会话，选择 **Router Standard**；想要先规划再执行，就选 **Router Spec (experimental)**。
4. 照常使用，路由器会给每条消息分类并自动调整推理模式。

Windows 上手动安装：克隆仓库后运行 `install.ps1`，它会装配注入器、复制预设并检查目录结构。完全手动的话，先用 `dsh plugin --profile web add` 添加 `.\injector`，再把 `preset\router-standard` 和 `preset\router-spec` 分别复制到 `%USERPROFILE%\.dsh\.agent-presets\`。

## dsh-routing-suite 报错怎么排查？

- **看不到路由预设**：DSH 只扫描 `.agent-presets` 下的一级目录。每个预设目录要单独复制，不要复制上一层的 `preset` 目录。
- **`dsh` 不在 PATH 里**：改用 `npx '@deepseek-ai/dsh' plugin --profile web add .\injector` 安装。
- **第一轮总是走弱模式**：v0.3.0 已经修复，从 GitHub 更新到最新版本。
- **API 费用翻倍**：v0.3.0 之前每轮会为引导多调用一次，升级后引导会和你的消息一起发送。
- **DSH 升级后出问题**：DSH 是开发者预览版，会有破坏性变更。先看 `preset/CHANGELOG.md` 里的兼容说明再反馈。

提交问题时，请附上套装版本、DSH 版本、选择的预设，必要时附上测量脚本的输出。
