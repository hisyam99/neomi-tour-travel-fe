import React from "react";
import { useTranslations } from "next-intl";

export default function Section1() {
  const t = useTranslations("Homestay.section1");

  return (
    <div 
      className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center -mt-16 pt-16"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/800?random=20)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-16">
        <div className="max-w-xl text-left text-neutral-content" data-aos="fade-up">
          <h1 className="mb-4 text-5xl italic" data-aos="fade-up" data-aos-delay="100">{t("title")}</h1>
          <p className="mb-6" data-aos="fade-up" data-aos-delay="200">{t("description")}</p>
          <button className="btn btn-outline btn-primary flex items-center gap-2" data-aos="fade-up" data-aos-delay="300">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            {t("playVideo")}
          </button>
        </div>
      </div>
    </div>
  );
} 