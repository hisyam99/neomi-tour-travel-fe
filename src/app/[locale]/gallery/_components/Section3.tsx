import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = Array.from({ length: 9 }).map((_, i) => `https://picsum.photos/400/300?random=${i + 1}`);

export default function Section3() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl shadow bg-base-200">
              <img src={img} alt={`Gallery ${idx + 1}`} className="object-cover w-full h-40 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Lihat</span>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Previous">
            <FaChevronLeft className="text-xl" />
          </button>
          <button className="btn btn-circle bg-base-200 border-none" aria-label="Next">
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
} 