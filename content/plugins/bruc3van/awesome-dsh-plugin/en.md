---
title: "awesome-dsh-plugin: Find DSH Plugins"
description: "awesome-dsh-plugin is a DSH plugin directory with a market feed. Learn how to subscribe in DeepSeek Harness and fix a missing Discover tab."
summary: "Find plugins by task, category or GitHub popularity, then subscribe to the curated index in the official Discover page. Repository catalogs and JSON datasets also support broader browsing and downstream markets."
highlights:
  - "Official Discover page subscription"
  - "Scenario-based plugin recommendations"
  - "Star Top 200 rankings"
  - "Category-based repository catalog"
  - "Machine-readable market data"
faq:
  - q: "How do I install awesome-dsh-plugin in DeepSeek Harness?"
    a: "The documented setup is an index subscription rather than installing this repository as a package. Enable the custom plugin market and add https://bruc3van.com/dsh-plugins/index.json through Discover."
  - q: "What DSH version does awesome-dsh-plugin subscription require?"
    a: "Third-party subscriptions on the Discover page require V0.2.1-rc.2 or later. Each plugin you choose may have its own host-version requirements."
  - q: "Why is Discover missing when setting up awesome-dsh-plugin?"
    a: "Check the DSH version and enable the custom plugin market from the menu beside Experimental Plugins. Enabling that setting exposes the feature; you must still add the index source manually."
  - q: "Does awesome-dsh-plugin require safer-dsh-market?"
    a: "The official Discover subscription does not require safer-dsh-market. That separate project provides an independent market interface, multi-select installation and post-installation AI review."
  - q: "Why does awesome-dsh-plugin list more repositories than its subscription feed?"
    a: "The full catalog covers a broader collection, while the subscription selects up to 1,000 eligible entries in descending Star order. It excludes sources such as unapproved, archived, disabled or blacklisted entries and invalid installation sources."
---

## What does awesome-dsh-plugin do?

awesome-dsh-plugin is a DSH plugin directory and subscription index for finding extensions by the tasks they solve. It helps DeepSeek Harness users compare community projects, understand their intended use and reach an installation entry point. The repository itself is a discovery resource; its documented setup connects an index to the official market interface.

The project gathers GitHub repositories tagged for the ecosystem and reviews their relevance before organizing them. You can start with scenario-based recommendations, explore category catalogs or browse popularity rankings. This is useful when you know the capability you need, such as browser operations or a better sidebar, but have not chosen a particular project.

## awesome-dsh-plugin core features

- **Scenario-based recommendations:** Entries are grouped around practical goals, including desktop clients, terminal interfaces, browser tools and visual understanding. Descriptions and screenshots help explain what a candidate provides before you open its repository.
- **Category catalogs:** `CATALOG.md` points to category-specific volumes for browsing the larger collection. The ecosystem overview helps you choose a relevant area before reading individual entries.
- **Popularity and author submissions:** The README includes a Top 50 section, while `TOP200.md` contains the larger Star ranking. `SHOWCASE.md` collects author-submitted projects for another discovery route.
- **Discover subscription:** A curated index appears inside the official plugin market after you add its source. You can filter by category, editorial recommendations, keywords, npm/Git, update time or Stars.
- **Machine-readable data:** `data/repositories.json` supplies daily snapshots with metadata such as Stars, licenses and activity. `data/market-v2.json` serves downstream markets with a curated dataset limited to 1,000 entries and 1 MB.

## How to install and use awesome-dsh-plugin

No DSH installation command is provided for this repository, and an npm package name is not established. Use the documented subscription workflow instead. The official Discover page needs DSH V0.2.1-rc.2 or later for third-party index sources.

1. Open the left-hand Plugins area. Use the More menu beside Experimental Plugins and enable the custom plugin market, labeled `自定义插件市场`.
2. Open Discover. On first use, choose Add Index Source; if a market already exists, open the upper-left market menu and choose Manage Index Sources.
3. Paste `https://bruc3van.com/dsh-plugins/index.json` and add the source.
4. Select `Bruce 的精选插件` from the market menu. Browse categories or apply filters to narrow the results to your task.
5. Read the selected plugin's host-version requirements before installing it. Use Refresh when the displayed data needs updating.

For broader research, use the repository catalog and rankings alongside the subscription. The feed contains eligible npm targets and Git bundles pinned to full commits, sorted by Stars and capped at 1,000 entries. Its scope is therefore smaller than the full catalog. Inclusion does not constitute a security audit or a guarantee of tested compatibility.

## How to troubleshoot awesome-dsh-plugin

If Discover is missing, first check that your host meets the minimum version and that the custom market setting is enabled. These are the two prerequisites identified in the README.

If the feature appears but the collection does not, check whether you actually added the source. The setting only exposes the market feature; it does not create the subscription automatically. If entries look outdated, use Refresh.

You do not need `safer-dsh-market` just to subscribe. Its independent interface, multi-select installation and post-installation AI review belong to a separate entry point. For a selected plugin's installation problem, check its own version requirements and documentation.
