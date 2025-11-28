'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminRoutes } from '../lib/api/adminApi';
import { Admin, RegisterData, LoginData } from '../lib/Interface/auth';

interface AdminStoreType {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initFirstAdmin: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AdminStoreContext = createContext<AdminStoreType | undefined>(undefined);

export const AdminStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedAdmin = localStorage.getItem('admin_user');

    if (storedToken && storedAdmin) {
      try {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
      } catch (err) {
        console.error('Failed to parse stored admin:', err);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const initFirstAdmin = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminRoutes.initFirstAdmin(data);
      setAdmin(response.admin!);
      setToken(response.token);
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify(response.admin));
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Initialization failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminRoutes.login(data);
      setAdmin(response.admin!);
      setToken(response.token);
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify(response.admin));
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  const clearError = () => {
    setError(null);
  };

  const value: AdminStoreType = {
    admin,
    token,
    isAuthenticated: !!token && !!admin,
    isLoading,
    error,
    initFirstAdmin,
    login,
    logout,
    clearError,
  };

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
};

export const useAdminStore = (): AdminStoreType => {
  const context = useContext(AdminStoreContext);
  if (!context) {
    throw new Error('useAdminStore must be used within AdminStoreProvider');
  }
  return context;
};
