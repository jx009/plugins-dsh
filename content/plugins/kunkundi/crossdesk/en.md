---
title: "crossdesk: Remote Desktop for DSH"
description: "crossdesk is a DSH plugin that connects agents to remote desktops. Learn setup requirements, MCP capabilities and connection troubleshooting."
summary: "Give agents access to remote computers through a local MCP service, with live monitoring and human takeover. CrossDesk also offers desktop, browser, mobile and terminal clients."
highlights:
  - "Agent access through local MCP"
  - "Live monitoring and human takeover"
  - "Multiple sessions and file tools"
  - "DeskHub multi-device desktop wall"
  - "LAN IP direct connections"
faq:
  - q: "How do I install crossdesk in DeepSeek Harness?"
    a: "The README says DSH uses one plugin package and points to apps/mcp/README.md for installation. The supplied excerpt does not include its package name or installation command, so consult that file before adding it."
  - q: "What can agents do with the crossdesk MCP integration?"
    a: "The local MCP service authorizes agents to observe and operate remote computers. The listed capabilities include live monitoring, human takeover, multiple sessions, clipboard access and file tools."
  - q: "Does crossdesk support Windows, macOS and Linux?"
    a: "The desktop client supports controlling and receiving connections on Windows 10+, macOS 14+ and Ubuntu 20.04+ with a glibc 2.31 baseline. Select the installer for your CPU architecture; these desktop requirements do not establish the MCP plugin's platform coverage."
  - q: "Can crossdesk connect over a LAN without cloud signaling?"
    a: "Compatible desktop clients can connect using an IP address, port and six-character password. Both machines must be reachable on the local network, and the default port is 52888."
  - q: "Why does crossdesk CLI connect without keyboard control?"
    a: "The terminal client starts in read-only mode with audio muted. Keyboard and mouse control must be enabled explicitly, and the remote computer must provide a capturable graphical session."
---

## What does crossdesk do?

crossdesk is a DSH plugin that gives agents access to remote computers through a local MCP service. It helps developers bring remote desktop observation and interaction into DeepSeek Harness while retaining live monitoring and human takeover. The integration lists multiple sessions, clipboard access and file tools among its capabilities.

The wider project is a cross-platform remote desktop system built on MiniRTC, with desktop, browser, mobile and terminal clients. The supplied README identifies MCP as a development feature and says it is used through source builds, while its platform table also describes a single-package DSH installation. Exact package details and integration instructions are delegated to `apps/mcp/README.md`, which is not included in the excerpt.

## crossdesk core features

- **Agent / MCP access:** A local service authorizes an agent to view and operate remote computers. Monitoring and human takeover support workflows where a person follows the remote session and takes control when needed.
- **Clipboard and file tools:** The MCP feature list includes clipboard and file operations. Separately, the desktop interface provides two-pane directory browsing, bidirectional file and folder transfers, drag-and-drop and transfer task management.
- **DeskHub desktop wall:** The desktop client groups live previews from multiple devices and lets users enlarge a view for control. It also supports group input and batch file distribution; closing the wall disconnects its remote connections.
- **LAN IP direct connections:** Compatible desktop clients connect using an address, port and password without cloud signaling. IPv4, IPv6 and reachable VPN interfaces are supported, with connection settings available in the desktop application.
- **Browser and terminal access:** A WebRTC-capable browser can act as a controller without a local desktop client. The CLI offers ANSI, Kitty and Sixel display modes and starts read-only with audio muted.

## How to install and use crossdesk

No DSH installation command is present in the supplied excerpt. Although it names `@chunkdash/crossdesk-cli`, that is the terminal client package; the excerpt does not identify it as the DSH plugin. Use the repository's `apps/mcp/README.md` for the plugin package, build instructions and configuration details.

1. Prepare the remote computer by installing the matching CrossDesk desktop release. Windows, macOS and Linux can receive connections; browser and mobile clients are controllers.
2. Start the remote application in ID mode. Wait for its server-connected status, then obtain the nine-digit device ID and current connection password from the local desktop panel.
3. Confirm a regular connection from another desktop, mobile client or browser by entering the ID and password. If using a self-hosted server, connect both ends to the same service.
4. Follow the MCP-specific instructions to set up the local service and DSH plugin. The excerpt does not specify a DSH configuration path, tool names or invocation syntax.
5. Use the documented agent integration for remote observation and operation, with monitoring and human takeover available. Check each client's supported features rather than assuming every desktop capability is exposed through MCP.

## How to troubleshoot crossdesk

On macOS, verify Screen Recording permission for capture and Accessibility permission for remote input. For CLI sessions, confirm that the remote machine has a capturable graphical session and that the signaling server supports temporary `cli` identity registration.

For desktop IP connections, enable the mode under Settings → General → Network Connection if its button is missing. Check reachability and the actual displayed port; disabling this setting stops listening and disconnects direct sessions.

If trusted-device restrictions are enabled, a password alone is insufficient: the controller must support the authentication protocol and be trusted. The README says current CLI and mobile clients do not implement it. For self-hosted device-key login, upgrade the server as instructed. For DSH loading issues, check the selected profile, plugin enablement, versions and logs, then restart the harness; the excerpt provides no plugin-specific error codes.
