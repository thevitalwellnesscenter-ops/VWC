import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { isConnected } from './medplum';
import Flow from './modules/Flow';
import Charting from './modules/Charting';
import Revenue from './modules/Revenue';
import Insight from './modules/Insight';

const MODULES = [
  { path: '/flow', label: 'Schedule & Queue', code: 'VO-FLOW', element: <Flow /> },
  { path: '/charting', label: 'Charting', code: 'VO-CLIN', element: <Charting /> },
  { path: '/revenue', label: 'Billing', code: 'VO-REV', element: <Revenue /> },
  { path: '/insight', label: 'Analytics', code: 'VO-INSIGHT', element: <Insight /> },
];

export default function App(): JSX.Element {
  return (
    <div className="shell">
      <nav className="sidebar">
        <div className="brand">Vital<em>One</em></div>
        {MODULES.map((m) => (
          <NavLink key={m.path} to={m.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            {m.label}
            <span className="mod-code">{m.code}</span>
          </NavLink>
        ))}
      </nav>
      <main className="main">
        {!isConnected() && (
          <div className="banner">
            Showing synthetic demo data — no Medplum project connected. See vitalone/web/README.md to connect one.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/flow" replace />} />
          {MODULES.map((m) => (
            <Route key={m.path} path={m.path} element={m.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}
