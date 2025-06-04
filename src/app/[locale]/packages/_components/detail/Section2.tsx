/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";

const images = [
  { id: 'main', url: "https://picsum.photos/800/400?random=1", alt: "Main image" },
  { id: 'gallery1', url: "https://picsum.photos/400/200?random=2", alt: "Gallery image 1" },
  { id: 'gallery2', url: "https://picsum.photos/400/200?random=3", alt: "Gallery image 2" },
  { id: 'gallery3', url: "https://picsum.photos/400/200?random=4", alt: "Gallery image 3" },
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
            <Image 
              src={images[0].url} 
              alt={images[0].alt}
              width={800}
              height={400}
              className="rounded-xl w-full h-64 md:h-96 object-cover" 
            />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {images.slice(1).map((img) => (
              <Image 
                key={img.id}
                src={img.url}
                alt={img.alt}
                width={400}
                height={200}
                className="rounded-xl w-full h-20 md:h-28 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 