---
title: "awesome-dsh-plugin-pro: DSH Plugin Discovery"
description: "awesome-dsh-plugin-pro is a DSH plugin catalog with reviewed entries. Learn how to add its discovery feed, browse categories and check setup issues."
summary: "Find reviewed plugins through scenario-based recommendations, category directories and popularity rankings. Subscribe in DeepSeek Harness or browse through the separate dsh-market-pro marketplace."
highlights:
  - "Reviewed DSH plugin catalog"
  - "Official Discover page subscription"
  - "Scenario-based plugin recommendations"
  - "Star Top 200 rankings"
  - "Machine-readable installation mappings"
faq:
  - q: "How do I install awesome-dsh-plugin-pro in DeepSeek Harness?"
    a: "Use its index subscription in the official Discover page; the catalog itself has no documented DSH installation command. Alternatively, install and enable the separate dsh-market-pro package through the official plugin installation interface."
  - q: "What DSH version does awesome-dsh-plugin-pro require for subscriptions?"
    a: "The official Discover subscription requires DSH V0.2.1-rc.2 or later. Enable the custom plugin marketplace option, then add https://bruc3van.com/dsh-plugins/index.json as an index source."
  - q: "How is awesome-dsh-plugin-pro different from dsh-market-pro?"
    a: "The former supplies the reviewed catalog, recommendations and subscription data. The latter is a separate marketplace plugin that uses the catalog and provides browsing, installation, enable/disable controls and update checks."
  - q: "Can programs read awesome-dsh-plugin-pro catalog data?"
    a: "The awesome-dsh-plugin-feed npm feed exposes market-catalog.json with install_status and installation mappings. The repository also provides data/repositories.json as a daily snapshot containing metadata such as stars, licenses and activity."
  - q: "Does awesome-dsh-plugin-pro guarantee plugin safety?"
    a: "No: the README explicitly separates inclusion from safety or compatibility endorsement. Its recommendations consider factors such as a clear purpose, documentation, maintenance and community use."
---

## What does awesome-dsh-plugin-pro do?

awesome-dsh-plugin-pro is a DSH plugin catalog and subscription source that helps users find reviewed extensions for DeepSeek Harness. It filters out unrelated repositories and projects that merely use ecosystem tags, then organizes the remaining entries around practical tasks. Developers can start with a problem they want to solve instead of searching through an unfiltered repository list.

The project supplies recommendations, category directories, popularity rankings and machine-readable data. You can browse the repository directly, subscribe through the official Discover page, or use the separate marketplace application described below. These are different ways to access the catalog; this repository does not document an installable package of its own.

## awesome-dsh-plugin-pro core features

- **Reviewed plugin directory**: CATALOG.md is the entry point to category-specific volumes. Categories cover areas including interface tools, browser operations, developer tooling, knowledge resources and agent workflows.
- **Scenario-based recommendations**: Editorial selections start from user goals, such as adding a desktop client, understanding context usage or operating a browser. Recommendations favor established community projects while also including some smaller projects with distinctive capabilities.
- **Popularity rankings**: The README includes a Top 50 view, while TOP200.md contains the larger star ranking. Editorial recommendations follow their own selection criteria rather than simply repeating that order.
- **Discover subscription**: A published index lets compatible host versions show the curated selection in the built-in discovery interface. Plugin installation still runs through the official host plugin manager.
- **Machine-readable feeds**: The awesome-dsh-plugin-feed package provides market-catalog.json with install_status and installation mappings. A separate data/repositories.json snapshot records repository metadata, including stars, licenses and activity.

## How to install and use awesome-dsh-plugin-pro

No DSH installation command is documented for this catalog. To use its official discovery subscription, configure an index source in the host interface. This route requires DSH V0.2.1-rc.2 or later and does not require an additional plugin.

1. Open the Plugins page from the left navigation.
2. Open the More menu beside Experimental Plugins and enable the custom plugin marketplace option.
3. Switch to Discover and choose Add Index Source, or open the index-source management menu from the upper-left dropdown.
4. Add `https://bruc3van.com/dsh-plugins/index.json`.
5. Select `Bruce 的精选插件` in the dropdown, filter by category or tag, and choose the plugin you want to install.

For a dedicated marketplace interface, enter `dsh-market-pro` in the official plugin installation screen, install it and enable it. Open it from `插件市场Pro` in the left navigation, the plugin-page tab or the session's right sidebar. This separate application combines catalog browsing with installation, installed-plugin controls, update checks, skill browsing and post-installation AI security review.

For repository-only browsing, use CATALOG.md for the full directory, TOP200.md for rankings and SHOWCASE.md for author submissions. Programmatic consumers can start with `https://cdn.jsdelivr.net/npm/awesome-dsh-plugin-feed/data/market-catalog.json` and consult the consumption protocol referenced in the README before using installation mappings.

## How to troubleshoot awesome-dsh-plugin-pro

The supplied README does not list specific error codes or error-specific fixes. Begin with the documented prerequisites: check the host version, confirm that custom plugin marketplaces are enabled, and verify the index URL and selected source.

If the separate marketplace is missing, confirm that its plugin is installed and enabled in the profile you actually use. Restart the host and inspect its version and logs if the interface still does not appear. Keep catalog access problems separate from an individual plugin's installation problems when reviewing those logs.

Catalog inclusion does not establish safety or compatibility. For a selected extension, review its own documentation and installation requirements; the catalog's review process does not replace those checks.
