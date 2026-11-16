---
title: "new-term-radar: AI Keyword Discovery for DSH"
description: "new-term-radar is a DSH plugin that tracks emerging AI names. Learn about installation, source configuration and keyword research checks."
summary: "Find emerging AI models, products and repositories through early public signals. Use keyword tables and later trend checks to assess which names deserve content research."
highlights:
  - "X and Hugging Face discovery"
  - "GitHub breakout repository tracking"
  - "Sitemap keyword signals"
  - "Keyword tables with page-one checks"
  - "14-day trend validation"
faq:
  - q: "Can I use new-term-radar from an AI agent?"
    a: "The README describes three Agent Skills and an MCP server, alongside command-line usage. The supplied excerpt does not include a DeepSeek Harness installation command or its connection configuration."
  - q: "Which new-term-radar sources work without API keys?"
    a: "Hugging Face trending, GitHub breakout detection and configured sitemaps provide free discovery signals. GitHub does not require a token for this source, although supplying one raises the rate limit."
  - q: "How does new-term-radar find breakout GitHub repositories?"
    a: "It looks for repositories under 14 days old averaging at least 200 stars per day, or gaining at least 400 since the previous day. It also adds search variants people may use to find the project."
  - q: "Does new-term-radar require an AIsa key?"
    a: "Several features require one, including X monitoring, the name judge and the keyword table. Other discovery sources work without it, so the requirement depends on which signals you use."
  - q: "How does new-term-radar validate keyword opportunities?"
    a: "Its keyword table assesses the generic searches behind new names and checks the first results page. A separate review checks leads in DataForSEO Trends after 14 days against their own baselines, reporting hit rate and lead time by signal."
---

## What does new-term-radar do?

new-term-radar is a DSH plugin that helps discover emerging AI names for keyword research. It serves developers, AI directory editors and newsletter writers who need to notice new models, products and repositories before conventional keyword tools provide useful data. The project offers Agent Skills and an MCP server for agent access, as well as command-line usage.

The radar follows early public evidence: an account mentioning a name, a model entering a trending list, a repository gaining stars or a directory publishing new URLs. It turns these observations into a daily report. For DeepSeek Harness users, the value is additional research context when deciding which products or search topics to investigate.

## new-term-radar core features

- **X and Hugging Face discovery**: X monitoring finds names that watched accounts have not used in the previous 60 days. Hugging Face discovery tracks new arrivals in the trending top 50 for models and Spaces, grouping quantized copies and a model's own demo under the base name.
- **GitHub breakout tracking**: The radar identifies repositories under 14 days old with strong star growth. Its criteria include an average of at least 200 stars per day or a gain of at least 400 since yesterday, and it adds relevant search variants.
- **Sitemap and Search Console signals**: Sitemap analysis detects words shared by several new URLs but uncommon in older URLs. Search Console contributes queries that have just started generating impressions for your own site.
- **Keyword opportunity tables**: With an AIsa key, the tool derives generic searches behind new names, sizes those terms and checks room on the first results page. Optional GoAnyAPI access supports additional data, while a small model judges whether a candidate names a specific thing or is merely a common word.
- **Delayed trend validation**: Leads receive a DataForSEO Trends check after 14 days against their own baselines. Results summarize hit rate and how many days ahead each signal was, helping evaluate the discovery sources over time.

## How to install and use new-term-radar

The supplied README excerpt contains no DSH installation command, and no npm package name is confirmed. A copyable plugin installation command therefore cannot be provided from this material. The project is listed on PyPI and specifies Python 3.10 or later; the excerpt also points to quick-start, agent-access and `config.json` documentation without including their instructions.

1. Consult the repository's complete quick-start and agent-access sections to choose command-line, Agent Skills or MCP usage. Use the documented setup for that interface before connecting it to your workflow.
2. Choose discovery sources according to the information you need. Hugging Face, GitHub breakout detection and sitemaps offer a starting point without paid source access.
3. Consult the `config.json` documentation for source settings. Prepare the accounts and sitemaps you want to monitor; the excerpt does not establish their exact configuration keys or file location.
4. Supply credentials for the features you select. X and keyword analysis need AIsa, Search Console needs your Google token, and a GitHub token can raise the rate limit.
5. Read the daily names and keyword table together. Use the later review to assess whether the early signals developed into measurable search interest.

## How to troubleshoot new-term-radar

The supplied excerpt contains no error codes or specific repair procedures. Begin with source prerequisites: confirm Python compatibility, the credentials required by each enabled source and the accounts or sitemap inputs you intended to monitor.

For a DSH setup that does not expose the capability, check the active profile name and whether the integration is enabled, then restart the harness. Inspect installed versions and available logs before changing configuration. Verify the connection procedure against the full agent-access documentation, since this excerpt does not specify DSH configuration fields.
