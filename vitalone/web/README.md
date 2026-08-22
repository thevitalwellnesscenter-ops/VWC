# Track B — VitalOne web app

The commercial VitalOne product: a React front-end over
[Medplum](https://www.medplum.com/) (open source, Apache 2.0), the FHIR-native
backend that provides the patient data model, auth, RBAC, audit logging, and
subscriptions.

Four modules, matching the concept page:

| Route | Module | Code |
|---|---|---|
| `/flow` | Schedule & queue | VO-FLOW |
| `/charting` | Encounter documentation | VO-CLIN |
| `/revenue` | Unified ledger billing | VO-REV |
| `/insight` | Practice analytics | VO-INSIGHT |

## Run it

```bash
cd vitalone/web
npm install
npm run dev
```

Without configuration the app runs on synthetic demo data (see the banner).
Never commit real patient data to this repo.

## Connect a Medplum project

1. Create a project at https://app.medplum.com (or self-host the Medplum stack).
2. Create a Client Application in the project and note its client ID.
3. Create `vitalone/web/.env.local`:

   ```
   VITE_MEDPLUM_BASE_URL=https://api.medplum.com/
   VITE_MEDPLUM_CLIENT_ID=<client id>
   ```

4. Next build step (weeks 1–2 in docs/PLAN.md): replace the demo-data banner
   with Medplum sign-in and back each module with FHIR resources —
   Appointment/Slot (VO-FLOW), Encounter/Observation (VO-CLIN),
   Invoice/PaymentReconciliation/Coverage (VO-REV), Measure (VO-INSIGHT).

## Compliance ground rules

- PHI only ever lives in the Medplum project (hosted Medplum signs BAAs; a
  self-hosted stack must run in a BAA-covered cloud account).
- All access goes through Medplum auth — no service keys in the browser app.
- This package is the sellable product; keep dependencies permissively
  licensed (no GPL code from Track A).
