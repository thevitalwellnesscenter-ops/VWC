import { useEffect, useState } from 'react';
import type { Appointment } from '@medplum/fhirtypes';
import { isConnected, medplum } from '../medplum';
import { todaysAppointments, type SampleAppointment } from '../sampleData';

const STATUS_CLASS: Record<string, string> = {
  'in-room': 'good',
  fulfilled: 'good',
  checkout: 'good',
  arrived: 'warn',
};

function appointmentToRow(appt: Appointment): SampleAppointment {
  const patient = appt.participant?.find((p) => p.actor?.reference?.startsWith('Patient/'));
  const practitioner = appt.participant?.find((p) => p.actor?.reference?.startsWith('Practitioner/'));
  const location = appt.participant?.find((p) => p.actor?.reference?.startsWith('Location/'));
  return {
    time: appt.start ? new Date(appt.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—',
    patient: patient?.actor?.display ?? 'Unknown patient',
    visitType: appt.appointmentType?.text ?? appt.serviceType?.[0]?.text ?? appt.description ?? 'Visit',
    provider: practitioner?.actor?.display ?? '—',
    room: location?.actor?.display ?? '—',
    status: appt.status ?? 'scheduled',
  };
}

export default function Flow(): JSX.Element {
  const connected = isConnected();
  const [rows, setRows] = useState<SampleAppointment[]>(connected ? [] : todaysAppointments);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    medplum
      .searchResources('Appointment', `date=ge${today}&_sort=date&_count=50`)
      .then((appts) => setRows(appts.map(appointmentToRow)))
      .catch((err) => setError(String(err)));
  }, [connected]);

  return (
    <>
      <h1>Schedule &amp; Queue</h1>
      <p className="sub">
        {connected
          ? "Upcoming FHIR Appointments from your Medplum project."
          : "Today's appointments across providers, rooms, and telehealth — the live clinic day."}
      </p>
      {error && <div className="banner">Could not load appointments: {error}</div>}
      <div className="card">
        <h2>Today</h2>
        {rows.length === 0 && connected && !error ? (
          <p className="sub">No upcoming appointments in this project yet — create an Appointment resource in Medplum and it appears here.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Time</th><th>Patient</th><th>Visit type</th><th>Provider</th><th>Room</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a, i) => (
                <tr key={`${a.time}-${a.patient}-${i}`}>
                  <td className="num">{a.time}</td>
                  <td>{a.patient}</td>
                  <td>{a.visitType}</td>
                  <td>{a.provider}</td>
                  <td>{a.room}</td>
                  <td><span className={`pill ${STATUS_CLASS[a.status] ?? ''}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
