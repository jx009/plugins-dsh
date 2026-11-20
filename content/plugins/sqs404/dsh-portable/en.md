---
title: "dsh-portable: Run DSH Without Installing"
description: "dsh-portable is a no-install Windows build of DeepSeek Harness. Learn how to set it up, configure your API key and port, and fix HTTP 401."
summary: "Unzip the release on a 64-bit Windows PC and launch the DSH web interface without installing Node.js. The runtime and its local data stay together in one folder you can copy to another supported PC."
highlights:
  - "Double-click launcher for 64-bit Windows"
  - "Bundled Node.js and official DSH package"
  - "Local data in a portable folder"
  - "Custom web port via port.txt"
  - "Automatic browser sign-in with a token"
faq:
  - q: "How do I install dsh-portable on Windows 11?"
    a: "On 64-bit Windows 11, download the release archive, extract it, and run the included executable. You do not need a separate Node.js installation or a DSH plugin command."
  - q: "Where do I enter my DeepSeek API key in dsh-portable?"
    a: "Enter it in the model service setup in the browser tab opened by the launcher. The web profile is initialized under `data/profiles/web` on first launch, so you do not need to create that directory yourself."
  - q: "Can I copy dsh-portable to another Windows PC?"
    a: "Yes. Copy the entire extracted folder to another 64-bit Windows 10 or 11 PC, not just the executable. Include the `data` folder if you want to take the existing local profile with you."
  - q: "Why does dsh-portable return 401 on localhost?"
    a: "Opening the plain localhost URL before your browser has a session can return HTTP 401. Use the tab opened by the executable so the browser can exchange the one-time token for a session cookie."
  - q: "Can I run dsh-portable without internet access?"
    a: "The launcher and initial web profile setup work offline. Calls to a model API and online searches still require a network connection."
---

## What does dsh-portable do?

dsh-portable is an unofficial portable distribution of DeepSeek Harness for 64-bit Windows 10 and 11, not a DSH plugin installed into an existing profile. It pairs the official npm release with a bundled Node.js runtime and a Windows launcher, so you can run the web interface from an extracted folder without installing either component separately.

The whole folder is the portable unit. You can copy it to another supported PC to take the runtime and local data with you. The bundle does not make the model API local: you can start the interface without a connection, but calling a hosted model or using online search still requires one.

## dsh-portable core features

- **Bundled Windows runtime.** The launcher starts the included Node.js executable with the official DSH package. The shipped dependency tree uses ordinary directories rather than junctions or symbolic links, so extracting or copying the folder does not break those links.
- **Folder-local data.** The launcher sets `DSH_HOME` to its own `data` directory instead of using the Windows user profile. On first launch, the web runtime initializes the `data/profiles/web` profile without downloading anything.
- **Configurable web port.** The web interface uses port `3081` by default. A `port.txt` file next to the executable lets you choose a different port.
- **Browser authentication.** The launcher reads the one-time sign-in URL from the runtime and opens it in your browser. The browser exchanges the token for a session cookie, and runtime output is written to `dsh-console.log`.

## How to install and use dsh-portable

There is no DSH installation command for this project. For normal use, download the latest archive from the repository's Releases section rather than building the launcher from source.

1. Extract the entire archive to a folder on a supported Windows PC. Keep the launcher alongside the bundled runtime and dependencies.
2. Double-click the included DeepSeek Harness launcher. It starts the local service and opens the web interface in your browser.
3. Follow the on-screen model service setup. If you are using the DeepSeek API, enter your DeepSeek API key there. Start in a test directory, since an agent can modify files and execute commands.
4. To change the port, create `port.txt` next to the launcher, put the desired port number in it, and restart. To stop the service, close the console window opened by the launcher.

If you prefer to start the web runtime manually, open a terminal in the extracted folder and run `node.exe node_modules\@deepseek-ai\dsh\lib\bin.js web`. The executable is the usual entry point when you want it to open the authenticated browser URL for you.

## How to troubleshoot dsh-portable

- **HTTP 401 when you type the local address.** Use the browser tab opened by the launcher instead of going straight to `http://127.0.0.1:3081`. The plain address does not carry the one-time token needed to establish a browser session.
- **The page opens but model calls do not work offline.** Check the network connection before changing the local setup. Starting the bundled runtime and reaching a model API are separate operations.
- **The launcher does not behave as expected.** Confirm you are on 64-bit Windows 10 or 11 and that the full archive was extracted. Restart the launcher and review `dsh-console.log` for runtime output. Note which release you are running when comparing behavior across builds, since upstream is a developer preview and may introduce breaking changes.
