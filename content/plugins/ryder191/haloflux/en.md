---
title: "haloflux: Sci-Fi Backgrounds for DSH"
description: "haloflux powers a DSH plugin with sci-fi visuals driven by agent sessions. Learn browser setup, wallpaper installation and audio troubleshooting."
summary: "A Canvas light-ring visualization with live controls and desktop wallpaper editions. Community plugins bring its visuals into DSH as a session-driven background."
highlights:
  - "Session-driven backgrounds through community plugins"
  - "56 live visual controls"
  - "JSON settings import and export"
  - "Wallpaper Engine and Lively Wallpaper"
  - "Adaptive mobile Canvas edition"
faq:
  - q: "How do I install haloflux in DeepSeek Harness?"
    a: "The upstream README points to Ke-wood/dsh-haloflux for the DSH integration, plus a community version maintained by Michael-ZAG. It provides no DSH installation command or confirmed npm package, so follow the chosen plugin repository's instructions."
  - q: "How do I change haloflux colors and animation settings?"
    a: "Open the browser edition's CONSOLE panel or press C to access 56 controls. Settings can be transferred as JSON, and Save as default stores your adjustments in the current browser."
  - q: "Why does haloflux have no background music?"
    a: "Browsers block playback before the first user interaction, so click, tap or press a key to start it. Then check the BGM toggle and volume slider; M also toggles music."
  - q: "Can I use haloflux with Wallpaper Engine without Steam Workshop?"
    a: "Yes, the README supplies a downloadable wallpaper archive for manual installation. Place its HALOFLUX folder under projects\\myprojects and fully restart Wallpaper Engine."
  - q: "Is haloflux allowed in commercial projects?"
    a: "The supplied README restricts the project to noncommercial use and says no commercial licenses are offered. Sharing screenshots or videos also requires source attribution in the post itself."
---

## What does haloflux do?

haloflux is a Canvas sci-fi visualization that provides the visual foundation for a community DSH plugin. The upstream project draws a woven light core, rotating data panels and outward beams; the separate integration turns these visuals into a background driven by the current agent session. For developers looking for haloflux for DeepSeek Harness, this distinction determines which project to install.

Ryder191/haloflux supplies the browser artwork and wallpaper editions. Its README links to Ke-wood/dsh-haloflux, which adds the session connection and a settings page, and Michael-ZAG/dsh-haloflux, a separately maintained version based on v0.7.1 with HUD changes and stability improvements.

The supplied license terms allow noncommercial study, hobby projects and private entertainment. Commercial use is prohibited. When publishing screenshots or recordings, include the source repository in the post caption, title or description; a comment alone does not satisfy the stated attribution requirement.

## haloflux core features

- **Beat-driven Canvas animation:** An uneven timing clock drives ring stops, bursts and drifting motion. Twelve micro-panel designs and five beam layers build the surrounding field.
- **Live visual controls:** The browser console exposes 56 parameters, including tempo, rotation, glow and depth. Automatic camera movement spans seven shots.
- **Portable settings:** Export and import adjustments as JSON, or store a default in the current browser. URL presets select the built-in dark and bright appearances.
- **Desktop wallpaper editions:** Wallpaper Engine and Lively Wallpaper are supported. The wallpaper edition works offline and pauses visuals and music when covered by a fullscreen application.
- **Mobile entry point:** The main HTML entry selects the mobile edition on touch devices. That edition adapts to portrait or landscape and uses a lighter particle load.

## How to install and use haloflux

No DSH installation command or npm package is documented in the supplied README. For the agent-session background, open the listed community plugin repository and follow its installation and configuration instructions. The upstream HTML files provide a separate way to try the visuals.

1. Download the repository files and open `index.html` in Edge, Chrome or Safari. Use `lab.html` directly for the desktop console or `mobile.html` for the adaptive edition.
2. Double-click or press `F` for fullscreen. Open `CONSOLE`, or press `C`, to tune the browser visualization.
3. Export your settings as JSON before transferring them elsewhere. Use Save as default for local persistence, or append `?preset=a` or `?preset=b` to select a built-in preset.
4. Click, tap or press a key to start background music. Use `BGM` or `M` to toggle it, then adjust the volume slider.

For Wallpaper Engine, download `HALOFLUX-wallpaper-engine.zip` from the repository's releases and extract it. Through Steam, browse Wallpaper Engine's local files and place the entire `HALOFLUX` folder inside `projects\myprojects`. The resulting file must be `projects\myprojects\HALOFLUX\project.json`. Fully quit the application from its tray icon, restart it and select the wallpaper from Installed.

To edit that edition, use Open Wallpaper → Open from file and select its `project.json`. For Lively Wallpaper, choose Add wallpaper and enter `https://ryder191.github.io/haloflux/wallpaper/`.

## How to troubleshoot haloflux

If music displays `CLICK / TAP TO PLAY`, interact with the page first, then check the music toggle and volume. Each browser remembers its own volume setting.

If Wallpaper Engine does not list the wallpaper, check for an extra nested folder and confirm the `project.json` path above. Fully quit and restart the application after copying the files. Pausing behind a fullscreen application is expected behavior.

For a missing DSH background, use general integration checks: confirm the active profile, verify that the community plugin is enabled, restart the harness, and inspect plugin versions and logs. The upstream README does not document integration-specific errors or configuration keys.
