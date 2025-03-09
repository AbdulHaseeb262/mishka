"use client";

import React, { useState } from "react";
import { z } from "zod";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { Mail, Phone, Send, User, MapPin, Bike } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Ensure your Firebase config is exported from here

// Validation schema for the contact form
const riderContactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Vorname muss mindestens 2 Zeichen lang sein")
    .regex(
      /^[A-Za-zÄäÖöÜüß\s-]+$/,
      "Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten"
    ),
  lastName: z
    .string()
    .min(2, "Nachname muss mindestens 2 Zeichen lang sein")
    .regex(
      /^[A-Za-zÄäÖöÜüß\s-]+$/,
      "Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten"
    ),
  email: z
    .string()
    .email("Ungültige E-Mail-Adresse")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Ungültiges E-Mail-Format"
    ),
  phone: z.string().refine((val) => isValidPhoneNumber(val, "AT"), {
    message: "Ungültige österreichische Telefonnummer",
  }),
  address: z
    .string()
    .min(5, "Adresse muss mindestens 5 Zeichen lang sein")
    .regex(/^[A-Za-zÄäÖöÜüß0-9\s.,/-]+$/, "Adresse enthält ungültige Zeichen"),
  experience: z
    .string()
    .min(
      50,
      "Bitte beschreiben Sie Ihre Erfahrung ausführlicher (mindestens 50 Zeichen)"
    )
    .max(1000, "Beschreibung zu lang (maximal 1000 Zeichen)")
    .refine(
      (val) => {
        // Check for proper sentence structure and punctuation
        const sentences = val.split(/[.!?]+/).filter(Boolean);
        return sentences.every(
          (sentence) =>
            sentence.trim().length > 0 &&
            sentence[0] === sentence[0].toUpperCase()
        );
      },
      {
        message:
          "Bitte verwenden Sie vollständige Sätze mit korrekter Groß- und Kleinschreibung",
      }
    ),
  availability: z
    .string()
    .min(10, "Bitte geben Sie Ihre Verfügbarkeit genauer an")
    .max(200, "Beschreibung zu lang"),
});

export default function RiderContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    availability: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    try {
      riderContactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Format phone number to E.164 format
      const phoneNumber = parsePhoneNumber(formData.phone, "AT");
      const formattedPhone = phoneNumber.format("E.164");

      // Insert data into Firestore
      await addDoc(collection(db, "rider_applications"), {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formattedPhone,
        address: formData.address,
        experience: formData.experience,
        availability: formData.availability,
        status: "new",
      });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        availability: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Bike className="h-12 w-12 text-[#00ff88]" />
              <h1 className="text-5xl font-bold text-white">Rider werden</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Werden Sie Teil unseres Teams und liefern Sie frische Produkte
              direkt zu unseren Kunden
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Bewerbungsformular</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    Vorname
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                        errors.firstName
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#00ff88]"
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Nachname
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                        errors.lastName
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#00ff88]"
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    E-Mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#00ff88]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+43 "
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#00ff88]"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#00ff88]"
                    }`}
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium mb-2"
                >
                  Erfahrung als Fahrer/in
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Beschreiben Sie Ihre Erfahrung als Fahrer/in. Verwenden Sie bitte vollständige Sätze."
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                    errors.experience
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#00ff88]"
                  }`}
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.experience}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium mb-2"
                >
                  Verfügbarkeit
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="An welchen Tagen und zu welchen Uhrzeiten können Sie arbeiten?"
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 ${
                    errors.availability
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#00ff88]"
                  }`}
                />
                {errors.availability && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.availability}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00ff88] to-[#00a3ff] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#00ff88]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Bewerbung absenden</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-lg bg-green-500/20 text-green-200">
                  Ihre Bewerbung wurde erfolgreich gesendet. Wir werden uns in
                  Kürze bei Ihnen melden.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-lg bg-red-500/20 text-red-200">
                  Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
                  erneut.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
