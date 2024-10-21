"use client";

import { useRef, useState } from "react";
import { HeroImage } from "./hero-image";
import { Tooltip } from "./tooltip";

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

  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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
    if (!heroImageRef.current || !textRef.current) return;

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

    // Update tooltip position
    setTooltipPos({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    toggleVideoState(true);
    setIsTooltipVisible(false);
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
      setIsTooltipVisible(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isDragging) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    handleMouseUp();
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative">
      <div className="container mx-auto">
        <div
          className="hero-section relative grid grid-cols-1 gap-8 md:grid-cols-2"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={heroImageRef}
            className="relative z-0 w-full select-none overflow-hidden rounded-[100%] transition-transform duration-300 ease-out"
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
              className="flex h-full w-full cursor-move select-none items-center text-5xl font-semibold leading-none text-black transition-transform duration-300 ease-out"
            >
              Software
              <br />
              Engineer
            </h1>
          </div>
        </div>
      </div>
      <Tooltip
        position={tooltipPos}
        isVisible={isTooltipVisible}
        message="Pull harder, I'm camera shy!"
      />
    </div>
  );
}
