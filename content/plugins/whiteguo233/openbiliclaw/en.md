---
title: "OpenBiliClaw: Content Discovery for DSH"
description: "OpenBiliClaw is a DSH plugin that brings personalized content discovery into your workspace. Learn setup, source configuration and troubleshooting."
summary: "Discover content across Bilibili, YouTube and other sources using a local recommendation agent. Its DSH client adds a persistent panel and 22 Agent Bridge tools."
highlights:
  - "Personalized cross-platform content discovery"
  - "Persistent DSH recommendation panel"
  - "22 Agent Bridge tools"
  - "Local SQLite data storage"
  - "Recommendations shaped by feedback"
faq:
  - q: "How do I install OpenBiliClaw in DeepSeek Harness?"
    a: "The README points to whiteguo233/dsh-openbiliclaw for the DSH client. It does not provide a DSH installation command in the supplied excerpt, so follow that client's installation instructions and deploy the OpenBiliClaw backend separately."
  - q: "What does the OpenBiliClaw DSH plugin add?"
    a: "It adds a persistent fourth column with recommendations, a content library, chat, a profile and settings. It also registers 22 Agent Bridge tools so the harness agent can read recommendations, answer probes and participate in feedback learning."
  - q: "Does OpenBiliClaw support YouTube and Xiaohongshu?"
    a: "Both are supported content sources, alongside Bilibili, Douyin and others. Sources that require an account use the browser with the OpenBiliClaw extension installed."
  - q: "Does OpenBiliClaw work on Windows and macOS?"
    a: "The backend has Windows .exe and macOS .dmg installers. Apple Silicon and Windows offer both lightweight packages and packages with a bundled BGE-M3 embedding model; Intel Mac has a lightweight package."
  - q: "Where does OpenBiliClaw store recommendation data?"
    a: "The project stores data locally in SQLite by default. Embeddings can use a cloud service or a local model, so local storage should not be interpreted as a guarantee that every computation runs offline."
---

## What does OpenBiliClaw do?

OpenBiliClaw is a DSH plugin that brings a local, personalized content discovery agent into DeepSeek Harness through a dedicated client. It helps people whose interests span several platforms discover relevant material while working in the harness. The main project supplies the backend and browser extension; the DSH client lives in the separate `whiteguo233/dsh-openbiliclaw` repository.

The agent builds an evolving picture of your interests from activity, conversations and feedback, then uses that context to search across sources. Supported services include Bilibili, Xiaohongshu, Douyin, YouTube and Reddit, with custom websites and RSS sources also available. Likes and “not interested” feedback influence later recommendations.

## OpenBiliClaw core features

- **Integrated DSH panel**: A persistent fourth column contains recommendations, a content library, chat, a profile and settings. This puts content discovery alongside your existing workspace.
- **22 Agent Bridge tools**: The client registers tools that let the harness agent read recommendations, answer probes and participate in the learning loop. The supplied README does not enumerate individual tool names or calling parameters.
- **Cross-platform discovery**: The backend searches beyond a single site's feed, using its understanding of your interests to explore potentially relevant topics. It also supports open-web sources.
- **Feedback-driven personalization**: Conversations and explicit reactions contribute to subsequent recommendations. The project describes a layered profile built from events, preferences and deeper inferred interests.
- **Local-first storage**: Data stays in local SQLite by default. The backend supports cloud embeddings or a local embedding model, including optional packages with BGE-M3 already bundled.

## How to install and use OpenBiliClaw

The supplied README contains no DSH installation command, and the npm package name is unconfirmed. Use the installation instructions in `whiteguo233/dsh-openbiliclaw` for the client; a package-based command cannot be reliably supplied from this excerpt.

1. Install the browser extension from the Chrome Web Store, or download its ZIP from the project's latest GitHub release for manual installation. The store release may arrive a few days after the release archive.
2. Install the backend from the same release page. Choose the macOS `.dmg` or Windows `.exe` package. Apple Silicon and Windows users can choose a lightweight package or a `-with-embedding` package; Intel Mac has the lightweight option.
3. Open `http://127.0.0.1:8420/web` to access the local interface. Use it to establish that the backend is available before troubleshooting the harness integration.
4. Connect a content source in the browser that has the extension installed. Bilibili is the default initialization source, but other supported services can be selected. Account-dependent sources reuse the extension's browser connection.
5. Follow the separate DSH client's setup instructions, then use its recommendation, library, chat, profile and settings views. Provide feedback on results to influence future discovery.

For optional TikTok or Instagram access, enable the source under Settings → Sources. Both require overseas network access; backend requests follow backend network or proxy settings, while browser tasks use the browser's own proxy.

## How to troubleshoot OpenBiliClaw

If the client is missing from DSH, start with general integration checks: confirm the intended profile, verify that the plugin is enabled, restart the harness, and inspect versions and logs. The supplied excerpt documents no client-specific error codes or configuration paths.

If a source is unavailable, check its enabled state and any required login in the extension-equipped browser. For TikTok and Instagram, also check the documented network requirements and the separate browser and backend proxy paths.

For outdated installations, compare your package with the latest GitHub release. The README identifies Gitee as a source-code mirror and the 123 cloud-drive files as historical version `v0.3.213`, rather than current installers.
