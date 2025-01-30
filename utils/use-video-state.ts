import { useRef, useCallback, useEffect } from "react";

// Let's be honest here, I needed some AI support for this one LOL.
// Absolutely no shame here.
export function useVideoState() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reverseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearReverseInterval = () => {
    if (reverseIntervalRef.current) {
      clearInterval(reverseIntervalRef.current);
      reverseIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearReverseInterval();
  }, []);

  const playReverse = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const fps = 30; // Assuming 30fps video
    const interval = 1000 / fps; // ~33.33ms per frame

    // Start from current position
    let currentTime = video.currentTime;

    clearReverseInterval();

    reverseIntervalRef.current = setInterval(() => {
      if (currentTime <= 0) {
        clearReverseInterval();
        video.classList.remove("opacity-100");
        video.classList.add("opacity-0");
        return;
      }

      currentTime -= interval / 1000; // Convert ms to seconds
      video.currentTime = Math.max(0, currentTime);
    }, interval);
  }, []);

  const toggleVideoState = useCallback(
    (isPlaying: boolean) => {
      if (!videoRef.current) return;
      const video = videoRef.current;

      clearReverseInterval();

      if (isPlaying) {
        video.classList.remove("opacity-0");
        video.classList.add("opacity-100");
        video.currentTime = 0;
        video.playbackRate = 1;
        video.play();
      } else {
        video.pause();
        playReverse();
      }
    },
    [playReverse],
  );

  return { videoRef, toggleVideoState };
}
