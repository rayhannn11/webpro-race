"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on("initialized", () => setReady(true));
  }, [i18n]);

  if (!ready) return null;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="border p-1 rounded"
    >
      <option value="id">🇮🇩 Bahasa Indonesia</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
}
