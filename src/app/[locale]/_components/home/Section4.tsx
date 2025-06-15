"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";

export default function Section4() {
  const t = useTranslations("Home.section4");
  const commonT = useTranslations("Common");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel[]>, []>(fetchPackages);

  useEffect(() => {
    execute();
  }, [execute]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-base-200 rounded w-1/4 mb-8 animate-pulse"></div>
          <div className="flex justify-end mb-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-base-200 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 bg-base-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-64">
                <div className="h-80 bg-base-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-1/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading destinations: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No destinations found</div>;
  }

  // Get first 5 packages
  const popularDestinations = data.data.slice(0, 5);

  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8" data-aos="fade-up">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-5xl mb-4" data-aos="fade-up" data-aos-delay="100">{t("title")}</h2>
            <p className="text-base" data-aos="fade-up" data-aos-delay="200">{t("description")}</p>
          </div>
          <div className="flex items-center gap-4 ml-auto mb-8 lg:mb-0" data-aos="fade-up" data-aos-delay="300">
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("left")}
              aria-label={commonT("previous")}>
              <FaChevronLeft className="text-xl" />
            </button>
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("right")}
              aria-label={commonT("next")}>
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
          style={{ 
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            pointerEvents: "none"
          }}
        >
          {popularDestinations.map((pkg, index) => (
            <Link
              href={`/packages/${pkg.id}`}
              key={pkg.id}
              className="flex-shrink-0 w-64 hover:opacity-90 transition-opacity"
              style={{ 
                scrollSnapAlign: "start",
                pointerEvents: "auto"
              }}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="bg-base-200 rounded shadow h-80 flex items-center justify-center mb-4">
                <Image
                  src={pkg.details[0]?.photos[0]?.url || "https://picsum.photos/256/320"}
                  alt={pkg.name_package}
                  width={256}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <div className="text-lg mb-1 italic">{pkg.name_package}</div>
                <div className="text-sm text-base-content/80">{pkg.details[0]?.duration || "Duration not specified"}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 