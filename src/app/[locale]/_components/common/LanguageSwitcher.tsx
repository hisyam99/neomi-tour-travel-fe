"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { LANGUAGES } from "../../_constants/language";
import { useTranslations } from "next-intl";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Common");

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost rounded-field flex items-center gap-2">
        <FaGlobe className="text-lg" />
        <span className="hidden md:inline">{t("language")}</span>
      </button>
      <ul className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
        {LANGUAGES.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center gap-2 w-full text-left"
              aria-label={`Switch to ${lang.name}`}
            >
              <span aria-hidden="true">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 