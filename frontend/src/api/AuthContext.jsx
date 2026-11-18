import React, { createContext, useContext, useState, useEffect } from "react";
import { userAPI, authAPI } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Avval localStorage dagi mavjud tokenni tekshiramiz
    const token = localStorage.getItem("access_token");
    const cachedUser = localStorage.getItem("globaladmit_current_user");

    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {}
    }

    if (token) {
      userAPI
        .getMe()
        .then(({ data }) => {
          setUser(data);
          localStorage.setItem("globaladmit_current_user", JSON.stringify(data));
        })
        .catch(() => {
          if (!cachedUser) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("globaladmit_current_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const { data } = await authAPI.register(formData);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("globaladmit_current_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  // Mehmon / Tezkor 1-klikda kirish
  const guestLogin = (customName) => {
    const guestUser = {
      id: Date.now(),
      full_name: customName || "Mehmon Foydalanuvchi",
      username: "mehmon_" + Math.floor(100 + Math.random() * 900),
      email: "guest_" + Date.now() + "@globaladmit.uz",
      streak: 1,
      total_points: 150,
    };
    const token = "guest_token_" + Date.now();
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", token);
    localStorage.setItem("globaladmit_current_user", JSON.stringify(guestUser));
    setUser(guestUser);
    return guestUser;
  };

  const logout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    try {
      if (refresh) await authAPI.logout(refresh);
    } catch {}
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("globaladmit_current_user");
    setUser(null);
  };

  const updateUser = (updated) => {
    setUser((prev) => {
      const neu = { ...prev, ...updated };
      localStorage.setItem("globaladmit_current_user", JSON.stringify(neu));
      return neu;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, guestLogin, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
