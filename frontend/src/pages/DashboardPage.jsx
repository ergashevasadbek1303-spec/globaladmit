import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { statsAPI } from "../api";
import { useLanguage } from "../i18n/LanguageContext";

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

export default function DashboardPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const examLabels = {
    SAT_MATH: { label: t("examSatMath"), icon: "📐", cls: "badge-sat" },
    SAT_ENGLISH: { label: t("examSatEnglish"), icon: "📖", cls: "badge-sat" },
    IELTS: { label: t("examIelts"), icon: "🌍", cls: "badge-ielts" },
    DTM_MATH: { label: t("examDtmMath"), icon: "🧮", cls: "badge-dtm" },
    DTM_UZB: { label: t("examDtmUzb"), icon: "🇺🇿", cls: "badge-dtm" },
  };

  const formatDate = (iso) => {
    const localeMap = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };
    return new Date(iso).toLocaleDateString(localeMap[lang] || "uz-UZ", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          <div className="welcome-text">
            {t("dashWelcome")}, {user?.full_name?.split(" ")[0]}! 👋
          </div>
          <h1>Dashboard</h1>
        </div>
        <Link to="/test" className="btn btn-primary btn-lg">
          {t("btnTakeTest")}
        </Link>
      </div>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats?.total_points ?? 0}</div>
          <div className="stat-label">{t("statTotalTests")} / Ball</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.streak ?? 0}</div>
          <div className="stat-label">🔥 {t("streakCol")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.total_attempts ?? 0}</div>
          <div className="stat-label">{t("statTotalTests")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {stats?.stats
              ? Math.round(
                  Object.values(stats.stats).reduce((a, s) => a + s.avg_score, 0) /
                    Math.max(1, Object.values(stats.stats).length)
                )
              : 0}
            %
          </div>
          <div className="stat-label">{t("statAvgScore")}</div>
        </div>
      </div>

      {/* Exam breakdown */}
      {stats?.stats && Object.keys(stats.stats).length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2>{t("whyTitle")}</h2>
          </div>
          <div className="exam-grid">
            {Object.entries(stats.stats).map(([key, data]) => {
              const info = examLabels[key] || { label: key, icon: "📋", cls: "" };
              return (
                <div className="card" key={key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "1.75rem" }}>{info.icon}</span>
                    <div>
                      <span className={`badge ${info.cls}`}>{info.label}</span>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-3)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {data.count} {t("testsCol").toLowerCase()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: "var(--accent-2)",
                        }}
                      >
                        {data.best_score}%
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                        Top ({t("colScore")})
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>{data.avg_score}%</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                        {t("statAvgScore")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* History */}
      <div className="section">
        <div className="section-header">
          <h2>{t("historyTitle")}</h2>
        </div>
        {history.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <h3>{t("noHistory")}</h3>
            <p style={{ marginBottom: "1.5rem" }}>{t("startFirstTest")}</p>
            <Link to="/test" className="btn btn-primary">
              {t("btnTakeTest")}
            </Link>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("colExam")}</th>
                    <th>{t("colScore")}</th>
                    <th>{t("colCorrect")}</th>
                    <th>{t("colTime")}</th>
                    <th>{t("colDate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => {
                    const info = examLabels[h.exam_type] || {
                      label: h.exam_type,
                      icon: "📋",
                      cls: "",
                    };
                    return (
                      <tr key={h.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span>{info.icon}</span>
                            <span className={`badge ${info.cls}`}>{info.label}</span>
                          </div>
                        </td>
                        <td>
                          <ScorePill score={h.score} />
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>
                            {h.correct_count}/{h.total_questions}
                          </span>
                        </td>
                        <td>{formatTime(h.time_spent_seconds)}</td>
                        <td style={{ color: "var(--text-3)", fontSize: "0.85rem" }}>
                          {formatDate(h.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
