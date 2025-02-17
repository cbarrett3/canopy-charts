import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface StylingSetup {
    setup: (projectPath: string) => Promise<void>;
}

interface FrameworkTemplate {
    wrapper: (content: string) => string;
    imports: string;
    styling: {
        tailwind?: StylingSetup;
        nativewind?: StylingSetup;
    };
}

interface FrameworkTemplates {
    [key: string]: FrameworkTemplate;
}

interface TestingConfig {
    setup: (projectPath: string) => Promise<void>;
    dependencies: {
        dev: string[];
        prod?: string[];
    };
}

interface FrameworkTesting {
    [key: string]: TestingConfig;
}

// Framework-specific code templates
const FRAMEWORK_TEMPLATES: FrameworkTemplates = {
    'next.js': {
        wrapper: (content: string) => `'use client';
${content}`,
        imports: `import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';`,
        styling: {
            tailwind: {
                setup: async (projectPath: string) => {
                    const configPath = path.join(projectPath, 'tailwind.config.js');
                    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                canopy: {
                    primary: '#34D399',
                    secondary: '#3B82F6',
                    accent: '#8B5CF6',
                }
            }
        }
    },
    plugins: [],
};`;
                    await fs.promises.writeFile(configPath, config);
                }
            }
        }
    },
    'remix': {
        wrapper: (content: string) => content,
        imports: `import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useHydrated } from 'remix-utils';`,
        styling: {
            tailwind: {
                setup: async (projectPath: string) => {
                    const configPath = path.join(projectPath, 'tailwind.config.js');
                    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                canopy: {
                    primary: '#34D399',
                    secondary: '#3B82F6',
                    accent: '#8B5CF6',
                }
            }
        }
    },
    plugins: [],
};`;
                    await fs.promises.writeFile(configPath, config);
                }
            }
        }
    },
    'astro': {
        wrapper: (content: string) => content,
        imports: `import { useEffect, useRef } from 'react';
import * as d3 from 'd3';`,
        styling: {
            tailwind: {
                setup: async (projectPath: string) => {
                    const configPath = path.join(projectPath, 'tailwind.config.cjs');
                    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            colors: {
                canopy: {
                    primary: '#34D399',
                    secondary: '#3B82F6',
                    accent: '#8B5CF6',
                }
            }
        }
    },
    plugins: [],
};`;
                    await fs.promises.writeFile(configPath, config);
                }
            }
        }
    },
    'expo': {
        wrapper: (content: string) => content,
        imports: `import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { View } from 'react-native';`,
        styling: {
            nativewind: {
                setup: async (projectPath: string) => {
                    const configPath = path.join(projectPath, 'tailwind.config.js');
                    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                canopy: {
                    primary: '#34D399',
                    secondary: '#3B82F6',
                    accent: '#8B5CF6',
                }
            }
        }
    },
    plugins: [],
};`;
                    await fs.promises.writeFile(configPath, config);

                    // Update babel.config.js
                    const babelConfigPath = path.join(projectPath, 'babel.config.js');
                    const babelConfig = `module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: ["nativewind/babel"],
    };
};`;
                    await fs.promises.writeFile(babelConfigPath, babelConfig);
                }
            }
        }
    },
    'electron': {
        wrapper: (content: string) => content,
        imports: `import { useEffect, useRef } from 'react';
import * as d3 from 'd3';`,
        styling: {
            tailwind: {
                setup: async (projectPath: string) => {
                    const configPath = path.join(projectPath, 'tailwind.config.js');
                    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                canopy: {
                    primary: '#34D399',
                    secondary: '#3B82F6',
                    accent: '#8B5CF6',
                }
            }
        }
    },
    plugins: [],
};`;
                    await fs.promises.writeFile(configPath, config);
                }
            }
        }
    }
};

// Framework-specific testing setup
const FRAMEWORK_TESTING: FrameworkTesting = {
    'next.js': {
        setup: async (projectPath: string) => {
            const jestConfigPath = path.join(projectPath, 'jest.config.js');
            const config = `const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);`;
            await fs.promises.writeFile(jestConfigPath, config);

            const setupPath = path.join(projectPath, 'jest.setup.js');
            await fs.promises.writeFile(setupPath, `import '@testing-library/jest-dom';`);
        },
        dependencies: {
            dev: [
                '@testing-library/react',
                '@testing-library/jest-dom',
                'jest',
                'jest-environment-jsdom'
            ]
        }
    },
    'remix': {
        setup: async (projectPath: string) => {
            const vitestConfigPath = path.join(projectPath, 'vitest.config.ts');
            const config = `/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup-test-env.ts'],
        include: ['./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        watchExclude: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*'],
    },
});`;
            await fs.promises.writeFile(vitestConfigPath, config);

            const setupPath = path.join(projectPath, 'test/setup-test-env.ts');
            await fs.promises.mkdir(path.dirname(setupPath), { recursive: true });
            await fs.promises.writeFile(setupPath, `import '@testing-library/jest-dom/vitest';`);
        },
        dependencies: {
            dev: [
                '@testing-library/react',
                '@testing-library/jest-dom',
                'vitest',
                'happy-dom',
                '@vitejs/plugin-react',
                'vite-tsconfig-paths'
            ]
        }
    },
    'astro': {
        setup: async (projectPath: string) => {
            const vitestConfigPath = path.join(projectPath, 'vitest.config.ts');
            const config = `/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup.ts'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});`;
            await fs.promises.writeFile(vitestConfigPath, config);

            const setupPath = path.join(projectPath, 'test/setup.ts');
            await fs.promises.mkdir(path.dirname(setupPath), { recursive: true });
            await fs.promises.writeFile(setupPath, `import '@testing-library/jest-dom/vitest';`);

            // Add test script to package.json
            const packageJsonPath = path.join(projectPath, 'package.json');
            const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));
            packageJson.scripts = {
                ...packageJson.scripts,
                test: 'vitest'
            };
            await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        },
        dependencies: {
            dev: [
                '@testing-library/react',
                '@testing-library/jest-dom',
                'vitest',
                'happy-dom',
                '@vitejs/plugin-react'
            ]
        }
    }
};

async function setupFramework(framework: string, projectPath: string): Promise<void> {
    const template = FRAMEWORK_TEMPLATES[framework];
    const testing = FRAMEWORK_TESTING[framework];
    
    if (template) {
        // Setup styling if available
        if (template.styling.tailwind) {
            await template.styling.tailwind.setup(projectPath);
        }
    }
    
    if (testing) {
        await testing.setup(projectPath);
    }
}

function getFrameworkTemplate(framework: string): FrameworkTemplate | undefined {
    return FRAMEWORK_TEMPLATES[framework];
}

function getFrameworkTesting(framework: string): TestingConfig | undefined {
    return FRAMEWORK_TESTING[framework];
}

export {
    FRAMEWORK_TEMPLATES,
    FRAMEWORK_TESTING,
    setupFramework,
    getFrameworkTemplate,
    getFrameworkTesting,
    type FrameworkTemplate,
    type FrameworkTemplates,
    type TestingConfig,
    type FrameworkTesting
};
