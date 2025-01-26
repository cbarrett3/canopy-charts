'use client';

import { useTranslations } from 'next-intl';

export default function DocsPage() {
  const t = useTranslations('Docs');

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="space-y-8">
        <section>
          <h2>{t('gettingStarted.title')}</h2>
          <p>{t('gettingStarted.description')}</p>
          {/* Add your documentation content here */}
        </section>
      </div>
    </div>
  );
}
