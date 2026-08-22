# VWC — VitalOne

**VitalOne** is a hybrid cloud EHR for primary care combining the strengths of
athenaOne (clinical depth, revenue cycle, patient engagement) with the
flexibility of the Opti family (custom scheduling, cash/package/membership
billing, clinic throughput). It is being built as a commercial product and
proven first inside The Vital Wellness Center.

Concept page: https://thevitalwellnesscenter-ops.github.io/VWC/

## Two-track strategy

| Track | What | Where | License posture |
|---|---|---|---|
| A | Run the clinic now on **OpenEMR** | [`deploy/openemr/`](deploy/openemr/) | GPL — internal use; improvements contributed upstream |
| B | Build **VitalOne**, the product | [`vitalone/`](vitalone/) | Apache 2.0 foundation (Medplum) — sellable |

Full timeline, enrollment checklist, and licensing rationale: [`docs/PLAN.md`](docs/PLAN.md)

## Contents

- [`index.html`](index.html) — the VitalOne product concept page (also served via GitHub Pages)
- [`docs/PLAN.md`](docs/PLAN.md) — 6-week execution plan across both tracks
- [`deploy/openemr/`](deploy/openemr/) — Dockerized OpenEMR for internal clinic operations
- [`vitalone/web/`](vitalone/web/) — VitalOne React app on Medplum (FHIR-native backend)

## Quick start

```bash
# Track A — clinic system (needs Docker)
cd deploy/openemr && cp .env.example .env && docker compose up -d

# Track B — product app
cd vitalone/web && npm install && npm run dev
```
