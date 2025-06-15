import React, { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { socialMediaService } from "../../../../services/socialMedia";
import { useApi } from "@/hooks/useApi";
import { SocialMedia, ApiResponse } from "@/types";

export default function Section2() {
  const t = useTranslations("Packages.section2");
  const fetchSocialMedia = useCallback(() => socialMediaService.getAll(), []);
  const { data, execute } = useApi<ApiResponse<SocialMedia[]>, []>(
    fetchSocialMedia
  );

  useEffect(() => {
    execute();
  }, [execute]);

  const socialMedia = data?.data[0];
  const whatsappMessage = encodeURIComponent(t("whatsappMessage"));

  return (
    <section className="bg-base-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-base-content/80"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("description")}
          </p>
          {socialMedia?.whatsapp && (
            <a
              href={`${socialMedia.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-primary mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {t("contactUs")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
