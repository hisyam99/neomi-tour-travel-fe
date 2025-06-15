'use client';
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAVIGATION_ITEMS } from "../../_constants/navigation";
import ThemeChange from "../common/ThemeChange";
import Image from "next/image";
// import LanguageSwitcher from "../common/LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const shouldUseLightText = () => {
    const lightTextPaths = [
      '/',
      '/homestay',
      '/packages',
      '/gallery',
      '/blog',
      '/about'
    ];
    
    return !isScrolled && (
      lightTextPaths.includes(pathname) || 
      pathname.startsWith('/blog/')
    );
  };

  const getActiveTextColor = () => {
    if (isScrolled) {
      return 'text-primary';
    }
    return shouldUseLightText() ? 'text-neutral-content' : 'text-base-content';
  };

  const getInactiveTextColor = () => {
    if (isScrolled) {
      return 'text-base-content';
    }
    return shouldUseLightText() ? 'text-neutral-content' : 'text-base-content';
  };

  const getTextColor = (isActive: boolean) => {
    return isActive ? getActiveTextColor() : getInactiveTextColor();
  };

  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    const textColor = getTextColor(isActive);
    const shadow = isScrolled ? '' : 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]';

    return isActive 
      ? `font-bold ${shadow} ${textColor}` 
      : `${shadow} hover:text-primary ${textColor}`;
  };

  const getDrawerLinkClass = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return isActive ? "text-primary font-bold" : "text-base-content";
  };

  const getContactUsButtonClass = () => {
    if (isScrolled) {
      return 'btn-primary shadow-lg hover:shadow-xl hover:scale-105';
    }

    return `btn-ghost border-2 border-neutral-content/20 hover:border-neutral-content/40 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] hover:text-primary ${getInactiveTextColor()}`;
  };

  const getDrawerButtonClass = () => {
    const textColor = getInactiveTextColor();
    const shadow = !isScrolled && shouldUseLightText() ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]' : '';
    return `btn btn-square btn-ghost drawer-button lg:hidden ${shadow} ${textColor}`;
  };

  const getBrandLinkClass = () => {
    const textColor = getInactiveTextColor();
    const shadow = !isScrolled && shouldUseLightText() ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]' : '';
    return `btn btn-ghost text-xl font-bold tracking-wide ${shadow} ${textColor} hover:text-primary flex items-center`;
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-base-100/80 backdrop-blur-xl backdrop-saturate-150 shadow-lg' 
        : 'bg-transparent'
    }`}> 
      <div className="container mx-auto drawer">
        <input
          id="nav-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar justify-between lg:justify-start">
            {/* Left Section */}
            <div className="flex-none flex items-center">
              <label 
                htmlFor="nav-drawer" 
                className={getDrawerButtonClass()}
                aria-label="Open navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <Link 
                href="/" 
                className={getBrandLinkClass()}
              >
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
                      className={`transition-all duration-300 text-base font-medium ${getNavLinkClass(item.href)}`}
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
              <div className="hidden lg:block">
                <ThemeChange />
              </div>
              <a 
                href="https://wa.me/6281234567890?text=Hello%20Neomi%2C%20I%E2%80%99m%20interested%20in%20arranging%20a%20personalized%20custom%20trip.%20Could%20you%20please%20assist%20me%20with%20the%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn transition-all duration-300 ${getContactUsButtonClass()}`}
                aria-label={t("contactUs")}
                data-aos="none"
              >
                <span className="font-medium">{t("contactUs")}</span>
              </a>
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
                <a
                  href="https://wa.me/6281234567890?text=Hello%20Neomi%2C%20I%E2%80%99m%20interested%20in%20arranging%20a%20personalized%20custom%20trip.%20Could%20you%20please%20assist%20me%20with%20the%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={toggleDrawer}
                  aria-label={t("contactUs")}
                  data-aos="none"
                >
                  <span className="font-medium">{t("contactUs")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
