'use client';

import { useTranslations } from 'next-intl';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Docs');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2">
            <h3 className="font-medium mb-4">{t('navigation')}</h3>
            {/* Add your docs navigation here */}
          </nav>
        </aside>
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
