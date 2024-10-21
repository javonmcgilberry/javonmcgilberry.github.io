"use client";

import { useRef } from "react";
import { HeroImage } from "./hero-image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoState = (isEntering: boolean) => {
    if (!videoRef.current) return;
    videoRef.current.classList.toggle("opacity-100", isEntering);
    videoRef.current.classList.toggle("opacity-0", !isEntering);
    if (isEntering) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="hero-section fade-in-up grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative w-full overflow-hidden rounded-full">
            <HeroImage
              initialImage="/hero-1.jpg"
              onLoadImage="/hero-2.jpg"
              overlayVideo={
                <video
                  ref={videoRef}
                  src="/hero-video.mp4"
                  loop
                  muted
                  playsInline
                  className="absolute right-0 top-0 h-auto w-full opacity-0 transition-opacity duration-500"
                />
              }
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1
              className="text-7xl font-semi-bold leading-none"
              onMouseEnter={() => toggleVideoState(true)}
              onMouseLeave={() => toggleVideoState(false)}
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
