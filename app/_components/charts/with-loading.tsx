"use client"

import React, { useEffect, useState } from 'react';
import ChartSkeleton from '../ui/chart-skeleton';

type WithThemeColor = {
  themeColor?: string;
};

export function withLoading<P extends WithThemeColor>(
  WrappedComponent: React.ComponentType<P>,
  loadingDelay: number = 1000
) {
  return function WithLoadingComponent(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDelay);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <ChartSkeleton themeColor={props.themeColor} />;
    }

    return <WrappedComponent {...props} />;
  };
}
