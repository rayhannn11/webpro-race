// app/i18n/client.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "./config";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...config,
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    })
    .catch((err) => console.error("i18n init error:", err));
}

export { i18n };
