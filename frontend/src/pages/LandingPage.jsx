import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

const EXAMS = [
  { name: "SAT", desc: "Harvard, MIT, Yale", color: "#6c63ff", icon: "🏛" },
  { name: "IELTS", desc: "Global Universities", color: "#22c55e", icon: "🌍" },
  { name: "DTM", desc: "National Universities", color: "#eab308", icon: "🇺🇿" },
  { name: "TOEFL", desc: "US Universities", color: "#60a5fa", icon: "📚" },
];

export default function LandingPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: "🎯", title: t("featDiagnostic"), desc: t("featDiagnosticDesc") },
    { icon: "📊", title: t("featAi"), desc: t("featAiDesc") },
    { icon: "⏱", title: t("featMock"), desc: t("featMockDesc") },
    { icon: "🏆", title: t("featLeaderboard"), desc: t("featLeaderboardDesc") },
    { icon: "🌍", title: t("featMultiExam"), desc: t("featMultiExamDesc") },
    { icon: "🌐", title: t("featMultiLang"), desc: t("featMultiLangDesc") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero container">
        <div className="hero-tag">{t("heroBadge")}</div>
        <h1>
          {t("heroTitle1")}
          <br />
          <span>{t("heroTitle2")}</span>
        </h1>
        <p>{t("heroDesc")}</p>
        <div className="hero-btns">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg" id="hero-dashboard">
              {t("btnDashboard")}
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg" id="hero-start">
                {t("btnStartFree")}
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg" id="hero-login">
                {t("btnLogin")}
              </Link>
            </>
          )}
        </div>

        {/* Exam badges */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "3rem",
          }}
        >
          {EXAMS.map((e) => (
            <div
              key={e.name}
              style={{
                background: `${e.color}18`,
                border: `1px solid ${e.color}40`,
                borderRadius: "var(--radius)",
                padding: "0.75rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{e.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-1)" }}>
                  {e.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2>{t("whyTitle")}</h2>
            <p style={{ maxWidth: "550px", margin: "0.75rem auto 0" }}>{t("whyDesc")}</p>
          </div>

          <div
            className="exam-grid"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {features.map((f) => (
              <div className="card" key={f.title}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ marginBottom: "0.4rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.88rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", textAlign: "center" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.1))",
              border: "1px solid rgba(108,99,255,0.25)",
              borderRadius: "calc(var(--radius) * 2)",
              padding: "3rem 2rem",
            }}
          >
            <h2 style={{ marginBottom: "0.75rem" }}>{t("ctaTitle")}</h2>
            <p style={{ marginBottom: "2rem", maxWidth: "450px", margin: "0 auto 2rem" }}>
              {t("ctaDesc")}
            </p>
            {!user && (
              <Link to="/register" className="btn btn-primary btn-lg" id="cta-register">
                {t("btnRegisterNow")}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
