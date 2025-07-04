import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple validation - in real app, this would be API call
    if (email && password.length >= 6) {
      const username = email.split('@')[0];
      const user: User = {
        id: '1',
        email,
        name: username,
        firstName: username, // Use username as firstName for login
        lastName: '', // Empty lastName for login
        avatar: `https://ui-avatars.com/api/?name=${username}&background=0ea5e9&color=fff`,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple validation - in real app, this would be API call
    if (email && password.length >= 6 && firstName.trim() && lastName.trim()) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const user: User = {
        id: '1',
        email,
        name: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        avatar: `https://ui-avatars.com/api/?name=${fullName}&background=0ea5e9&color=fff`,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
