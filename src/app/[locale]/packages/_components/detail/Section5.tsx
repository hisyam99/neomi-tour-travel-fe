/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";

interface Props {
  packageId: string;
}

export default function Section5({ packageId }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h3 className="font-bold text-lg mb-4">Map</h3>
        <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-base-200 animate-pulse">
              <div className="w-full h-full skeleton"></div>
            </div>
          )}
          <iframe
            title="Tour Package Location Map"
            src="https://www.google.com/maps/d/u/0/embed?mid=1mGgtylMQHGAKR6HR8r8YLe5W4LU&femb=1&ll=46.763418698970376%2C7.316172324717343&z=10"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </section>
  );
} 