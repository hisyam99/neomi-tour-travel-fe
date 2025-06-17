"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import Image from "next/image";

interface Props {
  roomId: number;
}

export default function Section2({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>, []>(fetchHomestay);

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
            <Image 
              src={photos[0]?.path || `https://picsum.photos/800/400?random=${homestay.id}`}
              alt={`${homestay.name} - Main view`}
              width={800}
              height={400}
              className="rounded-xl w-full h-64 md:h-96 object-cover" 
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              quality={85}
            />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {photos.slice(1, 4).map((photo, index) => (
              <Image 
                key={photo.id}
                src={photo.path}
                alt={`${homestay.name} - View ${index + 2}`}
                width={400}
                height={200}
                className="rounded-xl w-full h-20 md:h-28 object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                quality={85}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 