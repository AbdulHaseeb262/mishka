"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Mail, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  nachname: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
});

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    nachname: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", nachname: "", email: "", message: "" });
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-lg text-black font-normal ml-4 "
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 ${
            errors.name ? "ring-2 ring-red-500" : "focus:ring-emerald-500"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="nachname"
          className="block text-lg text-black font-normal ml-4"
        >
          Nachname
        </label>
        <input
          type="text"
          id="nachname"
          name="nachname"
          value={formData.nachname}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 ${
            errors.nachname ? "ring-2 ring-red-500" : "focus:ring-emerald-500"
          }`}
        />
        {errors.nachname && (
          <p className="mt-1 text-sm text-red-500">{errors.nachname}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-lg text-black font-normal ml-4"
        >
          E-Mail
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 ${
              errors.email ? "ring-2 ring-red-500" : "focus:ring-emerald-500"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-lg text-black font-normal ml-4"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-2 rounded-3xl bg-white text-black focus:outline-none focus:ring-2 ${
            errors.message ? "ring-2 ring-red-500" : "focus:ring-emerald-500"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-[70%] mx-auto flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            <span>JETZT KONTAKTIEREN!</span>
          </>
        )}
      </button>

      {submitStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-500/20 text-green-200">
          Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei
          Ihnen melden.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-500/20 text-red-200">
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
