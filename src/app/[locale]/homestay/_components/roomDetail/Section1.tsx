"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import Image from "next/image";
import { FaWifi, FaBed, FaSnowflake } from "react-icons/fa";

interface Props {
  roomId: number;
}

export default function Section1({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
  return (
      <section className="bg-base-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-base-200 rounded w-1/3"></div>
            <div className="flex flex-wrap gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-base-200 rounded-full"></div>
                  <div className="h-4 bg-base-200 rounded w-16"></div>
                </div>
              ))}
            </div>
            <div className="h-96 bg-base-200 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading homestay: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Homestay not found</div>;
  }

  const homestay = data.data;
  const details = homestay.details;
  const photos = details.photos || [];

  const getFacilityIcon = (icon: string) => {
    switch (icon) {
      case 'wifi':
        return <FaWifi />;
      case 'ac.svg':
        return <FaSnowflake />;
      default:
        return <FaBed />;
    }
  };

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
        src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
        alt={homestay.name}
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
          src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
          alt={homestay.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority
        />
      </div>
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        <Image
          src={photos[1]?.path || `https://picsum.photos/1200/800?random=${homestay.id + 1}`}
          alt={`${homestay.name} - Photo 2`}
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
            src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
            alt={homestay.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {photos.slice(1).map((photo) => (
          <div key={photo.id} className="relative h-[190px] md:h-[240px] rounded-xl overflow-hidden">
            <Image
              src={photo.path}
              alt={`${homestay.name} - Photo ${photo.id}`}
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
            src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
            alt={homestay.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {photos.slice(1, 5).map((photo) => (
          <div key={photo.id} className="relative h-48 rounded-xl overflow-hidden">
            <Image
              src={photo.path}
              alt={`${homestay.name} - Photo ${photo.id}`}
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
    <section className="bg-base-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl italic mb-6">{homestay.name}</h1>
        <div className="flex flex-wrap gap-6 mb-6">
          {details.facilities.map((facility) => (
            <div key={facility.id} className="flex flex-col items-center gap-2">
              <div className="bg-base-200 rounded-full p-3 text-2xl">
                {getFacilityIcon(facility.icon)}
          </div>
              <span className="text-xs md:text-sm text-base-content/70">{facility.name}</span>
          </div>
          ))}
        </div>
        {renderLayout()}
      </div>
    </section>
  );
} 