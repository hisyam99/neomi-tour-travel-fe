"use client";

import React from "react";
import { TourAndTravel } from "@/types";

interface Props {
  packageData: TourAndTravel;
}

export default function Section5({ packageData }: Props) {
  const details = packageData.details[0];

  return (
    <div className="md:col-span-1">
      <div className="bg-base-200 p-6 rounded-xl sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Package Information</h2>
        <div className="space-y-4">
          <div>
            <div className="text-base-content/70">Duration</div>
            <div className="font-semibold">{details?.duration || "N/A"}</div>
          </div>
          <div>
            <div className="text-base-content/70">Price</div>
            <div className="text-2xl font-bold text-primary">
              Rp {Number(details?.price || 0).toLocaleString()}
            </div>
          </div>
          <a
            href={details?.chat_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
