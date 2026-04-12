import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (buttonRef?: React.RefObject<HTMLButtonElement | null>) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => { },
});

export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = 'uet_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch { /* noop */ }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* noop */ }
  }, [theme]);

  const toggleTheme = useCallback((buttonRef?: React.RefObject<HTMLButtonElement | null>) => {
    const root = document.documentElement;

    // Check if View Transition API is supported
    if (
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const el = buttonRef?.current;
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
        });
      });

      transition.ready.then(() => {
        // Calculate circle center from button position, or fallback to screen center
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;

        if (el) {
          const rect = el.getBoundingClientRect();
          centerX = rect.left + rect.width / 2;
          centerY = rect.top + rect.height / 2;
        }

        const maxDistance = Math.hypot(
          Math.max(centerX, window.innerWidth - centerX),
          Math.max(centerY, window.innerHeight - centerY)
        );

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${centerX}px ${centerY}px)`,
              `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }).catch(() => {
        // Fallback: animation failed silently
      });
    } else {
      // Fallback for browsers without View Transition API
      root.classList.add('theme-transitioning');
      requestAnimationFrame(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      });
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 300);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
