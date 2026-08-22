import { openInvoices } from '../sampleData';

const STATUS_CLASS: Record<string, string> = {
  paid: 'good',
  denied: 'warn',
};

export default function Revenue(): JSX.Element {
  return (
    <>
      <h1>Billing</h1>
      <p className="sub">Insurance, cash, and membership charges on one ledger.</p>
      <div className="card">
        <h2>Open items</h2>
        <table>
          <thead>
            <tr><th>Patient</th><th>Description</th><th>Amount</th><th>Method</th><th>Status</th></tr>
          </thead>
          <tbody>
            {openInvoices.map((inv) => (
              <tr key={`${inv.patient}-${inv.description}`}>
                <td>{inv.patient}</td>
                <td>{inv.description}</td>
                <td className="num">${inv.amount.toFixed(2)}</td>
                <td><span className="pill">{inv.method}</span></td>
                <td><span className={`pill ${STATUS_CLASS[inv.status] ?? ''}`}>{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
