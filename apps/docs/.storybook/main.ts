import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const uiSource = fileURLToPath(
  new URL('../../../packages/ui/src/index.ts', import.meta.url),
);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        // exact match only, so other imports aren't affected
        alias: [{ find: /^@UI-lib\/ui$/, replacement: uiSource }],
      },
    }),
};

export default config;