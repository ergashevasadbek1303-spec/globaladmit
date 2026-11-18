import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useLanguage();
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
      setError(t("passwordsMismatch"));
      return;
    }
    if (form.password.length < 8) {
      setError("Parol kamida 8 ta belgi bo'lishi kerak / Min 8 chars");
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
          <h1>{t("registerTitle")}</h1>
          <p>{t("registerSubtitle")}</p>
        </div>

        {error && <div className="error-box" style={{ marginBottom: "1rem" }}>{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="input-group">
            <label htmlFor="reg-name">{t("fullNameLabel")}</label>
            <input
              id="reg-name"
              className="input"
              type="text"
              placeholder="Ulug'bek Mirzo"
              value={form.full_name}
              onChange={set("full_name")}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-user">{t("usernameLabel")}</label>
            <input
              id="reg-user"
              className="input"
              type="text"
              placeholder="ulugbek_m"
              value={form.username}
              onChange={set("username")}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-email">{t("emailLabel")}</label>
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
            <label htmlFor="reg-pass">{t("passwordLabel")}</label>
            <input
              id="reg-pass"
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-pass2">{t("confirmPasswordLabel")}</label>
            <input
              id="reg-pass2"
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
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : t("btnRegisterSubmit")}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-3)" }}>
          {t("haveAccount")}{" "}
          <Link to="/login" style={{ color: "var(--primary-light)", fontWeight: 600 }}>
            {t("btnLoginSubmit")}
          </Link>
        </p>
      </div>
    </div>
  );
}
