import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3002 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'app_b',
      exposes: {
        './AppB': './src/export-app-b.tsx',
      },
      remotes: {
        app_c: {
          external: 'app_c@http://localhost:3003/mf-manifest.json',
          shareScope: 'react19-share-scope',
        },
      },
      shareStrategy: 'loaded-first',
      shareScope: 'react18-share-scope',
      shared: {
        react: { singleton: true, strictVersion: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, strictVersion: true, requiredVersion: '^18.3.1' },
      },
    }),
  ],
});
