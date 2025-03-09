"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success({ params }) {
  const router = useRouter();
  const { orderId } = params; // Use as needed

  useEffect(() => {
    // Set the flag when an order is confirmed.
    localStorage.setItem("hasOrdered", "true");
  }, []);

  const handleReturnToShop = () => {
    router.push("/shop"); // Adjust the path to your shop page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Payment Success Section */}
      <div className="w-full p-8 md:p-20 lg:p-40 text-center bg-orange-500 text-white shadow-lg relative z-20">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/vid 1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-20">
          <h1 className="text-4xl md:text-7xl font-bold text-shadow">
            Vielen Dank!
          </h1>
          <p className="text-xl md:text-3xl font-semibold mt-4 text-shadow tracking-wide">
            Die Zahlung wurde
            <br /> Erfolgreich durchgeführt
          </p>
          <p className="mt-8 md:mt-12 text-base md:text-lg font-light w-full sm:w-3/4 md:w-1/2 mx-auto tracking-wider text-shadow">
            Die Sendung mit der Nummer{" "}
            <span className="font-bold">{orderId ? orderId : ""}</span> wird von
            uns bearbeitet. Du wirst kontaktiert, wenn sie auf dem Weg zu dir
            ist!
          </p>
          <p className="mt-4 md:mt-12 text-base md:text-lg font-light w-full sm:w-3/4 md:w-1/2 mx-auto tracking-wider text-shadow">
            Wenn du ein Problem mit der Bestellung oder Fragen hast, dann
            kontaktiere uns!
          </p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-10 w-full max-w-4xl text-center relative z-20 px-4">
        <h2 className="text-2xl md:text-4xl tracking-wide font-bold my-8 text-black">
          Was unsere Kunden sagen:
        </h2>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-6">
          {["Heike B.", "Raphael A.", "Makkavelli"].map((name, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-lg flex flex-col justify-between h-auto md:h-[12rem]"
            >
              <h3 className="text-lg md:text-xl font-bold text-black">
                {name}
              </h3>
              <p className="mt-2 text-sm text-black">
                {index === 0 &&
                  "Ein sehr schöner Stand, super frisches Obst und Gemüse. Die Angestellten nett, höflich und aufmerksam. Sehr zu empfehlen!"}
                {index === 1 &&
                  "Sehr freundlich, alles wirklich frisch und sehr appetitlich. Gute Qualität, nicht zu teuer, aber sehr wertvoll."}
                {index === 2 &&
                  "Sehr fruchtige und köstliche Früchte, sowie Gemüse. Lieferung funktioniert ebenfalls problemlos und pünktlich."}
              </p>
              <div className="flex justify-center text-orange-500 mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return to Shop Button */}
      <div className="mb-10 mt-8 relative z-20">
        <button
          onClick={handleReturnToShop}
          className="bg-[#D3193E] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition"
        >
          ZURÜCK ZUM SHOP
        </button>
      </div>
    </div>
  );
}
