"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AboutUs() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Top images - Made responsive with media queries */}
      <div className="flex flex-row justify-between items-center">
        <div className="relative w-full md:w-[1350px] h-[300px] md:h-[700px] -top-4 md:-top-8">
          <Image
            src="/Foto 6.png"
            alt="Top Image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full md:w-[1350px] h-[300px] md:h-[700px] -top-4 md:-top-8">
          <Image
            src="/Foto 6.png"
            alt="Top Image 2"
            fill
            className="object-cover scale-x-[-1]"
          />
        </div>
      </div>

      {/* Text Section - Responsive text sizing and spacing */}
      <div className="px-4 md:px-6 flex flex-col items-center gap-6 md:gap-12 relative md:-top-[20rem] -top-[10rem]">
        <h1 className="text-4xl md:text-7xl text-black font-bold text-center">
          ÜBER UNS
        </h1>
        <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[70%]">
          <div className="bg-[#F0E3D4] p-4 md:p-6 rounded-3xl md:rounded-[2.75rem] mx-auto text-center">
            <p className="mt-2 md:mt-4 italic font-medium text-xl md:text-4xl text-black">
              Hallo! Wir sind
            </p>
            <p className="text-xl md:text-3xl font-extrabold text-black">
              Alex am Naschmarkt
            </p>
            <p className="px-4 md:px-12 mt-4 md:mt-8 font-bold text-base md:text-xl text-black">
              Seit vielen Jahren ist Alex am Naschmarkt eine feste Größe für
              Feinschmecker und Genießer. Unsere Leidenschaft für frische,
              hochwertige Lebensmittel spiegelt sich in unserem handverlesenen
              Sortiment wider. Wir setzen auf regionale Bauern, nachhaltigen
              Anbau und absolute Frische – Tag für Tag.
            </p>
          </div>

          <div className="mx-auto grid gap-4 md:gap-6 md:grid-cols-2 text-center">
            <div className="bg-[#F0E3D4] p-4 md:p-6 rounded-2xl md:rounded-[3rem]">
              <h3 className="text-lg md:text-xl font-bold text-black">
                Unsere Vision
              </h3>
              <p className="mt-2 font-normal text-base md:text-lg md:px-8 text-black">
                Alex am Naschmarkt verbindet die Frische des Marktlebens mit dem
                Ziel, an dem Tradition und Moderne harmonisch
                aufeinandertreffen.
              </p>
            </div>
            <div className="bg-[#F0E3D4] p-4 md:p-6 rounded-2xl md:rounded-[3rem]">
              <h3 className="text-lg md:text-xl font-bold text-black">
                Unsere Mission
              </h3>
              <p className="mt-2 font-normal text-base md:text-lg md:px-8 text-black">
                Wir bieten qualitativ hochwertige Produkte aus der Region und
                der Welt, schaffen eine einladende Atmosphäre und setzen auf
                Nachhaltigkeit. Bei uns erlebt jeder Gast das authentische Flair
                des Naschmarkts.
              </p>
            </div>
          </div>

          <div className="bg-[#F0E3D4] p-4 md:p-6 rounded-3xl md:rounded-[2.75rem] flex flex-col items-center">
            <h3 className="text-lg md:text-xl font-bold text-center text-black">
              Unsere Unternehmenswerte
            </h3>
            <ul className="mt-2 md:mt-4 space-y-2 text-black">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-start gap-2 md:gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#20B442"
                    className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-lg">
                    {
                      [
                        "Qualität & Frische: Ausgewählte Produkte, direkt vom Erzeuger.",
                        "Nachhaltigkeit: Regional, saisonal und umweltbewusst.",
                        "Gastfreundschaft: Herzliche Betreuung in beiden Geschäften.",
                      ][i]
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom images - Responsive positioning */}
      <div className="relative flex flex-row overflow-hidden">
        <div className="absolute w-[300px] md:w-[850px] h-[300px] md:h-[700px] -left-[10rem] md:-left-[25rem] -top-[5rem] md:-top-[15rem]">
          <Image
            src="/Foto 8.png"
            alt="Bottom Image 1"
            fill
            className="object-cover scale-x-[-1]"
          />
        </div>
        <div className="absolute w-[300px] md:w-[850px] h-[300px] md:h-[700px] -right-[12rem] md:-right-[28rem] -top-[15rem] md:-top-[30rem]">
          <Image
            src="/Foto 8.png"
            alt="Bottom Image 2"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Green footer with slider - Made responsive */}
      <div className="relative w-full h-[400px] md:h-[900px]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/Foto 7.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative top-32 md:top-[20rem] w-[90%] md:w-[50%] mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-xl md:rounded-3xl shadow-lg"
            >
              {["/Foto 9.jpg", "/Foto 10.jpg"].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[250px] md:h-[400px]">
                    <Image
                      src={img}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
