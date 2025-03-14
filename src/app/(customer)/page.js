"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../slider.css";
import { useProducts } from "../../hooks/useProducts";

// Dynamically load Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
});
const heroImage = "/Foto 1.png";
export default function HomePage() {
  const router = useRouter();
  const { getBestsellerProducts } = useProducts();
  const [isMounted, setIsMounted] = useState(false);
  const products = getBestsellerProducts();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F9F1E7]">
        {/* Loading skeletons matching your UI */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#F9F1E7] px-2 md:px-16 md:pt-16">
          <div className="md:w-[50%] h-[400px] md:h-[500px] bg-gray-200 animate-pulse" />
          <div className="md:w-[50%] h-[300px] md:h-[550px] bg-gray-200 animate-pulse" />
        </div>
        {/* Other skeleton elements... */}
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#F9F1E7] px-2 md:px-16 md:pt-16">
        {/* Text Section */}
        <div className="md:w-[50%] flex flex-col justify-center items-center text-center md:text-left p-2 mt-2 h-[400px] md:h-[500px]">
          <Image
            src="/logo.png"
            alt="Alex am Naschmarkt Logo"
            width={500}
            height={350}
            priority={true} // Ensures instant rendering
            fetchPriority="high" // Tells browser to prioritize it
            decoding="sync" // Forces immediate decoding
            className="w-auto h-auto" // Tells the browser to prioritize this
          />
          <p className="text-lg md:w-[70%] font-normal text-black mt-12">
            Entdecken Sie die Vielfalt an frischem Obst, knackigem Gemüse und
            erlesenen Weinen – direkt am legendären Wiener Naschmarkt!
          </p>
          <button
            className="mt-8 bg-[#D3183D] text-white px-12 py-3 rounded-full font-semibold hover:bg-red-600 transition"
            onClick={() => router.push("/shop")}
          >
            JETZT BESTELLEN
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-[50%] mt-0 md:mt-0 h-[300px] md:h-[550px] relative">
          <Image
            src={heroImage}
            alt="Market showcase"
            fill
            priority
            className="object-cover object-bottom"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center bg-[#D3183D] text-white">
        <div className="md:w-1/2 w-full relative h-[700px]">
          <Image
            src="/Foto 2.jpg"
            alt="About us"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left p-6 px-24">
          <h2 className="text-5xl font-bold mb-4">Über uns</h2>
          <p className="text-lg mb-12">
            Seit vielen Jahren ist Alex am Naschmarkt eine feste Größe für
            Feinschmecker und Genießer. Unsere Leidenschaft für frische,
            hochwertige Lebensmittel spiegelt sich in unserem handverlesenen
            Sortiment wider.
          </p>
          <button
            className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition"
            onClick={() => router.push("/about")}
          >
            MEHR ERFAHREN
          </button>
        </div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      {/* Products Section */}
      <div className="bg-[#F4E5D5] text-center py-12 px-6">
        <h2 className="text-4xl font-extrabold mb-2 text-black">
          Was wir anbieten
        </h2>
        <p className="text-lg text-black mb-8 font-semibold">
          Neugierig? Hier sind unsere beliebtesten Produkte
        </p>

        <div className="max-w-[80%] mx-auto">
          {isMounted && (
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 md:p-12"
                  onClick={() => router.push("/shop")}
                >
                  <div className="bg-white rounded-2xl shadow-lg pb-6 flex flex-col items-center transition-all ease-in-out duration-200 hover:scale-105 h-[350px]">
                    <div className="w-full h-[200px] relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="rounded-t-2xl object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="font-extrabold text-base mt-4 text-black">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 text-center">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-black mt-2">
                      €{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <button
          className="mt-8 bg-[#D3183D] text-white px-12 py-2 rounded-full font-bold hover:bg-red-700 transition"
          onClick={() => router.push("/shop")}
        >
          ZUM SHOP
        </button>
      </div>

      {/* Reviews Section remains same */}
      <div className="bg-[#EC7B37] text-white py-40 px-6 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url('/Muster.png')" }}
        ></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Was unsere Kunden sagen:
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Heike B.",
                text: "Ein sehr schöner Stand, super frisches Obst und Gemüse, die Angestellten nett, höflich und aufmerksam. Wenn ich in Wien bin, bin ich immer sehr gerne dort. Sehr zu empfehlen!",
              },
              {
                name: "Raphael A.",
                text: "Sehr freundlich, alles wirklich frisch und sehr appetitlich. Besonders die nette Dame, die mich bedient hatte und die Kinder dürfen dort verstecken spielen. Gute Qualität, nicht zu teuer, aber sehr wertvoll.",
              },
              {
                name: "Makkavelli",
                text: "Sehr fruchtige und köstliche Früchte, sowie Gemüse. In Wien meine erste Wahl, wenn ich Obst oder Gemüse kaufen möchte. Lieferung funktioniert ebenfalls problemlos und pünktlich.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-base">{testimonial.text}</p>
                <div className="mt-4 flex justify-center space-x-1 text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-2xl">
                        ★
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-4 border-[#2a2a2a]" />
    </>
  );
}
