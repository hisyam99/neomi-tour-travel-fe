"use client";

import React, { useState, useCallback, useEffect } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";
import Section3 from "./_components/Section3";
import Section4 from "./_components/Section4";

export default function HomestayPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 1000000000] as [number, number],
  });

  const fetchHomestays = useCallback(() => homestaysService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay[]>, []>(fetchHomestays);

  useEffect(() => {
    execute();
  }, [execute]);

  // Update price range based on API response
  useEffect(() => {
    if (data?.min_price && data?.max_price) {
      setFilters(prev => ({
        ...prev,
        priceRange: [Number(data.min_price), Number(data.max_price)]
      }));
    }
  }, [data?.min_price, data?.max_price]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredHomestays = data?.data?.filter(homestay => {
    // Keyword filter
    const matchesKeyword = filters.keyword
      ? homestay.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        homestay.description.toLowerCase().includes(filters.keyword.toLowerCase())
      : true;

    // Price filter
    const price = Number(homestay.details?.price || 0);
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    return matchesKeyword;
  });

  return (
    <main>
      <Section1 />
      <Section2 />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <Section3 onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <Section4 homestays={filteredHomestays || []} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
} 