import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLanguage, t, languages } = useLanguage();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          GlobalAdmit
        </NavLink>

        {user && (
          <ul className="navbar-links">
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                {t("navDashboard")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/test" className={({ isActive }) => (isActive ? "active" : "")}>
                {t("navTest")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active" : "")}>
                {t("navLeaderboard")}
              </NavLink>
            </li>
          </ul>
        )}

        <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Language Selector */}
          <div className="lang-selector-wrap" style={{ position: "relative" }}>
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="lang-select"
              aria-label="Select Language"
              style={{
                background: "var(--card-bg, #1e2238)",
                color: "var(--text-1, #f1f5f9)",
                border: "1px solid rgba(108,99,255,0.3)",
                borderRadius: "8px",
                padding: "0.3rem 0.5rem",
                fontSize: "0.85rem",
                cursor: "pointer",
                outline: "none",
                fontWeight: "500",
              }}
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code} style={{ background: "#1a1d30", color: "#fff" }}>
                  {item.flag} {item.short}
                </option>
              ))}
            </select>
          </div>

          <NavLink
            to="/pitch"
            className="btn btn-outline btn-sm"
            style={{ borderColor: "rgba(108,99,255,0.4)", color: "var(--accent-2)" }}
          >
            {t("navPitch")}
          </NavLink>

          {user ? (
            <>
              <div className="streak-badge">
                🔥 {t("streakDays", { count: user.streak || 0 })}
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
                {user.full_name?.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                {t("navLogout")}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline btn-sm">
                {t("navLogin")}
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                {t("navRegister")}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
