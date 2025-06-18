"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { FaSearch, FaFilter } from "react-icons/fa";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [duration, setDuration] = useState<string | null>(null);

  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data } = useApi<ApiResponse<TourAndTravel[]>, []>(fetchPackages);

  useEffect(() => {
    if (data?.min_price && data?.max_price) {
      const minPrice = Number(data.min_price);
      const maxPrice = Number(data.max_price);
      setPriceRange([minPrice, maxPrice]);
      onFilterChange({
        keyword,
        priceRange: [minPrice, maxPrice],
        duration,
      });
    }
  }, [data?.min_price, data?.max_price, keyword, duration, onFilterChange]);

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
    const numValue = parseInt(value.replace(/\D/g, "")) || 0;
    setPriceRange([numValue, priceRange[1]]);
    onFilterChange({
      keyword,
      priceRange: [numValue, priceRange[1]],
      duration,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, "")) || 0;
    setPriceRange([priceRange[0], numValue]);
    onFilterChange({
      keyword,
      priceRange: [priceRange[0], numValue],
      duration,
    });
  };

  const handleDurationChange = (value: string | null) => {
    setDuration(value);
    onFilterChange({
      keyword,
      priceRange,
      duration: value,
    });
  };

  return (
    <aside
      className="bg-base-200 rounded-xl p-6 w-full mb-8 lg:mb-0"
      data-aos="fade"
      data-aos-duration="1000"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-base-300">
          <FaFilter className="text-primary text-xl" />
          <h2 className="text-xl font-semibold">{t("filterBy")}</h2>
        </div>

        {/* Keyword Search */}
        <div>
          <div
            className="font-semibold text-lg mb-4 flex items-center gap-2"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <FaSearch className="text-primary" />
            {t("keyword")}
          </div>
          <div className="join w-full">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="input input-bordered join-item w-full"
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              data-aos="fade"
              data-aos-duration="1000"
              data-aos-delay="200"
            />
            <button className="btn join-item btn-primary">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <div
            className="font-semibold text-lg mb-4"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            {t("priceFilter")}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="join w-full">
                <span className="join-item btn btn-sm">Rp</span>
                <input
                  type="text"
                  className="input input-bordered join-item w-full"
                  value={priceRange[0].toLocaleString()}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  placeholder={t("min")}
                />
              </div>
              <div className="join w-full">
                <span className="join-item btn btn-sm">Rp</span>
                <input
                  type="text"
                  className="input input-bordered join-item w-full"
                  value={priceRange[1].toLocaleString()}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  placeholder={t("max")}
                />
              </div>
            </div>
            <input
              type="range"
              min={data?.min_price ? Number(data.min_price) : 0}
              max={data?.max_price ? Number(data.max_price) : 50000000}
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
          <div
            className="font-semibold text-lg mb-4"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="700"
          >
            {t("duration")}
          </div>
          <div className="space-y-3">
            {[
              { value: null, label: t("durationNone") },
              { value: "1", label: t("duration1") },
              { value: "2", label: t("duration2") },
              { value: "3+", label: t("duration3") },
            ].map((option, index) => (
              <label
                key={option.value || "none"}
                className="label cursor-pointer justify-start gap-3 hover:bg-base-300 p-3 rounded-lg transition-colors"
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-delay={800 + index * 100}
              >
                <input
                  type="radio"
                  name="duration"
                  className="radio radio-primary"
                  checked={duration === option.value}
                  onChange={() => handleDurationChange(option.value)}
                />
                <span className="label-text text-base">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setKeyword("");
            setDuration(null);
            if (data?.min_price && data?.max_price) {
              const minPrice = Number(data.min_price);
              const maxPrice = Number(data.max_price);
              setPriceRange([minPrice, maxPrice]);
              onFilterChange({
                keyword: "",
                priceRange: [minPrice, maxPrice],
                duration: null,
              });
            } else {
              setPriceRange([0, 50000000]);
              onFilterChange({
                keyword: "",
                priceRange: [0, 50000000],
                duration: null,
              });
            }
          }}
          className="btn btn-outline btn-primary w-full mt-4"
        >
          {t("reset")}
        </button>
      </div>
    </aside>
  );
}
