export function initAnimations(
  animationClasses: string[] = [".fade-in-down", ".fade-in-up"],
  threshold: number = 0.1,
): () => void {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold },
  );

  const elements = animationClasses.flatMap((className) =>
    Array.from(document.querySelectorAll<HTMLElement>(className)),
  );

  elements.forEach((element) => observer.observe(element));

  return () => {
    elements.forEach((element) => observer.unobserve(element));
    observer.disconnect();
  };
}
