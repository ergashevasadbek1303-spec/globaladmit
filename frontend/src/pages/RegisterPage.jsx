import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function RegisterPage() {
  const { register, guestLogin } = useAuth();
  const { t, lang } = useLanguage();
  const nav = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.full_name.trim()) {
      setError(lang === "ru" ? "Введите ваше имя" : lang === "en" ? "Please enter your name" : "Ismingizni kiriting");
      return;
    }

    setLoading(true);
    try {
      // Username ni ism va emaildan avtomatik generatsiya qilish
      const autoUsername =
        (form.email ? form.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") : "") ||
        form.full_name.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "") + "_" + Math.floor(100 + Math.random() * 900);

      await register({
        full_name: form.full_name.trim(),
        username: autoUsername,
        email: form.email.trim(),
        password: form.password || "Password123!",
      });
      nav("/dashboard");
    } catch {
      // Xatolik yuz berganda ham mehmon sifatida o'tkazib yuborish
      guestLogin(form.full_name.trim());
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
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🚀</div>
          <h1>{t("registerTitle")}</h1>
          <p>{t("registerSubtitle")}</p>
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
          ⚡️ {lang === "ru" ? "Быстрый вход без регистрации" : lang === "en" ? "1-Click Instant Demo" : "1-klikda tezkor sinab ko'rish"}
        </button>

        <div className="divider">
          <span>{lang === "ru" ? "или заполните форму" : lang === "en" ? "or register" : "yoki ma'lumot kiriting"}</span>
        </div>

        {error && <div className="error-box" style={{ marginBottom: "1rem" }}>{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="input-group">
            <label htmlFor="reg-name">{t("fullNameLabel")}</label>
            <input
              id="reg-name"
              className="input"
              type="text"
              placeholder="Jasur Karimov"
              value={form.full_name}
              onChange={set("full_name")}
              required
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

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? <div className="spinner" style={{ margin: "0 auto", width: 22, height: 22 }} /> : t("btnRegisterSubmit")}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-3)" }}>
          {t("haveAccount")}{" "}
          <Link to="/login" style={{ color: "var(--accent-2)", fontWeight: 600 }}>
            {t("btnLoginSubmit")}
          </Link>
        </p>
      </div>
    </div>
  );
}
