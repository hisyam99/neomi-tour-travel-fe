"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Section1() {
  const t = useTranslations("Blog.section1");

  return (
    <div className="relative min-h-[400px] md:min-h-[500px] flex items-center -mt-16 pt-16">
      <Image
        src="/blog/blog.jpg"
        alt="Blog Header"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
      />
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-xl text-left text-neutral-content py-24" data-aos="fade-up">
          <h1 className="mb-6 text-4xl md:text-5xl italic" data-aos="fade-up" data-aos-delay="100">
            {t("title")}
          </h1>
          <p className="mb-8 text-base md:text-lg" data-aos="fade-up" data-aos-delay="200">
            {t("description")}
          </p>
          <button 
            className="btn btn-outline btn-primary flex items-center gap-2 hover:bg-primary hover:text-primary-content transition-colors" 
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            {t("playVideo")}
          </button>
        </div>
      </div>
    </div>
  );
} 