"use client";

import React from "react";
import ContactForm from "../../../components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Kontakt</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold gradient-text mb-8">
                Kontaktieren Sie uns
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Haben Sie Fragen zu unseren Produkten oder möchten Sie eine
                Bestellung aufgeben? Wir sind für Sie da!
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-[#00ff88] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p className="text-gray-300">Naschmarkt 1</p>
                  <p className="text-gray-300">1060 Wien</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-[#00ff88] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <p className="text-gray-300">+43 1 234 567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-[#00ff88] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">E-Mail</h3>
                  <p className="text-gray-300">info@alexamnaschmarkt.at</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-[#00ff88] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                  <p className="text-gray-300">Mo-Fr: 08:00 - 18:30</p>
                  <p className="text-gray-300">Sa: 08:00 - 17:00</p>
                  <p className="text-gray-300">So: geschlossen</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card p-8 rounded-2xl">
              <a
                href="https://www.google.com/maps?q=Naschmarkt,1060+Wien"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl overflow-hidden relative group"
              >
                <img
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Naschmarkt,Wien&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7CLabel:A%7CNaschmarkt,Wien&key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU"
                  alt="Standort am Naschmarkt"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">
                    In Google Maps öffnen
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Kontaktformular</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
