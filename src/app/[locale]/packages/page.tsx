"use client";

import React, { useState, useCallback, useEffect } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";
import Section3 from "./_components/Section3";
import Section4 from "./_components/Section4";

export default function PackagesPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 1000000000] as [number, number],
    duration: null as string | null,
  });

  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel[]>, []>(fetchPackages);

  useEffect(() => {
    execute();
  }, [execute]);

  // Update price range based on actual data
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const prices = data.data.map(pkg => Number(pkg.details[0]?.price || 0));
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      
      // Only update if the current range is at max
      if (filters.priceRange[1] === 1000000000) {
        setFilters(prev => ({
          ...prev,
          priceRange: [minPrice, maxPrice]
        }));
      }
    }
  }, [data?.data, filters.priceRange]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const matchesKeyword = (pkg: TourAndTravel, keyword: string) => {
    if (!keyword) return true;
    return pkg.name_package.toLowerCase().includes(keyword.toLowerCase());
  };

  const matchesPriceRange = (price: number, range: [number, number]) => {
    return price >= range[0] && price <= range[1];
  };

  const matchesDuration = (itineraryCount: number, duration: string | null) => {
    if (!duration) return true;

    switch (duration) {
      case "1":
        return itineraryCount <= 1;
      case "2":
        return itineraryCount === 2;
      case "3+":
        return itineraryCount >= 3;
      default:
        return true;
    }
  };

  const filteredPackages = data?.data?.filter(pkg => {
    const details = pkg.details[0];
    const price = Number(details?.price || 0);
    const itineraryCount = details?.itineraries?.length || 0;

    // For debugging
    console.log(`Package ${pkg.name_package}:`, {
      itineraryCount,
      duration: filters.duration,
      itineraries: details?.itineraries
    });

    return (
      matchesKeyword(pkg, filters.keyword) &&
      matchesPriceRange(price, filters.priceRange) &&
      matchesDuration(itineraryCount, filters.duration)
    );
  });

  return (
    <main>
      <Section1 />
      <Section2 />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <Section3 onFilterChange={handleFilterChange} />
          </div>
          <div className="w-full lg:w-3/4">
            <Section4 packages={filteredPackages} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
} 