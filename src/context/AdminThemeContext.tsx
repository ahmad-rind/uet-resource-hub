import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const LIGHT_S = {
  bg: '#d6dae8', fg: '#1a1d2e', muted: '#475569', accent: '#5B4FE9',
  extruded: '8px 8px 16px #b0b8cc, -8px -8px 16px #ffffff',
  extrudedHover: '12px 12px 20px #b0b8cc, -12px -12px 20px #ffffff',
  small: '5px 5px 10px #b0b8cc, -5px -5px 10px #ffffff',
  inset: 'inset 6px 6px 10px #b0b8cc, inset -6px -6px 10px #ffffff',
  insetDeep: 'inset 10px 10px 20px #b0b8cc, inset -10px -10px 20px #ffffff',
  smallInset: 'inset 3px 3px 6px #b0b8cc, inset -3px -3px 6px #ffffff',
  glass: 'rgba(255, 255, 255, 0.4)',
  glassHover: 'rgba(255, 255, 255, 0.6)',
  glassActive: 'rgba(255, 255, 255, 0.2)',
};

export const DARK_S = {
  bg: '#1e2130', fg: '#e2e8f0', muted: '#94a3b8', accent: '#7C71FF',
  extruded: '8px 8px 16px #141620, -8px -8px 16px #282b3e',
  extrudedHover: '12px 12px 20px #141620, -12px -12px 20px #282b3e',
  small: '5px 5px 10px #141620, -5px -5px 10px #282b3e',
  inset: 'inset 6px 6px 10px #141620, inset -6px -6px 10px #282b3e',
  insetDeep: 'inset 10px 10px 20px #141620, inset -10px -10px 20px #282b3e',
  smallInset: 'inset 3px 3px 6px #141620, inset -3px -3px 6px #282b3e',
  glass: 'rgba(0, 0, 0, 0.4)',
  glassHover: 'rgba(0, 0, 0, 0.6)',
  glassActive: 'rgba(0, 0, 0, 0.2)',
};

export type ThemeTokens = typeof LIGHT_S;

interface AdminThemeContextValue {
  isDark: boolean;
  S: ThemeTokens;
  toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('admin-theme');
      return stored === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-admin-theme', 'dark');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      root.setAttribute('data-admin-theme', 'light');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const S = isDark ? DARK_S : LIGHT_S;

  return (
    <AdminThemeContext.Provider value={{ isDark, S, toggleTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (context === undefined) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
}
