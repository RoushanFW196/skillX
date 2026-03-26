import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-soft p-6 ${
        hover ? 'hover:shadow-medium transition-shadow duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
