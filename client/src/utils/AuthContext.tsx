// file: /client/src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the user type
interface User {
  username: string;
  firstName: string;
  lastName?: string;
  email?: string;
  dob?: string;
  // Add other fields from your MongoDB schema if needed
}

// Define context shape
interface AuthContextType {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  login: (userData: User, jwtToken: string) => void;
  logout: () => void;
}

// Create the context with default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props for provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
