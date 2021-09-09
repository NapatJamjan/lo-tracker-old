import React, { createContext, useState } from 'react';

interface AuthContent {
  username: string | null,
  isSignedIn: boolean,
  login: () => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContent>({
  username: '',
  isSignedIn: false,
  login: () => {},
  logout: () => {}
});

interface AuthState {
  username: string | null
}

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<AuthState>({username: null});

  const { username } = user;
  const isSignedIn = username != null;
  const login = () => setUser({username: 'lnwza'});
  const logout = () => setUser({username: null});

  return (
    <AuthContext.Provider value={{username, isSignedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
