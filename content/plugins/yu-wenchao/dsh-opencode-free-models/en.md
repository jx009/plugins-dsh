---
title: "dsh-opencode-free-models: Free Zen Models in DSH"
description: "dsh-opencode-free-models is a DSH plugin that adds free OpenCode Zen models. Learn how to install it, configure the backend, and fix missing models."
summary: "Choose an available OpenCode Zen model from the chat picker without signing in to Zen or entering an API key. The list updates automatically as availability changes."
highlights:
  - "Free OpenCode Zen models in chat"
  - "Automatic model list updates"
  - "No personal API key required"
  - "Desktop and Web support"
  - "Windows installer included"
faq:
  - q: "How do I install dsh-opencode-free-models on Windows?"
    a: "Download and extract the repository release, then run `one-click-install/install.bat`. If the installer finds more than one DeepSeek Harness installation, select the one you use and restart it when setup finishes."
  - q: "Can I install dsh-opencode-free-models on Linux or macOS?"
    a: "Yes. Copy the bundled plugin into the `web` profile's `node_modules` directory, add it to the profile's dependencies and bundle list in `package.json`, then restart DSH."
  - q: "Does dsh-opencode-free-models need an OpenCode Zen API key?"
    a: "No. The plugin supplies the public credential automatically for its free models, so you do not need to sign in to Zen or paste a personal key into the settings."
  - q: "Why did a model disappear from dsh-opencode-free-models?"
    a: "The picker follows the current backend catalog rather than keeping a permanent list. An individual model can become unavailable, and if the backend disables the provider, all of its entries disappear from the picker."
  - q: "Where do I change the backend URL for dsh-opencode-free-models?"
    a: "Edit `backendUrl` in the plugin configuration through DSH settings or `cordis.patch.yml`. If your change has no effect, check whether a profile or home configuration is overriding the bundle value."
---

## What does dsh-opencode-free-models do?

`dsh-opencode-free-models` is a DSH plugin that adds available free OpenCode Zen models to the DeepSeek Harness chat picker. It gets the catalog from a backend and registers the listed models under the `opencode-free` provider. To start a conversation, choose an `opencode-free/*` entry at the lower right of the message composer. You do not need a separate Zen login or a personal API key.

The catalog and chat requests take different paths: the configured backend supplies the model list, while conversations use the OpenCode Zen endpoint. The backend controls which entries are available, so the picker can change even when you have not updated the plugin.

## dsh-opencode-free-models core features

- **Automatic model sync.** The plugin checks the backend every 30 seconds and refreshes the picker as models are added, retired, or disabled.
- **Chat without a personal API key.** The provider supplies the public credential automatically. Leave API key fields alone when setting up these free models.
- **Desktop and Web support.** Both clients can use the registered models from the chat picker. A separate Free Models panel lets you browse the catalog.
- **Backend availability controls.** The backend operator can disable the provider, change the status of an individual model, or set an availability window. When the provider is disabled, its models are removed from the picker.

## How to install and use dsh-opencode-free-models

The README does not provide a `dsh plugin` install command. Use the bundled installer on Windows or register the plugin manually on macOS, Linux, or a server.

1. **Download the release.** Make sure DeepSeek Harness is already installed. Download the plugin package from the repository's Releases page and extract it to find the `one-click-install` folder.
2. **Install on Windows 10 or 11.** Open that folder and run `install.bat`. The script copies and registers the plugin. If it lists multiple installation directories, choose the one you actually launch.
3. **Install manually on macOS, Linux, or a server.** Copy `one-click-install/plugin/dsh-opencode-free-models/` to `<DSH_HOME>/profiles/web/node_modules/dsh-opencode-free-models/`. In that profile's `package.json`, add `dsh-opencode-free-models` to `dependencies` using the documented version `0.1.0`, and append its name to `dsh.profile.bundles`. Keep the other dependencies and bundles in place.
4. **Restart and select a model.** On Windows, accept the installer's restart prompt or quit the app completely, including its tray icon, before reopening it. In chat, open the model picker at the lower right of the composer, select an `opencode-free/*` entry, and send a message.
5. **Change settings only if needed.** The defaults require no setup. To point the plugin at your own backend, edit `backendUrl` in the plugin settings or `cordis.patch.yml`. Profile settings override bundle defaults, and home settings override profile settings.

## How to troubleshoot dsh-opencode-free-models

- **The Windows installer cannot find DSH.** Verify that the app is installed. If it is, set `DSH_HOME` to the root directory containing `profiles`, then rerun the installer.
- **No models appear after installation.** Check that DSH is running the profile where you installed the plugin and that the bundle is registered and enabled there. Restart the app fully. If the list is still empty, check the installed version and review the DSH logs.
- **An entry was visible but is now missing.** Check whether other `opencode-free/*` entries are still listed. One model may have been removed or reached the end of its availability window; the backend's global switch can remove the entire provider from the picker.
