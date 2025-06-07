"use client";

import React, { useEffect, useCallback } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Section4() {
  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel[]>>(fetchPackages);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-base-200 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-base-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-1/2"></div>
                  <div className="h-4 bg-base-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading packages: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No packages found</div>;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((pkg) => {
            const details = pkg.details[0];
            const photo = details?.photos?.[0]?.url;
            
            return (
              <div key={pkg.id} className="bg-base-200 rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={photo || "https://picsum.photos/400/300"}
                    alt={pkg.name_package}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{pkg.name_package}</h3>
                  <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{details?.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🗺️</span>
                      <span>{details?.itineraries?.length || 0} days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-semibold">
                      Rp {Number(details?.price || 0).toLocaleString()}
                    </div>
                    <Link 
                      href={`/packages/${details?.slug || pkg.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 