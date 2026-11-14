---
title: "dsh-ops: Token-Saving File Tools for DSH"
description: "dsh-ops is a DSH plugin that swaps in compact file, document and Bash tools to cut token use and tool-call rounds. Learn how to install it and fix setup."
summary: "A low-level tool plugin for DeepSeek Harness. It adds an ops tool family for Native and PTC modes, loads rarely used tools on demand, and can stand in for PowerShell with Bash on Windows."
highlights:
  - "Compact file tools with line numbers"
  - "On-demand loading for PDF and Word tools"
  - "ops-ptc mode with batching hints"
  - "Bash in place of PowerShell on Windows"
  - "Optional read-only TUI sidebar"
faq:
  - q: "How do I install dsh-ops in DeepSeek Harness?"
    a: "Run `npx --yes dsh-ops@latest install --profile web` (or `desktop` or `tui`), or `dsh plugin --profile web add dsh-ops`. In the plugin marketplace, enter the npm package `dsh-ops`; the README suggests the Huawei Cloud npm mirror if the official registry is unreliable."
  - q: "Which DSH versions does dsh-ops support?"
    a: "Host support starts at DSH 0.2.2-rc.1. The 0.5 series no longer supports 0.2.0, 0.2.1 or earlier 0.2.2 previews."
  - q: "Does dsh-ops remove the official DSH tools?"
    a: "It hides some of them and publishes ops replacements. Bash, file replacement and host PowerShell hiding each have their own switch, and when a replacement is off the original tool stays available."
  - q: "What is the ops-ptc mode in dsh-ops?"
    a: "A fifth built-in mode registered by the plugin that inherits the PTC tool surface and can add batching guidance once on the first turn. The `global.forceDefaultOpsPtc` switch makes it the default; it is on by default."
  - q: "How does dsh-ops reduce token usage?"
    a: "File tools return compact output with line numbers and clearer errors to stop retry loops, PTC tools return structured JSON so the model writes less code, and heavy features such as PDF reading load only when needed."
  - q: "Can I install dsh-ops from GitHub?"
    a: "No. Direct `git+https` installs and unbuilt checkouts lack the full runtime. Install the published npm package or a fully built tarball."
---

## What does dsh-ops do?

dsh-ops is a DSH plugin that makes DeepSeek Harness cheaper and faster on everyday file and shell work. It adds a family of ops tools for reading, editing and searching files, reading documents and running Bash, and hides part of the official tool set so the model uses the leaner versions instead.

The idea is to cut tokens at the source. Compact output with line numbers and clearer error messages stops the model from looping on the same mistake; structured results in PTC mode mean the model writes less code; and rarely used tools are loaded only when a task needs them, so the system prompt does not grow.

The footprint stays small. The plugin inserts a single `dsh-ops` row into a profile, and that row's settings decide which tools are always present, which are loaded on demand, and whether Bash, file tools or the host PowerShell are replaced.

## dsh-ops core features

- **Native mode tools**: file tools with compact, line-numbered output and better error feedback to reduce retry rounds.
- **PTC mode tools**: tools that return structured JSON. The PTC SDK lists 18 APIs: 15 file and document tools plus batching, result references and a loader.
- **Dynamic tool loading**: turns on DSH's reserved `tools_addition` mechanism so features like PDF and Word reading or bulk edits across many files load only when needed.
- **ops-ptc mode**: an extra mode that inherits the PTC tool surface and adds batching hints without blocking or rewriting the model's program.
- **Shell control**: Bash and host-shell hiding are configured separately; on Windows, `ops_bash` can replace pwsh, or you can keep the official shell.
- **OPS sidebar**: with dsh-TUI, an optional read-only sidebar shows ops information without taking focus or making tool calls.

## How to install and use dsh-ops

1. Initialize the target DSH app and confirm it is DSH 0.2.2-rc.1 or later.
2. Install with the npx helper, naming the profile explicitly:

   ```bash
   npx --yes dsh-ops@latest install --profile web
   ```

   Use `--profile desktop` for the desktop app or `--profile tui` for dsh-TUI. Add `--dry-run` to preview the plan first.

3. Or use the official command, `dsh plugin --profile web add dsh-ops`, or the plugin marketplace with the package name `dsh-ops`.
4. Restart DSH and work as usual. The ops tools replace the hidden built-ins automatically, and ops-ptc becomes the default mode unless you turn `global.forceDefaultOpsPtc` off.

For the desktop app, use the CLI bundled with it. On Windows the helper looks for it under `%LOCALAPPDATA%\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd`; pass `--dsh-cli` with the full path if it is installed elsewhere.

## How to troubleshoot dsh-ops

- **Installing into the desktop profile fails.** The ordinary DSH CLI cannot manage the reserved `desktop` profile. Use the CLI bundled with the desktop app, or point the helper at it with `--dsh-cli`.
- **The marketplace install hangs or fails.** Choose a custom registry and enter `https://mirrors.huaweicloud.com/repository/npm/`. The README advises against npmmirror for now.
- **The plugin does not load on an older DSH.** Version 0.5 requires DSH 0.2.2-rc.1 or later. Upgrade the host, or stay on an older dsh-ops release.
- **A GitHub install is missing files.** `git+https` installs and unbuilt source checkouts lack the runtime. Install from npm or a built tarball.
- **Bash behaves oddly on Windows.** Run `dsh-ops ladder` to check the bundled Bash's integrity labels and MSYS compatibility. Executables with a Low label can create Low child processes that cannot modify existing files.
- **You want the official tools back.** Turn off the matching replacement switch; the original tool becomes available again.

When reporting an issue, include the dsh-ops version, DSH version, profile and operating system.
