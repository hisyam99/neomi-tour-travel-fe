"use client";

import React, { useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";

export default function Section4() {
  const fetchHomestays = useCallback(() => homestaysService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay[]>>(fetchHomestays);

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
    return <div className="text-error">Error loading homestays: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No homestays found</div>;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((homestay) => {
            const details = homestay.details;
            const photo = details?.photos?.[0]?.path;
            
            return (
              <div key={homestay.id} className="bg-base-200 rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={photo || "https://picsum.photos/400/300"}
                    alt={homestay.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{homestay.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{details?.max_guest || 0} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📏</span>
                      <span>{details?.size || '0'} m²</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-semibold">
                      Rp {Number(details?.price || 0).toLocaleString()}
                    </div>
                    <Link 
                      href={`/homestay/${details?.slug || homestay.id}`}
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
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Previous">
            <FaChevronLeft className="text-xl" />
          </button>
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Next">
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
} 