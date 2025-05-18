import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Section2() {
  const t = useTranslations("Home.section2");
  const commonT = useTranslations("Common");

  return (
    <div className="min-h-screen items-center justify-center">
      <div className="hero min-h-screen place-items-start items-center container mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between max-w-screen">
          <div className="">
            <Image
              src="https://picsum.photos/400/300?random=10"
              alt="Neomi Tour and Travel"
              width={400}
              height={300}
              className="rounded-lg shadow-2xl object-cover"
              priority
            />
          </div>
          <div className="text-neutral-content max-w-md">
            <h1 className="text-5xl font-bold mb-5">{t("title")}</h1>
            <p className="mb-5">{t("description")}</p>
            <Link href="/packages" className="btn btn-primary">
              {commonT("getStarted")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
