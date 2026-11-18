import React, { useEffect, useState } from "react";
import { statsAPI } from "../api";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsAPI
      .getLeaderboard()
      .then(({ data }) => setBoard(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const rankClass = (rank) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-n";
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>🏆 {t("leaderboardTitle")}</h1>
          <p>{t("leaderboardSubtitle")}</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="card" style={{ padding: "0.5rem 0" }}>
          {board.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-2)" }}>
              {t("noHistory")} 🚀
            </div>
          ) : (
            board.map((u) => (
              <div
                key={u.rank}
                id={`rank-row-${u.rank}`}
                className={`leaderboard-row ${u.is_me ? "me" : ""}`}
              >
                <div className={`rank-badge ${rankClass(u.rank)}`}>
                  {u.rank <= 3 ? ["🥇", "🥈", "🥉"][u.rank - 1] : u.rank}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {u.full_name}
                    {u.is_me && (
                      <span
                        style={{
                          background: "rgba(108,99,255,0.2)",
                          color: "var(--accent-2)",
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "999px",
                          fontWeight: 700,
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>@{u.username}</div>
                </div>

                <div style={{ textAlign: "right", marginRight: "1rem" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--accent-2)" }}>
                    {u.total_points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>ball</div>
                </div>

                <div className="streak-badge">
                  🔥 {t("streakDays", { count: u.streak || 0 })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
