/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const facilities = [
  { icon: "🛏️", label: "King Bed" },
  { icon: "🚿", label: "Private Bathroom" },
  { icon: "📺", label: "TV" },
  { icon: "❄️", label: "AC" },
  { icon: "📶", label: "WiFi" },
  { icon: "☕", label: "Coffee/Tea" },
];

const rules = [
  "Lorem ipsum dolor sit amet",
  "Use a beautiful gift if I've never met"
];

export default function Section3({ roomId }: { roomId: string }) {
  return (
    <div className="py-8">
      <h2 className="italic text-2xl mb-4">Fasilitas Kamar</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {facilities.map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-base-200 rounded-lg p-3">
            <span className="text-2xl">{f.icon}</span>
            <span className="text-sm">{f.label}</span>
          </div>
        ))}
      </div>
      <h2 className="italic text-2xl mb-4">Peraturan Kamar</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        {rules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>
  );
} 