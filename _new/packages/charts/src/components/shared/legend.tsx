'use client';

import React from 'react';

interface LegendProps {
   items: {
      label: string;
      value?: string | number;
      color: string;
   }[];
   position?: 'right' | 'left';
   className?: string;
}

export const Legend: React.FC<LegendProps> = ({
   items,
   position = 'right',
   className = ''
}) => {
   if (!items.length) return null;

   return (
      <div
         className={`flex flex-col gap-2 px-4 py-2 ${position === 'right' ? 'ml-4' : 'mr-4'} ${className}`}
         style={{ minWidth: '120px' }}
      >
         {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
               <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
               />
               <span className="text-sm text-foreground whitespace-nowrap">
                  {item.label}
               </span>
               {item.value !== undefined && (
                  <span className="text-sm font-medium ml-auto text-foreground">
                     {item.value}
                  </span>
               )}
            </div>
         ))}
      </div>
   );
}; 