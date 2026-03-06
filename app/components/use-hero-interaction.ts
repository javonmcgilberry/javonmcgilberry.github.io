"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useVideoState } from "@/utils/use-video-state";

const DESKTOP_MAX_MOVE = 200;
const TOUCH_MAX_MOVE = 50;
const TOOLTIP_OFFSET = 20;
const INITIAL_POINT = { x: 0, y: 0 };

interface Point {
  x: number;
  y: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDesktopOffset(
  event: PointerEvent<HTMLDivElement>,
  container: HTMLDivElement,
): Point {
  const rect = container.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  return {
    x: (x - 0.5) * DESKTOP_MAX_MOVE * 2,
    y: (y - 0.5) * DESKTOP_MAX_MOVE * 2,
  };
}

function getTouchOffset(
  event: PointerEvent<HTMLDivElement>,
  startPoint: Point,
): Point {
  return {
    x: clamp(event.clientX - startPoint.x, -TOUCH_MAX_MOVE, TOUCH_MAX_MOVE),
    y: clamp(event.clientY - startPoint.y, -TOUCH_MAX_MOVE, TOUCH_MAX_MOVE),
  };
}

export function useHeroInteraction() {
  const { videoRef, toggleVideoState } = useVideoState();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const startPointRef = useRef<Point>(INITIAL_POINT);
  const lastPointerTypeRef = useRef("mouse");
  const canHoverRef = useRef(false);
  const isHoveringRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [showTouchHint, setShowTouchHint] = useState(true);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const applyTransforms = ({ x, y }: Point) => {
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    if (textRef.current) {
      textRef.current.style.transform = `translate(${-x}px, ${-y}px)`;
    }
  };

  const resetTransforms = () => {
    applyTransforms(INITIAL_POINT);
  };

  const updateTooltipPosition = (clientX: number, clientY: number) => {
    if (!tooltipRef.current) {
      return;
    }

    tooltipRef.current.style.left = `${clientX + TOOLTIP_OFFSET}px`;
    tooltipRef.current.style.top = `${clientY + TOOLTIP_OFFSET}px`;
  };

  const endInteraction = (pointerType: string) => {
    setIsDragging(false);
    toggleVideoState(false);
    resetTransforms();
    setIsTooltipVisible(
      pointerType === "mouse" && canHoverRef.current && isHoveringRef.current,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    startPointRef.current = { x: event.clientX, y: event.clientY };

    setIsDragging(true);
    setIsTooltipVisible(false);

    if (event.pointerType !== "mouse") {
      setShowTouchHint(false);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    toggleVideoState(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;

    if (event.pointerType === "mouse" && canHoverRef.current) {
      updateTooltipPosition(event.clientX, event.clientY);
    }

    if (!isDragging) {
      return;
    }

    if (event.pointerType === "mouse") {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      applyTransforms(getDesktopOffset(event, section));
      return;
    }

    applyTransforms(getTouchOffset(event, startPointRef.current));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    endInteraction(event.pointerType);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    isHoveringRef.current = true;

    if (event.pointerType !== "mouse" || !canHoverRef.current || isDragging) {
      return;
    }

    updateTooltipPosition(event.clientX, event.clientY);
    setIsTooltipVisible(true);
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;

    if (isDragging) {
      endInteraction(lastPointerTypeRef.current);
      return;
    }

    setIsTooltipVisible(false);
  };

  const handlePointerCancel = () => {
    endInteraction(lastPointerTypeRef.current);
  };

  return {
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
  };
}
