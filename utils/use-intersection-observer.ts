import { useEffect, useRef } from "react";

interface UseIntersectionClassesProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  activeClass?: string;
  inactiveClass?: string;
}

export function useIntersectionClasses<T extends HTMLElement = HTMLElement>({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  activeClass = "opacity-100",
  inactiveClass = "opacity-0",
}: UseIntersectionClassesProps = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!elementRef.current) {
          return;
        }

        if (entry.isIntersecting) {
          elementRef.current.classList.remove(inactiveClass);
          elementRef.current.classList.add(activeClass);
          return;
        }

        elementRef.current.classList.remove(activeClass);
        elementRef.current.classList.add(inactiveClass);
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [activeClass, inactiveClass, root, rootMargin, threshold]);

  return elementRef;
}
