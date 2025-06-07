"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import { FaUsers, FaRuler, FaBed, FaMountain } from "react-icons/fa";

interface Props {
  roomId: string;
}

export default function Section3({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-base-200 rounded w-1/4"></div>
            <div className="h-4 bg-base-200 rounded w-full"></div>
            <div className="h-4 bg-base-200 rounded w-2/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-base-200 rounded"></div>
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

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-bold text-2xl mb-4">Description</h2>
          <p className="text-base-content/80">{homestay.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-xl mb-4">Room Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaUsers className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.max_guest}</span>
              <span className="text-sm text-base-content/70">Max Guests</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaRuler className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.size}</span>
              <span className="text-sm text-base-content/70">Room Size</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaBed className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.type}</span>
              <span className="text-sm text-base-content/70">Room Type</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaMountain className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.price}</span>
              <span className="text-sm text-base-content/70">Price</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {details.facilities.map((facility) => (
              <div key={facility.id} className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 