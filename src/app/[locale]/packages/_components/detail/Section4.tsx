"use client";

import React, { useState } from "react";
import { TourAndTravel } from "@/types";

interface Props {
  packageData: TourAndTravel;
}

export default function Section4({ packageData }: Props) {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const details = packageData.details[0];

  // Function to convert Google Maps URL to embed URL
  const getEmbedUrl = (url: string) => {
    try {
      // If it's already an embed URL, return as is
      if (url.includes("embed")) {
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

      return `https://www.google.com/maps/embed/v1/place?key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      }&q=${encodeURIComponent(path + query)}`;
    } catch (error) {
      console.error("Error converting map URL:", error);
      return url;
    }
  };

  if (!details?.link_route_maps) {
    return null;
  }

  return (
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
  );
}
