"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const Keunggulan = () => {
  const { t, ready } = useTranslation();

  const advantages = useMemo(
    () => [
      {
        title: t("advantages.items.doorToDoor.title"),
        description: t("advantages.items.doorToDoor.description"),
        icon: "🚪",
      },
      {
        title: t("advantages.items.doorToPort.title"),
        description: t("advantages.items.doorToPort.description"),
        icon: "🚢",
      },
      {
        title: t("advantages.items.portToPort.title"),
        description: t("advantages.items.portToPort.description"),
        icon: "⚓",
      },
      {
        title: t("advantages.items.realTime.title"),
        description: t("advantages.items.realTime.description"),
        icon: "⏱️",
      },
      {
        title: t("advantages.items.deliveryNote.title"),
        description: t("advantages.items.deliveryNote.description"),
        icon: "📄",
      },
      {
        title: t("advantages.items.coverage.title"),
        description: t("advantages.items.coverage.description"),
        icon: "🗺️",
      },
    ],
    [t]
  );

  // Don't render until translations are ready to prevent hydration mismatch
  if (!ready) {
    return null;
  }

  return (
    <section className="bg-white py-20 px-6 md:px-16 font-montserrat" id="advantages">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4"
        >
          {t("advantages.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-600 max-w-xl mx-auto mb-12"
        >
          {t("advantages.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keunggulan;
