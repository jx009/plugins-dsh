---
title: "deepwiki-rs: C4 Documentation for DSH"
description: "deepwiki-rs is a documentation tool for DSH users generating C4 architecture docs. Learn setup prerequisites, core uses and troubleshooting checks."
summary: "Turn source code into structured architecture documentation, C4 diagrams and repository knowledge. Litho also supports external knowledge sources and SQL schema documentation."
highlights:
  - "C4 architecture documentation"
  - "PDF, Markdown and SQL knowledge sources"
  - "Database schema and ERD generation"
  - "Git history analysis"
  - "CI/CD documentation workflows"
faq:
  - q: "What does deepwiki-rs generate from source code?"
    a: "It generates architecture documentation organized around the C4 model, including context, container, component and code-level views. It also extracts code structures, comments and relationships."
  - q: "Does deepwiki-rs support Python and JavaScript?"
    a: "The README lists Python and JavaScript among its supported languages. It also names Rust, Java, Go and C#, although the supplied excerpt does not describe coverage differences."
  - q: "Can deepwiki-rs use PDF documents as context?"
    a: "Yes, external knowledge integration supports PDF, Markdown and SQL sources. These sources provide additional information for codebase analysis."
  - q: "Can deepwiki-rs generate database ERD diagrams?"
    a: "The README describes database schema documentation and ERD generation for SQL projects. This complements its architecture documentation capabilities."
  - q: "How are deepwiki-rs and Terrain related?"
    a: "Litho, the project name used by deepwiki-rs, remains focused on C4 documentation generation. Terrain builds on it with knowledge synchronization and ACP access for agents, including DeepSeek Harness."
---

## What does deepwiki-rs do?

deepwiki-rs, also called Litho, is an AI-powered source-code documentation tool that can provide architecture knowledge for DeepSeek Harness users. It helps developers, architects and technical leads turn repository contents into structured explanations of a system. The supplied README establishes its documentation capabilities, but does not provide a native DSH plugin installation procedure.

Its main output follows the C4 model: context, container, component and code-level documentation. These views help teams understand system boundaries and internal relationships, giving new contributors and code reviewers architectural context alongside the source itself.

The project is implemented in Rust and distributed under the MIT license. The README also introduces Terrain as its successor in the broader agent ecosystem. ACP access for agents belongs to that Terrain description; it should not be treated as a confirmed integration feature of this repository.

## deepwiki-rs core features

- **C4 architecture documentation**: Analyze source code and produce documentation with context, container, component and code views. Extracted comments, structures and relationships contribute to the resulting explanations.
- **External knowledge integration**: Add PDF, Markdown and SQL documents as knowledge sources to enrich analysis. This supports context that lives outside the codebase itself.
- **Database schema and ERD generation**: Generate schema documentation and entity relationship diagrams for SQL projects. Database structure can therefore be documented alongside application architecture.
- **Multi-language analysis and templates**: The README names Rust, Python, Java, Go, C# and JavaScript. A customizable template system controls documentation output, although the excerpt does not include template configuration examples.
- **Git history and CI/CD workflows**: Analyze repository history to trace architectural evolution and incorporate documentation generation into automated pipelines. Cross-references connect code elements with documentation.

## How to install and use deepwiki-rs

No verified DSH installation command is available in the supplied README excerpt, and no npm package name was identified. The excerpt references a crates.io package, but does not include an installation command or the runtime configuration instructions needed for a reproducible setup.

1. Consult the repository's complete English or Chinese documentation for installation instructions. Confirm the executable, prerequisites and options for the version you intend to use before running it.
2. Choose the repository you want to document. The stated language support includes several common backend and frontend languages, so identify the relevant source files before configuring analysis.
3. Decide whether external PDF, Markdown or SQL knowledge is needed. Follow the full documentation for source mounting and template settings; their configuration locations are absent from this excerpt.
4. Generate and review the architecture documentation. For a SQL project, review the schema and ERD output as well as the application views.
5. If repeated generation is useful, consult the project's CI/CD guidance. The README lists pipeline integration but supplies no workflow file in the provided material.

Litho Book is a complementary reader for generated documentation. Its listed capabilities include Markdown rendering, Mermaid diagrams, fuzzy search and AI-assisted document interpretation. It is a separate ecosystem tool.

## How to troubleshoot deepwiki-rs

The supplied excerpt contains no documented error messages or fixes. Start with general checks: record the version, inspect execution logs and compare your configuration with the documentation for that release.

For a separately configured harness integration, confirm the intended profile, check that the relevant plugin is enabled and restart DSH after changes. These checks do not establish that Litho itself has a native plugin package. If you need ACP-based agent access, consult Terrain's instructions, where that capability is described.
