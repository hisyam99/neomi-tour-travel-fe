import React from "react";
import { useTranslations } from "next-intl";

export default function Section3() {
  const t = useTranslations("Homestay.section3");

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <aside className="bg-base-200 rounded-xl p-6 w-full" data-aos="fade-right">
          <div className="space-y-6">
            {/* Price Filter */}
            <div>
              <h3 className="font-semibold mb-4">{t("priceFilter")}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Rp. 0</span>
                  <span>Rp.999</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={999}
                  className="range range-xs w-full"
                />
                <div className="flex justify-between text-xs">
                  <span>{t("min")} 0</span>
                  <span>{t("max")} 0</span>
                </div>
              </div>
            </div>

            {/* Other Filters */}
            <div>
              <h3 className="font-semibold mb-4">{t("otherFilters")}</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hotdesk" className="radio radio-xs" />
                  <span className="text-sm">{t("withHotdesk")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hotdesk" className="radio radio-xs" />
                  <span className="text-sm">{t("withoutHotdesk")}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
