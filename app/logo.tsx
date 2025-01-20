import { motion } from "framer-motion";

export function Logo({ className = "" }: { className?: string }) {
   const pathVariants = {
      initial: {
         pathLength: 0,
         rotate: 0,
         opacity: 0
      },
      animate: {
         pathLength: [0, 1, 1],
         rotate: [0, 0, -180],
         opacity: 1,
         transition: {
            pathLength: {
               duration: 1.5,
               ease: "easeInOut",
               times: [0, 0.6, 1]
            },
            rotate: {
               duration: 1.5,
               ease: "easeInOut",
               times: [0, 0.6, 1]
            },
            opacity: {
               duration: 0.3,
               ease: "easeOut"
            }
         }
      }
   };

   const glowVariants = {
      initial: {
         opacity: 0,
         rotate: 0
      },
      animate: {
         opacity: [0, 0.5, 0.5],
         rotate: [0, 0, -180],
         transition: {
            opacity: {
               duration: 1.5,
               ease: "easeInOut",
               times: [0, 0.6, 1]
            },
            rotate: {
               duration: 1.5,
               ease: "easeInOut",
               times: [0, 0.6, 1]
            }
         }
      }
   };

   const gridVariants = {
      initial: { opacity: 0.1 },
      animate: {
         opacity: [0.1, 0.25, 0.1],
         transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const
         }
      }
   };

   return (
      <div className={`relative h-full w-full ${className}`}>
         <motion.svg
            viewBox="0 0 500 500"
            initial="initial"
            animate="animate"
            className="h-full w-full p-2"
            preserveAspectRatio="xMidYMid meet"
         >
            {/* Grid Background */}
            <pattern 
               id="grid" 
               width="30" 
               height="30" 
               patternUnits="userSpaceOnUse"
               patternTransform="rotate(0)"
            >
               <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(128, 128, 128, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
               />
            </pattern>

            <motion.rect
               width="500"
               height="500"
               fill="url(#grid)"
               variants={gridVariants}
            />

            <defs>
               <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#047857" }} />
                  <stop offset="100%" style={{ stopColor: "#10b981" }} />
               </linearGradient>

               <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feComposite in="blur" in2="SourceGraphic" operator="over" />
               </filter>

               <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" />
                  <feOffset dx="2" dy="2" />
                  <feComposite in2="SourceGraphic" operator="in" />
                  <feComposite in2="SourceGraphic" operator="over" />
               </filter>
            </defs>

            <g transform="translate(250, 250)">
               {/* Glow effect */}
               <motion.path
                  d="M -150 0 A 100 100 0 1 1 100 0 A 50 50 0 1 1 -100 0"
                  variants={glowVariants}
                  stroke="#10b981"
                  strokeWidth="48"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glow)"
                  opacity="0.5"
                  style={{ transformOrigin: "center" }}
               />

               {/* Main path */}
               <motion.path
                  d="M -150 0 A 100 100 0 1 1 100 0 A 50 50 0 1 1 -100 0"
                  variants={pathVariants}
                  stroke="url(#greenGradient)"
                  strokeWidth="45"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#shadow)"
                  style={{ transformOrigin: "center" }}
               />
            </g>
         </motion.svg>
      </div>
   );
}