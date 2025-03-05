/* ----------------------------------------
 * Shared tooltip component for all chart types. Provides consistent
 * styling and positioning across different visualizations.
 * ---------------------------------------- */

import React from 'react';

export interface TooltipProps {
   x: number;
   y: number;
   content: React.ReactNode;
   visible: boolean;
   className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ x, y, content, visible, className = '' }) => {
   if (!visible) return null;

   return (
      <div
         className={`pointer-events-none absolute z-50 ${className}`}
         style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -100%)',
         }}
      >
         <div
            className="
               animate-in fade-in zoom-in-95 
               duration-200 ease-out
               rounded-lg bg-gray-900/95 
               px-3 py-2 
               text-sm font-medium text-white 
               shadow-lg shadow-black/10
               backdrop-blur-sm
               border border-white/10
            "
         >
            {content}
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 overflow-hidden">
               <div
                  className="
                     h-0 w-0 
                     border-l-[6px] border-r-[6px] border-t-[6px] 
                     border-transparent border-t-gray-900/95
                     shadow-lg
                  "
               />
            </div>
         </div>
      </div>
   );
}; 