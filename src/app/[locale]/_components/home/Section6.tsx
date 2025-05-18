"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { homeImages } from "@/app/[locale]/_constants/homeImages";

export default function Section6() {
  const t = useTranslations("Home.section6");
  const carouselRef = useRef<HTMLDivElement>(null);

  const posts = t.raw("posts") as {
    key?: string;
    date: string;
    title: string;
    excerpt: string;
    readMore: string;
    link?: string;
  }[];

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-normal italic mb-12 text-left">{t("title")}</h2>
        <div className="flex justify-end mb-6">
          <div className="flex gap-4">
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("left")} aria-label="Previous">
              <FaChevronLeft className="text-xl" />
            </button>
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("right")} aria-label="Next">
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {posts.map((post, i) => (
            <div
              key={post.key ? post.key : i}
              className="flex-shrink-0 w-80 max-w-xs bg-transparent"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="mb-4">
                <Image
                  src={homeImages[i % homeImages.length]}
                  alt={post.title}
                  width={320}
                  height={240}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="text-sm text-base-content/70 mb-1">{post.date}</div>
              <div className="font-semibold mb-1">{post.title}</div>
              <div className="text-sm text-base-content/80 mb-2">{post.excerpt}</div>
              <a href={post.link ? post.link : '#'} className="italic font-semibold text-primary text-sm hover:underline">{post.readMore} &gt;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 