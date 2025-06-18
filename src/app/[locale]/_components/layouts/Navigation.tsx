"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAVIGATION_ITEMS } from "../../_constants/navigation";
import ThemeChange from "../common/ThemeChange";
import Image from "next/image";
import { socialMediaService } from "../../../../services/socialMedia";
import { useApi } from "@/hooks/useApi";
import { SocialMedia, ApiResponse } from "@/types";
// import LanguageSwitcher from "../common/LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const fetchSocialMedia = useCallback(() => socialMediaService.getAll(), []);
  const { data, execute } = useApi<ApiResponse<SocialMedia[]>, []>(
    fetchSocialMedia
  );

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialMedia = data?.data[0];
  const whatsappMessage = encodeURIComponent(t("whatsappMessage"));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const shouldUseLightText = () => {
    const lightTextPaths = [
      "/",
      "/homestay",
      "/packages",
      "/gallery",
      "/blog",
      "/about",
    ];

    return (
      !isScrolled &&
      (lightTextPaths.includes(pathname) || pathname.startsWith("/blog/"))
    );
  };

  const getActiveTextColor = () => {
    if (isScrolled || !shouldUseLightText()) {
      return "text-primary";
    }
    return "text-neutral-content";
  };

  const getInactiveTextColor = () => {
    if (isScrolled || !shouldUseLightText()) {
      return "text-base-content";
    }
    return "text-neutral-content";
  };

  const getTextColor = (isActive: boolean) => {
    return isActive ? getActiveTextColor() : getInactiveTextColor();
  };

  const getNavLinkClass = (href: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    const textColor = getTextColor(isActive);
    const isLightTextPath = shouldUseLightText();
    const shadow =
      isScrolled || !isLightTextPath
        ? ""
        : "drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]";

    // Enhanced active state styling for light text paths
    const activeLightPathClass =
      isActive && isLightTextPath
        ? "scale-105 text-shadow-sm tracking-wide relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-content/50 after:rounded-full after:animate-pulse"
        : "";

    // Enhanced hover effects
    const hoverEffects = !isActive
      ? "hover:scale-105 hover:tracking-wide transition-all duration-300 hover:text-primary/90"
      : "";

    return isActive
      ? `font-bold ${shadow} ${textColor} ${activeLightPathClass} transition-all duration-300 relative`
      : `${shadow} ${textColor} ${hoverEffects} relative`;
  };

  const getDrawerLinkClass = (href: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    return isActive ? "text-primary font-bold" : "text-base-content";
  };

  const getContactUsButtonClass = () => {
    if (isScrolled) {
      return "btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300";
    }

    return `btn-ghost border-2 border-neutral-content/20 hover:border-neutral-content/40 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] hover:text-primary ${getInactiveTextColor()} hover:scale-105 transition-all duration-300`;
  };

  const getDrawerButtonClass = () => {
    const textColor = getInactiveTextColor();
    const shadow =
      !isScrolled && shouldUseLightText()
        ? "drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
        : "";
    return `btn btn-square btn-ghost drawer-button lg:hidden ${shadow} ${textColor} hover:scale-110 transition-all duration-300`;
  };

  const getBrandLinkClass = () => {
    const textColor = getInactiveTextColor();
    const shadow =
      !isScrolled && shouldUseLightText()
        ? "drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
        : "";
    return `btn btn-ghost text-base lg:text-xl font-bold tracking-wide ${shadow} ${textColor} hover:text-primary flex items-center gap-2 hover:scale-105 transition-all duration-300`;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-xl backdrop-saturate-150 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto drawer">
        <input
          id="nav-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
          aria-label="Toggle navigation menu"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar justify-between lg:justify-start">
            {/* Left Section */}
            <div className="flex-none flex items-center">
              <Link href="/" className={getBrandLinkClass()}>
                <Image
                  src="/icon.png"
                  alt="Neomi Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                {t("brandName")}
              </Link>
            </div>

            {/* Center Section - Desktop Only */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="menu menu-horizontal bg-transparent">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-all duration-300 text-base font-medium ${getNavLinkClass(
                        item.href
                      )}`}
                      aria-label={t(item.key)}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="flex-none flex items-center gap-4">
              <div className="hidden lg:block shrink-0">
                <ThemeChange />
              </div>
              <div className="hidden lg:flex flex-1 justify-end">
                {socialMedia?.whatsapp && (
                  <a
                    href={`${socialMedia.whatsapp}?text=Hallo%20Neomi,%20Saya%20ingin%20bertanya%20tentang%20layanan%20anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn transition-all duration-300 ${getContactUsButtonClass()}`}
                    aria-label={t("contactUs")}
                    data-aos="none"
                  >
                    <span className="font-medium">{t("contactUs")}</span>
                  </a>
                )}
              </div>
              <div className="shrink-0">
                <label
                  htmlFor="nav-drawer"
                  className={`${getDrawerButtonClass()} swap swap-rotate`}
                  aria-label="Open navigation menu"
                >
                  <input
                    type="checkbox"
                    checked={isDrawerOpen}
                    onChange={toggleDrawer}
                  />
                  {/* hamburger icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="swap-off w-6 h-6 stroke-current"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                  {/* close icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="swap-on w-6 h-6 stroke-current"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="nav-drawer"
            aria-label="Close navigation menu"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200/80 backdrop-blur-xl backdrop-saturate-150 text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="pt-6 mb-8 flex justify-start">
                  <Link
                    href="/"
                    className="btn btn-ghost text-lg lg:text-2xl font-bold tracking-wide text-base-content hover:text-primary flex items-center gap-0 hover:scale-105 transition-all duration-300"
                    onClick={toggleDrawer}
                  >
                    <Image
                      src="/icon.png"
                      alt="Neomi Logo"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                    <span style={{ marginLeft: 0 }}>{t("brandName")}</span>
                  </Link>
                </div>
                <ul className="menu menu-lg gap-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={getDrawerLinkClass(item.href)}
                        onClick={toggleDrawer}
                        aria-label={t(item.key)}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="divider"></div>
              <div className="flex flex-col gap-4">
                <div className="lg:hidden">
                  <ThemeChange isInDrawer={true} />
                </div>
                {socialMedia?.whatsapp && (
                  <a
                    href={`${socialMedia.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105"
                    onClick={toggleDrawer}
                    aria-label={t("contactUs")}
                    data-aos="none"
                  >
                    <span className="font-medium">{t("contactUs")}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
