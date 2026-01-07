"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ScrollPinShowcase() {
  const { t } = useTranslation();

  const images = [
    {
      src: "/images/ImageBg.jpg",
      title: t("hero.titles.rajaCepat"),
      desc: t("hero.descriptions.rajaCepat"),
    },
    {
      src: "/images/ImageBg2.jpg",
      title: t("hero.titles.express"),
      desc: t("hero.descriptions.express"),
    },
    {
      src: "/images/Background3.png",
      title: t("hero.titles.services"),
      desc: t("hero.descriptions.services"),
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = [...images, images[0]];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const trueIndex = index % images.length;
            setActiveIndex(trueIndex);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (scrollEl.scrollTop >= maxScroll - 5) {
        setTimeout(() => {
          scrollEl.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);
      }
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="beranda"
      className="w-full flex flex-col-reverse md:flex-row min-h-screen relative overflow-hidden pt-12"
    >
      {/* Clean Blue Background with Subtle Pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #f0f9ff 0%, 
              #e0f2fe 35%, 
              #bae6fd 70%, 
              #7dd3fc 100%
            )
          `,
        }}
      />
      
      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-16 right-16 w-24 h-24 bg-blue-200/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-24 left-12 w-20 h-20 bg-cyan-200/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-14 h-14 bg-blue-300/15 rounded-full blur-lg"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content Area */}
      <div className="w-full md:w-1/2 z-10 px-6 md:px-10 lg:px-12 flex flex-col justify-center min-h-[unset] md:min-h-screen pb-8 md:pb-0">
        <motion.div
          key={images[activeIndex].title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-900 mb-4 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {images[activeIndex].title}
          </motion.h1>

          <motion.p 
            className="text-black-700/80 text-base md:text-lg leading-relaxed mb-6 max-w-lg font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {images[activeIndex].desc}
          </motion.p>
        </motion.div>
      </div>

      {/* Image Gallery */}
      <div className="w-full md:w-1/2 relative z-10">
        <div
          ref={scrollRef}
          className="h-[400px] md:h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory"
          style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
        >
          {displayImages.map((img, i) => (
            <div
              key={`img-${i}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="h-[350px] md:h-[calc(100vh-4rem)] flex items-center justify-center snap-center relative group px-6 md:px-8"
            >
              {/* Image Container with Blue Accent */}
              <div className="relative w-full max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Image
                    src={img.src}
                    alt={`Slide ${i}`}
                    width={600}
                    height={400}
                    className="relative w-full h-auto object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/60 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-blue-400/0 group-hover:from-blue-600/10 group-hover:to-blue-400/5 transition-all duration-300 rounded-2xl" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-6 right-6 flex flex-col items-center space-y-2 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-blue-200/50">
          <div className="text-xs text-blue-600 font-medium mb-1">
            {t("scroll.indicator")}
          </div>
          {images.map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 h-5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-blue-500" : "bg-blue-200"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
