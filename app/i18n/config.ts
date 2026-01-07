// app/i18n/config.ts
import { type InitOptions } from "i18next";

const config: InitOptions = {
  fallbackLng: "id",
  supportedLngs: ["en", "id"],
  interpolation: {
    escapeValue: false, // React sudah aman dari XSS
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json", // pastikan sesuai dengan struktur public/locales
  },
  ns: ["translation"],
  defaultNS: "translation",
  react: {
    useSuspense: false, // penting agar tidak stuck loading
  },
};

export default config;
