"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  onFilterChange: (filters: {
    keyword: string;
    priceRange: [number, number];
    duration: string | null;
  }) => void;
}

export default function Section3({ onFilterChange }: Props) {
  const t = useTranslations("Packages.section3");
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000]);
  const [duration, setDuration] = useState<string | null>(null);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    onFilterChange({
      keyword: value,
      priceRange,
      duration,
    });
  };

  const handlePriceRangeChange = (value: number) => {
    const newPriceRange: [number, number] = [priceRange[0], value];
    setPriceRange(newPriceRange);
    onFilterChange({
      keyword,
      priceRange: newPriceRange,
      duration,
    });
  };

  const handleMinPriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    setPriceRange([numValue, priceRange[1]]);
    onFilterChange({
      keyword,
      priceRange: [numValue, priceRange[1]],
      duration,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    setPriceRange([priceRange[0], numValue]);
    onFilterChange({
      keyword,
      priceRange: [priceRange[0], numValue],
      duration,
    });
  };

  const handleDurationChange = (value: string | null) => {
    console.log('Duration changed to:', value);
    setDuration(value);
    onFilterChange({
      keyword,
      priceRange,
      duration: value,
    });
  };

  return (
    <aside className="bg-base-200 rounded-xl p-6 w-full md:w-72 mb-8 md:mb-0" data-aos="fade" data-aos-duration="1000">
      <div className="space-y-8">
        {/* Keyword Search */}
        <div>
          <div className="font-semibold text-lg mb-4" data-aos="fade" data-aos-duration="1000" data-aos-delay="100">
            {t("keyword")}
          </div>
          <div className="join w-full">
            <input 
              type="text" 
              placeholder={t("search")} 
              className="input input-bordered join-item w-full" 
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              data-aos="fade" 
              data-aos-duration="1000" 
              data-aos-delay="200" 
            />
            <button className="btn join-item">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <div className="font-semibold text-lg mb-4" data-aos="fade" data-aos-duration="1000" data-aos-delay="300">
            {t("priceFilter")}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="join w-full">
                <span className="join-item btn btn-sm">Rp</span>
                <input 
                  type="text" 
                  className="input input-bordered join-item w-full" 
                  value={priceRange[0].toLocaleString()}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  placeholder="Min"
                />
              </div>
              <span>-</span>
              <div className="join w-full">
                <span className="join-item btn btn-sm">Rp</span>
                <input 
                  type="text" 
                  className="input input-bordered join-item w-full" 
                  value={priceRange[1].toLocaleString()}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
            <input 
              type="range" 
              min={0} 
              max={1000000000} 
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
              className="range range-primary w-full" 
              data-aos="fade" 
              data-aos-duration="1000" 
              data-aos-delay="500" 
            />
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <div className="font-semibold text-lg mb-4" data-aos="fade" data-aos-duration="1000" data-aos-delay="700">
            {t("duration")}
          </div>
          <div className="space-y-3">
            <label className="label cursor-pointer justify-start gap-3 hover:bg-base-300 p-2 rounded-lg transition-colors" data-aos="fade" data-aos-duration="1000" data-aos-delay="800">
              <input 
                type="radio" 
                name="duration" 
                className="radio radio-primary" 
                checked={duration === null}
                onChange={() => handleDurationChange(null)}
              />
              <span className="label-text text-base">{t("durationNone")}</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 hover:bg-base-300 p-2 rounded-lg transition-colors" data-aos="fade" data-aos-duration="1000" data-aos-delay="900">
              <input 
                type="radio" 
                name="duration" 
                className="radio radio-primary" 
                checked={duration === "1"}
                onChange={() => handleDurationChange(duration === "1" ? null : "1")}
              />
              <span className="label-text text-base">{t("duration1")}</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 hover:bg-base-300 p-2 rounded-lg transition-colors" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000">
              <input 
                type="radio" 
                name="duration" 
                className="radio radio-primary"
                checked={duration === "2"}
                onChange={() => handleDurationChange(duration === "2" ? null : "2")}
              />
              <span className="label-text text-base">{t("duration2")}</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 hover:bg-base-300 p-2 rounded-lg transition-colors" data-aos="fade" data-aos-duration="1000" data-aos-delay="1100">
              <input 
                type="radio" 
                name="duration" 
                className="radio radio-primary"
                checked={duration === "3+"}
                onChange={() => handleDurationChange(duration === "3+" ? null : "3+")}
              />
              <span className="label-text text-base">{t("duration3")}</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
} 