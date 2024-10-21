"use client";

import { useState, useEffect } from "react";
import DesktopHero from "./desktop-hero";
import MobileHero from "./mobile-hero";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex =
        /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
      const tabletRegex =
        /ipad|android(?!.*mobile)|tablet|kindle|playbook|silk/i;

      const isMobileDevice = mobileRegex.test(userAgent);
      const isTablet = tabletRegex.test(userAgent);
      const isPortrait = window.innerHeight > window.innerWidth;

      setIsMobile(isMobileDevice || (isTablet && isPortrait));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="fade-in-up relative">
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </section>
  );
}
