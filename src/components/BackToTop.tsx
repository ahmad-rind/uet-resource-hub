import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{
        background: 'var(--neu-bg)',
        boxShadow: 'var(--neu-shadow-extruded)',
        color: 'var(--neu-accent)',
        willChange: 'transform, opacity',
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
