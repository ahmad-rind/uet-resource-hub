import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  yOffset?: number;
}

export const Reveal = ({ children, width = "100%", delay = 0.25 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <div
        className={isVisible ? 'reveal-visible' : 'reveal-hidden'}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  );
};
