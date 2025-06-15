"use client";

import React, { useEffect, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { tourAndTravelService } from "@/services/tourAndTravel";
import { useApi } from "@/hooks/useApi";
import { TourAndTravel, ApiResponse } from "@/types";

export default function Section3() {
  const t = useTranslations("Gallery.section3");
  const [index, setIndex] = useState(-1);
  const fetchPackages = useCallback(() => tourAndTravelService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<TourAndTravel[]>, []>(fetchPackages);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-base-200 rounded-xl h-40"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading gallery: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No images found</div>;
  }

  // Collect all photos from all packages
  const allPhotos = data.data.flatMap(pkg => 
    pkg.details.flatMap(detail => 
      detail.photos.map(photo => ({
        src: photo.url,
        alt: pkg.name_package
      }))
    )
  );

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allPhotos.map((img, idx) => (
            <button
              key={`gallery-image-${idx}-${img.src}`}
              onClick={() => setIndex(idx)}
              className="block relative group overflow-hidden rounded-xl shadow bg-base-200 hover:shadow-lg transition-shadow w-full"
              data-aos="zoom-in"
              data-aos-delay={100 * (idx % 4)}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                width={400}
                height={300}
                className="object-cover w-full h-40 group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">{t("view")}</span>
              </div>
            </button>
          ))}
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-circle bg-base-200 border-none" aria-label={t("previous")}>
            <FaChevronLeft className="text-xl" />
          </button>
          <button className="btn btn-circle bg-base-200 border-none" aria-label={t("next")}>
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      <Lightbox
        slides={allPhotos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Zoom, Fullscreen]}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          padding: 4,
          gap: 8,
          imageFit: "contain",
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{
          finite: false,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        animation={{ fade: 300 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
          thumbnailsContainer: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
        }}
      />
    </section>
  );
} 