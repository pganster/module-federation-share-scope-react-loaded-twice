import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3004 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'app_components',
      exposes: {
        './Button': './src/Button.tsx',
      },
      shareStrategy: 'loaded-first',
      shareScope: 'react19-share-scope',
      shared: {
        react: { singleton: true, strictVersion: true, requiredVersion: '^19.1.1' },
        'react-dom': { singleton: true, strictVersion: true, requiredVersion: '^19.1.1' },
      },
    }),
  ],
});
