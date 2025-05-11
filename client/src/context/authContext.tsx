// file path: how-not-to-die/client/src/components/home/AuthContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
  // Add other fields from your user model as needed
}

interface AuthContextType {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  login: (userData: User, jwtToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) as User : null;
  });

  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');

  const login = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
