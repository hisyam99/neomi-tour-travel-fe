"use client";

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Homestay } from "@/types";
import { useTranslations } from "next-intl";

interface Section4Props {
  homestays: Homestay[];
  loading: boolean;
  error: Error | null;
}

export default function Section4({ homestays, loading, error }: Section4Props) {
  const t = useTranslations("Homestay.section4.card");

  if (loading) {
  return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-base-200 rounded-xl overflow-hidden animate-pulse">
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
        <div className="text-error text-xl font-semibold mb-2">{t("errorTitle")}</div>
        <div className="text-base-content/70 text-center">{error.message}</div>
      </div>
    );
  }

  if (!homestays?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-6">🏠</div>
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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => {
            const details = homestay.details;
            const photo = details?.photos?.[0]?.path;
            
            return (
              <Link 
                href={`/homestay/${homestay.id}`}
                key={homestay.id}
                className="block bg-base-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                    <Image 
                    src={photo || "https://picsum.photos/400/300"}
                    alt={homestay.name}
                      fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{homestay.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                    <div className="flex items-center gap-1">
                      <span>🏠</span>
                      <span>{details?.type || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>Max {details?.max_guest || 0} {t("guests")}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-semibold">
                      {t("currency")} {Number(details?.price || 0).toLocaleString()} {t("perNight")}
                    </div>
                    <div className="btn btn-primary btn-sm">
                      {t("moreDetails")}
                    </div>
                  </div>
                </div>
                </Link>
            );
          })}
            </div>
            {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Previous">
                <FaChevronLeft className="text-xl" />
              </button>
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Next">
                <FaChevronRight className="text-xl" />
              </button>
        </div>
      </div>
    </section>
  );
} 