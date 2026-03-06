import { useEffect, useRef } from "react";

export function useVideoState() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reverseIntervalRef = useRef<ReturnType<typeof window.setInterval> | null>(
    null,
  );

  const clearReverseInterval = () => {
    if (!reverseIntervalRef.current) {
      return;
    }

    window.clearInterval(reverseIntervalRef.current);
    reverseIntervalRef.current = null;
  };

  useEffect(() => {
    return () => clearReverseInterval();
  }, []);

  const playReverse = () => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const fps = 30;
    const interval = 1000 / fps;
    let currentTime = video.currentTime;

    clearReverseInterval();

    reverseIntervalRef.current = window.setInterval(() => {
      if (currentTime <= 0) {
        clearReverseInterval();
        video.classList.remove("opacity-100");
        video.classList.add("opacity-0");
        return;
      }

      currentTime -= interval / 1000;
      video.currentTime = Math.max(0, currentTime);
    }, interval);
  };

  const toggleVideoState = (isPlaying: boolean) => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;

    clearReverseInterval();

    if (isPlaying) {
      video.classList.remove("opacity-0");
      video.classList.add("opacity-100");
      video.currentTime = 0;
      video.playbackRate = 1;
      void video.play().catch(() => {
        video.classList.remove("opacity-100");
        video.classList.add("opacity-0");
      });
      return;
    }

    video.pause();
    playReverse();
  };

  return { videoRef, toggleVideoState };
}
