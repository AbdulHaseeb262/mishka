
"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import CategorySection from "../../components/CategorySelection";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../slider.css";
import { useProducts } from "../../hooks/useProducts";

// Custom Arrow Components for the Slider
const CustomArrow = ({ direction, onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50px",
      height: "50px",
      backgroundColor: "#D3183D",
      borderRadius: "50%",
      zIndex: 1,
      position: "absolute",
      cursor: "pointer",
      [direction === "prev" ? "left" : "right"]: "-60px",
      bottom: "150px",
    }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="black"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"
        }
      />
    </svg>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const { getBestsellerProducts } = useProducts();
  const products = getBestsellerProducts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#F9F1E7] px-8 md:px-16 md:pt-16">
        {/* Text Section */}
        <div className="md:w-[50%] flex flex-col justify-center items-center text-center md:text-left pb-16">
          {/* <Image
            src="/logo.png"
            alt="Alex am Naschmarkt Logo"
            width={500}
            height={350}
            loading="lazy"
          /> */}
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
          <p className="text-lg md:w-[70%] font-normal text-black mt-4">
            Entdecken Sie die Vielfalt an frischem Obst, knackigem Gemüse und erlesenen Weinen – direkt am legendären Wiener Naschmarkt!
          </p>
          <button
            className="mt-6 bg-[#D3183D] text-white px-12 py-3 rounded-full font-semibold hover:bg-red-600 transition"
            onClick={() => router.push("/shop")}
          >
            JETZT BESTELLEN
          </button>
        </div>

        {/* Image Section */}
        <div
          className="md:w-[50%] mt-8 md:mt-0 h-[550px] bg-cover bg-bottom"
          style={{ backgroundImage: "url('/Foto 1.png')" }}
        ></div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      <ThemeToggle />

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center bg-[#D3183D] text-white">
        <div
          className="md:w-1/2 w-full relative h-[700px] bg-cover bg-center"
          style={{ backgroundImage: "url('/Foto 2.jpg')" }}
        ></div>
        <div className="md:w-1/2 w-full text-center md:text-left p-6 px-24">
          <h2 className="text-5xl font-bold mb-4">Über uns</h2>
          <p className="text-lg mb-12">
            Seit vielen Jahren ist Alex am Naschmarkt eine feste Größe für Feinschmecker und Genießer. Unsere Leidenschaft für frische,
            hochwertige Lebensmittel spiegelt sich in unserem handverlesenen Sortiment wider.
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
        <h2 className="text-4xl font-extrabold mb-2 text-black">Was wir anbieten</h2>
        <p className="text-lg text-black mb-8 font-semibold">
          Neugierig? Hier sind unsere beliebtesten Produkte
        </p>

        

        

    {/* Product Carousel */}
<div className="max-w-[80%] mx-auto">
  <Slider {...settings}>
    {products.map((product) => (
      <div
        key={product.id}
        className="p-12"
        onClick={() => router.push("/shop")}
      >
        <div className="bg-white rounded-2xl shadow-lg pb-6 flex flex-col items-center transition-all ease-in-out duration-200 hover:scale-105 h-[350px]">
          {/* Image Container with Fixed Height */}
          <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={250}
              height={200}
              className="rounded-t-2xl object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <h3 className="font-extrabold text-base mt-4 text-black">
            {product.name}
          </h3>
          <p className="text-sm text-gray-700 mt-2 text-center">
            {product.description}
          </p>
          <p className="text-lg font-bold text-black mt-2">${product.price}</p>
        </div>
      </div>
    ))}
  </Slider>
</div>


        {/* Shop Button */}
        <button
          className="mt-8 bg-[#D3183D] text-white px-12 py-2 rounded-full font-bold hover:bg-red-700 transition"
          onClick={() => router.push("/shop")}
        >
          ZUM SHOP
        </button>
      </div>
      <hr className="border-4 border-[#2a2a2a]" />

      {/* Reviews */}
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

