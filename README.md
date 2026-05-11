# mf-bridge-double-react-instance

Reproduction repository demonstrating a duplicate React instance issue when using Module Federation Bridge across mixed React version boundaries.

## The Issue

### Setup

| App | React | Port | Share Scope | Role |
|-----|-------|------|-------------|------|
| `app-a` | 19 | 3001 | `react19-share-scope` | Host |
| `app-b` | 18 | 3002 | `react18-share-scope` | Remote (loaded into App A via bridge) |
| `app-c` | 19 | 3003 | `react19-share-scope` | Remote (loaded into App B via bridge) |
| `app-components` | 19 | 3004 | `react19-share-scope` | Remote (loaded directly, no bridge) |

### Render tree

```
App A (React 19, react19-share-scope)
├── Button from App Components    ← loaded directly, no bridge — works fine
└── App B (via bridge)            ← React 18, react18-share-scope
    └── App C (via bridge)        ← React 19, react19-share-scope
        └── Button from App Components  ← CRASHES with "Invalid hook call"
```

## Reproducing

### 1. Install dependencies

Run in each app directory:

```bash
npm install
```

### 2. Start all apps

Run in each app directory:

```bash
npm run dev
```

### 3. Observe the error

Open **App A** (http://localhost:3001) in your browser.

- The button rendered directly in **App A** (from App Components) works fine — click it.
- Click **"Show Button from App Components"** inside the green **App C** container.
- React throws **"Invalid hook call"** because App C has a different React 19 instance.

When opening **App B** (http://localhost:3002/) in your browser, this error does not occur, because React 19 is loaded
only once now.

## The Fix

`app-c/src/shared-singleton-resolver-plugin.ts` contains a Module Federation runtime plugin that resolves this issue.

It works by intercepting the `resolveShare` hook: when the standard resolver cannot find an already-loaded singleton 
in the current instance's `shareScopeMap`, it searches **all registered MF instances** for a matching loaded entry and 
returns that instead of loading a new copy.

To enable the fix, uncomment the `runtimePlugins` line in `app-c/rsbuild.config.ts`:

```ts
// Before (broken):
// runtimePlugins: ['./src/shared-singleton-resolver-plugin.ts'],

// After (fixed):
runtimePlugins: ['./src/shared-singleton-resolver-plugin.ts'],
```

Restart App C and reload http://localhost:3001. The button in App C now works correctly.
