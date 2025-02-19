'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'typescript', className }: CodeBlockProps) {
  return (
    <pre className={cn(
      "relative p-4 bg-zinc-950 text-zinc-50 rounded-lg overflow-x-auto",
      className
    )}>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
