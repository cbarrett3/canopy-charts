import semver from 'semver';
import chalk from 'chalk';
import path from 'path';
import { promises as fs } from 'fs';

interface ValidationResults {
    isValid: boolean;
    framework: string | null;
    versions: Record<string, string>;
    missingDeps: string[];
    incompatibleDeps: string[];
}

interface Dependencies {
    [key: string]: string;
}

interface FrameworkRequirements {
    [key: string]: {
        required: string[];
        optional?: string[];
        version?: string;
    };
}

class FrameworkValidator {
    private projectPath: string;
    private errors: string[];
    private warnings: string[];

    constructor(projectPath: string) {
        this.projectPath = projectPath;
        this.errors = [];
        this.warnings = [];
    }

    // Validate package versions against requirements
    async validateDependencies(dependencies: Dependencies = {}, devDependencies: Dependencies = {}): Promise<ValidationResults> {
        const allDeps = { ...dependencies, ...devDependencies };
        const results: ValidationResults = {
            isValid: true,
            framework: null,
            versions: {},
            missingDeps: [],
            incompatibleDeps: []
        };

        // Detect framework first
        const framework = this.detectFramework(allDeps);
        if (!framework) {
            this.errors.push('No supported React framework detected');
            results.isValid = false;
            return results;
        }
        results.framework = framework;

        // Check framework-specific requirements
        const requirements = this.getFrameworkRequirements(framework);
        
        // Check required dependencies
        for (const dep of requirements.required) {
            if (!(dep in allDeps)) {
                results.missingDeps.push(dep);
                results.isValid = false;
                this.errors.push(`Missing required dependency: ${dep}`);
            } else {
                results.versions[dep] = allDeps[dep];
                
                // Version check if specified
                if (requirements.version && dep === framework) {
                    if (!semver.satisfies(semver.coerce(allDeps[dep]) || '', requirements.version)) {
                        results.incompatibleDeps.push(dep);
                        results.isValid = false;
                        this.errors.push(
                            `Incompatible ${dep} version. Required: ${requirements.version}, Found: ${allDeps[dep]}`
                        );
                    }
                }
            }
        }

        // Check optional dependencies
        if (requirements.optional) {
            for (const dep of requirements.optional) {
                if (dep in allDeps) {
                    results.versions[dep] = allDeps[dep];
                }
            }
        }

        return results;
    }

    // Validate project structure
    async validateStructure(framework: string): Promise<boolean> {
        try {
            const structureValid = await this.checkProjectStructure(framework);
            return structureValid;
        } catch (error) {
            this.errors.push(`Error validating project structure: ${error.message}`);
            return false;
        }
    }

    // Get all validation errors
    getErrors(): string[] {
        return this.errors;
    }

    // Get all validation warnings
    getWarnings(): string[] {
        return this.warnings;
    }

    // Clear all validation messages
    clearValidation(): void {
        this.errors = [];
        this.warnings = [];
    }

    private detectFramework(dependencies: Dependencies): string | null {
        const frameworks = ['next', '@remix-run/react', 'astro', 'expo', 'electron'];
        
        for (const framework of frameworks) {
            if (framework in dependencies) {
                return framework;
            }
        }
        
        return null;
    }

    private getFrameworkRequirements(framework: string): { required: string[], optional?: string[], version?: string } {
        const requirements: FrameworkRequirements = {
            'next': {
                required: ['next', 'react', 'react-dom'],
                optional: ['typescript', '@types/react', '@types/node'],
                version: '>=13.0.0'
            },
            '@remix-run/react': {
                required: ['@remix-run/react', 'react', 'react-dom'],
                optional: ['typescript', '@types/react'],
                version: '>=1.0.0'
            },
            'astro': {
                required: ['astro', '@astrojs/react'],
                optional: ['typescript', '@types/react'],
                version: '>=2.0.0'
            },
            'expo': {
                required: ['expo', 'react-native'],
                optional: ['typescript', '@types/react-native'],
                version: '>=48.0.0'
            },
            'electron': {
                required: ['electron', 'react', 'react-dom'],
                optional: ['typescript', '@types/react', '@types/node'],
                version: '>=22.0.0'
            }
        };

        return requirements[framework] || { required: [] };
    }

    private async checkProjectStructure(framework: string): Promise<boolean> {
        const requiredFiles = this.getRequiredFiles(framework);
        let isValid = true;

        for (const file of requiredFiles) {
            try {
                await fs.access(path.join(this.projectPath, file));
            } catch (error) {
                this.warnings.push(`Missing recommended file: ${file}`);
                isValid = false;
            }
        }

        return isValid;
    }

    private getRequiredFiles(framework: string): string[] {
        const commonFiles = ['package.json', 'tsconfig.json', '.gitignore'];
        
        const frameworkFiles: Record<string, string[]> = {
            'next': [...commonFiles, 'next.config.js'],
            '@remix-run/react': [...commonFiles, 'remix.config.js'],
            'astro': [...commonFiles, 'astro.config.mjs'],
            'expo': [...commonFiles, 'app.json', 'babel.config.js'],
            'electron': [...commonFiles, 'electron.js', 'preload.js']
        };

        return frameworkFiles[framework] || commonFiles;
    }
}

export default FrameworkValidator;
