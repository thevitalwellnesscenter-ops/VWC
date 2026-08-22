import { practiceMetrics } from '../sampleData';

export default function Insight(): JSX.Element {
  return (
    <>
      <h1>Analytics</h1>
      <p className="sub">Practice performance against the targets on the VitalOne concept page.</p>
      <div className="card">
        <h2>This month</h2>
        <table>
          <thead>
            <tr><th>Metric</th><th>Current</th><th>Target</th><th>Module</th></tr>
          </thead>
          <tbody>
            {practiceMetrics.map((m) => (
              <tr key={m.name}>
                <td>{m.name}</td>
                <td className="num">{m.value}</td>
                <td className="num">{m.target}</td>
                <td><span className="pill">{m.module}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
