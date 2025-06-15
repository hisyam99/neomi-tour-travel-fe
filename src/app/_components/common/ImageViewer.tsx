"use client";

import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewer({ images, initialIndex, onClose }: Readonly<Props>) {
  return (
    <Lightbox
      open={true}
      close={onClose}
      slides={images.map(src => ({ src }))}
      index={initialIndex}
      plugins={[Thumbnails, Zoom, Fullscreen]}
      carousel={{
        padding: '16px',
        spacing: '16px',
      }}
      thumbnails={{
        position: 'bottom',
        width: 120,
        height: 80,
        padding: 4,
        gap: 8,
        showToggle: true,
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
      styles={{
        container: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
        },
        thumbnailsContainer: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(4px)',
        },
      }}
    />
  );
} 