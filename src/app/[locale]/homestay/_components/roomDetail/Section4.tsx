"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";

interface Props {
  roomId: number;
}

export default function Section4({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-base-200 rounded w-1/2"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-12 bg-base-200 rounded"></div>
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
        <div className="bg-base-200 rounded-xl p-6 shadow">
          <h3 className="font-bold text-xl mb-4">Book Now</h3>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Check-in Date</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Check-out Date</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Number of Guests</span>
              </label>
              <select className="select select-bordered w-full">
                {Array.from({ length: details.max_guest }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-xl font-bold">Rp {parseInt(details.price).toLocaleString()}</span>
            </div>
            <a
              href={details.chat_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 