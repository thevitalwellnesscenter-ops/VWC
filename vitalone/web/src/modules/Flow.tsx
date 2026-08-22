import { todaysAppointments } from '../sampleData';

const STATUS_CLASS: Record<string, string> = {
  'in-room': 'good',
  arrived: 'warn',
};

export default function Flow(): JSX.Element {
  return (
    <>
      <h1>Schedule &amp; Queue</h1>
      <p className="sub">Today's appointments across providers, rooms, and telehealth — the live clinic day.</p>
      <div className="card">
        <h2>Today</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th><th>Patient</th><th>Visit type</th><th>Provider</th><th>Room</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysAppointments.map((a) => (
              <tr key={`${a.time}-${a.patient}`}>
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
      </div>
    </>
  );
}
