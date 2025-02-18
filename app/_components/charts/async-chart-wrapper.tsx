"use client"

import React, { Suspense } from 'react';
import ChartSkeleton from '../ui/chart-skeleton';

// This is a wrapper that creates an artificial delay to demonstrate loading
const DelayedChart = ({ children }: { children: React.ReactNode }) => {
  // This creates a promise that resolves after a delay
  if (typeof window !== 'undefined') {
    const delay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
    throw new Promise(resolve => setTimeout(resolve, delay));
  }
  return children;
};

// Wrapper component that adds Suspense boundary and loading state
export const AsyncChart = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <DelayedChart>
        {children}
      </DelayedChart>
    </Suspense>
  );
};
