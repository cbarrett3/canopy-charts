'use client';

import { ArrowRight, Copy, Check } from "lucide-react";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

export default function InstallationPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const t = useTranslations('Docs.installation');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]" />
      </div>

      <div className={cn(
        "relative z-10",
        mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
      )}>
        <div className="relative inline-block mb-6">
          <motion.h1 
            className="relative text-2xl font-semibold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #22c55e, #4ade80, #86efac, #4ade80, #22c55e)",
              backgroundSize: "200% auto",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {t('title')}
          </motion.h1>
          <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 blur-lg opacity-40 -z-10" />
        </div>

        <p className="text-sm text-muted-foreground/90 mb-6">
          {t('intro')}
        </p>
        
        <div className="space-y-6">
          <Tabs defaultValue="npm" className="relative w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 p-1 text-muted-foreground w-full sm:w-auto">
              <TabsTrigger
                value="npm"
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                <span className="relative">{t('tabs.npm')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="pnpm"
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                <span className="relative">{t('tabs.pnpm')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="yarn"
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                <span className="relative">{t('tabs.yarn')}</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 rounded-lg border bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 dark:border-zinc-800 text-card-foreground">
              <TabsContent value="npm" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100/50 dark:bg-zinc-800/30 p-4">
                    <code className="text-sm">npm install d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("npm install d3 @types/d3", "npm")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    {copied === "npm" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="pnpm" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100/50 dark:bg-zinc-800/30 p-4">
                    <code className="text-sm">pnpm add d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("pnpm add d3 @types/d3", "pnpm")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    {copied === "pnpm" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="yarn" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100/50 dark:bg-zinc-800/30 p-4">
                    <code className="text-sm">yarn add d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("yarn add d3 @types/d3", "yarn")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    {copied === "yarn" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </TabsContent>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-lg border bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 dark:border-zinc-800 p-4 mt-4"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
              <div className="relative space-y-4">
                <h3 className="text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">{t('next.title')}</h3>
                <Link 
                  href="/docs/visualizations" 
                  className="group/link flex items-center text-sm text-muted-foreground/90 hover:text-green-500/90 transition-colors"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {t('next.link')}
                </Link>
              </div>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
