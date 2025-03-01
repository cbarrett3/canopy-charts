'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Palette, Smartphone, Waves, Code2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function DocsPage() {
  const t = useTranslations('Docs');
  const navT = useTranslations('navigation');
  const { locale } = useParams();

  return (
    <div className="min-h-screen">
      <section id="introduction" className="relative max-w-4xl mx-auto pt-6 px-4">
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
            {t('introduction.title')}
          </motion.h1>
          <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 blur-lg opacity-40 -z-10" />
        </div>

        <p className="text-sm text-muted-foreground/90 mb-8">
          {t('introduction.welcome')}
        </p>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h3 className="text-sm font-medium tracking-wide text-green-500/90">
                {t('introduction.philosophy.title')}
              </h3>
              <p className="text-sm text-muted-foreground/90">
                {t('introduction.philosophy.description')}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                key: 'ownership',
                title: t('introduction.features.ownership.title'),
                description: t('introduction.features.ownership.description'),
                icon: <Code2 className="h-3.5 w-3.5" />
              },
              {
                key: 'modern',
                title: t('introduction.features.modern.title'),
                description: t('introduction.features.modern.description'),
                icon: <Sparkles className="h-3.5 w-3.5" />
              },
              {
                key: 'flexible',
                title: t('introduction.features.flexible.title'),
                description: t('introduction.features.flexible.description'),
                icon: <Palette className="h-3.5 w-3.5" />
              },
              {
                key: 'responsive',
                title: t('introduction.features.responsive.title'),
                description: t('introduction.features.responsive.description'),
                icon: <Smartphone className="h-3.5 w-3.5" />
              },
              {
                key: 'typescript',
                title: t('introduction.features.typescript.title'),
                description: t('introduction.features.typescript.description'),
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
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-green-500/50 transition-all duration-500" />
                <div className="absolute -inset-px rounded-lg border border-transparent group-hover:border-green-500/30 transition-all duration-500" />
                <div className="absolute -inset-[2px] rounded-lg border border-transparent group-hover:border-green-500/20 blur-[1px] transition-all duration-500" />
                <div className="relative">
                  <h3 className="text-sm font-medium mb-1.5 flex items-center text-zinc-900 dark:text-zinc-100 group-hover:text-green-500/90 transition-colors duration-300">
                    <span className="mr-1.5 p-1 rounded-md border border-primary/30 text-primary group-hover:border-primary/50 transition-colors duration-300">
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

          <div className="grid gap-4">
            <div className="grid gap-1">
              <h3 className="text-sm pt-3 font-medium tracking-wide text-green-500/90">
                {t('introduction.philosophy.why.title')}
              </h3>
              <p className="text-sm text-muted-foreground/90">
                {t('introduction.philosophy.why.description')}
              </p>
              <ul className="mt-2 text-sm text-muted-foreground/90 space-y-2 list-disc list-inside">
                <li>{t('introduction.philosophy.why.benefits.control')}</li>
                <li>{t('introduction.philosophy.why.benefits.dependencies')}</li>
                <li>{t('introduction.philosophy.why.benefits.learning')}</li>
                <li>{t('introduction.philosophy.why.benefits.bundle')}</li>
                <li>{t('introduction.philosophy.why.benefits.future')}</li>
                <li>{t('introduction.philosophy.why.benefits.security')}</li>
              </ul>
            </div>
          </div>

          <div className="group relative rounded-lg border bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 dark:border-zinc-800 p-3 hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-green-500/50 transition-all duration-500" />
            <div className="absolute -inset-px rounded-lg border border-transparent group-hover:border-green-500/30 transition-all duration-500" />
            <div className="absolute -inset-[2px] rounded-lg border border-transparent group-hover:border-green-500/20 blur-[1px] transition-all duration-500" />
            <div className="relative flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1 text-zinc-900 dark:text-zinc-100 group-hover:text-green-500/90 transition-colors duration-300">{t('installation.title')}</h3>
                <p className="text-xs text-muted-foreground/80 mb-2">
                  {t('installation.description')}
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
