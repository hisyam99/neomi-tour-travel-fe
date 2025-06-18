"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { socialMediaService } from "../../../../services/socialMedia";
import { useApi } from "@/hooks/useApi";
import { SocialMedia, ApiResponse } from "@/types";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("Footer");
  const fetchSocialMedia = useCallback(() => socialMediaService.getAll(), []);
  const { data, loading, error, execute } = useApi<
    ApiResponse<SocialMedia[]>,
    []
  >(fetchSocialMedia);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return (
      <footer className="bg-base-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="h-6 bg-base-100 rounded w-1/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-base-100 rounded w-3/4 mb-7 animate-pulse"></div>
              </div>
              <div>
                <div className="h-5 bg-base-100 rounded w-1/4 mb-3 animate-pulse"></div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-base-100 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start h-full">
              <div className="h-5 bg-base-100 rounded w-1/4 mb-3 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-base-100 rounded w-1/2 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <div className="text-error">
        Error loading social media: {error.message}
      </div>
    );
  }

  const socialMedia = data?.data[0];

  return (
    <footer className="bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
          {/* Kiri: Brand & Connect */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-bold text-lg mb-3">{t("brand")}</div>
              <div className="text-base-content/70 mb-7 leading-relaxed">
                {t("description")}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-3">{t("connect")}</div>
              <div className="flex gap-3">
                {socialMedia?.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle bg-neutral/70 border-none text-white text-xl"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {socialMedia?.instagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle bg-neutral/70 border-none text-white text-xl"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                )}
                {socialMedia?.tiktok && (
                  <a
                    href={socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle bg-neutral/70 border-none text-white text-xl"
                    aria-label="TikTok"
                  >
                    <FaTiktok />
                  </a>
                )}
                {socialMedia?.whatsapp && (
                  <a
                    href={socialMedia.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle bg-neutral/70 border-none text-white text-xl"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Kanan: Contact */}
          <div className="flex flex-col justify-start h-full">
            <div className="font-semibold mb-3">{t("contact")}</div>
            <div className="text-base-content/70 space-y-1">
              <div>{t("address")}</div>
              <div>{t("phone1")}</div>
              {/* <div>{t("phone2")}</div> */}
              <a
                href={`mailto:${t("email")}`}
                className="underline text-base-content/80 block"
              >
                {t("email")}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile-only spacer to prevent floating WhatsApp button from covering content */}
        {isMobile && <div style={{ height: "80px", width: "100%" }}></div>}
      </div>
    </footer>
  );
}
