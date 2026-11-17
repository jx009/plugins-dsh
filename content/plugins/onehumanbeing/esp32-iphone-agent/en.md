---
title: "esp32-iphone-agent: iPhone Control for DSH"
description: "esp32-iphone-agent is a DSH plugin that enables AI iPhone control. Learn hardware setup, model configuration and how to fix free-line errors."
summary: "Give an AI agent screen access and mouse-and-keyboard control of a real iPhone through an ESP32-S3 board. The phone runs the agent without a computer staying connected."
highlights:
  - "AirPlay screen capture"
  - "USB HID taps and typing"
  - "OpenAI-compatible vision models"
  - "Phone audio transcription"
  - "Run replay and trace export"
faq:
  - q: "How do I install esp32-iphone-agent for DeepSeek Harness?"
    a: "The supplied README does not provide a DSH installation command or identify an npm package. Its documented setup starts with flashing a Seeed XIAO ESP32S3 in Chrome or Edge, installing the iPhone app through TestFlight and completing the app's guided setup."
  - q: "Does esp32-iphone-agent need a Mac or a jailbroken iPhone?"
    a: "The documented phone-and-board workflow needs neither a Mac nor a jailbreak or developer account. It uses AssistiveTouch and USB mouse-and-keyboard input, and the computer does not need to remain connected during tasks."
  - q: "Which models can esp32-iphone-agent use?"
    a: "The app supports OpenAI-compatible vision models. The README also describes a shared free model line and an option to use your own API key under Settings › Model."
  - q: "How do I fix esp32-iphone-agent HTTP 503 errors?"
    a: "The shared free model line can become busy and return HTTP 503, causing tasks to stall or repeatedly fail. Switch to your own API key in Settings › Model to continue."
  - q: "Can esp32-iphone-agent export task history?"
    a: "Runs are stored on the phone and can be replayed step by step. Open Runs, select a run and use ⋯ → Export trace to export screenshots, actions and saved annotations for review by another agent."
---

## What does esp32-iphone-agent do?

esp32-iphone-agent is a DSH plugin project for AI control of a real iPhone through an ESP32-S3 board. It gives developers exploring mobile agents a way to connect screen observation with physical input: AirPlay supplies the view, USB HID supplies mouse and keyboard actions, and an iPhone app runs the model loop. The repository includes a DeepSeek Harness demo, although the supplied README excerpt does not document the harness installation procedure.

The documented standalone workflow uses an iPhone and a Seeed XIAO ESP32S3 costing about $7. It requires no jailbreak or developer account, and a computer does not need to stay connected while tasks run. Allow for several seconds per step, largely spent waiting for the model. The board occupies the phone's Wi-Fi connection, so model requests use cellular data.

## esp32-iphone-agent core features

- **AirPlay screen observation.** The board creates a hotspot and appears as `ESP32 Agent` in Screen Mirroring. It forwards H.264 video to the app over TCP port `7201`; decoding happens on the phone.
- **USB HID interaction.** With AssistiveTouch enabled, the board acts as a mouse and keyboard. The agent can tap, swipe, draw, type, press keys and return to the home screen.
- **OpenAI-compatible vision models.** The app sends screenshots to a vision model and coordinates planning with actions. It tracks the relative pointer and corrects its position before precise taps.
- **Phone audio understanding.** The board forwards AirPlay audio for transcription on the iPhone, supporting listening exercises and spoken prompts. The documented updates require board firmware `v0.2.4`.
- **Resumable runs and trace export.** The updated workflow removes the former 40-step limit and allows stopped runs to continue. Replay shows actions over the screen, while exported traces support analysis by another agent.

## How to install and use esp32-iphone-agent

No DSH installation command or confirmed npm package appears in the supplied material. Use the documented device setup below; harness-specific configuration is not included in this README excerpt.

1. Obtain a Seeed XIAO ESP32S3 and an iPhone running iOS 18 or later.
2. Open `https://handsy.tech/install` in Chrome or Edge and flash the board using the browser installer.
3. Install the app through the project's TestFlight link and follow its four guided setup steps. Enable AssistiveTouch as directed so USB mouse input can operate the phone.
4. Follow the app's connection guidance for the board hotspot and Screen Mirroring. Choose `ESP32 Agent` as the mirroring destination; cellular data carries the model requests while Wi-Fi connects to the board.
5. Configure your model in `Settings › Model`. If you want to use your own API key, this is also the location identified by the README.
6. Start a task in the app and review its progress. To inspect the result, open `Runs`, choose the run and replay its steps. Use `⋯ → Export trace` to retrieve screenshots, actions and saved annotations.

## How to troubleshoot esp32-iphone-agent

If every step fails or a run stalls on the free model line, check whether it is returning HTTP `503`. The shared service can be temporarily overloaded; the documented workaround is to switch to your own API key in `Settings › Model`.

A lost board, hotspot or mirroring connection pauses a run. Check those connections; the app is designed to resume from the same step once the link returns. For the documented audio and long-task updates, check the board firmware against `v0.2.4`.

For a separately configured DSH integration that does not appear, use general checks: confirm the active profile, verify that the plugin is enabled, restart the harness and inspect versions and logs. The supplied excerpt provides no specific harness error codes or configuration paths.
