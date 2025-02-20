const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    // Exclude CLI directory from the build
    config.module.rules.push({
      test: /cli[\\/].*\.(ts|tsx|js|jsx)$/,
      loader: 'ignore-loader'
    });
    return config;
  }
}

module.exports = withNextIntl(nextConfig);
