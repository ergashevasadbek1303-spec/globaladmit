import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
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
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                🏠 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/test" className={({ isActive }) => isActive ? "active" : ""}>
                📝 Test
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "active" : ""}>
                🏆 Reyting
              </NavLink>
            </li>
          </ul>
        )}

        <div className="navbar-right">
          <NavLink to="/pitch" className="btn btn-outline btn-sm" style={{ borderColor: "rgba(108,99,255,0.4)", color: "var(--accent-2)" }}>
            📊 Pitch Deck
          </NavLink>
          {user ? (
            <>
              <div className="streak-badge">
                🔥 {user.streak} kun
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
                {user.full_name.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Chiqish
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline btn-sm">Kirish</NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">Ro'yxat</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
