---
title: "Bring free model gateways and provider routing into DSH"
description: "Connect DSH to free model gateways, your own providers and local models, with fallback routing, usage tracking and a gateway for other development tools."
summary: "Adds anonymous free model channels, account-based channels and provider integrations to DSH. Includes fallback chains, local usage statistics and an OpenAI- and Anthropic-compatible gateway."
highlights:
  - "Fetches model lists and capabilities from upstream gateways, including OpenCode Zen and Kilo AI."
  - "Combines free channels, account-based access and providers configured with your own credentials."
  - "Exposes named fallback and round-robin chains as selectable virtual models."
  - "Provides a local gateway with OpenAI-compatible access and Anthropic Messages endpoints."
  - "Records token usage, generation speed and first-token latency locally."
faq:
  - q: "Does every channel work without an account or API key?"
    a: "No. The anonymous free channels do not require them, but account channels require login and many aggregated providers require your own key. The desktop-only EAC channel requires GitHub authorization and starring the repository."
  - q: "Is free access guaranteed to be unlimited?"
    a: "The README documents upstream quotas based on outbound IP addresses and handling for HTTP 429 responses. Model access depends on upstream availability, regional restrictions and your network connection."
  - q: "Can other tools use the connected models?"
    a: "Yes. The local gateway supports OpenAI-compatible access and Anthropic Messages requests. Its client setup section generates connection examples using the configured port and required key."
  - q: "Does local usage tracking mean prompts stay on the machine?"
    a: "No. Usage statistics are stored locally, while inference requests go to the selected upstream provider. The README notes that Kilo free-pool providers may record prompts to improve their services."
---

## What does dsh-our-free-model do?

dsh-our-free-model adds model channels and routing to DeepSeek Harness. It connects to anonymous free gateways, supports channels with account login, and lets users add external providers or local services such as Ollama, LM Studio and llama.cpp.

Model lists, context limits and capabilities are fetched from upstream sources when refreshed. Free access remains subject to upstream quotas, regional policies and availability.

## Core features

- Free channels connect directly to OpenCode Zen and Kilo AI. Additional channels support account login or provider credentials.
- Reasoning controls pass supported effort values or output-token budgets upstream, depending on the model.
- Named chains appear as `combo:<name>` models, with fallback or round-robin routing. Failed attempts can switch models before response text begins.
- A local gateway offers OpenAI-compatible access and Anthropic endpoints, including `/v1/messages` and local token-count estimates.
- Local dashboards track token consumption, generation speed and first-token latency. Optional request processing includes tool-output compression.
- In-app updates include checksum verification and rollback on failure; hot reload applies changes without restarting the application.

## How to use dsh-our-free-model

The supplied README excerpt does not include a DSH installation command, and the provided repository information does not identify an npm package name.

Once installed, use the settings pages to inspect free channels, connect accounts or configure providers. For providers that need credentials, enter your own key; local services can be configured without an account where supported.

Select a model in DSH or define a routing chain. To connect another client, use the gateway page's generated setup instructions for its actual port and authentication requirements. The model channels can also start in compositions without a web server, including `dsh-tui`.

Review the selected upstream provider's data handling before sending prompts. Local storage of usage statistics does not keep inference requests on the machine.
