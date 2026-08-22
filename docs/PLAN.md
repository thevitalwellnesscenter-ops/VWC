# VitalOne execution plan

Two tracks run in parallel. Track A makes the practice operational inside
4–6 weeks on proven open source. Track B builds VitalOne, the product we
sell, on a permissively licensed foundation. The practice is customer zero:
everything learned running Track A becomes requirements for Track B.

## Why two tracks (and two licenses)

| | Track A — OpenEMR | Track B — VitalOne on Medplum |
|---|---|---|
| Purpose | Run the clinic now; learn the workflows | The commercial product |
| License | GPL — internal use/hosting fine; distributed changes must be open-sourced | Apache 2.0 — proprietary product on top is allowed |
| Timeline | Live in weeks 1–2, tuned by week 6 | MVP at week 6, insurance-grade in phase 2 |
| Where | `deploy/openemr/` | `vitalone/` |

Rule of thumb: anything we would ever sell goes in `vitalone/`. OpenEMR
customizations stay configuration-level where possible; real code
improvements to OpenEMR get contributed upstream.

## Start-immediately checklist (longest lead times, outside our control)

- [ ] Clearinghouse enrollment (Availity / Office Ally / Claim.MD) + payer enrollments — 2–6 weeks
- [ ] e-Prescribing vendor (DoseSpot, mdToolbox, …) contract + identity proofing — weeks; longer for EPCS
- [ ] Lab interface (Quest/Labcorp direct or Health Gorilla) — weeks
- [ ] Cloud account with signed BAA (AWS/Azure/GCP) for anything touching PHI
- [ ] Payment processor with healthcare support (e.g. Stripe) for cash/packages

## Six-week timeline

### Weeks 1–2 — Track A live
- Deploy OpenEMR (`deploy/openemr/`), TLS, backups, user accounts, audit logging.
- Configure facility, providers, schedules, visit types, note templates, cash fee sheet.
- Enable patient portal. Begin staff training on test patients.
- Track B: stand up Medplum project (cloud or self-hosted), define FHIR profiles
  for the practice's core resources, wire auth into the `vitalone/web` scaffold.

### Weeks 3–4 — Practice running, product taking shape
- Track A: go live with real scheduling + charting + cash billing. Collect
  friction notes from staff — these are VitalOne requirements.
- Track B: build VO-FLOW (scheduling with resource booking) and VO-CLIN
  (charting with templates) against Medplum; seed with synthetic data.

### Weeks 5–6 — Fully functional internally, MVP demo externally
- Track A: connect clearinghouse/e-Rx as enrollments land; tune templates.
- Track B: VO-REV cash/package/membership billing; VO-INSIGHT basic dashboards;
  end-to-end demo flow (book → chart → invoice → report).

### Phase 2 (post week 6) — Product depth
- Insurance RCM in VitalOne (eligibility, claim scrubbing, 837/835, denials).
- Ambient AI scribe, live clinic queue, quality measures (per concept page roadmap).
- Migrate the practice from OpenEMR to VitalOne module by module; the FHIR
  data model keeps that migration tractable.

## Definition of "fully functional" at week 6

Scheduling, charting, patient records, portal, and cash/package billing in
daily use at the practice (Track A), plus a demoable VitalOne MVP (Track B).
Insurance claims and e-Rx are wired and pending third-party enrollment —
their go-live dates are set by the enrollments started in week 0.
