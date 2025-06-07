"use client";

import React, { useEffect, useCallback } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";

interface Props {
  roomId: string;
}

export default function Section4({ roomId }: Props) {
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <div className="bg-base-200 rounded-xl p-6 shadow animate-pulse">
        <div className="h-6 bg-base-300 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-base-300 rounded"></div>
          <div className="h-10 bg-base-300 rounded"></div>
          <div className="h-10 bg-base-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-error">Error loading homestay: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-error">Homestay not found</div>;
  }

  const homestay = data.data;
  const details = homestay.details;

  return (
    <div className="bg-base-200 rounded-xl p-6 shadow">
      <div className="font-bold mb-4">BOOK NOW</div>
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
          <div>
            <div className="text-sm text-base-content/70">Total Price</div>
            <div className="text-xl font-bold">{details.price}</div>
          </div>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
} 