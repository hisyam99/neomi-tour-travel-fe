"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { tourAndTravelService } from '@/services/tourAndTravel';
import Image from 'next/image';
import ImageViewer from '@/app/_components/common/ImageViewer';
import { TourAndTravel } from '@/types';

interface Props {
  packageId: number;
}

interface Package {
  id: number;
  name: string;
  photos: string[];
}

export default function Section2({ packageId }: Readonly<Props>) {
  const t = useTranslations('Package');
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await tourAndTravelService.getById(packageId);
        const packageData = response.data as TourAndTravel;
        setPackageData({
          id: packageData.id,
          name: packageData.name_package,
          photos: packageData.details[0].photos.map((photo: { url: string }) => photo.url)
        });
      } catch (error) {
        setError('Failed to fetch package details');
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

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

  if (!packageData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-500">{t('noPackageFound')}</div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const renderSingleLayout = () => (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={packageData.photos[0]}
        alt={`${packageData.name} - 1`}
        fill
        className="object-cover"
      />
    </div>
  );

  const renderTwoLayout = () => (
    <div className="grid grid-cols-2 gap-4">
      {packageData.photos.slice(0, 2).map((photo: string, index: number) => (
        <button
          key={`photo-${index}-${photo}`}
          onClick={() => handleImageClick(index)}
          className="relative aspect-video overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
        >
          <Image
            src={photo}
            alt={`${packageData.name} - ${index + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );

  const renderThreeLayout = () => (
    <div className="grid grid-cols-2 gap-4">
      <button
        key={`photo-0-${packageData.photos[0]}`}
        onClick={() => handleImageClick(0)}
        className="relative aspect-video overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
      >
        <Image
          src={packageData.photos[0]}
          alt={`${packageData.name} - 1`}
          fill
          className="object-cover"
        />
      </button>
      <div className="grid grid-rows-2 gap-4">
        {packageData.photos.slice(1, 3).map((photo: string, index: number) => (
          <button
            key={`photo-${index + 1}-${photo}`}
            onClick={() => handleImageClick(index + 1)}
            className="relative aspect-video overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
          >
            <Image
              src={photo}
              alt={`${packageData.name} - ${index + 2}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderFourLayout = () => (
    <div className="grid grid-cols-2 gap-4">
      {packageData.photos.slice(0, 4).map((photo: string, index: number) => (
        <button
          key={`photo-${index}-${photo}`}
          onClick={() => handleImageClick(index)}
          className="relative aspect-video overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
        >
          <Image
            src={photo}
            alt={`${packageData.name} - ${index + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {packageData.photos.length === 1 && renderSingleLayout()}
        {packageData.photos.length === 2 && renderTwoLayout()}
        {packageData.photos.length === 3 && renderThreeLayout()}
        {packageData.photos.length >= 4 && renderFourLayout()}
      </div>
      {selectedImageIndex !== null && (
        <ImageViewer
          images={packageData.photos}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
} 