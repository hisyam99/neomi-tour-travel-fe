import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Section1() {
  const t = useTranslations("Packages.section1");

  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center -mt-16 pt-16">
      <Image 
        src="/tourandtravel/tour.jpg"
        alt={t("imageAlt", { defaultValue: "Neomi Tour" })}
        fill
        className="object-cover -z-10"
        priority
        sizes="100vw"
        quality={85}
      />
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-16">
        <div className="max-w-xl text-left text-neutral-content">
          <h1 className="mb-4 text-5xl italic" data-aos="fade-up" data-aos-delay="200">{t("title")}</h1>
          <p className="mb-6" data-aos="fade-up" data-aos-delay="300">{t("description")}</p>
          <button className="btn btn-outline btn-primary flex items-center gap-2" data-aos="fade-up" data-aos-delay="400">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            {t("playVideo")}
          </button>
        </div>
      </div>
    </div>
  );
} 