import React from 'react';
import { Hash } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Categories</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
            selectedCategory === null
              ? 'bg-purple-500/30 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          All Servers
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-500/30 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            title={category.description}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}