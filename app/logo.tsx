"use client"

import { motion } from "framer-motion"

const pathVariants = {
   initial: {
      pathLength: 0,
      rotate: 0,
      opacity: 0,
   },
   animate: {
      pathLength: [0, 1, 1],
      rotate: [0, 0, -180],
      opacity: 1,
      transition: {
         pathLength: {
            duration: 1.5,
            ease: "easeInOut",
         },
         rotate: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.5,
         },
         opacity: {
            duration: 0.01,
         },
      },
   },
}

const glowVariants = {
   initial: {
      opacity: 0,
      rotate: 0,
   },
   animate: {
      opacity: [0, 0.5, 0.5],
      rotate: [0, 0, -180],
      transition: {
         opacity: {
            duration: 1.5,
            ease: "easeInOut",
         },
         rotate: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.5,
         },
      },
   },
}

const gridVariants = {
   initial: {
      opacity: 0,
   },
   animate: {
      opacity: 1,
      transition: {
         duration: 1,
         ease: "easeOut",
      },
   },
}

export function Logo({ className }: { className?: string }) {
   return (
      <div className={`relative h-full w-full ${className}`}>
         <motion.svg
            viewBox="0 0 500 500"
            initial="initial"
            animate="animate"
            className="h-full w-full p-2"
            preserveAspectRatio="xMidYMid meet"
         >
            {/* Radial fade mask */}
            <defs>
               <radialGradient id="fade-mask" cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
               </radialGradient>
               <mask id="fade">
                  <circle cx="250" cy="250" r="250" fill="url(#fade-mask)" />
               </mask>
            </defs>

            {/* Grid Background */}
            <g mask="url(#fade)">
               <motion.g variants={gridVariants}>
                  {/* Horizontal lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                     <motion.line
                        key={`h-${i}`}
                        x1="0"
                        y1={25 * i}
                        x2="500"
                        y2={25 * i}
                        stroke="currentColor"
                        className="text-muted-foreground/70 dark:text-muted-foreground/90"
                        strokeWidth="1"
                     />
                  ))}
                  {/* Vertical lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                     <motion.line
                        key={`v-${i}`}
                        x1={25 * i}
                        y1="0"
                        x2={25 * i}
                        y2="500"
                        stroke="currentColor"
                        className="text-muted-foreground/70 dark:text-muted-foreground/90"
                        strokeWidth="1"
                     />
                  ))}
                  
                  {/* Animated data points */}
                  {Array.from({ length: 10 }).map((_, i) => (
                     <motion.circle
                        key={`point-${i}`}
                        cx={50 + i * 40}
                        cy={250 + Math.sin(i * 0.5) * 50}
                        r="3"
                        fill="#22c55e"
                        initial={{ opacity: 0 }}
                        animate={{
                           opacity: [0, 1, 0],
                           scale: [0, 1, 0],
                        }}
                        transition={{
                           duration: 2,
                           repeat: Infinity,
                           delay: i * 0.2,
                        }}
                     />
                  ))}
               </motion.g>
            </g>

            <defs>
               <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feColorMatrix
                     in="blur"
                     type="matrix"
                     values="0 0 0 0 0.133333 0 0 0 0 0.772549 0 0 0 0 0.372549 0 0 0 1 0"
                  />
               </filter>
               <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#22c55e" />
               </filter>
               <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
               </linearGradient>
            </defs>

            {/* Logo Group - centered */}
            <g transform="translate(250, 250)">
               {/* Glow effect */}
               <motion.path
                  d="M -150 0 A 100 100 0 1 1 100 0 A 50 50 0 1 1 -100 0"
                  variants={glowVariants}
                  stroke="#10b981"
                  strokeWidth="35"
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
                  strokeWidth="32"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#shadow)"
                  style={{ transformOrigin: "center" }}
               />
            </g>
         </motion.svg>
      </div>
   )
}