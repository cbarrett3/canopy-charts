import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { 
    SUPPORTED_VERSIONS, 
    getVersionWarning,
    getFrameworkFromDeps,
    getRequiredDependencies
} from './versions';

interface StylingSystem {
    name: string | null;
    version: string | null;
    isInstalled: boolean;
}

interface D3Dependencies {
    core: {
        name: string;
        version: string | null;
        isInstalled: boolean;
    };
    optional: {
        name: string;
        version: string | null;
        isInstalled: boolean;
    }[];
}

interface FrameworkDetectionResult {
    framework: string;
    isTypescript: boolean;
    defaultDir: string;
    dependencies: string[];
    stylingSystem: StylingSystem;
    d3Dependencies: D3Dependencies;
    versionWarnings?: string[];
}

interface Dependencies {
    [key: string]: string;
}

async function detectFramework(projectPath: string = process.cwd()): Promise<FrameworkDetectionResult> {
    const spinner = ora('Analyzing project structure').start();
    
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
        spinner.warn('No package.json found');
        return {
            framework: 'react',
            isTypescript: false,
            defaultDir: './src/components/charts',
            dependencies: ['react', 'd3'],
            stylingSystem: {
                name: null,
                version: null,
                isInstalled: false
            },
            d3Dependencies: {
                core: {
                    name: 'd3',
                    version: null,
                    isInstalled: false
                },
                optional: []
            }
        };
    }

    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const { dependencies = {}, devDependencies = {} } = packageJson;

        // Detect framework
        const framework = getFrameworkFromDeps(dependencies, devDependencies);
        
        // Check for TypeScript
        const isTypescript = 'typescript' in devDependencies || 'typescript' in dependencies;
        
        // Find suitable component directory
        const possibleDirs = [
            './src/components/charts',
            './components/charts',
            './app/components/charts',
            './src/app/components/charts'
        ];
        
        const existingDirs = findExistingDirs(projectPath, possibleDirs);
        let defaultDir = possibleDirs[0];
        
        if (existingDirs.length === 0) {
            const componentDirs = findComponentLikeDirs(projectPath);
            if (componentDirs.length > 0) {
                defaultDir = path.join(componentDirs[0], 'charts');
            }
        } else {
            defaultDir = existingDirs[0];
        }

        // Detect styling system
        const stylingSystem = detectStylingSystem(dependencies, devDependencies);
        
        // Detect D3 dependencies
        const d3Dependencies = detectD3Dependencies(dependencies, devDependencies);
        
        // Check versions and get warnings
        const versionWarnings = checkDependencyVersions(dependencies, devDependencies, framework);
        
        // Get required dependencies
        const requiredDeps = determineDependencies(isTypescript);

        spinner.succeed('Project analysis complete');
        
        return {
            framework,
            isTypescript,
            defaultDir,
            dependencies: requiredDeps,
            stylingSystem,
            d3Dependencies,
            ...(versionWarnings.length > 0 && { versionWarnings })
        };
    } catch (error) {
        spinner.fail('Error analyzing project structure');
        throw error;
    }
}

function findExistingDirs(projectPath: string, possibleDirs: string[]): string[] {
    return possibleDirs.filter(dir => 
        fs.existsSync(path.join(projectPath, dir))
    );
}

function findComponentLikeDirs(startPath: string): string[] {
    const componentDirs: string[] = [];
    const maxDepth = 4;

    function searchDir(currentPath: string, depth: number = 0) {
        if (depth >= maxDepth) return;

        try {
            const files = fs.readdirSync(currentPath);
            
            for (const file of files) {
                const filePath = path.join(currentPath, file);
                const stat = fs.statSync(filePath);
                
                if (stat.isDirectory()) {
                    if (/components?/i.test(file)) {
                        componentDirs.push(path.relative(startPath, filePath));
                    }
                    searchDir(filePath, depth + 1);
                }
            }
        } catch (error) {
            console.error(`Error reading directory: ${currentPath}`, error);
        }
    }

    searchDir(startPath);
    return componentDirs;
}

function detectStylingSystem(dependencies: Dependencies = {}, devDependencies: Dependencies = {}): StylingSystem {
    const allDeps = { ...dependencies, ...devDependencies };
    const stylingLibs = {
        'styled-components': null,
        '@emotion/react': null,
        '@emotion/styled': null,
        'tailwindcss': null
    };

    for (const lib in stylingLibs) {
        if (lib in allDeps) {
            return {
                name: lib,
                version: allDeps[lib],
                isInstalled: true
            };
        }
    }

    return {
        name: null,
        version: null,
        isInstalled: false
    };
}

function detectD3Dependencies(dependencies: Dependencies = {}, devDependencies: Dependencies = {}): D3Dependencies {
    const allDeps = { ...dependencies, ...devDependencies };
    
    return {
        core: {
            name: 'd3',
            version: allDeps['d3'] || null,
            isInstalled: 'd3' in allDeps
        },
        optional: [
            {
                name: '@types/d3',
                version: allDeps['@types/d3'] || null,
                isInstalled: '@types/d3' in allDeps
            }
        ]
    };
}

function checkDependencyVersions(
    dependencies: Dependencies = {}, 
    devDependencies: Dependencies = {}, 
    framework: string
): string[] {
    const warnings: string[] = [];
    const allDeps = { ...dependencies, ...devDependencies };
    
    for (const [dep, supportedVersion] of Object.entries(SUPPORTED_VERSIONS)) {
        if (dep in allDeps) {
            const warning = getVersionWarning(dep, allDeps[dep], supportedVersion);
            if (warning) {
                warnings.push(warning);
            }
        }
    }
    
    return warnings;
}

function determineDependencies(isTypescript: boolean): string[] {
    const deps = ['react', 'd3'];
    if (isTypescript) {
        deps.push('@types/react', '@types/d3');
    }
    return deps;
}

export {
    detectFramework,
    findExistingDirs,
    findComponentLikeDirs,
    detectStylingSystem,
    detectD3Dependencies,
    checkDependencyVersions,
    determineDependencies,
    type FrameworkDetectionResult,
    type StylingSystem,
    type D3Dependencies
};
