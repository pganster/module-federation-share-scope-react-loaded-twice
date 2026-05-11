import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/enhanced/runtime';

const AppC = createRemoteAppComponent({
  loader: () => loadRemote('app_c/AppC'),
  fallback: ({ error }: { error: Error }) => (
    <div style={{ color: 'red' }}>Error loading App C: {error.message}</div>
  ),
  loading: <div>Loading App C...</div>,
});

export default AppC;
