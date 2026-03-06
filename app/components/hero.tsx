"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { HeroImage } from "./hero-image";
import { Tooltip } from "./tooltip";
import { useVideoState } from "@/utils/use-video-state";

const DESKTOP_MAX_MOVE = 200;
const TOUCH_MAX_MOVE = 50;
const TOOLTIP_OFFSET = 20;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Hero() {
  const { videoRef, toggleVideoState } = useVideoState();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const startPointRef = useRef({ x: 0, y: 0 });
  const lastPointerTypeRef = useRef<string>("mouse");
  const canHoverRef = useRef(false);
  const isHoveringRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [showTouchHint, setShowTouchHint] = useState(true);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const updateTransforms = (moveX: number, moveY: number) => {
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    if (textRef.current) {
      textRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    }
  };

  const resetTransforms = () => {
    updateTransforms(0, 0);
  };

  const updateTooltipPosition = (clientX: number, clientY: number) => {
    if (!tooltipRef.current) {
      return;
    }

    tooltipRef.current.style.left = `${clientX + TOOLTIP_OFFSET}px`;
    tooltipRef.current.style.top = `${clientY + TOOLTIP_OFFSET}px`;
  };

  const finishInteraction = (pointerType: string) => {
    setIsDragging(false);
    toggleVideoState(false);
    resetTransforms();
    setIsTooltipVisible(
      pointerType === "mouse" && canHoverRef.current && isHoveringRef.current,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    startPointRef.current = { x: event.clientX, y: event.clientY };

    setIsDragging(true);
    setIsTooltipVisible(false);

    if (event.pointerType !== "mouse") {
      setShowTouchHint(false);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    toggleVideoState(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;

    if (event.pointerType === "mouse" && canHoverRef.current) {
      updateTooltipPosition(event.clientX, event.clientY);
    }

    if (!isDragging) {
      return;
    }

    if (event.pointerType === "mouse") {
      const rect = sectionRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const moveX = (x - 0.5) * DESKTOP_MAX_MOVE * 2;
      const moveY = (y - 0.5) * DESKTOP_MAX_MOVE * 2;

      updateTransforms(moveX, moveY);
      return;
    }

    const moveX = clamp(
      event.clientX - startPointRef.current.x,
      -TOUCH_MAX_MOVE,
      TOUCH_MAX_MOVE,
    );
    const moveY = clamp(
      event.clientY - startPointRef.current.y,
      -TOUCH_MAX_MOVE,
      TOUCH_MAX_MOVE,
    );

    updateTransforms(moveX, moveY);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishInteraction(event.pointerType);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    isHoveringRef.current = true;

    if (event.pointerType !== "mouse" || !canHoverRef.current || isDragging) {
      return;
    }

    updateTooltipPosition(event.clientX, event.clientY);
    setIsTooltipVisible(true);
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;

    if (isDragging) {
      finishInteraction(lastPointerTypeRef.current);
      return;
    }

    setIsTooltipVisible(false);
  };

  const handlePointerCancel = () => {
    finishInteraction(lastPointerTypeRef.current);
  };

  return (
    <section className="relative">
      <div className="container mx-auto">
        <div
          ref={sectionRef}
          className={`hero-section relative grid select-none grid-cols-1 gap-4 touch-none md:grid-cols-2 md:gap-8 md:touch-auto ${
            isDragging ? "md:cursor-grabbing" : "md:cursor-grab"
          }`}
          onPointerCancel={handlePointerCancel}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            ref={heroImageRef}
            className="relative z-0 aspect-square w-full overflow-hidden rounded-[100%] transition-transform duration-300 ease-out"
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
            {showTouchHint ? (
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-2xl font-bold text-white md:hidden">
                Poke me, I&apos;m camera shy!
              </div>
            ) : null}
          </div>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <h1
              ref={textRef}
              className="flex h-full w-full items-center text-5xl font-semibold leading-none text-black transition-transform duration-300 ease-out md:text-7xl"
            >
              <span className="mix-blend-difference md:mix-blend-normal">
                Software
                <br />
                Engineer
              </span>
            </h1>
          </div>
        </div>
      </div>
      <Tooltip
        ref={tooltipRef}
        isVisible={isTooltipVisible}
        message="Pull harder, I'm camera shy!"
      />
    </section>
  );
}
