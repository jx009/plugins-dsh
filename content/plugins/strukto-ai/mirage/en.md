---
title: "mirage: Virtual Terminal for DSH Agents"
description: "mirage is a virtual terminal for AI agents in the DSH plugin catalog. Learn how to set up a workspace, configure mounts, and check access errors."
summary: "Give agents one shell for mounted data and virtual CLI tools while controlling which files they see, which commands they run, and where those commands execute."
highlights:
  - "Virtual filesystem mounts for S3 and Slack"
  - "Virtual CLIs with separate credentials"
  - "Command routing to configured runtimes"
  - "Profile-based path and command controls"
  - "Command tracing with OpenTelemetry"
faq:
  - q: "How do I install mirage in DeepSeek Harness?"
    a: "The repository excerpt does not document a DSH plugin install command. It lists `mirage-ai` for Python and `@struktoai/mirage-node` for TypeScript, but neither is identified as a DSH plugin package."
  - q: "Can mirage search S3, Slack, and Gmail together?"
    a: "Yes. The README demonstrates one `grep` invocation over all three services after each is mounted under its own path."
  - q: "Do mirage virtual CLIs need to be installed on each machine?"
    a: "Not for the virtual CLIs Mirage implements, such as `slack`. Mirage handles those commands itself and can expose the same tool under multiple names with separate credentials."
  - q: "Why does mirage say a file does not exist when it is in S3?"
    a: "A session profile can hide a path, making it appear absent from the agent's shell. The README demonstrates this with a file under `/s3/secrets`."
  - q: "Can mirage send command traces to OpenTelemetry?"
    a: "Yes. Mirage records agent commands and can send them as traces to an OpenTelemetry backend."
---

## What does mirage do?

mirage is a virtual terminal for AI agents listed in the DSH plugin catalog. It separates the shell an agent sees from the services that hold its files and the machines that execute its commands. Developers can give an agent a single terminal for working with data spread across services, without treating one machine as the home for every file, tool, and runtime. The repository describes how to embed the terminal in an application, but the README excerpt does not document a native DeepSeek Harness installation.

## mirage core features

- **Virtual filesystem mounts.** Bring sources such as S3, Slack, Gmail, and Google Drive under separate paths in one filesystem. The agent can use familiar commands such as `ls`, `find`, and `grep` instead of switching to a different interface for each source.
- **Virtual CLIs.** Mirage handles supported tools such as `slack` itself, so those commands do not need a matching executable on each configured machine. One tool can also be exposed under different names with separate credentials.
- **Command routing.** Define which machine or runtime handles a command separately from where its files are mounted. The Python example uses an in-process Monty runtime and routes commands involving NumPy to an E2B sandbox.
- **Profile-based access.** Define which paths a session can see and which commands it can run. Workspace rules can also specify commands that need approval and limit the amount of output returned to an agent.
- **Command records and tracing.** Mirage records each command an agent runs and can forward traces to an OpenTelemetry backend. Workspace snapshots are also supported.

## How to install and use mirage

No DSH installation command is documented in the supplied README excerpt. For application setup, the README points to a Python quickstart for `mirage-ai` and a TypeScript quickstart for `@struktoai/mirage-node`. These are application packages, not confirmed targets for the DeepSeek Harness plugin installer.

1. Choose the quickstart for your application language. In the documented Python flow, start by defining a `Workspace` in application code.
2. Configure the services and paths you want the session to see. The example mounts S3, Slack, and Gmail separately, each with its own mount mode. Configure any virtual CLI the session needs separately from its filesystem mounts.
3. Define a session profile with the intended path and command rules. If your workspace uses multiple runtimes, configure the machines and the routing policy in the workspace, then start a session with the intended profile.
4. Verify the setup from that session with a read-only operation. For example, use `ls /s3` to check the mount, then try `grep` across the mounted sources to verify what the agent can search from one shell.

## How to troubleshoot mirage

- **A known file appears to be missing.** Check the mount path and the profile attached to the Mirage session. In the README example, a hidden S3 path produces a file-not-found message even though the problem is visibility, not necessarily storage.
- **A virtual CLI returns `Permission denied`.** Check the profile's command rules before changing the service credentials. The example explicitly blocks Slack message sending while still making the Slack CLI available.
- **A command runs in the wrong runtime.** Compare the command with the machine configuration and routing rule. In the Python example, the routing decision depends on whether the command line contains `numpy`, so check the actual command the session submitted.
