import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Section2() {
  const t = useTranslations("About.section2");

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl italic text-center mb-12" data-aos="fade-up">{t("title")}</h1>
        <div className="bg-base-200 rounded-xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start shadow" data-aos="fade-up" data-aos-delay="100">
          {/* Left: About */}
          <div className="flex-1 min-w-0" data-aos="fade-right" data-aos-delay="200">
            <div className="mb-4 text-xl italic" data-aos="fade-right" data-aos-delay="300">{t("about.title")}</div>
            <div className="text-base-content/80 text-sm mb-6" data-aos="fade-right" data-aos-delay="400">
              {t("about.description")}
            </div>
            <button className="btn btn-link px-0 text-base-content/80" data-aos="fade-right" data-aos-delay="500">{t("about.more")}</button>
          </div>
          {/* Right: Profile */}
          <div className="w-full md:w-64 flex flex-col items-center bg-base-100 rounded-xl p-6 shadow-sm" data-aos="fade-left" data-aos-delay="300">
            <Image 
              src="https://picsum.photos/100" 
              alt={t("team1.name")} 
              width={96}
              height={96}
              className="rounded-full mb-4 object-cover" 
            />
            <div className="italic text-lg mb-2" data-aos="fade-left" data-aos-delay="400">{t("team1.name")}</div>
            <div className="text-xs text-base-content/80 text-center mb-4" data-aos="fade-left" data-aos-delay="500">
              {t("team1.description")}
            </div>
            <button className="btn btn-link px-0 text-base-content/80" data-aos="fade-left" data-aos-delay="600">{t("team1.more")}</button>
          </div>
        </div>
      </div>
    </section>
  );
} 