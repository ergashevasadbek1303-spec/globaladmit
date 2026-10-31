import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({ baseURL: BASE });

// Har bir so'rovga token qo'shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 bo'lsa refresh token bilan yangilash
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE}/api/auth/refresh`, {
            refresh_token: refresh,
          });
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          original.headers.Authorization = `Bearer ${data.access_token}`;
          return api(original);
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;

export const authAPI = {
  register: (d) => api.post("/api/auth/register", d),
  login: (d) => api.post("/api/auth/login", d),
  logout: (refresh_token) => api.post("/api/auth/logout", { refresh_token }),
};

export const questionsAPI = {
  getQuestions: (params) => api.get("/api/questions", { params }),
  checkAnswers: (answers) => api.post("/api/questions/check", { answers }),
  saveAttempt: (d) => api.post("/api/attempts", d),
};

export const statsAPI = {
  getStats: () => api.get("/api/stats"),
  getLeaderboard: () => api.get("/api/leaderboard"),
  getHistory: () => api.get("/api/me/history"),
};

export const userAPI = {
  getMe: () => api.get("/api/me"),
};
