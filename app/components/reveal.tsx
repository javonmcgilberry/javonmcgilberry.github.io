"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  direction?: "up" | "down";
  threshold?: number;
  rootMargin?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Reveal({
  children,
  className,
  direction = "up",
  threshold = 0.1,
  rootMargin = "0px 0px -10% 0px",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], currentObserver) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        currentObserver.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 opacity-100"
          : direction === "up"
            ? "translate-y-5 opacity-0"
            : "-translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
