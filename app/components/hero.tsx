"use client";

import { HeroImage } from "./hero-image";
import { Tooltip } from "./tooltip";
import { useHeroInteraction } from "./use-hero-interaction";

export default function Hero() {
  const {
    videoRef,
    sectionRef,
    heroImageRef,
    textRef,
    tooltipRef,
    isDragging,
    isTooltipVisible,
    showTouchHint,
    handlePointerCancel,
    handlePointerDown,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
  } = useHeroInteraction();

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
