"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

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
  const hiddenClassName =
    direction === "up" ? "translate-y-5 opacity-0" : "-translate-y-5 opacity-0";
  const visibleClassName = "translate-y-0 opacity-100";

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const hiddenClasses = hiddenClassName.split(" ");
    const visibleClasses = visibleClassName.split(" ");

    const reveal = () => {
      element.classList.remove(...hiddenClasses);
      element.classList.add(...visibleClasses);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], currentObserver) => {
        if (!entry.isIntersecting) {
          return;
        }

        reveal();
        currentObserver.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hiddenClassName, rootMargin, threshold, visibleClassName]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        hiddenClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
