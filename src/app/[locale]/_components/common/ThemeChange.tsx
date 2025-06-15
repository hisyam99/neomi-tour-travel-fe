import React, { useLayoutEffect, useState } from "react";
import { themeChange } from "theme-change";
import { usePathname } from "@/i18n/navigation";

interface ThemeChangeProps {
  isInDrawer?: boolean;
}

const ThemeChange: React.FC<ThemeChangeProps> = ({ isInDrawer = false }) => {
  const themes = ["light", "dark"];
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "default";
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      themeChange(false);

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  const getThemeDisplayName = (theme: string) => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }
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

  const getTextColor = () => {
    if (isScrolled) {
      return 'text-base-content';
    }
    return shouldUseLightText() ? 'text-neutral-content' : 'text-base-content';
  };

  const getButtonClass = () => {
    if (isInDrawer) {
      return "btn btn-ghost drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] hover:text-primary text-base-content";
    }

    return `btn btn-ghost drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] hover:text-primary ${getTextColor()}`;
  };

  return (
    <div className="dropdown lg:dropdown-end dropdown-start dropdown-bottom">
      <button className={getButtonClass()}>
        <div className="flex items-center space-x-2">
          <p>Theme</p>
          <svg
            width="12px"
            height="12px"
            className="inline-block fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
      </button>
      <ul className="dropdown-content z-[1] max-h-60 w-52 overflow-y-auto rounded-box bg-base-100/80 backdrop-blur-xl backdrop-saturate-150 p-2 shadow-2xl flex flex-col">
        {themes.map((themeOption) => (
          <li key={themeOption}>
            <button
              onClick={() => handleThemeChange(themeOption)}
              className={`btn btn-ghost btn-sm btn-block justify-start transition-all duration-300 ${
                currentTheme === themeOption 
                  ? "font-bold text-primary" 
                  : "text-base-content hover:text-primary"
              }`}
              aria-label={`Set theme to ${themeOption}`}
            >
              {getThemeDisplayName(themeOption)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeChange;
