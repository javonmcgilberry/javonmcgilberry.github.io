"use client";

import { useEffect } from "react";
import { initAnimations } from "@/utils/animations";
export default function AnimationInitializer() {
  useEffect(() => {
    const cleanup = initAnimations();
    return () => cleanup();
  }, []);

  return null;
}
