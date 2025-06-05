import React from "react";
import { useTranslations } from "next-intl";

export default function Section2() {
  const t = useTranslations("Gallery.section2");

  return (
    <section className="bg-base-100 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4" data-aos="fade-up">
        <input type="text" placeholder={t("searchPlaceholder")}
          className="input input-bordered w-full max-w-xs input-sm" data-aos="fade-right" data-aos-delay="100" />
        <select className="select select-bordered w-full max-w-xs select-sm" data-aos="fade-left" data-aos-delay="200">
          <option>{t("all")}</option>
          <option>{t("homestay")}</option>
          <option>{t("tour")}</option>
          <option>{t("event")}</option>
        </select>
      </div>
    </section>
  );
} 