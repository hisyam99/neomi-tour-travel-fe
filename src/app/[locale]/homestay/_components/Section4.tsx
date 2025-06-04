import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const rooms = Array.from({ length: 6 }).map((_, i) => ({
  id: `room-${i + 1}`,
  title: "STANDARD DOUBLE",
  desc: "Lorem Ipsum",
  price: "Rp. 900",
  image: "https://picsum.photos/300/200?random=" + (i + 1),
}));

export default function Section4() {
  const t = useTranslations("Homestay.section4");

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block">
            {/* Section3 as sidebar for desktop */}
          </div>
          {/* Room grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <Link href={`homestay/${room.id}`} key={room.id} className="bg-base-200 rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
                  <div className="w-full h-40 bg-base-300 rounded mb-4 flex items-center justify-center relative">
                    <Image 
                      src={room.image} 
                      alt={room.title} 
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="text-xs text-base-content/60 mb-1">{room.title}</div>
                  <div className="text-sm mb-2">{room.desc}</div>
                  <div className="font-semibold">{room.price}</div>
                </Link>
              ))}
            </div>
            {/* Navigation buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button className="btn btn-circle bg-base-200 border-none" aria-label={t("previous")}>
                <FaChevronLeft className="text-xl" />
              </button>
              <button className="btn btn-circle bg-base-200 border-none" aria-label={t("next")}>
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 