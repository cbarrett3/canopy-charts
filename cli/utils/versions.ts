interface VersionRange {
    min: string;
    recommended: string;
    max: string;
}

interface SupportedVersions {
    [key: string]: VersionRange;
}

interface FrameworkConfig {
    configFile: string;
    setup: () => string;
}

interface FrameworkConfigs {
    [key: string]: FrameworkConfig;
}

interface Dependencies {
    [key: string]: string;
}

const SUPPORTED_VERSIONS: SupportedVersions = {
    d3: {
        min: '7.8.0',
        recommended: '7.8.5',
        max: '7.9.0'
    },
    react: {
        min: '17.0.0',
        recommended: '18.2.0',
        max: '19.0.0'
    },
    'react-dom': {
        min: '17.0.0',
        recommended: '18.2.0',
        max: '19.0.0'
    },
    next: {
        min: '13.0.0',
        recommended: '14.1.0',
        max: '15.0.0'
    },
    vite: {
        min: '4.0.0',
        recommended: '5.1.0',
        max: '6.0.0'
    },
    gatsby: {
        min: '5.0.0',
        recommended: '5.13.0',
        max: '6.0.0'
    }
};

const FRAMEWORK_DEPENDENCIES: Record<string, string[]> = {
    'next.js': ['next', 'react', 'react-dom'],
    'remix': ['@remix-run/react', '@remix-run/node', 'react', 'react-dom'],
    'astro': ['astro', '@astrojs/react', 'react', 'react-dom'],
    'expo': ['expo', 'react-native', 'react'],
    'electron': ['electron', 'react', 'react-dom']
};

const FRAMEWORK_CONFIG: FrameworkConfigs = {
    'next.js': {
        configFile: 'next.config.js',
        setup: () => `/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;`
    },
    'remix': {
        configFile: 'remix.config.js',
        setup: () => `/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ["**/.*"],
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    serverBuildPath: "build/index.js",
    publicPath: "/build/",
};`
    },
    'expo': {
        configFile: 'app.json',
        setup: () => `{
    "expo": {
        "name": "Your App Name",
        "slug": "your-app-slug",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "assetBundlePatterns": ["**/*"],
        "ios": {
            "supportsTablet": true
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            }
        }
    }
}`
    },
    'electron': {
        configFile: 'electron-builder.json',
        setup: () => `{
    "appId": "com.your-app-name",
    "productName": "Your App Name",
    "directories": {
        "output": "dist"
    },
    "files": [
        "build/**/*",
        "node_modules/**/*"
    ],
    "mac": {
        "category": "public.app-category.developer-tools"
    },
    "win": {
        "target": "nsis"
    },
    "linux": {
        "target": "AppImage"
    }
}`
    }
};

function isVersionInRange(version: string, range: VersionRange): boolean {
    if (!version) return false;

    try {
        const cleanVersion = version.replace(/[^0-9.]/g, '');
        const [major, minor, patch] = cleanVersion.split('.').map(Number);
        const [minMajor, minMinor] = range.min.split('.').map(Number);
        const [maxMajor, maxMinor] = range.max.split('.').map(Number);

        if (major < minMajor || (major === minMajor && minor < minMinor)) {
            return false;
        }

        if (major > maxMajor || (major === maxMajor && minor >= maxMinor)) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

function getVersionWarning(dependency: string, currentVersion: string): string | null {
    const supportedVersion = SUPPORTED_VERSIONS[dependency];
    if (!supportedVersion) return null;

    if (!isVersionInRange(currentVersion, supportedVersion)) {
        return `Warning: ${dependency} version ${currentVersion} is outside the supported range (${supportedVersion.min} - ${supportedVersion.max}). ` +
               `Recommended version is ${supportedVersion.recommended}`;
    }

    return null;
}

function getFrameworkFromDeps(dependencies: Dependencies = {}, devDependencies: Dependencies = {}): string | null {
    const allDeps = { ...dependencies, ...devDependencies };
    
    if ('next' in allDeps) return 'next.js';
    if ('@remix-run/react' in allDeps) return 'remix';
    if ('astro' in allDeps) return 'astro';
    if ('expo' in allDeps) return 'expo';
    if ('electron' in allDeps) return 'electron';
    
    return null;
}

function getRequiredDependencies(framework: string): string[] {
    return FRAMEWORK_DEPENDENCIES[framework] || [];
}

function getFrameworkConfig(framework: string): FrameworkConfig | undefined {
    return FRAMEWORK_CONFIG[framework];
}

export {
    SUPPORTED_VERSIONS,
    FRAMEWORK_DEPENDENCIES,
    FRAMEWORK_CONFIG,
    isVersionInRange,
    getVersionWarning,
    getFrameworkFromDeps,
    getRequiredDependencies,
    getFrameworkConfig,
    type VersionRange,
    type SupportedVersions,
    type FrameworkConfig,
    type FrameworkConfigs,
    type Dependencies
};
