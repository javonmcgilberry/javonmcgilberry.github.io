import Image from "next/image";
import type { ReactNode } from "react";
import { useIntersectionClasses } from "@/utils/use-intersection-observer";

interface HeroImageProps {
  initialImage: string;
  onLoadImage: string;
  overlayVideo: ReactNode;
}

export function HeroImage({
  initialImage,
  onLoadImage,
  overlayVideo,
}: HeroImageProps) {
  const imageRef = useIntersectionClasses<HTMLImageElement>({
    threshold: 0.5,
    activeClass: "opacity-100",
    inactiveClass: "opacity-0",
  });

  return (
    <>
      <Image
        src={initialImage}
        alt="Portrait of Javon McGilberry"
        width={1000}
        height={1000}
        className="h-auto w-full"
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <Image
        ref={imageRef}
        src={onLoadImage}
        alt=""
        aria-hidden="true"
        width={1000}
        height={1000}
        className="absolute right-0 top-0 h-auto w-full opacity-0 transition-opacity delay-[1000ms] duration-[2000ms] ease-out"
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      {overlayVideo}
    </>
  );
}
