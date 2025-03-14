"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Datenschutz() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      {/* Full-screen background image */}
      <Image
        src="/Foto 5.png" // Ensure this file exists in public folder
        alt="Background image"
        fill
        priority
        className="object-cover"
      />

      {/* Centered overlay container */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 p-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">
            Datenschutzerklärung
          </h1>
          <div className="bg-white p-8 rounded shadow">
            <p className="text-black">
              Diese Datenschutzerklärung informiert Sie über den Umgang mit
              Ihren personenbezogenen Daten. Wir nehmen den Schutz Ihrer Daten
              sehr ernst.
            </p>
            <h2 className="mt-4 text-black">Verantwortlicher</h2>
            <p className="text-black">
              Alex am Naschmarkt GmbH
              <br />
              Naschmarkt 1<br />
              1060 Wien
              <br />
              Österreich
            </p>
            <h2 className="mt-4 text-black">Datenerhebung und -verwendung</h2>
            <p className="text-black">
              Wir erheben und verarbeiten personenbezogene Daten, wenn Sie
              unsere Website besuchen. Dies erfolgt zum Zwecke der Verbesserung
              unseres Angebots und der Kommunikation mit Ihnen.
            </p>
            <h2 className="mt-4 text-black">Cookies</h2>
            <p className="text-black">
              Unsere Website verwendet Cookies, um die Nutzererfahrung zu
              verbessern. Weitere Informationen finden Sie in unserem
              Cookie-Hinweis.
            </p>
            <h2 className="mt-4 text-black">Ihre Rechte</h2>
            <p className="text-black">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung Ihrer Daten.
            </p>
          </div>
          <footer className="mt-8">
            <button
              onClick={() => router.push("/")}
              className="text-blue-400 hover:underline"
            >
              Zurück zur Startseite
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
