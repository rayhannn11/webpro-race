// app/i18n/client.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import config from "./config";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init(config)
    .catch((err) => console.error("i18n init error:", err));
}

export { i18n };
