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

function getDragOffset(
  event: PointerEvent<HTMLDivElement>,
  start: Point,
  maxMove: number,
): Point {
  return {
    x: clamp(event.clientX - start.x, -maxMove, maxMove),
    y: clamp(event.clientY - start.y, -maxMove, maxMove),
  };
}

export function useHeroInteraction() {
  const { videoRef, toggleVideoState } = useVideoState();
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const startPointRef = useRef<Point>(INITIAL_POINT);
  const draggingRef = useRef(false);
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

  // The class transition (300ms ease-out) animates the snap-back on release,
  // but would lag the image behind the pointer mid-drag, so it's suspended
  // while dragging.
  const setTransitionsEnabled = (enabled: boolean) => {
    const value = enabled ? "" : "none";

    if (heroImageRef.current) {
      heroImageRef.current.style.transition = value;
    }

    if (textRef.current) {
      textRef.current.style.transition = value;
    }
  };

  const updateTooltipPosition = (clientX: number, clientY: number) => {
    if (!tooltipRef.current) {
      return;
    }

    tooltipRef.current.style.left = `${clientX + TOOLTIP_OFFSET}px`;
    tooltipRef.current.style.top = `${clientY + TOOLTIP_OFFSET}px`;
  };

  const endInteraction = (pointerType: string) => {
    draggingRef.current = false;
    setIsDragging(false);
    toggleVideoState(false);
    setTransitionsEnabled(true);
    applyTransforms(INITIAL_POINT);
    setIsTooltipVisible(
      pointerType === "mouse" && canHoverRef.current && isHoveringRef.current,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startPointRef.current = { x: event.clientX, y: event.clientY };
    draggingRef.current = true;

    setIsDragging(true);
    setIsTooltipVisible(false);

    if (event.pointerType !== "mouse") {
      setShowTouchHint(false);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setTransitionsEnabled(false);
    toggleVideoState(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && canHoverRef.current) {
      updateTooltipPosition(event.clientX, event.clientY);
    }

    if (!draggingRef.current) {
      return;
    }

    const maxMove =
      event.pointerType === "mouse" ? DESKTOP_MAX_MOVE : TOUCH_MAX_MOVE;

    applyTransforms(getDragOffset(event, startPointRef.current, maxMove));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    endInteraction(event.pointerType);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    isHoveringRef.current = true;

    if (
      event.pointerType !== "mouse" ||
      !canHoverRef.current ||
      draggingRef.current
    ) {
      return;
    }

    updateTooltipPosition(event.clientX, event.clientY);
    setIsTooltipVisible(true);
  };

  // Pointer capture keeps events on the section mid-drag, so leave only ever
  // fires while idle; up/cancel handle every dragging exit.
  const handlePointerLeave = () => {
    isHoveringRef.current = false;
    setIsTooltipVisible(false);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    endInteraction(event.pointerType);
  };

  return {
    videoRef,
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
