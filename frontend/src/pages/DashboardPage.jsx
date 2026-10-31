import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { statsAPI } from "../api";

const EXAM_LABELS = {
  SAT_MATH: { label: "SAT Matematika", icon: "📐", cls: "badge-sat" },
  SAT_ENGLISH: { label: "SAT Ingliz tili", icon: "📖", cls: "badge-sat" },
  IELTS: { label: "IELTS", icon: "🌍", cls: "badge-ielts" },
  DTM_MATH: { label: "DTM Matematika", icon: "🧮", cls: "badge-dtm" },
  DTM_UZB: { label: "DTM O'zbek tili", icon: "🇺🇿", cls: "badge-dtm" },
};

function ScorePill({ score }) {
  const cls = score >= 70 ? "good" : score >= 50 ? "mid" : "low";
  return <span className={`score-pill ${cls}`}>{score}%</span>;
}

function formatTime(secs) {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("uz-UZ", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([statsAPI.getStats(), statsAPI.getHistory()])
      .then(([s, h]) => {
        setStats(s.data);
        setHistory(h.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="welcome-text">Salom, {user?.full_name?.split(" ")[0]}! 👋</div>
          <h1>Dashboard</h1>
        </div>
        <Link to="/test" className="btn btn-primary btn-lg">
          📝 Yangi test boshlash
        </Link>
      </div>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats?.total_points ?? 0}</div>
          <div className="stat-label">Jami ball</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.streak ?? 0}</div>
          <div className="stat-label">🔥 Kun ketma-ketlik</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.total_attempts ?? 0}</div>
          <div className="stat-label">Topshirilgan testlar</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {stats?.stats
              ? Math.round(
                  Object.values(stats.stats).reduce((a, s) => a + s.avg_score, 0) /
                    Math.max(1, Object.values(stats.stats).length)
                )
              : 0}%
          </div>
          <div className="stat-label">O'rtacha ball</div>
        </div>
      </div>

      {/* Imtihon bo'yicha statistika */}
      {stats?.stats && Object.keys(stats.stats).length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2>Imtihon bo'yicha tahlil</h2>
          </div>
          <div className="exam-grid">
            {Object.entries(stats.stats).map(([key, data]) => {
              const info = EXAM_LABELS[key] || { label: key, icon: "📋", cls: "" };
              return (
                <div className="card" key={key}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.75rem" }}>{info.icon}</span>
                    <div>
                      <span className={`badge ${info.cls}`}>{info.label}</span>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-3)", marginTop: "0.2rem" }}>
                        {data.count} ta test
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-2)" }}>
                        {data.best_score}%
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>Eng yaxshi</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>{data.avg_score}%</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>O'rtacha</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tarix */}
      <div className="section">
        <div className="section-header">
          <h2>So'nggi testlar</h2>
        </div>
        {history.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <h3>Hali test topshirilmagan</h3>
            <p style={{ marginBottom: "1.5rem" }}>Birinchi testni boshlang!</p>
            <Link to="/test" className="btn btn-primary">📝 Testni boshlash</Link>
          </div>
        ) : (
          <div className="history-list">
            {history.map((a) => {
              const info = EXAM_LABELS[a.exam_type] || { label: a.exam_type, icon: "📋" };
              return (
                <div className="history-item" key={a.id}>
                  <span style={{ fontSize: "1.2rem" }}>{info.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{info.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>
                      {a.correct_count}/{a.total_questions} to'g'ri · {formatTime(a.time_spent_seconds)} · {formatDate(a.created_at)}
                    </div>
                  </div>
                  <ScorePill score={a.score_percent} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
