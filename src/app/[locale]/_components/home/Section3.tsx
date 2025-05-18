import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { homeServices } from "@/app/[locale]/_constants/homeServices";

export default function Section3() {
  const t = useTranslations("Home.section3");

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Title/Desc */}
          <div className="lg:col-span-1 text-left">
            <h2 className="text-5xl font-bold mb-4">{t("title")}</h2>
            <p className="text-base mt-4">{t("description")}</p>
          </div>
          {/* Service Cards */}
          {homeServices.map((service) => (
            <div key={service.key} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-base-100 flex items-center justify-center mb-4 border border-base-300">
                <Image src={service.icon} alt={t(`${service.key}.title`)} width={96} height={96} className="w-16 h-16 object-contain opacity-60" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(`${service.key}.title`)}</h3>
              <p className="text-sm text-base-content/80">{t(`${service.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 