import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "../api/axios.js";

// Define a User type (customize as needed)
type User = {
  id: string;
  username: string;
  email?: string;
  // add other user fields as needed
} | null;

interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  fetchAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);

  const fetchAuthStatus = async () => {
    try {
      const res = await axios.get("auth/status");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
