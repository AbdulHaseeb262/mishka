"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
        alt="Alex am Naschmarkt"
        width={160}
        height={48}
        className="h-12 w-auto"
      />
    </div>
  );
}
