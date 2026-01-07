"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Eye,
  Lock,
  MapPin,
  Users,
  FileText,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type Section = {
  id: string;
  title: string;
  icon: React.ElementType;
  content?: string;
};

const sections: Section[] = [
  {
    id: "introduction",
    title: "privacy.sections.introduction.title",
    icon: Users,
    content: "privacy.sections.introduction.content.welcome",
  },
  {
    id: "collection",
    title: "privacy.sections.collection.title",
    icon: Eye,
    content: "privacy.sections.collection.content.situations",
  },
  {
    id: "dataTypes",
    title: "privacy.sections.dataTypes.title",
    icon: FileText,
    content: "privacy.sections.dataTypes.content.types",
  },
  {
    id: "location",
    title: "privacy.sections.location.title",
    icon: MapPin,
    content: "privacy.sections.location.content.usageItems",
  },
  {
    id: "usage",
    title: "privacy.sections.usage.title",
    icon: Users,
    content: "privacy.sections.usage.content.purposes",
  },
  {
    id: "security",
    title: "privacy.sections.security.title",
    icon: Lock,
    content: "privacy.sections.security.content.measures.description",
  },
  {
    id: "rights",
    title: "privacy.sections.rights.title",
    icon: Shield,
    content: "privacy.sections.rights.content",
  },
  {
    id: "contact",
    title: "privacy.contact.title",
    icon: Mail,
    content: "privacy.contact.description",
  },
];

const PrivacyPage = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getSafeTranslation = (key: string, fallback?: string) => {
    const translation = t(key);
    return translation === key ? fallback || key : translation;
  };

  useEffect(() => {
    if (observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const animatedElements = document.querySelectorAll("[data-animate]");
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const renderContent = (section: Section) => {
    const contentKey = section.content;
    
    // Handle special cases for different sections
    if (section.id === "introduction") {
      return (
        <div className="space-y-3 font-montserrat">
          <p className="text-gray-700 leading-relaxed text-lg">
            {getSafeTranslation("privacy.sections.introduction.content.welcome")}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            <strong className="font-montserrat font-semibold">{getSafeTranslation("privacy.sections.introduction.content.personalDataDefinition")}</strong>
          </p>
          <p className="text-gray-700 leading-relaxed text-lg font-montserrat font-medium">
            {getSafeTranslation("privacy.sections.introduction.content.disclaimer")}
          </p>
        </div>
      );
    }

    if (section.id === "collection") {
      const situations = t("privacy.sections.collection.content.situations", { returnObjects: true }) as string[];
      return (
        <div className="space-y-3 font-montserrat">
          <p className="text-gray-700 leading-relaxed text-lg">
            {getSafeTranslation("privacy.sections.collection.content.description")}
          </p>
          <div className="space-y-2">
            {Array.isArray(situations) && situations.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="font-montserrat">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.id === "dataTypes") {
      const types = t("privacy.sections.dataTypes.content.types", { returnObjects: true }) as string[];
      return (
        <div className="space-y-3 font-montserrat">
          <p className="text-gray-700 leading-relaxed text-lg">
            {getSafeTranslation("privacy.sections.dataTypes.content.description")}
          </p>
          <div className="space-y-2">
            {Array.isArray(types) && types.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="font-montserrat">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.id === "location") {
      const usageItems = t("privacy.sections.location.content.usageItems", { returnObjects: true }) as string[];
      return (
        <div className="space-y-3 font-montserrat">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.location.content.backgroundAccess.title")}
            </h4>
            <p className="text-gray-700 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.location.content.backgroundAccess.description")}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {getSafeTranslation("privacy.sections.location.content.usageTitle")}
          </p>
          <div className="space-y-2">
            {Array.isArray(usageItems) && usageItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="font-montserrat">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.location.content.userControl.title")}
            </h4>
            <p className="text-gray-700 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.location.content.userControl.description")}
            </p>
          </div>
        </div>
      );
    }

    if (section.id === "usage") {
      const purposes = t("privacy.sections.usage.content.purposes", { returnObjects: true }) as Array<{title: string, description: string}>;
      return (
        <div className="space-y-3 font-montserrat">
          <p className="text-gray-700 leading-relaxed text-lg">
            {getSafeTranslation("privacy.sections.usage.content.description")}
          </p>
          <div className="space-y-3">
            {Array.isArray(purposes) && purposes.map((purpose, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <h4 className="font-montserrat font-medium text-gray-900 mb-1">{purpose.title}</h4>
                <p className="text-gray-700 text-sm font-montserrat">{purpose.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.id === "security") {
      return (
        <div className="space-y-3 font-montserrat">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.security.content.measures.title")}
            </h4>
            <p className="text-gray-700 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.security.content.measures.description")}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.security.content.notice.title")}
            </h4>
            <p className="text-gray-700 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.security.content.notice.description")}
            </p>
          </div>
        </div>
      );
    }

    if (section.id === "rights") {
      return (
        <div className="space-y-3 font-montserrat">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.rights.content.optOut.title")}
            </h4>
            <p className="text-gray-700 text-sm mb-2 font-montserrat">
              {getSafeTranslation("privacy.sections.rights.content.optOut.description")}
            </p>
            <p className="text-blue-600 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.rights.content.optOut.contact")}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.rights.content.access.title")}
            </h4>
            <p className="text-gray-700 text-sm mb-2 font-montserrat">
              {getSafeTranslation("privacy.sections.rights.content.access.description")}
            </p>
            <p className="text-gray-600 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.rights.content.access.processingTime")}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-montserrat font-medium text-gray-900 mb-2">
              {getSafeTranslation("privacy.sections.rights.content.consequences.title")}
            </h4>
            <p className="text-gray-700 text-sm font-montserrat">
              {getSafeTranslation("privacy.sections.rights.content.consequences.description")}
            </p>
          </div>
        </div>
      );
    }

    // Default rendering for simple content
    return (
      <p className="text-gray-700 leading-relaxed text-lg font-montserrat">
        {getSafeTranslation(contentKey || "")}
      </p>
    );
  };

  return (
    <main className="flex flex-col min-h-screen bg-white font-montserrat">
      <Header />
      
      {/* Hero Section */}
      <section className="px-8 pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-montserrat font-light text-gray-900 mb-6 tracking-tight">
            {getSafeTranslation("privacy.title", "Privacy Policy")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-montserrat">
            {getSafeTranslation("privacy.subtitle", "Raja Cepat is committed to protecting the privacy and security of your personal data")}
          </p>
          <div className="mt-6 text-sm text-gray-500 font-montserrat">
            {getSafeTranslation("privacy.footer.disclaimer", "This Privacy Policy may be changed at any time. Changes will be announced through our website.")}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              
              return (
                <div
                  key={section.id}
                  id={section.id}
                  data-animate
                  className={`transition-all duration-1000 transform ${
                    isVisible[section.id] 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-montserrat font-light text-gray-900 mb-4 tracking-tight">
                        {getSafeTranslation(section.title as string)}
                      </h2>
                      
                      <div className="prose prose-gray max-w-none">
                        {renderContent(section)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle divider */}
                  {index < sections.length - 1 && (
                    <div className="mt-12 pt-0">
                      <div className="w-24 h-px bg-gradient-to-r from-gray-200 to-transparent mx-auto"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;