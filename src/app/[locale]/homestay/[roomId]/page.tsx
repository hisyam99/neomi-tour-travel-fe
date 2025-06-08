import React from "react";
import Section1 from "../_components/roomDetail/Section1";
import Section3 from "../_components/roomDetail/Section3";
import Section4 from "../_components/roomDetail/Section4";

type Props = {
  params: Promise<{
    roomId: string;
    locale: string;
  }>;
};

export default async function HomestayRoomDetailPage(props: Props) {
  const params = await props.params;
  const roomId = parseInt(params.roomId, 10);

  if (isNaN(roomId)) {
    return <div className="text-center py-8">Invalid homestay ID</div>;
  }

  return (
    <main className="pt-16">
      <Section1 roomId={roomId} />
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-2/3">
          {/* <Section2 roomId={roomId} /> */}
          <Section3 roomId={roomId} />
        </div>
        <div className="w-full md:w-1/3">
          <Section4 roomId={roomId} />
        </div>
      </div>
    </main>
  );
} 