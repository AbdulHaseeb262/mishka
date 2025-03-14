"use client";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  const handleReturnToShop = () => {
    router.push("/shop"); // Adjust the path to your shop page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Payment Success Section */}
      <div className="w-full p-40 text-center bg-orange-500 text-white shadow-lg relative z-20">
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
          <h1 className="text-7xl font-bold text-shadow dancing">
            Vielen Dank!
          </h1>
          <p className="text-3xl font-semibold mt-4 text-shadow tracking-wide">
            Die Zahlung wurde
            <br /> Erfolgreich durchgeführt
          </p>
          <p className="mt-12 text-lg font-light w-[50%] mx-auto tracking-wider text-shadow">
            Die Sendung mit der Nummer{" "}
            <span className="font-bold">RC0349943</span> wird von uns
            bearbeitet. Du wirst kontaktiert, wenn sie auf dem Weg zu dir ist!
          </p>
          <p className="mt-12 text-lg font-light w-[50%] mx-auto tracking-wider text-shadow">
            Wenn du ein Problem mit der Bestellung oder Fragen hast, dann
            kontaktiere uns!
          </p>
          {/* Tracking order text */}
          <p className="mt-4 text-lg font-light w-[50%] mx-auto tracking-wider text-shadow">
            Zur Sendungsverfolgung:{" "}
            <a
              href="/order-tracker"
              className="underline font-bold text-white hover:text-yellow-300 transition"
            >
              Track order
            </a>
          </p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-10 w-full max-w-4xl text-center relative z-20">
        <h2 className="text-4xl tracking-wide font-bold my-8 text-black">
          Was unsere Kunden sagen:
        </h2>
        <div className="mt-6 flex flex-row justify-between items-top gap-6">
          {["Heike B.", "Raphael A.", "Makkavelli"].map((name, index) => (
            <div
              key={index}
              className="p-6 rounded-lg h-[12rem] flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold text-black">{name}</h3>
              <p className="mt-2 text-sm text-black">
                {index === 0 &&
                  "Ein sehr schöner Stand, super frisches Obst und Gemüse. Die Angestellten nett, höflich und aufmerksam. Sehr zu empfehlen!"}
                {index === 1 &&
                  "Sehr freundlich, alles wirklich frisch und sehr appetitlich. Gute Qualität, nicht zu teuer, aber sehr wertvoll."}
                {index === 2 &&
                  "Sehr fruchtige und köstliche Früchte, sowie Gemüse. Lieferung funktioniert ebenfalls problemlos und pünktlich."}
              </p>
              <div className="flex justify-center text-orange-500">
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
      <div className="mb-20 mt-8 relative z-20">
        <button
          onClick={handleReturnToShop}
          className="bg-[#D3193E] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition"
        >
          ZURÜCK ZUM SHOP
        </button>
      </div>
    </div>
  );
}
