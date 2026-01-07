"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const getVehicles = (t: (key: string, options?: any) => string) => [
  {
    name: t("vehicle.types.cdeTruck"),
    image: "/images/cde.png",
    capacity: "2.200kg",
    dimensions: "310×170×170",
    color: "#3b82f6",
    key: "cdeTruck",
  },
  {
    name: t("vehicle.types.cdeFrozen"),
    image: "/images/frozen.png",
    capacity: "2.000kg",
    dimensions: "475×170×175",
    color: "#06b6d4",
    key: "cdeFrozen",
  },
  {
    name: t("vehicle.types.l300"),
    image: "/images/l300.png",
    capacity: "800kg",
    dimensions: "237×163×122",
    color: "#10b981",
    key: "l300",
  },
  {
    name: t("vehicle.types.grandMax"),
    image: "/images/grandmax.png",
    capacity: "600kg",
    dimensions: "220×135×130",
    color: "#f59e0b",
    key: "grandMax",
  },
  {
    name: t("vehicle.types.motor"),
    image: "/images/motor.png",
    capacity: "30kg",
    dimensions: "100×50×40",
    color: "#ef4444",
    key: "motor",
  },
];

const VehicleSection = () => {
  const { t } = useTranslation();
  const vehicles = getVehicles(t);

  return (
    <section
      id="kendaraan"
      className="bg-gradient-to-br from-slate-50 to-white py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            {t("vehicle.title")}
          </h2>
          <p className="text-gray-600">{t("vehicle.subtitle")}</p>
        </motion.div>

        {/* Vehicle Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.key}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Vehicle Image */}
                <div className="relative h-48 flex items-center justify-center">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-36 object-contain px-4 filter drop-shadow transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                    style={{
                      filter: `drop-shadow(0 0 0 ${vehicle.color})`,
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.filter = `drop-shadow(0 0 20px ${vehicle.color})`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.filter = `drop-shadow(0 0 0 ${vehicle.color})`)
                    }
                  />

                  {/* Overlay Info Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Info className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Color Accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: vehicle.color }}
                  />
                </div>

                {/* Vehicle Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">
                    {vehicle.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>{t("vehicle.capacity")}</span>
                      <span className="font-medium">{vehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("vehicle.dimensions")}</span>
                      <span className="font-medium">{vehicle.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fitur Bawah */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">🔧</span>
              {t("vehicle.features.wellMaintained")}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">📸</span>
              {t("vehicle.features.realPhotos")}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">🚚</span>
              {t("vehicle.features.readyToday")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSection;