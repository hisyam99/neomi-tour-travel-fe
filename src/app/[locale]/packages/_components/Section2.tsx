import React from "react";
import { useTranslations } from "next-intl";

export default function Section2() {
  const t = useTranslations("Packages.section2");

  return (
    <section className="bg-base-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base-content/80" data-aos="fade-up" data-aos-delay="100">
            {t("description")}
          </p>
          <button className="btn btn-outline btn-primary mt-4" data-aos="fade-up" data-aos-delay="200">{t("contactUs")}</button>
        </div>
      </div>
    </section>
  );
} 