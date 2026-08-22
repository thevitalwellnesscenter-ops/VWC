# Track A — OpenEMR (internal clinic system)

Runs [OpenEMR](https://www.open-emr.org/) 7.x with MariaDB via Docker. This is the
system The Vital Wellness Center operates on while VitalOne (Track B) is built.

## Quick start

```bash
cp .env.example .env      # then edit .env with strong passwords
docker compose up -d
```

First boot takes a few minutes while OpenEMR initializes the database.
Then open `http://localhost:8080` and log in as `admin` with the password
from `.env`.

## Before real patient data (HIPAA)

- Host with a provider that signs a BAA (AWS, Azure, GCP) — no patient data
  on machines without one.
- Terminate TLS in front of the container (the bundled self-signed cert on
  8443 is for testing only).
- Change every default credential; enable per-user accounts and roles in
  OpenEMR (Administration → Users).
- Turn on audit logging (Administration → Globals → Logging).
- Snapshot/backup the `dbvolume` and `sitevolume` volumes on a schedule.

## Configuration order (matches docs/PLAN.md weeks 1–2)

1. Facility, providers, visit categories, calendar schedules.
2. Encounter forms and note templates for the practice's visit types.
3. Fee sheet: CPT/service codes and prices (cash prices first).
4. Patient portal enablement.
5. Clearinghouse (X12 837) and ERA setup once enrollment completes.
6. e-Rx module once the vendor contract is active.

## Licensing note

OpenEMR is GPL-licensed. Using and modifying it internally (including hosting
it as a service) is fine; **distributing** a modified version requires
releasing those modifications under the GPL. Product code we intend to sell
lives in `vitalone/` (Track B), not here. Improvements we make to OpenEMR
itself should be contributed upstream.
