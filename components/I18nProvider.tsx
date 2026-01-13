"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/app/i18n/client";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for i18n to be ready
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on("initialized", () => {
        setIsInitialized(true);
      });
    }

    // Also handle language loaded event
    const handleLoaded = () => {
      setIsInitialized(true);
    };
    
    i18n.on("loaded", handleLoaded);
    i18n.on("languageChanged", handleLoaded);

    return () => {
      i18n.off("loaded", handleLoaded);
      i18n.off("languageChanged", handleLoaded);
    };
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
