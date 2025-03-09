"use client";

import React from "react";
import { Clock, Phone, Mail, MapPin, Truck, Award, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white px-4 text-center">
            Über Uns
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Geschichte */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 md:mb-8">
            Unsere Geschichte
          </h2>
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Seit über 30 Jahren sind wir am Wiener Naschmarkt zu Hause. Was
              als kleiner Familienstand begann, hat sich zu einem der
              bekanntesten Händler für regionale Produkte und erlesene Weine
              entwickelt.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Unser Fokus liegt auf der Qualität und Nachhaltigkeit unserer
              Produkte. Wir arbeiten eng mit lokalen Bauern und Winzern
              zusammen, um Ihnen das Beste aus Österreich anzubieten.
            </p>
          </div>
        </div>

        {/* Vorteile */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 md:mb-8">
            Warum bei uns einkaufen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl text-center">
              <div className="mb-4 flex justify-center">
                <Leaf className="h-10 md:h-12 w-10 md:w-12 text-[#00ff88]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Regionale Produkte
              </h3>
              <p className="text-gray-300">
                Wir beziehen unsere Produkte von lokalen Bauern und Produzenten.
              </p>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-2xl text-center">
              <div className="mb-4 flex justify-center">
                <Award className="h-10 md:h-12 w-10 md:w-12 text-[#00a3ff]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Höchste Qualität
              </h3>
              <p className="text-gray-300">
                Nur ausgewählte Produkte finden den Weg in unser Sortiment.
              </p>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-2xl text-center">
              <div className="mb-4 flex justify-center">
                <Truck className="h-10 md:h-12 w-10 md:w-12 text-[#00ff88]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Lieferservice
              </h3>
              <p className="text-gray-300">
                Wir liefern in ganz Wien direkt zu Ihnen nach Hause.
              </p>
            </div>
          </div>
        </div>

        {/* Kontakt & Öffnungszeiten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 md:mb-8">
              Kontakt
            </h2>
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-[#00ff88]" />
                  <div>
                    <p className="text-white">Umarfisch am Naschmarkt</p>
                    <p className="text-gray-300">1060 Wien</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-[#00ff88]" />
                  <p className="text-white">+43 1 234 567</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-[#00ff88]" />
                  <p className="text-white">info@alexamnaschmarkt.at</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 md:mb-8">
              Öffnungszeiten
            </h2>
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-[#00a3ff]" />
                  <div>
                    <div className="flex justify-between">
                      <p className="text-white">Montag - Freitag</p>
                      <p className="text-gray-300">08:00 - 18:30</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white">Samstag</p>
                      <p className="text-gray-300">08:00 - 17:00</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white">Sonntag</p>
                      <p className="text-gray-300">geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 md:mb-8">
            Hier finden Sie uns
          </h2>
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <a
                href="https://www.google.com/maps?q=Umarfisch+am+Naschmarkt,1060+Wien"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden relative group"
              >
                <img
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Umarfisch+am+Naschmarkt,1060+Wien&zoom=17&size=1200x400&maptype=roadmap&markers=color:red%7CLabel:A%7CUmarfisch+am+Naschmarkt,1060+Wien&key=YOUR_GOOGLE_MAPS_API_KEY"
                  alt="Standort am Naschmarkt"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">
                    In Google Maps öffnen
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
