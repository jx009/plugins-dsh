---
title: "plannotator: Plan and Code Review for DSH"
description: "plannotator is a DSH plugin for reviewing agent plans and code in your browser. Learn what to verify before installation, during setup, and when errors occur."
summary: "Mark up an agent's plan before it starts coding, then review the resulting diff and send your comments back from the browser."
highlights:
  - "Inline comments on agent plans"
  - "Browser review of Markdown and HTML"
  - "Local and remote code review"
  - "Guided reviews for large diffs"
  - "Review feedback sent to your agent"
faq:
  - q: "How do I install the plannotator DSH plugin?"
    a: "The available README excerpt lists DeepSeek Harness as supported but doesn't show a DSH install command or identify an npm package. Check the project's current DeepSeek Harness instructions before running an installer."
  - q: "How do I open plannotator plan mode in DeepSeek Harness?"
    a: "Plan mode is triggered by the harness hook when your agent creates a plan, so there's no separate plan-mode command. If the browser doesn't open, verify that the integration is enabled in the DSH profile you're running."
  - q: "Can plannotator review GitHub PRs and GitLab merge requests?"
    a: "Yes. The documented review command accepts a GitHub pull request URL or a GitLab merge request URL, so you're not limited to reviewing uncommitted changes."
  - q: "How do I use plannotator guided review for a large diff?"
    a: "Select Guide in the code review view. The chapter summaries help you decide where to start, and you can leave comments on the actual changes as you go."
  - q: "Can plannotator annotate a live localhost page?"
    a: "Yes. With the CLI installed and your app running, pass its local URL to `plannotator annotate`. The page is served through a local proxy that preserves hot reload while you review it."
---

## What does plannotator do?

plannotator is a DSH plugin that gives you a local browser workspace for reviewing agent plans, documents, and code changes. In DeepSeek Harness, the plan-mode hook opens a Markdown review when the agent creates a plan. You can comment next to the step you want changed and send that feedback back to the agent instead of restating the plan in chat.

Use plan review to flag an assumption before implementation, document annotation to comment on a specific passage, and code review to point to the lines that need another pass. The review surface keeps your comments alongside the material you're responding to.

## plannotator core features

- **Plan mode.** Read the proposed work in the browser and annotate the steps that need clarification or revision. Plan review opens through the harness hook rather than a separate slash command.
- **Document and HTML annotation.** Comment on Markdown, specs, agent messages, or rendered HTML. For a site running locally, the CLI can open the live page through a proxy while hot reload continues to work.
- **Diff and pull request review.** Comment on uncommitted changes, a GitHub pull request, or a GitLab merge request. You can suggest code changes in the diff and send your review notes back to the agent.
- **Guided review.** For a large diff, select `Guide` to see changes grouped into chapters, with the most important work first. Each chapter puts a short explanation beside the diff, where you can leave comments as you read.

## How to install and use plannotator

The available README excerpt confirms DeepSeek Harness support but doesn't provide a DSH installation command or a verified npm package name. Check the project's current DSH setup instructions rather than assuming the repository name is an installable package. The Herdr installer shown in the README is for a separate terminal integration.

1. Follow the project's DSH setup instructions for the profile you actually launch. Verify that the integration is enabled in that profile before testing the plan-mode hook.
2. Ask the agent to create a plan. When the browser review opens, mark up the relevant passages and send the comments back when you're ready for the agent to revise its approach.
3. For a manual review, use the documented commands where they're available in your setup. `/plannotator-annotate README.md` opens a local Markdown file, and `/plannotator-last` opens the agent's latest message for annotation. `/plannotator-review` starts a review of uncommitted changes without requiring a pull request URL.

If you already have the CLI and want to review a live page, pass the address of your running development server, for example `plannotator annotate http://localhost:5173`.

## How to troubleshoot plannotator

- **Plan review doesn't open.** Confirm that the agent produced a plan and that the integration is enabled in the active DSH profile. Restart the harness and try again with a fresh plan.
- **A slash command isn't available.** Check the installed versions and compare the command with the instructions for your setup. A command shown for another agent or for the standalone CLI isn't a substitute for configuring the DSH integration.
- **The issue persists after restart.** Check the DSH logs after reproducing the problem. Note the active profile, installed versions, and whether the failure followed plan creation or a manual command so you can describe exactly what didn't work.
