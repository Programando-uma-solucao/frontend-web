import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import { AuthService } from '../services/authService';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ProgramandoSolucao:token');
    const user = localStorage.getItem('@ProgramandoSolucao:user');

    if (token && user) {
      api.defaults.headers = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const login = useCallback(async ({ email, password }) => {
    const authService = new AuthService();
    const response = await authService.login({ email, password });

    const { token, user } = response.data;

    localStorage.setItem('@ProgramandoSolucao:token', token);
    localStorage.setItem('@ProgramandoSolucao:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@ProgramandoSolucao:token');
    localStorage.removeItem('@ProgramandoSolucao:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth should be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
