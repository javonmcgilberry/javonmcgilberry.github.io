import { useEffect, useRef } from "react";

interface UseIntersectionClassesProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  activeClass?: string;
  inactiveClass?: string;
}

export function useIntersectionClasses({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  activeClass = "opacity-100",
  inactiveClass = "opacity-0",
}: UseIntersectionClassesProps = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementRef = useRef<any | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!elementRef.current) return;

        if (entry.isIntersecting) {
          elementRef.current.classList.remove(inactiveClass);
          elementRef.current.classList.add(activeClass);
        } else {
          elementRef.current.classList.remove(activeClass);
          elementRef.current.classList.add(inactiveClass);
        }
      },
      { threshold, root, rootMargin },
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, activeClass, inactiveClass]);

  return elementRef;
}
