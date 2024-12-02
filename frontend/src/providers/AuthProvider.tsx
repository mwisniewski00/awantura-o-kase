import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';

interface Auth {
  token?: string;
  username?: string;
  email?: string;
  id?: string;
}

interface AuthContext {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  isLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({});

  const isLoggedIn = useMemo(() => Boolean(auth?.token), [auth?.token]);
  const contextValue = useMemo(() => ({ auth, setAuth, isLoggedIn }), [auth, isLoggedIn]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contextValue = useContext(AuthContext);
  if (contextValue === null) {
    throw new Error('Auth context value is missing. Probably context was not initialized.');
  }
  return contextValue;
}
