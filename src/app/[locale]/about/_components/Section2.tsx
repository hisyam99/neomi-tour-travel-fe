import React from "react";
import Image from "next/image";

export default function Section2() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl italic text-center mb-12">Tentang Kami</h1>
        <div className="bg-base-200 rounded-xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start shadow">
          {/* Left: About */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 text-xl italic">About Travel Website</div>
            <div className="text-base-content/80 text-sm mb-6">
              A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.<br /><br />
              I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees.
            </div>
            <button className="btn btn-link px-0 text-base-content/80">LEARN MORE</button>
          </div>
          {/* Right: Profile */}
          <div className="w-full md:w-64 flex flex-col items-center bg-base-100 rounded-xl p-6 shadow-sm">
            <Image 
              src="https://picsum.photos/100" 
              alt="John Doe" 
              width={96}
              height={96}
              className="rounded-full mb-4 object-cover" 
            />
            <div className="italic text-lg mb-2">John Doe</div>
            <div className="text-xs text-base-content/80 text-center mb-4">
              Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation.
            </div>
            <button className="btn btn-link px-0 text-base-content/80">MORE ABOUT JOHN</button>
          </div>
        </div>
      </div>
    </section>
  );
} 