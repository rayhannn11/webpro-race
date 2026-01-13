"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/app/i18n/client";

const languages = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { t, ready } = useTranslation();

  // Tracking moved to right side of navbar
  const navItems: never[] = [];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Cek apakah sedang di halaman contact atau privacy
  const isSpecialPage =
    pathname.includes("/contact") || pathname.includes("/privacy");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Hanya jalankan active section detection di halaman utama
      if (!isSpecialPage) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + section.clientHeight;
          const id = section.getAttribute("id");

          if (scrollPosition >= top && scrollPosition < bottom && id) {
            setActiveSection(`#${id}`);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSpecialPage]);

  const handleLanguageChange = (lang: (typeof languages)[0]) => {
    const segments = pathname.split("/");
    segments[1] = lang.code;
    const newPath = segments.join("/") || "/";

    i18n.changeLanguage(lang.code);
    router.push(newPath);
    setIsLanguageDropdownOpen(false);
  };

  if (!mounted) return null;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo kiri */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/rece.png" alt="Logo" width={70} height={40} />
          </Link>
        </div>

        {/* Spacer for center alignment */}
        <div className="flex-1" />

        {/* Right side: Language, Tracking, Contact */}
        <div className="hidden md:flex justify-end items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
            >
              {currentLanguage.flag}
              <HiChevronDown
                className={`transition-transform ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 bg-white rounded-md shadow-lg border w-32 text-sm"
                >
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      {lang.flag} {lang.name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          
          {/* Tracking Link */}
          <Link
            href="/tracking"
            className={`text-base font-medium transition-colors ${
              pathname.includes("/tracking")
                ? "text-orange-600"
                : "text-gray-700 hover:text-orange-600"
            }`}
          >
            {ready ? t("navigation.tracking") : "Tracking"}
          </Link>
          
          {/* Contact Button */}
          <Link
            href="/contact"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            {t("navigation.contact")}
          </Link>
        </div>

        {/* Mobile toggle (pojok kanan) f */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {/* Tracking Link */}
              <Link
                href="/tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base ${
                  pathname.includes("/tracking")
                    ? "text-orange-600 font-medium"
                    : "text-gray-800"
                }`}
              >
                {ready ? t("navigation.tracking") : "Tracking"}
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-2 text-white bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-center py-2 rounded-md hover:from-orange-600 hover:to-orange-700"
              >
                {t("navigation.contact")}
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  {t("navigation.selectLanguage")}
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      currentLanguage.code === lang.code
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
