'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DataPoint } from './types';

interface BarTooltipProps {
   data?: DataPoint;
   position: { x: number; y: number };
   visible: boolean;
   color?: string;
}

export const BarTooltip: React.FC<BarTooltipProps> = ({
   data,
   position,
   visible,
   color
}) => {
   // Only render if we have data and should be visible
   if (!visible || !data) return null;

   return createPortal(
      <AnimatePresence>
         {visible && (
            <motion.div
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.1 }}
               className="pointer-events-none fixed z-50"
               style={{
                  left: position.x + 4,
                  top: position.y - 4,
                  transform: 'translate(0, -100%)'
               }}
            >
               <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-background/95 dark:bg-[#1B1B1B]/95 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 shadow-lg">
                  <span className="text-muted-foreground text-sm font-medium">
                     {data.label}
                  </span>
                  <span className="text-foreground text-sm font-semibold">
                     {data.value}
                  </span>
               </div>
            </motion.div>
         )}
      </AnimatePresence>,
      document.body
   );
}; 