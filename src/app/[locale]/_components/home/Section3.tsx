import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { homeServices } from "@/app/[locale]/_constants/homeServices";

export default function Section3() {
  const t = useTranslations("Home.section3");

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="w-full lg:w-1/3 text-left mb-8 lg:mb-0" data-aos="fade-right">
            <h1 className="text-4xl italic mb-3" data-aos="fade-right" data-aos-delay="100">{t("title")}</h1>
            <p className="text-sm mt-2 max-w-xs" data-aos="fade-right" data-aos-delay="200">{t("description")}</p>
          </div>
          <div className="flex-1">
            <div className="flex flex-nowrap lg:justify-start gap-4">
              {homeServices.map((service, index) => (
                <div
                  key={service.key}
                  className="flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="w-12 h-12 rounded-full bg-base-100 flex mb-2 border border-base-300">
                    <Image
                      src={service.icon}
                      alt={t(`${service.key}.title`)}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xs mb-1 font-semibold">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-xs text-base-content/80">
                    {t(`${service.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
