"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { homeDestinations } from "@/app/[locale]/_constants/homeDestinations";
import Link from "next/link";

export default function Section4() {
  const t = useTranslations("Home.section4");
  const commonT = useTranslations("Common");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          style={{ scrollSnapType: "x mandatory" }}
        >
          {homeDestinations.map((dest, index) => (
            <Link
              href={`/destinations/${dest.key}`}
              key={dest.key}
              className="flex-shrink-0 w-64 hover:opacity-90 transition-opacity"
              style={{ scrollSnapAlign: "start" }}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="bg-base-200 rounded shadow h-80 flex items-center justify-center mb-4">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  width={256}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <div className="text-lg mb-1 italic">{dest.title}</div>
                <div className="text-sm text-base-content/80">{dest.location}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 