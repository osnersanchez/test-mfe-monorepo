import React, { createContext, useContext } from 'react';
import { ApiResponse, FetchOptions } from '../../commons/interfaces/api';
import environment from '../../environments';

interface ApiContextType {
  fetchApi: <T>(
    endpoint: string,
    options?: FetchOptions
  ) => Promise<ApiResponse<T>>;
}

const ApiContext = createContext<ApiContextType | null>(null);

const BASE_URL = environment.VITE_API_BASE_URL;

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchApi = async <T,>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        return {
          data: {} as T,
          error: `Error: ${response.status} - ${response.statusText}`,
        };
      }

      const data: T = await response.json();
      return { data };
    } catch (error: any) {
      console.error('Error en fetchApi:', error);
      return {
        data: {} as T,
        error: error.message || 'unknown Error',
      };
    }
  };

  return (
    <ApiContext.Provider value={{ fetchApi }}>{children}</ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi in ApiProvider');
  }
  return context;
};
