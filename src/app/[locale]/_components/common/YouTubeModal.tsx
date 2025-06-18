"use client";

import React, { useEffect } from "react";
import { YOUTUBE_VIDEOS, VideoSection } from "../../_constants/youtubeVideos";

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: VideoSection;
}

export default function YouTubeModal({
  isOpen,
  onClose,
  section,
}: YouTubeModalProps) {
  const videoConfig = YOUTUBE_VIDEOS[section];

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle backdrop keyboard events
  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      className="modal modal-open"
      aria-labelledby="youtube-modal-title"
      aria-describedby="youtube-modal-description"
    >
      <button
        className="modal-backdrop"
        onClick={handleBackdropClick}
        onKeyDown={handleBackdropKeyDown}
        aria-label="Close modal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          border: "none",
          cursor: "pointer",
          zIndex: 40
        }}
      />
      <div className="modal-box w-11/12 max-w-4xl p-0 bg-transparent shadow-none relative z-50">
        <div className="relative w-full aspect-video bg-base-100 rounded-lg overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn btn-circle btn-sm btn-ghost absolute top-2 right-2 z-10 bg-base-300/80 hover:bg-base-300 text-base-content"
            aria-label="Close video modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* YouTube iframe */}
          <iframe
            id="youtube-modal-description"
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoConfig.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={videoConfig.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </dialog>
  );
}
