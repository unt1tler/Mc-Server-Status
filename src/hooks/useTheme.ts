import { useState, useEffect } from 'react';
import { themes } from '../lib/themes';
import type { Theme } from '../lib/types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return themes.find(t => t.id === saved) || themes[0];
  });

  useEffect(() => {
    localStorage.setItem('theme', theme.id);
  }, [theme]);

  const changeTheme = (themeId: string) => {
    const newTheme = themes.find(t => t.id === themeId);
    if (newTheme) setTheme(newTheme);
  };

  return { theme, changeTheme, themes };
}