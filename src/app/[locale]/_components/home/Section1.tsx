import React from "react";
import { useTranslations } from "next-intl";

export default function Section1() {
  const t = useTranslations("Home.section1");
  const commonT = useTranslations("Common");

  return (
    <div className="relative min-h-screen flex items-center -mt-16 pt-16">
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          tabIndex={-1}
          aria-label="Background video"
        >
          <source src="/videos/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-16">
        <div className="max-w-xl text-left text-neutral-content" data-aos="fade-up">
          <h1 className="mb-4 text-5xl italic" data-aos="fade-up" data-aos-delay="100">{t("title")}</h1>
          <p className="mb-6" data-aos="fade-up" data-aos-delay="200">{t("description")}</p>
          <button className="btn btn-outline btn-primary flex items-center gap-2" data-aos="fade-up" data-aos-delay="300">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            {commonT("getStarted")}
          </button>
        </div>
      </div>
    </div>
  );
}
