"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Impressum() {
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
          <h1 className="text-4xl font-bold mb-6 text-black">Impressum</h1>
          <div className="bg-white p-8 rounded shadow">
            <p className="text-black">
              <strong>Alex am Naschmarkt GmbH</strong>
            </p>
            <p className="text-black">
              Naschmarkt 1<br />
              1060 Wien
              <br />
              Österreich
            </p>
            <p className="text-black">
              Tel: +43 1 234 567
              <br />
              Email: info@alexamnaschmarkt.at
            </p>
            <h2 className="mt-4 text-black">Vertretungsberechtigte Personen</h2>
            <p className="text-black">Alexander Mustermann, Geschäftsführer</p>
            <h2 className="mt-4 text-black">Registereintrag</h2>
            <p className="text-black">
              Handelsregister: Handelsgericht Wien
              <br />
              Registernummer: FN 123456a
            </p>
            <h2 className="mt-4 text-black">Umsatzsteuer-ID</h2>
            <p className="text-black">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              ATU12345678
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
