"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const InfoSection = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#2a2a2a] text-white">
      {/* Left Side - Image */}
      <div className="flex-1 relative">
        <Image
          src="/footerBg.jpg" // Replace with your actual image path
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
