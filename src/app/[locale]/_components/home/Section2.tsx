import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Section2() {
  const t = useTranslations("Home.section2");
  const commonT = useTranslations("Common");

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{t("title")}</h1>
          <p className="mb-5">{t("description")}</p>
          <Link href="/contact-us" className="btn btn-primary">
            {commonT("contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
