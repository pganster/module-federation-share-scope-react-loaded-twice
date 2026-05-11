import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3001 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'app_a',
      remotes: {
        app_b: {
          external: 'app_b@http://localhost:3002/mf-manifest.json',
          shareScope: 'react18-share-scope',
        },
        app_components: {
          external: 'app_components@http://localhost:3004/mf-manifest.json',
          shareScope: 'react19-share-scope',
        },
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
