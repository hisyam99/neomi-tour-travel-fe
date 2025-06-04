"use client";

import React, { useState } from "react";

const itinerary = [
  {
    day: "Day 1 - Arrive in Zürich, Switzerland",
    desc: "Timperdiet gravida scelerisque odio nunc. Eget felis, odio bibendum quis eget sit lorem donec diam. Voutabat sed orci turpis sit dolor est a pretium eget. Vitae turpis orci vel tellus cursus lorem vestibulum quis eu. Eti commodo, eget lorem venenatis urna.",
  },
  { day: "Day 2 - Zürich–Biel/BienneNeuchâtel–Geneva", desc: "..." },
  { day: "Day 3 - Enchanting Engelberg", desc: "..." },
  { day: "Day 4 - Interlaken Area. Excursion to The Jungfrau Massif", desc: "..." },
];

export default function Section4() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h3 className="font-bold text-lg mb-4">Rencana Perjalanan</h3>
        <div className="flex flex-col gap-2">
          {itinerary.map((item, idx) => (
            <div key={idx} className="collapse collapse-arrow bg-base-200 rounded-xl">
              <input type="checkbox" className="peer" checked={open === idx} onChange={() => setOpen(open === idx ? -1 : idx)} />
              <div className="collapse-title text-md font-semibold">
                {item.day}
              </div>
              <div className="collapse-content">
                <p className="text-sm text-base-content/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 