import React from "react";
import { useTranslations } from "next-intl";

export default function Section3() {
  const t = useTranslations("Packages.section3");

  return (
    <aside className="bg-base-200 rounded-xl p-6 w-full md:w-72 mb-8 md:mb-0" data-aos="fade" data-aos-duration="1000">
      <div className="mb-6">
        <div className="font-semibold mb-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="100">{t("keyword")}</div>
        <input type="text" placeholder={t("search")} className="input input-bordered w-full input-sm mb-4" data-aos="fade" data-aos-duration="1000" data-aos-delay="200" />
        <div className="font-semibold mb-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="300">{t("priceFilter")}</div>
        <div className="flex items-center justify-between text-xs mb-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="400">
          <span>Rp. 0</span>
          <span>Rp.99999</span>
        </div>
        <input type="range" min={0} max={99999} className="range range-xs" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" />
        <div className="flex justify-between text-xs mt-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="600">
          <span>{t("min")} 0</span>
          <span>{t("max")} 0</span>
        </div>
      </div>
      <div>
        <div className="font-semibold mb-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="700">{t("duration")}</div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="800">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration1")}</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="900">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration2")}</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration3")}</span>
          </label>
        </div>
      </div>
    </aside>
  );
} 