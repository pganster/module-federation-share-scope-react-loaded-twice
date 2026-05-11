import React, { useState } from 'react';

export function Button() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      style={{
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
      }}
    >
      Button from App Components (React {React.version}) — clicked {count} time{count !== 1 ? 's' : ''}
    </button>
  );
}
