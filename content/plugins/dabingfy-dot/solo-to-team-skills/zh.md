---
title: "solo-to-team-skills：DSH 派活与验收"
description: "solo-to-team-skills 是一个帮助个人统筹 AI 派活、交接与证据验收的 DSH 插件。了解技能目录安装方法、按名调用步骤和模板缺失等常见问题排查。"
summary: "用四支协作技能管理多个 AI 助手：派活先登记，交付后核证，验收由人拍板。附新手操作说明方法、登记行模板和脱敏案例。"
highlights:
  - "派活交接与验收登记"
  - "交付前核对当前版本证据"
  - "新手操作说明逐步编写"
  - "脱敏运营案例复用"
  - "多宿主共用技能正文"
faq:
  - q: "solo-to-team-skills 怎么安装到 DSH？"
    a: "把各技能的完整目录拷入项目 `.dsh/skills/`、用户 `~/.dsh/skills/` 或 `.agents/skills/`，再打开或刷新宿主。README 明确说明，技能正文不通过 `dsh plugin add` 安装。"
  - q: "solo-to-team-skills 应该先启用哪几个技能？"
    a: "建议先一起安装 `dispatch-accept-verify` 和 `evidence-before-done`，前者的验收环节依赖后者核证。证据技能可以独立使用，操作说明和案例技能按需添加。"
  - q: "solo-to-team-skills 能自动定时催办和叫醒助手吗？"
    a: "不能，包内声明 `hooks: {}`，不自带定时或叫醒机制。到点检查需要宿主提供相应能力，或由人按时执行。"
  - q: "solo-to-team-skills 登记行模板丢失怎么办？"
    a: "检查是否只复制了 `SKILL.md`，遗漏了配套目录。重新完整拷贝 `dispatch-accept-verify` 文件夹，并保留其中的 `templates/`。"
  - q: "solo-to-team-skills 提供 DeepSeek API 密钥吗？"
    a: "不提供密钥，需要自行准备 DeepSeek 账号或 API。使用前还要先装好宿主，确保它能够正常使用。"
---

## solo-to-team-skills 是做什么的？

solo-to-team-skills 是一个帮助个人统筹 AI 派活、交接与证据验收的 DSH 插件。它面向同时管理多个助手的人，把任务从提出目标推进到分工、交接、核对和人工判断，避免把“收到成果”直接当成“已经完成”。

这个 DeepSeek Harness 插件实际以技能目录加载，包含四支技能、登记行模板、说明和脱敏案例。文档仍为 `v0.9-draft`；README 记录了宿主使用验证和有限任务验收，但不代表所有任务都能完成，也不证明每支技能均被单独调用。

## solo-to-team-skills 核心功能

- **派活与交接登记**：`dispatch-accept-verify` 要求派活前登记谁来做、谁来收、谁到点检查。接单、收到成果和验收分别记录，只有验收完成或授权取消才移出未完清单。
- **完成前核验证据**：`evidence-before-done` 要求证据对应当前版本。改过或失败过的部分需要补核，未变化的部分可复用此前核验。
- **新手操作说明**：`beginner-ops-writing` 帮助拆分操作步骤，明确操作对象及完成后可见的结果。必须本人执行的步骤要明确交给本人。
- **脱敏案例复用**：`ops-case-notes` 提供日更流水线调整、验收链抓漏两个案例，保留问题、改法、结果和未解决事项，供相似任务参考。

## 怎么安装和使用 solo-to-team-skills？

README 没有提供适用的 DSH 安装命令，并明确说明 `dsh plugin add` 不是安装技能正文的办法。本包采用目录拷入方式。

1. 先装好宿主，自备 DeepSeek 账号或 API；本包不提供密钥。下载或克隆仓库，取得 `skills/` 目录。
2. 建议先安装派收与核证两支技能。把各自完整文件夹放入项目 `.dsh/skills/`、用户 `~/.dsh/skills/` 或 `.agents/skills/` 中任一位置。
3. 检查目录层级，例如 `.dsh/skills/dispatch-accept-verify/SKILL.md`。必须连同配套文件一起复制，尤其不能遗漏派收技能的 `templates/`。
4. 打开或刷新宿主，然后按名调用。例如输入：`请使用 dispatch-accept-verify 登记一件小任务，写明负责人、接收人、截止时间和成果位置。`
5. 对照 `examples/walkthrough-meeting-notes/` 跟做，用 `templates/task-register-line.md` 学习登记。依次记录待收、已接单、到点检查、已收到成果，核证后再记已验收。

目录位置就是摘录中给出的加载配置入口，没有额外指定配置文件。派收技能的验收环节依赖证据技能，建议配套使用；后者也可单装。操作说明和案例技能可按需加入，最终放行或退回仍由人决定。

## solo-to-team-skills 报错怎么排查？

- 技能找不到：确认安装位置和文件夹层级，检查目录内是否有 `SKILL.md`。重新打开或刷新宿主，必要时重启，并查看版本和日志。
- 登记行模板缺失：检查是否只拷了正文，重新复制完整技能文件夹并保留配套模板。
- 收到成果却无法验收：确认已安装核证技能，针对当前交付检查证据，不要直接把收到成果记为完成。
- 到点没有提醒：本包的 `hooks: {}` 不提供定时和叫醒。检查宿主是否具备对应能力；没有时，应由登记行指定的人按时检查。
