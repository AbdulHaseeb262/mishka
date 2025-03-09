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
      {/* top pics */}
      <div className="flex flex-row justify-between items-center">
        <div className="relative w-[1350px] h-[700px] -top-8">
          <Image
            src="/Foto 6.png"
            alt="Top Image 1"
            layout="fill"
            objectFit="cover"
            // style={{ transform: "rotate(160deg)" }}
          />
        </div>
        <div className="relative w-[1350px] h-[700px] -top-8 ">
          <Image
            src="/Foto 6.png"
            alt="Top Image 2"
            layout="fill"
            objectFit="cover"
            style={{ transform: " scaleX(-1)" }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="px-6 flex flex-col items-center gap-12 relative -top-[20rem]">
        <h1 className="text-7xl text-black font-bold ">ÜBER UNS</h1>
        <div className="flex flex-col gap-6 w-[70%]">
          <div className="bg-[#F0E3D4] p-6 rounded-[2.75rem] mx-auto text-center">
            <p className="mt-4 italic font-medium text-4xl text-black">
              Hallo! Wir sind
            </p>
            <p className="text-3xl font-extrabold text-black">
              Alex am Naschmarkt
            </p>
            <p className="px-12 mt-8 font-bold text-xl text-black">
              Seit vielen Jahren ist Alex am Naschmarkt eine feste Größe für
              Feinschmecker und Genießer. Unsere Leidenschaft für frische,
              hochwertige Lebensmittel spiegelt sich in unserem handverlesenen
              Sortiment wider. Wir setzen auf regionale Bauern, nachhaltigen
              Anbau und absolute Frische – Tag für Tag.
            </p>
          </div>

          <div className="mx-auto grid gap-6 md:grid-cols-2 text-center">
            <div className="bg-[#F0E3D4] p-6 rounded-[3rem] ">
              <h3 className="text-xl font-bold text-black">Unsere Vision</h3>
              <p className="mt-2 font-normal text-lg px-8 text-black">
                Alex am Naschmarkt verbindet die Frische des Marktlebens mit dem
                Ziel, an dem Tradition und Moderne harmonisch
                aufeinandertreffen.
              </p>
            </div>
            <div className="bg-[#F0E3D4] p-6 rounded-[3rem] ">
              <h3 className="text-xl font-bold text-black">Unsere Mission</h3>
              <p className="mt-2 font-normal text-lg px-8 text-black">
                Wir bieten qualitativ hochwertige Produkte aus der Region und
                der Welt, schaffen eine einladende Atmosphäre und setzen auf
                Nachhaltigkeit. Bei uns erlebt jeder Gast das authentische Flair
                des Naschmarkts.
              </p>
            </div>
          </div>

          <div className="bg-[#F0E3D4] p-6 rounded-[2.75rem] flex flex-col items-center ">
            <h3 className="text-xl font-bold text-center text-black">
              Unsere Unternehmenswerte
            </h3>
            <ul className="mt-4 space-y-2 text-black ">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#20B442"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-lg">
                  Qualität & Frische: Ausgewählte Produkte, direkt vom Erzeuger.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#20B442"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-lg">
                  Nachhaltigkeit: Regional, saisonal und umweltbewusst.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#20B442"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ml-2 text-lg">
                  Gastfreundschaft: Herzliche Betreuung in beiden Geschäften.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom pics */}
      <div className="relative flex flex-row overflo-hidden">
        <div className="absolute w-[850px] h-[700px] -left-[25rem] -top-[15rem] ">
          <Image
            src="/Foto 8.png"
            alt="Top Image 1"
            layout="fill"
            objectFit="cover"
            style={{ transform: " scaleX(-1)" }}
          />
        </div>
        <div className="absolute w-[850px] h-[700px] -right-[28rem] -top-[30rem] ">
          <Image
            src="/Foto 8.png"
            alt="Top Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Green foot with slider */}
      <div
        className="relative w-full h-[900px]"
        style={{
          backgroundImage: "url('/Foto 7.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative top-[20rem] w-[50%] mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="rounded-3xl shadow-lg"
          >
            <SwiperSlide>
              <Image
                src="/Foto 9.jpg"
                alt="Slide 1"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/Foto 10.jpg"
                alt="Slide 2"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
