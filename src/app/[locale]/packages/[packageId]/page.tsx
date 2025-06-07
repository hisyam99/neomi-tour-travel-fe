"use client";

import React, { useEffect, useCallback, useState } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PackageDetail() {
  const params = useParams();
  const packageId = parseInt(params.packageId as string, 10);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [openDay, setOpenDay] = useState<string | null>(null);

  if (isNaN(packageId)) {
    return <div className="text-error">Invalid package ID</div>;
  }

  const fetchPackage = useCallback(() => tourAndTravelService.getById(packageId), [packageId]);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel>>(fetchPackage);

  useEffect(() => {
    execute();
  }, [execute]);

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

  const pkg = data.data;
  const details = pkg.details[0];
  const mainPhoto = details?.photos?.[0]?.url;

  // Function to convert Google Maps URL to embed URL
  const getEmbedUrl = (url: string) => {
    try {
      // If it's already an embed URL, return as is
      if (url.includes('embed')) {
        return url;
      }

      // Extract the map ID from the URL
      const mapIdMatch = url.match(/mid=([^&]+)/);
      if (mapIdMatch && mapIdMatch[1]) {
        return `https://www.google.com/maps/d/embed?mid=${mapIdMatch[1]}`;
      }

      // If it's a regular Google Maps URL, convert to embed format
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const query = urlObj.search;
      
      return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(path + query)}`;
    } catch (error) {
      console.error('Error converting map URL:', error);
      return url;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{pkg.name_package}</h1>
      
      <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
        <Image
          src={mainPhoto || "https://picsum.photos/1200/400"}
          alt={pkg.name_package}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
            <div dangerouslySetInnerHTML={{ __html: details?.description || '' }} />
          </div>

          {details?.itineraries && details.itineraries.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
              <div className="flex flex-col gap-2">
                {details.itineraries.map((day, index) => (
                  <div key={index} className="collapse collapse-arrow bg-base-200 rounded-xl">
                    <input 
                      type="checkbox" 
                      className="peer" 
                      checked={openDay === `day${index}`} 
                      onChange={() => setOpenDay(openDay === `day${index}` ? null : `day${index}`)} 
                    />
                    <div className="collapse-title text-md font-semibold">
                      Day {index + 1}
                    </div>
                    <div className="collapse-content">
                      <p className="text-sm text-base-content/80">
                        {typeof day === 'string' ? day : day.days}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {details?.link_route_maps && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Route Map</h2>
              <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
                {isMapLoading && (
                  <div className="absolute inset-0 bg-base-200 animate-pulse">
                    <div className="w-full h-full skeleton"></div>
                  </div>
                )}
                <iframe
                  title="Tour Package Route Map"
                  src={getEmbedUrl(details.link_route_maps)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIsMapLoading(false)}
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-base-200 p-6 rounded-xl sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Package Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-base-content/70">Duration</div>
                <div className="font-semibold">{details?.duration || 'N/A'}</div>
              </div>
              <div>
                <div className="text-base-content/70">Price</div>
                <div className="text-2xl font-bold text-primary">
                  Rp {Number(details?.price || 0).toLocaleString()}
                </div>
              </div>
              <button className="btn btn-primary w-full">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 