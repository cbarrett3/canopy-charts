'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function DocsSlugPage() {
  const { slug } = useParams();
  const t = useTranslations('Docs');

  return (
    <div className="relative w-full py-8 space-y-8">
      {/* Header Section with Gradient Background */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-background dark:bg-[#1B1B1B]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent dark:from-[#1B1B1B] dark:via-[#1B1B1B] dark:to-[#1A1A1A] opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-primary mb-4 sm:text-5xl md:text-6xl">
                {/* This is a placeholder - we'll need to add proper translations for each route */}
                {slug}
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {/* This is a placeholder - we'll need to add proper translations for each route */}
                Coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}