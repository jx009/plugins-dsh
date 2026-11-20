---
title: "math-modeling-skill: DSH Contest Modeling"
description: "math-modeling-skill is a DSH plugin for modeling competitions. Learn how to install the desktop preset, configure a session, and troubleshoot setup."
summary: "Turn a CUMCM or MCM/ICM problem into a modeling plan, reproducible Python or MATLAB results, and a Word paper. Run all three stages or pick up at the one you need."
highlights:
  - "Three-stage contest modeling workflow"
  - "Python and MATLAB dependency checks"
  - "Five independent quality checkpoints"
  - "OpenAlex and AnySearch literature verification"
  - "Word export and optional LaTeX compilation"
faq:
  - q: "Can I install math-modeling-skill with dsh plugin add?"
    a: "The README does not provide a DSH CLI install command, and no npm package name is confirmed. Install it as a local desktop agent preset by copying the bundled preset directory."
  - q: "Why is math-modeling-skill missing from the DSH preset picker?"
    a: "Check that the copied directory sits directly inside `.agent-presets` under the DSH home used by your desktop profile. Restart the app and check the preset picker in a new session."
  - q: "Can I use math-modeling-skill for MATLAB only?"
    a: "Yes. Give the agent your existing model and ask it to run only the implementation stage in MATLAB, with the result tables and figures you need."
  - q: "Does math-modeling-skill generate a LaTeX paper by default?"
    a: "No. Word is the default paper format; explicitly request a LaTeX source project and compiled PDF if you need them."
  - q: "Does math-modeling-skill need an AnySearch API key?"
    a: "If your AnySearch setup requires a key, provide it through the `ANYSEARCH_API_KEY` environment variable. The standard literature search uses both AnySearch and OpenAlex so it can cross-check matching records."
---

## What does math-modeling-skill do?

math-modeling-skill is a DSH plugin that guides mathematical modeling projects from problem analysis through code execution and paper writing. It is packaged as a local agent preset for the DeepSeek Harness desktop app. The preset bundles its own modeling knowledge base, so it does not depend on a separate checkout after you copy it into place.

The workflow suits competitions such as CUMCM and MCM/ICM, as well as general modeling projects. You can run all three stages in order, ask for an analysis before committing to a model, or start with existing results and request a paper. For competition submissions, use the current official rules and template to decide what to submit.

## math-modeling-skill core features

- **Model selection and validation:** Break the prompt into subproblems, inspect the attachments, and decide how to test the proposed solution. The bundled references cover methods such as optimization, forecasting, and graph algorithms.
- **Python and MATLAB implementation:** Check dependencies for the features the model actually uses. The implementation stage produces result tables, figures, and an overall modeling flowchart, while a run manifest records seeds, input hashes, dependency versions, and the reproduction command.
- **Scientific figures and literature search:** Export charts as SVG and 300 DPI PNG for review and publication. OpenAlex and AnySearch results can be cross-checked by DOI or title before a source is used in the paper.
- **Word and LaTeX output:** Generate a DOCX paper by default, with support for official templates and native Word equations. Request a LaTeX project explicitly if you also need a compiled PDF.
- **Independent quality checkpoints:** Five read-only reviews cover the modeling plan, the first runnable result, the completed implementation, the evidence outline, and the final paper. These reviews are enabled by default; other subagent collaboration is opt-in.

## How to install and use math-modeling-skill

There is no documented DSH install command. The desktop plugin is installed by copying the agent preset from the repository.

1. Download or clone the repository and locate `dsh-plugin/math-modeling-agent/`.
2. Copy that entire directory directly into `<dsh-home>/.agent-presets/`. On Windows, the documented default is `C:\Users\<username>\AppData\Roaming\dsh-desktop\dsh-home\.agent-presets`. The copied folder name is the preset ID. Alternatively, give the DSH agent the installation prompt provided in `dsh-plugin/README.md`.
3. Start a new desktop session and select the Math Modeling Workbench preset (`数学建模 Workbench`). The preset exposes tools such as `mm_project_init`, `mm_todo`, and `mm_check_deliverables`; it can load the bundled knowledge base through the `skill` tool.
4. Point the agent at your project directory and specify the stage, language, and output you want. For a first run, try `Analyze this problem and its attachments, then stop after the modeling plan.` Keep original inputs read-only and make any template edits on a copy in the project directory.

## How to troubleshoot math-modeling-skill

- **Preset not listed:** Verify that you are using the intended desktop profile and that the full preset folder is in that profile's `.agent-presets` directory. Restart DSH, open a new session, and check the installed version and logs if the preset still does not appear.
- **Code cannot run:** Use the dependency check for the selected language and the features in your solution, such as visualization or optimization. The repository provides `check_env.py` for Python and `check_matlab_env` for MATLAB.
- **A checkpoint fails:** Use the review findings to fix the affected stage, then request another check. Resume from the blocked stage rather than rerunning work that already passed.
