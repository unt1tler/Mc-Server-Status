import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function ThemeSelector() {
  const { theme, changeTheme, themes } = useTheme();

  return (
    <div className="relative group">
      <button
        className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${theme.textPrimary}`}
        title="Change theme"
      >
        <Palette size={20} />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => changeTheme(t.id)}
            className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
              theme.textPrimary
            } ${theme.id === t.id ? 'bg-white/5' : ''}`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}