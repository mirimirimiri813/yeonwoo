import React, { ReactNode } from 'react';

interface RetroCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  color?: 'pink' | 'blue' | 'gray';
}

export const RetroCard: React.FC<RetroCardProps> = ({ title, children, className = '', color = 'gray' }) => {
  const bgColors = {
    pink: 'bg-pink-100',
    blue: 'bg-cyan-100',
    gray: 'bg-gray-100',
  };

  const headerColors = {
    pink: 'bg-pink-500',
    blue: 'bg-cyan-600',
    gray: 'bg-gray-700',
  };

  return (
    <div className={`border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${bgColors[color]} ${className}`}>
      {title && (
        <div className={`${headerColors[color]} text-white px-2 py-1 border-b-2 border-black font-bold flex items-center justify-between`}>
          <span>{title}</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white border border-black hover:bg-gray-200 cursor-pointer"></div>
            <div className="w-3 h-3 bg-white border border-black hover:bg-gray-200 cursor-pointer"></div>
          </div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
