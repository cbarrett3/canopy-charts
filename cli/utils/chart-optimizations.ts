interface ChartOptimization {
    wrapper: string;
    imports: string[];
    optimizations: {
        lazyLoading: boolean;
        suspense: boolean;
        ssr: boolean;
    };
}

type Framework = 'next.js' | string;
type ChartType = 'lineChart' | string;

interface FrameworkChartOptimizations {
    [chartType: string]: ChartOptimization | undefined;
}

interface ChartOptimizations {
    [framework: Framework]: FrameworkChartOptimizations;
}

const CHART_OPTIMIZATIONS: ChartOptimizations = {
    'next.js': {
        lineChart: {
            wrapper: `'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from '../helpers/loading-spinner';

const D3LineChart = dynamic(() => import('./d3-line-chart'), {
    ssr: false,
    loading: () => <LoadingSpinner />
});

export function LineChart(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <D3LineChart {...props} />
        </Suspense>
    );
}`,
            imports: [
                'next/dynamic',
                'react'
            ],
            optimizations: {
                lazyLoading: true,
                suspense: true,
                ssr: false
            }
        }
    }
    // Add other frameworks as needed
};

interface ChartOptimizers {
    getChartWrapper: (framework: Framework, chartType: ChartType) => string | undefined;
    getChartImports: (framework: Framework, chartType: ChartType) => string[] | undefined;
    getChartOptimizations: (framework: Framework, chartType: ChartType) => Record<string, boolean> | undefined;
    enhanceChart: (framework: Framework, chartType: ChartType, code: string) => string;
    optimizeChart: (framework: Framework, chartType: ChartType, props: Record<string, any>) => Record<string, any>;
}

const chartOptimizers: ChartOptimizers = {
    getChartWrapper(framework: Framework, chartType: ChartType): string | undefined {
        return CHART_OPTIMIZATIONS[framework]?.[chartType]?.wrapper;
    },

    getChartImports(framework: Framework, chartType: ChartType): string[] | undefined {
        return CHART_OPTIMIZATIONS[framework]?.[chartType]?.imports;
    },

    getChartOptimizations(framework: Framework, chartType: ChartType): Record<string, boolean> | undefined {
        return CHART_OPTIMIZATIONS[framework]?.[chartType]?.optimizations;
    },

    enhanceChart(framework: Framework, chartType: ChartType, code: string): string {
        const wrapper = this.getChartWrapper(framework, chartType);
        if (wrapper) {
            return wrapper;
        }
        return code;
    },

    optimizeChart(framework: Framework, chartType: ChartType, props: Record<string, any>): Record<string, any> {
        const optimizations = this.getChartOptimizations(framework, chartType);
        if (!optimizations) {
            return props;
        }

        const enhancedProps = { ...props };
        
        if (optimizations.lazyLoading) {
            enhancedProps.lazy = true;
        }
        
        if (optimizations.suspense) {
            enhancedProps.suspense = true;
        }
        
        if (optimizations.ssr !== undefined) {
            enhancedProps.ssr = optimizations.ssr;
        }
        
        return enhancedProps;
    }
};

export { CHART_OPTIMIZATIONS, chartOptimizers };
