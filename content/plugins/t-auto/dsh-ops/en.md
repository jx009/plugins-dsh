---
title: "dsh-ops: lower-token file and shell tools for DSH"
description: "dsh-ops adds compact file, document and Bash tools to DeepSeek Harness and hides some built-in ones, aiming to cut token use and tool-call rounds."
summary: "A low-level tool plugin for DeepSeek Harness. It adds an ops tool family for Native and PTC modes, loads rarely used tools on demand, and can stand in for PowerShell with Bash on Windows."
highlights:
  - "Compact file tools"
  - "On-demand tool loading"
  - "ops-ptc mode"
  - "Bash on Windows"
  - "Optional TUI sidebar"
faq:
  - q: "Does dsh-ops remove the official DSH tools?"
    a: "It hides some of them and publishes ops replacements instead. Bash, file replacement and host PowerShell hiding each have their own switch, and when a replacement is switched off the original tool stays available."
  - q: "What is the ops-ptc mode that dsh-ops adds?"
    a: "It is a fifth built-in mode registered by the plugin runtime that inherits the PTC tool surface, with optional batching guidance injected once on the first turn. The global.forceDefaultOpsPtc switch makes it the default mode; it is on by default and can be turned off."
  - q: "Which DSH versions does dsh-ops support?"
    a: "The README states that host support starts at DSH 0.2.2-rc.1. The 0.5 series of the plugin no longer supports 0.2.0, 0.2.1 or earlier 0.2.2 previews."
---

## What does dsh-ops do?

dsh-ops is a low-level tool plugin for DeepSeek Harness whose stated goal is token efficiency. It adds a family of ops tools for file, document and shell work, and hides part of the official tool set so the model uses the leaner versions.

The footprint is kept small: the component bundle inserts a single `dsh-ops` row into a profile, and that row's configuration decides which tools are always present, which are loaded dynamically, and whether Bash, file tools or the host PowerShell are replaced.

## Core features

- **Native mode tools**: File tools return compact output with line numbers and clearer error feedback, intended to stop the model from looping on the same error.
- **PTC mode tools**: Tools return structured JSON so the model writes less TypeScript in PTC mode. The PTC SDK directory lists 18 APIs: 15 file and document tools plus batching, result references and a loader.
- **Dynamic tool loading**: The plugin turns on DSH's reserved `tools_addition` mechanism and discloses tools progressively. Features such as PDF and Word reading or bulk edits across many files are loaded when needed.
- **ops-ptc mode**: An extra mode that inherits the PTC tool surface and can add batching hints as context, without blocking or rewriting the program the model wrote.
- **Shell handling**: Bash and host shell hiding are configured separately. On Windows, `ops_bash` can replace pwsh, or you can keep the official shell.
- **OPS sidebar**: With dsh-TUI, an optional read-only sidebar shows ops information without taking focus or making extra tool calls.

## How to use dsh-ops

1. Initialise the target DSH app first, and check that the host is DSH 0.2.2-rc.1 or later.
2. Install from the app's plugin marketplace by entering the npm package name `dsh-ops`, then enable it. Unless you know the official npm registry is reachable, the README suggests choosing a custom address and entering the Huawei Cloud mirror.
3. Alternatively, run the npx installer. A profile must be named explicitly:

```console
npx --yes dsh-ops@latest install --profile desktop
npx --yes dsh-ops@latest install --profile web
npx --yes dsh-ops@latest install --profile tui
```

The desktop profile has to go through the CLI bundled with the desktop app. Adding `--dry-run` prints the plan without changing the profile.

4. Reload when the app prompts you, and restart it if already loaded code was replaced.
5. Check the result, or remove the plugin later:

```console
npx --yes dsh-ops@latest status --profile desktop
npx --yes dsh-ops@latest uninstall --profile desktop
```

6. To get the sidebar, enable the `dsh-ops/tui` row in dsh-TUI and restart.
