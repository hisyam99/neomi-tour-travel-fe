import React from "react";
import Section1 from "../_components/roomDetail/Section1";
import Section2 from "../_components/roomDetail/Section2";
import Section3 from "../_components/roomDetail/Section3";
import Section4 from "../_components/roomDetail/Section4";

export default function RoomDetailPage({ params }: { params: { roomId: string } }) {
  return (
    <main>
      <Section1 roomId={params.roomId} />
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-2/3">
          <Section2 roomId={params.roomId} />
          <Section3 roomId={params.roomId} />
        </div>
        <div className="w-full md:w-1/3">
          <Section4 roomId={params.roomId} />
        </div>
      </div>
    </main>
  );
} 