"use client";

import { useRef, useState, TouchEvent } from "react";
import { HeroImage } from "./hero-image";
import { useVideoState } from "@/utils/use-video-state";

export default function MobileHero() {
  const { videoRef, toggleVideoState } = useVideoState();
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [showDragIndicator, setShowDragIndicator] = useState(true);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    toggleVideoState(true);
    setShowDragIndicator(false);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !heroImageRef.current || !textRef.current) return;

    const moveX = e.touches[0].clientX - startX;
    const moveY = e.touches[0].clientY - startY;

    const maxMove = 50;
    const limitedMoveX = Math.max(Math.min(moveX, maxMove), -maxMove);
    const limitedMoveY = Math.max(Math.min(moveY, maxMove), -maxMove);

    heroImageRef.current.style.transform = `translate(${limitedMoveX}px, ${limitedMoveY}px)`;
    textRef.current.style.transform = `translate(${-limitedMoveX}px, ${-limitedMoveY}px)`;
  };

  const handleTouchEnd = () => {
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
    <div className="container mx-auto">
      <div className="hero-section relative grid grid-cols-1 gap-4">
        <div
          ref={heroImageRef}
          className="relative z-0 aspect-square w-full select-none overflow-hidden rounded-[100%] transition-transform duration-300 ease-out"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
          {showDragIndicator && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
              Poke me, I&apos;m camera shy!
            </div>
          )}
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center">
          <h1
            ref={textRef}
            className="flex h-full w-full select-none items-center text-5xl font-semi-bold leading-none text-black transition-transform duration-300 ease-out"
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
  );
}
