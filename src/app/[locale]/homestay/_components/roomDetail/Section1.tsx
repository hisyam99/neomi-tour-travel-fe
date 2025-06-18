"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { homestaysService } from "@/services/homestays";
import Image from "next/image";
import ImageViewer from "@/app/_components/common/ImageViewer";
import { Homestay } from "@/types";

interface Props {
  roomId: number;
}

interface Room {
  id: number;
  name: string;
  photos: string[];
}

export default function Section1({ roomId }: Readonly<Props>) {
  const t = useTranslations("Homestay");
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await homestaysService.getById(roomId);
        const homestay = response.data as Homestay;
        setRoom({
          id: homestay.id,
          name: homestay.name,
          photos: homestay.details.photos.map((photo) => photo.path),
        });
      } catch (error) {
        setError("Failed to fetch room details");
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-500">{t("noRoomFound")}</div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const renderSingleLayout = () => (
    <button
      onClick={() => handleImageClick(0)}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
    >
      <Image
        src={room.photos[0]}
        alt={`${room.name} - 1`}
        fill
        className="object-cover"
      />
    </button>
  );

  const renderTwoLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => handleImageClick(0)}
        className="relative aspect-[16/9] overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
      >
        <Image
          src={room.photos[0]}
          alt={`${room.name} - 1`}
          fill
          className="object-cover"
        />
      </button>
      <button
        onClick={() => handleImageClick(1)}
        className="relative aspect-[16/9] overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
      >
        <Image
          src={room.photos[1]}
          alt={`${room.name} - 2`}
          fill
          className="object-cover"
        />
      </button>
    </div>
  );

  const renderThreeLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => handleImageClick(0)}
        className="relative aspect-[16/9] overflow-hidden rounded-lg hover:opacity-90 transition-opacity md:col-span-2"
      >
        <Image
          src={room.photos[0]}
          alt={`${room.name} - 1`}
          fill
          className="object-cover"
        />
      </button>
      <div className="grid grid-rows-2 gap-4">
        {room.photos.slice(1, 3).map((photo: string, index: number) => (
          <button
            key={`photo-${index + 1}-${photo}`}
            onClick={() => handleImageClick(index + 1)}
            className="relative aspect-[16/9] overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
          >
            <Image
              src={photo}
              alt={`${room.name} - ${index + 2}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{room.name}</h1>
      <div className="mb-8">
        {room.photos.length === 1 && renderSingleLayout()}
        {room.photos.length === 2 && renderTwoLayout()}
        {room.photos.length === 3 && renderThreeLayout()}
      </div>
      {selectedImageIndex !== null && (
        <ImageViewer
          images={room.photos}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
}
