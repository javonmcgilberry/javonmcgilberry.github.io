"use client";

import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  isVisible: boolean;
  message: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip({ isVisible, message }, ref) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    return createPortal(
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none fixed hidden whitespace-nowrap rounded-full bg-black px-3 py-1 text-sm text-white transition-opacity duration-300 md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          zIndex: 1000,
          left: 0,
          top: 0,
        }}
      >
        {message}
      </div>,
      document.body,
    );
  },
);

Tooltip.displayName = "Tooltip";
