"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotFound() {
  const t = useTranslations("NotFound");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          {/* 404 Illustration */}
          <div className="relative w-64 h-64 mb-8" data-aos="zoom-in">
            <Image
              src="/404.svg"
              alt="404 Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Error Message */}
          <h1
            className="text-6xl font-bold mb-4 text-primary"
            data-aos="fade-up"
          >
            404
          </h1>
          <h2
            className="text-3xl font-semibold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("title")}
          </h2>
          <p
            className="text-base-content/70 max-w-md mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("description")}
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/"
              className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t("backHome")}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-primary"
            >
              {t("goBack")}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
