"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { ratingService } from "../../../../services/ratings";
import { useApi } from "@/hooks/useApi";
import { Rating, ApiResponse } from "@/types";

export default function Section5() {
  const t = useTranslations("Home.section5");
  const carouselRef = useRef<HTMLDivElement>(null);
  const fetchRatings = useCallback(() => ratingService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Rating[]>, []>(fetchRatings);

  useEffect(() => {
    execute();
  }, [execute]);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-base-100 rounded w-1/4 mb-8 animate-pulse"></div>
          <div className="flex justify-end mb-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-base-100 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 bg-base-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-full md:w-1/3 max-w-md mx-auto bg-transparent">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-4 gap-4 md:gap-6">
                  <div className="w-20 h-20 bg-base-100 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-base-100 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-base-100 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-base-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading testimonials: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No testimonials found</div>;
  }

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-normal italic mb-12" data-aos="fade-up">{t("title")}</h2>
        <div className="flex justify-end mb-6" data-aos="fade-up" data-aos-delay="100">
          <div className="flex gap-4">
            <button className="btn btn-circle bg-base-100 border-none" onClick={() => scroll("left")} aria-label="Previous">
              <FaChevronLeft className="text-xl" />
            </button>
            <button className="btn btn-circle bg-base-100 border-none" onClick={() => scroll("right")} aria-label="Next">
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ 
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            pointerEvents: "none"
          }}
        >
          {data.data.map((rating, index) => (
            <div
              key={rating.id}
              className="flex-shrink-0 w-full md:w-1/3 max-w-md mx-auto bg-transparent"
              style={{ 
                scrollSnapAlign: "start",
                pointerEvents: "auto"
              }}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-4 gap-4 md:gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={rating.foto}
                    alt={rating.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-5xl text-base-content/40 leading-none mb-2">&ldquo;</div>
                  <blockquote className="italic text-base-content/70 text-base mb-4">{rating.description}</blockquote>
                  <div className="tracking-widest text-xs font-semibold text-base-content/80">{rating.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 