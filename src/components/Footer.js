"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const InfoSection = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  // Social media icons component
  const SocialIcons = () => (
    <div className="flex space-x-4 mt-4">
      {/* TikTok Icon */}
      <a
        href="https://tiktok.com/@yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-75 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white"
        >
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
        </svg>
      </a>
      <a
        href="https://instagram.com/yourusername" // Replace with actual Instagram URL
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-75 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#2a2a2a] text-white">
      {/* Left Side - Image */}
      <div className="flex-1 relative">
        <Image
          src="/footerBg.jpg"
          alt="Footer Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex flex-col justify-center p-8 space-y-8">
        {/* Impressum Preview */}
        <div>
          <h2 className="text-xl font-bold mb-2">Impressum</h2>
          <p className="text-sm font-light mb-2">
            <strong>Alex am Naschmarkt GmbH</strong>, Naschmarkt 1, 1060 Wien,
            Österreich.
          </p>
          <p className="text-sm">
            Vertreten durch: Alexander Mustermann.
            <br />
            <span
              onClick={() => handleNavigate("/impressum")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Mehr lesen &rarr;
            </span>
          </p>
        </div>

        {/* Datenschutzerklärung Preview */}
        <div>
          <h2 className="text-xl font-bold mb-2">Datenschutzerklärung</h2>
          <p className="text-sm font-light mb-2">
            Kurzer Überblick über den Umgang mit Ihren personenbezogenen Daten.
          </p>
          <p className="text-sm">
            <span
              onClick={() => handleNavigate("/datenschutz")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Mehr lesen &rarr;
            </span>
          </p>
        </div>

        {/* Kontakt */}
        <div>
          <h2 className="text-xl font-bold mb-2">Kontakt</h2>
          <ul className="text-sm font-light">
            <li>Naschmarkt 1</li>
            <li>1060 Wien</li>
            <li>Tel: +43 1 234 567</li>
            <li>Email: info@alexamnaschmarkt.at</li>
          </ul>
          <SocialIcons />
        </div>

        {/* Öffnungszeiten */}
        <div>
          <h2 className="text-xl font-bold mb-2">Öffnungszeiten</h2>
          <ul className="text-sm font-light">
            <li>Mo-Fr: 08:00 - 18:30</li>
            <li>Sa: 08:00 - 17:00</li>
            <li>So: geschlossen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
