import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './Button';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>App Components (React {React.version})</h1>
      <p>Standalone preview:</p>
      <Button />
    </div>
  </React.StrictMode>,
);
