---
title: "Academic Paper Search: Find and Verify with DSH"
description: "nature-academic-search is a DSH plugin for finding papers and checking citations. Learn how to install the bundle, configure PubMed, and diagnose errors."
summary: "Turn a research question into a deduplicated reading list, check which citations match their source records, and export references for Zotero or EndNote."
highlights:
  - "Deduplicated searches across five academic sources"
  - "PubMed MeSH term lookup"
  - "Field-level DOI and PMID verification"
  - "Reference and citing-paper graphs"
  - "Reference exports with search audit records"
faq:
  - q: "How do I install nature-academic-search on DeepSeek Harness?"
    a: "Use the separate `wp-a/dsh-academic-paper-search` bundle and follow its repository instructions for your setup. The upstream README does not provide a DSH install command, and the Python package is not a substitute for the bundle."
  - q: "What databases does nature-academic-search search by default?"
    a: "The default sources are CrossRef, PubMed, arXiv, OpenAlex, and Europe PMC. You can limit a query to selected sources, and the service can use Semantic Scholar when requested."
  - q: "Can nature-academic-search use a Chinese question to build a PubMed query?"
    a: "Yes. Ask it to turn your question into English search terms, check the corresponding MeSH headings, and combine those headings with title and abstract keywords for PubMed."
  - q: "Why does nature-academic-search report a citation mismatch when the DOI works?"
    a: "A DOI can resolve successfully while pointing to a different paper. Give the tool the title, author, year, and journal you expect so it can show which fields disagree with the source record."
  - q: "Why are nature-academic-search tools missing in DSH if preflight passes?"
    a: "The preflight check tests access to academic APIs, not whether DeepSeek Harness loaded the MCP tools. Check that the bundle is enabled in your active profile, then restart the harness and look for the `mcp__academic_search__` prefix in a new session."
  - q: "Can nature-academic-search find recruiting clinical trials?"
    a: "Yes. Select trial search to query ClinicalTrials.gov and use the returned recruitment status to identify relevant NCT records. Verify any linked publications separately, since a registry entry is not evidence of a treatment outcome."
---

## What does nature-academic-search do?

nature-academic-search is a DSH plugin for finding academic papers and verifying citations, available in DeepSeek Harness through a separate bundle. It helps you turn a research question into a search, combine results from multiple databases, and check candidate references against source metadata. The word `nature` in the name does not restrict the search to Nature journals or imply an affiliation with Nature Portfolio.

The results can include source information, reference files for Zotero or EndNote, and an audit record of the query, search time, and sources that failed. Keep that record if you need to review how a reading list was assembled. Databases change, so rerunning a saved query later may produce a different list.

## nature-academic-search core features

- **Multi-source paper search.** Search CrossRef, PubMed, arXiv, OpenAlex, and Europe PMC together or choose a subset. The `rows` limit applies to each source, so filtering and deduplication can leave fewer results than the combined limits suggest.
- **MeSH lookup.** Check official subject headings before combining them with free-text terms for a PubMed query. Keep database-specific syntax out of queries sent to other sources.
- **Citation verification.** Look up a DOI or PMID and pass the expected bibliographic details to `get_paper_by_id`. Compare the returned fields rather than treating a resolvable identifier as proof that the citation is correct.
- **Citation graphs.** Trace a paper's references and the later papers that cite it. The tool returns structured graph data; rendering a visual graph is a separate step.
- **Clinical trial search.** Set `entity_type` to `trial` to retrieve ClinicalTrials.gov records. Keep NCT registry entries separate from published papers, and verify any linked publications by their own identifiers.

## How to install and use nature-academic-search

Install the separate `dsh-academic-paper-search` bundle using the instructions in the `wp-a/dsh-academic-paper-search` repository. That repository is the reference for current requirements, release availability, and configuration. The upstream project does not document a DSH install command, so do not use its Codex or Claude Code commands for this setup.

1. Follow the bundle's setup instructions. For PubMed requests, make sure the environment that launches the client can read `PUBMED_EMAIL`. A desktop launcher may not inherit a variable exported in your terminal.
2. Open a new DSH session and check for tools with the `mcp__academic_search__` prefix. The optional model relay is not required for academic search, metadata verification, or citation downloads.
3. Ask a narrow first question. For example: `Find papers on generative AI in medical education. Search the default sources, deduplicate results, and verify the title, first author, and year of three candidates by DOI or PMID. Report which sources failed.` Look for actual tool calls and field-level comparisons, not just a list of titles generated by the model.

## How to troubleshoot nature-academic-search

- **Tools are missing.** Confirm you are using the intended DSH profile and that the bundle is enabled there. Restart DSH, open a new session, and check the installed bundle version and startup logs if the tools still do not appear.
- **PubMed or another source fails.** Check whether the launcher passes through your contact email for PubMed. The Python service's `preflight` report distinguishes successful, failed, and skipped checks; it tests API connectivity, not whether DSH has loaded the integration.
- **A citation resolves but does not verify.** Review the fields reported as conflicting and follow the source metadata before exporting the reference. If a database failed, keep that gap in the search record rather than interpreting it as a source with no matching papers.
