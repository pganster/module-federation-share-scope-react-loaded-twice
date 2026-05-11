import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3003 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'app_c',
      exposes: {
        './AppC': './src/export-app-c.tsx',
      },
      remotes: {
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
      // Uncomment to enable the shared-singleton-resolver-plugin that fixes the
      // duplicate React instance issue:
      // runtimePlugins: ['./src/shared-singleton-resolver-plugin.ts'],
    }),
  ],
});
