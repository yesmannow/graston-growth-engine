import { useState, createContext, useContext, ReactNode } from 'react';

type UserRole = 'user' | 'admin' | null;

interface AuthContextType {
  role: UserRole;
  loginAsUser: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  const loginAsUser = () => setRole('user');
  const loginAsAdmin = () => setRole('admin');
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, loginAsUser, loginAsAdmin, logout }}>
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