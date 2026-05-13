import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: Omit<User, "id">) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "tt_users";
const SESSION_KEY = "tt_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const s = localStorage.getItem(SESSION_KEY);
    if (s) setUser(JSON.parse(s));
  }, []);

  const getUsers = (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const saveUsers = (u: User[]) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

  const register: AuthContextType["register"] = (data) => {
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) {
      return { ok: false, error: "Email already registered" };
    }
    const newUser: User = { ...data, id: crypto.randomUUID() };
    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { ok: true };
  };

  const login: AuthContextType["login"] = (email, password) => {
    const users = getUsers();
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) return { ok: false, error: "Invalid credentials" };
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = getUsers().map((u) => (u.id === updated.id ? updated : u));
    saveUsers(users);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
