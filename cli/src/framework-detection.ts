import fs from 'fs';
import path from 'path';

export type SupportedFramework = 'next.js' | 'react' | 'remix' | 'astro';

interface FrameworkSignature {
    files: string[];
    packageJson?: {
        dependencies?: string[];
        devDependencies?: string[];
    };
}

const FRAMEWORK_SIGNATURES: Record<SupportedFramework, FrameworkSignature> = {
    'next.js': {
        files: ['next.config.js', 'next.config.mjs'],
        packageJson: {
            dependencies: ['next'],
        },
    },
    'react': {
        files: [],  
        packageJson: {
            dependencies: ['react', 'react-dom'],
        },
    },
    'remix': {
        files: ['remix.config.js'],
        packageJson: {
            dependencies: ['@remix-run/react'],
        },
    },
    'astro': {
        files: ['astro.config.mjs', 'astro.config.js'],
        packageJson: {
            dependencies: ['astro'],
        },
    },
};

export async function detectFramework(projectPath: string): Promise<SupportedFramework | null> {
    try {
        // Read package.json
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return null;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const allDependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        };

        // Check each framework's signature
        for (const [framework, signature] of Object.entries(FRAMEWORK_SIGNATURES)) {
            // Check package.json dependencies
            if (signature.packageJson) {
                const hasAllDependencies = (signature.packageJson.dependencies || []).every(
                    dep => dep in allDependencies
                );
                if (hasAllDependencies) {
                    return framework as SupportedFramework;
                }
            }

            // Check for framework-specific files
            if (signature.files) {
                const hasFiles = signature.files.some(file =>
                    fs.existsSync(path.join(projectPath, file))
                );
                if (hasFiles) {
                    return framework as SupportedFramework;
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error detecting framework:', error);
        return null;
    }
}
