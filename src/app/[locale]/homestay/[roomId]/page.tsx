import React from "react";
import Section1 from "../_components/roomDetail/Section1";
import Section2 from "../_components/roomDetail/Section2";
import Section3 from "../_components/roomDetail/Section3";
import Section4 from "../_components/roomDetail/Section4";

type Props = {
  params: Promise<{
    roomId: string;
    locale: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoomDetailPage({ params, searchParams }: Props) {
  const [{ roomId }] = await Promise.all([params, searchParams]);
  
  return (
    <main>
      <Section1 roomId={roomId} />
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-2/3">
          <Section2 roomId={roomId} />
          <Section3 roomId={roomId} />
        </div>
        <div className="w-full md:w-1/3">
          <Section4 roomId={roomId} />
        </div>
      </div>
    </main>
  );
} 