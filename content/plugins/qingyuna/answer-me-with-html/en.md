---
title: "answer-me-with-html: HTML Answers in DSH"
description: "answer-me-with-html is a DSH plugin that answers hard questions as a one-page HTML with diagrams and tables, using fewer tokens. Learn to install and tune it."
summary: "The agent writes a short Markdown draft and a bundled CLI renders it into an HTML page with diagrams, tables and code. A general agent skill that also installs as a DSH plugin."
highlights:
  - "One-page HTML answers"
  - "About 1/8 the tokens of hand-written HTML"
  - "Sequence diagrams, call graphs and tables"
  - "Narrated explainer videos"
  - "Optional always-on mode"
faq:
  - q: "How do I install answer-me-with-html in DeepSeek Harness?"
    a: "Run `dsh plugin --profile web add github:QingYunA/answer-me-with-html`, using the profile you actually run. You need Node.js 20 or newer; the CLI is bundled inside the skill, so there is no `npm install` step."
  - q: "Why use answer-me-with-html instead of asking for HTML directly?"
    a: "The model writes only a short Markdown draft and the bundled CLI generates the SVG, CSS and markup. The author's benchmark reports about 612 output tokens versus 4,893 for hand-written HTML, and 12 seconds versus 31."
  - q: "Does answer-me-with-html turn every reply into a page?"
    a: "No. The agent decides when a page helps, such as for multi-step flows or comparisons, and a one-line question still gets a one-line answer. Always-on mode, off by default, adds a small page to every conclusion."
  - q: "How do I stop answer-me-with-html opening the browser?"
    a: "Run `/answer-me-with-html config open off` in the agent, `am config set open off` in a terminal, or simply tell the agent to stop opening the browser."
  - q: "Where does answer-me-with-html save its pages?"
    a: "Pages are saved under `~/.answer-me-with-html/pages/`. Ask the agent to clean up the pages and it will confirm before deleting anything."
  - q: "Is answer-me-with-html only for DSH?"
    a: "No. It is a general agent skill that also works in Claude Code, Codex, Cursor, OpenCode and any agent that can run a shell command."
---

## What does answer-me-with-html do?

answer-me-with-html is a DSH plugin that answers complex questions with a single readable HTML page instead of a long block of chat text. The page can mix prose, tables, code and diagrams, so architecture questions, multi-step processes and comparisons become something you can scan at a glance.

The trick is a division of labour. The agent writes a short Markdown draft, then hands it to a CLI bundled with the skill, which produces the SVG diagrams, styling and markup. Because the model no longer writes coordinates and CSS by hand, it emits far fewer tokens: the author's benchmark puts the draft at roughly one eighth of the tokens of hand-written HTML, and the page arrives in less than half the time.

The agent decides when a page is warranted. A question about how modules fit together gets a folder tree and call graph, "Redis or Memcached?" gets a comparison table, and a one-line question still gets a one-line reply. The same skill works in Claude Code, Codex, Cursor and OpenCode.

## answer-me-with-html core features

- **Page generation**: renders a Markdown draft into one HTML page saved under `~/.answer-me-with-html/pages/`.
- **Diagram types**: sequence and state diagrams, call graphs, folder trees, timelines and comparison tables, chosen to fit the question.
- **Page controls**: switch theme and light or dark mode, type a reply back to the agent, or copy the Markdown that produced the page.
- **Explainer videos**: on request, `am video` builds a narrated player page where the diagram unfolds step by step.
- **Always-on mode**: off by default; once enabled through a rule, every conclusion comes with a small page of two to four panels.
- **Plain-English check**: an optional writing check based on Simplified Technical English keeps page text short and clear.

## How to install and use answer-me-with-html

1. Make sure Node.js 20 or newer is installed.
2. Add the plugin to the DSH profile you run (`web` is the default one):

   ```bash
   dsh plugin --profile web add github:QingYunA/answer-me-with-html
   ```

3. Restart DSH, then ask a question that benefits from structure, for example "explain the TCP three-way handshake" or "compare Redis and Memcached for session storage".
4. The page opens in your browser. Use its buttons to switch themes, reply to the agent or copy the source.
5. Adjust behaviour with settings such as `open`, `theme`, `mode` and `scale`, either by slash command or with `am config set <key> <value>` in a terminal.

In other agents, paste "Install Answer me with HTML: read https://raw.githubusercontent.com/QingYunA/answer-me-with-html/main/INSTALL.md and follow it." and the agent installs the skill for you.

## How to troubleshoot answer-me-with-html

- **The agent never produces a page.** Confirm the plugin is installed in the profile you are running and that DSH was restarted. Simple questions intentionally get plain answers; ask something with steps or comparisons to test it.
- **The CLI fails to run.** The bundled CLI needs Node.js 20 or newer. Check `node -v` and upgrade if needed.
- **Browser tabs keep opening.** Turn off the `open` setting with `am config set open off`, or enable `close_after_reply` so tabs close after you reply.
- **Pages pile up on disk.** Ask the agent to "clean up the pages"; it lists them and asks before deleting.
- **You are on an old version.** Updates are manual. The CLI checks GitHub at most once a day and nudges the agent at most every three days; say "update answer-me-with-html" to upgrade.

When reporting an issue, include the plugin version, your DSH version and the question that produced a broken page.
