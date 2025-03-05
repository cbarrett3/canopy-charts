import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
   children: ReactNode;
   fallback?: ReactNode;
}

interface State {
   hasError: boolean;
   error?: Error;
}

export class ChartErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false
   };

   public static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
   }

   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error('Chart Error:', error);
      console.error('Error Info:', errorInfo);
   }

   public render() {
      if (this.state.hasError) {
         return this.props.fallback || (
            <div className="flex items-center justify-center w-full h-full min-h-[200px] text-red-500 bg-red-50 rounded-lg">
               <div className="text-center p-4">
                  <h3 className="font-semibold mb-2">Chart Error</h3>
                  <p className="text-sm opacity-75">{this.state.error?.message || 'An error occurred while rendering the chart.'}</p>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
} 