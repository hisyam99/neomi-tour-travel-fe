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
          <a 
            href="https://wa.me/6281234567890?text=Hello%20Neomi%2C%20I%E2%80%99m%20interested%20in%20arranging%20a%20personalized%20custom%20trip.%20Could%20you%20please%20assist%20me%20with%20the%20details%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-primary mt-4" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            {t("contactUs")}
          </a>
        </div>
      </div>
    </section>
  );
} 