---
title: "Academic Paper Search：DSH 文献检索与引用核验"
description: "nature-academic-search 是支持多库检索与引用核验的 DeepSeek Harness 插件工具集。本页介绍配套 Bundle 的安装方法、PubMed 邮箱配置和常见报错排查。"
summary: "用中文提出研究问题，从多个学术数据库汇总并去重候选论文。引用前可用 DOI 或 PMID 核对书目信息，并保留检索和核验记录供复查。"
highlights:
  - "五库文献检索与去重"
  - "PubMed MeSH 核词"
  - "引用元数据逐项核验"
  - "上下游引文追踪"
  - "引用文件与审计导出"
faq:
  - q: "nature-academic-search 怎么安装到 DeepSeek Harness？"
    a: "在 DSH 中使用独立的 `dsh-academic-paper-search` Bundle，由它桥接 Python MCP 服务。请到 `wp-a/dsh-academic-paper-search` 仓库查看发布状态和安装步骤，不要把 Python 包名当成 npm 包名。"
  - q: "nature-academic-search 用 PubMed 查论文一定要配置模型中转吗？"
    a: "不用，学术检索、元数据核验和引用下载不依赖模型中转。PubMed 请求使用的是联系邮箱 `PUBMED_EMAIL`，它与模型入口是两项不同的配置。"
  - q: "nature-academic-search 查到 DOI 就算引用核验通过吗？"
    a: "不算，能解析的 DOI 也可能对应另一篇论文。调用 `get_paper_by_id` 时，可用 `expected` 传入手头引用的题名、作者、年份或期刊，再查看具体哪些字段不一致。"
  - q: "nature-academic-search 查不到 PubMed 的 MeSH 主题词怎么办？"
    a: "先用 `lookup_mesh` 核对英文概念的规范主题词及其标识符，不要直接把译名当成已确认的主题词。制定检索式时，可以把确认过的主题词和题名、摘要中的自由词搭配使用。"
  - q: "nature-academic-search 连通性检查通过但 DSH 看不到工具怎么办？"
    a: "`preflight` 检查的是学术 API 能否连通，不检查当前会话是否加载了 MCP。确认 Bundle 在当前 profile 已启用，重启 DSH 并开启新会话，再查看是否出现 `mcp__academic_search__*` 工具。"
  - q: "nature-academic-search 怎么查一篇论文被谁引用？"
    a: "用论文标识符调用 `get_paper_by_id`，开启 `include_relations`，并选择 `relation=cited_by`。返回的是结构化图谱数据；如果需要图形展示，要另用客户端或可视化工具绘制。"
---

## nature-academic-search 是做什么的？

nature-academic-search 是一个用于多库文献检索、去重和引用核验的 DSH 插件，实际通过独立的 `dsh-academic-paper-search` Bundle 接入。你可以用中文描述开题或综述的问题，让客户端把它拆成英文检索词，再调用学术数据库查找候选论文。项目名称里的 `nature` 不限制检索范围，也不表示与 Nature Portfolio 有官方关联。

候选论文和核验通过的引用是两类结果：前者供继续阅读和筛选，后者需要重新查询原始标识符并逐项比对。保留检索式、查询日期和失败来源，之后才能看出哪些数据库实际参与了查询。上游记录会更新，重跑同一检索式不一定得到同一批论文。

## nature-academic-search 核心功能

- **多库检索与去重**：`search_papers` 默认查询 CrossRef、PubMed、arXiv、OpenAlex 和 Europe PMC，也可以只查指定来源。`rows` 是单个来源的返回上限，不是去重后的总条数。
- **PubMed MeSH 核词**：用 `lookup_mesh` 确认英文概念对应的规范主题词，再和题名、摘要自由词组合。PubMed 专用语法只用于该数据库，跨库搜索时不要直接套用。
- **引用核验与导出**：用 DOI、PMID 等标识符重新查询，逐项比较题名、作者和年份。单条引用可通过 `get_citation` 格式化；需要整理一批记录时，可按项目工作流导出供 Zotero 或 EndNote 导入的引用文件，并保留核验记录。
- **引文图谱**：以一篇已知论文为起点，分开查看它引用了哪些论文、哪些论文引用了它。返回结果包含节点、边和关系来源；某个方向缺数据时，不应据此认定没有引用。
- **临床试验检索**：切换到试验类型后，从 ClinicalTrials.gov 查询注册信息，按 NCT 编号查看招募状态、干预和申办方。若出现关联论文，应另行核对其 PMID 或 DOI，不能把注册信息当成疗效结果。

## 怎么安装和使用 nature-academic-search？

当前 README 没有提供可直接复制的 DSH 安装命令。请以 `wp-a/dsh-academic-paper-search` 仓库的发布状态、安装要求和配置文档为准；主仓库里的 Codex、Claude Code 和 Python 包命令不能替代这个接入步骤。

1. 按 Bundle 文档安装，并确认它在你实际使用的 DSH profile 中启用。如果要查 PubMed，按接入文档配置自己的 `PUBMED_EMAIL`，确保启动服务的进程能读取它。桌面客户端不一定继承终端里设置的环境变量。
2. 开启新会话，查看是否出现 `mcp__academic_search__*` 工具。第一次可以这样问：请检索生成式 AI 在医学教育中的应用，把中文问题拆成英文关键词，用默认来源各取五条，去重后列出候选论文、来源和标识符。
3. 从候选里挑几条，要求用原始标识符重新查询并比对题名、作者和年份，把一致、冲突和待人工确认的记录分开。检查客户端是否真的调用了工具：只有模型给出的论文清单，还不能当成完成了检索和核验。

## nature-academic-search 报错怎么排查？

- **看不到工具**：先核对当前 profile 和 Bundle 的启用状态，再重启 DSH、开启新会话。如果仍未加载，对照 Bundle 文档检查版本与启动日志。
- **部分来源查询失败**：查看结果中的来源状态，确认是单个数据库失败还是工具没有运行。可用项目 CLI 的 `preflight` 检查学术 API 连通性，但检查通过不代表客户端已经加载 MCP，也不保证下一次查询成功。
- **引用字段不一致**：如果核验结果是 `mismatch`，对照来源元数据，检查手头的 DOI 是否确实属于该条引用。在冲突解决前，把它留在待核验清单里，不要当作已确认的引用导出。
