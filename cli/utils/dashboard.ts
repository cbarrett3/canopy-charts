import chalk from 'chalk';
import ora from 'ora';

interface Performance {
    renderTime?: string;
    memoryUsage?: string;
    fps?: number;
}

interface DevTools {
    enabled: boolean;
    features: string[];
}

interface DashboardStats {
    installedCharts: string[];
    framework: string;
    typescript: boolean;
    bundleSize: string;
    performance: Performance;
    devTools: DevTools;
}

class Dashboard {
    private stats: DashboardStats;

    constructor() {
        this.stats = {
            installedCharts: [],
            framework: '',
            typescript: false,
            bundleSize: '0kb',
            performance: {},
            devTools: {
                enabled: false,
                features: []
            }
        };
    }

    async initialize(framework: string, isTypescript: boolean, installedCharts: string[]): Promise<void> {
        this.stats.framework = framework;
        this.stats.typescript = isTypescript;
        this.stats.installedCharts = installedCharts;
        
        const spinner = ora('Analyzing bundle size').start();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.stats.bundleSize = this.calculateBundleSize(installedCharts);
        spinner.succeed();
    }

    addDevToolsInfo(devTools: DevTools): void {
        this.stats.devTools = devTools;
    }

    private calculateBundleSize(charts: string[]): string {
        // This is a simplified calculation. In a real implementation,
        // you would analyze actual bundle sizes.
        const baseSize = 50; // Base size in KB
        const sizePerChart = 15; // Size per chart in KB
        const totalSize = baseSize + (charts.length * sizePerChart);
        
        return totalSize > 1024 ? 
            `${(totalSize / 1024).toFixed(1)}MB` : 
            `${totalSize}KB`;
    }

    addPerformanceMetrics(metrics: Performance): void {
        this.stats.performance = {
            ...this.stats.performance,
            ...metrics
        };
    }

    display(): void {
        console.log('\n' + chalk.bold.blue('📊 Canopy Charts Dashboard'));
        console.log('━'.repeat(50));
        
        // Framework & TypeScript
        console.log(chalk.bold('🔧 Framework:'), this.stats.framework);
        console.log(chalk.bold('📝 TypeScript:'), this.stats.typescript ? '✅ Enabled' : '❌ Disabled');
        
        // Installed Charts
        console.log('\n' + chalk.bold('📈 Installed Charts:'));
        if (this.stats.installedCharts.length === 0) {
            console.log(chalk.gray('No charts installed'));
        } else {
            this.stats.installedCharts.forEach(chart => {
                console.log(`  ${chalk.green('•')} ${chart}`);
            });
        }
        
        // Bundle Size
        console.log('\n' + chalk.bold('📦 Bundle Size:'), this.stats.bundleSize);
        
        // Performance Metrics
        if (Object.keys(this.stats.performance).length > 0) {
            console.log('\n' + chalk.bold('⚡ Performance Metrics:'));
            if (this.stats.performance.renderTime) {
                console.log(`  ${chalk.green('•')} Render Time: ${this.stats.performance.renderTime}`);
            }
            if (this.stats.performance.memoryUsage) {
                console.log(`  ${chalk.green('•')} Memory Usage: ${this.stats.performance.memoryUsage}`);
            }
            if (this.stats.performance.fps) {
                console.log(`  ${chalk.green('•')} FPS: ${this.stats.performance.fps}`);
            }
        }
        
        // Dev Tools
        if (this.stats.devTools.enabled) {
            console.log('\n' + chalk.bold('🛠️  Dev Tools:'), 'Enabled');
            this.stats.devTools.features.forEach(feature => {
                console.log(`  ${chalk.green('•')} ${feature}`);
            });
        }
        
        console.log('━'.repeat(50) + '\n');
    }
}

export default Dashboard;
