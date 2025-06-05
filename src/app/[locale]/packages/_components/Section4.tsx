import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const packages = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 1,
  title: "Tour dan trip Bromo",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam sed nobis sed nihil pariatur nobis a non Bromo. Suspendisse Bromo eros, faucibus et lobortis, sodales in nunc.",
  price: "Rp. 99999",
  image: "https://picsum.photos/400/200?random=" + (i + 1),
}));

export default function Section4() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        {packages.map((pkg, index) => (
          <div 
            key={pkg.id} 
            className="bg-base-200 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6"
            data-aos="fade-up"
            data-aos-delay={100 * (index % 3)}
          >
            <div className="w-full md:w-1/3 flex items-center justify-center">
              <Image 
                src={pkg.image} 
                alt={pkg.title} 
                width={400}
                height={160}
                className="object-cover w-full h-40 rounded" 
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xl font-semibold mb-2">{pkg.title}</div>
                <div className="text-base-content/70 mb-4 text-sm">{pkg.desc}</div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
                <div className="font-bold text-lg">{pkg.price}</div>
                <Link 
                  href={`/packages/${pkg.id}`} 
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8 pb-8" data-aos="fade-up" data-aos-delay="800">
        <button className="btn btn-circle bg-base-200 border-none" aria-label="Previous">
          <FaChevronLeft className="text-xl" />
        </button>
        <button className="btn btn-circle bg-base-200 border-none" aria-label="Next">
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
} 