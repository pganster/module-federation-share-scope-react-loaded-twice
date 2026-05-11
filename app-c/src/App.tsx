import React, { useState } from 'react';
import { RemoteButton } from './RemoteButton';

const containerStyle: React.CSSProperties = {
  border: '3px solid #16a34a',
  borderRadius: '8px',
  padding: '16px',
  margin: '8px 0',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#16a34a',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '12px',
};

export default function App() {
  const [showButton, setShowButton] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>App C — React {React.version} (react19-share-scope)</div>
      <p style={{ margin: '0 0 12px', fontSize: '14px' }}>
        App C is a React 19 remote, loaded into App B via bridge. It renders a button from{' '}
        <strong>App Components</strong> directly (no bridge).
      </p>
      <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#b91c1c' }}>
        <strong>Issue:</strong> App C has a different React 19 instance than App A. The button
        from App Components was resolved using App A's React instance, but is being rendered
        inside App C's React tree — causing an "Invalid hook call" error when shown.
      </p>
      <button
        onClick={() => setShowButton((v) => !v)}
        style={{
          padding: '6px 14px',
          cursor: 'pointer',
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          marginBottom: '12px',
        }}
      >
        {showButton ? 'Hide' : 'Show'} Button from App Components
      </button>
      {showButton && <RemoteButton />}
    </div>
  );
}
