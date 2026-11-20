---
title: "awesome-ai-plugins: Find DSH Extensions"
description: "awesome-ai-plugins is a catalog of DeepSeek Harness extensions. Learn how to find compatible entries, install and configure them, and troubleshoot setup."
summary: "Start with the dedicated DeepSeek Harness section, then use each project's documentation to check compatibility and find the right setup instructions."
highlights:
  - "Dedicated DeepSeek Harness plugin section"
  - "Cross-platform Agent Skills and MCP listings"
  - "Searchable HOL Plugin Registry"
  - "Machine-readable compatibility exports"
faq:
  - q: "How do I install awesome-ai-plugins in DeepSeek Harness?"
    a: "There is no DSH install command for the catalog itself. Open the repository, choose an extension, and follow that project's setup instructions."
  - q: "Where are the DSH plugins in awesome-ai-plugins?"
    a: "Open the README and select DeepSeek Harness Plugins from the contents under Community Plugins. You can also search by project name in the HOL Plugin Registry."
  - q: "Do all awesome-ai-plugins Agent Skills and MCP servers work with DSH?"
    a: "No. The catalog covers multiple assistants, so check each project's supported clients and setup instructions before assuming it works with your harness."
  - q: "Why isn't a plugin from awesome-ai-plugins showing up in DSH?"
    a: "Check that the extension was installed and enabled in the profile you're using, then restart the harness. If it still doesn't appear, review your installed versions and logs alongside the extension's setup guide."
  - q: "Does awesome-ai-plugins have a JSON export?"
    a: "Yes. The repository provides `plugins.json` and `.agents/plugins/marketplace.json` as machine-readable compatibility exports for registry and automation consumers."
---

## What does awesome-ai-plugins do?

awesome-ai-plugins is a DSH plugin discovery catalog, not an extension you install in DeepSeek Harness. It groups community plugins, Agent Skills, MCP servers, apps, and other agent tools in one place. Start with the dedicated harness section if you want to narrow the list to entries gathered for your client.

The catalog also covers assistants such as Claude Code, Codex, and Gemini CLI. That makes it useful when you work across clients, but a listing is not a promise of universal compatibility. Use the catalog to find candidates, then rely on the linked project to confirm what runs in your environment and how to set it up.

## awesome-ai-plugins core features

- **Dedicated DSH listings.** The `DeepSeek Harness Plugins` section gives you a starting point within Community Plugins, so you don't have to sift through entries organized around other assistants.
- **Agent Skills and MCP discovery.** The catalog includes extensions that use open formats as well as plugins built for specific clients. Check the project's supported-client list before choosing an installation method.
- **Searchable HOL Plugin Registry.** Use the registry when you already know a project name, or browse the README by section when you're comparing options.
- **Compatibility exports.** The repository includes `plugins.json` and `.agents/plugins/marketplace.json` for registry and automation consumers. For a manual install, go to the linked project for the setup steps rather than treating the export as an installer.

## How to install and use awesome-ai-plugins

There is no DSH install command for the catalog itself. You browse it in the repository README or the HOL Plugin Registry and install only the extension you choose.

1. In the README contents, open `DeepSeek Harness Plugins` under `Community Plugins`. If you already have an extension in mind, search for it in the registry instead.
2. Open the linked project and check its supported clients. If its examples are written for Claude Code or Codex, look for separate instructions for your harness rather than reusing those commands.
3. Follow the chosen project's installation guide. Check whether you're setting up a native plugin, a skill, or a server, since the catalog does not give them a shared installation procedure.
4. Apply settings where the project's guide directs you to put them. The catalog has no shared configuration file, and any profile or setup requirements belong to the extension you selected.

## How to troubleshoot awesome-ai-plugins

If an extension is missing after setup or reports an error, troubleshoot the installed project rather than the directory where you found it. Start by checking that the instructions you followed were for your client and for the extension format you chose.

- Confirm that you're running the same profile you used during setup and that the extension is enabled there.
- Restart DeepSeek Harness and check whether the extension now appears or behaves as documented.
- Check the installed versions against any requirements in the project's guide, then review the logs for details about what failed.

If you can't find instructions for your client, treat compatibility as unconfirmed. Choose an entry with documented setup rather than guessing a package name or borrowing another client's install command.
