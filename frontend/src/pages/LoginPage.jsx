import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function LoginPage() {
  const { login, guestLogin } = useAuth();
  const { t, lang } = useLanguage();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      nav("/dashboard");
    } catch {
      // Backend bo'lmaganda ham foydalanuvchini kiritish
      guestLogin(form.email.split("@")[0]);
      nav("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    const demoName = lang === "ru" ? "Гость Экспо" : lang === "en" ? "Expo Visitor" : "Ko'rgazma Mehmori";
    guestLogin(demoName);
    nav("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎯</div>
          <h1>{t("loginTitle")}</h1>
          <p>{t("loginSubtitle")}</p>
        </div>

        {/* 1-Click Fast Demo button for Exhibitions */}
        <button
          type="button"
          onClick={handleQuickDemo}
          className="btn btn-outline"
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "1.5rem",
            padding: "0.75rem",
            borderColor: "var(--accent-2)",
            background: "rgba(108,99,255,0.12)",
            color: "var(--text-1)",
            fontWeight: 700,
          }}
        >
          ⚡️ {lang === "ru" ? "Войти в 1 клик (Демо)" : lang === "en" ? "1-Click Instant Demo" : "1-klikda tezkor kirish (Demo)"}
        </button>

        <div className="divider">
          <span>{lang === "ru" ? "или через логин" : lang === "en" ? "or sign in" : "yoki email orqali"}</span>
        </div>

        {error && <div className="error-box" style={{ marginBottom: "1rem" }}>{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="input-group">
            <label htmlFor="login-email">{t("emailLabel")}</label>
            <input
              id="login-email"
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
            <label htmlFor="login-password">{t("passwordLabel")}</label>
            <input
              id="login-password"
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? <div className="spinner" style={{ margin: "0 auto", width: 22, height: 22 }} /> : t("btnLoginSubmit")}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-3)" }}>
          {t("noAccount")}{" "}
          <Link to="/register" style={{ color: "var(--accent-2)", fontWeight: 600 }}>
            {t("btnRegisterSubmit")}
          </Link>
        </p>
      </div>
    </div>
  );
}
