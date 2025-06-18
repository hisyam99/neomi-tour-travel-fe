import { useState, useCallback } from "react";
import { VideoSection } from "../app/[locale]/_constants/youtubeVideos";

export const useYouTubeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<VideoSection | null>(null);

  const openModal = useCallback((section: VideoSection) => {
    setCurrentSection(section);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCurrentSection(null);
  }, []);

  return {
    isOpen,
    currentSection,
    openModal,
    closeModal,
  };
}; 