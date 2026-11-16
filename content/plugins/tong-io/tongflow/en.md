---
title: "tongflow: Multimodal Workflows for DSH"
description: "tongflow is a DSH plugin ecosystem project for multimodal workflows. Learn how to start, use model API keys and check setup issues."
summary: "Build reusable workflows for text, images, audio, video and more on a shared canvas. Keep intermediate outputs and run records available for human review."
highlights:
  - "Seven modalities on one canvas"
  - "Editable workflows built by agents"
  - "Run history with model details"
  - "App Mode forms"
  - "Source and Docker self-hosting"
faq:
  - q: "How do I install tongflow in DeepSeek Harness?"
    a: "The supplied README does not document a DSH installation command, and no npm package name has been confirmed. It describes source and Docker deployment instead, with setup instructions in `docs/developers.md`."
  - q: "What content types does tongflow support?"
    a: "Its canvas handles text, images, audio, video, 3D, documents and links. Capabilities are separate from model implementations, allowing the model behind a step to change."
  - q: "Can tongflow turn a workflow into a form?"
    a: "App Mode presents a completed workflow as a form for other users. It also works in a phone browser."
  - q: "Does tongflow include a remote MCP server?"
    a: "The README lists a remote MCP server as a custom delivery item for private deployment. It does not describe it as a default feature of the public evaluation service."
  - q: "Is tongflow free to use?"
    a: "The repository is available under AGPL-3.0, with a commercial license also offered. The online evaluation is free for seven days and then requires a subscription; model usage is billed to your own provider accounts."
---

## What does tongflow do?

tongflow is a DSH plugin ecosystem project for building reusable multimodal AI workflows. For DeepSeek Harness users exploring agent workflows, it offers a canvas where people and agents can work with the same workflow artifacts. The repository carries the relevant ecosystem topics, but the supplied README describes a standalone platform and does not establish a direct harness installation procedure.

It addresses a practical problem: an agent's final answer often hides the steps that produced it. Here, agents produce workflow files that people can inspect, edit and run again. Teams can use those workflows for marketing content, localization, meeting summaries and training materials.

## tongflow core features

- **Multimodal canvas:** Work with text, images, audio, video, 3D, documents and links together. Intermediate outputs remain on the canvas, allowing users to continue from an existing result.
- **Reusable agent workflows:** Agents use the same workflow tools as people. Their output can be opened as an editable workflow file and reused with different materials.
- **Model-independent capabilities:** Capabilities are separated from their model implementations. The README describes more than sixty capabilities and over fifty official plugins spanning commercial APIs, model gateways and open models.
- **Run history:** Records include the workflow, individual steps, plugins, models, inputs, outputs and timing. These details help users trace how a result was produced.
- **App Mode:** Turn a finished workflow into a form so colleagues can use it without assembling the canvas themselves. Forms also open in a phone browser.

## How to install and use tongflow

No verified DSH installation command is available in the supplied material. The npm package name is also unconfirmed, so there is no package command to copy from this page.

1. Choose a starting route. For an online evaluation, open `app.tongflow.com` in a browser or use the desktop app. For self-hosting, consult `docs/developers.md` for source or Docker setup.
2. Prepare your own model API keys and compute accounts. The online service uses those accounts for generation charges; the README does not specify the exact credential configuration screen or configuration keys.
3. Start with the material and the intended result. Add assets to the canvas, transform them and combine outputs into a workflow. Choose the model implementation after deciding which capability the step needs.
4. Review intermediate outputs and the run record. Reuse the workflow with new inputs, or give the editable file to a colleague.
5. Use App Mode when the workflow is ready for form-based use. For agent connection details and plugin development, follow the developer guide.

The online service is an evaluation offering with a seven-day free period, followed by an in-product subscription. Private deployment can include separately delivered identity integration, permissions, approval workflows, audit exports and a remote MCP server. Confirm those requirements as part of that deployment.

## How to troubleshoot tongflow

The supplied README contains no error-code reference or specific fixes. Start by identifying whether the issue belongs to the hosted evaluation, a source deployment, Docker or a separately configured harness integration.

For an existing DSH integration, confirm the active profile and whether the plugin is enabled, then restart the harness. These are general checks, not a documented installation recipe for this repository.

Record the platform version and inspect available logs. For a workflow problem, use run history to identify the affected step, model, plugin and inputs. Consult `docs/developers.md` for setup and agent connection instructions rather than guessing package names, credential fields or MCP endpoints.
