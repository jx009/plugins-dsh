---
title: "Blue-Whale-Harness: Find DSH Plugins"
description: "Blue-Whale-Harness is a DSH plugin catalog for finding tools and skills. Learn how to search, export CSV and find plugin installation instructions."
summary: "Find DeepSeek Harness plugins, Skills, MCP servers and ecosystem tools through bilingual search, category filters and GitHub star sorting. Export the catalog as CSV for your own review."
highlights:
  - "Chinese and English search"
  - "Category filters and star sorting"
  - "CSV catalog export"
  - "Plugin and ecosystem labels"
  - "Repository submission via issues or PRs"
faq:
  - q: "How do I install Blue-Whale-Harness in DeepSeek Harness?"
    a: "The README presents it as an online catalog and provides no DSH installation command. Open leenkcool.github.io to find projects, then follow the selected repository's instructions."
  - q: "How does Blue-Whale-Harness identify DSH plugins?"
    a: "Its stated classification rule checks whether a repository contains cordis.patch.yml. Repositories without that file are listed separately as related ecosystem projects, with separate counts."
  - q: "Can I search Blue-Whale-Harness in English?"
    a: "Yes, the online catalog supports Chinese and English search and provides pages for both languages. You can also filter by category and sort by GitHub stars."
  - q: "How do I export the Blue-Whale-Harness plugin list?"
    a: "The online catalog offers CSV export, and the README links directly to plugins.csv. Download that file to filter the entries yourself."
  - q: "How do I submit a repository to Blue-Whale-Harness?"
    a: "Open an issue using the catalog-intake template and include the repository URL and category. Alternatively, submit a pull request following the repos.txt format."
---

## What does Blue-Whale-Harness do?

Blue-Whale-Harness is a DSH plugin catalog that helps developers discover extensions and related tools for DeepSeek Harness. It brings scattered GitHub repositories into a searchable directory covering Skills, MCP servers, tools, interfaces and orchestration projects. Use it when you know the capability you need but have not yet chosen a repository.

The project provides a browser-based catalog, a categorized README list and downloadable CSV data. Its purpose is discovery: installation and configuration instructions belong to the individual projects you select. The supplied README does not document an installable package for the catalog itself.

The directory also distinguishes projects classified as DSH plugins from related ecosystem repositories. That distinction matters when comparing search results, because inclusion in the directory alone does not mean every entry is installed or used in the same way.

## Blue-Whale-Harness core features

- **Bilingual search:** Search the online catalog in Chinese or English. Separate language pages give readers another way to browse the same collection.
- **Category filters:** Narrow the list to areas such as tools, sessions, Skills, UI, memory or orchestration. This helps you focus on the kind of capability you want to add.
- **GitHub star sorting:** Order entries by stars when exploring projects. The README list also groups repositories by category and orders entries within each group by descending star count.
- **CSV export:** Download the catalog data for your own filtering and review. The linked `plugins.csv` provides an alternative to browsing the website or reading the long repository table.
- **Explicit classification:** The catalog uses the presence of `cordis.patch.yml` to classify a repository as a DSH plugin. Other related projects remain visible under a separate ecosystem designation and are counted separately.

## How to install and use Blue-Whale-Harness

No DSH installation command is provided for this catalog, and the supplied repository information does not identify an npm package. Start with the website rather than a package installation step.

1. Open `https://leenkcool.github.io` in your browser. The README also lists `https://leenkcool.github.io/plugins.en.html` and `https://leenkcool.github.io/plugins.zh.html` as language-specific entry points.
2. Search by a project name or the capability you need. Apply a category filter to narrow the results, then use star sorting if useful for your review.
3. Check the entry's description and plugin classification. Follow its repository link to read the original project's installation, configuration and usage instructions.
4. For offline filtering, download `https://leenkcool.github.io/plugins.csv`. You can also browse the categorized plugin list directly in the README.
5. To propose an addition, open an issue in `leenkcool/Blue-Whale-Harness` using the `catalog-intake` template. Include the repository address and category, or submit a pull request matching the `repos.txt` format.

## How to troubleshoot Blue-Whale-Harness

The supplied README does not document catalog-specific error codes or fixes. If you need another way to inspect the entries, it provides both the README list and CSV data alongside the online interface.

If a selected extension fails after installation, consult that extension's README first. General DSH checks include confirming the active profile name, verifying that the plugin is enabled, restarting the harness, and checking versions and logs. These are general diagnostic steps, not catalog-specific fixes.

When interpreting entries, use the documented classification rule: the presence of `cordis.patch.yml` determines the catalog's plugin label. Related ecosystem entries can still be useful, but their setup should be checked in their own repositories.
