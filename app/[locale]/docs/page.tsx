'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Palette, Smartphone, Waves, Code2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { MouseTrail } from "@/app/_components/effects/mouse-trail";
import { useParams } from 'next/navigation';

export default function DocsPage() {
  const t = useTranslations('Docs');
  const navT = useTranslations('navigation');
  const { locale } = useParams();

  return (
    <div className="min-h-screen">
      <MouseTrail />
      <section id="introduction" className="relative max-w-4xl mx-auto pt-16 px-4">
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
            {t('getting-started.introduction.title')}
          </motion.h1>
          <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 blur-lg opacity-40 -z-10" />
        </div>

        <p className="text-sm text-muted-foreground/90 mb-6">
          {t('getting-started.introduction.welcome')}
        </p>

        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                key: 'interactive',
                title: t('getting-started.introduction.features.interactive.title'),
                description: t('getting-started.introduction.features.interactive.description'),
                icon: <Sparkles className="h-3.5 w-3.5" />
              },
              {
                key: 'themes',
                title: t('getting-started.introduction.features.themes.title'),
                description: t('getting-started.introduction.features.themes.description'),
                icon: <Palette className="h-3.5 w-3.5" />
              },
              {
                key: 'responsive',
                title: t('getting-started.introduction.features.responsive.title'),
                description: t('getting-started.introduction.features.responsive.description'),
                icon: <Smartphone className="h-3.5 w-3.5" />
              },
              {
                key: 'animations',
                title: t('getting-started.introduction.features.animations.title'),
                description: t('getting-started.introduction.features.animations.description'),
                icon: <Waves className="h-3.5 w-3.5" />
              },
              {
                key: 'typescript',
                title: t('getting-started.introduction.features.typescript.title'),
                description: t('getting-started.introduction.features.typescript.description'),
                icon: <Code2 className="h-3.5 w-3.5" />
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="group relative rounded-lg border bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 dark:border-zinc-800 p-3 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
                <div className="relative">
                  <h3 className="text-sm font-medium mb-1.5 flex items-center text-zinc-900 dark:text-zinc-100 group-hover:text-green-500/90 transition-colors duration-300">
                    <span className="mr-1.5 p-1 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      {feature.icon}
                    </span>
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="group relative rounded-lg border bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 dark:border-zinc-800 p-3 hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
            <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
            <div className="relative flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1 text-zinc-900 dark:text-zinc-100 group-hover:text-green-500/90 transition-colors duration-300">{t('getting-started.installation.title')}</h3>
                <p className="text-xs text-muted-foreground/80 mb-2">
                  {t('getting-started.installation.description')}
                </p>
                <Link 
                  href={`/${locale}/docs/installation`}
                  className="group inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="relative">
                    {navT('getStarted')}
                    <span className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
