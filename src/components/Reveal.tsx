import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  yOffset?: number;
}

export function Reveal({ children, width = "100%", delay = 0.05, yOffset = 10 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          delay: delay,
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
