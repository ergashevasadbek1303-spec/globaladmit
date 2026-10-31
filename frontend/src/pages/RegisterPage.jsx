import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password2) {
      setError("Parollar mos emas");
      return;
    }
    if (form.password.length < 8) {
      setError("Parol kamida 8 ta belgi bo'lishi kerak");
      return;
    }

    setLoading(true);
    try {
      await register({
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      nav("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail[0]?.msg || "Xatolik");
      } else {
        setError(detail || "Ro'yxatdan o'tishda xato");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🚀</div>
          <h1>Boshlang!</h1>
          <p>Bepul hisob yarating va tayyorlovni boshlang</p>
        </div>

        {error && <div className="error-box" style={{ marginBottom: "1rem" }}>{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="input-group">
            <label htmlFor="reg-fullname">To'liq ism</label>
            <input
              id="reg-fullname"
              className="input"
              type="text"
              placeholder="Jasur Karimov"
              value={form.full_name}
              onChange={set("full_name")}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              className="input"
              type="text"
              placeholder="jasur_k"
              value={form.username}
              onChange={set("username")}
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              className="input"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={set("email")}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password">Parol</label>
            <input
              id="reg-password"
              className="input"
              type="password"
              placeholder="Kamida 8 ta belgi"
              value={form.password}
              onChange={set("password")}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password2">Parolni tasdiqlang</label>
            <input
              id="reg-password2"
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password2}
              onChange={set("password2")}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            id="reg-submit"
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish →"}
          </button>
        </form>

        <div className="auth-footer">
          Hisobingiz bormi? <Link to="/login">Kiring</Link>
        </div>
      </div>
    </div>
  );
}
