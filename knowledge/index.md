---
okf_version: "0.1"
title: Knowledge Catalog
description: Open Knowledge Format (OKF) bundle for Next.js starter — architecture, governance, APIs, database, and features.
tags: [knowledge, nextjs, architecture, governance]
timestamp: 2026-08-23T00:00:00Z
---

# Knowledge Catalog

Open Knowledge Format (**OKF v0.1**) repository for architecture specifications, governance policies, and task lifecycles.

## Directory Map

```
knowledge/
├── index.md                    # Root catalog index
├── governance/                 # Canonical policies and quality rules
├── architecture/               # System architecture and ADRs
├── features/                   # Feature specifications (dual problem/solution artifacts)
├── fixes/                      # Bugfix specifications (dual problem/solution artifacts)
├── api/                        # API schemas, endpoints, and contracts
├── database/                   # Database schemas and data models
├── security/                   # Security audits, threat models, compliance
├── templates/                  # Scaffolding templates for features, fixes, and RFCs
└── guides/                     # Implementation guides
```

## Quick Navigation

### Governance
* [Documentation Policy](governance/documentation-policy.md)
* [Git Monorepo Policy](governance/git-monorepo-policy.md)
* [Frontend UI Policy](governance/frontend-ui-policy.md)
* [Security Quality Policy](governance/security-quality-policy.md)
* [PR Policy Source of Truth](governance/pr-policy-source-of-truth.json)

### Architecture
* [Architecture Index](architecture/index.md)
* [Architecture Overview](architecture/architecture-overview.md)
* [State Machine](architecture/state-machine.md)
* [Auth Flow](architecture/auth-flow.md)
* [Session Model](architecture/session-model.md)
* [Threat Model](architecture/threat-model.md)
* [Toolchain Policy](architecture/toolchain-policy.md)
