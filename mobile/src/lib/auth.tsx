import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ApiError, postJson } from './api';

// App sign-in state. The session token from /api/v1/auth/verify lives in the
// device's secure storage (Keychain / Keystore), never in plain storage.
// Roles: "referrer" today; family and caregiver accounts come later.

const TOKEN_KEY = 'cc.session.token';
const EMAIL_KEY = 'cc.session.email';

export type Session = { token: string; email: string; role: 'referrer' };

type AuthValue = {
  session: Session | null;
  loading: boolean;
  requestCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

async function read(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([read(TOKEN_KEY), read(EMAIL_KEY)]).then(([token, email]) => {
      if (token && email) setSession({ token, email, role: 'referrer' });
      setLoading(false);
    });
  }, []);

  const requestCode = useCallback(async (email: string) => {
    await postJson('/api/v1/auth/request-code', { email });
  }, []);

  const verifyCode = useCallback(async (email: string, code: string) => {
    const result = await postJson<{ token: string; email: string; role: 'referrer' }>(
      '/api/v1/auth/verify',
      { email, code },
    );
    await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    await SecureStore.setItemAsync(EMAIL_KEY, result.email);
    setSession(result);
  }, []);

  const signOut = useCallback(async () => {
    const token = session?.token;
    setSession(null);
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {}),
      SecureStore.deleteItemAsync(EMAIL_KEY).catch(() => {}),
    ]);
    if (token) {
      // Revoke on the server too; signing out locally is what matters.
      postJson('/api/v1/auth/sign-out', {}, { token }).catch(() => {});
    }
  }, [session]);

  const value = useMemo(
    () => ({ session, loading, requestCode, verifyCode, signOut }),
    [session, loading, requestCode, verifyCode, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>');
  return value;
}

/** True when an API call failed because the session is no longer valid. */
export const isSignedOutError = (error: unknown) => error instanceof ApiError && error.status === 401;
