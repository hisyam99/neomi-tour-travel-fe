"use client";

import React, { useEffect, useCallback } from "react";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";
import Image from "next/image";

interface Props {
  packageId: string;
}

export default function Section2({ packageId }: Props) {
  const fetchPackage = useCallback(() => tourAndTravelService.getById(parseInt(packageId, 10)), [packageId]);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel>>(fetchPackage);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
  return (
    <section className="pb-8">
      <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-64 md:h-96 bg-base-200 rounded-xl"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-base-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading package: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Package not found</div>;
  }

  const packageData = data.data;
  const details = packageData.details[0];
  const photos = details?.photos || [];

  const getGridLayout = () => {
    if (photos.length === 1) {
      return "single";
    } else if (photos.length === 2) {
      return "two";
    } else if (photos.length <= 4) {
      return "three";
    } else {
      return "four";
    }
  };

  const renderSingleLayout = () => (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
      <Image
        src={photos[0]?.url || `https://picsum.photos/1200/800?random=${packageData.id}`}
        alt={packageData.name_package}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
        className="object-cover"
        priority
      />
    </div>
  );

  const renderTwoLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        <Image
          src={photos[0]?.url || `https://picsum.photos/1200/800?random=${packageData.id}`}
          alt={packageData.name_package}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority
        />
      </div>
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        <Image
          src={photos[1]?.url || `https://picsum.photos/1200/800?random=${packageData.id + 1}`}
          alt={`${packageData.name_package} - Photo 2`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
        />
      </div>
    </div>
  );

  const renderThreeLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={photos[0]?.url || `https://picsum.photos/1200/800?random=${packageData.id}`}
            alt={packageData.name_package}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {photos.slice(1).map((photo) => (
          <div key={photo.url} className="relative h-[190px] md:h-[240px] rounded-xl overflow-hidden">
            <Image 
              src={photo.url}
              alt={`${packageData.name_package} - Photo ${photo.url.split('/').pop()}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover"
            />
          </div>
            ))}
          </div>
    </div>
  );

  const renderFourLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={photos[0]?.url || `https://picsum.photos/1200/800?random=${packageData.id}`}
            alt={packageData.name_package}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {photos.slice(1, 5).map((photo) => (
          <div key={photo.url} className="relative h-48 rounded-xl overflow-hidden">
            <Image
              src={photo.url}
              alt={`${packageData.name_package} - Photo ${photo.url.split('/').pop()}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderLayout = () => {
    const layout = getGridLayout();
    switch (layout) {
      case "single":
        return renderSingleLayout();
      case "two":
        return renderTwoLayout();
      case "three":
        return renderThreeLayout();
      case "four":
        return renderFourLayout();
      default:
        return renderSingleLayout();
    }
  };

  return (
    <section className="pb-8">
      <div className="container mx-auto px-4">
        {renderLayout()}
      </div>
    </section>
  );
} 