'use client';

import { ArrowRight, Copy, Check } from "lucide-react";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function InstallationPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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
        <div className="relative inline-block mb-8">
          <motion.h1 
            className="relative text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
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
            Installation
          </motion.h1>
          {/* Glow effect contained to text */}
          <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 blur-xl opacity-50 -z-10" />
        </div>

        <p className="text-lg text-muted-foreground mb-10">
          Get started with Canopy Charts by installing D3.js as your foundation.
        </p>
        
        <div className="space-y-6">
          <Tabs defaultValue="npm" className="relative w-full">
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 p-1 text-muted-foreground w-full sm:w-auto">
              <TabsTrigger
                value="npm"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-white/80 dark:hover:bg-zinc-800/80"
              >
                npm
              </TabsTrigger>
              <TabsTrigger
                value="pnpm"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-white/80 dark:hover:bg-zinc-800/80"
              >
                pnpm
              </TabsTrigger>
              <TabsTrigger
                value="yarn"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-white/80 dark:hover:bg-zinc-800/80"
              >
                yarn
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-card-foreground">
              <TabsContent value="npm" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-4">
                    <code className="text-sm">npm install d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("npm install d3 @types/d3", "npm")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {copied === "npm" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="pnpm" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-4">
                    <code className="text-sm">pnpm add d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("pnpm add d3 @types/d3", "pnpm")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {copied === "pnpm" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="yarn" className="p-4">
                <div className="relative">
                  <pre className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-4">
                    <code className="text-sm">yarn add d3 @types/d3</code>
                  </pre>
                  <button
                    onClick={() => handleCopy("yarn add d3 @types/d3", "yarn")}
                    className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {copied === "yarn" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="rounded-lg border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 p-4">
            <div className="flex items-start space-x-4">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1.5">Next Steps</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  After installing D3.js, explore our chart documentation to start creating beautiful visualizations.
                </p>
                <Link 
                  href="/docs/charts" 
                  className="group inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="relative">
                    View Charts Documentation
                    <span className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
