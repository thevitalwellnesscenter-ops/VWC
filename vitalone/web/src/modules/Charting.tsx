import { useState } from 'react';
import { todaysAppointments } from '../sampleData';

export default function Charting(): JSX.Element {
  const [note, setNote] = useState('');
  const inRoom = todaysAppointments.filter((a) => a.status === 'in-room');

  return (
    <>
      <h1>Charting</h1>
      <p className="sub">Encounter documentation for patients currently in a room. Structured notes and orders land here.</p>
      {inRoom.map((a) => (
        <div className="card" key={a.patient}>
          <h2>{a.patient} — {a.visitType} ({a.provider})</h2>
          <textarea
            placeholder="Encounter note… (the ambient AI scribe will draft this in a later phase)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      ))}
    </>
  );
}
