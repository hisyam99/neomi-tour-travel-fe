import React from "react";
import { useTranslations } from "next-intl";

export default function Section2() {
  const t = useTranslations("Gallery.section2");

  return (
    <section className="bg-base-100 py-6">
      <div
        className="container mx-auto px-4 flex flex-col items-center justify-center gap-4"
        data-aos="fade-up"
      >
        <h2
          className="text-2xl font-semibold text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("title")}
        </h2>
        <p
          className="text-center max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t("description")}
        </p>
      </div>
    </section>
  );
}
