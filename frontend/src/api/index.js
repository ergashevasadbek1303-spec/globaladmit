import axios from "axios";
import { QUESTIONS_DATA } from "../data/questionsData";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE,
  timeout: 4000, // 4 soniyadan oshsa fallbackga o'tish
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    return Promise.reject(err);
  }
);

export default api;

/* ─── Local Storage Helpers ───────────────────────────────────── */
function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem("globaladmit_users") || "[]");
  } catch {
    return [];
  }
}

function saveLocalUser(user) {
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  localStorage.setItem("globaladmit_users", JSON.stringify(users));
}

function getLocalHistory() {
  try {
    return JSON.parse(localStorage.getItem("globaladmit_history") || "[]");
  } catch {
    return [];
  }
}

function saveLocalHistoryItem(item) {
  const history = getLocalHistory();
  history.unshift(item);
  localStorage.setItem("globaladmit_history", JSON.stringify(history));
}

/* ─── Auth API ───────────────────────────────────────────────── */
export const authAPI = {
  register: async (d) => {
    try {
      const res = await api.post("/api/auth/register", d);
      return res;
    } catch (err) {
      // Server mavjud bo'lmasa yoki xato bersa — lokal demo ro'yxatdan o'tish
      const fakeToken = "demo_token_" + Date.now();
      const user = {
        id: Date.now(),
        full_name: d.full_name || "Abituriyent",
        username: d.username || (d.email ? d.email.split("@")[0] : "talaba"),
        email: d.email || "student@globaladmit.uz",
        streak: 1,
        total_points: 120,
      };
      saveLocalUser(user);
      return {
        data: {
          access_token: fakeToken,
          refresh_token: fakeToken,
          user,
        },
      };
    }
  },

  login: async (d) => {
    try {
      const res = await api.post("/api/auth/login", d);
      return res;
    } catch (err) {
      // Server mavjud bo'lmasa — kiritilgan ma'lumotlar bilan lokal kirish
      const fakeToken = "demo_token_" + Date.now();
      const users = getLocalUsers();
      let user = users.find((u) => u.email === d.email);
      if (!user) {
        user = {
          id: Date.now(),
          full_name: d.email ? d.email.split("@")[0] : "Foydalanuvchi",
          username: d.email ? d.email.split("@")[0] : "student",
          email: d.email,
          streak: 1,
          total_points: 100,
        };
        saveLocalUser(user);
      }
      return {
        data: {
          access_token: fakeToken,
          refresh_token: fakeToken,
          user,
        },
      };
    }
  },

  logout: async (refresh_token) => {
    try {
      await api.post("/api/auth/logout", { refresh_token });
    } catch {}
  },
};

/* ─── Questions API (Hybrid: Backend + Local Fallback) ───────── */
export const questionsAPI = {
  getQuestions: async (exam_type, count = 20) => {
    try {
      const res = await api.get("/api/questions", { params: { exam_type, count } });
      if (res.data && res.data.length > 0) return res;
      throw new Error("No backend questions");
    } catch {
      // Offline fallback: Frontend savollar bankidan tasodifiy tanlash
      const filtered = QUESTIONS_DATA.filter((q) => !exam_type || q.exam_type === exam_type);
      const pool = filtered.length > 0 ? filtered : QUESTIONS_DATA;
      
      // Shuffle & slice
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(count, pool.length));
      
      const formatted = selected.map((q, idx) => ({
        id: q.id || idx + 1,
        exam_type: q.exam_type,
        topic: q.topic || "Umumiy",
        difficulty: q.difficulty || 1,
        question_text: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d,
        },
        _correct_answer: q.correct_answer,
        _explanation_uz: q.explanation_uz,
      }));

      return { data: formatted };
    }
  },

  checkAnswers: async (answers) => {
    try {
      const res = await api.post("/api/questions/check", { answers });
      if (res.data) return res;
      throw new Error("No backend check");
    } catch {
      // Local check fallback
      const results = [];
      let correct = 0;

      Object.entries(answers).forEach(([qid, userAns]) => {
        const found = QUESTIONS_DATA.find((q, idx) => String(q.id || idx + 1) === String(qid));
        const rightAns = found ? found.correct_answer : "A";
        const isCorrect = String(userAns).toUpperCase() === String(rightAns).toUpperCase();
        if (isCorrect) correct++;

        results.push({
          question_id: qid,
          topic: found ? found.topic : "Mavzu",
          is_correct: isCorrect,
          correct_answer: rightAns,
          explanation_uz: found ? found.explanation_uz : "To'g'ri javob: " + rightAns,
        });
      });

      const total = Object.keys(answers).length;
      const score_percent = total > 0 ? Math.round((correct / total) * 100) : 0;

      return {
        data: {
          total,
          correct,
          score_percent,
          results,
        },
      };
    }
  },

  saveAttempt: async (d) => {
    try {
      const res = await api.post("/api/attempts", d);
      return res;
    } catch {
      const item = {
        id: Date.now(),
        exam_type: d.exam_type,
        total_questions: d.total_questions,
        correct_count: d.correct_count,
        score: Math.round((d.correct_count / d.total_questions) * 100),
        time_spent_seconds: d.time_spent_seconds || 60,
        created_at: new Date().toISOString(),
      };
      saveLocalHistoryItem(item);
      return { data: item };
    }
  },
};

/* ─── Stats API ──────────────────────────────────────────────── */
export const statsAPI = {
  getStats: async () => {
    try {
      const res = await api.get("/api/stats");
      if (res.data) return res;
      throw new Error("No backend stats");
    } catch {
      const history = getLocalHistory();
      const total_attempts = history.length;
      const total_points = history.reduce((acc, h) => acc + (h.score * 10), 120);

      const byExam = {};
      history.forEach((h) => {
        if (!byExam[h.exam_type]) {
          byExam[h.exam_type] = { count: 0, best_score: 0, total_score: 0 };
        }
        byExam[h.exam_type].count++;
        byExam[h.exam_type].total_score += h.score;
        if (h.score > byExam[h.exam_type].best_score) {
          byExam[h.exam_type].best_score = h.score;
        }
      });

      const stats = {};
      Object.keys(byExam).forEach((k) => {
        stats[k] = {
          count: byExam[k].count,
          best_score: byExam[k].best_score,
          avg_score: Math.round(byExam[k].total_score / byExam[k].count),
        };
      });

      return {
        data: {
          total_attempts,
          total_points,
          stats,
        },
      };
    }
  },

  getLeaderboard: async () => {
    try {
      const res = await api.get("/api/leaderboard");
      if (res.data && res.data.length > 0) return res;
      throw new Error("No backend leaderboard");
    } catch {
      // Mock leaderboard for exhibition demo
      return {
        data: [
          { rank: 1, full_name: "Jasur Karimov", username: "jasur_k", total_points: 1850, streak: 14, is_me: false },
          { rank: 2, full_name: "Madina Aliyeva", username: "madina_a", total_points: 1620, streak: 9, is_me: false },
          { rank: 3, full_name: "Azizbek Rahimov", username: "aziz_r", total_points: 1430, streak: 7, is_me: false },
          { rank: 4, full_name: "Shahnoza Sobirova", username: "shahnoza_s", total_points: 1200, streak: 5, is_me: false },
          { rank: 5, full_name: "Ulug'bek Mirzo", username: "ulugbek_m", total_points: 980, streak: 3, is_me: true },
        ],
      };
    }
  },

  getHistory: async () => {
    try {
      const res = await api.get("/api/me/history");
      if (res.data) return res;
      throw new Error("No backend history");
    } catch {
      return { data: getLocalHistory() };
    }
  },
};

export const userAPI = {
  getMe: async () => {
    try {
      const res = await api.get("/api/me");
      if (res.data) return res;
      throw new Error("No backend me");
    } catch {
      const savedUser = localStorage.getItem("globaladmit_current_user");
      if (savedUser) return { data: JSON.parse(savedUser) };
      throw new Error("No user logged in");
    }
  },
};
