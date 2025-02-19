"use client"

import React from 'react';
import { Spinner } from './spinner';
import { useThemeColor } from '../providers/theme-context';

const ChartSkeleton: React.FC = () => {
  const { themeColor } = useThemeColor();
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner style={{ color: themeColor }} className="w-8 h-8" />
    </div>
  );
};

export default ChartSkeleton;
