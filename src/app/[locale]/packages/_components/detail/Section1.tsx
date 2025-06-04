/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FaWifi, FaUtensils, FaBus, FaBed, FaCamera } from "react-icons/fa";

const fasilitas = [
  { id: 'wifi', icon: <FaWifi />, label: "WiFi" },
  { id: 'makan', icon: <FaUtensils />, label: "Makan" },
  { id: 'transport', icon: <FaBus />, label: "Transport" },
  { id: 'hotel', icon: <FaBed />, label: "Hotel" },
  { id: 'tour', icon: <FaCamera />, label: "Tour" },
];

interface Props {
  packageId: string;
}

export default function Section1({ packageId }: Props) {
  return (
    <section className="bg-base-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl italic mb-6">Tour Dan Trip Bromo</h1>
        <div className="flex flex-wrap gap-6 mb-6">
          {fasilitas.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-2">
              <div className="bg-base-200 rounded-full p-3 text-2xl">{f.icon}</div>
              <span className="text-xs md:text-sm text-base-content/70">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 