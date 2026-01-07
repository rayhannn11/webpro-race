// app/[locale]/layout.tsx
import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { languages } from "@/app/i18n/settings";
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Raja Cepat",
  description: "Multilingual site",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!languages.includes(locale)) {
    notFound(); 
  }

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="font-montserrat">{children}</body>
    </html>
  );
}
