import { motion } from "framer-motion";

export function Logo() {
   const pathVariants = {
      initial: {
         pathLength: 0,
         opacity: 0
      },
      animate: {
         pathLength: 1,
         opacity: 1,
         transition: {
            pathLength: {
               duration: 2.5,
               ease: [0.42, 0, 0.58, 1],
               delay: 0
            },
            opacity: {
               duration: 0.8,
               ease: "easeOut"
            }
         }
      }
   };

   const glowVariants = {
      initial: {
         opacity: 0
      },
      animate: {
         opacity: [0, 0.5, 0],
         transition: {
            delay: 3,
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const
         }
      }
   };

   return (
      <div className="relative h-full w-full p-8">
         <motion.svg
            viewBox="0 0 500 500"
            initial="initial"
            animate="animate"
            className="h-full w-full"
         >
            {/* Grid Background */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
               <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="rgba(128, 128, 128, 0.1)"
                  strokeWidth="1"
               />
            </pattern>

            <rect
               width="400"
               height="400"
               fill="url(#grid)"
            />

            <defs>
               <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#047857" }} />
                  <stop offset="100%" style={{ stopColor: "#10b981" }} />
               </linearGradient>

               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="blur" in2="SourceGraphic" operator="over" />
               </filter>
            </defs>

            {/* Glow effect */}
            <motion.path
               d="M 200 150 A 80 80 0 1 0 200 250"
               variants={glowVariants}
               stroke="#10b981"
               strokeWidth="50"
               strokeLinecap="square"
               fill="none"
               filter="url(#glow)"
            />

            {/* Main path */}
            <motion.path
               d="M 200 150 A 80 80 0 1 0 200 250"
               variants={pathVariants}
               stroke="url(#greenGradient)"
               strokeWidth="40"
               strokeLinecap="square"
               fill="none"
            />
         </motion.svg>
      </div>
   );
}