/* ----------------------------------------
 * Shared tooltip component for all chart types. Provides consistent
 * styling and positioning across different visualizations.
 * ---------------------------------------- */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TooltipProps {
   x: number;
   y: number;
   visible: boolean;
   title?: string;
   items?: {
      label: string;
      value: string | number;
      color?: string;
   }[];
}

export const Tooltip: React.FC<TooltipProps> = ({
   x,
   y,
   visible,
   title,
   items = []
}) => {
   return (
      <AnimatePresence>
         {visible && (
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.15, ease: 'easeOut' }}
               className="absolute pointer-events-none z-50 min-w-[120px] max-w-[200px]"
               style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -100%)',
               }}
            >
               <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl px-3 py-2">
                  {title && (
                     <div className="text-gray-300 text-sm font-medium border-b border-gray-700/50 pb-1 mb-1">
                        {title}
                     </div>
                  )}
                  <div className="space-y-1">
                     {items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                           <div className="flex items-center gap-1.5">
                              {item.color && (
                                 <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                 />
                              )}
                              <span className="text-gray-400 text-sm">{item.label}:</span>
                           </div>
                           <span className="text-white text-sm font-medium">
                              {item.value}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}; 