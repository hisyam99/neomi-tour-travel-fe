import React from "react";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("Footer");

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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-neutral/70 border-none text-white text-xl" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-neutral/70 border-none text-white text-xl" aria-label="Twitter"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-neutral/70 border-none text-white text-xl" aria-label="Instagram"><FaInstagram /></a>
              </div>
            </div>
          </div>
          {/* Kanan: Contact */}
          <div className="flex flex-col justify-start h-full">
            <div className="font-semibold mb-3">{t("contact")}</div>
            <div className="text-base-content/70 space-y-1">
              <div>{t("address")}</div>
              <div>{t("phone1")}</div>
              <div>{t("phone2")}</div>
              <a href={`mailto:${t("email")}`} className="underline text-base-content/80 block">{t("email")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 