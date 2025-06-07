"use client";

import React, { useEffect, useCallback } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Section4() {
  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel[]>>(fetchPackages);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-base-200 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6 animate-pulse"
            >
              <div className="w-full md:w-1/3 h-40 bg-base-300 rounded"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-base-300 rounded w-3/4"></div>
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-4 bg-base-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-error">Error loading packages: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No packages found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        {data.data.map((pkg, index) => {
          const details = pkg.details[0];
          const photo = details?.photos?.[0]?.url;
          
          return (
            <div 
              key={pkg.id} 
              className="bg-base-200 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6"
              data-aos="fade-up"
              data-aos-delay={100 * (index % 3)}
            >
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <Image 
                  src={photo || "https://picsum.photos/400/200?random=" + (index + 1)} 
                  alt={pkg.name_package} 
                  width={400}
                  height={160}
                  className="object-cover w-full h-40 rounded" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xl font-semibold mb-2">{pkg.name_package}</div>
                  <div className="text-base-content/70 mb-4 text-sm">
                    {details?.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
                  <div className="font-bold text-lg">
                    Rp {Number(details?.price || 0).toLocaleString()}
                  </div>
                  <Link 
                    href={`/packages/${pkg.id}`} 
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8 pb-8" data-aos="fade-up" data-aos-delay="800">
        <button className="btn btn-circle bg-base-200 border-none" aria-label="Previous">
          <FaChevronLeft className="text-xl" />
        </button>
        <button className="btn btn-circle bg-base-200 border-none" aria-label="Next">
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
} 