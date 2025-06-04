/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/400/200?random=2",
  "https://picsum.photos/400/200?random=3",
  "https://picsum.photos/400/200?random=4",
];

interface Props {
  packageId: string;
}

export default function Section2({ packageId }: Props) {
  return (
    <section className="pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <img src={images[0]} alt="Main" className="rounded-xl w-full h-64 md:h-96 object-cover" />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {images.slice(1).map((img, idx) => (
              <img key={idx} src={img} alt={`Gallery ${idx + 2}`} className="rounded-xl w-full h-20 md:h-28 object-cover" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 