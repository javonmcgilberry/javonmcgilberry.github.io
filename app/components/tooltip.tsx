// TooltipPortal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  position: { x: number; y: number };
  isVisible: boolean;
  message: string;
}

export function Tooltip({ position, isVisible, message }: TooltipProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`pointer-events-none fixed whitespace-nowrap rounded-full bg-black px-3 py-1 text-sm text-white transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        zIndex: 1000,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {message}
    </div>,
    document.body,
  );
}
