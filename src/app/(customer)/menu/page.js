import Image from "next/image";

export default function menu() {
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
      <div className="flex flex-col justify-center items-center pt-24 gap-16">
        <h1 className="font-bold text-black text-7xl">MENÜ</h1>
        <div className="bg-[#EB7A37] relative w-[700px] h-[700px] rounded-3xl">
          {/* <Image
            src="/path/to/your/image.jpg"
            alt="Sample Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          /> */}
        </div>
        <button className="bg-[#EB7A37] text-white px-8 py-2 rounded-full text-lg tracking-wide">
          Download
        </button>
      </div>

      {/* bottom pics */}
      <div
        className="relative w-full h-[700px] "
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
