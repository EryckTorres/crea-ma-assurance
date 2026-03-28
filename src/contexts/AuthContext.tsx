import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "professional" | "analyst" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rnp?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isFirstVisit: boolean;
  dismissTutorial: () => void;
}

const MOCK_USERS: Record<string, User & { password: string }> = {
  "eng@creama.gov.br": { id: "u1", name: "Carlos Silva", email: "eng@creama.gov.br", role: "professional", rnp: "MA-2024-00451", password: "123456" },
  "fiscal@creama.gov.br": { id: "u2", name: "Ana Rodrigues", email: "fiscal@creama.gov.br", role: "analyst", password: "123456" },
  "admin@creama.gov.br": { id: "u3", name: "João Santos", email: "admin@creama.gov.br", role: "admin", password: "123456" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(() => !localStorage.getItem("crea-tutorial-done"));

  const login = useCallback((email: string, password: string) => {
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const dismissTutorial = useCallback(() => {
    setIsFirstVisit(false);
    localStorage.setItem("crea-tutorial-done", "true");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isFirstVisit, dismissTutorial }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
