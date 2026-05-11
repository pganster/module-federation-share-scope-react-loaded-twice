import { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

/**
 * Fixes a cross-scope React singleton resolution issue in Module Federation.
 *
 * Problem: When a React 18 app (e.g. App B) loads a React 19 remote
 * (e.g. App C) with shareScope 'react19-share-scope', each MF instance
 * gets an isolated shareScopeMap. App C cannot find the already-loaded
 * React 19 in the 'react19-share-scope' scope that App A registered,
 * because its direct host (App B) has an empty 'react19-share-scope'.
 * This leads to a duplicate React 19 instance being loaded inside App C,
 * causing "Invalid hook call" errors when components from App Components
 * (which resolved React from App A's instance) are rendered inside App C's
 * React tree.
 *
 * Fix: The resolveShare hook intercepts singleton resolution. When the default
 * resolver cannot find an already-loaded singleton in the current instance's
 * shareScopeMap, the plugin searches ALL registered MF instances for a loaded
 * entry with a matching scope and package name. If one is found, it is returned
 * instead of loading a new copy, ensuring a true global singleton across all
 * share scope boundaries.
 */
export default function (): ModuleFederationRuntimePlugin {
  return {
    name: 'shared-singleton-resolver-plugin',
    resolveShare(params) {
      const { pkgName, scope, shareInfo, GlobalFederation } = params;

      if (!shareInfo.shareConfig?.singleton) {
        return params;
      }

      const originalResolver = params.resolver;

      params.resolver = () => {
        const result = originalResolver();

        if (result?.shared?.loaded || result?.shared?.loading) {
          return result;
        }

        for (const instance of GlobalFederation.__INSTANCES__) {
          const versionMap = instance.shareScopeMap?.[scope]?.[pkgName];
          if (!versionMap) continue;

          for (const shared of Object.values(versionMap)) {
            if ((shared as any).loaded && (shared as any).lib) {
              return { shared, useTreesShaking: false };
            }
          }
        }

        return result;
      };

      return params;
    },
  };
}
