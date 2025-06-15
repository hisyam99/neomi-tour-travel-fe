import React from "react";
import { useTranslations } from "next-intl";
import { FaRoute, FaHome, FaLaptop, FaUsers } from "react-icons/fa";

export default function Section3() {
  const t = useTranslations("Home.section3");

  const services = [
    { key: "tour", icon: FaRoute },
    { key: "homestay", icon: FaHome },
    { key: "hotdesk", icon: FaLaptop },
    { key: "coworking", icon: FaUsers }
  ];

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="w-full lg:w-1/3 text-left mb-8 lg:mb-0" data-aos="zoom-in lg:fade-right">
            <h1 className="text-4xl italic mb-3" data-aos="zoom-in lg:fade-right" data-aos-delay="100">{t("title")}</h1>
            <p className="text-base mt-2 max-w-xs" data-aos="zoom-in lg:fade-right" data-aos-delay="200">{t("description")}</p>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.key}
                  className="flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center mb-4 border border-base-300">
                    <service.icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-base text-base-content/80">
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
