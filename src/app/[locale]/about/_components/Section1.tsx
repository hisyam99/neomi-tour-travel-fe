import React from "react";
import { useTranslations } from "next-intl";

export default function Section1() {
  const t = useTranslations("About.section1");

  return (
    <div 
      className="relative min-h-[300px] md:min-h-[400px] flex items-center"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/600?random=70)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-12 flex items-center">
        <div className="max-w-xl text-left text-neutral-content">
          <h1 className="mb-4 text-5xl italic">{t("title")}</h1>
          <p className="mb-2">{t("description")}</p>
          <button className="btn btn-outline btn-primary flex items-center gap-2 mt-4">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            {t("playVideo")}
          </button>
        </div>
      </div>
    </div>
  );
} 