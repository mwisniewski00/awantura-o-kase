import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';

interface Auth {
  token?: string;
  username?: string;
  email?: string;
}

interface AuthContext {
  auth: Auth;
  setAuth: (auth: Auth) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({});

  const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contextValue = useContext(AuthContext);
  if (contextValue === null) {
    throw new Error('Auth context value is missing. Probably context was not initialized.');
  }
  return contextValue;
}
