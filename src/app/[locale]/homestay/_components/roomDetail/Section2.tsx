"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import Image from "next/image";

interface Props {
  roomId: string;
}

export default function Section2({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="bg-base-200 rounded-xl h-64 md:h-96 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-base-200 rounded-xl h-20 md:h-28 animate-pulse"></div>
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

  return (
    <section className="pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={photos[0]?.path || `https://picsum.photos/1200/800?random=${homestay.id}`}
                alt={homestay.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {photos.slice(1, 4).map((photo) => (
              <div key={photo.id} className="relative h-20 md:h-28 rounded-xl overflow-hidden">
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
      </div>
    </section>
  );
} 