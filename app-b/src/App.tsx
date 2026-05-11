import React, { Suspense } from 'react';
import AppC from './RemoteAppC';

const containerStyle: React.CSSProperties = {
  border: '3px solid #dc2626',
  borderRadius: '8px',
  padding: '16px',
  margin: '8px 0',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#dc2626',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '12px',
};

export default function App() {
  return (
    <div style={containerStyle}>
      <div style={labelStyle}>App B — React {React.version} (react18-share-scope)</div>
      <p style={{ margin: '0 0 12px', fontSize: '14px' }}>
        App B is a React 18 remote, loaded into App A via bridge. It renders App C via bridge.
      </p>
      <Suspense fallback={<div>Loading App C...</div>}>
        <AppC />
      </Suspense>
    </div>
  );
}
