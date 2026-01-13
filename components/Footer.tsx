"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Footer() {
  const { t, ready } = useTranslation();
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Don't render until translations are ready
  if (!ready) {
    return null;
  }

  return (
    <footer className="relative bg-[#0f172a]/80 text-white overflow-hidden backdrop-blur-md font-montserrat">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff671f]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Kiri: Logo + deskripsi */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#ff671f] to-orange-400 rounded-2xl flex items-center justify-center">
                  <img
                    src="/images/rece.png"
                    alt="Logo RajaCepat"
                    width={40}
                    height={40}
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-montserrat font-bold">{t("footer.logo.name")}</h3>
                  <p className="text-sm text-gray-400 font-montserrat">{t("footer.logo.tagline")}</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-md font-montserrat">
                {t("footer.description")}
              </p>

              {/* Sosial Media */}
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, name: "instagram", href: "https://www.instagram.com/raja.cepat/" },
                ].map(({ icon: Icon, name, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(`footer.social.${name}`)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-[#ff671f]/20 hover:border-[#ff671f]/30 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Kanan: Membantu & Unduh Aplikasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Membantu */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-[#ff671f] font-montserrat font-semibold text-lg mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[#ff671f] rounded-full mr-3" />
                  {t("footer.sections.help.title")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      href="#"
                      className="group flex items-center hover:text-[#ff671f] transition-colors duration-300 font-montserrat"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {t("footer.sections.help.items.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="group flex items-center hover:text-[#ff671f] transition-colors duration-300 font-montserrat"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {t("footer.sections.help.items.privacy")}
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Unduh Aplikasi */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-[#ff671f] font-montserrat font-semibold text-lg mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[#ff671f] rounded-full mr-3" />
                  {t("footer.sections.downloadApp.title")}
                </h4>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                    <img
                      src="/images/playstore.png"
                      alt="Play Store"
                      width={160}
                      height={50}
                      className="rounded-lg"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer bawah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          >
            <p className="text-gray-400 text-sm font-montserrat">
              {t("footer.bottom.copyright", {
                year: currentYear,
              })}
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-[#ff671f] transition-colors font-montserrat">
                {t("footer.bottom.links.privacyPolicy")}
              </Link>
              <Link href="#" className="hover:text-[#ff671f] transition-colors font-montserrat">
                {t("footer.bottom.links.termsOfService")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}