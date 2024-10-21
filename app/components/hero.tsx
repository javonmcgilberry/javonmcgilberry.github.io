"use client";

import { useRef, useState } from "react";
import { HeroImage } from "./hero-image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current || !textRef.current || !isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const maxMove = 200; // Maximum pixels to move
    const moveX = (x - 0.5) * maxMove * 2;
    const moveY = (y - 0.5) * maxMove * 2;

    heroImageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    textRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    toggleVideoState(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    toggleVideoState(false);
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = "translate(0, 0)";
    }
    if (textRef.current) {
      textRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <section className="relative">
      <div
        className="container mx-auto cursor-move"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="hero-section fade-in-up relative grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            ref={heroImageRef}
            className="relative z-0 w-full overflow-hidden rounded-full transition-transform duration-300 ease-out"
          >
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
          <div className="relative z-10 flex h-full flex-col justify-center">
            <h1
              ref={textRef}
              className="flex h-full w-full select-none items-center text-7xl font-semi-bold leading-none text-black transition-transform duration-300 ease-out"
            >
              <span className="mix-blend-difference">
                Software
                <br />
                Engineer
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
