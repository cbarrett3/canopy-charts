import { vol } from 'memfs';

export interface MockProjectConfig {
    framework: 'next.js' | 'remix' | 'astro' | 'expo' | 'electron';
    typescript?: boolean;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    files?: Record<string, string>;
}

export function createMockProject(config: MockProjectConfig) {
    const {
        framework,
        typescript = true,
        dependencies = {},
        devDependencies = {},
        files = {}
    } = config;

    const root = `/mock/${framework}-project`;
    const fileSystem: Record<string, string> = {
        [`${root}/package.json`]: JSON.stringify({
            name: `${framework}-test-project`,
            version: '1.0.0',
            dependencies: {
                ...dependencies
            },
            devDependencies: {
                ...devDependencies,
                ...(typescript ? { typescript: '^5.0.0' } : {})
            }
        }, null, 2),
        ...(typescript ? {
            [`${root}/tsconfig.json`]: JSON.stringify({
                compilerOptions: {
                    target: 'es5',
                    lib: ['dom', 'dom.iterable', 'esnext'],
                    allowJs: true,
                    skipLibCheck: true,
                    strict: true,
                    forceConsistentCasingInFileNames: true,
                    noEmit: true,
                    esModuleInterop: true,
                    module: 'esnext',
                    moduleResolution: 'node',
                    resolveJsonModule: true,
                    isolatedModules: true,
                    jsx: 'preserve',
                    incremental: true
                },
                include: ['**/*.ts', '**/*.tsx'],
                exclude: ['node_modules']
            }, null, 2)
        } : {}),
    };

    // Add custom files
    Object.entries(files).forEach(([path, content]) => {
        fileSystem[`${root}${path.startsWith('/') ? path : `/${path}`}`] = content;
    });

    // Set up the mock file system
    vol.fromJSON(fileSystem, root);

    return { root, fileSystem };
}

export function cleanupMockProject() {
    vol.reset();
}
