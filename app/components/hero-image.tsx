import { useIntersectionObserver } from "@/utils/use-intersection-observer";
import Image from "next/image";
import { useRef } from "react";

interface HeroImageProps {
  initialImage: string;
  onLoadImage: string;
  overlayVideo: React.ReactNode;
}

export function HeroImage({
  initialImage,
  onLoadImage,
  overlayVideo,
}: HeroImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const isElementVisible = useIntersectionObserver(imageRef, {
    threshold: 0.5,
  });

  return (
    <>
      <Image
        src={`${initialImage}`}
        alt="Initial image"
        width={1000}
        height={1000}
        className="h-auto w-full"
        priority
      />
      <Image
        src={`${onLoadImage}`}
        ref={imageRef}
        alt="On load image"
        width={1000}
        height={1000}
        className={`absolute right-0 top-0 h-auto w-full transition-opacity delay-[1000ms] duration-[2000ms] ease-out ${
          isElementVisible ? "opacity-100" : "opacity-0"
        }`}
        priority
      />
      {overlayVideo}
    </>
  );
}
