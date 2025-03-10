import Image from "next/image";

export default function Menu() {
  return (
    <section className="bg-white min-h-screen overflow-hidden">
      {/* top pics */}
      <div className="relative flex flex-row overflow-hidden">
        <div className="absolute w-[850px] h-[700px] -left-[20rem] -top-[10rem]">
          <Image
            src="/Foto 11.png"
            alt="Top Image 1"
            layout="fill"
            objectFit="cover"
            style={{ transform: "rotate(0deg)" }}
          />
        </div>
        <div className="absolute w-[850px] h-[700px] -right-[26rem] -top-[17rem]">
          <Image
            src="/Foto 12.png"
            alt="Top Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col justify-center items-center pt-24 gap-16 px-4">
        <h1 className="font-bold text-black text-4xl md:text-7xl">MENÜ</h1>
        <div className="relative w-full max-w-[700px] h-auto aspect-square">
          <Image
            src="/menu.jpg" // please change this image file FOR MENU HERE
            alt="Menu Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </div>

      {/* bottom pics */}
      <div
        className="relative w-full h-[300px] md:h-[700px] mt-16"
        style={{
          backgroundImage: "url('/Foto 13.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <hr className="border-4 border-[#2a2a2a]" />
    </section>
  );
}
