import { useState } from 'react';
import { normalizeErrorString } from '@medplum/core';
import { medplum } from '../medplum';

interface SignInProps {
  onSignedIn: () => void;
}

export default function SignIn({ onSignedIn }: SignInProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await medplum.startLogin({ email, password, remember: true });
      let code = result.code;
      if (!code && result.memberships && result.memberships.length > 0) {
        // Account belongs to multiple projects — use the first membership.
        // A project picker replaces this when multi-project support lands.
        const profileResult = (await medplum.post('auth/profile', {
          login: result.login,
          profile: result.memberships[0].id,
        })) as { code?: string };
        code = profileResult.code;
      }
      if (!code) {
        throw new Error('Sign-in did not return an authorization code');
      }
      await medplum.processCode(code);
      onSignedIn();
    } catch (err) {
      setError(normalizeErrorString(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="signin-wrap">
      <form className="card signin" onSubmit={handleSubmit}>
        <div className="brand">Vital<em>One</em></div>
        <p className="sub">Sign in with your Medplum account</p>
        {error && <div className="banner">{error}</div>}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
