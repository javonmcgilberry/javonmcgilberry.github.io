"use client";

import { useRef, useState } from "react";
import { HeroImage } from "./hero-image";

const toggleElementOpacity = (
  element: HTMLElement | null,
  isVisible: boolean,
) => {
  if (!element) return;
  element.classList.toggle("opacity-100", isVisible);
  element.classList.toggle("opacity-0", !isVisible);
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleVideoState = (isEntering: boolean) => {
    toggleElementOpacity(videoRef.current, isEntering);
    if (isEntering) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current || !textRef.current || !messageRef.current)
      return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const maxMove = 200; // Maximum pixels to move
    const moveX = (x - 0.5) * maxMove * 2;
    const moveY = (y - 0.5) * maxMove * 2;

    if (isDragging) {
      heroImageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      textRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    }

    // Position the message near the cursor
    messageRef.current.style.left = `${e.clientX + 20}px`;
    messageRef.current.style.top = `${e.clientY + 20}px`;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    toggleVideoState(true);
    toggleElementOpacity(messageRef.current, false);
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
    if (isHovering) {
      toggleElementOpacity(messageRef.current, true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isDragging) {
      toggleElementOpacity(messageRef.current, true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    handleMouseUp();
    toggleElementOpacity(messageRef.current, false);
  };

  return (
    <section className="relative">
      <div className="container mx-auto">
        <div
          className="hero-section fade-in-up relative grid grid-cols-1 gap-8 md:grid-cols-2"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
              className="flex h-full w-full cursor-move select-none items-center text-6xl font-semi-bold leading-none text-black transition-transform duration-300 ease-out sm:text-7xl"
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
      <div
        ref={messageRef}
        className="pointer-events-none fixed whitespace-nowrap rounded-full bg-black px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300"
        style={{ zIndex: 1000 }}
      >
        Pull harder, I'm camera shy!
      </div>
    </section>
  );
}
