import { useEffect, useRef } from "react";

function setVideoOpacity(video: HTMLVideoElement, isVisible: boolean) {
  video.classList.toggle("opacity-100", isVisible);
  video.classList.toggle("opacity-0", !isVisible);
}

export function useVideoState() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reverseIntervalRef = useRef<number | null>(null);

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

  const playReverse = (video: HTMLVideoElement) => {
    const fps = 30;
    const interval = 1000 / fps;
    let currentTime = video.currentTime;

    clearReverseInterval();

    reverseIntervalRef.current = window.setInterval(() => {
      if (currentTime <= 0) {
        clearReverseInterval();
        setVideoOpacity(video, false);
        return;
      }

      currentTime -= interval / 1000;
      video.currentTime = Math.max(0, currentTime);
    }, interval);
  };

  const toggleVideoState = (isPlaying: boolean) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    clearReverseInterval();

    if (isPlaying) {
      setVideoOpacity(video, true);
      video.currentTime = 0;
      video.playbackRate = 1;
      void video.play().catch(() => {
        setVideoOpacity(video, false);
      });
      return;
    }

    video.pause();
    playReverse(video);
  };

  return { videoRef, toggleVideoState };
}
