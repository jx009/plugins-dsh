---
title: "dsh-degeneration-kit: DSH Thinking Loop Guard"
description: "dsh-degeneration-kit is a DSH plugin suite that folds thinking loops and compacts context. Learn setup, threshold tuning and error troubleshooting."
summary: "Combine reasoning-block folding with automatic checkpoints and context compaction. Two plugins handle repeated thinking between compactions and accumulated context pollution."
highlights:
  - "Degenerate reasoning block folding"
  - "rotationGuard for rotating short phrases"
  - "Automatic checkpoints and context compaction"
  - "Live context threshold controls"
  - "Compaction retries for transient errors"
faq:
  - q: "How do I install dsh-degeneration-kit in DeepSeek Harness?"
    a: "The repository directs installation to INSTALL.md, which contains two commands and verification instructions. Install both thinking-guard and dsh-auto-checkpoint; the supplied README excerpt does not include those commands or a confirmed npm package name."
  - q: "Why does dsh-degeneration-kit need two plugins?"
    a: "thinking-guard folds degenerate reasoning before later steps replay it to the model. dsh-auto-checkpoint handles accumulated pollution through compaction or a new session, covering a different part of the problem."
  - q: "Can dsh-degeneration-kit stop a thinking loop while it is generating?"
    a: "History folding itself takes effect at the next pre-step, so it cannot interrupt the current generation. The separately documented emergency valve can abort repetition, after which the checkpoint plugin triggers compaction by default."
  - q: "How do I show the dsh-degeneration-kit threshold panel?"
    a: "Open the bottom-right floating button, or use the dsh-cost-whale menu if that plugin is installed. If the panel is missing, add ?acfloat=1 to the address; when query parameters already exist, append #acfloat instead."
  - q: "Does dsh-degeneration-kit preserve long-term conversation memory?"
    a: "The checkpoint component records task state so work can continue after compaction or session replacement. Agreements and preferences discussed in conversation may still be lost; the suite does not provide long-term memory."
  - q: "Which DSH versions has dsh-degeneration-kit been tested with?"
    a: "The README reports a complete run on DSH 0.2.1-rc.2. Version 0.2.0-rc.2 received source inspection only, and major upgrades may break the internal services and events used by the plugins."
---

## What does dsh-degeneration-kit do?

dsh-degeneration-kit is a DSH plugin suite that folds degenerate reasoning blocks and manages accumulated context through checkpoints and compaction. It helps developers running long DeepSeek Harness sessions where repeated thinking can persist even when a turn appears successful.

The suite contains two complementary components. `thinking-guard` folds affected blocks out of model-visible history before subsequent steps replay them. `dsh-auto-checkpoint` handles accumulated pollution by compacting context or moving work into a new session. The repository recommends installing both because each covers a different stage.

Its distinction between loop types matters: type A repeats one unit heavily, while type B cycles through short phrases. A detector looking only for one dominant phrase can miss the second pattern. The README's observations come from the author's local logs, rather than a general performance benchmark.

## dsh-degeneration-kit core features

- **Reasoning history folding:** `thinking-guard` acts at the next pre-step to reduce repeated exposure to degenerate blocks. Folding itself does not interrupt an ongoing generation.
- **Rotating phrase detection:** `rotationGuard` addresses short-phrase rotation, where individual phrases can stay below the original single-unit detection threshold.
- **Checkpoints and compaction:** `dsh-auto-checkpoint` records task state and handles context at configured watermarks. Checkpoint freshness checks consider both timing and changes to the conclusions section.
- **Emergency valve coordination:** After the guard's valve aborts repetition, the checkpoint plugin compacts regardless of the watermark or session panel mode. This behavior defaults to enabled.
- **Runtime threshold controls:** A floating panel exposes sliders, a session-switch checkbox and a mode selector. Slider changes update memory and disk without restarting the harness.

## How to install and use dsh-degeneration-kit

Installation commands are in the repository's `INSTALL.md`; they are absent from the supplied excerpt. No npm package name is confirmed, so an executable installation command cannot be reproduced here.

1. Follow `INSTALL.md` to install both components and perform its verification steps. Consult `thinking-guard/README.md` and `auto-checkpoint/README.md` for component-specific details.
2. Open the bottom-right floating panel. If `dsh-cost-whale` is installed, its menu provides another entrance to the same configuration.
3. Select thresholds for your context window. The documented starting points are 150k for task boundaries and 180k for checkpoint/session switching on 256K windows; 250k and 350k on windows of at least 512K; and 350k with 350k–500k on windows of at least 1M.
4. Apply slider changes directly during operation. These values are absolute token counts, not percentages. The wider 350k–500k range is an experience-based tradeoff, not a measured cutoff.
5. Restart after editing package-level `cordis.patch.yml` settings. Disabling valve-triggered compaction requires changing the global `AUTO_COMPACT_ON_VALVE_ABORT` constant from its default `true` and restarting.

Task checkpoints support continuation, but conversation agreements and preferences may disappear from the compacted summary. Use a separate long-term memory solution when those details must persist.

## How to troubleshoot dsh-degeneration-kit

- **Missing controls:** Add `?acfloat=1` to the application address. If it already contains query parameters such as `?token=...`, append `#acfloat` instead.
- **Connection failures during compaction:** The documented implementation retries transient failures within the current turn using increasing delays. These failures do not add a strike or start cooldown; genuine compaction failures are handled separately.
- **A recently touched checkpoint is stale:** Check the conclusions section, not just file modification time. The plugin also evaluates freshness against the current compaction cycle and requests an update when needed.
- **Unexpected behavior after installation or upgrades:** Confirm the active profile and that both plugins are enabled, restart, and inspect versions and logs. Full-run validation is reported for DSH `0.2.1-rc.2`; internal API changes may affect compatibility.
