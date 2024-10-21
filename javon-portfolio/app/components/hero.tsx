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
      <div className="mx-auto lg:container">
        <div className="hero-section fade-in-up grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative w-full overflow-hidden rounded-full">
            <Image
              src="/hero-1.jpg"
              alt="Hero image 1"
              width={1000}
              height={1000}
              className="h-auto w-full"
            />
            <Image
              src="/hero-2.jpg"
              alt="Hero image 2"
              width={1000}
              height={1000}
              className="absolute right-0 top-0 h-auto w-full animate-fade-in opacity-0"
            />
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              loop
              muted
              playsInline
              className={`absolute right-0 top-0 h-auto w-full transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1
              className="text-7xl font-semi-bold leading-none"
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
