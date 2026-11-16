---
title: "welink: WeChat Chat Analysis for DSH"
description: "welink is a DSH plugin project for WeChat chat analysis. Learn setup requirements, AI clone usage, Prompt configuration and troubleshooting."
summary: "Search WeChat conversations, ask questions across contacts, and explore AI personas built from message samples. A local-first platform also provides an SFT workbench for training and evaluating personal models."
highlights:
  - "Cross-contact WeChat questions"
  - "AI clones from chat samples"
  - "Group conversation simulation"
  - "Editable Prompt templates"
  - "SFT training with MLX or CUDA"
faq:
  - q: "How do I install welink in DeepSeek Harness?"
    a: "The supplied README excerpt does not include a DSH installation command, and no npm package name was identified. The repository lists Docker, Windows and macOS deployment options, but the exact deployment and integration steps need the full documentation."
  - q: "Can welink answer questions across WeChat contacts?"
    a: "Yes. Its agent extracts keywords and time ranges, gathers information through search and calendar APIs, and generates an answer with the message excerpts supplied to the model."
  - q: "Does welink keep all chat data offline?"
    a: "You deploy and manage the chat database yourself. Cloud AI requests, remote training and cloud exports can send selected content to the services you choose, so local-first does not mean every feature runs offline."
  - q: "How do I customize welink Prompt templates?"
    a: "Open the Prompt templates section in Settings and edit the relevant feature's system prompt. Variables such as `{{name}}` and `{{today}}` are supported; clearing a template restores its default."
  - q: "What hardware does welink SFT training support?"
    a: "The workbench supports MLX on Apple Silicon and a LLaMA-Factory Worker on Linux with NVIDIA GPUs, including trusted remote environments. The README reports synthetic-data testing on Mac MLX and CUDA L20, with results dependent on the model, data and hardware."
---

## What does welink do?

welink is a DSH plugin project for analyzing WeChat conversations with AI. It helps people search their chat history, examine communication patterns and simulate conversations using a contact's writing style. The repository tags identify DeepSeek Harness relevance; the supplied README describes the analysis platform but does not document a working harness connection or plugin package.

The platform uses a local-first database that you deploy and manage. Selected messages can still leave that environment when you use cloud models, remote training or cloud export. Its AI answers and personas are generated interpretations: source excerpts help you check an answer, while simulated replies do not represent a real person's views.

## welink core features

- **Cross-contact questions:** Ask about subjects or periods spanning multiple contacts. An agent extracts keywords and dates, calls search or calendar APIs, and answers using retrieved records. The interface exposes the excerpts given to the model and lets you inspect the surrounding day's context.
- **AI clones:** Build a persona from a contact's private messages and selected shared groups. Sample sizes include 100, 300, 1000, 2000 or all available text messages; group extraction filters by sender so other members' messages are excluded.
- **Group conversation simulation:** Choose participants, a scenario and a conversational atmosphere. The simulation uses member writing styles and speaking proportions, supports multiple turns and lets you join the conversation.
- **Prompt templates:** Inspect the current system prompt beside an AI feature and edit templates in Settings. Supported placeholders include contact names, dates and round counts, with changes taking effect immediately.
- **SFT workbench:** Prepare and review private-chat samples or import JSONL, then freeze training, validation and test datasets. Train a LoRA Adapter through MLX or a LLaMA-Factory Worker, compare model outputs, perform blind evaluations and export or connect the result.

## How to install and use welink

No verified DSH installation command or npm package name is present in the supplied material, so there is no command to copy here. The project description lists Docker, Windows and macOS; the README badges specify Windows 10+ and macOS 12+. Consult the full deployment documentation for the chosen environment before attempting harness integration.

1. Deploy the platform using its documented setup and prepare the chat database you will manage. The excerpt does not specify database import commands, model credential fields or DSH connection settings.
2. Start with a cross-contact question about a topic or date range. Review the supporting excerpts before treating a generated conclusion as established history.
3. For an AI clone, select a contact, choose the message sample size and optionally include shared groups. Add background information such as occupation or your relationship when useful.
4. Open Settings and edit Prompt templates to adjust feature behavior. Use the feature's prompt viewer to inspect the instructions currently in use.
5. To draft a reply, switch the AI home page to the reply assistant, paste the incoming message, and select a tone and model. This feature sends manually entered content and does not automatically read historical chats.
6. For personal-model training, follow data preparation, environment connection, preflight, training and evaluation in the SFT workbench. Deploy and connect the model before using it with the reply assistant.

## How to troubleshoot welink

The excerpt does not provide an error-code catalogue. For a missing harness integration, first verify the actual installation method and target profile; if you have configured a plugin, confirm it is enabled, restart DSH, and inspect versions and logs.

If a search misses a conversation, remember that retrieval supplies a limited candidate set. Try a different keyword or time range, and inspect the available source context rather than interpreting an empty result as proof that a conversation never occurred.

If a customized prompt behaves unexpectedly, clear the relevant template to restore the default. If training is unavailable in the online Demo, that is a documented restriction: the Demo disables training-data uploads and training-environment connections. SFT primarily learns expression patterns, so use chat retrieval when accurate historical details matter.
