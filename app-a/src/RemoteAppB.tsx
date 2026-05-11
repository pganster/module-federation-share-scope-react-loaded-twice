import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/enhanced/runtime';

const AppB = createRemoteAppComponent({
  loader: () => loadRemote('app_b/AppB'),
  fallback: ({ error }: { error: Error }) => (
    <div style={{ color: 'red' }}>Error loading App B: {error.message}</div>
  ),
  loading: <div>Loading App B...</div>,
});

export default AppB;
