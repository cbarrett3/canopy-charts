"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Point {
   x: number
   y: number
   alpha: number
}

export function MouseTrail() {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const points = useRef<Point[]>([])
   const mousePos = useRef<{ x: number; y: number; disabled: boolean }>({ x: 0, y: 0, disabled: false })
   const animationFrameId = useRef<number>()
   const { theme, systemTheme } = useTheme()

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const updateCanvasSize = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
      }
      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)

      const draw = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height)
         
         // Only add new point if not disabled
         if (!mousePos.current.disabled) {
            points.current.push({
               x: mousePos.current.x,
               y: mousePos.current.y,
               alpha: 0.4
            })
         }

         // Update and draw points
         points.current = points.current
            .map(point => ({
               ...point,
               alpha: point.alpha * 0.92
            }))
            .filter(point => point.alpha > 0.01)

         points.current.forEach(point => {
            ctx.beginPath()
            const gradient = ctx.createRadialGradient(
               point.x, point.y, 0,
               point.x, point.y, 15
            )
            const isDarkMode = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
            const alpha = isDarkMode ? point.alpha : point.alpha * 6
            const color = isDarkMode ? '34, 197, 94' : '0, 63, 31'
            gradient.addColorStop(0, `rgba(${color}, ${alpha})`)
            gradient.addColorStop(1, `rgba(${color}, 0)`)
            ctx.fillStyle = gradient
            ctx.arc(point.x, point.y, 15, 0, Math.PI * 2)
            ctx.fill()
         })

         animationFrameId.current = requestAnimationFrame(draw)
      }

      const isInteractiveElement = (element: Element): boolean => {
         // Check if element is part of the logo
         const isPartOfLogo = (el: Element | null): boolean => {
            while (el) {
               // Check for Logo component wrapper in hero
               if (el.className && typeof el.className === 'string' && (
                  el.className.includes('relative aspect-square w-[200px]') || // Hero logo container
                  el.className.includes('relative mb-0 flex w-full items-end justify-center') // Hero logo outer container
               )) {
                  return true
               }
               el = el.parentElement
            }
            return false
         }

         // Always allow the logo
         if (isPartOfLogo(element)) {
            return false
         }

         // Check for interactive elements, excluding logo containers
         if (element.matches('button, a, [role="button"], input, select, textarea')) {
            // Allow if it's part of the logo
            if (isPartOfLogo(element)) {
               return false
            }
            return true
         }
         
         // Check for chart-related classes
         if (element.className && typeof element.className === 'string' && 
            (element.className.includes('chart') || 
             element.className.includes('donut') || 
             element.className.includes('bar') ||
             element.className.includes('line') ||
             element.className.includes('tree'))) {
            return true
         }
             
         // Check for SVG elements (but allow logo SVG)
         if (element instanceof SVGElement) {
            return !isPartOfLogo(element)
         }
         
         // Check parent elements
         let parent = element.parentElement
         while (parent) {
            if (isPartOfLogo(parent)) {
               return false
            }
            if (parent.matches('button, a, [role="button"], input, select, textarea') && !isPartOfLogo(parent)) {
               return true
            }
            if (parent.className && typeof parent.className === 'string' && 
               (parent.className.includes('chart') || 
                parent.className.includes('donut') || 
                parent.className.includes('bar') ||
                parent.className.includes('line') ||
                parent.className.includes('tree'))) {
               return true
            }
            if (parent instanceof SVGElement && !isPartOfLogo(parent)) {
               return true
            }
            parent = parent.parentElement
         }
         
         return false
      }

      const handleMouseMove = (e: MouseEvent) => {
         const target = e.target as Element
         mousePos.current = { 
            x: e.clientX, 
            y: e.clientY,
            disabled: isInteractiveElement(target)
         }
      }

      window.addEventListener('mousemove', handleMouseMove)
      animationFrameId.current = requestAnimationFrame(draw)

      return () => {
         window.removeEventListener('resize', updateCanvasSize)
         window.removeEventListener('mousemove', handleMouseMove)
         if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current)
         }
      }
   }, [])

   return (
      <canvas
         ref={canvasRef}
         className="fixed inset-0 pointer-events-none z-[100]"
         style={{ mixBlendMode: 'normal' }}
      />
   )
}
