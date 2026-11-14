---
title: "opskat: Server Ops Tools for DSH Users"
description: "opskat is a desktop server operations workbench for SSH, databases and AI tasks. Learn how to install it, configure assets and check connection issues."
summary: "Manage servers, databases, remote desktops and object storage in one desktop app. An optional AI agent can execute supported operations through registered tools."
highlights:
  - "SSH terminals and SFTP file browsing"
  - "Built-in RDP and VNC desktops"
  - "SQL editor and Redis key browser"
  - "Kafka and Kubernetes operations"
  - "AI operations with applicable policy controls"
faq:
  - q: "How do I install opskat?"
    a: "Download the build for your operating system from the repository's Releases page and run it. The README says prebuilt downloads do not require a Go or Node toolchain."
  - q: "Does opskat support Windows, macOS and Linux?"
    a: "Yes, the README lists all three desktop platforms. Select the corresponding release build when downloading."
  - q: "Can opskat import my existing SSH connections?"
    a: "It supports imports from SSH config, Tabby and WindTerm. Remote desktop connections can also be imported from .rdp files or RDP Excel templates."
  - q: "Which AI providers can I configure in opskat?"
    a: "The supplied README describes support for OpenAI-compatible and Anthropic-compatible providers. You supply your own API key, which is encrypted and stored locally."
  - q: "Can opskat connect through multiple proxies?"
    a: "Yes, its ordered proxy chains can combine SSH tunnels, SOCKS5 proxies and HTTP script tunnels. Kafka uses the asset's chain for brokers, Schema Registry and configured Kafka Connect clusters."
---

## What does opskat do?

opskat is a desktop server operations workbench that combines remote access, database tools and optional AI-assisted operations. It helps developers and operators manage different infrastructure assets without switching between separate terminals, query editors and service consoles. Manual operations remain available before an AI provider is configured.

For DeepSeek Harness users exploring a DSH plugin for infrastructure work, the packaging distinction matters: the supplied README documents a standalone application, while the repository includes the `dsh-plugins` topic. It does not establish a direct harness integration or provide a verified npm package. The installation steps below therefore cover the documented desktop application.

## opskat core features

- **SSH and file access**: Use split-pane terminals, an SFTP browser, jump host chains, port forwarding and a SOCKS proxy. Tree-based asset groups help organize the supported connection types.
- **Remote desktops**: Open RDP and VNC sessions inside the application. The embedded clients support text clipboard synchronization; RDP also supports direct file clipboard transfer.
- **Database and Redis tools**: Run queries and browse data in MySQL, PostgreSQL, SQL Server and SQLite. Redis has command execution and a key browser, while MongoDB supports collection browsing and queries.
- **Kafka and Kubernetes operations**: Manage Kafka topics, messages, consumer groups, ACLs, Schema Registry and Kafka Connect. The AI examples also include checking cluster health through kubectl and summarizing nodes and pods.
- **Object storage and AI tools**: Browse S3-compatible buckets and objects, transfer files and create presigned URLs. With a provider configured, the agent can execute supported tasks through registered tools, with policy, approval and audit behavior depending on the operation path.

## How to install and use opskat

No DSH installation command appears in the supplied README, and no npm package name has been confirmed. Use the desktop release download described by the project.

1. Download the latest build for macOS, Windows or Linux from the repository's Releases page. Run the downloaded application; the prebuilt distribution does not require a Go or Node development toolchain.
2. Add an asset such as an SSH host, database or object-storage account. You can also import existing connections from SSH config, Tabby, WindTerm, .rdp files or the supported Excel templates.
3. Open the asset and perform an appropriate manual operation: start a terminal, browse keys, execute a query or inspect a bucket. This gives you a concrete starting point before using the agent.
4. If the asset requires intermediate network hops, configure its ordered proxy chain. Available layers include an existing SSH asset, SOCKS5 and an HTTP script tunnel with URL, token and timeout settings.
5. Optionally configure an OpenAI-compatible or Anthropic-compatible AI provider in the application. Supply your own key, then request a supported task such as retrieving recent server logs or checking consumer-group lag. The excerpt does not specify a configuration file path or exact settings menu.

## How to troubleshoot opskat

The supplied excerpt contains no error-code reference or dedicated troubleshooting procedure. For an initial investigation, check the application version and available logs, and record which asset and operation failed.

For proxy configuration, the README documents a specific precedence rule: after a new chain is saved, `proxy_chain` takes priority over legacy single-tunnel or SOCKS5 settings. Review the saved chain when investigating an unexpected connection route. Local SQLite remains local; remote SQLite VFS uses its selected SSH asset and that asset's chain.

If you are separately checking a DSH setup, confirm the active profile, check whether the intended plugin is enabled and restart the harness. These are general harness checks; they do not establish that this desktop application has been installed as a plugin.
