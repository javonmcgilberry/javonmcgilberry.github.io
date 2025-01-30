import { useIntersectionClasses } from "@/utils/use-intersection-observer";
import Image from "next/image";

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
  const imageRef = useIntersectionClasses({
    threshold: 0.5,
    activeClass: "opacity-100",
    inactiveClass: "opacity-0",
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
        ref={imageRef}
        src={`${onLoadImage}`}
        alt="On load image"
        width={1000}
        height={1000}
        className="absolute right-0 top-0 h-auto w-full transition-opacity delay-[1000ms] duration-[2000ms] ease-out"
        priority
      />
      {overlayVideo}
    </>
  );
}
