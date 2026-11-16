---
title: "awesome-claude-video-skills: DSH Video Skills"
description: "awesome-claude-video-skills is a video skills directory for DSH plugin discovery. Learn how to choose tools and check installation requirements."
summary: "Find agent-operated tools for Remotion, HyperFrames, explainers, editing and motion graphics. Compare categories, reported security grades and a shared video rendering test before choosing a project."
highlights:
  - "Video skills organized by output type"
  - "Remotion and HyperFrames tool discovery"
  - "Reported per-repository security grades"
  - "Sixteen end-to-end rendering tests"
  - "English and Chinese documentation"
faq:
  - q: "How do I install awesome-claude-video-skills in DeepSeek Harness?"
    a: "The supplied README presents a directory and does not provide a DSH installation command. Choose an individual project, then consult its documentation for installation and host requirements."
  - q: "Does awesome-claude-video-skills include Remotion skills?"
    a: "Yes, the README recommends remotion-dev/skills for users building their own designs in Remotion. Its reported test completed in about 4.5 minutes, with a recommendation to supply your own design direction."
  - q: "Which awesome-claude-video-skills projects should I try first?"
    a: "The maintainer recommends explainroo for quickly producing a finished film and onetake for maintaining one visual idea throughout a film. Remotion's own skills are another suggested starting point when you want to control the design."
  - q: "Do awesome-claude-video-skills tools need paid model APIs?"
    a: "The README reports that none of the sixteen tested skills needed a paid model for its specific promotional-video brief. That result does not establish API requirements for other projects or workloads."
  - q: "What does awesome-claude-video-skills test in rendered videos?"
    a: "The shared test checks playback, requested duration and dimensions, readable on-screen copy, and visible movement. Visual quality is not scored; the maintainer discusses appearance separately as a subjective judgment."
---

## What does awesome-claude-video-skills do?

awesome-claude-video-skills is a directory of agent-operated video skills and toolkits for users researching DSH plugin options. It helps developers find projects for generating or editing video with coding agents, including Claude Code and Codex. For DeepSeek Harness users, it provides a starting point for tool selection; the supplied README does not establish native compatibility with that host.

The directory covers frameworks, promotional videos, explainers, editing, vertical shorts, avatars, animation, motion graphics, scripting and music videos. Its README reports 503 repositories, while the supplied repository description gives an older-looking count of 180. Treat the collection size as changing rather than a fixed product specification.

## awesome-claude-video-skills core features

- **Browse by video type.** Categories separate tools for making new videos from those for editing existing footage. This helps narrow a search for captions, B-roll, tutorials or animated titles before evaluating individual projects.
- **Find Remotion and HyperFrames tools.** The collection includes rendering frameworks and agent skills. The maintainer recommends Remotion's own skills when you want to bring a specific design direction to a video.
- **Compare a shared rendering brief.** Sixteen skills were tested on a 15-second promotional video with five fixed lines of copy, at 1920 × 1080 and 30 frames per second. The README reports that all passed the four output checks.
- **Review reported security grades.** Agent Skills Hub is credited with reading and security-grading each repository. The supplied excerpt does not explain the grading criteria, so it cannot establish what an individual grade guarantees.
- **Use bilingual discovery resources.** The project offers English and Chinese documentation, plus a live directory with filters that is described as refreshing every eight hours.

## How to install and use awesome-claude-video-skills

No DSH installation command or confirmed npm package is provided. There is therefore no supported package command to reproduce for this directory.

1. Identify the output you need: a new promo, an explainer, edited footage, a vertical short or another listed format. Start in the corresponding category.
2. Compare the maintainer's suggested starting points. explainroo is recommended for speed, onetake for a continuous visual idea, and remotion-dev/skills for custom design work.
3. Read the selected project's own README. Installation steps, configuration locations and supported agent environments must come from that project; this directory excerpt supplies no shared configuration file.
4. Check the selected tool's requirements against your intended host before integrating it. The published comparison used Claude Code, so it is not a DSH compatibility test.
5. Try a brief with explicit duration, dimensions and on-screen text. Review the resulting file for playback, correct output size, readable copy and movement, following the comparison's practical checks.

The reported timings apply to one test setup. For example, HyperFrames took 23.5 minutes on that brief; this is useful context, not a general rendering-time promise.

## How to troubleshoot awesome-claude-video-skills

The supplied README does not document installation errors or project-specific fixes. If a chosen tool is unavailable after a separate DSH integration, confirm the intended profile, check that the integration is enabled, restart the host, and inspect versions and logs.

Also check whether the tool matches your input. The README describes motion-graphics as intended for talking-head footage, which the shared brief did not include. A mismatch between input and intended workflow can make the comparison less useful without indicating a software failure.

For rendering problems, consult the individual project's documentation. The directory's successful test does not establish that every listed tool supports every environment or video task.
