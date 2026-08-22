import { MedplumClient } from '@medplum/core';

// Point at your Medplum project: set these in vitalone/web/.env.local
//   VITE_MEDPLUM_BASE_URL=https://api.medplum.com/
//   VITE_MEDPLUM_CLIENT_ID=<your client application id>
export const medplum = new MedplumClient({
  baseUrl: import.meta.env.VITE_MEDPLUM_BASE_URL ?? 'https://api.medplum.com/',
  clientId: import.meta.env.VITE_MEDPLUM_CLIENT_ID,
  cacheTime: 60_000,
});

export function isConnected(): boolean {
  return Boolean(medplum.getActiveLogin());
}
