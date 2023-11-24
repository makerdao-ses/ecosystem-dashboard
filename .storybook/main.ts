import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_ENVIRONMENT: 'development', // storybook should run on development environment
  }),
  webpackFinal: async (config) => {
    // use custom next/image to avoid image issues
    if (config.resolve?.alias) {
      config.resolve.alias['next/image'] = require.resolve('./NextImage.js');
    }

    return config;
  },
};

export default config;
