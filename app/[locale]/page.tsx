"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import VehicleSection from "@/components/KendaraanGaleri";
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";
import { motion } from "framer-motion";
import Keunggulan from "@/components/keunggulan";
import { useState, useEffect } from "react";
import RaceTimeLine from "@/components/RaceTimeLine";
import Partner from "@/components/Partners";
import { useTranslation } from "react-i18next";
import { I18nProvider } from "@/components/I18nProvider";

const getServiceCards = (t: (key: string) => string) => [
  {
    title: t("service.items.delivery.title"),
    desc: t("service.items.delivery.description"),
    img: "/images/Sameday.png",
    key: "delivery",
  },
  {
    title: t("service.items.express.title"),
    desc: t("service.items.express.description"),
    img: "/images/NextDay.png",
    key: "express",
  },
  {
    title: t("service.items.cargo.title"),
    desc: t("service.items.cargo.description"),
    img: "/images/RegularService.png",
    key: "cargo",
  },
  {
    title: t("service.items.frozen.title"),
    desc: t("service.items.frozen.description"),
    img: "/images/CargoDarat.png",
    key: "frozen",
  },
  {
    title: t("service.items.air.title"),
    desc: t("service.items.air.description"),
    img: "/images/CargoLaut.png",
    key: "air",
  },
  {
    title: t("service.items.distribution.title"),
    desc: t("service.items.distribution.description"),
    img: "/images/CargoUdara.png",
    key: "distribution",
  },
];

function HomePageContent() {
  const { t, ready } = useTranslation();

  const serviceCards = getServiceCards(t);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextCard = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % serviceCards.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? serviceCards.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => nextCard(), 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, index]);

  // Don't render until translations are ready
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50 text-gray-800">
        {/* Hero Slider - Full Width */}
        <HeroSlider />
        
        {/* Content Sections */}
        <Keunggulan />
        <RaceTimeLine />
        {/* OUR SERVICES */}
        <motion.section
          id="layanan"
          className="py-24 bg-gradient-to-b from-white via-orange-50 to-orange-100 text-gray-800 text-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.2 },
            },
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {t("service.title")}
              </h2>
              <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-gray-600 leading-relaxed">
                {t("service.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="relative w-full flex justify-center items-center h-[280px] sm:h-[320px] md:h-[350px]"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <motion.button
                onClick={prevCard}
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white text-orange-500 hover:bg-orange-500 hover:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 z-50 shadow-lg hover:shadow-xl flex items-center justify-center font-bold text-lg transition-all duration-300"
              >
                ←
              </motion.button>

              <motion.button
                onClick={nextCard}
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white text-orange-500 hover:bg-orange-500 hover:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 z-50 shadow-lg hover:shadow-xl flex items-center justify-center font-bold text-lg transition-all duration-300"
              >
                →
              </motion.button>

              <div className="relative flex items-center justify-center w-full max-w-7xl px-4 sm:px-6 md:px-8">
                {serviceCards.map((card, i) => {
                  const total = serviceCards.length;
                  const relativeIndex = (i - index + total) % total;
                  if (relativeIndex > 2 && relativeIndex < total - 1) return null;

                  let translateX = "translate-x-0";
                  let zIndex = 10;
                  let opacity = 0.5;
                  let scale = 0.85;
                  let clickable = false;
                  let isCenter = false;
                  let cardWidth = "w-[260px] sm:w-[280px] md:w-[300px]";
                  let cardHeight = "h-[160px] sm:h-[180px] md:h-[200px]";

                  if (relativeIndex === 0) {
                    translateX = "-translate-x-[240px] sm:-translate-x-[280px] md:-translate-x-[320px]";
                    zIndex = 20;
                    opacity = 0.7;
                  } else if (relativeIndex === 1) {
                    translateX = "translate-x-0";
                    zIndex = 30;
                    opacity = 1;
                    scale = 1.05;
                    clickable = true;
                    isCenter = true;
                    cardWidth = "w-[320px] sm:w-[360px] md:w-[400px]";
                    cardHeight = "h-[200px] sm:h-[220px] md:h-[240px]";
                  } else if (relativeIndex === 2) {
                    translateX = "translate-x-[240px] sm:translate-x-[280px] md:translate-x-[320px]";
                    zIndex = 20;
                    opacity = 0.7;
                  }

                  return (
                    <motion.div
                      key={card.key}
                      className={`absolute transition-all duration-700 ease-out rounded-3xl bg-white text-gray-800 p-4 sm:p-6 ${translateX} ${cardWidth} ${cardHeight} ${isCenter ? "shadow-[0_0_35px_4px_rgba(255,165,0,0.15)]" : "shadow-md"} hover:shadow-xl border border-orange-100/50 ${clickable ? "cursor-pointer" : "cursor-default"}`}
                      style={{ zIndex, opacity, transform: `scale(${scale})` }}
                      onClick={clickable ? nextCard : undefined}
                      whileHover={isCenter ? { scale: 1.08 } : {}}
                    >
                      <div className={`flex items-center h-full ${isCenter ? "justify-start" : "justify-center"} gap-4 sm:gap-6`}>
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center flex-shrink-0 w-[70px] h-[70px] p-4">
                          <Image
                            src={card.img}
                            alt={card.title}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </div>
                        {isCenter && (
                          <div className="text-left flex-1 overflow-hidden ml-4">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-orange-600 mb-1 sm:mb-2">
                              {card.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {card.desc}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {serviceCards.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === index ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <VehicleSection />
        <Partner />
        <Footer />
      </main>
    </>
  );
}

export default function Page() {
  return (
    <I18nProvider>
      <HomePageContent />
    </I18nProvider>
  );
}
