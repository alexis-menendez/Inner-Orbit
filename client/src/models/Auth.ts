// File: client/src/models/Auth.ts

import { User } from './User';

export interface AuthContextType {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}
