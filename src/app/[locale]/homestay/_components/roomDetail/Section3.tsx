/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const facilities = [
  { id: 'bed', icon: "🛏️", label: "King Bed" },
  { id: 'bathroom', icon: "🚿", label: "Private Bathroom" },
  { id: 'tv', icon: "📺", label: "TV" },
  { id: 'ac', icon: "❄️", label: "AC" },
  { id: 'wifi', icon: "📶", label: "WiFi" },
  { id: 'coffee', icon: "☕", label: "Coffee/Tea" },
];

const rules = [
  { id: 'rule1', text: "Lorem ipsum dolor sit amet" },
  { id: 'rule2', text: "Use a beautiful gift if I've never met" }
];

export default function Section3({ roomId }: { roomId: string }) {
  return (
    <div className="py-8">
      <h2 className="italic text-2xl mb-4">Fasilitas Kamar</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {facilities.map((f) => (
          <div key={f.id} className="flex items-center gap-3 bg-base-200 rounded-lg p-3">
            <span className="text-2xl">{f.icon}</span>
            <span className="text-sm">{f.label}</span>
          </div>
        ))}
      </div>
      <h2 className="italic text-2xl mb-4">Peraturan Kamar</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        {rules.map((rule) => (
          <li key={rule.id}>{rule.text}</li>
        ))}
      </ul>
    </div>
  );
} 