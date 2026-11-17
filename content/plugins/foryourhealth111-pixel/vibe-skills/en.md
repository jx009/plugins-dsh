---
title: "Vibe-Skills: Skill Routing for DSH"
description: "Vibe-Skills is a DSH plugin that routes local Skills and orchestrates tasks. Learn where to find install steps and how to check setup issues."
summary: "Select relevant local Skills, break complex requests into verifiable subtasks, and organize execution around dependencies and delivery checks."
highlights:
  - "Local Skill discovery and routing"
  - "Dependency-based workflow orchestration"
  - "Verifiable task decomposition"
  - "Cross-deliverable acceptance checks"
  - "SkillsBench performance evidence"
faq:
  - q: "Where can I find Vibe-Skills installation instructions for DeepSeek Harness?"
    a: "The README points to `docs/install/README.en.md` for installation and `docs/quick-start.en.md` for initial use. The supplied excerpt contains no DSH installation command, and the repository information does not confirm an npm package name."
  - q: "How does Vibe-Skills choose local Skills?"
    a: "It clarifies the objective, divides the task into verifiable parts, and selects relevant capabilities from the available pool. In the documented machine-learning case, it reviewed candidate `SKILL.md` files and selected seven Skills from more than 100."
  - q: "Does Vibe-Skills reduce token usage?"
    a: "The reported v4.1.0 SkillsBench comparison showed 29.6% lower total token consumption and 33.1% fewer tool calls. These measurements used DeepSeekV4Flash-VE and OpenHands in a modified 195-Skill environment, so they are evidence for that setup rather than a guarantee for every task."
  - q: "Can Vibe-Skills coordinate a machine-learning experiment?"
    a: "The README describes a reproducible classification experiment covering data auditing, modeling, statistical review, figures, a report, and slides. It organized the task into ten work units and reported that all 17 delivery checks passed."
  - q: "Does Vibe-Skills run every installed Skill?"
    a: "Its documented approach selects a small relevant subset instead of invoking the whole pool. Execution follows task dependencies, with checks before delivery."
---

## What does Vibe-Skills do?

Vibe-Skills is a DSH plugin for routing local Skills and orchestrating complex agent workflows. It helps developers who have accumulated reusable Skills but still need to decide which ones belong in a task and how to combine them. The project describes itself as a general-purpose Skill that coordinates existing local capabilities.

For DeepSeek Harness users, the central use case is turning a request with several deliverables into an executable plan. It clarifies the objective and delivery requirements, breaks the work into verifiable subtasks, and selects capabilities appropriate to each part. This reduces the amount of manual planning needed to specify every Skill choice in advance.

## Vibe-Skills core features

- **Local Skill routing:** Review available capabilities and choose a relevant subset. The documented practice case includes inspecting candidate `SKILL.md` files before assigning work.
- **Workflow orchestration:** Arrange subtasks according to their dependencies. Different Skills support different modules within a shared plan.
- **Verifiable task decomposition:** Convert a complex objective into work units with identifiable outcomes. This gives planning and execution a concrete structure.
- **Delivery checks:** Check required outputs, agreement between deliverables, and reproducibility. The machine-learning example covers experiment results, figures, a scientific report, and a slide deck.
- **SkillsBench evidence:** Version v4.1.0 was evaluated with DeepSeekV4Flash-VE and OpenHands in an environment containing all 195 specialized Skills. The reported mean verifier reward rose by 21.12 percentage points, while tokens fell by 29.6% and tool calls by 33.1%.

Those benchmark results compare against the baseline without the project in the stated setup. Reward analysis used 82 paired tasks, while resource analysis used 81. They provide useful context for evaluating the approach, but do not establish the same gains for every host or workload.

## How to install and use Vibe-Skills

The supplied README excerpt does not include a DSH installation command, and no npm package name is confirmed. Installation instructions are referenced at `docs/install/README.en.md` in the repository; initial usage is covered by `docs/quick-start.en.md`. The excerpt does not identify a DSH configuration file or Skill-directory setting.

1. Open the repository installation guide and follow its instructions for your host. Use the quick-start document for the actual activation steps and configuration locations.
2. State the task objective and expected outputs. A concrete starting point is the documented classification experiment: a data audit, statistical review, four result figures, a scientific report, and a seven-slide presentation.
3. Make delivery requirements explicit before execution. In the published example, requirements and the plan were approved before work proceeded through the `L` workflow.
4. Review the selected capabilities and work breakdown. That example chose seven Skills from more than 100 candidates and organized them into five groups containing ten work units.
5. Inspect the completed outputs and acceptance results. The example reported all ten units complete and all 17 checks passed, including consistency and core reproduction checks.

These steps explain the documented working pattern; use the installation and quick-start guides for host-specific commands.

## How to troubleshoot Vibe-Skills

The supplied excerpt does not document specific errors or fixes. If the capability is unavailable in your DSH setup, start with general checks: confirm the active profile, verify that the installed plugin or Skill is enabled, and restart the harness after configuration changes.

Record the installed version and inspect available logs to distinguish loading problems from task-execution problems. Compare your setup with the installation guide and quick start, especially where your host discovers local Skills. Avoid assuming that the benchmark configuration supplies the correct settings for your own environment.
