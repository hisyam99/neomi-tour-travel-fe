import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Section1() {
  const t = useTranslations("Home.section1");
  const commonT = useTranslations("Common");

  return (
//     <div style={{
//       backgroundImage:
//         "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
//     }}>
// <div className="container mx-auto">
//   <div
//     className="hero min-h-screen place-items-start items-center"
    
//   >
//     <div className="hero-overlay"></div>
    <div 
      className="relative min-h-screen"
      style={{
        backgroundImage:
          "url(https://picsum.photos/1920/1080?random=9)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay absolute inset-0"></div>
      <div className="container mx-auto relative z-10">
        <div className="hero min-h-screen place-items-start items-center">
          <div className="hero-content text-neutral-content text-left">
            <div className="max-w-md" data-aos="fade-up" data-aos-delay="100">
              <h1 className="mb-5 text-5xl italic" data-aos="fade-up" data-aos-delay="200">{t("title")}</h1>
              <p className="mb-5" data-aos="fade-up" data-aos-delay="300">{t("description")}</p>
              <Link href="/packages" className="btn btn-primary" data-aos="fade-up" data-aos-delay="400">
                {commonT("getStarted")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
