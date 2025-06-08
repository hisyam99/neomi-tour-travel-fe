"use client";

import React, { useState } from "react";
import { TourAndTravel } from "@/types";

interface Props {
  packageData: TourAndTravel;
}

export default function Section3({ packageData }: Props) {
  const [openDay, setOpenDay] = useState<string | null>(null);
  const details = packageData.details[0];

  return (
    <div className="md:col-span-2">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
        <div dangerouslySetInnerHTML={{ __html: details?.detail_wte || '' }} />
      </div>

      {details?.itineraries && details.itineraries.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
          <div className="flex flex-col gap-2">
            {details.itineraries.map((day, index) => (
              <div key={`day-${index}-${typeof day === 'string' ? day : day.days}`} className="collapse collapse-arrow bg-base-200 rounded-xl">
                <input 
                  type="checkbox" 
                  className="peer" 
                  checked={openDay === `day${index}`} 
                  onChange={() => setOpenDay(openDay === `day${index}` ? null : `day${index}`)} 
                />
                <div className="collapse-title text-md font-semibold">
                  Day {index + 1}
                </div>
                <div className="collapse-content">
                  <p className="text-sm text-base-content/80">
                    {typeof day === 'string' ? day : day.days}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 