"use client";

import React, { useEffect, useCallback } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import { useParams } from "next/navigation";
import Section1 from "../_components/detail/Section1";
import Section2 from "../_components/detail/Section2";
import Section3 from "../_components/detail/Section3";
import Section4 from "../_components/detail/Section4";
import Section5 from "../_components/detail/Section5";

export default function PackageDetail() {
  const params = useParams();
  const packageId = parseInt(params.packageId as string, 10);
  const fetchPackage = useCallback(() => tourAndTravelService.getById(packageId), [packageId]);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel>, []>(fetchPackage);

  useEffect(() => {
    if (!isNaN(packageId)) {
      execute();
    }
  }, [execute, packageId]);

  if (isNaN(packageId)) {
    return <div className="text-error">Invalid package ID</div>;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-base-300 rounded w-3/4"></div>
          <div className="h-64 bg-base-300 rounded"></div>
          <div className="h-4 bg-base-300 rounded w-1/2"></div>
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-error">Error loading package: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Package not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <Section1 packageData={data.data} data-aos="fade-up" data-aos-duration="1000" />
      <Section2 packageId={Number(packageId)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Section3 packageData={data.data} data-aos="zoom-in lg:fade-right" data-aos-duration="1000" data-aos-delay="200" />
        <Section5 packageData={data.data} data-aos="zoom-in-up lg:fade-left" data-aos-duration="1000" data-aos-delay="300" />
      </div>
      <Section4 packageData={data.data} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" />
    </div>
  );
} 