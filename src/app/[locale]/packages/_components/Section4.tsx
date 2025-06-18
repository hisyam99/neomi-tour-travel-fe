"use client";

import React from "react";
import { TourAndTravel } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface Props {
  packages?: TourAndTravel[];
  loading: boolean;
  error: Error | null;
}

export default function Section4({ packages, loading, error }: Props) {
  const t = useTranslations("Packages.section4.card");

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-base-200 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-base-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-1/2"></div>
                  <div className="h-4 bg-base-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-error text-2xl mb-4">⚠️</div>
        <div className="text-error text-xl font-semibold mb-2">
          {t("errorTitle")}
        </div>
        <div className="text-base-content/70 text-center">{error.message}</div>
      </div>
    );
  }

  if (!packages?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-6">🔍</div>
        <div className="text-2xl font-semibold mb-3">{t("noResultsTitle")}</div>
        <div className="text-base-content/70 text-center max-w-md mb-8">
          {t("noResultsDescription")}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            {t("refreshPage")}
          </button>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            {t("goBack")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        {packages.map((pkg, index) => {
          const details = pkg.details[0];
          const photo = details?.photos?.[0]?.url;

          return (
            <Link
              href={`/packages/${pkg.id}`}
              key={pkg.id}
              className="block bg-base-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={100 * (index % 3)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex items-center justify-center">
                  <Image
                    src={
                      photo ||
                      "https://picsum.photos/400/200?random=" + (index + 1)
                    }
                    alt={pkg.name_package}
                    width={400}
                    height={160}
                    className="object-cover w-full h-40 rounded"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <div className="text-xl font-semibold mb-2">
                      {pkg.name_package}
                    </div>
                    <div className="text-base-content/70 mb-4 text-sm">
                      {details?.detail_wte
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 200) + "..."}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
                    <div className="font-bold text-lg">
                      {t("currency")}{" "}
                      {Number(details?.price || 0).toLocaleString()}
                    </div>
                    <div className="btn btn-outline btn-primary btn-sm">
                      {t("moreDetails")}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Navigation buttons */}
      <div
        className="flex justify-center gap-4 mt-8 pb-8"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <button
          className="btn btn-circle bg-base-200 border-none hover:bg-base-300 transition-colors"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          className="btn btn-circle bg-base-200 border-none hover:bg-base-300 transition-colors"
          aria-label="Next"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}
