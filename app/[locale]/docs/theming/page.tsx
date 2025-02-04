'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import { Copy, Check, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const themes = [
  { name: 'Forest', color: '#22C55E', description: 'Fresh and natural green' },
  { name: 'Ocean', color: '#0EA5E9', description: 'Deep and calming blue' },
  { name: 'Sunset', color: '#F97316', description: 'Warm and energetic orange' },
  { name: 'Berry', color: '#D946EF', description: 'Vibrant and playful pink' }
];

export default function ThemingPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const t = useTranslations('Docs.features');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative max-w-4xl mx-auto py-6 px-4">
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
              backgroundImage: `linear-gradient(to right, ${activeTheme.color}, ${activeTheme.color}dd, ${activeTheme.color}bb, ${activeTheme.color}dd, ${activeTheme.color})`,
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
            Theming
          </motion.h1>
          <div 
            className="absolute -inset-x-2 -inset-y-2 blur-lg opacity-40 -z-10"
            style={{
              background: `linear-gradient(to right, ${activeTheme.color}20, ${activeTheme.color}10, ${activeTheme.color}20)`
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground/90 mb-6">
          Customize the look and feel of your charts with our powerful theming system. Start with a simple color theme and expand to full customization as needed.
        </p>

        <div className="space-y-6">
          {/* Theme Color Selection */}
          <Card className="relative overflow-hidden border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-900/20" />
            <div className="relative p-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="h-5 w-5" style={{ color: activeTheme.color }} />
                <h2 className="text-lg font-semibold">Theme Color</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => setActiveTheme(theme)}
                    className={cn(
                      "group relative rounded-md p-4 text-left transition-all duration-300",
                      "bg-zinc-800/50 hover:bg-zinc-800",
                      "border border-zinc-700/50",
                      activeTheme.name === theme.name && `ring-1 ring-offset-2 ring-offset-zinc-900 ring-[${theme.color}] border-[${theme.color}]`
                    )}
                    style={{ 
                      ...(activeTheme.name === theme.name && {
                        borderColor: theme.color,
                        ringColor: theme.color,
                      })
                    }}
                  >
                    <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${theme.color}15 0%, transparent 70%)`
                      }}
                    />
                    <div className="relative space-y-2">
                      <div 
                        className="w-full h-2 rounded"
                        style={{ background: theme.color }}
                      />
                      <div>
                        <div className="text-sm font-medium mb-1">{theme.name}</div>
                        <div className="text-xs text-zinc-400">{theme.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-md opacity-25"
                  style={{
                    background: `radial-gradient(circle at center, ${activeTheme.color}15 0%, transparent 70%)`
                  }}
                />
                <pre className="relative rounded-md bg-zinc-950 p-4 overflow-x-auto border border-zinc-800/50">
                  <button
                    onClick={() => handleCopy(`<BarChart
  data={data}
  themeColor="${activeTheme.color}"
/>`, 'basic')}
                    className="absolute right-2 top-2 p-2 rounded-md hover:bg-zinc-800/50 transition-colors"
                  >
                    {copied === 'basic' ? (
                      <Check className="h-4 w-4" style={{ color: activeTheme.color }} />
                    ) : (
                      <Copy className="h-4 w-4 text-zinc-400 hover:text-zinc-100" />
                    )}
                  </button>
                  <code className="text-sm text-zinc-100">
{`<BarChart
  data={data}
  themeColor="${activeTheme.color}"
/>`}
                  </code>
                </pre>
              </div>
            </div>
          </Card>

          {/* Coming Soon Features */}
          <Card className="relative overflow-hidden border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-900/20" />
            <div className="relative p-6">
              <h2 className="text-lg font-semibold mb-6">Coming Soon</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Color Palettes",
                    description: "Create and apply custom color palettes with complementary and analogous color schemes."
                  },
                  {
                    title: "Typography System",
                    description: "Control font families, sizes, weights, and line heights across all chart elements."
                  },
                  {
                    title: "Spacing & Layout",
                    description: "Fine-tune margins, paddings, and gaps between chart components."
                  },
                  {
                    title: "Animation Presets",
                    description: "Choose from a variety of animation styles for chart transitions and interactions."
                  }
                ].map((feature) => (
                  <div 
                    key={feature.title}
                    className="group relative rounded-md p-4 bg-zinc-800/50 border border-zinc-700/50 transition-colors hover:bg-zinc-800"
                  >
                    <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${activeTheme.color}15 0%, transparent 70%)`
                      }}
                    />
                    <div className="relative">
                      <h3 className="text-sm font-medium mb-2" style={{ color: activeTheme.color }}>{feature.title}</h3>
                      <p className="text-sm text-zinc-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
