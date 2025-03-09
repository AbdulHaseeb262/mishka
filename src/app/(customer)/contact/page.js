"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "../../../components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center max-w-[100vw] overflow-hidden">
      {/* top pics */}
      <div className="flex flex-row justify-between items-center">
        <div className="relative w-[1150px] h-[300px] -top-10">
          <Image
            src="/Foto 3.png"
            alt="Top Image 1"
            layout="fill"
            objectFit="cover"
            style={{ transform: "rotate(160deg)" }}
          />
        </div>
        <div className="relative w-[1150px] h-[300px] -top-10">
          <Image
            src="/Foto 3.png"
            alt="Top Image 2"
            layout="fill"
            objectFit="cover"
            style={{ transform: "rotate(200deg) scaleX(-1)" }}
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#20B442] flex flex-row justify-between min-w-[80%] gap-20 px-20 py-8 rounded-2xl mx-auto relative -top-20">
        <div className="flex flex-col justify-start items-start w-[50%]">
          <Image
            src="/logo.png"
            alt="Contact Image"
            width={400}
            height={200}
            className="my-6"
          />
          <p className="text-2xl text-wrap font-bold mb-6">
            HABEN SIE FRAGEN ODER SPEZIELLE WÜNSCHE? <br />{" "}
            <span className="text-lg text-wrap font-">
              DANN KONTAKTIEREN SIE UNS GERNE!
            </span>
          </p>
        </div>
        <div className="w-[50%]">
          <ContactForm />
        </div>
      </div>

      {/* info */}
      <div className="bg-white max-w-[90%] pb-16 relative top-20">
        <div className="mx-auto flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-black">
              HABEN SIE FRAGEN ODER SPEZIELLE WÜNSCHE?
            </h2>
            <p className="mt-2 text-2xl font-bold text-black">
              DANN KONTAKTIEREN SIE UNS GERNE!
            </p>
          </div>

          <div className="md:w-1/2 flex flex-row justify-start gap-40 mt-6 md:mt-0">
            <div className="flex flex-col gap-28">
              <span className="text-black font-medium text-lg">
                Email Addresse
              </span>
              <span className="text-black font-medium text-lg">Adresse</span>
              <span className="text-black font-medium text-lg">
                Telefonnummer
              </span>
            </div>

            <div className="flex flex-col gap-[6.25rem]">
              <span className="font-bold text-black text-3xl">XXXXXXXXXX</span>
              <span className="font-bold text-black text-3xl">XXXXXXXXXX</span>
              <span className="font-bold text-black text-3xl">XXXXXXXXXX</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom pics */}
      <div className="flex flex-row justify-between items-center">
        <div className="relative w-[1150px] h-[500px] -left-28">
          <Image
            src="/Foto 4.png"
            alt="Bottom Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-[1150px] h-[500px] top-20">
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
