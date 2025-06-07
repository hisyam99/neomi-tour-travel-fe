"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import Image from "next/image";
import { FaWifi, FaUtensils, FaBus, FaBed, FaMountain } from "react-icons/fa";

interface Props {
  roomId: string;
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

  const facilities = [
    { id: 'wifi', icon: <FaWifi />, label: "WiFi" },
    { id: 'makan', icon: <FaUtensils />, label: "Makan" },
    { id: 'transport', icon: <FaBus />, label: "Transport" },
    { id: 'hotel', icon: <FaBed />, label: "Hotel" },
    { id: 'tour', icon: <FaMountain />, label: "Tour" },
  ];

  return (
    <section className="bg-base-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl italic mb-6">{homestay.name}</h1>
        <div className="flex flex-wrap gap-6 mb-6">
          {facilities.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-2">
              <div className="bg-base-200 rounded-full p-3 text-2xl">{f.icon}</div>
              <span className="text-xs md:text-sm text-base-content/70">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-6">
          <Image
            src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
            alt={homestay.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.slice(1).map((photo) => (
            <div key={photo.id} className="relative h-32 rounded-lg overflow-hidden">
              <Image
                src={photo.path}
                alt={`${homestay.name} - Photo ${photo.id}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 