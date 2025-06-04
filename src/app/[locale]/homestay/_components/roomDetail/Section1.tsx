import React from "react";
import Image from "next/image";

export default function Section1({ roomId }: { roomId: string }) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl italic font-normal mb-6">Standart Double</h1>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Image */}
          <div className="w-full lg:w-2/3 mb-4 lg:mb-0">
            <div className="relative w-full h-56 md:h-80 bg-base-300 rounded-lg overflow-hidden">
              <Image src="https://picsum.photos/600/400?random=1" alt="Room main" fill className="object-cover" />
            </div>
          </div>
          {/* 4 Grid Images */}
          <div className="w-full lg:w-1/3 grid grid-cols-2 grid-rows-2 gap-4">
            {[2,3,4,5].map((num) => (
              <div key={num} className="relative w-full h-24 md:h-28 bg-base-300 rounded-lg overflow-hidden">
                <Image src={`https://picsum.photos/200/100?random=${num}`} alt={`Room sub${num-1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        {/* Room Features */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-base-200 rounded-full flex items-center justify-center">1</span>
            <span className="text-sm">King Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-base-200 rounded-full flex items-center justify-center">4</span>
            <span className="text-sm">Max 4 Guest</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-base-200 rounded-full flex items-center justify-center">30</span>
            <span className="text-sm">30 Sqm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-base-200 rounded-full flex items-center justify-center">🏙️</span>
            <span className="text-sm">City View</span>
          </div>
        </div>
      </div>
    </section>
  );
} 