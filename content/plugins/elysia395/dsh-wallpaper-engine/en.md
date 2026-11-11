---
title: "dsh-wallpaper-engine: live wallpapers for DSH"
description: "dsh-wallpaper-engine shows local Wallpaper Engine Scene, Web and Video wallpapers inside DeepSeek Harness, with liquid glass, fonts and mascots."
summary: "An appearance plugin that plays Wallpaper Engine projects and your own images or videos behind the DSH interface. It registers no agent tools, so it adds no token overhead."
highlights:
  - "Scene, Web, Video wallpapers"
  - "Liquid glass interface"
  - "Mascots and pointer effects"
  - "No model token overhead"
  - "Preset import and export"
faq:
  - q: "Does Wallpaper Engine have to be running?"
    a: "Not for Scene wallpapers: they are rendered by the plugin's built-in WebWallGL renderer, and the README says no Wallpaper Engine process is required. On macOS, where there is no Wallpaper Engine client, you upload files or point the plugin at project directories."
  - q: "Does the plugin use up model tokens?"
    a: "No. According to the README it registers no agent tools and no prompt text, so it adds no model token overhead."
  - q: "Which wallpaper types are not supported?"
    a: "Application wallpapers. They would require launching third-party executables, so they never appear in the library or in rotation lists."
---

## What does dsh-wallpaper-engine do?

dsh-wallpaper-engine puts animated wallpapers behind the DeepSeek Harness interface. It reads Wallpaper Engine projects stored on your computer, renders them inside DSH, and adds appearance options such as liquid glass panels, custom fonts and mascots.

The plugin only changes how DSH looks. It does not give the agent new tools and does not add text to prompts. Settings are saved on the host side and apply as soon as you change them. It is meant for people who keep DSH open for long stretches and want the workspace to match the rest of their desktop.

## Core features

- **Wallpaper types**: Scene wallpapers through a built-in WebWallGL renderer with a fallback chain, Web wallpapers with a Wallpaper Engine API shim and sandboxing, and Video wallpapers with transcoding, an fps cap and pause control.
- **Local uploads**: use your own JPG, PNG or MP4 files, or the image folder of a Wallpaper Engine preset project. Files stay on your machine.
- **Liquid glass**: glass styling for settings, conversation and sidebar, with colors, transparency, blur, borders and fonts. It ships as a separate subpackage, `wallpaper-engine-glass`, that can be disabled on its own.
- **Extras**: mascots, conversation avatars, click and pointer-trail effects and 3D parallax.
- **Library tools**: filters, hide and restore, rotation lists, and import or export of a whole configuration as a preset.

## How to use dsh-wallpaper-engine

1. Check the requirements in the README: Node.js 22.12.0 or later, a DSH 0.2 kernel, and pnpm.
2. Close DSH completely before installing.
3. Add the plugin with the install command shown on this page. For the desktop host, use the `desktop` profile in place of `web`.
4. Start DSH and open Settings, then Wallpaper Engine, then Library. Pulling the mascot cord above the chat opens the same panel.
5. Pick a thumbnail and adjust playback and appearance. Changes apply immediately.
6. Use pause and play to control the current playback. Clearing the current wallpaper does not delete the source file.

Scene rendering depends on browser WebGL and graphics drivers, so complex workshop projects may look different from the original. The plugin code is MIT licensed; wallpaper, character and font assets may carry other licenses.
