import React, { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿", short: "UZ" },
  { code: "ru", label: "Русский",   flag: "🇷🇺", short: "RU" },
  { code: "en", label: "English",   flag: "🇬🇧", short: "EN" },
];

function getSavedLang() {
  try {
    const saved = localStorage.getItem("globaladmit_lang");
    if (saved && translations[saved]) return saved;
  } catch {}
  return "uz";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getSavedLang);

  const changeLanguage = useCallback((newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      try { localStorage.setItem("globaladmit_lang", newLang); } catch {}
    }
  }, []);

  const t = useCallback((key, params = {}) => {
    const dict = translations[lang] ?? translations.uz;
    let text = dict[key] ?? translations.uz[key] ?? key;
    Object.keys(params).forEach((p) => {
      text = text.replace(new RegExp(`\\{${p}\\}`, "g"), String(params[p]));
    });
    return text;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
