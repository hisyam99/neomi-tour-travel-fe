import React from "react";
import { useTranslations } from "next-intl";

export default function Section3() {
  const t = useTranslations("Packages.section3");

  return (
    <aside className="bg-base-200 rounded-xl p-6 w-full md:w-72 mb-8 md:mb-0">
      <div className="mb-6">
        <div className="font-semibold mb-2">{t("keyword")}</div>
        <input type="text" placeholder={t("search")} className="input input-bordered w-full input-sm mb-4" />
        <div className="font-semibold mb-2">{t("priceFilter")}</div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span>Rp. 0</span>
          <span>Rp.99999</span>
        </div>
        <input type="range" min={0} max={99999} className="range range-xs" />
        <div className="flex justify-between text-xs mt-1">
          <span>{t("min")} 0</span>
          <span>{t("max")} 0</span>
        </div>
      </div>
      <div>
        <div className="font-semibold mb-2">{t("duration")}</div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration1")}</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration2")}</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="radio" name="duration" className="radio radio-xs" />
            <span className="label-text">{t("duration3")}</span>
          </label>
        </div>
      </div>
    </aside>
  );
} 