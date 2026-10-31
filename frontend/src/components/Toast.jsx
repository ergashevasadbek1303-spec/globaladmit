import React, { useState, useEffect, useRef } from "react";

export default function Toast({ message, type = "success", duration = 3500, onClose }) {
  const [visible, setVisible] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer.current);
  }, []);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      {type === "success" ? "✅" : "❌"} {message}
    </div>
  );
}
