import React from "react";
import { useTranslations } from "next-intl";

export default function Section1() {
  const t = useTranslations("Gallery.section1");

  return (
    <div 
      className="relative min-h-[300px] md:min-h-[400px] flex items-center -mt-16 pt-16"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/600?random=40)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-12">
        <div className="max-w-2xl text-left text-neutral-content" data-aos="fade-up">
          <h1 className="mb-4 text-5xl italic" data-aos="fade-up" data-aos-delay="100">{t("title")}</h1>
          <p className="mb-2" data-aos="fade-up" data-aos-delay="200">{t("description")}</p>
        </div>
      </div>
    </div>
  );
} 