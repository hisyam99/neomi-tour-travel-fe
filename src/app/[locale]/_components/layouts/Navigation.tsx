'use client';
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAVIGATION_ITEMS } from "../../_constants/navigation";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeChange from "../common/ThemeChange";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="drawer">
      <input
        id="nav-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100">
          {/* Left Section */}
          <div className="flex-none flex items-center gap-2">
            <label htmlFor="nav-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <Link href="/" className="btn btn-ghost text-xl">
              {t("brandName")}
            </Link>
          </div>

          {/* Center Section - Desktop Only */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="menu menu-horizontal px-1">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? "text-primary font-bold"
                        : undefined
                    }
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex-none flex items-center gap-2">
            <ThemeChange />
            <LanguageSwitcher />
            <Link href="/contact-us" className="btn btn-primary hidden lg:inline-flex">
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="nav-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ul className="menu menu-lg gap-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                          ? "text-primary font-bold"
                          : undefined
                      }
                      onClick={toggleDrawer}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="divider"></div>
            <div className="p-4">
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
  );
}
