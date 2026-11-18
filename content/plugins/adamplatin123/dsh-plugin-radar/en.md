---
title: "dsh-plugin-radar: Find DSH Plugins"
description: "dsh-plugin-radar is a DSH plugin discovery radar with compatibility records. Learn how to use its catalog, integrate JSON data and fix refresh errors."
summary: "Find plugins, compare historical compatibility records, and reuse ecosystem data in your own tools. The radar provides a browsable catalog and public JSON exports without an API key."
highlights:
  - "Plugin discovery and filtered browsing"
  - "Historical runtime compatibility records"
  - "Public JSON without API keys"
  - "Curated selections and plugin bundles"
  - "Community registration and record corrections"
faq:
  - q: "How do I install dsh-plugin-radar in DeepSeek Harness?"
    a: "The README provides no DSH installation command, and the supplied repository information identifies no npm package. Use the hosted catalog or public JSON data instead of treating the radar as an installable runtime plugin."
  - q: "Does dsh-plugin-radar verify compatibility with the latest DSH version?"
    a: "An available verdict means the aggregated history contains a successful runtime result. It does not establish compatibility with the latest release, and complete per-record version evidence is not yet public."
  - q: "Does the dsh-plugin-radar JSON API need a key?"
    a: "The public static JSON endpoints require no key. Downstream integrations should cache responses, limit retries, and retain the last validated data if refreshing fails."
  - q: "How do I submit a plugin to dsh-plugin-radar?"
    a: "Add the dsh-plugin topic to the public repository or submit a pull request to PLUGINS.md. Community entries without runtime test coverage enter the catalog as untested."
  - q: "Is the dsh-plugin-radar testing engine open source?"
    a: "The discovery, aggregation, rendering, and distribution engines are public. The production runtime testing engine is not open source, so complete test reproduction still depends on production-side capabilities."
---

## What does dsh-plugin-radar do?

dsh-plugin-radar is a DSH plugin discovery radar that combines catalog browsing, historical compatibility records, and reusable ecosystem data. It helps DeepSeek Harness users find candidates and gives marketplace maintainers machine-readable records for their own tools. It is an ecosystem project, not a documented npm-installable runtime extension.

The catalog is generated from production snapshots, historical baselines, and community registrations. Its verdicts are screening signals rather than guarantees: a historical success does not prove that a plugin works with your current version. This community project has no affiliation with DeepSeek, and its recommendations are not official endorsements.

## dsh-plugin-radar core features

- **Plugin discovery:** Browse and filter the hosted catalog, or read the complete and categorized Markdown listings in the repository. Human-curated selections and bundles offer additional starting points.
- **Compatibility records:** Records distinguish available, incompatible, pending, and untested entries. These summarize accumulated runtime results rather than a complete functional, performance, or security audit.
- **Public JSON data:** Static endpoints expose snapshot information, statistics, and plugin details such as repository identity, verdict, stars, and description. No API key is required.
- **Community contributions:** Authors can register repositories through a topic or pull request. Users can request corrections by supplying versions and reproducible logs.
- **Public aggregation engine:** The repository exposes discovery, aggregation, rendering, and distribution components. The production runtime testing engine remains outside the open-source release.

## How to install and use dsh-plugin-radar

No DSH installation command is documented, and no npm package is confirmed in the supplied metadata. There is therefore no supported package-add command to provide here; start with the website or data endpoints.

1. Open `https://adamplatin123.github.io/dsh-plugin-radar/` to browse candidates. Repository readers can use `PLUGINS-ALL.md`, `catalog/all`, and `docs/catalog-highlights.md`.
2. Check a candidate's verdict, then consult its original repository for installation, permissions, and removal instructions. Validate its smallest useful function in a test environment and keep a rollback path.
3. For data integration, read `docs/api.md`. Fetch `https://raw.githubusercontent.com/AdamPlatin123/dsh-plugin-radar/main/data/latest.json` for snapshot status and `https://raw.githubusercontent.com/AdamPlatin123/dsh-plugin-radar/main/data/plugins-all.json` for details.
4. Configure caching and refresh behavior in your consuming application. Start with a centralized refresh every 15 minutes, add jitter, and use conditional requests when the server provides an `ETag`.
5. Validate new data before replacing your cache. Display the data date and refresh status, and serve larger audiences through your own cache or mirror.

Read the small status file first, but validate detail-file changes independently rather than relying only on the snapshot identifier. If statistics and details must agree across files, read both from the same full Git commit and reconcile all four verdict totals.

## How to troubleshoot dsh-plugin-radar

For timeouts, rate limits, or temporary server failures, use bounded retries with backoff; the README recommends at most three attempts. Honor `Retry-After` when supplied. Keep serving the last successful validated data instead of replacing it with an incomplete refresh.

If sources disagree, compare data dates before switching mirrors because synchronization may lag. A temporary JSON outage usually does not prevent browsing an already deployed site: its data is bundled during the build.

If a verdict appears incorrect, submit an issue with the repository URL, plugin version, DSH version, and reproducible logs. Complete per-record commits, tested versions, timestamps, and logs are not yet available in the flat catalog, so a global version pointer cannot resolve that evidence gap.
