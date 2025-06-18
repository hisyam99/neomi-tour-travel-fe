"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useYouTubeModal } from "../../../../hooks/useYouTubeModal";
import YouTubeModal from "../common/YouTubeModal";

export default function Section1() {
  const t = useTranslations("Home.section1");
  const [isVideoActive, setIsVideoActive] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const MOVEMENT_THRESHOLD = 50;
  const { isOpen, currentSection, openModal, closeModal } = useYouTubeModal();

  // const handleVideoClick = () => {
  //   setIsVideoActive(true);
  // };

  const handleYouTubeClick = () => {
    openModal("home");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isVideoActive) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const lastX = lastMousePosition.current.x;
    const lastY = lastMousePosition.current.y;

    const distance = Math.sqrt(
      Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
    );

    if (distance > MOVEMENT_THRESHOLD) {
      setIsVideoActive(false);
      lastMousePosition.current = { x: currentX, y: currentY };
    }
  };

  const handleInteraction = () => {
    if (isVideoActive) {
      setIsVideoActive(false);
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center -mt-16 pt-16"
        aria-labelledby="hero-title"
        onMouseMove={handleMouseMove}
        onScroll={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/videoplayback.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className={`hero-overlay absolute inset-0 transition-opacity duration-300 ${
            isVideoActive ? "opacity-0" : "opacity-60"
          } bg-neutral`}
          aria-hidden="true"
        ></div>
        <div
          className={`container mx-auto relative z-10 px-4 py-16 transition-opacity duration-300 ${
            isVideoActive ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="max-w-xl text-left text-neutral-content"
            data-aos="fade-up"
          >
            <h1
              id="hero-title"
              className="mb-4 text-5xl italic"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("title")}
            </h1>
            <p className="mb-6" data-aos="fade-up" data-aos-delay="200">
              {t("description")}
            </p>
            {/* <div>disable fitur dibawah karena tidak jadi digunakan</div>
              <button
                className="btn btn-outline btn-primary flex items-center gap-2 hover:bg-primary hover:text-primary-content transition-colors"
                onClick={handleVideoClick}
                aria-label={t("playVideo")}
              >
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                {t("playVideo")}
              </button> */}
            <button
              className="btn btn-outline btn-primary flex items-center gap-2 hover:bg-primary hover:text-primary-content transition-colors"
              onClick={handleYouTubeClick}
              aria-label={t("playVideo")}
            >
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              {t("playVideo")}
            </button>
          </div>
        </div>
      </section>

      <YouTubeModal
        isOpen={isOpen}
        onClose={closeModal}
        section={currentSection || "home"}
      />
    </>
  );
}
