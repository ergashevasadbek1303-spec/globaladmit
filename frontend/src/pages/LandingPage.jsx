import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

const FEATURES = [
  { icon: "🎯", title: "Diagnostik test", desc: "Zaif mavzularingizni aniqlab, shaxsiy o'quv reja tuzing" },
  { icon: "📊", title: "AI tahlil", desc: "Xatolaringiz mavzu bo'yicha tahlil qilinadi, yechim o'zbek tilida" },
  { icon: "⏱", title: "Mock imtihon", desc: "Haqiqiy imtihon formati: vaqt chegarasi, variantlar" },
  { icon: "🏆", title: "Reyting", desc: "Haftalik reyting, streak va sertifikat bilan motivatsiya" },
  { icon: "🌍", title: "Ko'p imtihon", desc: "SAT, IELTS, ACT, DTM — hammasi bitta platformada" },
  { icon: "🇺🇿", title: "O'zbek tilida", desc: "Har bir savolga o'zbekcha batafsil yechim" },
];

const EXAMS = [
  { name: "SAT", desc: "Harvard, MIT, Yale", color: "#6c63ff", icon: "🏛" },
  { name: "IELTS", desc: "Dunyo universitetlari", color: "#22c55e", icon: "🌍" },
  { name: "DTM", desc: "O'zbek universitetlari", color: "#eab308", icon: "🇺🇿" },
  { name: "TOEFL", desc: "AQSh universitetlari", color: "#60a5fa", icon: "📚" },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="hero container">
        <div className="hero-tag">🎓 O'zbek abituriyentlari uchun</div>
        <h1>
          Chet el universitetlariga
          <br />
          <span>ishonchli tayyorlan</span>
        </h1>
        <p>
          SAT, IELTS, DTM va boshqa imtihonlarga o'zbek tilida tushuntirishlar bilan.
          Shaxsiy reja, AI tahlil va haftalik reyting bilan.
        </p>
        <div className="hero-btns">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg" id="hero-dashboard">
              Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg" id="hero-start">
                Bepul boshlash →
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg" id="hero-login">
                Kirish
              </Link>
            </>
          )}
        </div>

        {/* Exam badges */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3rem" }}>
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
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-1)" }}>{e.name}</div>
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
            <h2>Nima uchun GlobalAdmit?</h2>
            <p style={{ maxWidth: "500px", margin: "0.75rem auto 0" }}>
              Bepul resurslardan farqi — o'zbek tilida yechim, AI tahlil va shaxsiy reja
            </p>
          </div>

          <div className="exam-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {FEATURES.map((f) => (
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
            <h2 style={{ marginBottom: "0.75rem" }}>Hoziroq boshlang</h2>
            <p style={{ marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
              Bepul ro'yxatdan o'ting. Kredit kartasi shart emas.
            </p>
            {!user && (
              <Link to="/register" className="btn btn-primary btn-lg" id="cta-register">
                Bepul boshlash →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
