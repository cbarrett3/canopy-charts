import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

interface ToolConfig {
    exists: boolean;
    version?: string;
    config?: any;
}

interface DevToolConfigs {
    eslint: ToolConfig;
    prettier: ToolConfig;
    jest: ToolConfig;
    typescript: ToolConfig;
    storybook: ToolConfig;
}

async function detectDevTools(projectPath: string): Promise<DevToolConfigs> {
    console.log(chalk.blue('\n🔍 Detecting development tools...'));

    const configs: DevToolConfigs = {
        eslint: detectESLint(projectPath),
        prettier: detectPrettier(projectPath),
        jest: detectJest(projectPath),
        typescript: detectTypeScript(projectPath),
        storybook: detectStorybook(projectPath)
    };

    // Log detected configurations
    Object.entries(configs).forEach(([tool, config]) => {
        console.log(chalk.blue(`  • ${tool}: ${config.exists ? '✓' : '×'}`));
        if (config.exists && config.version) {
            console.log(chalk.gray(`    version: ${config.version}`));
        }
    });

    return configs;
}

function detectESLint(projectPath: string): ToolConfig {
    const possibleConfigs = [
        '.eslintrc.js',
        '.eslintrc.json',
        '.eslintrc.yml',
        '.eslintrc.yaml',
        '.eslintrc'
    ];

    let exists = false;
    let version: string | undefined;
    let config: any;

    // Check for config files
    for (const configFile of possibleConfigs) {
        if (fs.existsSync(path.join(projectPath, configFile))) {
            exists = true;
            try {
                config = require(path.join(projectPath, configFile));
            } catch (error) {
                console.log(chalk.yellow(`Warning: Could not parse ${configFile}`));
            }
            break;
        }
    }

    // Check package.json for version
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
        version = packageJson.devDependencies?.eslint || packageJson.dependencies?.eslint;
    } catch (error) {
        console.log(chalk.yellow('Warning: Could not read package.json'));
    }

    return { exists, version, config };
}

function detectPrettier(projectPath: string): ToolConfig {
    const possibleConfigs = [
        '.prettierrc',
        '.prettierrc.json',
        '.prettierrc.yml',
        '.prettierrc.yaml',
        '.prettierrc.json5',
        '.prettierrc.js',
        'prettier.config.js'
    ];

    let exists = false;
    let version: string | undefined;
    let config: any;

    // Check for config files
    for (const configFile of possibleConfigs) {
        if (fs.existsSync(path.join(projectPath, configFile))) {
            exists = true;
            try {
                config = require(path.join(projectPath, configFile));
            } catch (error) {
                console.log(chalk.yellow(`Warning: Could not parse ${configFile}`));
            }
            break;
        }
    }

    // Check package.json for version
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
        version = packageJson.devDependencies?.prettier || packageJson.dependencies?.prettier;
    } catch (error) {
        console.log(chalk.yellow('Warning: Could not read package.json'));
    }

    return { exists, version, config };
}

function detectJest(projectPath: string): ToolConfig {
    const possibleConfigs = [
        'jest.config.js',
        'jest.config.ts',
        'jest.config.json'
    ];

    let exists = false;
    let version: string | undefined;
    let config: any;

    // Check for config files
    for (const configFile of possibleConfigs) {
        if (fs.existsSync(path.join(projectPath, configFile))) {
            exists = true;
            try {
                config = require(path.join(projectPath, configFile));
            } catch (error) {
                console.log(chalk.yellow(`Warning: Could not parse ${configFile}`));
            }
            break;
        }
    }

    // Check package.json for version and jest config
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
        version = packageJson.devDependencies?.jest || packageJson.dependencies?.jest;
        if (packageJson.jest) {
            exists = true;
            config = packageJson.jest;
        }
    } catch (error) {
        console.log(chalk.yellow('Warning: Could not read package.json'));
    }

    return { exists, version, config };
}

function detectTypeScript(projectPath: string): ToolConfig {
    const possibleConfigs = [
        'tsconfig.json',
        'tsconfig.app.json'
    ];

    let exists = false;
    let version: string | undefined;
    let config: any;

    // Check for config files
    for (const configFile of possibleConfigs) {
        if (fs.existsSync(path.join(projectPath, configFile))) {
            exists = true;
            try {
                config = JSON.parse(fs.readFileSync(path.join(projectPath, configFile), 'utf8'));
            } catch (error) {
                console.log(chalk.yellow(`Warning: Could not parse ${configFile}`));
            }
            break;
        }
    }

    // Check package.json for version
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
        version = packageJson.devDependencies?.typescript || packageJson.dependencies?.typescript;
    } catch (error) {
        console.log(chalk.yellow('Warning: Could not read package.json'));
    }

    return { exists, version, config };
}

function detectStorybook(projectPath: string): ToolConfig {
    const possibleConfigs = [
        '.storybook/main.js',
        '.storybook/main.ts'
    ];

    let exists = false;
    let version: string | undefined;
    let config: any;

    // Check for config files
    for (const configFile of possibleConfigs) {
        if (fs.existsSync(path.join(projectPath, configFile))) {
            exists = true;
            try {
                config = require(path.join(projectPath, configFile));
            } catch (error) {
                console.log(chalk.yellow(`Warning: Could not parse ${configFile}`));
            }
            break;
        }
    }

    // Check package.json for version
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
        version = packageJson.devDependencies?.['@storybook/react'] || 
                 packageJson.dependencies?.['@storybook/react'];
    } catch (error) {
        console.log(chalk.yellow('Warning: Could not read package.json'));
    }

    return { exists, version, config };
}

async function extendDevTools(projectPath: string, existingConfigs: DevToolConfigs): Promise<void> {
    console.log(chalk.blue('\n🔧 Extending development tools configuration...'));

    if (existingConfigs.eslint.exists) {
        await extendESLint(projectPath, existingConfigs.eslint);
    }

    if (existingConfigs.jest.exists) {
        await extendJest(projectPath, existingConfigs.jest);
    }

    if (existingConfigs.storybook.exists) {
        await extendStorybook(projectPath, existingConfigs.storybook);
    }

    console.log(chalk.green('✓ Development tools configuration extended successfully'));
}

async function extendESLint(projectPath: string, config: ToolConfig): Promise<void> {
    const eslintConfig = {
        ...config.config,
        rules: {
            ...config.config?.rules,
            'react/prop-types': 'off',
            'react/display-name': 'off'
        },
        settings: {
            ...config.config?.settings,
            react: {
                version: 'detect'
            }
        }
    };

    await fs.promises.writeFile(
        path.join(projectPath, '.eslintrc.json'),
        JSON.stringify(eslintConfig, null, 2)
    );
}

async function extendJest(projectPath: string, config: ToolConfig): Promise<void> {
    const jestConfig = {
        ...config.config,
        moduleNameMapper: {
            ...config.config?.moduleNameMapper,
            '^@/(.*)$': '<rootDir>/src/$1'
        },
        setupFilesAfterEnv: [
            ...config.config?.setupFilesAfterEnv || [],
            '<rootDir>/jest.setup.js'
        ]
    };

    await fs.promises.writeFile(
        path.join(projectPath, 'jest.config.js'),
        `module.exports = ${JSON.stringify(jestConfig, null, 2)}`
    );
}

async function extendStorybook(projectPath: string, config: ToolConfig): Promise<void> {
    const storybookConfig = {
        ...config.config,
        stories: [
            ...config.config?.stories || [],
            '../src/**/*.stories.@(js|jsx|ts|tsx)'
        ],
        addons: [
            ...config.config?.addons || [],
            '@storybook/addon-essentials'
        ]
    };

    const mainJsPath = path.join(projectPath, '.storybook/main.js');
    await fs.promises.writeFile(
        mainJsPath,
        `module.exports = ${JSON.stringify(storybookConfig, null, 2)}`
    );

    // Create preview.js if it doesn't exist
    const previewJsPath = path.join(projectPath, '.storybook/preview.js');
    if (!fs.existsSync(previewJsPath)) {
        await fs.promises.writeFile(
            previewJsPath,
            `export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}`
        );
    }
}

async function setupDevTools(projectPath: string, framework: string, isTypescript: boolean): Promise<void> {
    console.log(chalk.blue('\n🛠️  Setting up development tools...'));

    // Setup ESLint
    await setupESLint(projectPath, framework);
    console.log(chalk.green('✓ ESLint configured'));

    // Setup Prettier
    await setupPrettier(projectPath);
    console.log(chalk.green('✓ Prettier configured'));

    // Setup Jest
    await setupJest(projectPath, framework);
    console.log(chalk.green('✓ Jest configured'));

    // Setup TypeScript if needed
    if (isTypescript) {
        await setupTypeScript(projectPath);
        console.log(chalk.green('✓ TypeScript configured'));
    }

    // Setup Storybook
    await setupStorybook(projectPath);
    console.log(chalk.green('✓ Storybook configured'));

    console.log(chalk.green('\n✨ Development tools setup completed successfully'));
}

async function setupESLint(projectPath: string, framework: string): Promise<void> {
    const eslintConfig = {
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended'
        ],
        plugins: ['react', 'react-hooks'],
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    };

    await fs.promises.writeFile(
        path.join(projectPath, '.eslintrc.json'),
        JSON.stringify(eslintConfig, null, 2)
    );
}

async function setupPrettier(projectPath: string): Promise<void> {
    const prettierConfig = {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false
    };

    await fs.promises.writeFile(
        path.join(projectPath, '.prettierrc'),
        JSON.stringify(prettierConfig, null, 2)
    );
}

async function setupJest(projectPath: string, framework: string): Promise<void> {
    const jestConfig = {
        testEnvironment: 'jsdom',
        setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
            '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
        },
        transform: {
            '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
        }
    };

    await fs.promises.writeFile(
        path.join(projectPath, 'jest.config.js'),
        `module.exports = ${JSON.stringify(jestConfig, null, 2)}`
    );

    // Create jest.setup.js
    await fs.promises.writeFile(
        path.join(projectPath, 'jest.setup.js'),
        `import '@testing-library/jest-dom';`
    );

    // Create example test
    const exampleTestDir = path.join(projectPath, '__tests__');
    if (!fs.existsSync(exampleTestDir)) {
        await fs.promises.mkdir(exampleTestDir);
    }

    await fs.promises.writeFile(
        path.join(exampleTestDir, 'example.test.js'),
        `import { render, screen } from '@testing-library/react';

describe('Example Test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});`
    );
}

async function setupTypeScript(projectPath: string): Promise<void> {
    const tsConfig = {
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
        include: ['src/**/*'],
        exclude: ['node_modules']
    };

    await fs.promises.writeFile(
        path.join(projectPath, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );
}

async function setupStorybook(projectPath: string): Promise<void> {
    // Create .storybook directory
    const storybookDir = path.join(projectPath, '.storybook');
    if (!fs.existsSync(storybookDir)) {
        await fs.promises.mkdir(storybookDir);
    }

    // Create main.js
    const mainConfig = {
        stories: [
            '../src/**/*.stories.mdx',
            '../src/**/*.stories.@(js|jsx|ts|tsx)'
        ],
        addons: [
            '@storybook/addon-links',
            '@storybook/addon-essentials',
            '@storybook/addon-interactions'
        ],
        framework: {
            name: '@storybook/react-webpack5',
            options: {}
        },
        docs: {
            autodocs: true
        }
    };

    await fs.promises.writeFile(
        path.join(storybookDir, 'main.js'),
        `module.exports = ${JSON.stringify(mainConfig, null, 2)}`
    );

    // Create preview.js
    await fs.promises.writeFile(
        path.join(storybookDir, 'preview.js'),
        `export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}`
    );

    // Create example story
    const storiesDir = path.join(projectPath, 'src/stories');
    if (!fs.existsSync(storiesDir)) {
        await fs.promises.mkdir(storiesDir, { recursive: true });
    }

    await fs.promises.writeFile(
        path.join(storiesDir, 'Example.stories.tsx'),
        `import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Example = () => {
    return <div>Example Component</div>;
};

const meta: Meta<typeof Example> = {
    title: 'Example/Component',
    component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
    args: {},
};`
    );
}

export {
    detectDevTools,
    extendDevTools,
    setupDevTools,
    type DevToolConfigs,
    type ToolConfig
};
