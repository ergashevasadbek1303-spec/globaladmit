import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLanguage, t, languages } = useLanguage();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    nav("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            GlobalAdmit
          </NavLink>

          {/* Desktop links */}
          {user && (
            <ul className="navbar-links desktop-only">
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                  🏠 {t("navDashboard").replace("🏠 ", "")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/test" className={({ isActive }) => (isActive ? "active" : "")}>
                  📝 {t("navTest").replace("📝 ", "")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active" : "")}>
                  🏆 {t("navLeaderboard").replace("🏆 ", "")}
                </NavLink>
              </li>
            </ul>
          )}

          {/* Right side — desktop */}
          <div className="navbar-right desktop-only">
            {/* Language selector */}
            <div className="lang-tabs">
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={`lang-tab${lang === item.code ? " active" : ""}`}
                  onClick={() => changeLanguage(item.code)}
                  aria-label={item.label}
                >
                  {item.flag} {item.short}
                </button>
              ))}
            </div>

            <NavLink
              to="/pitch"
              className="btn btn-outline btn-sm"
              style={{ borderColor: "rgba(108,99,255,0.4)", color: "var(--accent-2)" }}
            >
              📊 Pitch
            </NavLink>

            {user ? (
              <>
                <div className="streak-badge">🔥 {user.streak || 0}</div>
                <span className="user-name">{user.full_name?.split(" ")[0]}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  {t("navLogout")}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline btn-sm">{t("navLogin")}</NavLink>
                <NavLink to="/register" className="btn btn-primary btn-sm">{t("navRegister")}</NavLink>
              </>
            )}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`ham-icon${menuOpen ? " open" : ""}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {/* Language selector */}
          <div className="lang-tabs mobile-lang">
            {languages.map((item) => (
              <button
                key={item.code}
                className={`lang-tab${lang === item.code ? " active" : ""}`}
                onClick={() => { changeLanguage(item.code); }}
              >
                {item.flag} {item.short}
              </button>
            ))}
          </div>

          {user && (
            <div className="mobile-user-info">
              <span>👤 {user.full_name}</span>
              <span className="streak-badge">🔥 {user.streak || 0} kun</span>
            </div>
          )}

          <div className="mobile-links">
            {user ? (
              <>
                <NavLink to="/dashboard" onClick={closeMenu}>🏠 {t("navDashboard").replace("🏠 ","")}</NavLink>
                <NavLink to="/test"      onClick={closeMenu}>📝 {t("navTest").replace("📝 ","")}</NavLink>
                <NavLink to="/leaderboard" onClick={closeMenu}>🏆 {t("navLeaderboard").replace("🏆 ","")}</NavLink>
                <NavLink to="/pitch"     onClick={closeMenu}>📊 Pitch Deck</NavLink>
                <button className="btn btn-outline btn-full" style={{marginTop:"0.5rem"}} onClick={handleLogout}>
                  {t("navLogout")}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/pitch"    onClick={closeMenu}>📊 Pitch Deck</NavLink>
                <NavLink to="/login"    onClick={closeMenu} className="btn btn-outline btn-full">{t("navLogin")}</NavLink>
                <NavLink to="/register" onClick={closeMenu} className="btn btn-primary btn-full">{t("navRegister")}</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
