"use client";

import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };
  return (
    <section>
      <div className="lg:container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hero-section fade-in-up">
          <div className="relative w-full overflow-hidden rounded-full">
            <Image
              src="/hero-1.jpg"
              alt="Hero image 1"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
            <Image
              src="/hero-2.jpg"
              alt="Hero image 2"
              width={1000}
              height={1000}
              className="absolute top-0 right-0 w-full h-auto opacity-0 animate-fade-in"
            />
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              loop
              muted
              playsInline
              className={`absolute top-0 right-0 w-full h-auto transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1
              className="text-6xl font-bold leading-tight"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Software
              <br />
              Engineer
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
