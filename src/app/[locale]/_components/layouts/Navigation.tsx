import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAVIGATION_ITEMS } from "../../_constants/navigation";

export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-base-100">
      <div className="container mx-auto navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </button>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{t(item.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            {t("brandName")}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.key)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/contact-us" className="btn btn-primary">
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
