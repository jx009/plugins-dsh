---
title: "SkillCorpus: Task-Based Skill Retrieval for DSH"
description: "SkillCorpus is a DSH plugin that retrieves task-specific agent skills. Learn how to find install steps, use SkillHub and check retrieval issues."
summary: "Bring relevant SKILL.md procedures into agent context from local skills and supported catalogs. Share retained skills across hosts, or build and self-host your own curated skill corpus."
highlights:
  - "Task-specific SKILL.md retrieval"
  - "Local and SkillHub multi-source search"
  - "Automatic retrieval or skill_search"
  - "Shared skills across agent hosts"
  - "Safety and license curation gates"
faq:
  - q: "How do I install SkillCorpus in DeepSeek Harness?"
    a: "The repository directs DSH users to skillcorpus_plugin/engine-typescript/README.md for its plugin guide. The supplied README excerpt contains neither a DSH installation command nor a confirmed npm package name, so it does not establish a copy-and-paste installation command."
  - q: "Does SkillCorpus search local skills as well as SkillHub?"
    a: "The project supports retrieval across local skills, EverMind SkillHub, ClawHub and skillhub.cn. It filters and deduplicates candidates before selecting zero to two skills."
  - q: "Can SkillCorpus retrieve skills only when the agent needs them?"
    a: "The README describes automatic retrieval on every query and on-demand retrieval through skill_search. Use the host plugin guide to check how to configure the delivery mode."
  - q: "Where does SkillCorpus keep shared skills?"
    a: "Version 0.4.0 introduces a shared library at ~/.evermind-skillsearch/ across the supported hosts. Catalog skills are retained, and library changes take effect on the next turn without a restart."
  - q: "Can I self-host SkillCorpus retrieval?"
    a: "The repository supports self-hosting released retrieval models and connecting your own agent host. It also lets developers customize source registries, curation rules, retrieval recipes and corpus exports."
---

## What does SkillCorpus do?

SkillCorpus is a DSH plugin that brings task-specific agent skills into the conversation through a retrieval layer. Its underlying open-source pipeline collects public `SKILL.md` files, applies safety and license checks, evaluates quality, and matches procedures to the task before the agent answers. It serves developers who want reusable instructions available at execution time without manually choosing a skill for each request.

The SkillCorpus DSH plugin is one integration of a broader corpus, retrieval and evaluation project. The repository identifies an official DeepSeek Harness integration alongside other agent hosts. SkillHub is the hosted experience; cloning the repository gives developers access to the machinery for building their own skill layer, changing retrieval behavior and controlling deployment.

## SkillCorpus core features

- **Task-specific skill retrieval**: Relevant procedures can enter agent context before execution. A skill may provide instructions, references and optional supporting scripts, rather than just a short search result.
- **Multi-source search**: The project supports local skills, EverMind SkillHub, ClawHub and skillhub.cn. Its retrieval flow filters and deduplicates candidates, then makes a final selection of zero to two skills.
- **Automatic or on-demand delivery**: The README describes retrieval on every query as well as an agent-invoked `skill_search` tool. These offer different ways to decide when procedural context is requested.
- **Shared skills library**: Version 0.4.0 adds a common `~/.evermind-skillsearch/` directory across supported hosts. Retrieved catalog skills are retained, and library changes become available on the next turn without restarting.
- **Corpus curation and self-hosting**: Developers can customize source registries, taxonomy, quality checks, deduplication, export schemas and evaluation suites. Released retrieval models can also be self-hosted for an independently deployed skill layer.

## How to install and use SkillCorpus

The supplied README excerpt does not include a DSH installation command, and the npm package name is unconfirmed. Start with the repository's host-specific guide at `skillcorpus_plugin/engine-typescript/README.md`; an installation command cannot be established from the excerpt alone.

1. Open that guide and follow its installation and configuration instructions for your DSH environment. The excerpt identifies the guide but does not specify a configuration file or required credentials.
2. Choose the intended skill sources. The project supports local collections and external catalogs; consult the host guide for the settings that expose those sources in your integration.
3. Check how the guide configures automatic retrieval or on-demand `skill_search`. Describe the task you want to perform so retrieval can match procedural knowledge to that request.
4. For the shared-library behavior introduced in version 0.4.0, use `~/.evermind-skillsearch/` as the documented common location. Catalog skills persist, and changes should be reflected on the next turn.
5. Clone the repository when you need custom curation, exports, evaluation or self-hosted retrieval. The hosted SkillHub experience can be used without cloning it.

## How to troubleshoot SkillCorpus

The supplied excerpt does not document specific DSH error messages or fixes. Begin with general integration checks: confirm the active profile name, check that the plugin is enabled, and compare your installed version with the host guide. Inspect available logs to establish whether the problem concerns plugin loading or skill retrieval.

If the integration is not appearing, restart DSH and check again. For shared-library edits on version 0.4.0, first try the next turn: the README explicitly describes those changes as taking effect without a restart. Also remember that the retrieval flow permits a final selection of zero skills, so an empty selection alone does not establish a failure.

Check licensing separately when exporting or reusing a corpus. The core repository is Apache-2.0, while `match/`, `evaluate/` and `lifecycle/` are MIT; individual skills retain their upstream licenses.
