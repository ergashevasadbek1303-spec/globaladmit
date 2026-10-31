import React, { useEffect, useState } from "react";
import { statsAPI } from "../api";
import { useAuth } from "../api/AuthContext";

export default function LeaderboardPage() {
  const { user } = useAuth();
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
          <h1>🏆 Reyting</h1>
          <p>Eng ko'p ball to'plagan talabalar</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="card" style={{ padding: "0.5rem 0" }}>
          {board.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-2)" }}>
              Hali hech kim test topshirmagan. Birinchi bo'ling! 🚀
            </div>
          ) : (
            board.map((u) => (
              <div
                key={u.rank}
                id={`rank-row-${u.rank}`}
                className={`leaderboard-row ${u.is_me ? "me" : ""}`}
              >
                <div className={`rank-badge ${rankClass(u.rank)}`}>
                  {u.rank <= 3
                    ? ["🥇", "🥈", "🥉"][u.rank - 1]
                    : u.rank}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {u.full_name}
                    {u.is_me && (
                      <span style={{ background: "rgba(108,99,255,0.2)", color: "var(--accent-2)", fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: 700 }}>
                        Sen
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>@{u.username}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--accent-2)" }}>
                    {u.total_points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>ball</div>
                </div>

                <div
                  className="streak-badge"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.55rem" }}
                >
                  🔥{u.streak}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {board.length > 0 && !board.find((u) => u.is_me) && (
        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(108,99,255,0.08)",
            borderRadius: "var(--radius)",
            border: "1px dashed rgba(108,99,255,0.3)",
            color: "var(--text-2)",
            fontSize: "0.9rem",
          }}
        >
          💡 Ko'proq test topshirsangiz, reytingga kirasiz!
        </div>
      )}
    </div>
  );
}
