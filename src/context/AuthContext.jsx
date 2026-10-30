import { createContext, useContext, useEffect, useState } from "react";
import { findAccount, registerStudent } from "@/lib/authStore";

const AuthContext = createContext(null);

const SESSION_KEY = "paft_session_v1";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = (next) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setUser(next);
    return next;
  };

  const login = async (email, password) => {
    const entry = findAccount(email);
    if (!entry || entry.password !== String(password)) {
      throw new Error("E-mail ou senha inválidos.");
    }
    return persist({ ...entry.user });
  };

  const register = async (payload) => {
    const created = registerStudent(payload);
    return persist(created);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
