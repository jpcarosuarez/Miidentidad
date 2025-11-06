import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoAccounts } from '@/lib/demoAccounts';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  plan: 'basic' | 'professional' | 'enterprise';
  avatar?: string;
  company?: string;
  title?: string;
  domains?: string[];
  emailAccounts?: string[];
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('miidentidad_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Buscar en cuentas demo primero
    const demoAccount = demoAccounts.find(
      account => account.email === email && account.password === password
    );

    if (demoAccount) {
      const userData: User = {
        id: demoAccount.id,
        name: demoAccount.name,
        email: demoAccount.email,
        username: demoAccount.username,
        role: demoAccount.role,
        plan: demoAccount.plan,
        avatar: demoAccount.avatar,
        company: demoAccount.company,
        title: demoAccount.title,
        domains: demoAccount.domains,
        emailAccounts: demoAccount.emailAccounts,
        permissions: demoAccount.permissions
      };
      setUser(userData);
      localStorage.setItem('miidentidad_user', JSON.stringify(userData));
      return true;
    }

    // Fallback para otros usuarios
    if (email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name: 'Usuario Demo',
        email: email,
        username: email.split('@')[0],
        role: 'user',
        plan: 'professional',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      setUser(mockUser);
      localStorage.setItem('miidentidad_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    if (userData.email && userData.password && userData.name) {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        username: userData.email.split('@')[0],
        role: 'user',
        plan: 'basic',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      };
      setUser(newUser);
      localStorage.setItem('miidentidad_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('miidentidad_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};