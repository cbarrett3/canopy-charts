"use client"

import React from 'react';
import { Spinner } from './spinner';

const ChartSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 h-8 text-emerald-500" />
    </div>
  );
};

export default ChartSkeleton;
