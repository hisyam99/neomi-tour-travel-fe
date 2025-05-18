"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    key: "albert",
    name: "ALBERT ZHENG",
    photo: "https://picsum.photos/80?random=11",
    quote:
      'Open by ex-chef Anthony, check out for his home cook meal and join him to visit local market. He also help to organize local trip like Mount Bromo or other attractions. Expect "Garfield" hiding around the house',
  },
  {
    key: "amanda",
    name: "AMANDA QUEK",
    photo: "https://picsum.photos/80?random=12",
    quote:
      "This homestay B&B is operated by Anthony and his wife. They can speak fluent English and Mandarin. Ask well as Bahasa Indonesia. Home is newly renovated with traditional cosy look.",
  },
  {
    key: "beden",
    name: "BEDEN",
    photo: "https://picsum.photos/80?random=13",
    quote:
      "Penginapan yang worth it banget, tempatnya bersih, nyaman, suasananya juga tenang, pelayanan dari pemilik sangat ramah, lokasinya juga strategis dekat dengan terminal, bandara dan exit tol",
  },
];

export default function Section5() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-normal italic mb-12">What people are saying about us</h2>
        <div className="flex justify-end mb-6">
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
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.key}
              className="flex-shrink-0 w-full md:w-1/3 max-w-md mx-auto bg-transparent"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-4 gap-4 md:gap-6">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4 md:mb-0"
                />
                <div className="flex-1">
                  <div className="text-5xl text-base-content/40 leading-none mb-2">“</div>
                  <blockquote className="italic text-base-content/70 text-base mb-4">{t.quote}</blockquote>
                  <div className="tracking-widest text-xs font-semibold text-base-content/80">{t.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 