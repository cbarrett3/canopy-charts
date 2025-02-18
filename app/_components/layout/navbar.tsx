"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/_components/ui/logo"
import { ThemeToggle } from "@/app/_components/ui/theme-toggle"
import LanguageSelector from "@/app/_components/ui/language-selector"
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import { useSidebar } from "../layout/sidebar-context"
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'
import { motion } from "framer-motion"

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname.includes(href)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        href={href} 
        className={cn(
          "relative text-sm font-medium transition-colors group",
          isActive 
            ? "text-green-500" 
            : "text-muted-foreground hover:text-green-500"
        )}
      >
        <div className={cn(
          "absolute inset-0 rounded-md -z-10 transition-all duration-300 blur-sm",
          isActive 
            ? "bg-green-500/10" 
            : "bg-green-500/0 group-hover:bg-green-500/10"
        )} />
        {children}
      </Link>
    </motion.div>
  )
}

export function Navbar() {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const { isExpanded } = useSidebar()
  const isDocsPage = pathname.includes('/docs')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
  
  return (
    <div className={cn(
      "fixed top-4 z-40",
      "transition-all duration-300",
      isDocsPage && "md:block hidden",
      isDocsPage 
        ? isExpanded 
          ? "left-[calc(18rem+1rem)] right-4 w-[calc(100%-19rem-1rem)]" 
          : "left-[calc(4rem+1rem)] right-4 w-[calc(100%-5rem-1rem)]"
        : "left-4 right-4"
    )}>
      <div className={cn(!isDocsPage && "max-w-7xl mx-auto")}>
        <motion.nav 
          className={cn(
            "relative flex items-center justify-between",
            "px-4 py-3",
            "bg-white/[0.03] dark:bg-white/[0.02]",
            "backdrop-blur-[8px] backdrop-saturate-[140%]",
            "border border-[#00ff9d] dark:border-[#00ff9d]/50",
            "rounded-xl",
            "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
            "dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
            "transition-all duration-300 group/nav",
            "hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(255,255,255,0.25)]",
            "dark:hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.4),0_6px_12px_-4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.07)]",
            "hover:bg-white/[0.06] dark:hover:bg-white/[0.04]"
          )}
          whileHover={{ 
            y: 2,
            scale: 1.005
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <div className="absolute inset-[-1px] rounded-xl border border-[#00ff9d]/0 dark:border-[#00ff9d]/0 transition-all duration-300 group-hover/nav:border-[#00ff9d]/50 dark:group-hover/nav:border-[#00ff9d]/25 blur-sm" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00ff9d]/0 to-[#00ff9d]/0 group-hover/nav:from-[#00ff9d]/5 group-hover/nav:to-transparent transition-all duration-300" />
          <motion.div 
            className="relative flex items-center gap-4 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Link href="/" className="flex items-center gap-3 mr-8 group relative">
                <div className="absolute inset-[-4px] rounded-xl bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
                <div className="h-10 w-10 relative">
                  <Logo className="absolute inset-0" />
                </div>
                <span className="hidden md:inline text-xl font-semibold tracking-tight text-foreground font-sans transition-all duration-300 group-hover:text-green-500">
                  Canopy Charts
                </span>
              </Link>
            </motion.div>

            <motion.div 
              className="hidden md:flex items-center gap-8 font-sans"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <NavLink href="/docs">{t('docs')}</NavLink>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex items-center gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="relative hover:bg-transparent group"
                >
                  <Link href="https://github.com/cbarrett3/canopy-charts">
                    <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
                    <Github className="h-5 w-5 transition-colors duration-300 group-hover:text-green-500" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ThemeToggle />
              </motion.div>
              <motion.div variants={itemVariants}>
                <LanguageSelector />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.nav>
      </div>
    </div>
  )
}
