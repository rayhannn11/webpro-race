"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { i18n } from "@/app/i18n/client";

interface Partner {
  id: string;
  logo: string;
}

interface StatItem {
  value: string;
  label: string;
}

const PARTNERS_CONFIG: Partner[] = [
  { id: "auriga", logo: "/images/auriga.png" },
  { id: "cosmax", logo: "/images/cosmax.png" },
  { id: "eurekabook", logo: "/images/eurekabook.png" },
  { id: "gokomodo", logo: "/images/gokomodo.png" },
  { id: "idmark", logo: "/images/idmark.png" },
  { id: "jajai", logo: "/images/jajai.png" },
  { id: "kitani", logo: "/images/kitani.png" },
  { id: "erlangga", logo: "/images/penerbit.png" },
  { id: "sinbad", logo: "/images/sinbad.png" },
  { id: "super", logo: "/images/super.png" },
  { id: "w", logo: "/images/w.jpg" },
  { id: "Pro", logo: "/images/pro.png" },
];

const FALLBACK_LOGO = {
  src: "/images/partner-fallback.png",
  alt: "Partner Logo",
};

const AnimatedCount = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 3000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      setCount(parseFloat((percent * to).toFixed(1)));
      if (percent < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to]);

  return <>{count.toFixed(1)}%</>;
};

const Partners = () => {
  const { t } = useTranslation();
  const lng = i18n.language;

  const title = t("partners.title");
  const subtitle = t("partners.subtitle");
  const stats = t("partners.stats", { returnObjects: true, defaultValue: [] }) as StatItem[];
  const [titleFirst, titleSecond] = title.split(" ", 2);

  return (
    <section id="mitra" className="relative bg-white py-20 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 font-montserrat">
            {titleFirst}{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-montserrat">
              {titleSecond}
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto font-montserrat">{subtitle}</p>
        </motion.div>

        {/* Logos */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {PARTNERS_CONFIG.map((partner) => {
            const alt = t(`partners.companies.${partner.id}.alt`, {
              defaultValue: FALLBACK_LOGO.alt,
            });

            return (
              <motion.div
                key={partner.id}
                className="bg-white border rounded-xl shadow-sm p-4 flex items-center justify-center hover:shadow-md transition font-montserrat"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={partner.logo}
                  alt={alt}
                  className="h-10 object-contain hover:grayscale transition"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_LOGO.src;
                    e.currentTarget.alt = FALLBACK_LOGO.alt;
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 border-t border-gray-100 pt-12 font-montserrat"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {stats.map((stat, i) => {
              const isSuccessRate = stat.value.includes("%");

              return (
                <motion.div
                  key={i}
                  className="text-center font-montserrat"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-montserrat">
                    {isSuccessRate ? (
                      <AnimatedCount to={parseFloat(stat.value.replace(",", "."))} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide font-montserrat">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;  