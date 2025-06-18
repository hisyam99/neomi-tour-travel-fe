"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useYouTubeModal } from "../../../../hooks/useYouTubeModal";
import YouTubeModal from "../../_components/common/YouTubeModal";

export default function Section1() {
  const t = useTranslations("Gallery.section1");
  const { isOpen, currentSection, openModal, closeModal } = useYouTubeModal();

  const handleVideoClick = () => {
    openModal("gallery");
  };

  return (
    <>
      <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center -mt-16 pt-16">
        <Image
          src="/gallery/gallery.jpg"
          alt={t("imageAlt", { defaultValue: "Gallery Neomi" })}
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
        <div className="container mx-auto relative z-10 px-4 py-16">
          <div
            className="max-w-xl text-left text-neutral-content"
            data-aos="fade-up"
          >
            <h1
              className="mb-4 text-5xl italic"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("title")}
            </h1>
            <p className="mb-6" data-aos="fade-up" data-aos-delay="200">
              {t("description")}
            </p>
            <button
              className="btn btn-outline btn-primary flex items-center gap-2 hover:bg-primary hover:text-primary-content transition-colors"
              data-aos="fade-up"
              data-aos-delay="300"
              onClick={handleVideoClick}
              aria-label={t("playVideo")}
            >
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              {t("playVideo")}
            </button>
          </div>
        </div>
      </div>

      <YouTubeModal
        isOpen={isOpen}
        onClose={closeModal}
        section={currentSection || "gallery"}
      />
    </>
  );
}
