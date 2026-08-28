import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-neutral-200/70 shadow-soft p-6 dark:bg-neutral-900 dark:border-neutral-800 ${
        hover ? 'hover:shadow-medium transition-shadow duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
