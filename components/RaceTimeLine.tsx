"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const gradientMap: Record<string, string> = {
  "bg-red-500": "conic-gradient(#7f1d1d, #ef4444, #fecaca)",
  "bg-orange-500": "conic-gradient(#78350f, #f97316, #ffedd5)",
  "bg-green-500": "conic-gradient(#14532d, #22c55e, #bbf7d0)",
  "bg-cyan-600": "conic-gradient(#155e75, #0891b2, #cffafe)",
  "bg-blue-900": "conic-gradient(#1e3a8a, #3b82f6, #dbeafe)",
  "bg-blue-800": "conic-gradient(#1e40af, #2563eb, #bfdbfe)",
  "bg-purple-600": "conic-gradient(#581c87, #9333ea, #e9d5ff)",
};

const timelineColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-cyan-600",
  "bg-blue-900",
  "bg-blue-800",
  "bg-purple-600",
];

export default function RaceTimeline() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInViewPort, setIsInViewPort] = useState(true);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  // Ambil data dari JSON translation
  const timelineJson = t("timeline.items", { returnObjects: true });
  const timeline = Object.entries(timelineJson).map(([year, val]: any, index) => ({
    year,
    title: val.title,
    desc: val.description,
    color: timelineColors[index % timelineColors.length],
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150); // Reduced timeout

      if (sectionRef.current) {
        const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInViewPort(inView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Added passive
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="py-32 px-5 md:px-12 lg:px-24 font-montserrat"
      style={{
        background: "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.97))",
      }}
    >
      <motion.h2
        className="text-5xl font-bold text-center text-[#f05423] mb-16 font-montserrat"
        initial={{ opacity: 0, y: 30 }}
        animate={isInViewPort ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {t("timeline.title")}
      </motion.h2>

      {/* Desktop */}
      <div className="hidden lg:block relative">
        <div className="absolute top-[96px] left-0 right-0 h-[2px] bg-gray-200 overflow-hidden z-0">
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-orange-500 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }} // Slower animation
          />
        </div>

        <div className="grid grid-cols-7 gap-10 justify-items-center z-10">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isScrolling={isScrolling}
              isInViewPort={isInViewPort}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-20 lg:hidden relative mt-10">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[24px] bottom-0 w-[2px] bg-gray-300 overflow-hidden z-0">
          <motion.div
            className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-blue-500 via-orange-500 to-transparent"
            animate={{ y: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }} // Slower animation
          />
        </div>

        {timeline.map((item, index) => (
          <div
            key={item.year}
            className={`relative flex items-start ${
              index % 2 === 0 ? "justify-start pr-6" : "justify-end pl-6"
            }`}
          >
            <div
              className={`absolute top-[24px] w-4 h-[2px] bg-gray-300 z-0 ${
                index % 2 === 0 ? "left-1/2 -ml-2" : "right-1/2 -mr-2"
              }`}
            />
            <TimelineItem
              item={item}
              index={index}
              isMobile
              isScrolling={isScrolling}
              isInViewPort={isInViewPort}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isMobile = false,
  isScrolling = false,
  isInViewPort = true,
}: {
  item: { year: string; title: string; desc: string; color: string };
  index: number;
  isMobile?: boolean;
  isScrolling?: boolean;
  isInViewPort?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const gradient = gradientMap[item.color] || "conic-gradient(#fff, #eee)";

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center z-10 font-montserrat"
      initial={{ opacity: 0, y: 20 }} // Reduced initial y offset
      animate={
        isInView && isInViewPort 
          ? { opacity: 1, y: 0 } // Removed the shake animation for performance
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }} // Reduced duration and delay
    >
      <div className="relative w-12 h-12 flex items-center justify-center mb-4">
        <motion.div
          className="absolute w-12 h-12 rounded-full z-0"
          style={{
            background: gradient,
            maskImage: "radial-gradient(circle, white 58%, transparent 59%)",
            WebkitMaskImage: "radial-gradient(circle, white 58%, transparent 59%)",
            filter: "blur(3px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Slower rotation
        />
        <motion.div
          className={`absolute w-12 h-12 rounded-full blur-md ${item.color} opacity-60 z-0`}
          animate={
            isInView && isInViewPort && !isScrolling // Only animate when not scrolling
              ? { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] } // Reduced scale and opacity changes
              : { scale: 1, opacity: 0.4 }
          }
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3, // Slower pulsing
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
        <div className="w-6 h-6 rounded-full border-4 border-gray-400 bg-white z-10" />
      </div>

      <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-1 font-montserrat">{item.year}</h4>
      <div className="h-[50px] flex items-center justify-center">
        <p className="text-sm md:text-base text-gray-500 text-center leading-tight font-montserrat">{item.title}</p>
      </div>

      <motion.div
        className={`mt-5 w-[180px] h-[100px] bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex items-center justify-center text-center text-sm text-gray-700 leading-relaxed font-montserrat ${
          isMobile ? (index % 2 === 0 ? "ml-4" : "mr-4") : ""
        }`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView && isInViewPort ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <span className="overflow-hidden text-ellipsis font-montserrat">
          {item.desc}
        </span>
      </motion.div>
    </motion.div>
  );
}