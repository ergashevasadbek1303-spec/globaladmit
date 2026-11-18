import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const SUPPORTED_LANGUAGES = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿", short: "UZ" },
  { code: "ru", label: "Русский", flag: "🇷🇺", short: "RU" },
  { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("globaladmit_lang") || "uz";
  });

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      localStorage.setItem("globaladmit_lang", newLang);
    }
  };

  const t = (key, params = {}) => {
    const langDict = translations[lang] || translations.uz;
    let text = langDict[key] || translations.uz[key] || key;

    // Parameter interpolation like {count}
    Object.keys(params).forEach((p) => {
      text = text.replace(new RegExp(`\\{${p}\\}`, "g"), params[p]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
