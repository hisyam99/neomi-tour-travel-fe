import React from "react";
import { useTranslations } from "next-intl";

export default function Section2() {
  const t = useTranslations("Homestay.section2");

  return (
    <section className="bg-base-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          <p className="text-base-content/80" data-aos="fade-up" data-aos-delay="100">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
} 