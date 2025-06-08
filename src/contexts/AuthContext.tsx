import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  type: 'owner' | 'caregiver';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = 'dogsinn_auth';

  interface StoredAuth {
    token: string;
    user: User;
    expiry: number;
  }

  const getStoredAuth = (): StoredAuth | null => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const data: StoredAuth = JSON.parse(raw);
      if (Date.now() > data.expiry) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  };

  const saveAuth = (token: string, user: User) => {
    const ttl = 24 * 60 * 60 * 1000; // 24h
    const data: StoredAuth = { token, user, expiry: Date.now() + ttl };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    const saved = getStoredAuth();
    if (saved) {
      setUser(saved.user);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        setIsLoading(false);
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      saveAuth(data.token, data.user);
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        setIsLoading(false);
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      saveAuth(data.token, data.user);
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setIsLoading(false);
      return response.ok;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, forgotPassword, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};