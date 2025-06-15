"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  onFilterChange: (filters: {
    keyword: string;
    priceRange: [number, number];
  }) => void;
}

export default function Section3({ onFilterChange }: Props) {
  const t = useTranslations("Homestay.section3");
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    onFilterChange({
      keyword: value,
      priceRange,
    });
  };

  const handlePriceRangeChange = (value: number) => {
    const newPriceRange: [number, number] = [priceRange[0], value];
    setPriceRange(newPriceRange);
    onFilterChange({
      keyword,
      priceRange: newPriceRange,
    });
  };

  const handleMinPriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    const newPriceRange: [number, number] = [numValue, priceRange[1]];
    setPriceRange(newPriceRange);
    onFilterChange({
      keyword,
      priceRange: newPriceRange,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    const newPriceRange: [number, number] = [priceRange[0], numValue];
    setPriceRange(newPriceRange);
    onFilterChange({
      keyword,
      priceRange: newPriceRange,
    });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <aside className="bg-base-200 rounded-xl p-6 w-full" data-aos="fade-right">
          <div className="space-y-8">
            {/* Keyword Search */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("keyword")}</h3>
              <div className="join w-full">
                <input 
                  type="text" 
                  placeholder={t("search")} 
                  className="input input-bordered join-item w-full" 
                  value={keyword}
                  onChange={(e) => handleKeywordChange(e.target.value)}
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
              <h3 className="font-semibold text-lg mb-4">{t("priceFilter")}</h3>
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
                  max={50000000}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
                  className="range range-primary w-full"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
