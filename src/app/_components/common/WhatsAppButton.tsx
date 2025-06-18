"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { socialMediaService } from "../../../services/socialMedia";

interface WhatsAppButtonProps {
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello, I would like to inquire about your services.",
}) => {
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const response = await socialMediaService.getAll();
        if (response?.data?.[0]?.whatsapp) {
          setWhatsappUrl(response.data[0].whatsapp);
        }
      } catch (error) {
        console.error("Error fetching WhatsApp contact:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  const buildWhatsAppUrl = (baseUrl: string, messageText: string): string => {
    if (baseUrl.includes("?text=")) {
      return baseUrl;
    }

    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}text=${encodeURIComponent(messageText)}`;
  };

  if (loading || !whatsappUrl) {
    return null;
  }

  const finalUrl = buildWhatsAppUrl(whatsappUrl, message);

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
