import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    let initialDark = false;
    
    if (saved) {
      initialDark = saved === 'dark';
    } else {
      initialDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    setIsDark(initialDark);
    applyTheme(initialDark);
    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (mounted) {
      applyTheme(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, mounted]);

  const applyTheme = (dark) => {
    const html = document.documentElement;
    const body = document.body;
    
    if (dark) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
  };

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
