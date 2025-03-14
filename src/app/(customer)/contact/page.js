"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "../../../components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center max-w-[100vw] overflow-hidden">
      {/* top pics */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="relative w-full md:w-[575px] h-[150px] md:h-[300px] -top-5 md:-top-10">
          <Image
            src="/Foto 3.png"
            alt="Top Image 1"
            layout="fill"
            objectFit="cover"
            className="transform rotate-160 md:rotate-160"
          />
        </div>
        <div className="relative w-full md:w-[575px] h-[150px] md:h-[300px] -top-5 md:-top-10">
          <Image
            src="/Foto 3.png"
            alt="Top Image 2"
            layout="fill"
            objectFit="cover"
            className="transform scale-x-[-1] rotate-200 md:rotate-200"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#20B442] flex flex-col md:flex-row justify-between w-[90%] md:min-w-[80%] gap-10 md:gap-20 px-6 md:px-20 py-8 rounded-2xl mx-auto relative -top-10 md:-top-20">
        <div className="flex flex-col justify-start items-start w-full md:w-[50%]">
          <Image
            src="/logo.png"
            alt="Contact Image"
            width={400}
            height={200}
            className="my-6 w-[80%] max-w-[400px] mx-auto md:mx-0"
          />
          <p className="text-xl md:text-2xl text-center md:text-left font-bold mb-6">
            HABEN SIE FRAGEN ODER SPEZIELLE WÜNSCHE? <br />{" "}
            <span className="text-base md:text-lg">
              DANN KONTAKTIEREN SIE UNS GERNE!
            </span>
          </p>
        </div>
        <div className="w-full md:w-[50%]">
          <ContactForm />
        </div>
      </div>

      {/* info */}
      <div className="bg-white max-w-[90%] pb-16 relative top-10 md:top-20">
        <div className="mx-auto flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-black">
              HABEN SIE FRAGEN ODER SPEZIELLE WÜNSCHE?
            </h2>
            <p className="mt-2 text-lg md:text-2xl font-bold text-black">
              DANN KONTAKTIEREN SIE UNS GERNE!
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col md:flex-row justify-start gap-8 md:gap-40">
            <div className="flex flex-col gap-6 md:gap-28">
              <span className="text-black font-medium text-base md:text-lg">
                Email Addresse
              </span>
              <span className="text-black font-medium text-base md:text-lg">
                Adresse
              </span>
              <span className="text-black font-medium text-base md:text-lg">
                Telefonnummer
              </span>
            </div>

            <div className="flex flex-col gap-6 md:gap-[6.25rem]">
              <span className="font-bold text-black text-xl md:text-3xl">
                XXXXXXXXXX
              </span>
              <span className="font-bold text-black text-xl md:text-3xl">
                XXXXXXXXXX
              </span>
              <span className="font-bold text-black text-xl md:text-3xl">
                XXXXXXXXXX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom pics */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="relative w-full md:w-[575px] h-[250px] md:h-[500px] md:-left-28">
          <Image
            src="/Foto 4.png"
            alt="Bottom Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full md:w-[575px] h-[250px] md:h-[500px] md:top-20">
          <Image
            src="/Foto 5.png"
            alt="Bottom Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
