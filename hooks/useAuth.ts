import React, { useState, useContext, createContext, ReactNode } from 'react';
import { AuthContextType, UserRole } from '../types';

const authContext = createContext<AuthContextType>(null!);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
  // The TypeScript parser was misinterpreting JSX syntax in a .ts file.
  return React.createElement(authContext.Provider, { value: auth }, children);
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(): AuthContextType {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (selectedRole: UserRole) => {
    setIsLoggedIn(true);
    setRole(selectedRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return {
    isLoggedIn,
    role,
    login,
    logout,
  };
}