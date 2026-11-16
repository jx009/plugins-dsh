---
title: "solo-to-team-skills: AI Team Tasks for DSH"
description: "solo-to-team-skills is a DSH plugin that guides AI task handoffs and evidence checks. Learn how to install skills, use them and fix loading issues."
summary: "Coordinate AI assistants with four skills for task handoffs, evidence checks, beginner instructions and reusable case notes. Keep acceptance decisions with a human."
highlights:
  - "Task delegation and acceptance tracking"
  - "Evidence checks before declaring completion"
  - "Step-by-step beginner instructions"
  - "Anonymized operational case notes"
  - "Shared skills across supported AI hosts"
faq:
  - q: "How do I install solo-to-team-skills in DeepSeek Harness?"
    a: "Copy each complete skill folder into project `.dsh/skills/`, user `~/.dsh/skills/` or `.agents/skills/`, then open or refresh the host. The README explicitly says that `dsh plugin add` does not install this package's skill content."
  - q: "Which solo-to-team-skills skills should I start with?"
    a: "Start with `dispatch-accept-verify` and `evidence-before-done` together because task acceptance in the first depends on evidence checks from the second. The evidence skill also works independently; the writing and case-note skills are optional."
  - q: "Does solo-to-team-skills automatically wake agents or schedule checks?"
    a: "No: the package declares `hooks: {}` and supplies no scheduling or wake-up mechanism. Use the host's capabilities where available, or check tasks manually at the agreed time."
  - q: "Why is the solo-to-team-skills task registration template missing?"
    a: "Copying only `SKILL.md` leaves out supporting files. Copy the entire `dispatch-accept-verify` folder, including its `templates/` directory."
  - q: "Does solo-to-team-skills include a DeepSeek API key?"
    a: "No, the package does not supply credentials. Install the host first and provide your own DeepSeek account or API access."
---

## What does solo-to-team-skills do?

solo-to-team-skills is a DSH plugin that provides collaboration skills for human-led AI teams. It helps someone managing several assistants record assignments, receive deliverables, check evidence and decide whether work is acceptable. In DeepSeek Harness, it is loaded as skill directories rather than through a package installation command.

The repository contains four skills, a task registration template, guidance and anonymized cases. Its central workflow moves from defining a goal through delegation, handoff, verification and a human decision. Receiving a file and accepting the work are separate events, so a delivery does not silently become a completed task.

The README labels the documentation `v0.9-draft`. It reports actual use in supported hosts and limited task acceptance records, including this host, but those records do not establish reliability across all tasks or prove that every skill was invoked individually.

## solo-to-team-skills core features

- **Task delegation and acceptance:** `dispatch-accept-verify` records work before assignment, including who performs it, who receives it and who checks at the deadline. A task stays unfinished until acceptance or authorized cancellation.
- **Evidence before completion:** `evidence-before-done` requires evidence that matches the current version of the work. Changed or previously failing parts need renewed checks; unchanged parts may reuse previous verification.
- **Beginner operation instructions:** `beginner-ops-writing` structures instructions around individual actions, unambiguous targets and visible results. Steps requiring the person's own participation are identified for that person to perform.
- **Reusable operational cases:** `ops-case-notes` provides two anonymized cases about a daily production workflow and gaps in acceptance checks. They describe problems, changes, results and remaining limitations.

## How to install and use solo-to-team-skills

There is no applicable DSH plugin installation command in the supplied README. It explicitly directs users to copy directories and says `dsh plugin add` is not the way to load these skills.

1. Install the host and prepare your own DeepSeek account or API access. Download or clone the repository so that its `skills/` directory is available locally.
2. Start with `dispatch-accept-verify` and `evidence-before-done`. Copy each complete folder into project `.dsh/skills/`, user `~/.dsh/skills/` or `.agents/skills/`. For example, the first skill should have a path ending in `.dsh/skills/dispatch-accept-verify/SKILL.md`.
3. Preserve supporting files, especially the delegation skill's `templates/` directory. Open or refresh the host after copying.
4. Invoke the skills by name. For a first exercise, ask: `Use dispatch-accept-verify to register a small task, including its owner, receiver, deadline and output location.`
5. Follow `examples/walkthrough-meeting-notes/` and consult `templates/task-register-line.md`. Track pending receipt, acknowledgment, receipt of the deliverable and acceptance separately. Use the evidence skill before marking the result accepted.

The directory choice is the documented loading setup; the excerpt specifies no additional DSH configuration file. Add the writing and case-note skills when needed. Scheduling, cross-assistant messaging and wake-up behavior depend on the host or on manual action, because this package declares `hooks: {}`.

## How to troubleshoot solo-to-team-skills

- If a skill is unavailable, check its directory and confirm that `SKILL.md` sits inside the named skill folder. Reopen or refresh the host; if necessary, restart it and inspect the version and logs.
- If registration instructions cannot find their template, restore the complete delegation skill folder rather than copying only its main document.
- If acceptance lacks evidence, confirm that the evidence skill was installed alongside the delegation skill and invoke it for the current deliverable.
- If nothing happens at a deadline, check who is responsible for the follow-up. The package supplies a method for checking work, while reminders and automatic wake-up require host capabilities or a person.
