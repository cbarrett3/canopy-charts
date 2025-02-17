import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

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
    targetPath: string;
}

export class Dashboard {
    protected projectPath: string;
    private stats: DashboardStats;

    constructor(projectPath: string) {
        this.projectPath = projectPath;
        this.stats = {
            installedCharts: [],
            framework: '',
            typescript: false,
            bundleSize: '0kb',
            performance: {},
            devTools: {
                enabled: false,
                features: []
            },
            targetPath: ''
        };
    }

    async initialize(framework: string, isTypescript: boolean, installedCharts: string[] = [], targetPath: string = 'app/canopy') {
        this.stats.framework = framework;
        this.stats.typescript = isTypescript;
        this.stats.installedCharts = installedCharts;
        this.stats.bundleSize = this.calculateBundleSize(installedCharts);
        this.stats.targetPath = targetPath;

        // Create target directory structure
        const targetDir = path.join(this.projectPath, targetPath);
        const utilsDir = path.join(targetDir, 'utils');
        const hooksDir = path.join(targetDir, 'hooks');
        const typesDir = path.join(targetDir, 'types');
        fs.mkdirSync(targetDir, { recursive: true });
        fs.mkdirSync(utilsDir, { recursive: true });
        fs.mkdirSync(hooksDir, { recursive: true });
        fs.mkdirSync(typesDir, { recursive: true });

        // Copy utils (colors.ts)
        const sourceUtilsDir = path.join(__dirname, '..', '..', 'templates', '_components', 'charts', 'utils');
        await fs.copy(sourceUtilsDir, utilsDir);

        // Copy hooks
        const sourceHooksDir = path.join(__dirname, '..', '..', 'templates', '_components', 'charts', 'hooks');
        await fs.copy(sourceHooksDir, hooksDir);

        // Copy types
        const sourceTypesDir = path.join(__dirname, '..', '..', 'templates', '_components', 'charts', 'types');
        await fs.copy(sourceTypesDir, typesDir);

        // Copy chart components to utils
        const sourceComponentsDir = path.join(__dirname, '..', '..', 'templates', '_components', 'charts', 'components');
        const components = ['chart-axis', 'chart-grid', 'chart-tooltip', 'chart-lines'];
        for (const component of components) {
            const sourceFile = path.join(sourceComponentsDir, `${component}.tsx`);
            const targetFile = path.join(utilsDir, `${component}.tsx`);
            if (fs.existsSync(sourceFile)) {
                await fs.copy(sourceFile, targetFile);
            }
        }

        // Copy selected chart files and update their imports
        for (const chartName of installedCharts) {
            await this.addChart(chartName, { overwrite: true });
        }
    }

    addDevToolsInfo(devTools: DevTools) {
        this.stats.devTools = devTools;
    }

    calculateBundleSize(charts: string[]): string {
        // This is a placeholder calculation
        return `${charts.length * 5}kb`;
    }

    addPerformanceMetrics(metrics: Performance) {
        this.stats.performance = metrics;
    }

    async addChart(chartName: string, config: { overwrite?: boolean } & Record<string, any>) {
        if (!config.overwrite && this.stats.installedCharts.includes(chartName)) {
            throw new Error(`Chart '${chartName}' is already installed`);
        }

        const templateFile = path.join(__dirname, '..', '..', 'templates', '_components', 'charts', `d3-${chartName}.tsx`);
        const targetFile = path.join(this.projectPath, this.stats.targetPath, `d3-${chartName}.tsx`);

        if (!fs.existsSync(templateFile)) {
            throw new Error(`Chart template '${chartName}' not found at ${templateFile}`);
        }

        // Read the template file
        let content = await fs.readFile(templateFile, 'utf8');

        // Update imports to point to correct locations
        content = content
            // Fix utils/colors path
            .replace(
                /@\/app\/_components\/charts\/utils\/colors/g,
                './utils/colors'
            )
            // Fix types imports
            .replace(
                /from ['"]\.\/types['"]/g,
                'from \'./types/index\''
            )
            .replace(
                /from ['"]\.\/types\//g,
                'from \'./types/'
            )
            // Fix hooks imports
            .replace(
                /from ['"]\.\/hooks\/use-/g,
                'from \'./hooks/use-'
            )
            // Fix utils/use-* imports
            .replace(
                /from ['"]\.\/utils\/use-/g,
                'from \'./hooks/use-'
            )
            // Fix chart components imports
            .replace(
                /from ['"]\.\/components\/chart-([^'"]+)['"]/g,
                'from \'./utils/chart-$1\''
            )
            // Fix any remaining paths
            .replace(
                /from ['"]\.\/utils\//g,
                'from \'./utils/'
            )
            .replace(
                /from ['"]\.\/hooks\//g,
                'from \'./hooks/'
            );

        // Create target directory if it doesn't exist
        fs.mkdirSync(path.dirname(targetFile), { recursive: true });

        // Write the modified content
        await fs.writeFile(targetFile, content);

        // Add or update the chart in installedCharts
        if (!this.stats.installedCharts.includes(chartName)) {
            this.stats.installedCharts.push(chartName);
        }

        // Update bundle size
        this.stats.bundleSize = this.calculateBundleSize(this.stats.installedCharts);
    }

    display() {
        console.log('\n' + chalk.bold('Project Dashboard'));
        console.log('─'.repeat(50));

        // Framework
        console.log(chalk.cyan('Framework:'), this.stats.framework);
        console.log(chalk.cyan('TypeScript:'), this.stats.typescript ? '✓' : '✗');

        // Installed Charts
        console.log('\n' + chalk.bold('Installed Charts:'));
        if (this.stats.installedCharts.length === 0) {
            console.log(chalk.gray('No charts installed'));
        } else {
            this.stats.installedCharts.forEach(chart => {
                console.log(`  ${chalk.green('•')} ${chart}`);
            });
        }

        // Bundle Size
        console.log('\n' + chalk.bold('Bundle Size:'), this.stats.bundleSize);

        // Performance Metrics
        if (Object.keys(this.stats.performance).length > 0) {
            console.log('\n' + chalk.bold('Performance Metrics:'));
            if (this.stats.performance.renderTime) {
                console.log(chalk.cyan('Render Time:'), this.stats.performance.renderTime);
            }
            if (this.stats.performance.memoryUsage) {
                console.log(chalk.cyan('Memory Usage:'), this.stats.performance.memoryUsage);
            }
            if (this.stats.performance.fps) {
                console.log(chalk.cyan('FPS:'), this.stats.performance.fps);
            }
        }

        // DevTools
        if (this.stats.devTools.enabled) {
            console.log('\n' + chalk.bold('DevTools:'), '✓');
            if (this.stats.devTools.features.length > 0) {
                console.log(chalk.cyan('Enabled Features:'));
                this.stats.devTools.features.forEach(feature => {
                    console.log(`  ${chalk.green('•')} ${feature}`);
                });
            }
        }

        console.log('─'.repeat(50) + '\n');
    }
}
