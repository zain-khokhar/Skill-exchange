"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api";

export const AuthContext = createContext();

function deriveRoles(userData) {
  const roleName = (userData?.role?.name || "").toLowerCase();
  return {
    ...userData,
    isAdmin: userData?.isAdmin === true || roleName === "admin",
    isEditor: userData?.isEditor === true || roleName === "editor",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On mount: check localStorage for existing session and refresh user data
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(deriveRoles(JSON.parse(savedUser)));
      // Refresh user data from backend to get latest role info
      getMe()
        .then((freshUser) => {
          const enriched = deriveRoles(freshUser);
          localStorage.setItem("user", JSON.stringify(enriched));
          setUser(enriched);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        });
    }
    setLoading(false);
  }, []);

  const login = (jwt, userData) => {
    const enriched = deriveRoles(userData);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(enriched));
    setToken(jwt);
    setUser(enriched);
  };

  const refreshUser = async () => {
    try {
      const freshUser = await getMe();
      const enriched = deriveRoles(freshUser);
      localStorage.setItem("user", JSON.stringify(enriched));
      setUser(enriched);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
