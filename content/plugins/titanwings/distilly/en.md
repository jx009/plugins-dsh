---
title: "Turn a person's experience and judgment into reusable agent skills"
description: "Build source-grounded Person Profiles from messages, documents, interviews, and public sources, then package them as skills for supported agent hosts."
summary: "Distilly converts materials about a person into a reusable Person Profile, packaged as an Agent Skill. It supports colleague, relationship, and public or fictional figure workflows."
highlights:
  - "Builds profiles from supplied materials and your description"
  - "Captures observable decision patterns, expression, experience, and working practices"
  - "Provides distinct collection and analysis workflows for three person families"
  - "Packages Person Profiles as Agent Skills"
  - "Documents native local Skill discovery for DeepSeek Harness and seven other agent hosts"
faq:
  - q: "What does Distilly produce?"
    a: "It produces a Person Profile grounded in source materials. The current release packages that profile as an Agent Skill for supported hosts to install and invoke."
  - q: "Which kinds of people can it model?"
    a: "Its three workflow families cover colleagues and mentors, personal relationships, and public figures or fictional characters. Each family uses its own collection strategy, analysis dimensions, and profile structure."
  - q: "Does a profile reproduce the actual person?"
    a: "The profile represents patterns observable in the supplied materials, such as decisions and expression. The project does not claim to clone the person."
  - q: "Is Colleague Skill a separate project?"
    a: "Colleague Skill is the project's former name. The creator Skill is now named distilly, and the README specifies a distilly directory for Skill installation."
---

## What does Distilly do?

Distilly builds reusable Person Profiles from messages, documents, interviews, public sources, and a user's description. A profile organizes evidence about a person's experience, judgment, expression, and ways of working so an agent can use it.

Previously called Colleague Skill, the project now covers workplace contacts, personal relationships, and public or fictional figures. Its current output format is an Agent Skill.

## Core features

- Colleague profiles combine work practices and persona information, including technical standards, workflows, and workplace behavior. The project supports collection from Lark, DingTalk, and Slack.
- Relationship profiles organize expression, emotional triggers, conflict patterns, and repair patterns found in the source materials.
- Public-figure workflows include subtitle processing, transcript cleanup, research merging, and quality checks.
- Each person family has a dedicated collection strategy, analysis framework, and profile structure.
- Native local Skill discovery is documented for DeepSeek Harness, Claude Code, Hermes, OpenClaw, Codex, Pi, Grok Build, and OpenCode.

## How to use Distilly

Use the `distilly` creator Skill and provide source materials along with a description of the person. Choose the relevant person family to guide collection and analysis, then use the resulting Person Profile as an Agent Skill in a supported host.

For local Skill installation, the README specifies that the creator belongs in a directory named `distilly`. Profiles represent evidence from the materials supplied; they are not claims to reproduce the person behind those materials.
