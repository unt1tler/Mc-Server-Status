import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <Search 
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search servers..."
          className={`w-full pl-10 pr-4 py-2 ${theme.cardBg} backdrop-blur-sm rounded-lg border border-white/20 ${theme.textPrimary} placeholder:${theme.textSecondary} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-500`}
        />
      </div>
    </form>
  );
}