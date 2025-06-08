'use client';
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAVIGATION_ITEMS } from "../../_constants/navigation";
import ThemeChange from "../common/ThemeChange";
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

  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return isActive ? "text-primary font-bold" : "text-base-content";
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
            <div className={`flex-none flex items-center gap-2 transition-all duration-300 ${
              !isScrolled ? 'bg-base-100/50 backdrop-blur-sm rounded-xl p-1' : ''
            }`}>
              <label 
                htmlFor="nav-drawer" 
                className="btn btn-square btn-ghost drawer-button lg:hidden" 
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
                className="btn btn-ghost text-xl"
              >
                {t("brandName")}
              </Link>
            </div>

            {/* Center Section - Desktop Only */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className={`transition-all duration-300 ${
                !isScrolled ? 'bg-base-100/50 backdrop-blur-sm rounded-xl' : ''
              }`}>
                <ul className="menu menu-horizontal">
                  {NAVIGATION_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`transition-all duration-300 ${getNavLinkClass(item.href)}`}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-none flex items-center gap-2">
              <div className={`hidden lg:block transition-all duration-300 ${
                !isScrolled ? 'bg-base-100/50 backdrop-blur-sm rounded-xl p-1' : ''
              }`}>
                <ThemeChange />
              </div>
              {/* <LanguageSwitcher /> */}
              <div className={`transition-all duration-300 ${
                !isScrolled ? 'bg-primary backdrop-blur-sm rounded-xl p-1' : ''
              }`}>
                <Link 
                  href="/contact-us" 
                  className={`btn transition-all duration-300 ${
                    isScrolled 
                      ? 'btn-primary' 
                      : 'btn-ghost'
                  }`}
                >
                  {t("contactUs")}
                </Link>
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
                <ul className="menu menu-lg gap-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={getNavLinkClass(item.href)}
                        onClick={toggleDrawer}
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
                  <ThemeChange />
                </div>
                <Link
                  href="/contact-us"
                  className="btn btn-primary w-full"
                  onClick={toggleDrawer}
                >
                  {t("contactUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
