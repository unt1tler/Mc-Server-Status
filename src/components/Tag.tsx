import React from 'react';

interface TagProps {
  text: string;
  variant?: 'primary' | 'secondary';
}

export function Tag({ text, variant = 'primary' }: TagProps) {
  const baseClasses = 'px-2 py-1 rounded text-sm font-medium';
  const variantClasses = {
    primary: 'bg-purple-500/20 text-purple-200',
    secondary: 'bg-blue-500/20 text-blue-200'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {text}
    </span>
  );
}