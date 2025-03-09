"use client";

import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "ka", name: "ქართული" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300">
        <Globe className="h-5 w-5" />
        <span>
          {languages.find((lang) => lang.code === i18n.language)?.name ||
            "Language"}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-white/20 transition-colors ${
                i18n.language === lang.code ? "bg-white/10" : ""
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
// Compare this snippet from src/components/Logo.js:
// "use client";
