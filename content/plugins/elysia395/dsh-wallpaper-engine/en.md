---
title: "dsh-wallpaper-engine: Live Wallpapers for DSH"
description: "dsh-wallpaper-engine is a DSH plugin that plays Wallpaper Engine scenes and videos behind DeepSeek Harness. Learn how to install it and fix render issues."
summary: "An appearance plugin that plays Wallpaper Engine projects and your own images or videos behind the DSH interface. It registers no agent tools, so it adds no token overhead."
highlights:
  - "Scene, Web and Video wallpapers"
  - "Liquid glass panels and custom fonts"
  - "Mascots, avatars and pointer effects"
  - "Zero model token overhead"
  - "Shareable appearance presets"
faq:
  - q: "How do I install dsh-wallpaper-engine in DeepSeek Harness?"
    a: "Close DSH completely, then run `dsh plugin --profile web add dsh-plugin-wallpaper-engine`. Use the `desktop` profile instead of `web` for the desktop host. The README asks for Node.js 22.12.0 or later, a DSH 0.2 kernel and pnpm."
  - q: "Does Wallpaper Engine have to be running for dsh-wallpaper-engine?"
    a: "No. Scene wallpapers are rendered by the plugin's built-in WebWallGL engine, so no Wallpaper Engine process is needed. On macOS, where there is no Wallpaper Engine client, you upload files or point the plugin at project folders."
  - q: "Does dsh-wallpaper-engine use up model tokens?"
    a: "No. It registers no agent tools and injects no prompt text, so it adds no model token cost. Settings are stored on the host side."
  - q: "Which wallpapers does dsh-wallpaper-engine not support?"
    a: "Application wallpapers. They would require launching third-party executables, so they never appear in the library or in rotation lists."
  - q: "Can I turn off the liquid glass look in dsh-wallpaper-engine?"
    a: "Yes. Liquid glass ships as a separate subpackage, `wallpaper-engine-glass`. Disable it in the plugin manager and the interface returns to the native look while wallpapers, fonts and mascots keep working."
  - q: "Does dsh-wallpaper-engine work on Windows, macOS and Linux?"
    a: "Yes. The same package and the same command install it on all three platforms."
---

## What does dsh-wallpaper-engine do?

dsh-wallpaper-engine is a DSH plugin that puts animated wallpapers behind the DeepSeek Harness chat interface. It reads Wallpaper Engine projects stored on your computer, renders them inside DSH, and layers appearance options on top: liquid glass panels, custom fonts, mascots and shareable presets.

The plugin only changes how DSH looks. It gives the agent no new tools and adds no text to prompts, so your conversations cost exactly the same number of tokens as before. Settings are saved on the host side and apply the moment you change them.

It is built for people who keep DSH open for long stretches and want the workspace to match the rest of their desktop. One npm package covers Windows, macOS and Linux.

## dsh-wallpaper-engine core features

- **Scene wallpapers**: rendered in real time by the built-in WebWallGL engine, with particles, puppet rigs, SceneScript, audio response and mouse interaction. If rendering fails, it falls back to an embedded video or a static frame.
- **Web and Video wallpapers**: Web wallpapers run sandboxed with a Wallpaper Engine API shim; videos play with optional transcoding, an fps cap and pause-when-hidden to save power.
- **Your own files**: upload JPG, PNG or MP4 files, or point the plugin at a Wallpaper Engine project folder. Files stay on your machine.
- **Liquid glass**: glass styling for the settings window, conversation area and sidebar, with adjustable color, transparency, blur, borders and fonts.
- **Extras**: mascots, conversation avatars, click and pointer-trail effects, and 3D parallax.
- **Library tools**: filters, hide and restore, automatic rotation, and import or export of a whole look as a preset.

## How to install and use dsh-wallpaper-engine

1. Check the requirements: Node.js 22.12.0 or later, a DSH 0.2 kernel and pnpm.
2. Close DSH completely.
3. Install the plugin. Use `desktop` instead of `web` for the desktop host:

   ```bash
   dsh plugin --profile web add dsh-plugin-wallpaper-engine
   ```

4. Start DSH and open Settings → Wallpaper Engine → Library. Pulling the mascot cord above the chat opens the same panel.
5. Pick a thumbnail, then adjust playback and appearance. Changes apply immediately.
6. Use pause and play to control the current wallpaper. Clearing the current wallpaper never deletes the source file.

## How to troubleshoot dsh-wallpaper-engine

- **The plugin does not appear after installing.** Install with DSH fully closed, confirm you used the profile you actually run (`web` or `desktop`), then start DSH again. Check that Node.js is 22.12.0 or newer and that DSH is on a 0.2 kernel.
- **A Scene wallpaper looks wrong or shows a still frame.** Scene rendering depends on browser WebGL and graphics drivers, and complex Workshop projects may not match the original exactly. When WebGL fails, the plugin falls back to a video or static frame; updating graphics drivers or picking a simpler scene usually helps.
- **A wallpaper is missing from the library.** Application wallpapers are never listed because they would need to run third-party executables.
- **Video wallpapers use too much CPU or GPU.** Lower the fps cap so the video is transcoded, and keep pause-when-hidden turned on.
- **You want the default DSH look back.** Disable the `wallpaper-engine-glass` subpackage in the plugin manager, or clear the current wallpaper.

Note that the plugin code is MIT licensed, but wallpaper, character and font assets may carry their own licenses.
