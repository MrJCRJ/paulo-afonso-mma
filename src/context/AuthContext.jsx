import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS = {
  "aluno@teste.com": {
    password: "aluno123",
    user: { id: "u1", name: "João Tigre Silva", email: "aluno@teste.com", role: "student" },
  },
  "admin@pafightteam.com": {
    password: "pafight2015",
    user: { id: "u0", name: "Mendonça Júnior", email: "admin@pafightteam.com", role: "admin" },
  },
};

const STORAGE_KEY = "paft_demo_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const entry = USERS[String(email).trim().toLowerCase()];
    if (!entry || entry.password !== password) {
      throw new Error("E-mail ou senha inválidos (use os acessos demo).");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user));
    setUser(entry.user);
    return entry.user;
  };

  const loginAs = (role) => {
    const email = role === "admin" ? "admin@pafightteam.com" : "aluno@teste.com";
    return login(email, USERS[email].password);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
