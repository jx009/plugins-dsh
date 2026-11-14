---
title: "AI_Animation: HTML Animation Skills for DSH"
description: "AI_Animation is a DSH plugin discovery entry for HTML animation skills. Learn how to use templates and check installation requirements."
summary: "Turn descriptions into HTML presentations, animated diagrams and video scenes with a collection of 17 Agent Skills. Includes templates, prompt references, rendering resources and video QA capabilities."
highlights:
  - "PPT-style HTML presentations"
  - "Network protocol visualization"
  - "Animated architecture diagrams"
  - "1,262 GSAP motion packages"
  - "HyperFrames rendering and FrameProof QA"
faq:
  - q: "How do I install AI_Animation in DeepSeek Harness?"
    a: "The supplied README excerpt does not provide a DSH installation command, and no npm package name has been confirmed. The repository distributes Agent Skills folders; consult the selected skill's documentation and your host's skill-loading instructions."
  - q: "Does AI_Animation create PowerPoint files?"
    a: "The documented ppt-animation output is a single HTML file with slide-like navigation and staged entrances. The supplied documentation does not establish PPTX export."
  - q: "Which presentation themes does AI_Animation support?"
    a: "The ppt-animation skill lists dark-tech, warm-paper, clean-white, cyber-red and gradient-dark. You can also ask the agent to adapt an existing HTML template from assets/."
  - q: "Can AI_Animation visualize TCP/IP and DHCP?"
    a: "The network-protocol-viz skill covers network protocols and packet demonstrations, including TCP/IP, IPv4, Ethernet frames, routing and DHCP. Describe the protocol and sequence you want to explain when preparing your request."
  - q: "Can AI_Animation render HTML animations to MP4?"
    a: "The collection includes HyperFrames for deterministic MP4 rendering from HTML, CSS, media and seekable animation. It also includes FrameProof for video checks such as blank frames, freezing, subtitles, audio and encoding metadata."
---

## What does AI_Animation do?

AI_Animation is a collection of Agent Skills for generating HTML animations from natural-language requests. For developers exploring DSH plugin options, it provides reusable instructions, prompt references and templates for technical presentations, visual explanations and video scenes. The supplied README describes use with WorkBuddy, Claude Code and Cursor; it does not document a DeepSeek Harness installation procedure.

The collection lists 17 skills. Each is organized as a self-contained folder with `SKILL.md` for agent instructions, `README.md` for human guidance, `references/` for prompt material and `assets/` for HTML templates. This structure helps you choose a specific presentation format and give the agent resources tailored to that task.

AI_Animation HTML animation skills cover slide presentations, network protocol visualization, animated architecture diagrams and several styles of recorded demonstrations. The repository also includes rendering and video quality-checking resources, so the available workflows extend beyond generating a presentation page.

## AI_Animation core features

- **PPT-style presentations:** `ppt-animation` produces single-file HTML slides in a 16:9 layout. Elements enter progressively after a slide change, with keyboard, wheel and click navigation for fullscreen presentation or recording.
- **Network protocol visualization:** `network-protocol-viz` supports explanations of TCP/IP, IPv4, Ethernet frames, routing and DHCP. It is intended for showing protocol behavior and packet-related concepts visually.
- **Animated architecture diagrams:** `dynamic-archify` covers system architecture, flowcharts, sequence diagrams, data flows and state machines. Its documented capabilities include flowing animation and multiple export formats, though the excerpt does not enumerate those formats.
- **GSAP motion resources:** `ui2v-motions` provides an offline collection of 1,262 motion packages, described as 641 MB. It includes an index organized by scene purpose and guidance for connecting paused timelines to cues.
- **Rendering and video QA:** HyperFrames provides deterministic MP4 rendering, compositions, Studio, variable-based batches and local or cloud rendering. FrameProof checks generated video and supports repair packets and baseline regression gates.

## How to install and use AI_Animation

No DSH installation command appears in the supplied excerpt, and an npm package name has not been verified. A package-install command cannot be provided from this evidence. The excerpt also does not identify a DSH configuration file or skill directory.

1. Select a skill for your output. Start with `ppt-animation` for slides, `network-protocol-viz` for packet explanations or `dynamic-archify` for architecture diagrams.
2. Read that folder's `README.md` and `SKILL.md`. Use its `references/` and `assets/` alongside the instructions when following your agent host's documented skill-loading process.
3. Describe the subject, audience, visual format and sequence. Once installed in a supported agent environment, the collection is designed to activate the relevant skill from your description.
4. For presentation styling, specify one of `dark-tech`, `warm-paper`, `clean-white`, `cyber-red` or `gradient-dark`. Alternatively, identify an existing HTML template in `assets/` to adapt.
5. Review the generated presentation and test its navigation before recording. For MP4 output, consult the HyperFrames skill documentation for its separate rendering workflow.

For example, a request could be: `Use ppt-animation to explain TCP connection setup in a 16:9 clean-white HTML presentation. Show the message sequence visually and reveal each explanation progressively.` This is an example prompt, not a command supplied by the repository.

## How to troubleshoot AI_Animation

The supplied excerpt contains no error catalog or DSH-specific fixes. Begin with general integration checks: confirm the active profile, verify that your configured skill or plugin integration is enabled, restart DSH and inspect versions and logs if the skill remains unavailable.

If the agent cannot access instructions or templates, check that the selected folder includes its documented files and resource directories. If a presentation differs from your intended style, name the target skill, theme and template explicitly in the request. For rendering or video-quality issues, consult the relevant skill's own documentation; the excerpt identifies HyperFrames and FrameProof capabilities but does not provide their setup commands or error remedies.
