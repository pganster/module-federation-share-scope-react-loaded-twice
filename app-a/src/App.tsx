import React, { Suspense } from 'react';
import AppB from './RemoteAppB';
import { RemoteButton } from './RemoteButton';

const containerStyle: React.CSSProperties = {
  border: '3px solid #2563eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  fontFamily: 'sans-serif',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#2563eb',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '12px',
};

export default function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px' }}>
      <h1>App A (React {React.version})</h1>
      <p>
        App A is the host. It renders a button from <strong>App Components</strong> directly
        (no bridge), and renders <strong>App B</strong> via bridge.
      </p>

      <div style={containerStyle}>
        <div style={labelStyle}>App A — React {React.version} (react19-share-scope)</div>

        <section>
          <h3>Button from App Components (rendered directly, no bridge):</h3>
          <RemoteButton />
        </section>

        <section style={{ marginTop: '24px' }}>
          <h3>App B (rendered via bridge):</h3>
          <Suspense fallback={<div>Loading App B...</div>}>
            <AppB />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
